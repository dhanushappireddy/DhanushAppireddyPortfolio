/* ── PARTICLES ── */
const cvs = document.getElementById('particle-canvas');
const ctx = cvs.getContext('2d');
let W, H;
function resize() { W = cvs.width = innerWidth; H = cvs.height = innerHeight; }
resize(); window.addEventListener('resize', resize);

const pts = Array.from({length: 100}, () => ({
  x: Math.random() * innerWidth,
  y: Math.random() * innerHeight,
  vx: (Math.random() - 0.5) * 0.28,
  vy: (Math.random() - 0.5) * 0.28,
  r: Math.random() * 1.3 + 0.4,
  a: Math.random() * 0.7 + 0.15,
}));

function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  const col = dark ? '124,109,255' : '91,77,232';
  pts.forEach(p => {
    p.x = (p.x + p.vx + W) % W;
    p.y = (p.y + p.vy + H) % H;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${col},${p.a * 0.55})`;
    ctx.fill();
  });
  for (let i = 0; i < pts.length; i++) for (let j = i+1; j < pts.length; j++) {
    const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
    const d = Math.sqrt(dx*dx + dy*dy);
    if (d < 130) {
      ctx.beginPath();
      ctx.moveTo(pts[i].x, pts[i].y);
      ctx.lineTo(pts[j].x, pts[j].y);
      ctx.strokeStyle = `rgba(${col},${(1 - d/130) * 0.09})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ── TYPEWRITER ── */
const phrases = [
  'Swift · UIKit · Mobile Architecture',
  'iOS Developer @ TCS',
  'Offline-First · Data Sync · MVVMC',
  'GenAI Enthusiast · Python · ML',
  'Clean Code · Testing · Agile',
];
let pi = 0, ci = 0, del = false;
const twEl = document.getElementById('typewriter');
function type() {
  const phrase = phrases[pi];
  if (!del) {
    twEl.textContent = phrase.slice(0, ++ci);
    if (ci === phrase.length) { del = true; setTimeout(type, 2000); return; }
    setTimeout(type, 52);
  } else {
    twEl.textContent = phrase.slice(0, --ci);
    if (ci === 0) { del = false; pi = (pi+1) % phrases.length; setTimeout(type, 320); return; }
    setTimeout(type, 26);
  }
}
setTimeout(type, 900);

/* ── THEME TOGGLE ── */
const themeBtn = document.getElementById('themeToggle');
const icon = document.getElementById('toggle-icon');
themeBtn.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  icon.textContent = isDark ? '☀️' : '🌙';
});

/* ── SCROLL REVEAL ── */
const revealSets = [
  { sel: '.skill-card', cls: 'vis', delay: 80 },
  { sel: '.tl-item',    cls: 'vis', delay: 0 },
  { sel: '.proj-card',  cls: 'vis', delay: 100 },
  { sel: '.edu-card',   cls: 'vis', delay: 0 },
  { sel: '.ach-list li',cls: 'vis', delay: 90 },
  { sel: '.cert-card',  cls: 'vis', delay: 0 },
  { sel: '.contact-item',cls:'vis', delay: 80 },
];
function reveal() {
  revealSets.forEach(({sel, cls, delay}) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      if (el.classList.contains(cls)) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.89) {
        setTimeout(() => el.classList.add(cls), i * delay);
      }
    });
  });
}
window.addEventListener('scroll', reveal, { passive: true });
window.addEventListener('load', () => setTimeout(reveal, 300));

/* ── NAV ACTIVE ── */
const secs = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  secs.forEach(s => { if (scrollY >= s.offsetTop - 130) cur = s.id; });
  navAs.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
}, { passive: true });