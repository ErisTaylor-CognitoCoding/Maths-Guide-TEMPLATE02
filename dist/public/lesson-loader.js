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
        sentence: `<span>When multiplying powers of 10, you <span class="font-semibold">_____</span> the indices.</span>`
      },
      {
        id: "terms-1b",
        sentence: `<span>When dividing powers of 10, you <span class="font-semibold">_____</span> the indices.</span>`
      }
    ]
  },
  step4: {
    title: "Summary: multiply/divide standard form",
    cloze: [
      {
        id: "summary-1",
        sentence: `<span>To multiply or divide numbers in standard form, first combine the <span class="font-semibold">_____</span>, then use index laws on the powers of 10 by <span class="font-semibold">_____</span> indices for multiplication and <span class="font-semibold">_____</span> indices for division, and finally adjust so that 1 ≤ a < 10.</span>`
      }
    ]
  },
  step5: {
    title: "Practice question",
    practice: {
      prompt: `<span>Explain how you would calculate (7.5 × 10<sup>6</sup>) ÷ (3 × 10<sup>2</sup>) and write the final answer in standard form.</span>`
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
        sentence: `<span>To add numbers in standard form, the powers of 10 must be <span class="font-semibold">_____</span>.</span>`
      },
      {
        id: "terms-2b",
        sentence: `<span>Changing <span class="font-semibold">3.0 × 10<sup>5</sup></span> to <span class="font-semibold">0.30 × 10<sup>6</sup></span> keeps the value the same because you moved the decimal one place and changed the index by <span class="font-semibold">_____</span>.</span>`
      }
    ]
  },
  step9: {
    title: "Summary: add/subtract standard form",
    cloze: [
      {
        id: "summary-2",
        sentence: `<span>To add or subtract in standard form, first rewrite one number so both have the same <span class="font-semibold">_____</span> (power of 10). Then combine the <span class="font-semibold">_____</span> and finish by adjusting the result into standard form.</span>`
      }
    ]
  },
  step10: {
    title: "Practice question",
    practice: {
      prompt: `<span>Explain how you would calculate (4.8 × 10<sup>7</sup>) + (3.6 × 10<sup>6</sup>). Include the conversion step and the final answer in standard form.</span>`
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
        sentence: `<span>If you move the decimal point left to make the coefficient between 1 and 10, the index generally becomes more <span class="font-semibold">_____</span>.</span>`
      },
      {
        id: "terms-3b",
        sentence: `<span>If you move the decimal point right (for a small number like 0.005), the index becomes <span class="font-semibold">_____</span>.</span>`
      }
    ]
  },
  step14: {
    title: "Summary: conversion",
    cloze: [
      {
        id: "summary-3",
        sentence: `<span>To convert an ordinary number to standard form, place the decimal after the first non-zero digit to create a coefficient between <span class="font-semibold">_____</span> and 10. Then count how many places the decimal moved to find the power of 10.</span>`
      }
    ]
  },
  step15: {
    title: "Practice question",
    practice: {
      prompt: `<span>Convert 0.000045 into standard form and explain why the index is negative.</span>`
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
    // Retry mechanism to ensure React has rendered the elements
    const maxRetries = 50;
    let attempts = 0;

    const interval = setInterval(() => {
        const topicTitle = document.getElementById('topic-title');
        
        if (topicTitle) {
            clearInterval(interval);
            updateContent();
        } else {
            attempts++;
            if (attempts >= maxRetries) {
                clearInterval(interval);
                console.warn('Could not find elements to update content.');
            }
        }
    }, 100);

    function updateContent() {
        if (!window.lessonContent) return;
        const c = window.lessonContent;

        const topicTitle = document.getElementById('topic-title');
        if (topicTitle) topicTitle.innerText = c.topicTitle;

        const specCode = document.getElementById('spec-code');
        if (specCode) specCode.innerText = "Spec " + c.specCode;

        const strapline = document.getElementById('strapline');
        if (strapline) strapline.innerText = c.strapline;
        
        const loContainer = document.getElementById('learning-objectives');
        if (loContainer && c.learningObjectives) {
            loContainer.innerHTML = ''; 
            const ul = document.createElement('ul');
            ul.className = "list-disc pl-5 space-y-2 text-sm text-foreground";
            
            c.learningObjectives.forEach(loText => {
                const li = document.createElement('li');
                li.innerText = loText;
                ul.appendChild(li);
            });
            loContainer.appendChild(ul);
        }

        // Steps Loop
        for (let i = 1; i <= 20; i++) {
            const stepKey = `step${i}`;
            if (!c[stepKey]) continue;
            const data = c[stepKey];

            // Title
            updateHtml(`step-${i}-title`, data.title);

            // Explanation / Concept
            updateHtml(`step-${i}-explanation`, data.explanation);
            
            // Analogy
            if (data.analogy) {
                updateHtml(`step-${i}-analogy-title`, data.analogy.title);
                updateHtml(`step-${i}-analogy-content`, data.analogy.content);
            }

            // Worked Example
            if (data.workedExample) {
                updateHtml(`step-${i}-example-title`, data.workedExample.title);
                if (data.workedExample.bullets) {
                    data.workedExample.bullets.forEach((b, idx) => {
                        updateHtml(`step-${i}-example-bullet-${idx}`, b);
                    });
                }
            }

            // MCQs
            if (data.mcqs) {
                data.mcqs.forEach(mcq => {
                    updateHtml(`step-${i}-mcq-${mcq.id}-question`, mcq.question);
                    if (mcq.options) {
                        mcq.options.forEach(opt => {
                            updateHtml(`step-${i}-mcq-${mcq.id}-option-${opt.id}`, opt.label);
                        });
                    }
                });
            }

            // Cloze
            if (data.cloze) {
                data.cloze.forEach(line => {
                    updateHtml(`step-${i}-cloze-${line.id}-sentence`, line.sentence);
                });
            }

            // Practice
            if (data.practice) {
                updateHtml(`step-${i}-practice-prompt`, data.practice.prompt);
            }
        }
    }

    function updateHtml(id, html) {
        if (!html) return;
        const el = document.getElementById(id);
        if (el) {
            el.innerHTML = html;
        }
    }
});
