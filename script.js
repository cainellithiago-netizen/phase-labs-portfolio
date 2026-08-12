/* ==========================================
   PHASE LABS
   SCRIPT.JS
========================================== */


/* ==========================================
   NAVBAR SCROLL
========================================== */

const navbar = document.querySelector(".navbar");
let lastScrollY = window.scrollY || 0;

window.addEventListener("scroll", () => {

  const currentY = window.scrollY;

  if (currentY > 40) {

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

  // Hide on scroll down, show on scroll up (mobile friendly)
  if (currentY > lastScrollY && currentY > 60) {
    navbar.classList.add("nav-hidden");
  } else {
    navbar.classList.remove("nav-hidden");
  }

  lastScrollY = currentY <= 0 ? 0 : currentY;

}, { passive: true });


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

}, { passive: true });


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

    if (luxuryOverlay) {
      luxuryOverlay.classList.remove("open");
    }

    document
      .querySelectorAll(".luxury-btn")
      .forEach(btn => {

        btn.textContent =
          "Descubrir más";
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

const luxuryButtons =
  document.querySelectorAll(".luxury-btn");

const luxuryOverlay =
  document.querySelector(".luxury-overlay");

const luxuryOverlayClose =
  document.querySelector(".luxury-overlay-close");

luxuryButtons.forEach(button => {

  button.addEventListener("click", () => {

    if (!luxuryOverlay) return;

    luxuryOverlay.classList.add("open");
    document.body.classList.add('overlay-open');
    button.textContent = "Ocultar más";

  });

});

if (luxuryOverlayClose) {
  luxuryOverlayClose.addEventListener("click", () => {

    luxuryOverlay.classList.remove("open");
      document.body.classList.remove('overlay-open');

    luxuryButtons.forEach(button => {
      button.textContent = "Descubrir más";
    });

  });
}

if (luxuryOverlay) {
  luxuryOverlay.addEventListener("click", event => {
    if (event.target === luxuryOverlay) {
      luxuryOverlay.classList.remove("open");
      document.body.classList.remove('overlay-open');
      luxuryButtons.forEach(button => {
        button.textContent = "Descubrir más";
      });
    }
  });
}


/* ==========================================
   CV OVERLAY
========================================== */

const cvOverlay =
  document.querySelector(".cv-overlay");

const cvOverlayClose =
  document.querySelector(".cv-overlay-close");

if (cvOverlayClose) {
  cvOverlayClose.addEventListener("click", () => {

    cvOverlay.classList.remove("open");
      document.body.classList.remove('overlay-open');

  });
}

if (cvOverlay) {
  cvOverlay.addEventListener("click", event => {
    if (event.target === cvOverlay) {
      cvOverlay.classList.remove("open");
      document.body.classList.remove('overlay-open');
    }
  });
}

// Ensure mobile preserves sidebar layout only while CV overlay is open
if (cvOverlay) {
  const observer = new MutationObserver(() => {
    if (cvOverlay.classList.contains('open') && window.innerWidth <= 480) {
      document.body.classList.add('cv-preserve-mobile');
    } else {
      document.body.classList.remove('cv-preserve-mobile');
    }
  });

  observer.observe(cvOverlay, { attributes: true, attributeFilter: ['class'] });

  // remove class on resize if needed
  window.addEventListener('resize', () => {
    if (!cvOverlay.classList.contains('open')) {
      document.body.classList.remove('cv-preserve-mobile');
    } else if (window.innerWidth > 480) {
      document.body.classList.remove('cv-preserve-mobile');
    }
  });
}

// Toggle sidebar (used by Alt+Z on desktop and the mobile toggle button)
function toggleCvSidebar(){
  document.body.classList.toggle('cv-sidebar-collapsed');
}

// Alt+Z keyboard shortcut to toggle sidebar
document.addEventListener('keydown', (e) => {
  if (e.altKey && (e.key === 'z' || e.key === 'Z')){
    toggleCvSidebar();
  }
});

// Mobile toggle button handler (visible on small screens)
const cvMobileToggle = document.querySelector('.cv-mobile-toggle');
if (cvMobileToggle) {
  cvMobileToggle.addEventListener('click', () => {
    // on touch devices or small widths, behave like Alt+Z
    if (window.innerWidth <= 480 || 'ontouchstart' in window) {
      toggleCvSidebar();
    }
  });
}

// Ensure sidebar-collapsed clears when overlay closes
if (cvOverlayClose) {
  cvOverlayClose.addEventListener("click", () => {
    document.body.classList.remove('cv-sidebar-collapsed');
  });
}

if (cvOverlay) {
  cvOverlay.addEventListener("click", event => {
    if (event.target === cvOverlay) {
      document.body.classList.remove('cv-sidebar-collapsed');
    }
  });
}

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
/* ==========================================
   EMAIL POPUPS
========================================== */

const emailLink =
  document.getElementById("email-link");

const emailPopup =
  document.getElementById("email-popup");

const copyEmail =
  document.getElementById("copy-email");

if(emailLink && emailPopup){

  emailLink.addEventListener("click", e => {

    e.preventDefault();

    emailPopup.classList.toggle("active");

  });

}

if(copyEmail){

  copyEmail.addEventListener("click", () => {

    navigator.clipboard.writeText(
      "cainellithiago@gmail.com"
    );

    copyEmail.textContent =
      "Copiado ✓";

    setTimeout(() => {

      copyEmail.textContent =
        "Copiar correo";

    }, 2000);

  });

}


/* ==========================================
   FOOTER EMAIL
========================================== */

const footerEmailLink =
  document.getElementById(
    "footer-email-link"
  );

const footerEmailPopup =
  document.getElementById(
    "footer-email-popup"
  );

const footerCopyEmail =
  document.getElementById(
    "footer-copy-email"
  );

if(
  footerEmailLink &&
  footerEmailPopup
){

  footerEmailLink.addEventListener(
    "click",
    e => {

      e.preventDefault();

      footerEmailPopup.classList.toggle(
        "active"
      );

    }
  );

}

if(footerCopyEmail){

  footerCopyEmail.addEventListener(
    "click",
    () => {

      navigator.clipboard.writeText(
        "cainellithiago@gmail.com"
      );

      footerCopyEmail.textContent =
        "Copiado ✓";

      setTimeout(() => {

        footerCopyEmail.textContent =
          "Copiar correo";

      }, 2000);

    }
  );

}