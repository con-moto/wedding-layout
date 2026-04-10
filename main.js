document.addEventListener('DOMContentLoaded', () => {
  initRsvpForm();
  initDetailsForm();
  initCountdown();
  initNavBurger();
});

/* =========================
   HELPERS: Formspark submit
   ========================= */

const FORMSPARK_URL = 'https://submit-form.com/XGrUy5Fs0';

function formDataToJson(formData) {
  const obj = {};
  for (const [key, value] of formData.entries()) {
    if (key.endsWith('[]')) {
      const cleanKey = key.slice(0, -2);
      if (!obj[cleanKey]) obj[cleanKey] = [];
      obj[cleanKey].push(value);
    } else if (obj[key] !== undefined) {
      if (!Array.isArray(obj[key])) obj[key] = [obj[key]];
      obj[key].push(value);
    } else {
      obj[key] = value;
    }
  }
  return JSON.stringify(obj);
}

/* =========================
   RSVP FORM (Formspark)
   ========================= */
function initRsvpForm() {
  const form = document.getElementById('rsvp-form');
  const statusEl = document.getElementById('rsvp-status');

  if (!form || !statusEl) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    statusEl.textContent = 'Отправка...';
    statusEl.classList.remove('rsvp-status--success', 'rsvp-status--error');

    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSPARK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: formDataToJson(formData),
      });

      if (response.ok) {
        statusEl.textContent = 'Спасибо! Ваш ответ получен.';
        statusEl.classList.add('rsvp-status--success');
        form.reset();
      } else {
        statusEl.textContent =
          'Произошла ошибка при отправке. Попробуйте ещё раз позже.';
        statusEl.classList.add('rsvp-status--error');
      }
    } catch (error) {
      statusEl.textContent =
        'Не удалось отправить форму. Проверьте соединение с интернетом.';
      statusEl.classList.add('rsvp-status--error');
    }
  });
}

/* =========================
   DETAILS FORM (Formspark)
   ========================= */
function initDetailsForm() {
  const form = document.getElementById('details-form');
  const statusEl = document.getElementById('details-status');

  if (!form || !statusEl) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    statusEl.textContent = 'Отправляем...';
    statusEl.className = 'details-status';

    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSPARK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: formDataToJson(formData),
      });

      if (response.ok) {
        statusEl.textContent = 'Спасибо! Ваши ответы отправлены.';
        statusEl.classList.add('details-status--success');
        form.reset();
      } else {
        statusEl.textContent = 'Что-то пошло не так. Попробуйте ещё раз.';
        statusEl.classList.add('details-status--error');
      }
    } catch (error) {
      statusEl.textContent = 'Ошибка сети. Попробуйте ещё раз позже.';
      statusEl.classList.add('details-status--error');
    }
  });
}

/* =========================
   COUNTDOWN TIMER
   ========================= */
function initCountdown() {
  const countdownDays = document.getElementById('countdown-days');
  const countdownHours = document.getElementById('countdown-hours');
  const countdownMinutes = document.getElementById('countdown-minutes');
  const countdownSeconds = document.getElementById('countdown-seconds');
  const countdownMessage = document.getElementById('countdown-message');

  if (
    !countdownDays ||
    !countdownHours ||
    !countdownMinutes ||
    !countdownSeconds ||
    !countdownMessage
  ) {
    return;
  }

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

/* =========================
   NAVIGATION BURGER
   ========================= */
function initNavBurger() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (!navToggle || !navLinks) return;

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