import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, ChevronDown, ChevronRight, Lock, Pencil, Eraser, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

declare global {
  interface Window {
    lessonContent?: any;
  }
}

type StepType = "concept" | "mcq" | "terms" | "summary" | "practice";

type Step = {
  id: string;
  objectiveId: string;
  type: StepType;
  loRef: string;
  title: string;
  explanation?: React.ReactNode;
  analogy?: { title?: string; content: React.ReactNode };
  workedExample?: { title?: string; bullets: React.ReactNode[] };
  mcqs?: {
    id: string;
    question: React.ReactNode;
    options: { id: string; label: React.ReactNode; isCorrect: boolean; explanation: React.ReactNode }[];
  }[];
  cloze?: {
    id: string;
    sentence: React.ReactNode;
    blanks: {
      id: string;
      options: { value: string; label: React.ReactNode; isCorrect: boolean; feedback: React.ReactNode }[];
    }[];
  }[];
  practice?: {
    prompt: React.ReactNode;
    mustHaveKeywords: string[];
    optionalKeywords: string[];
    modelAnswer: React.ReactNode;
    scaffoldPrompts: React.ReactNode[];
    hint: React.ReactNode;
  };
};

const HtmlContent = ({ content }: { content: string | React.ReactNode }) => {
  if (typeof content !== 'string') return <>{content}</>;
  return <span dangerouslySetInnerHTML={{ __html: content }} />;
};

type AttemptState = {
  practiceAttempts: Record<string, number>;
  practiceText: Record<string, string>;
};

type McqState = Record<string, { selectedId?: string; isCorrect?: boolean; feedback?: React.ReactNode }>;

type ClozeState = Record<
  string,
  {
    selections: Record<string, { value?: string; isCorrect?: boolean; feedback?: React.ReactNode }>;
  }
>;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[\u2019']/g, "'")
    .replace(/[^a-z0-9\s\-<>≤≥=]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function keywordScore(answer: string, keywords: string[]) {
  const a = normalize(answer);
  let hit = 0;
  for (const k of keywords) {
    if (a.includes(normalize(k))) hit += 1;
  }
  return { hit, total: keywords.length };
}

function statusFromMustHave(answer: string, mustHave: string[]) {
  const { hit, total } = keywordScore(answer, mustHave);
  const ratio = total === 0 ? 0 : hit / total;
  if (ratio >= 0.9) return { status: "Complete" as const, hit, total };
  if (ratio >= 0.45) return { status: "Almost" as const, hit, total };
  return { status: "Missing" as const, hit, total };
}

function StepBadge({ locked, active }: { locked: boolean; active: boolean }) {
  if (locked)
    return (
      <Badge
        variant="secondary"
        className="gap-1 border border-border bg-muted text-foreground/70"
        data-testid="badge-locked"
      >
        <Lock className="h-3.5 w-3.5" />
        Locked
      </Badge>
    );

  if (active)
    return (
      <Badge
        className="gap-1 bg-primary text-primary-foreground"
        data-testid="badge-active"
      >
        <CheckCircle2 className="h-3.5 w-3.5" />
        Active
      </Badge>
    );

  return (
    <Badge
      variant="secondary"
      className="border border-border bg-secondary text-foreground"
      data-testid="badge-ready"
    >
      Ready
    </Badge>
  );
}

function TinyLoRef({ children }: { children: string }) {
  return (
    <div
      className="text-[11px] font-medium tracking-[0.16em] text-muted-foreground"
      data-testid="text-lo-ref"
    >
      {children}
    </div>
  );
}

function FeedbackPill({
  tone,
  children,
}: {
  tone: "success" | "hint";
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mt-3 rounded-lg border px-3 py-2 text-sm",
        tone === "success" &&
          "border-[hsl(142_71%_45%)]/30 bg-[hsl(142_71%_45%)]/10 text-[hsl(142_60%_28%)]",
        tone === "hint" && "border-border bg-secondary text-muted-foreground",
      )}
      data-testid={tone === "success" ? "status-success" : "status-hint"}
    >
      {children}
    </div>
  );
}

