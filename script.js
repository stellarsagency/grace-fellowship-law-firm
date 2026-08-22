// Grace Fellowship Law Firm — Scripts

// Sticky navbar shadow
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
  toTop.classList.toggle('visible', window.scrollY > 500);
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => navLinks.classList.remove('open'))
);

// Back to top
const toTop = document.getElementById('toTop');
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Scroll reveal (staggered inside card grids)
const staggerParents = document.querySelectorAll('.cards-grid, .team-grid, .values-grid, .impact-grid, .stats-grid');
staggerParents.forEach(parent => {
  parent.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.setProperty('--reveal-delay', `${i * 0.12}s`);
  });
});
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Counter animation
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'));
  if (!target) return;
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1800;
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(update);
}
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.stat-num[data-count]').forEach(el => {
  counterObserver.observe(el);
  // Fallback: if already visible on load, animate immediately
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    setTimeout(() => animateCounter(el), 600);
    counterObserver.unobserve(el);
  }
});

// Contact form (demo handler)
function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const note = document.getElementById('formNote');
  const success = document.createElement('p');
  success.className = 'form-success';
  success.textContent = 'Thank you. Your request has been received — we will contact you confidentially.';
  form.appendChild(success);
  form.reset();
  note.style.display = 'none';
  setTimeout(() => { success.remove(); note.style.display = ''; }, 8000);
}
