const circle = document.querySelector('.interactive-circle');

window.addEventListener('mousemove', (e) => {

  if (!circle) return;

  const x = (window.innerWidth / 2 - e.pageX) / 35;
  const y = (window.innerHeight / 2 - e.pageY) / 35;

  circle.style.transform = `translate(${x}px, ${y}px)`;
});


/* ===== CARDS INTERACTION ===== */

const cards = document.querySelectorAll('.project-card, .about-card');

cards.forEach((card) => {

  card.addEventListener('mousemove', (e) => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.background = `
      radial-gradient(
        circle at ${x}px ${y}px,
        rgba(125,137,255,0.14),
        rgba(255,255,255,0.03)
      )
    `;
  });


  card.addEventListener('mouseleave', () => {

    card.style.background = 'rgba(255,255,255,0.03)';
  });
});


/* ===== BUTTONS EFFECT ===== */

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {

  button.addEventListener('mouseenter', () => {

    button.style.transform = 'scale(1.04)';
  });


  button.addEventListener('mouseleave', () => {

    button.style.transform = 'scale(1)';
  });
});


/* ===== NAVBAR SCROLL ===== */

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {

  if (window.scrollY > 50) {

    navbar.style.background = 'rgba(5, 7, 18, 0.9)';
    navbar.style.borderBottom = '1px solid rgba(255,255,255,0.08)';

  } else {

    navbar.style.background = 'rgba(5, 7, 18, 0.65)';
    navbar.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
  }
});


/* ===== HERO PARALLAX ===== */

const hero = document.querySelector('.hero');

window.addEventListener('mousemove', (e) => {

  const moveX = (e.clientX - window.innerWidth / 2) * 0.008;
  const moveY = (e.clientY - window.innerHeight / 2) * 0.008;

  hero.style.transform = `translate(${moveX}px, ${moveY}px)`;
});


/* ===== FADE IN EFFECT ===== */

const observer = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if (entry.isIntersecting) {

      entry.target.classList.add('show-element');
    }
  });

}, {
  threshold: 0.15
});


const hiddenElements = document.querySelectorAll(
  '.about-card, .project-card, .contact-box, .section-title'
);

hiddenElements.forEach((el) => {

  el.classList.add('hidden-element');

  observer.observe(el);
});


/* ===== RANDOM GLOW ===== */

setInterval(() => {

  const glow = document.querySelector('.background-glow');

  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;

  glow.style.transform = `
    translate(${randomX - 50}px, ${randomY - 50}px)
  `;

}, 4000);