function Diagram({
  stage,
}: {
  stage: number;
}) {
  // stage 0..15-ish; reveal highlights by progress
  const show = (minStage: number) => stage >= minStage;

  return (
    <div className="h-full w-full" data-testid="diagram-container">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold" data-testid="text-diagram-title">
            Standard form visual map
          </div>
          <div className="text-xs text-muted-foreground" data-testid="text-diagram-subtitle">
            Diagram updates by step
          </div>
        </div>
      </div>

      <div className="cognito-card cognito-noise h-[calc(100%-44px)] rounded-2xl p-4">
        <svg
          viewBox="0 0 900 520"
          className="h-full w-full"
          role="img"
          aria-label="Standard form diagram"
          data-testid="svg-standard-form"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="orange" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="hsl(25 100% 55%)" />
              <stop offset="1" stopColor="hsl(25 100% 45%)" />
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="14" stdDeviation="18" floodColor="rgba(15,10,5,.22)" />
            </filter>
          </defs>

          {/* Base grid */}
          <g opacity="0.22">
            {Array.from({ length: 13 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1={40}
                x2={860}
                y1={60 + i * 35}
                y2={60 + i * 35}
                stroke="hsl(30 20% 80%)"
                strokeWidth={1}
              />
            ))}
            {Array.from({ length: 16 }).map((_, i) => (
              <line
                key={`v-${i}`}
                y1={60}
                y2={480}
                x1={60 + i * 52}
                x2={60 + i * 52}
                stroke="hsl(30 20% 82%)"
                strokeWidth={1}
              />
            ))}
          </g>

          {/* Card: a × 10^n */}
          <g filter="url(#shadow)">
            <rect x="60" y="70" width="380" height="165" rx="22" fill="white" stroke="hsl(30 20% 88%)" />
            <text x="88" y="112" fontSize="18" fill="hsl(20 10% 40%)" fontFamily="Inter, sans-serif">
              Standard form structure
            </text>
            <text x="88" y="165" fontSize="42" fill="hsl(20 15% 18%)" fontFamily="Space Grotesk, Inter, sans-serif" fontWeight={650}>
              a × 10
            </text>
            <text x="260" y="136" fontSize="22" fill="hsl(20 10% 40%)" fontFamily="Inter, sans-serif">
              where 1 ≤ a &lt; 10
            </text>
            <text x="285" y="145" fontSize="28" fill="hsl(20 15% 18%)" fontFamily="Space Grotesk, Inter, sans-serif" fontWeight={650}>
              n
            </text>

            <AnimatePresence>
              {show(1) && (
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  d="M92 184 C 160 210, 270 210, 410 184"
                  stroke="url(#orange)"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                />
              )}
            </AnimatePresence>
          </g>

          {/* Index laws strip */}
          <g>
            <rect x="470" y="70" width="370" height="165" rx="22" fill="white" stroke="hsl(30 20% 88%)" />
            <text x="495" y="112" fontSize="18" fill="hsl(20 10% 40%)" fontFamily="Inter, sans-serif">
              Index laws (powers of 10)
            </text>

            <motion.g
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: show(2) ? 1 : 0.35, y: show(2) ? 0 : 10 }}
              transition={{ duration: 0.45 }}
            >
              <text x="495" y="160" fontSize="22" fill="hsl(20 15% 18%)" fontFamily="Inter, sans-serif" fontWeight={600}>
                10<tspan baselineShift="super" fontSize="75%">m</tspan> × 10<tspan baselineShift="super" fontSize="75%">n</tspan> = 10<tspan baselineShift="super" fontSize="75%">m+n</tspan>
              </text>
            </motion.g>

            <motion.g
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: show(3) ? 1 : 0.35, y: show(3) ? 0 : 10 }}
              transition={{ duration: 0.45, delay: 0.05 }}
            >
              <text x="495" y="198" fontSize="22" fill="hsl(20 15% 18%)" fontFamily="Inter, sans-serif" fontWeight={600}>
                10<tspan baselineShift="super" fontSize="75%">m</tspan> ÷ 10<tspan baselineShift="super" fontSize="75%">n</tspan> = 10<tspan baselineShift="super" fontSize="75%">m−n</tspan>
              </text>
            </motion.g>

            <AnimatePresence>
              {show(4) && (
                <motion.rect
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  x="488"
                  y="132"
                  width="336"
                  height="84"
                  rx="18"
                  fill="hsl(25 100% 95%)"
                />
              )}
            </AnimatePresence>
          </g>

          {/* Matching powers -> align bar */}
          <g>
            <rect x="60" y="265" width="780" height="90" rx="22" fill="white" stroke="hsl(30 20% 88%)" />
            <text x="88" y="305" fontSize="18" fill="hsl(20 10% 40%)" fontFamily="Inter, sans-serif">
              Adding/subtracting: match powers first
            </text>

            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: show(7) ? 1 : 0.25 }}
              transition={{ duration: 0.45 }}
            >
              <rect x="90" y="320" width="720" height="20" rx="10" fill="hsl(30 20% 94%)" />
              <motion.rect
                initial={{ width: 0 }}
                animate={{ width: show(7) ? 720 : 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                x="90"
                y="320"
                height="20"
                rx="10"
                fill="url(#orange)"
                opacity={0.5}
              />
              <text x="90" y="360" fontSize="15" fill="hsl(20 10% 40%)" fontFamily="Inter, sans-serif">
                Rewrite one coefficient so both are ×10<tspan baselineShift="super" fontSize="75%">k</tspan>, then add/subtract coefficients.
              </text>
            </motion.g>
          </g>

          {/* Decimal shift axis */}
          <g>
            <rect x="60" y="372" width="780" height="120" rx="22" fill="white" stroke="hsl(30 20% 88%)" />
            <text x="88" y="412" fontSize="18" fill="hsl(20 10% 40%)" fontFamily="Inter, sans-serif">
              Converting: decimal moves ↔ index changes
            </text>

            <motion.g
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: show(12) ? 1 : 0.25, y: show(12) ? 0 : 8 }}
              transition={{ duration: 0.45 }}
            >
              <line x1="130" y1="438" x2="770" y2="438" stroke="hsl(30 20% 82%)" strokeWidth={2} />
              {Array.from({ length: 9 }).map((_, i) => (
                <g key={`tick-${i}`}>
                  <line
                    x1={170 + i * 70}
                    y1={428}
                    x2={170 + i * 70}
                    y2={448}
                    stroke="hsl(30 20% 78%)"
                    strokeWidth={2}
                  />
                </g>
              ))}
              <motion.circle
                initial={{ cx: 210 }}
                animate={{ cx: show(13) ? 560 : 210 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                cy="438"
                r="12"
                fill="url(#orange)"
              />
              <text x="130" y="472" fontSize="14" fill="hsl(20 10% 40%)" fontFamily="Inter, sans-serif">
                Move decimal left → index +1 each move (large numbers)
              </text>
              <text x="470" y="472" fontSize="14" fill="hsl(20 10% 40%)" fontFamily="Inter, sans-serif">
                Move decimal right → index −1 each move (small numbers)
              </text>
            </motion.g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function McqBlock({
  mcqId,
  stepIndex,
  question,
  options,
  state,
  onPick,
  locked,
}: {
  mcqId: string;
  stepIndex: number;
  question: React.ReactNode;
  options: { id: string; label: React.ReactNode; isCorrect: boolean; explanation: React.ReactNode }[];
  state?: { selectedId?: string; isCorrect?: boolean; feedback?: React.ReactNode };
  onPick: (optId: string) => void;
  locked: boolean;
}) {
  const selected = state?.selectedId;
  const isCorrect = state?.isCorrect;

  return (
    <div className="mt-4" data-testid={`mcq-${mcqId}`}>
      <div className="text-sm font-semibold" data-testid={`text-mcq-question-${mcqId}`} id={`step-${stepIndex + 1}-mcq-${mcqId}-question`}>
        {typeof question === 'string' ? <HtmlContent content={question} /> : question}
      </div>
      <div className="mt-3 grid gap-2">
        {options.map((o) => {
          const isSelected = selected === o.id;
          const correctSelected = isSelected && isCorrect;
          const wrongSelected = isSelected && isCorrect === false;
          return (
            <button
              key={o.id}
              type="button"
              disabled={locked || isCorrect === true}
              onClick={() => onPick(o.id)}
              className={cn(
                "w-full rounded-xl border px-3 py-2 text-left text-sm transition",
                "hover:bg-secondary active:translate-y-[0.5px]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                "disabled:cursor-not-allowed",
                correctSelected && "border-[hsl(142_71%_45%)] bg-[hsl(142_71%_45%)]/10",
                wrongSelected && "border-primary/30 bg-accent",
                !isSelected && "border-border bg-white",
              )}
              data-testid={`button-mcq-option-${mcqId}-${o.id}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className={cn(correctSelected && "text-[hsl(142_60%_28%)]", wrongSelected && "text-foreground")} id={`step-${stepIndex + 1}-mcq-${mcqId}-option-${o.id}`}>
                  {typeof o.label === 'string' ? <HtmlContent content={o.label} /> : o.label}
                </span>
                {correctSelected ? (
                  <CheckCircle2 className="h-4 w-4 text-[hsl(142_71%_45%)]" />
                ) : wrongSelected ? (
                  <ChevronRight className="h-4 w-4 text-primary" />
                ) : null}
              </div>
            </button>
          );
        })}
      </div>

      {state?.feedback ? (
        <FeedbackPill tone={isCorrect ? "success" : "hint"}>{typeof state.feedback === 'string' ? <HtmlContent content={state.feedback} /> : state.feedback}</FeedbackPill>
      ) : null}
    </div>
  );
}

function ClozeLine({
  clozeId,
  stepIndex,
  sentence,
  blanks,
  state,
  onSelect,
  locked,
}: {
  clozeId: string;
  stepIndex: number;
  sentence: React.ReactNode;
  blanks: {
    id: string;
    options: { value: string; label: React.ReactNode; isCorrect: boolean; feedback: React.ReactNode }[];
  }[];
  state?: {
    selections: Record<string, { value?: string; isCorrect?: boolean; feedback?: React.ReactNode }>;
  };
  onSelect: (blankId: string, value: string) => void;
  locked: boolean;
}) {
  return (
    <div className="mt-4" data-testid={`cloze-${clozeId}`}>
      <div className="text-sm leading-6 text-foreground" data-testid={`text-cloze-sentence-${clozeId}`} id={`step-${stepIndex + 1}-cloze-${clozeId}-sentence`}>
        {typeof sentence === 'string' ? <HtmlContent content={sentence} /> : sentence}
      </div>
      <div className="mt-3 grid gap-2">
        {blanks.map((b, idx) => {
          const selection = state?.selections?.[b.id];
          const isCorrect = selection?.isCorrect;
          const tone = isCorrect === undefined ? "idle" : isCorrect ? "success" : "warn";
          return (
            <div key={b.id} className="grid gap-2" data-testid={`row-cloze-blank-${clozeId}-${idx}`}>
              <div className="flex items-center gap-2">
                <div className="text-xs font-medium text-muted-foreground" data-testid={`text-cloze-label-${clozeId}-${b.id}`}>
                  Blank {idx + 1}
                </div>
                {tone === "success" ? (
                  <Badge
                    className="bg-[hsl(142_71%_45%)] text-white"
                    data-testid={`badge-cloze-correct-${clozeId}-${b.id}`}
                  >
                    Correct
                  </Badge>
                ) : tone === "warn" ? (
                  <Badge
                    className="bg-primary text-primary-foreground"
                    data-testid={`badge-cloze-wrong-${clozeId}-${b.id}`}
                  >
                    Try again
                  </Badge>
                ) : null}
              </div>

              <Select
                value={selection?.value}
                onValueChange={(v) => onSelect(b.id, v)}
                disabled={locked || isCorrect === true}
              >
                <SelectTrigger
                  className={cn(
                    "h-11 rounded-xl border bg-white",
                    tone === "success" && "border-[hsl(142_71%_45%)]/40 bg-[hsl(142_71%_45%)]/10",
                    tone === "warn" && "border-primary/35 bg-accent",
                  )}
                  data-testid={`select-${clozeId}-${b.id}`}
                >
                  <SelectValue placeholder="Choose…" />
                </SelectTrigger>
                <SelectContent data-testid={`select-content-${clozeId}-${b.id}`}>
                  {b.options.map((o) => (
                    <SelectItem
                      key={o.value}
                      value={o.value}
                      data-testid={`select-item-${clozeId}-${b.id}-${o.value}`}
                    >
                      {typeof o.label === 'string' ? <HtmlContent content={o.label} /> : o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selection?.feedback ? (
                <FeedbackPill tone={isCorrect ? "success" : "hint"}>{typeof selection.feedback === 'string' ? <HtmlContent content={selection.feedback} /> : selection.feedback}</FeedbackPill>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PracticeBlock({
  stepId,
  stepIndex,
  practice,
  locked,
  attempts,
  text,
  onChangeText,
  onSubmit,
  status,
  feedback,
  showScaffold,
  showModel,
}: {
  stepId: string;
  stepIndex: number;
  practice: NonNullable<Step["practice"]>;
  locked: boolean;
  attempts: number;
  text: string;
  onChangeText: (v: string) => void;
  onSubmit: () => void;
  status?: "Missing" | "Almost" | "Complete";
  feedback?: React.ReactNode;
  showScaffold: boolean;
  showModel: boolean;
}) {
  return (
    <div className="mt-4" data-testid={`practice-${stepId}`}>
      <div className="text-sm leading-6 text-muted-foreground" data-testid={`text-practice-prompt-${stepId}`} id={`step-${stepIndex + 1}-practice-prompt`}>
        {typeof practice.prompt === 'string' ? <HtmlContent content={practice.prompt} /> : practice.prompt}
      </div>

      <div className="mt-3">
        <Textarea
          value={text}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder="Write your answer…"
          className="min-h-[110px] rounded-xl border bg-white"
          disabled={locked}
          data-testid={`textarea-practice-${stepId}`}
        />
      </div>

      <div className="mt-3 flex items-center gap-2">
        <Button
          onClick={onSubmit}
          disabled={locked || !text.trim()}
          className="rounded-xl bg-primary text-primary-foreground"
          data-testid={`button-submit-practice-${stepId}`}
        >
          Check answer
        </Button>
        <div className="text-xs text-muted-foreground" data-testid={`text-practice-attempts-${stepId}`}>
          Attempts: {attempts}
        </div>
      </div>

      {status ? (
        <div className="mt-3" data-testid={`status-practice-${stepId}`}>
          <Badge
            className={cn(
              "border",
              status === "Complete" && "border-[hsl(142_71%_45%)]/30 bg-[hsl(142_71%_45%)] text-white",
              status === "Almost" && "border-primary/30 bg-primary text-primary-foreground",
              status === "Missing" && "border-border bg-secondary text-foreground",
            )}
            data-testid={`badge-practice-${stepId}`}
          >
            {status}
          </Badge>
          {feedback ? <FeedbackPill tone={status === "Complete" ? "success" : "hint"}>{typeof feedback === 'string' ? <HtmlContent content={feedback} /> : feedback}</FeedbackPill> : null}

          {showScaffold ? (
            <div className="mt-3 rounded-xl border border-border bg-secondary p-3" data-testid={`panel-scaffold-${stepId}`}>
              <div className="text-xs font-semibold text-foreground" data-testid={`text-scaffold-title-${stepId}`}>
                Scaffold prompts
              </div>
              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                {practice.scaffoldPrompts.map((p, i) => (
                  <li key={i} data-testid={`text-scaffold-${stepId}-${i}`}> {typeof p === 'string' ? <HtmlContent content={p} /> : p}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {showModel ? (
            <div className="mt-3 rounded-xl border border-border bg-white p-3" data-testid={`panel-model-${stepId}`}>
              <div className="text-xs font-semibold text-foreground" data-testid={`text-model-title-${stepId}`}>
                Model answer (unlocked)
              </div>
              <div className="mt-2 text-sm leading-6 text-muted-foreground" data-testid={`text-model-answer-${stepId}`}>
                {typeof practice.modelAnswer === 'string' ? <HtmlContent content={practice.modelAnswer} /> : practice.modelAnswer}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function Whiteboard({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const [color, setColor] = React.useState<string>("#ff7a00");
  const [size, setSize] = React.useState<number>(4);
  const [mode, setMode] = React.useState<"pen" | "eraser">("pen");

  const drawingRef = React.useRef(false);
  const lastRef = React.useRef<{ x: number; y: number } | null>(null);

  const resize = React.useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ratio = Math.max(1, Math.floor(window.devicePixelRatio || 1));
    const rect = wrap.getBoundingClientRect();
    canvas.width = Math.floor(rect.width * ratio);
    canvas.height = Math.floor(rect.height * ratio);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  React.useEffect(() => {
    if (!open) return;
    resize();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open, resize]);

  const getPos = (e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const drawLine = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.globalCompositeOperation = mode === "eraser" ? "destination-out" : "source-over";
    ctx.strokeStyle = mode === "eraser" ? "rgba(0,0,0,1)" : color;
    ctx.lineWidth = mode === "eraser" ? 18 : size;

    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-testid="overlay-whiteboard"
        >
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => onOpenChange(false)}
            data-testid="button-close-whiteboard-overlay"
          />

          <motion.div
            initial={{ y: 18, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute bottom-20 right-6 w-[min(520px,calc(100vw-48px))] overflow-hidden rounded-2xl border border-border bg-white shadow-xl"
            data-testid="panel-whiteboard"
          >
            <div className="flex items-center justify-between gap-2 border-b border-border bg-secondary px-3 py-2">
              <div className="text-sm font-semibold" data-testid="text-whiteboard-title">
                Whiteboard
              </div>
              <button
                className="rounded-lg px-2 py-1 text-sm text-muted-foreground hover:bg-white"
                onClick={() => onOpenChange(false)}
                data-testid="button-close-whiteboard"
              >
                Close
              </button>
            </div>

            <div className="flex items-center gap-2 px-3 py-2">
              <Button
                type="button"
                variant={mode === "pen" ? "default" : "secondary"}
                className={cn(
                  "h-9 rounded-xl",
                  mode === "pen" ? "bg-primary text-primary-foreground" : "bg-secondary",
                )}
                onClick={() => setMode("pen")}
                data-testid="button-tool-pen"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Pen
              </Button>
              <Button
                type="button"
                variant={mode === "eraser" ? "default" : "secondary"}
                className={cn(
                  "h-9 rounded-xl",
                  mode === "eraser" ? "bg-primary text-primary-foreground" : "bg-secondary",
                )}
                onClick={() => setMode("eraser")}
                data-testid="button-tool-eraser"
              >
                <Eraser className="mr-2 h-4 w-4" />
                Eraser
              </Button>

              <div className="ml-auto flex items-center gap-2">
                <label className="text-xs text-muted-foreground" data-testid="label-pen-size">
                  Size
                </label>
                <input
                  type="range"
                  min={2}
                  max={10}
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-28 accent-[hsl(25_100%_50%)]"
                  data-testid="slider-pen-size"
                />
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="h-9 w-9 rounded-lg border border-border bg-white p-1"
                  disabled={mode === "eraser"}
                  data-testid="input-pen-color"
                />
                <Button
                  type="button"
                  variant="secondary"
                  className="h-9 rounded-xl"
                  onClick={clear}
                  data-testid="button-clear-whiteboard"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              </div>
            </div>

            <div ref={wrapRef} className="h-[320px] bg-white" data-testid="whiteboard-canvas-wrap">
              <canvas
                ref={canvasRef}
                className="h-full w-full touch-none"
                onPointerDown={(e) => {
                  drawingRef.current = true;
                  (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
                  lastRef.current = getPos(e);
                }}
                onPointerUp={() => {
                  drawingRef.current = false;
                  lastRef.current = null;
                }}
                onPointerMove={(e) => {
                  if (!drawingRef.current) return;
                  const pos = getPos(e);
                  if (lastRef.current) drawLine(lastRef.current, pos);
                  lastRef.current = pos;
                }}
                data-testid="canvas-whiteboard"
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function MathsGuideStandardForm({ content }: { content?: any } & Partial<any>) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<Record<string, boolean>>({});
  const [mcqState, setMcqState] = React.useState<McqState>({});
  const [clozeState, setClozeState] = React.useState<ClozeState>({});
  const [attempts, setAttempts] = React.useState<AttemptState>({ practiceAttempts: {}, practiceText: {} });
  const [practiceEval, setPracticeEval] = React.useState<Record<string, { status: "Missing" | "Almost" | "Complete"; feedback: React.ReactNode }>>(
    {},
  );
  const [showModel, setShowModel] = React.useState<Record<string, boolean>>({});
  const [whiteboardOpen, setWhiteboardOpen] = React.useState(false);
  const [quickNotesOpen, setQuickNotesOpen] = React.useState(false);
  const [steps, setSteps] = React.useState<Step[]>([]);
  const [appData, setAppData] = React.useState({
    subject: "Loading...",
    specCode: "...",
    topicTitle: "Loading Lesson...",
    strapline: "Please wait while content loads",
    learningObjectives: [] as string[],
    keyFormulas: [] as string[],
    diagramHtml: null as string | null
  });

  React.useEffect(() => {
    if (appData.topicTitle && appData.topicTitle !== "Loading Lesson...") {
      document.title = appData.topicTitle;
    }
  }, [appData.topicTitle]);

  React.useEffect(() => {
    const loadContent = () => {
      const data = content || window.lessonContent;
      if (!data) return;

      setAppData({
        subject: data.subject || "Subject",
        specCode: data.specCode || "Spec",
        topicTitle: data.topicTitle || "Topic",
        strapline: data.strapline || "Strapline",
        learningObjectives: data.learningObjectives || [],
        keyFormulas: data.keyFormulas || [],
        diagramHtml: data.diagramHtml || null
      });

      const loadedSteps: Step[] = [];
      const stepsCount = 20; // Look for up to 20 steps

      for (let i = 1; i <= stepsCount; i++) {
        const stepData = data[`step${i}`];
        if (!stepData) continue;

        const id = `s${i}`;
        // Infer type
        let type: StepType = "concept";
        if (stepData.mcqs) type = "mcq";
        else if (stepData.practice) type = "practice";
        else if (stepData.cloze) {
           if (stepData.title && stepData.title.toLowerCase().includes("summary")) type = "summary";
           else type = "terms";
        }

        // Infer objective ID (simple distribution or just generic)
        // Since we don't have explicit LO mapping in data, we can try to guess or just use generic IDs
        // The original code had 3 LOs.
        // Let's create virtual LOs based on the data.learningObjectives array
        const loIndex = Math.floor(((i - 1) / stepsCount) * (data.learningObjectives?.length || 1));
        const objectiveId = `lo-${loIndex}`;

        loadedSteps.push({
          id,
          objectiveId,
          type,
          loRef: data.specCode || "Ref",
          title: stepData.title || `Step ${i}`,
          explanation: stepData.explanation ? <HtmlContent content={stepData.explanation} /> : undefined,
          analogy: stepData.analogy ? {
            title: stepData.analogy.title,
            content: <HtmlContent content={stepData.analogy.content} />
          } : undefined,
          workedExample: stepData.workedExample ? {
            title: stepData.workedExample.title,
            bullets: (stepData.workedExample.bullets || []).map((b: string) => <HtmlContent content={b} />)
          } : undefined,
          mcqs: stepData.mcqs?.map((m: any) => ({
            id: m.id,
            question: <HtmlContent content={m.question} />,
            options: m.options.map((o: any) => ({
              id: o.id,
              label: <HtmlContent content={o.label} />,
              isCorrect: o.isCorrect,
              explanation: <HtmlContent content={o.explanation || (o.isCorrect ? "Correct!" : "Try again.")} />
            }))
          })),
          cloze: stepData.cloze?.map((c: any) => ({
            id: c.id,
            sentence: <HtmlContent content={c.sentence} />,
            blanks: c.blanks.map((b: any) => ({
              id: b.id,
              options: b.options.map((o: any) => ({
                value: o.value,
                label: <HtmlContent content={o.label} />,
                isCorrect: o.isCorrect,
                feedback: <HtmlContent content={o.feedback || ""} />
              }))
            }))
          })),
          practice: stepData.practice ? {
            prompt: <HtmlContent content={stepData.practice.prompt} />,
            mustHaveKeywords: stepData.practice.mustHaveKeywords || [],
            optionalKeywords: stepData.practice.optionalKeywords || [],
            modelAnswer: <HtmlContent content={stepData.practice.modelAnswer} />,
            scaffoldPrompts: (stepData.practice.scaffoldPrompts || []).map((p: string) => <HtmlContent content={p} />),
            hint: <HtmlContent content={stepData.practice.hint || "Check your answer."} />
          } : undefined
        });
      }

      if (loadedSteps.length > 0) {
        setSteps(loadedSteps);
      }
    };

    loadContent();
    // Safety check in case script loads late
    const interval = setInterval(loadContent, 200);
    // Stop polling after 2 seconds
    const timeout = setTimeout(() => clearInterval(interval), 2000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const totalSteps = steps.length;
  const currentStep = steps[activeStep];

  const isStepComplete = (stepIndex: number) => {
    if (!steps[stepIndex]) return false;
    return completed[steps[stepIndex].id] === true;
  }
  const isLocked = (stepIndex: number) => stepIndex > 0 && !isStepComplete(stepIndex - 1);
  const isActive = (stepIndex: number) => stepIndex === activeStep;

  // Virtual learning objectives mapping
  const learningObjectivesList = appData.learningObjectives.map((lo, idx) => ({
    id: `lo-${idx}`,
    label: lo,
    shortRef: appData.specCode
  }));

  const objectiveCompletion = learningObjectivesList.map((lo) => {
    const loSteps = steps.filter((s) => s.objectiveId === lo.id).map((s) => s.id);
    const done = loSteps.length > 0 && loSteps.every((sid) => completed[sid]);
    return { loId: lo.id, done };
  });

  const diagramStage = React.useMemo(() => {
    // Simple mapping: completed steps contribute; active step contributes a half stage
    // We assume about 15 steps max for the diagram stages
    const doneCount = steps.filter((s) => completed[s.id]).length;
    return doneCount + (isStepComplete(activeStep) ? 0 : 0);
  }, [completed, activeStep, steps]);

  const markCompleteAndAdvance = React.useCallback(
    (stepId: string) => {
      setCompleted((p) => ({ ...p, [stepId]: true }));
      setActiveStep((i) => clamp(i + 1, 0, steps.length - 1));
    },
    [setCompleted, setActiveStep, steps.length],
  );

  const completeStepOnly = React.useCallback((stepId: string) => {
    setCompleted((p) => ({ ...p, [stepId]: true }));
  }, []);

  const canContinue = React.useMemo(() => {
    if (!currentStep) return false;
    const step = currentStep;
    if (completed[step.id]) return true;

    if (step.type === "concept") return true;

    if (step.type === "mcq") {
      const mcqs = step.mcqs ?? [];
      if (mcqs.length === 0) return false;
      return mcqs.every((q) => mcqState[q.id]?.isCorrect === true);
    }

    if (step.type === "terms" || step.type === "summary") {
      const lines = step.cloze ?? [];
      if (lines.length === 0) return false;
      return lines.every((line) =>
        line.blanks.every((b) => clozeState[line.id]?.selections?.[b.id]?.isCorrect === true),
      );
    }

    if (step.type === "practice") {
      return practiceEval[step.id]?.status === "Complete";
    }

    return false;
  }, [currentStep, completed, mcqState, clozeState, practiceEval]);

  const onContinue = () => {
    if (!currentStep) return;
    if (!canContinue) return;
    if (!completed[currentStep.id]) {
      completeStepOnly(currentStep.id);
    }
    if (activeStep < steps.length - 1) setActiveStep((s) => s + 1);
  };

  const onPickMcq = (mcqId: string, optionId: string) => {
    if (!currentStep) return;
    const step = currentStep;
    const q = step.mcqs?.find((m) => m.id === mcqId);
    if (!q) return;
    const opt = q.options.find((o) => o.id === optionId);
    if (!opt) return;

    setMcqState((p) => ({
      ...p,
      [mcqId]: {
        selectedId: optionId,
        isCorrect: opt.isCorrect,
        feedback: opt.isCorrect ? (typeof opt.explanation === 'string' ? <HtmlContent content={opt.explanation} /> : opt.explanation) : (opt.explanation ? (typeof opt.explanation === 'string' ? <HtmlContent content={opt.explanation} /> : opt.explanation) : `Hint: Try again`),
      },
    }));
  };

  const onSelectCloze = (lineId: string, blankId: string, value: string) => {
    if (!currentStep) return;
    const step = currentStep;
    const line = step.cloze?.find((c) => c.id === lineId);
    const blank = line?.blanks.find((b) => b.id === blankId);
    const option = blank?.options.find((o) => o.value === value);
    if (!option) return;

    setClozeState((p) => ({
      ...p,
      [lineId]: {
        selections: {
          ...(p[lineId]?.selections ?? {}),
          [blankId]: {
            value,
            isCorrect: option.isCorrect,
            feedback: option.isCorrect ? (typeof option.feedback === 'string' ? <HtmlContent content={option.feedback} /> : option.feedback) : (option.feedback ? (typeof option.feedback === 'string' ? <HtmlContent content={option.feedback} /> : option.feedback) : `Hint: Incorrect`),
          },
        },
      },
    }));
  };

  const onChangePractice = (stepId: string, value: string) => {
    setAttempts((p) => ({
      ...p,
      practiceText: { ...p.practiceText, [stepId]: value },
    }));
  };

  const onSubmitPractice = (stepId: string) => {
    const step = steps.find((s) => s.id === stepId);
    if (!step?.practice) return;

    setAttempts((p) => ({
      ...p,
      practiceAttempts: { ...p.practiceAttempts, [stepId]: (p.practiceAttempts[stepId] ?? 0) + 1 },
    }));

    const answer = attempts.practiceText[stepId] ?? "";
    const must = step.practice.mustHaveKeywords;
    const optional = step.practice.optionalKeywords;
    const mustRes = statusFromMustHave(answer, must);
    const optRes = keywordScore(answer, optional);

    const hint =
      mustRes.status === "Complete"
        ? `Nice. You hit ${mustRes.hit}/${mustRes.total} key points (and ${optRes.hit}/${optRes.total} optional details).`
        : step.practice.hint;

    setPracticeEval((p) => ({
      ...p,
      [stepId]: {
        status: mustRes.status,
        feedback: hint,
      },
    }));

    if (mustRes.status === "Complete") {
      // unlock model answer toggles
      setShowModel((p) => ({ ...p, [stepId]: true }));
      completeStepOnly(stepId);
    }
  };

  if (steps.length === 0) {
      return (
          <div className="flex h-screen w-full items-center justify-center bg-background text-foreground">
              <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p>Loading lesson content...</p>
              </div>
          </div>
      );
  }

  const leftSubtitle = appData.strapline;

  return (
    <div className="min-h-screen bg-background" data-testid="page-maths-guide">
      <div
        className="mx-auto grid h-[calc(100vh-56px)] max-w-[1400px] grid-cols-1 gap-4 px-4 py-4 lg:grid-cols-[42%_58%]"
        data-testid="layout-two-col"
      >
        {/* LEFT PANEL */}
        <div
          className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
          data-testid="panel-left"
        >
          <div className="border-b border-border bg-white px-4 py-4" data-testid="left-header">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-semibold tracking-[0.18em] text-muted-foreground" data-testid="text-left-kicker">
                  REVISION NOTES (MAPPED)
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Badge className="bg-primary text-primary-foreground" data-testid="badge-subject">
                    {appData.subject}
                  </Badge>
                  <div className="text-xs text-muted-foreground" data-testid="text-spec-ref" id="spec-code">
                    Spec {appData.specCode}
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-semibold leading-tight" style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }} data-testid="text-topic-title" id="topic-title">
                    {appData.topicTitle}
                  </div>
                  <div className="mt-1 line-clamp-1 text-sm text-muted-foreground" data-testid="text-topic-subtitle" id="strapline">
                    {leftSubtitle}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setWhiteboardOpen(true)}
                className="rounded-xl border border-border bg-white px-3 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-secondary"
                data-testid="button-open-whiteboard"
                aria-label="Open whiteboard"
              >
                <Pencil className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4" data-testid="left-scroll">
            {diagramStage === 0 ? (
              <div className="rounded-2xl border border-border bg-white p-4" data-testid="card-learning-objectives">
                <div className="mb-2 text-xs font-semibold tracking-[0.18em] text-muted-foreground" data-testid="text-lo-title">
                  LEARNING OBJECTIVES
                </div>
                <div className="grid gap-2" id="learning-objectives">
                  {learningObjectivesList.map((lo, idx) => {
                    const done = objectiveCompletion.find((x) => x.loId === lo.id)?.done;
                    return (
                      <div
                        key={lo.id}
                        className="flex items-start gap-2"
                        data-testid={`row-learning-objective-${idx}`}
                      >
                        <div
                          className={cn(
                            "mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border",
                            done ? "border-[hsl(142_71%_45%)] bg-[hsl(142_71%_45%)]" : "border-border bg-white",
                          )}
                          data-testid={`icon-lo-status-${idx}`}
                        >
                          {done ? <CheckCircle2 className="h-3 w-3 text-white" /> : null}
                        </div>
                        <div className="min-w-0">
                          <div className="text-[12px] leading-5 text-foreground" data-testid={`text-lo-${idx}`}>
                            {lo.label}
                          </div>
                          <div className="text-[11px] tracking-[0.14em] text-muted-foreground" data-testid={`text-lo-ref-${idx}`}>
                            {lo.shortRef.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {diagramStage > 0 ? (
              <div className="flex min-h-0 flex-1 flex-col" data-testid="left-diagram-wrap">
                {appData.diagramHtml ? (
                   <div className="h-full w-full">
                      <div className="mb-2 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold">Visual Summary</div>
                          <div className="text-xs text-muted-foreground">Key concepts</div>
                        </div>
                      </div>
                      <div 
                        className="cognito-card cognito-noise h-[calc(100%-44px)] rounded-2xl p-4 overflow-hidden flex items-center justify-center bg-white"
                        dangerouslySetInnerHTML={{ __html: appData.diagramHtml }}
                      />
                   </div>
                ) : appData.topicTitle.toLowerCase().includes("standard form") ? (
                  <Diagram stage={diagramStage} />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
                    <p className="text-sm">No diagram available for this topic</p>
                  </div>
                )}
              </div>
            ) : null}

            <div className="mt-4" data-testid="left-quick-notes">
              <Collapsible open={quickNotesOpen} onOpenChange={setQuickNotesOpen}>
                <CollapsibleTrigger asChild>
                  <button
                    className="flex w-full items-center justify-between rounded-2xl border border-border bg-white px-4 py-3 text-left"
                    data-testid="button-toggle-quick-notes"
                    type="button"
                  >
                    <div>
                      <div className="text-xs font-semibold tracking-[0.18em] text-muted-foreground" data-testid="text-quick-notes-title">
                        QUICK NOTES
                      </div>
                      <div className="text-sm text-muted-foreground" data-testid="text-quick-notes-sub">
                        Key formulas + reminders
                      </div>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform",
                        quickNotesOpen && "rotate-180",
                      )}
                    />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div
                    className="mt-2 rounded-2xl border border-border bg-white p-4 text-sm text-muted-foreground"
                    data-testid="panel-quick-notes"
                  >
                    {appData.keyFormulas.length > 0 ? (
                      <ul className="list-disc space-y-1 pl-5">
                        {appData.keyFormulas.map((note, i) => (
                           <li key={i} data-testid={`text-quick-note-${i}`}><HtmlContent content={note} /></li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-xs italic text-muted-foreground/50">No formulas loaded</div>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div
          className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
          data-testid="panel-right"
        >
          <div
            className="sticky top-0 z-10 border-b border-border bg-white/80 px-5 py-4 backdrop-blur"
            data-testid="right-header"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div
                  className="flex items-center gap-2 text-sm font-semibold text-muted-foreground"
                  style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
                  data-testid="text-right-title"
                >
                  <img src={logo} alt="Cognito Coding Logo" className="h-6 w-6 object-contain" />
                  Cognito Coding – Revision Guide
                </div>
                <div
                  className="mt-2 text-3xl font-bold leading-tight"
                  style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
                  data-testid="text-app-name"
                >
                  <span className="gradient-title">{appData.topicTitle}</span>
                </div>
                <div className="mt-1 text-sm text-muted-foreground" data-testid="text-right-instructions">
                  Complete each step to unlock the next.
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground" data-testid="breadcrumb">
                  <span data-testid="breadcrumb-subject">{appData.subject}</span>
                  <span aria-hidden>•</span>
                  <span data-testid="breadcrumb-topic">{appData.topicTitle}</span>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <div className="text-xs text-muted-foreground" data-testid="text-step-counter">
                  Step {activeStep + 1} of {totalSteps}
                </div>
                <div className="mt-2">
                  <Badge
                    className="border border-primary/20 bg-accent text-foreground"
                    data-testid="badge-progress"
                  >
                    Progress: {Math.round((steps.filter((s) => completed[s.id]).length / totalSteps) * 100)}%
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5" data-testid="right-scroll">
            <div className="grid gap-4" data-testid="stack-step-cards">
              {steps.map((s, idx) => {
                const locked = isLocked(idx);
                const active = isActive(idx);
                const done = completed[s.id] === true;

                return (
                  <Card
                    key={s.id}
                    className={cn(
                      "rounded-2xl border border-border bg-white p-5 shadow-sm transition",
                      active && !locked && "step-active",
                      locked && "step-locked",
                    )}
                    data-testid={`card-step-${s.id}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <TinyLoRef>{s.loRef}</TinyLoRef>
                      <StepBadge locked={locked} active={active && !locked && !done} />
                    </div>

                    <div className="mt-2 flex items-center justify-between gap-3">
                      <div
                        className="text-lg font-semibold"
                        style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
                        data-testid={`text-step-title-${s.id}`}
                        id={`step-${idx + 1}-title`}
                      >
                        {s.title}
                      </div>
                      <div className="text-xs text-muted-foreground" data-testid={`text-step-meta-${s.id}`}>
                        {idx + 1}/{totalSteps}
                      </div>
                    </div>

                    {/* Body */}
                    {s.type === "concept" ? (
                      <div className="mt-3" data-testid={`panel-step-body-${s.id}`} id={`step-${idx + 1}-explanation`}>
                        {s.explanation}

                        {s.analogy ? (
                          <div className="mt-4 rounded-xl border border-border bg-secondary p-4" data-testid={`box-analogy-${s.id}`}>
                            <div className="text-xs font-semibold tracking-[0.14em] text-muted-foreground" data-testid={`text-analogy-title-${s.id}`} id={`step-${idx + 1}-analogy-title`}>
                              {s.analogy.title ?? "ANALOGY"}
                            </div>
                            <div className="mt-2" id={`step-${idx + 1}-analogy-content`}>{s.analogy.content}</div>
                          </div>
                        ) : null}

                        {s.workedExample ? (
                          <div className="mt-4 rounded-xl border border-border bg-white p-4" data-testid={`box-example-${s.id}`}>
                            <div className="text-xs font-semibold tracking-[0.14em] text-muted-foreground" data-testid={`text-example-title-${s.id}`} id={`step-${idx + 1}-example-title`}>
                              {s.workedExample.title ?? "WORKED EXAMPLE"}
                            </div>
                            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                              {s.workedExample.bullets.map((b, i) => (
                                <li key={i} data-testid={`text-example-bullet-${s.id}-${i}`} id={`step-${idx + 1}-example-bullet-${i}`}> {b}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    ) : null}

                    {s.type === "mcq" ? (
                      <div className="mt-3" data-testid={`panel-step-body-${s.id}`}>
                        {(s.mcqs ?? []).map((q) => (
                          <McqBlock
                            key={q.id}
                            mcqId={q.id}
                            stepIndex={idx}
                            question={q.question}
                            options={q.options}
                            state={mcqState[q.id]}
                            onPick={(optId) => onPickMcq(q.id, optId)}
                            locked={locked}
                          />
                        ))}
                      </div>
                    ) : null}

                    {s.type === "terms" || s.type === "summary" ? (
                      <div className="mt-3" data-testid={`panel-step-body-${s.id}`}>
                        {(s.cloze ?? []).map((line) => (
                          <ClozeLine
                            key={line.id}
                            clozeId={line.id}
                            stepIndex={idx}
                            sentence={line.sentence}
                            blanks={line.blanks}
                            state={clozeState[line.id]}
                            onSelect={(blankId, value) => onSelectCloze(line.id, blankId, value)}
                            locked={locked}
                          />
                        ))}
                      </div>
                    ) : null}

                    {s.type === "practice" && s.practice ? (
                      <div className="mt-3" data-testid={`panel-step-body-${s.id}`}>
                        <PracticeBlock
                          stepId={s.id}
                          stepIndex={idx}
                          practice={s.practice}
                          locked={locked}
                          attempts={attempts.practiceAttempts[s.id] ?? 0}
                          text={attempts.practiceText[s.id] ?? ""}
                          onChangeText={(v) => onChangePractice(s.id, v)}
                          onSubmit={() => onSubmitPractice(s.id)}
                          status={practiceEval[s.id]?.status}
                          feedback={practiceEval[s.id]?.feedback}
                          showScaffold={(attempts.practiceAttempts[s.id] ?? 0) >= 2 && practiceEval[s.id]?.status !== "Complete"}
                          showModel={showModel[s.id] === true && practiceEval[s.id]?.status === "Complete"}
                        />
                      </div>
                    ) : null}

                    {/* Continue */}
                    <div className="mt-5 flex items-center justify-between gap-3" data-testid={`row-continue-${s.id}`}>
                      <button
                        type="button"
                        className={cn(
                          "rounded-xl px-3 py-2 text-sm font-medium",
                          idx === activeStep ? "text-muted-foreground hover:bg-secondary" : "text-muted-foreground/70",
                        )}
                        onClick={() => {
                          if (locked) return;
                          setActiveStep(idx);
                        }}
                        disabled={locked}
                        data-testid={`button-jump-${s.id}`}
                      >
                        {locked ? "Locked" : active ? "You are here" : "Open"}
                      </button>

                      <Button
                        onClick={() => {
                          if (!canContinue || idx !== activeStep) return;
                          if (currentStep.id !== s.id) return;
                          if (!completed[s.id]) completeStepOnly(s.id);
                          if (activeStep < steps.length - 1) setActiveStep((x) => x + 1);
                        }}
                        disabled={locked || idx !== activeStep || !canContinue}
                        className="rounded-xl bg-primary text-primary-foreground"
                        data-testid={`button-continue-${s.id}`}
                      >
                        Continue <span className="ml-1">›</span>
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sticky footer */}
          <div
            className="sticky bottom-0 z-10 flex items-center justify-center gap-2 border-t border-primary/20 bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
            data-testid="footer-sticky"
          >
            Powered by Cognito Coding
            <img src={logo} alt="Cognito Coding Logo" className="h-5 w-5 object-contain" />
          </div>
        </div>
      </div>

      {/* Floating pencil button (mobile-friendly) */}
      <button
        type="button"
        onClick={() => setWhiteboardOpen(true)}
        className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg hover:brightness-95"
        data-testid="button-fab-whiteboard"
        aria-label="Open whiteboard"
      >
        <Pencil className="h-5 w-5" />
      </button>

      <Whiteboard open={whiteboardOpen} onOpenChange={setWhiteboardOpen} />
    </div>
  );
}