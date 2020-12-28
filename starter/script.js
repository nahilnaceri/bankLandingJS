'use strict';

//utils methods

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsBtn = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const section2 = document.querySelector('#section--2');
const openModal = function() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// sections
const allSections = document.querySelectorAll('section');

// key creation
// const header = document.querySelector('.header');
// const message = document.createElement('div');

// message.classList.add('cookie-message');
// message.innerHTML =
//   'We use cookies for better functionality <button class="btn btn--close-cookie"> Got it!</button>';
// header.append(message);
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function() {
//     message.remove();
//   });

// //style
// message.style.backgroundColor = '#999';
// message.style.color = '#fff';
// message.style.width = '120%';

const btnScroll = document.querySelector('.btn--scroll-to');
const navButtons = document.querySelectorAll('.nav__link');
const section1 = document.querySelector('#section--1');
// const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');

// Page Navigation

// navButtons.forEach(function(btn, i) {
//   btn.addEventListener('click', e => {
//     e.preventDefault();
//     const section = document.querySelector(`${btn.getAttribute('href')}`);
//     section.scrollIntoView({ behavior: 'smooth' });
//   });
// });

document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault();
  if (
    e.target.classList.contains('nav__link') &&
    e.target.classList.length === 1
  ) {
    const section = document.querySelector(`${e.target.getAttribute('href')}`);
    section.scrollIntoView({ behavior: 'smooth' });
  }
});

// adding event listener to button
btnScroll.addEventListener('click', function(e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(window.pageYOffset);
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,

  //   behavior: 'smooth'
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Tabbed component
// using delegates instead of looping through all buttons
// by using the parent element

tabsContainer.addEventListener('click', function(e) {
  const clickedTab = e.target.closest('.operations__tab');

  if (!clickedTab) return;
  tabsBtn.forEach(btn => btn.classList.remove('operations__tab--active'));
  clickedTab.classList.add('operations__tab--active');
  tabsContent.forEach(tct =>
    tct.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${clickedTab.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu Fade animation
const handleHover = function(e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

const sectionPos = section2.getBoundingClientRect();
// sticky navigation
// window.addEventListener('scroll', function() {
//   if (window.scrollY > sectionPos.top) {
//     nav.classList.add('sticky');
//   } else nav.classList.remove('sticky');
// });

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});
headerObserver.observe(header);

const revealSection = function(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

// section scrolling observing
const sections = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1
});

sections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// lazy images load

const imgTargets = document.querySelectorAll('img[data-src]');

const lazyLoad = function(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const lazyImageObserver = new IntersectionObserver(lazyLoad, {
  root: null,
  threshold: 0,
  rootMargin: '-200px'
});

imgTargets.forEach(img => lazyImageObserver.observe(img));

// slider component

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnSliderRight = document.querySelector('.slider__btn--right');
const btnSliderLeft = document.querySelector('.slider__btn--left');
const dotsContainer = document.querySelector('.dots');
let currSlide = 0;
const maxSlide = slides.length;
// slider.style.overlay = 'hidden';

const slideTo = function(s) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - s)}%)`;
  });
};
const createDot = function() {
  slides.forEach(function(slide, i) {
    const html = `<button class="dots__dot" data-slide="${i}"></button>`;
    dotsContainer.insertAdjacentHTML('beforeend', html);
  });
};

createDot();
const dots = document.querySelectorAll('.dots__dot');

const activateDot = function(slide) {
  dots.forEach(btn => btn.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
dotsContainer.addEventListener('click', function(e) {
  if (e.target.classList.contains('dots__dot')) {
    activateDot(Number(e.target.dataset.slide));
    slideTo(e.target.dataset.slide);
    currSlide = Number(e.target.dataset.slide);
  }
});

const nextSlide = function() {
  if (currSlide === maxSlide - 1) {
    currSlide = 0;
  } else currSlide++;

  slideTo(currSlide);
  activateDot(currSlide);
};
const prevSlide = function() {
  if (currSlide === 0) {
    currSlide = maxSlide - 1;
  } else {
    currSlide--;
  }
  slideTo(currSlide);
  activateDot(currSlide);
};
slideTo(0);
activateDot(currSlide);
btnSliderRight.addEventListener('click', nextSlide);
btnSliderLeft.addEventListener('click', prevSlide);
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowRight') {
    nextSlide();
  } else if (e.key === 'ArrowLeft') {
    prevSlide();
  }
});
