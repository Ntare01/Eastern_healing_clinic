document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const scrollButtons = document.querySelectorAll('[data-scroll]');
  const form = document.getElementById('appointmentForm');
  const statusMessage = document.getElementById('formStatus');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  scrollButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const targetSelector = button.getAttribute('data-scroll');
      if (targetSelector) {
        event.preventDefault();
        const target = document.querySelector(targetSelector);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  if (form && statusMessage) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      statusMessage.textContent = 'Thank you! Your appointment request has been submitted. We will contact you shortly to confirm.';
      form.reset();
      setTimeout(() => {
        statusMessage.textContent = '';
      }, 6000);
    });
  }
});
