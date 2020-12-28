'use strict';

//utils methods

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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
const section2 = document.querySelector('#section--2');
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

const tabsContainer = document.querySelector('.operations__tab-container');
const tabsBtn = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

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
