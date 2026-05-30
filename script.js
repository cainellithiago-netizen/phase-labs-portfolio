/* ========================= */
/* HERO CIRCLE PARALLAX */
/* ========================= */

const circle = document.querySelector('.interactive-circle');

window.addEventListener('mousemove', (e) => {

  if (!circle) return;

  const x =
    (window.innerWidth / 2 - e.clientX) / 35;

  const y =
    (window.innerHeight / 2 - e.clientY) / 35;

  circle.style.transform =
    `translate(${x}px, ${y}px)`;
});


/* ========================= */
/* CARD GLOW EFFECT */
/* ========================= */

const cards = document.querySelectorAll(
  '.project-card, .about-card'
);

cards.forEach((card) => {

  card.addEventListener('mousemove', (e) => {

    /* Luxury Landing conserva identidad */

    if (card.classList.contains('light')) {
      return;
    }

    const rect =
      card.getBoundingClientRect();

    const x =
      e.clientX - rect.left;

    const y =
      e.clientY - rect.top;

    card.style.background = `
      radial-gradient(
        circle at ${x}px ${y}px,
        rgba(125,137,255,0.14),
        rgba(255,255,255,0.03)
      )
    `;
  });


  card.addEventListener('mouseleave', () => {

    if (card.classList.contains('light')) {

      card.style.background =
        '#f4f1ea';

      return;
    }

    card.style.background =
      'rgba(255,255,255,0.03)';
  });
});


/* ========================= */
/* BUTTON EFFECT */
/* ========================= */

const buttons =
  document.querySelectorAll('button');

buttons.forEach((button) => {

  button.addEventListener('mouseenter', () => {

    button.style.transform =
      'scale(1.03)';
  });

  button.addEventListener('mouseleave', () => {

    button.style.transform =
      'scale(1)';
  });

});


/* ========================= */
/* NAVBAR SCROLL */
/* ========================= */

const navbar =
  document.querySelector('.navbar');

window.addEventListener('scroll', () => {

  if (!navbar) return;

  if (window.scrollY > 40) {

    navbar.style.background =
      'rgba(5,7,18,0.92)';

    navbar.style.borderBottom =
      '1px solid rgba(255,255,255,0.08)';

  } else {

    navbar.style.background =
      'rgba(5,7,18,0.75)';

    navbar.style.borderBottom =
      '1px solid rgba(255,255,255,0.05)';
  }

});


/* ========================= */
/* FADE IN EFFECT */
/* ========================= */

const observer =
  new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add(
          'show-element'
        );
      }

    });

  }, {
    threshold: 0.15
  });


const hiddenElements =
  document.querySelectorAll(
    '.about-card, .project-card, .contact-box, .section-title'
  );

hiddenElements.forEach((el) => {

  el.classList.add('hidden-element');

  observer.observe(el);

});


/* ========================= */
/* RANDOM BACKGROUND GLOW */
/* ========================= */

const glow =
  document.querySelector('.background-glow');

setInterval(() => {

  if (!glow) return;

  const randomX =
    (Math.random() * 120) - 60;

  const randomY =
    (Math.random() * 120) - 60;

  glow.style.transform =
    `translate(${randomX}px, ${randomY}px)`;

}, 4500);


/* ========================= */
/* ACTIVE NAV LINK */
/* ========================= */

const sections =
  document.querySelectorAll('section');

const navLinks =
  document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {

  let current = '';

  sections.forEach((section) => {

    const sectionTop =
      section.offsetTop - 150;

    if (window.scrollY >= sectionTop) {

      current = section.getAttribute('id');
    }

  });

  navLinks.forEach((link) => {

    link.classList.remove('active');

    if (
      link.getAttribute('href') ===
      `#${current}`
    ) {

      link.classList.add('active');
    }

  });

});