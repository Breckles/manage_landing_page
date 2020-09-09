const testimonialsEl = document.querySelector(
  '#testimonials'
) as HTMLUListElement;

const testimonials = testimonialsEl.children;

const testimonialVisibleWidth = +window
  .getComputedStyle(testimonialsEl)
  .width.replace('px', '');

const testimonialActualWidth = testimonialsEl.scrollWidth;

console.log(`Testimonials visible width: ${testimonialVisibleWidth}`);
console.log(`Testimonials actual width: ${testimonialActualWidth}`);

testimonialsEl.addEventListener('touchend', () => {
  // console.log(
  //   Math.floor(testimonialsEl.scrollLeft / (testimonialVisibleWidth / 2))
  // );
  console.log(`current scrollLeft: ${testimonialsEl.scrollLeft}`);

  console.log(
    `scrollLeft / actualWidth: ${
      ((testimonialsEl.scrollLeft / testimonialActualWidth) * 10) / 3
    }`
  );

  // console.log((testimonialsEl.scrollLeft / (testimonialActualWidth * 2)) * 10);
});
