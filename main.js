document.addEventListener('DOMContentLoaded', () => {
  /* ====== RSVP FORM ====== */
  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpStatus = document.getElementById('rsvp-status');

  if (rsvpForm && rsvpStatus) {
    rsvpForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      rsvpStatus.textContent = 'Отправка...';
      rsvpStatus.classList.remove('rsvp-status--success', 'rsvp-status--error');

      const formData = new FormData(rsvpForm);
      // формально FormSubmit принимает FormData, никаких доп. хедеров не нужно [web:21].

      try {
        const response = await fetch(rsvpForm.action, {
          method: rsvpForm.method || 'POST',
          body: formData,
        });

        if (response.ok) {
          rsvpStatus.textContent = 'Спасибо! Ваш ответ получен.';
          rsvpStatus.classList.add('rsvp-status--success');
          rsvpForm.reset();
        } else {
          rsvpStatus.textContent =
            'Произошла ошибка при отправке. Попробуйте ещё раз позже.';
          rsvpStatus.classList.add('rsvp-status--error');
        }
      } catch (error) {
        rsvpStatus.textContent =
          'Не удалось отправить форму. Проверьте соединение с интернетом.';
        rsvpStatus.classList.add('rsvp-status--error');
      }
    });
  }

  /* ====== COUNTDOWN TIMER ====== */
  const countdownDays = document.getElementById('countdown-days');
  const countdownHours = document.getElementById('countdown-hours');
  const countdownMinutes = document.getElementById('countdown-minutes');
  const countdownSeconds = document.getElementById('countdown-seconds');
  const countdownMessage = document.getElementById('countdown-message');

  if (
    countdownDays &&
    countdownHours &&
    countdownMinutes &&
    countdownSeconds &&
    countdownMessage
  ) {
    const targetDate = new Date('2026-06-22T16:00:00+03:00').getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const distance = targetDate - now;

      if (distance <= 0) {
        countdownDays.textContent = '0';
        countdownHours.textContent = '0';
        countdownMinutes.textContent = '0';
        countdownSeconds.textContent = '0';
        countdownMessage.textContent =
          'Наш день уже наступил или позади — спасибо, что были с нами.';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      countdownDays.textContent = String(days);
      countdownHours.textContent = String(hours).padStart(2, '0');
      countdownMinutes.textContent = String(minutes).padStart(2, '0');
      countdownSeconds.textContent = String(seconds).padStart(2, '0');

      countdownMessage.textContent = 'Мы с нетерпением ждём встречи с вами.';
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ====== NAVIGATION BURGER ====== */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    const closeNav = () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    };

    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 720) {
          closeNav();
        }
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 720) {
        closeNav();
      }
    });
  }
});

/* ====== DETAILS FORM (еда/алкоголь/дети) ====== */
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('details-form');
  if (!form) return;

  const statusEl = document.getElementById('details-status');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    statusEl.textContent = 'Отправляем...';
    statusEl.className = 'details-status';

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        statusEl.textContent = 'Спасибо! Ваши ответы отправлены.';
        statusEl.classList.add('details-status--success');
        form.reset();
      } else {
        statusEl.textContent = 'Что-то пошло не так. Попробуйте ещё раз.';
        statusEl.classList.add('details-status--error');
      }
    } catch (err) {
      statusEl.textContent = 'Ошибка сети. Попробуйте ещё раз позже.';
      statusEl.classList.add('details-status--error');
    }
  });
});