const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  menuToggle.classList.toggle('is-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

document.querySelectorAll('.nav-link, .brand, .button, .text-link').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
  });
});

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach((item) => revealObserver.observe(item));

const sections = document.querySelectorAll('main section[id]');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navItems.forEach((item) => item.classList.toggle('active', item.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => sectionObserver.observe(section));

const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let isValid = true;
  const fields = ['name', 'email', 'subject', 'message'];

  fields.forEach((fieldName) => {
    const field = document.querySelector(`#${fieldName}`);
    const error = document.querySelector(`[data-error-for="${fieldName}"]`);
    let message = '';
    if (!field.value.trim()) message = 'This field is required.';
    if (fieldName === 'email' && field.value.trim() && !emailPattern.test(field.value.trim())) message = 'Please enter a valid email.';
    field.classList.toggle('invalid', Boolean(message));
    error.textContent = message;
    if (message) isValid = false;
  });

  status.className = 'form-status';
  if (!isValid) {
    status.textContent = 'Please check the highlighted fields and try again.';
    status.classList.add('error');
    return;
  }
  status.textContent = 'Thanks for reaching out! Your message is ready to send.';
  status.classList.add('success');
  form.reset();
});

document.querySelectorAll('.contact-form input, .contact-form textarea').forEach((field) => {
  field.addEventListener('input', () => {
    field.classList.remove('invalid');
    const error = document.querySelector(`[data-error-for="${field.id}"]`);
    error.textContent = '';
    status.textContent = '';
    status.className = 'form-status';
  });
});
