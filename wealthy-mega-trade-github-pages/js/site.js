const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
if (form && note) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`WMT enquiry from ${data.get('company') || data.get('name') || 'website visitor'}`);
    const body = encodeURIComponent(`Name: ${data.get('name')}\nCompany: ${data.get('company') || '-'}\n\nMessage:\n${data.get('message')}`);
    note.textContent = 'The message is prepared. Add the company contact email in js/site.js to enable direct sending.';
    window.location.hash = 'message-ready';
    navigator.clipboard?.writeText(`Subject: ${decodeURIComponent(subject)}\n\n${decodeURIComponent(body)}`);
  });
}

const home = document.querySelector('.page-home');
if (home) {
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (window.innerWidth > 900) {
      const orbit = document.querySelector('.hero-orbit');
      if (orbit) orbit.style.transform = `translateY(calc(-50% + ${Math.min(y * 0.08, 55)}px)) rotate(${y * 0.015}deg)`;
    }
    lastY = y;
  }, {passive: true});
}
