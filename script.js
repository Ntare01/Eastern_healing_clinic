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
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const endpoint = form.action;
      const formData = new FormData(form);

      statusMessage.textContent = 'Submitting your request...';

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
          },
        });

        if (response.ok) {
          statusMessage.textContent = 'Thank you! Your appointment request has been submitted. We will contact you shortly to confirm the details.';
          form.reset();
        } else {
          const data = await response.json();
          const message = data?.errors?.map((error) => error.message).join(', ') || 'There was a problem submitting the form. Please try again.';
          statusMessage.textContent = message;
        }
      } catch (error) {
        statusMessage.textContent = 'Submission failed. Please check your connection and try again.';
      }

      setTimeout(() => {
        statusMessage.textContent = '';
      }, 6000);
    });
  }
});
