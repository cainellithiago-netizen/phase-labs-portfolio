/* ===================================== */
/* PHASE LABS */
/* SCRIPT V2 */
/* ===================================== */


/* ===================================== */
/* HERO SPHERE */
/* ===================================== */

const sphere = document.querySelector(
  ".interactive-circle"
);

window.addEventListener("mousemove", (e) => {

  if (!sphere) return;

  const x =
    (window.innerWidth / 2 - e.clientX) / 35;

  const y =
    (window.innerHeight / 2 - e.clientY) / 35;

  sphere.style.transform =
    `translate(${x}px, ${y}px)`;
});


/* ===================================== */
/* NAVBAR SCROLL */
/* ===================================== */

const navbar =
  document.querySelector(".navbar");

window.addEventListener("scroll", () => {

  if (!navbar) return;

  if (window.scrollY > 40) {

    navbar.style.background =
      "rgba(5,7,18,.92)";

    navbar.style.borderBottom =
      "1px solid rgba(255,255,255,.08)";

  } else {

    navbar.style.background =
      "rgba(5,7,18,.75)";

    navbar.style.borderBottom =
      "1px solid rgba(255,255,255,.05)";
  }

});


/* ===================================== */
/* ACTIVE NAV */
/* ===================================== */

const sections =
  document.querySelectorAll("section");

const navLinks =
  document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach((section) => {

    const sectionTop =
      section.offsetTop - 180;

    if (window.scrollY >= sectionTop) {

      current =
        section.getAttribute("id");
    }

  });

  navLinks.forEach((link) => {

    link.classList.remove("active");

    if (
      link.getAttribute("href")
      === `#${current}`
    ) {

      link.classList.add("active");
    }

  });

});


/* ===================================== */
/* FADE IN */
/* ===================================== */

const observer =
  new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

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

const hiddenElements =
  document.querySelectorAll(
    ".about-card, .project-card, .contact-box, .section-title"
  );

hiddenElements.forEach((el) => {

  el.classList.add(
    "hidden-element"
  );

  observer.observe(el);

});


/* ===================================== */
/* PROJECTS SYSTEM */
/* ===================================== */

const projectButtons =
  document.querySelectorAll(
    ".project-toggle"
  );

projectButtons.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      const currentCard =
        button.closest(
          ".project-card"
        );

      const alreadyOpen =
        currentCard.classList.contains(
          "active"
        );

      document
        .querySelectorAll(
          ".project-card"
        )
        .forEach((card) => {

          card.classList.remove(
            "active"
          );

          const btn =
            card.querySelector(
              ".project-toggle"
            );

          if (btn) {

            btn.textContent =
              "Ver proyecto";
          }

        });

      if (!alreadyOpen) {

        currentCard.classList.add(
          "active"
        );

        button.textContent =
          "Ocultar proyecto";
      }

    }
  );

});


/* ===================================== */
/* CARD HOVER GLOW */
/* ===================================== */

const cards =
  document.querySelectorAll(
    ".about-card, .project-card"
  );

cards.forEach((card) => {

  card.addEventListener(
    "mousemove",
    (e) => {

      if (
        card.classList.contains(
          "light"
        )
      ) {
        return;
      }

      const rect =
        card.getBoundingClientRect();

      const x =
        e.clientX - rect.left;

      const y =
        e.clientY - rect.top;

      card.style.background =
        `
        radial-gradient(
          circle at ${x}px ${y}px,
          rgba(125,137,255,.15),
          rgba(255,255,255,.03)
        )
      `;
    }
  );

  card.addEventListener(
    "mouseleave",
    () => {

      if (
        card.classList.contains(
          "light"
        )
      ) {

        card.style.background =
          "#f4f1ea";

        return;
      }

      card.style.background =
        "rgba(255,255,255,.03)";
    }
  );

});


/* ===================================== */
/* BUTTON MICRO INTERACTION */
/* ===================================== */

const buttons =
  document.querySelectorAll(
    "button"
  );

buttons.forEach((button) => {

  button.addEventListener(
    "mouseenter",
    () => {

      button.style.transform =
        "scale(1.03)";
    }
  );

  button.addEventListener(
    "mouseleave",
    () => {

      button.style.transform =
        "scale(1)";
    }
  );

});


/* ===================================== */
/* BACKGROUND GLOW */
/* ===================================== */

const glow =
  document.querySelector(
    ".background-glow"
  );

setInterval(() => {

  if (!glow) return;

  const x =
    (Math.random() * 120) - 60;

  const y =
    (Math.random() * 120) - 60;

  glow.style.transform =
    `translate(${x}px, ${y}px)`;

}, 5000);


/* ===================================== */
/* PAGE LOADED */
/* ===================================== */

window.addEventListener(
  "load",
  () => {

    document.body.classList.add(
      "loaded"
    );
  }
);