// if (window.screen.width < 400) {
const testimonialPicker = document.querySelector(
  '#testimonialPicker'
) as HTMLUListElement;
const testimonials = document.querySelector(
  '#testimonials'
) as HTMLUListElement;

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
