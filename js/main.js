// ── Nav scroll effect ──
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Mobile nav toggle ──
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
hamburger?.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});
mobileNav?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// ── Demo tabs ──
document.querySelectorAll('.demo-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    document.querySelectorAll('.demo-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.demo-body').forEach(b => b.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(target)?.classList.add('active');
  });
});

// ── Scroll-reveal ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // stagger children if grid
      entry.target.querySelectorAll('.fade-up').forEach((child, i) => {
        setTimeout(() => child.classList.add('visible'), i * 100);
      });
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
document.querySelectorAll('section').forEach(el => observer.observe(el));

// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Animated typing in demo terminal ──
function typeText(el, text, delay = 30) {
  return new Promise(resolve => {
    let i = 0;
    el.textContent = '';
    const interval = setInterval(() => {
      el.textContent += text[i++];
      if (i >= text.length) { clearInterval(interval); resolve(); }
    }, delay);
  });
}

// Trigger demo animation when section enters view
const demoSection = document.querySelector('.demo-section');
let demoPlayed = false;
const demoObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !demoPlayed) {
    demoPlayed = true;
    playDemoAnimation();
  }
}, { threshold: 0.3 });
if (demoSection) demoObserver.observe(demoSection);

async function playDemoAnimation() {
  const userLine = document.getElementById('demo-user-text');
  const sqlLine = document.getElementById('demo-sql-text');
  const resultBlock = document.getElementById('demo-result-block');

  if (!userLine) return;

  await new Promise(r => setTimeout(r, 400));
  await typeText(userLine, "Show me top 10 customers by revenue this quarter", 28);
  await new Promise(r => setTimeout(r, 500));
  await typeText(sqlLine, "SELECT customer_name, SUM(order_total) AS revenue FROM orders WHERE order_date >= '2026-01-01' GROUP BY customer_name ORDER BY revenue DESC LIMIT 10;", 12);
  await new Promise(r => setTimeout(r, 400));
  if (resultBlock) resultBlock.style.display = 'block';
}
