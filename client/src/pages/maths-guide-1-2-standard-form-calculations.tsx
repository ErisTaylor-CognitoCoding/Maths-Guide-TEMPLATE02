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

const APP_NAME = "Maths Guide 1.2 Standard form calculations";
const SUBJECT = "Maths";
const SPEC_REF = "1.2";
const TOPIC = "Standard form calculations";

const learningObjectives = [
  {
    id: "lo-multiply-divide",
    label:
      "Students should multiply and divide numbers in standard form by applying index laws",
    shortRef: "Math 1.2",
  },
  {
    id: "lo-add-subtract",
    label:
      "Students should add and subtract numbers in standard form by first ensuring the powers of 10 are the same",
    shortRef: "Math 1.2",
  },
  {
    id: "lo-convert",
    label:
      "Students should convert between ordinary numbers and standard form, and use calculators effectively to check answers involving very large or very small numbers",
    shortRef: "Math 1.2",
  },
] as const;

type StepType = "concept" | "mcq" | "terms" | "summary" | "practice";

type Step = {
  id: string;
  objectiveId: (typeof learningObjectives)[number]["id"];
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

const steps: Step[] = [
  // LO 1 — multiply/divide (index laws)
  {
    id: "s1-concept",
    objectiveId: "lo-multiply-divide",
    type: "concept",
    loRef: "MATH 1.2",
    title: "Multiply & divide in standard form using index laws",
    explanation: (
      <>
        <p className="text-sm leading-6 text-muted-foreground" data-testid="text-expl-multiply-1">
          Standard form (scientific notation) writes numbers as <span className="font-semibold">a × 10</span>
          <sup className="font-semibold">n</sup>, where <span className="font-semibold">1 ≤ a &lt; 10</span>.
          When multiplying or dividing, treat it as two parts: multiply/divide the <span className="font-semibold">coefficients</span>
          (the a-values) and then combine the powers of 10 using index laws.
        </p>
        <p className="mt-3 text-sm leading-6 text-muted-foreground" data-testid="text-expl-multiply-2">
          Index laws you need: <span className="font-semibold">10</span>
          <sup className="font-semibold">m</sup> × <span className="font-semibold">10</span>
          <sup className="font-semibold">n</sup> = <span className="font-semibold">10</span>
          <sup className="font-semibold">m+n</sup> and <span className="font-semibold">10</span>
          <sup className="font-semibold">m</sup> ÷ <span className="font-semibold">10</span>
          <sup className="font-semibold">n</sup> = <span className="font-semibold">10</span>
          <sup className="font-semibold">m-n</sup>.
        </p>
      </>
    ),
    analogy: {
      title: "Analogy",
      content: (
        <p className="text-sm leading-6 text-muted-foreground" data-testid="text-analogy-multiply">
          Think of the power of 10 as a “place-value shift”. When you multiply by 10, you shift left; dividing shifts right.
          Adding/subtracting indices is like combining two shifts into one net shift.
        </p>
      ),
    },
    workedExample: {
      title: "Worked example idea",
      bullets: [
        <span>(3.2 × 10<sup>5</sup>) × (4 × 10<sup>2</sup>)</span>,
        "Multiply coefficients: 3.2 × 4 = 12.8",
        <span>Add indices: 10<sup>5+2</sup> = 10<sup>7</sup></span>,
        <span>So: 12.8 × 10<sup>7</sup> → adjust to standard form: 1.28 × 10<sup>8</sup></span>,
      ],
    },
  },
  {
    id: "s1-mcq",
    objectiveId: "lo-multiply-divide",
    type: "mcq",
    loRef: "MATH 1.2",
    title: "Knowledge check: index laws in action",
    mcqs: [
      {
        id: "mcq-1a",
        question: <span>What is 10<sup>3</sup> × 10<sup>5</sup>?</span>,
        options: [
          { id: "a", label: <span>10<sup>15</sup></span>, isCorrect: false, explanation: "You add indices (3+5), not multiply them." },
          { id: "b", label: <span>10<sup>8</sup></span>, isCorrect: true, explanation: <span>Correct: 10<sup>3+5</sup> = 10<sup>8</sup>.</span> },
          { id: "c", label: <span>10<sup>2</sup></span>, isCorrect: false, explanation: "That would be subtraction (3−5)." },
          { id: "d", label: <span>10<sup>35</sup></span>, isCorrect: false, explanation: "That’s multiplying indices (3×5), which is not the law." },
        ],
      },
      {
        id: "mcq-1b",
        question: <span>(6 × 10<sup>4</sup>) ÷ (2 × 10<sup>2</sup>) = ?</span>,
        options: [
          { id: "a", label: <span>3 × 10<sup>2</sup></span>, isCorrect: true, explanation: <span>6÷2=3 and 10<sup>4−2</sup>=10<sup>2</sup>.</span> },
          { id: "b", label: <span>12 × 10<sup>6</sup></span>, isCorrect: false, explanation: "Division means subtract indices, not add, and 6÷2 is 3." },
          { id: "c", label: <span>3 × 10<sup>6</sup></span>, isCorrect: false, explanation: "You subtracted incorrectly: 4−2=2." },
          { id: "d", label: <span>8 × 10<sup>2</sup></span>, isCorrect: false, explanation: "Coefficient is 3, not 8." },
        ],
      },
    ],
  },
  {
    id: "s1-terms",
    objectiveId: "lo-multiply-divide",
    type: "terms",
    loRef: "MATH 1.2",
    title: "Key terminology: index laws (dropdown cloze)",
    cloze: [
      {
        id: "terms-1a",
        sentence: (
          <span data-testid="text-terms-sentence-1a">
            When multiplying powers of 10, you <span className="font-semibold">_____</span> the indices.
          </span>
        ),
        blanks: [
          {
            id: "blank-1a",
            options: [
              { value: "add", label: "add", isCorrect: true, feedback: "Correct: multiply → add indices." },
              { value: "subtract", label: "subtract", isCorrect: false, feedback: "Hint: subtraction is for division." },
              { value: "multiply", label: "multiply", isCorrect: false, feedback: "No—don’t multiply indices." },
              { value: "ignore", label: "ignore", isCorrect: false, feedback: "Indices matter: they tell you the power of 10." },
            ],
          },
        ],
      },
      {
        id: "terms-1b",
        sentence: (
          <span data-testid="text-terms-sentence-1b">
            When dividing powers of 10, you <span className="font-semibold">_____</span> the indices.
          </span>
        ),
        blanks: [
          {
            id: "blank-1b",
            options: [
              { value: "subtract", label: "subtract", isCorrect: true, feedback: "Correct: divide → subtract indices." },
              { value: "add", label: "add", isCorrect: false, feedback: "Hint: adding is for multiplication." },
              { value: "square", label: "square", isCorrect: false, feedback: "Squaring isn’t part of the index laws here." },
              { value: "swap", label: "swap", isCorrect: false, feedback: "No swapping needed—just subtract." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "s1-summary",
    objectiveId: "lo-multiply-divide",
    type: "summary",
    loRef: "MATH 1.2",
    title: "Summary: multiply/divide standard form",
    cloze: [
      {
        id: "summary-1",
        sentence: (
          <span data-testid="text-summary-sentence-1">
            To multiply or divide numbers in standard form, first combine the <span className="font-semibold">_____</span>
            , then use index laws on the powers of 10 by <span className="font-semibold">_____</span> indices for multiplication and
            <span className="font-semibold">_____</span> indices for division, and finally adjust so that 1 ≤ a &lt; 10.
          </span>
        ),
        blanks: [
          {
            id: "sum-blank-1",
            options: [
              {
                value: "coefficients",
                label: "coefficients",
                isCorrect: true,
                feedback: "Yes—work with the a-values first.",
              },
              { value: "decimals", label: "decimals", isCorrect: false, feedback: "Close—but it’s the coefficients that multiply/divide." },
              { value: "units", label: "units", isCorrect: false, feedback: "Units aren’t part of standard form here." },
              { value: "roots", label: "roots", isCorrect: false, feedback: "Roots aren’t involved." },
            ],
          },
          {
            id: "sum-blank-2",
            options: [
              { value: "adding", label: "adding", isCorrect: true, feedback: "Correct: multiply → add indices." },
              { value: "subtracting", label: "subtracting", isCorrect: false, feedback: "Hint: subtraction is for division." },
              { value: "doubling", label: "doubling", isCorrect: false, feedback: "Not quite—use index laws." },
              { value: "rounding", label: "rounding", isCorrect: false, feedback: "Rounding isn’t the method." },
            ],
          },
          {
            id: "sum-blank-3",
            options: [
              { value: "subtracting", label: "subtracting", isCorrect: true, feedback: "Correct: divide → subtract indices." },
              { value: "adding", label: "adding", isCorrect: false, feedback: "Hint: adding is for multiplication." },
              { value: "multiplying", label: "multiplying", isCorrect: false, feedback: "Don’t multiply indices." },
              { value: "ignoring", label: "ignoring", isCorrect: false, feedback: "Indices matter!" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "s1-practice",
    objectiveId: "lo-multiply-divide",
    type: "practice",
    loRef: "MATH 1.2",
    title: "Practice question",
    practice: {
      prompt:
        <span>Explain how you would calculate (7.5 × 10<sup>6</sup>) ÷ (3 × 10<sup>2</sup>) and write the final answer in standard form.</span>,
      mustHaveKeywords: ["divide coefficients", "subtract indices", "standard form", "1 ≤ a < 10"],
      optionalKeywords: ["7.5 ÷ 3", "10^(6−2)", "2.5 × 10^4"],
      modelAnswer:
        <span>Divide the coefficients: 7.5 ÷ 3 = 2.5. Subtract the indices for division: 10<sup>6</sup> ÷ 10<sup>2</sup> = 10<sup>6−2</sup> = 10<sup>4</sup>. Combine to get 2.5 × 10<sup>4</sup>, which is already in standard form because 1 ≤ 2.5 &lt; 10.</span>,
      scaffoldPrompts: [
        "What do you do with 7.5 and 3?",
        "What happens to the powers of 10 when dividing?",
        "Is your final coefficient between 1 and 10?",
      ],
      hint: "Make sure you mention what happens to the indices when dividing.",
    },
  },

  // LO 2 — add/subtract (match powers)
  {
    id: "s2-concept",
    objectiveId: "lo-add-subtract",
    type: "concept",
    loRef: "MATH 1.2",
    title: "Add & subtract in standard form (match the powers first)",
    explanation: (
      <>
        <p className="text-sm leading-6 text-muted-foreground" data-testid="text-expl-add-1">
          You can only add or subtract the coefficients when the powers of 10 match. That’s because <span className="font-semibold">2 × 10<sup>5</sup></span>
          and <span className="font-semibold">2 × 10<sup>6</sup></span> are different “units” of size (hundred-thousands vs millions).
        </p>
        <p className="mt-3 text-sm leading-6 text-muted-foreground" data-testid="text-expl-add-2">
          If the indices are different, convert one number so both have the same power of 10. Then add/subtract coefficients and adjust back into standard form.
        </p>
      </>
    ),
    analogy: {
      title: "Analogy",
      content: (
        <p className="text-sm leading-6 text-muted-foreground" data-testid="text-analogy-add">
          Like money: you can add £2 + £3 easily, but you can’t directly add £2 + 3p without converting so the “units” match.
          Matching powers of 10 is the maths version of matching units.
        </p>
      ),
    },
    workedExample: {
      title: "Worked example idea",
      bullets: [
        <span>(3.4 × 10<sup>5</sup>) + (7.2 × 10<sup>4</sup>)</span>,
        <span>Convert 7.2 × 10<sup>4</sup> to ×10<sup>5</sup>: 0.72 × 10<sup>5</sup></span>,
        "Add coefficients: 3.4 + 0.72 = 4.12",
        <span>Answer: 4.12 × 10<sup>5</sup> (already standard form)</span>,
      ],
    },
  },
  {
    id: "s2-mcq",
    objectiveId: "lo-add-subtract",
    type: "mcq",
    loRef: "MATH 1.2",
    title: "Knowledge check: matching powers",
    mcqs: [
      {
        id: "mcq-2a",
        question: <span>Which is a correct first step for (5.1×10<sup>6</sup>) + (3.0×10<sup>5</sup>)?</span>,
        options: [
          {
            id: "a",
            label: <span>Add coefficients immediately: 8.1×10<sup>11</sup></span>,
            isCorrect: false,
            explanation: "You can’t add until powers match; also the power is wrong.",
          },
          {
            id: "b",
            label: <span>Convert 3.0×10<sup>5</sup> to 0.30×10<sup>6</sup></span>,
            isCorrect: true,
            explanation: <span>Correct: make both powers 10<sup>6</sup> (or both 10<sup>5</sup>).</span>,
          },
          {
            id: "c",
            label: <span>Convert 5.1×10<sup>6</sup> to 51×10<sup>6</sup></span>,
            isCorrect: false,
            explanation: "That breaks the 1 ≤ a < 10 rule and doesn’t help matching powers.",
          },
          {
            id: "d",
            label: <span>Subtract indices: 10<sup>6−5</sup></span>,
            isCorrect: false,
            explanation: "Index subtraction is for division, not addition.",
          },
        ],
      },
    ],
  },
  {
    id: "s2-terms",
    objectiveId: "lo-add-subtract",
    type: "terms",
    loRef: "MATH 1.2",
    title: "Key terminology: matching powers (dropdown cloze)",
    cloze: [
      {
        id: "terms-2a",
        sentence: (
          <span data-testid="text-terms-sentence-2a">
            To add numbers in standard form, the powers of 10 must be <span className="font-semibold">_____</span>.
          </span>
        ),
        blanks: [
          {
            id: "blank-2a",
            options: [
              { value: "the same", label: "the same", isCorrect: true, feedback: "Correct: match the indices first." },
              { value: "bigger", label: "bigger", isCorrect: false, feedback: "Not bigger—just equal." },
              { value: "prime", label: "prime", isCorrect: false, feedback: "Prime numbers aren’t relevant here." },
              { value: "negative", label: "negative", isCorrect: false, feedback: "They can be, but they don’t have to be." },
            ],
          },
        ],
      },
      {
        id: "terms-2b",
        sentence: (
          <span data-testid="text-terms-sentence-2b">
            Changing <span className="font-semibold">3.0 × 10<sup>5</sup></span> to <span className="font-semibold">0.30 × 10<sup>6</sup></span> keeps the value the same because you moved the decimal one place and changed the index by <span className="font-semibold">_____</span>.
          </span>
        ),
        blanks: [
          {
            id: "blank-2b",
            options: [
              { value: "+1", label: "+1", isCorrect: true, feedback: "Yes: index increases by 1 when decimal moves left." },
              { value: "−1", label: "−1", isCorrect: false, feedback: <span>Hint: 10<sup>6</sup> is bigger than 10<sup>5</sup>, so the index went up.</span> },
              { value: "+2", label: "+2", isCorrect: false, feedback: "Only one place moved." },
              { value: "0", label: "0", isCorrect: false, feedback: "The index must change if the decimal moved." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "s2-summary",
    objectiveId: "lo-add-subtract",
    type: "summary",
    loRef: "MATH 1.2",
    title: "Summary: add/subtract standard form",
    cloze: [
      {
        id: "summary-2",
        sentence: (
          <span data-testid="text-summary-sentence-2">
            To add or subtract in standard form, first rewrite one number so both have the same <span className="font-semibold">_____</span>
            (power of 10). Then combine the <span className="font-semibold">_____</span> and finish by adjusting the result into standard form.
          </span>
        ),
        blanks: [
          {
            id: "sum2-blank-1",
            options: [
              { value: "index", label: "index", isCorrect: true, feedback: "Correct: match the power of 10 (the index)." },
              { value: "fraction", label: "fraction", isCorrect: false, feedback: "Fractions aren’t the focus here." },
              { value: "unit", label: "unit", isCorrect: false, feedback: "It’s similar to units, but the word here is index/power." },
              { value: "root", label: "root", isCorrect: false, feedback: "Roots aren’t involved." },
            ],
          },
          {
            id: "sum2-blank-2",
            options: [
              { value: "coefficients", label: "coefficients", isCorrect: true, feedback: "Yes: add/subtract the a-values." },
              { value: "indices", label: "indices", isCorrect: false, feedback: "Indices must match, but you don’t add them for addition." },
              { value: "denominators", label: "denominators", isCorrect: false, feedback: "No denominators here." },
              { value: "angles", label: "angles", isCorrect: false, feedback: "Angles are unrelated." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "s2-practice",
    objectiveId: "lo-add-subtract",
    type: "practice",
    loRef: "MATH 1.2",
    title: "Practice question",
    practice: {
      prompt:
        <span>Explain how you would calculate (4.8 × 10<sup>7</sup>) + (3.6 × 10<sup>6</sup>). Include the conversion step and the final answer in standard form.</span>,
      mustHaveKeywords: ["same power", "convert", "add coefficients", "standard form"],
      optionalKeywords: ["0.36 × 10^7", "4.8 + 0.36", "5.16 × 10^7"],
      modelAnswer:
        <span>Make the powers match by converting 3.6 × 10<sup>6</sup> to 0.36 × 10<sup>7</sup>. Then add coefficients: 4.8 + 0.36 = 5.16. Keep the power of 10 as 10<sup>7</sup>, giving 5.16 × 10<sup>7</sup>.</span>,
      scaffoldPrompts: [
        "Which number will you rewrite to match the power of 10?",
        <span>What happens to the coefficient when you change 10<sup>6</sup> to 10<sup>7</sup>?</span>,
        "After adding, is your coefficient between 1 and 10?",
      ],
      hint: "Make sure you mention matching the powers of 10 before adding.",
    },
  },

  // LO 3 — convert to/from standard form
  {
    id: "s3-concept",
    objectiveId: "lo-convert",
    type: "concept",
    loRef: "MATH 1.2",
    title: "Convert between ordinary numbers and standard form",
    explanation: (
      <>
        <p className="text-sm leading-6 text-muted-foreground" data-testid="text-expl-convert-1">
          Standard form is useful for very large or very small numbers. The key skill is moving the decimal point to make the coefficient between 1 and 10.
          Every time the decimal moves one place, the power of 10 changes by 1.
        </p>
        <p className="mt-3 text-sm leading-6 text-muted-foreground" data-testid="text-expl-convert-2">
          Moving the decimal <span className="font-semibold">left</span> makes the number smaller, so the index increases to compensate (for large numbers). Moving it <span className="font-semibold">right</span> makes the number bigger, so the index decreases (for small numbers).
        </p>
      </>
    ),
    analogy: {
      title: "Analogy",
      content: (
        <p className="text-sm leading-6 text-muted-foreground" data-testid="text-analogy-convert">
          It’s like zooming a map: when you zoom out (make the visible number smaller), you need a bigger scale factor to keep the real distance the same.
        </p>
      ),
    },
    workedExample: {
      title: "Worked example idea",
      bullets: [
        "Convert 3,500,000 to standard form",
        "Move decimal 6 places left: 3.5",
        <span>So: 3.5 × 10<sup>6</sup></span>,
        "Check quickly: 3.5 million matches 3,500,000",
      ],
    },
  },
  {
    id: "s3-mcq",
    objectiveId: "lo-convert",
    type: "mcq",
    loRef: "MATH 1.2",
    title: "Knowledge check: conversion",
    mcqs: [
      {
        id: "mcq-3a",
        question: "Which is the standard form of 0.00072?",
        options: [
          { id: "a", label: <span>7.2 × 10<sup>−4</sup></span>, isCorrect: true, explanation: <span>Move the decimal 4 places right to get 7.2, so use 10<sup>−4</sup>.</span> },
          { id: "b", label: <span>72 × 10<sup>−5</sup></span>, isCorrect: false, explanation: "Coefficient must be between 1 and 10." },
          { id: "c", label: <span>0.72 × 10<sup>−3</sup></span>, isCorrect: false, explanation: "Coefficient must be at least 1." },
          { id: "d", label: <span>7.2 × 10<sup>4</sup></span>, isCorrect: false, explanation: "The number is small, so the index should be negative." },
        ],
      },
    ],
  },
  {
    id: "s3-terms",
    objectiveId: "lo-convert",
    type: "terms",
    loRef: "MATH 1.2",
    title: "Key terminology: moving the decimal (dropdown cloze)",
    cloze: [
      {
        id: "terms-3a",
        sentence: (
          <span data-testid="text-terms-sentence-3a">
            If you move the decimal point left to make the coefficient between 1 and 10, the index generally becomes more <span className="font-semibold">_____</span>.
          </span>
        ),
        blanks: [
          {
            id: "blank-3a",
            options: [
              { value: "positive", label: "positive", isCorrect: true, feedback: "Correct: large numbers usually have positive indices." },
              { value: "negative", label: "negative", isCorrect: false, feedback: "Negative indices are typical for small numbers." },
              { value: "prime", label: "prime", isCorrect: false, feedback: "Prime isn’t relevant." },
              { value: "zero", label: "zero", isCorrect: false, feedback: "Sometimes, but not generally." },
            ],
          },
        ],
      },
      {
        id: "terms-3b",
        sentence: (
          <span data-testid="text-terms-sentence-3b">
            For small numbers like 0.00072, the index is usually <span className="font-semibold">_____</span>.
          </span>
        ),
        blanks: [
          {
            id: "blank-3b",
            options: [
              { value: "negative", label: "negative", isCorrect: true, feedback: "Correct: small numbers use negative powers." },
              { value: "positive", label: "positive", isCorrect: false, feedback: "Hint: positive powers make numbers bigger." },
              { value: "fractional", label: "fractional", isCorrect: false, feedback: "The index is an integer." },
              { value: "random", label: "random", isCorrect: false, feedback: "It follows the decimal shift." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "s3-summary",
    objectiveId: "lo-convert",
    type: "summary",
    loRef: "MATH 1.2",
    title: "Summary: conversion",
    cloze: [
      {
        id: "summary-3",
        sentence: (
          <span data-testid="text-summary-sentence-3">
            To write a number in standard form, move the decimal so the coefficient is between <span className="font-semibold">_____</span>
            and <span className="font-semibold">_____</span>. The number of places you move the decimal tells you the <span className="font-semibold">_____</span>
            , and small numbers use <span className="font-semibold">_____</span> indices.
          </span>
        ),
        blanks: [
          {
            id: "sum3-blank-1",
            options: [
              { value: "1", label: "1", isCorrect: true, feedback: "Yes: coefficient must be at least 1." },
              { value: "0", label: "0", isCorrect: false, feedback: "Coefficient can’t be 0." },
              { value: "10", label: "10", isCorrect: false, feedback: "10 is the upper bound." },
              { value: "100", label: "100", isCorrect: false, feedback: "Too large." },
            ],
          },
          {
            id: "sum3-blank-2",
            options: [
              { value: "10", label: "10", isCorrect: true, feedback: "Yes: coefficient must be less than 10." },
              { value: "1", label: "1", isCorrect: false, feedback: "That would force coefficient = 1 only." },
              { value: "0", label: "0", isCorrect: false, feedback: "Not possible." },
              { value: "1000", label: "1000", isCorrect: false, feedback: "Too large." },
            ],
          },
          {
            id: "sum3-blank-3",
            options: [
              { value: "index", label: "index", isCorrect: true, feedback: "Correct: decimal moves decide the index." },
              { value: "angle", label: "angle", isCorrect: false, feedback: "Angles aren’t involved." },
              { value: "denominator", label: "denominator", isCorrect: false, feedback: "No denominators." },
              { value: "gradient", label: "gradient", isCorrect: false, feedback: "Not relevant." },
            ],
          },
          {
            id: "sum3-blank-4",
            options: [
              { value: "negative", label: "negative", isCorrect: true, feedback: "Correct: small numbers use negative powers." },
              { value: "positive", label: "positive", isCorrect: false, feedback: "Hint: positive powers make numbers bigger." },
              { value: "fractional", label: "fractional", isCorrect: false, feedback: "The index is an integer." },
              { value: "odd", label: "odd", isCorrect: false, feedback: "Odd/even doesn’t matter." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "s3-practice",
    objectiveId: "lo-convert",
    type: "practice",
    loRef: "MATH 1.2",
    title: "Practice question",
    practice: {
      prompt:
        "Convert 9,300,000,000 into standard form and explain how you know the index is correct. Mention how a calculator can help you check.",
      mustHaveKeywords: ["decimal", "places", "index", "standard form", "calculator"],
      optionalKeywords: ["9.3 × 10^9", "move decimal 9 places", "check by multiplying"],
      modelAnswer:
        <span>9,300,000,000 = 9.3 × 10<sup>9</sup> because moving the decimal 9 places left turns 9,300,000,000 into 9.3, so the index is 9. You can check with a calculator by entering 9.3E9 (or 9.3 × 10<sup>9</sup>) and confirming it displays 9,300,000,000.</span>,
      scaffoldPrompts: [
        "Where should the decimal go to make a between 1 and 10?",
        "How many places did you move it?",
        "How would you check using E-notation on a calculator?",
      ],
      hint: "Mention counting decimal moves to get the index.",
    },
  },
];

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
        <Badge
          variant="secondary"
          className="border border-border bg-secondary text-foreground"
          data-testid="badge-diagram-stage"
        >
          Stage {clamp(stage, 0, 999)}
        </Badge>
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
  question,
  options,
  state,
  onPick,
  locked,
}: {
  mcqId: string;
  question: React.ReactNode;
  options: { id: string; label: React.ReactNode; isCorrect: boolean; explanation: React.ReactNode }[];
  state?: { selectedId?: string; isCorrect?: boolean; feedback?: React.ReactNode };
  onPick: (optionId: string) => void;
  locked: boolean;
}) {
  const selected = state?.selectedId;
  const isCorrect = state?.isCorrect;

  return (
    <div className="mt-4" data-testid={`mcq-${mcqId}`}>
      <div className="text-sm font-semibold" data-testid={`text-mcq-question-${mcqId}`}>
        {question}
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
                <span className={cn(correctSelected && "text-[hsl(142_60%_28%)]", wrongSelected && "text-foreground")}>
                  {o.label}
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
        <FeedbackPill tone={isCorrect ? "success" : "hint"}>{state.feedback}</FeedbackPill>
      ) : null}
    </div>
  );
}

function ClozeLine({
  clozeId,
  sentence,
  blanks,
  state,
  onSelect,
  locked,
}: {
  clozeId: string;
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
      <div className="text-sm leading-6 text-foreground" data-testid={`text-cloze-sentence-${clozeId}`}>
        {sentence}
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
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selection?.feedback ? (
                <FeedbackPill tone={isCorrect ? "success" : "hint"}>{selection.feedback}</FeedbackPill>
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
      <div className="text-sm leading-6 text-muted-foreground" data-testid={`text-practice-prompt-${stepId}`}>
        {practice.prompt}
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
          {feedback ? <FeedbackPill tone={status === "Complete" ? "success" : "hint"}>{feedback}</FeedbackPill> : null}

          {showScaffold ? (
            <div className="mt-3 rounded-xl border border-border bg-secondary p-3" data-testid={`panel-scaffold-${stepId}`}>
              <div className="text-xs font-semibold text-foreground" data-testid={`text-scaffold-title-${stepId}`}>
                Scaffold prompts
              </div>
              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                {practice.scaffoldPrompts.map((p, i) => (
                  <li key={i} data-testid={`text-scaffold-${stepId}-${i}`}> {p}</li>
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
                {practice.modelAnswer}
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

export default function MathsGuideStandardForm() {
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

  const totalSteps = steps.length;
  const currentStep = steps[activeStep];

  const isStepComplete = (stepIndex: number) => completed[steps[stepIndex]?.id] === true;
  const isLocked = (stepIndex: number) => stepIndex > 0 && !isStepComplete(stepIndex - 1);
  const isActive = (stepIndex: number) => stepIndex === activeStep;

  const currentObjectiveIndex = learningObjectives.findIndex((o) => o.id === currentStep.objectiveId);
  const objectiveCompletion = learningObjectives.map((lo) => {
    const loSteps = steps.filter((s) => s.objectiveId === lo.id).map((s) => s.id);
    const done = loSteps.every((sid) => completed[sid]);
    return { loId: lo.id, done };
  });

  const diagramStage = React.useMemo(() => {
    // Simple mapping: completed steps contribute; active step contributes a half stage
    const doneCount = steps.filter((s) => completed[s.id]).length;
    return doneCount + (isStepComplete(activeStep) ? 0 : 0);
  }, [completed, activeStep]);

  const markCompleteAndAdvance = React.useCallback(
    (stepId: string) => {
      setCompleted((p) => ({ ...p, [stepId]: true }));
      setActiveStep((i) => clamp(i + 1, 0, steps.length - 1));
    },
    [setCompleted, setActiveStep],
  );

  const completeStepOnly = React.useCallback((stepId: string) => {
    setCompleted((p) => ({ ...p, [stepId]: true }));
  }, []);

  const canContinue = React.useMemo(() => {
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
    if (!canContinue) return;
    if (!completed[currentStep.id]) {
      completeStepOnly(currentStep.id);
    }
    if (activeStep < steps.length - 1) setActiveStep((s) => s + 1);
  };

  const onPickMcq = (mcqId: string, optionId: string) => {
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
        feedback: opt.isCorrect ? opt.explanation : `Hint: ${opt.explanation}`,
      },
    }));
  };

  const onSelectCloze = (lineId: string, blankId: string, value: string) => {
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
            feedback: option.isCorrect ? option.feedback : `Hint: ${option.feedback}`,
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

  const leftSubtitle = "Multiply/divide, add/subtract, and convert confidently.";

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
                    {SUBJECT}
                  </Badge>
                  <div className="text-xs text-muted-foreground" data-testid="text-spec-ref" id="spec-code">
                    Spec {SPEC_REF}
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-semibold leading-tight" style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }} data-testid="text-topic-title" id="topic-title">
                    {TOPIC}
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
                  {learningObjectives.map((lo, idx) => {
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

            <div className={cn("mt-4 flex min-h-0 flex-1 flex-col", diagramStage > 0 ? "h-full" : "")} data-testid="left-diagram-wrap">
              <Diagram stage={diagramStage} />
            </div>

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
                    <ul className="list-disc space-y-1 pl-5">
                      <li data-testid="text-quick-note-0">Standard form: a × 10<sup>n</sup> with 1 ≤ a &lt; 10</li>
                      <li data-testid="text-quick-note-1">Multiply: add indices (10<sup>m</sup> × 10<sup>n</sup> = 10<sup>m+n</sup>)</li>
                      <li data-testid="text-quick-note-2">Divide: subtract indices (10<sup>m</sup> ÷ 10<sup>n</sup> = 10<sup>m−n</sup>)</li>
                      <li data-testid="text-quick-note-3">Add/subtract: powers must match first</li>
                    </ul>
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
                  <span className="gradient-title">{APP_NAME}</span>
                </div>
                <div className="mt-1 text-sm text-muted-foreground" data-testid="text-right-instructions">
                  Complete each step to unlock the next.
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground" data-testid="breadcrumb">
                  <span data-testid="breadcrumb-subject">{SUBJECT}</span>
                  <span aria-hidden>•</span>
                  <span data-testid="breadcrumb-topic">{TOPIC}</span>
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
                        id={idx === 0 ? "step1-title" : undefined}
                      >
                        {s.title}
                      </div>
                      <div className="text-xs text-muted-foreground" data-testid={`text-step-meta-${s.id}`}>
                        {idx + 1}/{totalSteps}
                      </div>
                    </div>

                    {/* Body */}
                    {s.type === "concept" ? (
                      <div className="mt-3" data-testid={`panel-step-body-${s.id}`} id={idx === 0 ? "step1-body" : undefined}>
                        {s.explanation}

                        {s.analogy ? (
                          <div className="mt-4 rounded-xl border border-border bg-secondary p-4" data-testid={`box-analogy-${s.id}`}>
                            <div className="text-xs font-semibold tracking-[0.14em] text-muted-foreground" data-testid={`text-analogy-title-${s.id}`}>
                              {s.analogy.title ?? "ANALOGY"}
                            </div>
                            <div className="mt-2">{s.analogy.content}</div>
                          </div>
                        ) : null}

                        {s.workedExample ? (
                          <div className="mt-4 rounded-xl border border-border bg-white p-4" data-testid={`box-example-${s.id}`}>
                            <div className="text-xs font-semibold tracking-[0.14em] text-muted-foreground" data-testid={`text-example-title-${s.id}`}>
                              {s.workedExample.title ?? "WORKED EXAMPLE"}
                            </div>
                            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                              {s.workedExample.bullets.map((b, i) => (
                                <li key={i} data-testid={`text-example-bullet-${s.id}-${i}`}> {b}</li>
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
