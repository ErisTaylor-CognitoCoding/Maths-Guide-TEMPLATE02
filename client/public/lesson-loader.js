window.lessonContent = {
  subject: "Maths",
  specCode: "MATH 1.2",
  topicTitle: "Maths Guide 1.2 Standard form calculations",
  strapline: "Multiply/divide, add/subtract, and convert confidently.",
  learningObjectives: [
    "Students should multiply and divide numbers in standard form by applying index laws",
    "Students should add and subtract numbers in standard form by first ensuring the powers of 10 are the same",
    "Students should convert between ordinary numbers and standard form, and use calculators effectively to check answers involving very large or very small numbers"
  ],
  step1: {
    title: "Multiply & divide in standard form using index laws",
    explanation: `<p class="text-sm leading-6 text-muted-foreground">Standard form (scientific notation) writes numbers as <span class="font-semibold">a × 10</span><sup class="font-semibold">n</sup>, where <span class="font-semibold">1 ≤ a < 10</span>. When multiplying or dividing, treat it as two parts: multiply/divide the <span class="font-semibold">coefficients</span> (the a-values) and then combine the powers of 10 using index laws.</p><p class="mt-3 text-sm leading-6 text-muted-foreground">Index laws you need: <span class="font-semibold">10</span><sup class="font-semibold">m</sup> × <span class="font-semibold">10</span><sup class="font-semibold">n</sup> = <span class="font-semibold">10</span><sup class="font-semibold">m+n</sup> and <span class="font-semibold">10</span><sup class="font-semibold">m</sup> ÷ <span class="font-semibold">10</span><sup class="font-semibold">n</sup> = <span class="font-semibold">10</span><sup class="font-semibold">m-n</sup>.</p>`,
    analogy: {
      title: "Analogy",
      content: `<p class="text-sm leading-6 text-muted-foreground">Think of the power of 10 as a “place-value shift”. When you multiply by 10, you shift left; dividing shifts right. Adding/subtracting indices is like combining two shifts into one net shift.</p>`
    },
    workedExample: {
      title: "Worked example idea",
      bullets: [
        `<span>(3.2 × 10<sup>5</sup>) × (4 × 10<sup>2</sup>)</span>`,
        `Multiply coefficients: 3.2 × 4 = 12.8`,
        `<span>Add indices: 10<sup>5+2</sup> = 10<sup>7</sup></span>`,
        `<span>So: 12.8 × 10<sup>7</sup> → adjust to standard form: 1.28 × 10<sup>8</sup></span>`
      ]
    }
  },
  step2: {
    title: "Knowledge check: index laws in action",
    mcqs: [
      {
        id: "mcq-1a",
        question: `<span>What is 10<sup>3</sup> × 10<sup>5</sup>?</span>`,
        options: [
          { id: "a", label: `<span>10<sup>15</sup></span>` },
          { id: "b", label: `<span>10<sup>8</sup></span>` },
          { id: "c", label: `<span>10<sup>2</sup></span>` },
          { id: "d", label: `<span>10<sup>35</sup></span>` }
        ]
      },
      {
        id: "mcq-1b",
        question: `<span>(6 × 10<sup>4</sup>) ÷ (2 × 10<sup>2</sup>) = ?</span>`,
        options: [
          { id: "a", label: `<span>3 × 10<sup>2</sup></span>` },
          { id: "b", label: `<span>12 × 10<sup>6</sup></span>` },
          { id: "c", label: `<span>3 × 10<sup>6</sup></span>` },
          { id: "d", label: `<span>8 × 10<sup>2</sup></span>` }
        ]
      }
    ]
  },
  step3: {
    title: "Key terminology: index laws (dropdown cloze)",
    cloze: [
      {
        id: "terms-1a",
        sentence: `<span>When multiplying powers of 10, you <span class="font-semibold">_____</span> the indices.</span>`,
        blanks: [
          {
            id: "blank-1a",
            options: [
              { value: "add", label: "add", isCorrect: true, feedback: "Correct: multiply → add indices." },
              { value: "subtract", label: "subtract", isCorrect: false, feedback: "Hint: subtraction is for division." },
              { value: "multiply", label: "multiply", isCorrect: false, feedback: "No—don’t multiply indices." },
              { value: "ignore", label: "ignore", isCorrect: false, feedback: "Indices matter: they tell you the power of 10." }
            ]
          }
        ]
      },
      {
        id: "terms-1b",
        sentence: `<span>When dividing powers of 10, you <span class="font-semibold">_____</span> the indices.</span>`,
        blanks: [
          {
            id: "blank-1b",
            options: [
              { value: "subtract", label: "subtract", isCorrect: true, feedback: "Correct: divide → subtract indices." },
              { value: "add", label: "add", isCorrect: false, feedback: "Hint: adding is for multiplication." },
              { value: "square", label: "square", isCorrect: false, feedback: "Squaring isn’t part of the index laws here." },
              { value: "swap", label: "swap", isCorrect: false, feedback: "No swapping needed—just subtract." }
            ]
          }
        ]
      }
    ]
  },
  step4: {
    title: "Summary: multiply/divide standard form",
    cloze: [
      {
        id: "summary-1",
        sentence: `<span>To multiply or divide numbers in standard form, first combine the <span class="font-semibold">_____</span>, then use index laws on the powers of 10 by <span class="font-semibold">_____</span> indices for multiplication and <span class="font-semibold">_____</span> indices for division, and finally adjust so that 1 ≤ a < 10.</span>`,
        blanks: [
          {
            id: "sum-blank-1",
            options: [
              { value: "coefficients", label: "coefficients", isCorrect: true, feedback: "Yes—work with the a-values first." },
              { value: "decimals", label: "decimals", isCorrect: false, feedback: "Close—but it’s the coefficients that multiply/divide." },
              { value: "units", label: "units", isCorrect: false, feedback: "Units aren’t part of standard form here." },
              { value: "roots", label: "roots", isCorrect: false, feedback: "Roots aren’t involved." }
            ]
          },
          {
            id: "sum-blank-2",
            options: [
              { value: "adding", label: "adding", isCorrect: true, feedback: "Correct: multiply → add indices." },
              { value: "subtracting", label: "subtracting", isCorrect: false, feedback: "Hint: subtraction is for division." },
              { value: "doubling", label: "doubling", isCorrect: false, feedback: "Not quite—use index laws." },
              { value: "rounding", label: "rounding", isCorrect: false, feedback: "Rounding isn’t the method." }
            ]
          },
          {
            id: "sum-blank-3",
            options: [
              { value: "subtracting", label: "subtracting", isCorrect: true, feedback: "Correct: divide → subtract indices." },
              { value: "adding", label: "adding", isCorrect: false, feedback: "Hint: adding is for multiplication." },
              { value: "multiplying", label: "multiplying", isCorrect: false, feedback: "Don’t multiply indices." },
              { value: "ignoring", label: "ignoring", isCorrect: false, feedback: "Indices matter!" }
            ]
          }
        ]
      }
    ]
  },
  step5: {
    title: "Practice question",
    practice: {
      prompt: `<span>Explain how you would calculate (7.5 × 10<sup>6</sup>) ÷ (3 × 10<sup>2</sup>) and write the final answer in standard form.</span>`,
      mustHaveKeywords: ["divide coefficients", "subtract indices", "standard form", "1 ≤ a < 10"],
      optionalKeywords: ["7.5 ÷ 3", "10^(6−2)", "2.5 × 10^4"],
      modelAnswer: `<span>Divide the coefficients: 7.5 ÷ 3 = 2.5. Subtract the indices for division: 10<sup>6</sup> ÷ 10<sup>2</sup> = 10<sup>6−2</sup> = 10<sup>4</sup>. Combine to get 2.5 × 10<sup>4</sup>, which is already in standard form because 1 ≤ 2.5 < 10.</span>`,
      scaffoldPrompts: [
        "What do you do with 7.5 and 3?",
        "What happens to the powers of 10 when dividing?",
        "Is your final coefficient between 1 and 10?"
      ],
      hint: "Make sure you mention what happens to the indices when dividing."
    }
  },
  step6: {
    title: "Add & subtract in standard form (match the powers first)",
    explanation: `<p class="text-sm leading-6 text-muted-foreground">You can only add or subtract the coefficients when the powers of 10 match. That’s because <span class="font-semibold">2 × 10<sup>5</sup></span> and <span class="font-semibold">2 × 10<sup>6</sup></span> are different “units” of size (hundred-thousands vs millions).</p><p class="mt-3 text-sm leading-6 text-muted-foreground">If the indices are different, convert one number so both have the same power of 10. Then add/subtract coefficients and adjust back into standard form.</p>`,
    analogy: {
      title: "Analogy",
      content: `<p class="text-sm leading-6 text-muted-foreground">Like money: you can add £2 + £3 easily, but you can’t directly add £2 + 3p without converting so the “units” match. Matching powers of 10 is the maths version of matching units.</p>`
    },
    workedExample: {
      title: "Worked example idea",
      bullets: [
        `<span>(3.4 × 10<sup>5</sup>) + (7.2 × 10<sup>4</sup>)</span>`,
        `<span>Convert 7.2 × 10<sup>4</sup> to ×10<sup>5</sup>: 0.72 × 10<sup>5</sup></span>`,
        `Add coefficients: 3.4 + 0.72 = 4.12`,
        `<span>Answer: 4.12 × 10<sup>5</sup> (already standard form)</span>`
      ]
    }
  },
  step7: {
    title: "Knowledge check: matching powers",
    mcqs: [
      {
        id: "mcq-2a",
        question: `<span>Which is a correct first step for (5.1×10<sup>6</sup>) + (3.0×10<sup>5</sup>)?</span>`,
        options: [
          { id: "a", label: `<span>Add coefficients immediately: 8.1×10<sup>11</sup></span>` },
          { id: "b", label: `<span>Convert 3.0×10<sup>5</sup> to 0.30×10<sup>6</sup></span>` },
          { id: "c", label: `<span>Convert 5.1×10<sup>6</sup> to 51×10<sup>6</sup></span>` },
          { id: "d", label: `<span>Subtract indices: 10<sup>6−5</sup></span>` }
        ]
      }
    ]
  },
  step8: {
    title: "Key terminology: matching powers (dropdown cloze)",
    cloze: [
      {
        id: "terms-2a",
        sentence: `<span>To add numbers in standard form, the powers of 10 must be <span class="font-semibold">_____</span>.</span>`,
        blanks: [
          {
            id: "blank-2a",
            options: [
              { value: "the same", label: "the same", isCorrect: true, feedback: "Correct: match the indices first." },
              { value: "bigger", label: "bigger", isCorrect: false, feedback: "Not bigger—just equal." },
              { value: "prime", label: "prime", isCorrect: false, feedback: "Prime numbers aren’t relevant here." },
              { value: "negative", label: "negative", isCorrect: false, feedback: "They can be, but they don’t have to be." }
            ]
          }
        ]
      },
      {
        id: "terms-2b",
        sentence: `<span>Changing <span class="font-semibold">3.0 × 10<sup>5</sup></span> to <span class="font-semibold">0.30 × 10<sup>6</sup></span> keeps the value the same because you moved the decimal one place and changed the index by <span class="font-semibold">_____</span>.</span>`,
        blanks: [
          {
            id: "blank-2b",
            options: [
              { value: "+1", label: "+1", isCorrect: true, feedback: "Yes: index increases by 1 when decimal moves left." },
              { value: "−1", label: "−1", isCorrect: false, feedback: `Hint: 10<sup>6</sup> is bigger than 10<sup>5</sup>, so the index went up.` },
              { value: "+2", label: "+2", isCorrect: false, feedback: "Only one place moved." },
              { value: "0", label: "0", isCorrect: false, feedback: "The index must change if the decimal moved." }
            ]
          }
        ]
      }
    ]
  },
  step9: {
    title: "Summary: add/subtract standard form",
    cloze: [
      {
        id: "summary-2",
        sentence: `<span>To add or subtract in standard form, first rewrite one number so both have the same <span class="font-semibold">_____</span> (power of 10). Then combine the <span class="font-semibold">_____</span> and finish by adjusting the result into standard form.</span>`,
        blanks: [
          {
            id: "sum2-blank-1",
            options: [
              { value: "index", label: "index", isCorrect: true, feedback: "Correct: match the power of 10 (the index)." },
              { value: "fraction", label: "fraction", isCorrect: false, feedback: "Fractions aren’t the focus here." },
              { value: "unit", label: "unit", isCorrect: false, feedback: "It’s similar to units, but the word here is index/power." },
              { value: "root", label: "root", isCorrect: false, feedback: "Roots aren’t involved." }
            ]
          },
          {
            id: "sum2-blank-2",
            options: [
              { value: "coefficients", label: "coefficients", isCorrect: true, feedback: "Yes: add/subtract the a-values." },
              { value: "indices", label: "indices", isCorrect: false, feedback: "Indices must match, but you don’t add them for addition." },
              { value: "denominators", label: "denominators", isCorrect: false, feedback: "No denominators here." },
              { value: "angles", label: "angles", isCorrect: false, feedback: "Angles are unrelated." }
            ]
          }
        ]
      }
    ]
  },
  step10: {
    title: "Practice question",
    practice: {
      prompt: `<span>Explain how you would calculate (4.8 × 10<sup>7</sup>) + (3.6 × 10<sup>6</sup>). Include the conversion step and the final answer in standard form.</span>`,
      mustHaveKeywords: ["same power", "convert", "add coefficients", "standard form"],
      optionalKeywords: ["0.36 × 10^7", "4.8 + 0.36", "5.16 × 10^7"],
      modelAnswer: `<span>Make the powers match by converting 3.6 × 10<sup>6</sup> to 0.36 × 10<sup>7</sup>. Then add coefficients: 4.8 + 0.36 = 5.16. Keep the power of 10 as 10<sup>7</sup>, giving 5.16 × 10<sup>7</sup>.</span>`,
      scaffoldPrompts: [
        "Which number will you rewrite to match the power of 10?",
        `<span>What happens to the coefficient when you change 10<sup>6</sup> to 10<sup>7</sup>?</span>`,
        "After adding, is your coefficient between 1 and 10?"
      ],
      hint: "Make sure you mention matching the powers of 10 before adding."
    }
  },
  step11: {
    title: "Convert between ordinary numbers and standard form",
    explanation: `<p class="text-sm leading-6 text-muted-foreground">Standard form is useful for very large or very small numbers. The key skill is moving the decimal point to make the coefficient between 1 and 10. Every time the decimal moves one place, the power of 10 changes by 1.</p><p class="mt-3 text-sm leading-6 text-muted-foreground">Moving the decimal <span class="font-semibold">left</span> makes the number smaller, so the index increases to compensate (for large numbers). Moving it <span class="font-semibold">right</span> makes the number bigger, so the index decreases (for small numbers).</p>`,
    analogy: {
      title: "Analogy",
      content: `<p class="text-sm leading-6 text-muted-foreground">It’s like zooming a map: when you zoom out (make the visible number smaller), you need a bigger scale factor to keep the real distance the same.</p>`
    },
    workedExample: {
      title: "Worked example idea",
      bullets: [
        `Convert 3,500,000 to standard form`,
        `Move decimal 6 places left: 3.5`,
        `<span>So: 3.5 × 10<sup>6</sup></span>`,
        `Check quickly: 3.5 million matches 3,500,000`
      ]
    }
  },
  step12: {
    title: "Knowledge check: conversion",
    mcqs: [
      {
        id: "mcq-3a",
        question: `Which is the standard form of 0.00072?`,
        options: [
          { id: "a", label: `<span>7.2 × 10<sup>−4</sup></span>` },
          { id: "b", label: `<span>72 × 10<sup>−5</sup></span>` },
          { id: "c", label: `<span>0.72 × 10<sup>−3</sup></span>` },
          { id: "d", label: `<span>7.2 × 10<sup>4</sup></span>` }
        ]
      }
    ]
  },
  step13: {
    title: "Key terminology: moving the decimal (dropdown cloze)",
    cloze: [
      {
        id: "terms-3a",
        sentence: `<span>If you move the decimal point left to make the coefficient between 1 and 10, the index generally becomes more <span class="font-semibold">_____</span>.</span>`,
        blanks: [
           {
            id: "blank-3a",
            options: [
              { value: "positive", label: "positive", isCorrect: true, feedback: "Yes: left move → larger index." },
              { value: "negative", label: "negative", isCorrect: false, feedback: "Opposite direction." },
              { value: "random", label: "random", isCorrect: false, feedback: "Not random." },
              { value: "zero", label: "zero", isCorrect: false, feedback: "No." }
            ]
          }
        ]
      },
      {
        id: "terms-3b",
        sentence: `<span>If you move the decimal point right (for a small number like 0.005), the index becomes <span class="font-semibold">_____</span>.</span>`,
        blanks: [
           {
            id: "blank-3b",
            options: [
              { value: "negative", label: "negative", isCorrect: true, feedback: "Correct: right move → smaller index." },
              { value: "positive", label: "positive", isCorrect: false, feedback: "Opposite direction." },
              { value: "unstable", label: "unstable", isCorrect: false, feedback: "No." },
              { value: "infinite", label: "infinite", isCorrect: false, feedback: "No." }
            ]
          }
        ]
      }
    ]
  },
  step14: {
    title: "Summary: conversion",
    cloze: [
      {
        id: "summary-3",
        sentence: `<span>To convert an ordinary number to standard form, place the decimal after the first non-zero digit to create a coefficient between <span class="font-semibold">_____</span> and 10. Then count how many places the decimal moved to find the power of 10.</span>`,
        blanks: [
           {
            id: "sum3-blank-1",
            options: [
              { value: "1", label: "1", isCorrect: true, feedback: "Correct: 1 ≤ a < 10." },
              { value: "0", label: "0", isCorrect: false, feedback: "Too small." },
              { value: "10", label: "10", isCorrect: false, feedback: "Too big." },
              { value: "100", label: "100", isCorrect: false, feedback: "Too big." }
            ]
          }
        ]
      }
    ]
  },
  step15: {
    title: "Practice question",
    practice: {
      prompt: `<span>Convert 0.000045 into standard form and explain why the index is negative.</span>`,
       mustHaveKeywords: ["decimal right", "negative index", "standard form"],
      optionalKeywords: ["4.5 x 10^-5"],
      modelAnswer: `<span>Move the decimal 5 places to the right to get 4.5. Because we moved right (making the number bigger), we must use a negative index to balance it. So: 4.5 × 10<sup>−5</sup>.</span>`,
      scaffoldPrompts: [
        "Where should the decimal go?",
        "How many places does it move?",
        "Did you move left or right?"
      ],
      hint: "Remember: small number → negative index."
    }
  }
};
