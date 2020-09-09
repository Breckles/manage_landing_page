"use strict";
//// Testimonial Indicators ///////////////////////////////////////////////////////
const testimonialsEl = document.querySelector('#testimonials');
const testimonialIndicatorsEl = document.querySelector('#testimonialIndicator');
const testimonials = testimonialsEl.children;
const indicators = testimonialIndicatorsEl.children;
let previousActiveBullet = testimonialIndicatorsEl.children[0]
    .firstElementChild;
// Create options for intersection observer
const observerOptions = {
    root: testimonialsEl,
    threshold: 0.5,
};
const observer = new IntersectionObserver((entries) => {
    var _a;
    const activeTestimonial = entries.find((testimonial) => {
        return testimonial.isIntersecting === true;
    }).target;
    const newActiveBulletId = activeTestimonial.id.replace('testimonial', 'bullet');
    const newActiveBullet = (_a = document.querySelector(`#${newActiveBulletId}`)) === null || _a === void 0 ? void 0 : _a.firstElementChild;
    previousActiveBullet.classList.remove('active');
    newActiveBullet.classList.add('active');
    previousActiveBullet = newActiveBullet;
}, observerOptions);
for (const testimonial of testimonials) {
    observer.observe(testimonial);
}
//// Form validation //////////////////////////////////////////////////////////
const submitButtonEl = document.querySelector('#submitButton');
submitButtonEl.addEventListener('click', (event) => {
    event.preventDefault();
    const subscribeFormEl = document.querySelector('#subscribeForm');
    const emailInputEl = document.querySelector('#email');
    const errorMessageEl = document.querySelector('#errorMessage');
    if (emailInputEl.validity.valid) {
        // Reset form
        emailInputEl.style.boxShadow = 'none';
        emailInputEl.style.color = 'black';
        errorMessageEl.style.display = 'none';
        subscribeFormEl.reset();
    }
    else {
        // Display error
        // Using boxShadow instead of border because its render won't affect vertical rythm
        emailInputEl.style.boxShadow = '0 0 1px 1px var(--theme-bright-red)';
        emailInputEl.style.color = 'var(--theme-bright-red)';
        errorMessageEl.style.display = 'block';
    }
});
//# sourceMappingURL=main.js.map