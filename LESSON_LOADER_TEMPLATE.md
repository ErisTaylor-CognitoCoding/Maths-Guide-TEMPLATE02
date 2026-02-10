# Instruction for LLM: Generating Lesson Content

You are a lesson generator. Your task is to output a VALID Javascript file that assigns a configuration object to `window.lessonContent`.

**STRICT RULES:**
1. Do NOT wrap the output in markdown code blocks (like ```javascript). Output RAW code only.
2. The output must start exactly with: `window.lessonContent = {`
3. The keys (`step1`, `step2`...) must follow the sequence exactly.
4. Do NOT invent new step types. Use only: `concept`, `mcq`, `terms` (cloze), `summary` (cloze), or `practice`.
5. All text fields support simple HTML tags: `<span>`, `<strong>`, `<em>`, `<sup>` (for powers/indices), `<sub>`.
6. Ensure all JSON syntax is valid (commas, quotes, etc.).

---

## Template Structure (Copy this structure exactly)

```javascript
window.lessonContent = {
  // META INFO
  subject: "Maths", // e.g. Maths, Science, Physics
  specCode: "1.2",  // e.g. 1.2, P1.4
  topicTitle: "Full Topic Title Here",
  strapline: "Short catchy summary of what will be learnt.",
  learningObjectives: [
    "Objective 1 string",
    "Objective 2 string",
    "Objective 3 string"
  ],

  // STEPS (Generate step1 through step20 as needed)
  
  // TYPE 1: CONCEPT / EXPLANATION
  step1: {
    title: "Step Title",
    explanation: `<p class="text-sm leading-6 text-muted-foreground">Main explanation text here. Use <span class="font-semibold">bold</span> for emphasis.</p>`,
    // Optional: Analogy
    analogy: {
      title: "Analogy",
      content: `<p class="text-sm leading-6 text-muted-foreground">Real world comparison here.</p>`
    },
    // Optional: Worked Example
    workedExample: {
      title: "Worked Example",
      bullets: [
        `<span>Step 1 of example</span>`,
        `<span>Step 2 of example</span>`,
        `<span>Final answer</span>`
      ]
    }
  },

  // TYPE 2: MCQ (Multiple Choice)
  step2: {
    title: "Knowledge Check",
    mcqs: [
      {
        id: "mcq-1",
        question: `<span>Question text here?</span>`,
        options: [
          { id: "a", label: `<span>Option A text</span>`, isCorrect: true, explanation: "Why it is correct." },
          { id: "b", label: `<span>Option B text</span>`, isCorrect: false, explanation: "Why it is wrong." },
          { id: "c", label: `<span>Option C text</span>`, isCorrect: false, explanation: "Why it is wrong." },
          { id: "d", label: `<span>Option D text</span>`, isCorrect: false, explanation: "Why it is wrong." }
        ]
      }
    ]
  },

  // TYPE 3: CLOZE (Fill in the blanks) - Used for "Terms" or "Summary"
  step3: {
    title: "Key Terminology", // or "Summary"
    cloze: [
      {
        id: "cloze-1",
        // The sentence with blanks replaced by _____
        sentence: `<span>The power of 10 tells you how many places to move the <span class="font-semibold">_____</span> point.</span>`,
        blanks: [
          {
            id: "blank-1",
            options: [
              { value: "decimal", label: "decimal", isCorrect: true, feedback: "Correct!" },
              { value: "binary", label: "binary", isCorrect: false, feedback: "Wrong." },
              { value: "zero", label: "zero", isCorrect: false, feedback: "Wrong." },
              { value: "end", label: "end", isCorrect: false, feedback: "Wrong." }
            ]
          }
        ]
      }
    ]
  },

  // TYPE 4: PRACTICE (Open ended with model answer)
  step4: {
    title: "Practice Question",
    practice: {
      prompt: `<span>Calculate (3 x 10<sup>4</sup>) x (2 x 10<sup>3</sup>).</span>`,
      mustHaveKeywords: ["multiply", "add indices", "6", "10^7"], // Keywords to check in student answer
      optionalKeywords: ["standard form"],
      modelAnswer: `<span>Multiply coefficients (3x2=6). Add indices (4+3=7). Answer: 6 x 10<sup>7</sup>.</span>`,
      scaffoldPrompts: [
        "What is 3 x 2?",
        "What do you do with indices when multiplying?",
        "Combine them."
      ],
      hint: "Remember the index laws."
    }
  }
};
```
