"use strict";
// Reload page on resize
addEventListener('resize', () => {
    console.log('resizing...');
    setTimeout(() => {
        location.reload();
    }, 100);
});
const testimonialsEl = document.querySelector('#testimonials');
const testimonials = testimonialsEl.children;
//// Testimonial Indicators for smaller screens only ////////////////////////////
if (window.screen.width < 1350) {
    const testimonialIndicatorsEl = document.querySelector('#testimonialIndicator');
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
}
//// Form validation //////////////////////////////////////////////////////////
const submitButtonEl = document.querySelector('#submitButton');
const subscribeFormEl = document.querySelector('#subscribeForm');
const emailInputEl = document.querySelector('#email');
const errorMessageEl = document.querySelector('#errorMessage');
submitButtonEl.addEventListener('click', (event) => {
    event.preventDefault();
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
        emailInputEl.style.boxShadow = '0 0 1.5px 1px var(--theme-bright-red)';
        emailInputEl.style.color = 'var(--theme-bright-red)';
        errorMessageEl.style.display = 'block';
    }
});
//// Menu toggle (only for smaller screen widths) /////////////////////////////////////////////
if (window.screen.width <= 1350) {
    const menuToggleEl = document.querySelector('#menuToggle');
    const headerNavEl = document.querySelector('#headerNav');
    const headerNavListEl = document.querySelector('#headerNavList');
    let menuOpen = false;
    menuToggleEl.addEventListener('click', (event) => {
        event.stopPropagation();
        if (menuOpen) {
            closeMenu();
        }
        else {
            headerNavEl.style.display = 'block';
            menuToggleEl.src = '../../images/icon-close.svg';
        }
        menuOpen = !menuOpen;
    });
    window.addEventListener('touchmove', (event) => {
        if (!headerNavListEl.contains(event.target)) {
            closeMenu();
        }
    });
    window.addEventListener('click', (event) => {
        if (!headerNavListEl.contains(event.target)) {
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
const spinButton = document.querySelector('#spinButton');
const spinLeftBtn = document.querySelector('#spinLeftBtn');
const spinRightBtn = document.querySelector('#spinRightBtn');
const orderedTestimonials = [];
for (const li of testimonials) {
    orderedTestimonials.push(li);
}
spinLeftBtn.addEventListener('click', () => {
    spinTestimonials('left');
});
spinRightBtn.addEventListener('click', () => {
    spinTestimonials('right');
});
function spinTestimonials(direction) {
    console.log(orderedTestimonials);
    if (direction === 'left') {
        orderedTestimonials[0].style.transform =
            'translateX(-40vw) translateZ(-300px)';
        orderedTestimonials[0].style.zIndex = '0';
        orderedTestimonials[0].style.opacity = '0.5';
        orderedTestimonials[0].classList.remove('active');
        orderedTestimonials[1].style.transform = 'translateX(0vw) translateZ(0px)';
        orderedTestimonials[1].style.zIndex = '2';
        orderedTestimonials[1].style.opacity = '1';
        orderedTestimonials[1].classList.add('active');
        orderedTestimonials[2].style.transform =
            'translateX(40vw) translateZ(-300px)';
        orderedTestimonials[3].style.transform = 'translateX(0) translateZ(-600px)';
        // rotate array elements
        let temp = orderedTestimonials.shift();
        orderedTestimonials.push(temp);
    }
    else {
        // Rotate right
        orderedTestimonials[0].style.transform =
            'translateX(40vw) translateZ(-300px)';
        orderedTestimonials[0].style.zIndex = '0';
        orderedTestimonials[0].style.opacity = '0.5';
        orderedTestimonials[0].classList.remove('active');
        orderedTestimonials[1].style.transform =
            'translateX(0vw) translateZ(-600px)';
        orderedTestimonials[2].style.transform =
            'translateX(-40vw) translateZ(-300px)';
        orderedTestimonials[3].style.transform = 'translateX(0) translateZ(0px)';
        orderedTestimonials[3].style.zIndex = '2';
        orderedTestimonials[3].style.opacity = '1';
        orderedTestimonials[3].classList.add('active');
        // rotate array elements
        let temp = orderedTestimonials.pop();
        orderedTestimonials.unshift(temp);
    }
}
//# sourceMappingURL=main.js.map