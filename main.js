document.documentElement.classList.add("js");

const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

if (menuButton && mobileNav) {
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", document.documentElement.lang === "en" ? "Open menu" : "Abrir menú");
    mobileNav.hidden = true;
    document.body.classList.remove("menu-open");
  };

  menuButton.addEventListener("click", () => {
    const opening = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(opening));
    menuButton.setAttribute("aria-label", opening
      ? (document.documentElement.lang === "en" ? "Close menu" : "Cerrar menú")
      : (document.documentElement.lang === "en" ? "Open menu" : "Abrir menú"));
    mobileNav.hidden = !opening;
    document.body.classList.toggle("menu-open", opening);
  });

  mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  window.matchMedia("(min-width: 761px)").addEventListener("change", closeMenu);
}

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".reveal");
if (!reducedMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        instance.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -35px 0px", threshold: 0.08 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
