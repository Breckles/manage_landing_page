//// Testimonial Indicators ///////////////////////////////////////////////////////

const testimonialsEl = document.querySelector(
  '#testimonials'
) as HTMLUListElement;

const testimonialIndicatorsEl = document.querySelector(
  '#testimonialIndicator'
) as HTMLUListElement;

const testimonials = testimonialsEl.children;
const indicators = testimonialIndicatorsEl.children;

let previousActiveBullet = testimonialIndicatorsEl.children[0]
  .firstElementChild as HTMLDivElement;

// Create options for intersection observer
const observerOptions = {
  root: testimonialsEl,
  threshold: 0.5,
};

const observer = new IntersectionObserver(
  (entries: IntersectionObserverEntry[]) => {
    const activeTestimonial = entries.find((testimonial) => {
      return testimonial.isIntersecting === true;
    })!.target;

    const newActiveBulletId = activeTestimonial.id.replace(
      'testimonial',
      'bullet'
    );

    const newActiveBullet = document.querySelector(`#${newActiveBulletId}`)
      ?.firstElementChild as HTMLDivElement;

    previousActiveBullet.classList.remove('active');
    newActiveBullet.classList.add('active');
    previousActiveBullet = newActiveBullet;
  },
  observerOptions
);

for (const testimonial of testimonials) {
  observer.observe(testimonial);
}

//// Form validation //////////////////////////////////////////////////////////

const submitButtonEl = document.querySelector(
  '#submitButton'
) as HTMLButtonElement;

submitButtonEl.addEventListener('click', (event) => {
  event.preventDefault();

  const subscribeFormEl = document.querySelector(
    '#subscribeForm'
  ) as HTMLFormElement;
  const emailInputEl = document.querySelector('#email') as HTMLInputElement;
  const errorMessageEl = document.querySelector(
    '#errorMessage'
  ) as HTMLDivElement;

  if (emailInputEl.validity.valid) {
    // Reset form
    emailInputEl.style.boxShadow = 'none';
    emailInputEl.style.color = 'black';
    errorMessageEl.style.display = 'none';
    subscribeFormEl.reset();
  } else {
    // Display error
    // Using boxShadow instead of border because its render won't affect vertical rythm
    emailInputEl.style.boxShadow = '0 0 1px 1px var(--theme-bright-red)';
    emailInputEl.style.color = 'var(--theme-bright-red)';
    errorMessageEl.style.display = 'block';
  }
});
