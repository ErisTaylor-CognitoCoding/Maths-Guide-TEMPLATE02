window.lessonContent = {
  subject: "Maths",
  specCode: "MATH 1.2",
  topicTitle: "Maths Guide 1.2 Standard form calculations",
  strapline: "Multiply/divide, add/subtract, and convert confidently.",
  learningObjectives: [
    "Students should multiply and divide numbers in standard form by applying index laws.",
    "Students should add and subtract numbers in standard form by first ensuring the powers of 10 are the same.",
    "Students should convert between ordinary numbers and standard form, and use calculators effectively to check answers."
  ],
  step1: {
    title: "Multiply & divide in standard form using index laws",
    body: "Standard form (scientific notation) writes numbers as a × 10ⁿ, where 1 ≤ a < 10. When multiplying or dividing, treat it as two parts: multiply/divide the coefficients and then combine the powers of 10 using index laws."
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
            // Reconstruct LOs to match the styling structure
            // We'll replace the existing content with the new list items
            // However, the existing structure is complex (grid with icons). 
            // The prompt says "Builds <li> items". This implies we might be simplifying 
            // OR we should try to match the complex structure if we can, but "<li> items" suggests a simpler list.
            // Let's assume the user wants simple <li> items inside the container, overwriting the React grid.
            // OR we can try to mimic the structure. 
            // Given "Do not change colours, fonts, layout...", overwriting with simple <li> might break the layout.
            // But the instruction says "Builds <li> items in #learning-objectives".
            
            loContainer.innerHTML = ''; // Clear existing React content
            const ul = document.createElement('ul');
            ul.className = "list-disc pl-5 space-y-2 text-sm text-foreground"; // Add some basic styling
            
            c.learningObjectives.forEach(loText => {
                const li = document.createElement('li');
                li.innerText = loText;
                ul.appendChild(li);
            });
            loContainer.appendChild(ul);
        }

        const step1Title = document.getElementById('step1-title');
        if (step1Title && c.step1) step1Title.innerText = c.step1.title;

        const step1Body = document.getElementById('step1-body');
        if (step1Body && c.step1) {
             // Step 1 body in React is complex (JSX). The user string is plain text.
             // We will replace the complex content with the plain text.
             step1Body.innerText = c.step1.body;
             step1Body.className = "mt-3 text-sm leading-6 text-muted-foreground"; // Ensure styling matches
        }
    }
});
