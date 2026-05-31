/* ==========================================
   PHASE LABS
   SCRIPT.JS
========================================== */


/* ==========================================
   NAVBAR SCROLL
========================================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

  if (window.scrollY > 40) {

    navbar.style.background =
      "rgba(5, 7, 18, 0.92)";

    navbar.style.borderBottom =
      "1px solid rgba(255,255,255,.08)";

  } else {

    navbar.style.background =
      "rgba(5, 7, 18, 0.65)";

    navbar.style.borderBottom =
      "1px solid rgba(255,255,255,.05)";
  }

});


/* ==========================================
   ACTIVE NAV LINKS
========================================== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop =
      section.offsetTop - 180;

    const sectionHeight =
      section.clientHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }

  });

  navLinks.forEach(link => {

    link.classList.remove("active");

    if (
      link.getAttribute("href") === `#${current}`
    ) {
      link.classList.add("active");
    }

  });

});


/* ==========================================
   HERO PARALLAX
========================================== */

const heroCard =
  document.querySelector(".hero-card");

window.addEventListener("mousemove", (e) => {

  if (!heroCard) return;

  const x =
    (window.innerWidth / 2 - e.clientX) *
    0.01;

  const y =
    (window.innerHeight / 2 - e.clientY) *
    0.01;

  heroCard.style.transform =
    `translate(${x}px, ${y}px)`;

});


/* ==========================================
   PHASE LABS ORB
========================================== */

const circle =
  document.querySelector(".interactive-circle");

window.addEventListener("mousemove", (e) => {

  if (!circle) return;

  const x =
    (window.innerWidth / 2 - e.pageX) / 35;

  const y =
    (window.innerHeight / 2 - e.pageY) / 35;

  circle.style.transform =
    `translate(${x}px, ${y}px)`;
});


/* ==========================================
   CARD GLOW EFFECT
========================================== */

const cards =
  document.querySelectorAll(
    ".about-card, .project-card"
  );

cards.forEach(card => {

  card.addEventListener("mousemove", e => {

    const rect =
      card.getBoundingClientRect();

    const x =
      e.clientX - rect.left;

    const y =
      e.clientY - rect.top;

    if (
      card.classList.contains("light")
    ) {
      return;
    }

    card.style.background = `
      radial-gradient(
        circle at ${x}px ${y}px,
        rgba(251, 251, 252, 0.14),
        rgba(255,255,255,.03)
      )
    `;

  });

  card.addEventListener("mouseleave", () => {

    if (
      card.classList.contains("light")
    ) {
      return;
    }

    card.style.background =
      "rgba(255,255,255,.03)";
  });

});


/* ==========================================
   PROJECT PREVIEWS
========================================== */

const projectButtons =
  document.querySelectorAll(
    ".project-toggle"
  );

projectButtons.forEach(button => {

  button.addEventListener("click", () => {

    const preview =
      button.nextElementSibling;

    const isOpen =
      preview.classList.contains("open");

    document
      .querySelectorAll(".project-preview")
      .forEach(item => {

        item.classList.remove("open");

        item.style.maxHeight = null;
      });

    document
      .querySelectorAll(".project-toggle")
      .forEach(btn => {

        btn.textContent =
          "Ver proyecto";
      });

    if (!isOpen) {

      preview.classList.add("open");

      preview.style.maxHeight =
        preview.scrollHeight + "px";

      button.textContent =
        "Ocultar proyecto";
    }

  });

});


/* ==========================================
   BUTTON MICRO INTERACTIONS
========================================== */

const buttons =
  document.querySelectorAll("button");

buttons.forEach(button => {

  button.addEventListener(
    "mouseenter",
    () => {

      button.style.transform =
        "translateY(-3px)";
    }
  );

  button.addEventListener(
    "mouseleave",
    () => {

      button.style.transform =
        "translateY(0)";
    }
  );

});


/* ==========================================
   SCROLL REVEAL
========================================== */

const observer =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "show-element"
          );
        }

      });

    },

    {
      threshold: 0.15
    }

  );

document
  .querySelectorAll(
    ".section-title, .about-card, .project-card, .contact-box, .footer"
  )
  .forEach(el => {

    el.classList.add(
      "hidden-element"
    );

    observer.observe(el);

  });


/* ==========================================
   BACKGROUND GLOW FLOAT
========================================== */

const glow =
  document.querySelector(
    ".background-glow"
  );

setInterval(() => {

  if (!glow) return;

  const randomX =
    Math.random() * 100 - 50;

  const randomY =
    Math.random() * 100 - 50;

  glow.style.transform =
    `translate(${randomX}px, ${randomY}px)`;

}, 4500);


/* ==========================================
   SMOOTH SCROLL FOR NAV
========================================== */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach(anchor => {

    anchor.addEventListener(
      "click",
      function (e) {

        e.preventDefault();

        const target =
          document.querySelector(
            this.getAttribute("href")
          );

        if (!target) return;

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });


/* ==========================================
   PAGE LOADED
========================================== */

window.addEventListener("load", () => {

  document.body.classList.add(
    "loaded"
  );

});