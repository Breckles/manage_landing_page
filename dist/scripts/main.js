"use strict";
// if (window.screen.width < 400) {
const testimonialPicker = document.querySelector('#testimonialPicker');
const testimonials = document.querySelector('#testimonials');
console.log(testimonialPicker.children);
for (const testimonialSelection of testimonialPicker.children) {
    const testimonialIndex = +testimonialSelection.id - 1;
    const testimonialXPosition = window.screen.width * testimonialIndex;
    testimonialSelection.addEventListener('click', () => {
        // modify list position to display selected testimonial
        testimonials.style.left = `-${testimonialXPosition}px`;
        console.log(testimonials.style.left);
    });
}
// }
//# sourceMappingURL=main.js.map