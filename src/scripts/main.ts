const testimonialsEl = document.querySelector(
  '#testimonials'
) as HTMLUListElement;

const testimonials = testimonialsEl.children;

//// Testimonial Indicators for smaller screens only ////////////////////////////

if (window.screen.width < 1350) {
  const testimonialIndicatorsEl = document.querySelector(
    '#testimonialIndicator'
  ) as HTMLUListElement;

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
}

//// Form validation //////////////////////////////////////////////////////////

const submitButtonEl = document.querySelector(
  '#submitButton'
) as HTMLButtonElement;

const subscribeFormEl = document.querySelector(
  '#subscribeForm'
) as HTMLFormElement;
const emailInputEl = document.querySelector('#email') as HTMLInputElement;
const errorMessageEl = document.querySelector(
  '#errorMessage'
) as HTMLDivElement;

submitButtonEl.addEventListener('click', (event) => {
  event.preventDefault();

  if (emailInputEl.validity.valid) {
    // Reset form
    emailInputEl.style.boxShadow = 'none';
    emailInputEl.style.color = 'black';
    errorMessageEl.style.display = 'none';
    subscribeFormEl.reset();
  } else {
    // Display error
    // Using boxShadow instead of border because its render won't affect vertical rythm
    emailInputEl.style.boxShadow = '0 0 1.5px 1px var(--theme-bright-red)';
    emailInputEl.style.color = 'var(--theme-bright-red)';
    errorMessageEl.style.display = 'block';
  }
});

//// Menu toggle (only for smaller screen widths) /////////////////////////////////////////////

if (window.screen.width <= 375) {
  const menuToggleEl = document.querySelector(
    '#menuToggle'
  ) as HTMLImageElement;
  const headerNavEl = document.querySelector('#headerNav') as HTMLElement;
  const headerNavListEl = document.querySelector(
    '#headerNavList'
  ) as HTMLUListElement;
  let menuOpen = false;

  menuToggleEl.addEventListener('click', (event) => {
    event.stopPropagation();
    if (menuOpen) {
      closeMenu();
    } else {
      headerNavEl.style.display = 'block';
      menuToggleEl.src = '../../images/icon-close.svg';
    }

    menuOpen = !menuOpen;
  });

  window.addEventListener('touchmove', (event) => {
    if (!headerNavListEl.contains(<Node>event.target)) {
      closeMenu();
    }
  });

  window.addEventListener('click', (event) => {
    if (!headerNavListEl.contains(<Node>event.target)) {
      closeMenu();
    }
  });

  function closeMenu() {
    headerNavEl.style.display = 'none';
    menuToggleEl.src = '../../images/icon-hamburger.svg';
    menuOpen = false;
  }
}

//// 3D Testimonial Spinner for wider screens only ////////////////////////////////

const spinButton = document.querySelector('#spinButton') as HTMLButtonElement;

const orderedTestimonials: HTMLLIElement[] = [];

for (const li of testimonials) {
  orderedTestimonials.push(<HTMLLIElement>li);
}

spinButton.addEventListener('click', spinTestimonials);

function spinTestimonials() {
  console.log(orderedTestimonials);

  orderedTestimonials[0].style.transform =
    'translateX(-40vw) translateZ(-300px)';
  orderedTestimonials[0].style.zIndex = '0';
  orderedTestimonials[0].style.opacity = '0.5';

  orderedTestimonials[1].style.transform = 'translateX(0vw) translateZ(0px)';
  orderedTestimonials[1].style.zIndex = '2';
  orderedTestimonials[1].style.opacity = '1';

  orderedTestimonials[2].style.transform =
    'translateX(40vw) translateZ(-300px)';

  orderedTestimonials[3].style.transform = 'translateX(0) translateZ(-600px)';

  // rotate array elements
  let temp = orderedTestimonials.shift()!;
  orderedTestimonials.push(temp);
}
