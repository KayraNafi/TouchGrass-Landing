const taglines = [
  "Go touch grass.",
  "Micro-breaks, macro-you.",
  "Be less chair.",
  "You sure you are 20s?"
];

const heroTagline = document.getElementById("heroTagline");
const themeToggle = document.getElementById("themeToggle");
const themeToggleLabel = themeToggle?.querySelector(".theme-toggle-label");
const themeThumb = document.getElementById("themeThumb");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

let taglineIndex = 0;
let taglineInterval;

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("tg-theme", theme);
  if (themeToggleLabel) {
    themeToggleLabel.textContent = theme === "dark" ? "Light" : "Dark";
  }
  if (themeThumb) {
    themeThumb.setAttribute("aria-hidden", "true");
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
}

function startTaglineRotation() {
  if (!heroTagline) return;
  taglineInterval = window.setInterval(() => {
    taglineIndex = (taglineIndex + 1) % taglines.length;
    heroTagline.classList.add("fade-out");
    window.setTimeout(() => {
      heroTagline.textContent = taglines[taglineIndex];
      heroTagline.classList.remove("fade-out");
    }, 200);
  }, 4000);
}

function initTheme() {
  const storedTheme = localStorage.getItem("tg-theme");
  if (storedTheme) {
    setTheme(storedTheme);
  } else {
    setTheme(prefersDark ? "dark" : "dark");
  }
}

function initNav() {
  if (!navToggle || !navLinks) return;
  navToggle.addEventListener("click", () => {
    const open = navLinks.getAttribute("data-open") === "true";
    navLinks.setAttribute("data-open", String(!open));
    navToggle.setAttribute("aria-expanded", String(!open));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 860) {
        navLinks.setAttribute("data-open", "false");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  startTaglineRotation();
  initNav();

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener(
    "change",
    (event) => {
      const storedTheme = localStorage.getItem("tg-theme");
      if (!storedTheme) {
        setTheme(event.matches ? "dark" : "light");
      }
    }
  );
});

window.addEventListener("beforeunload", () => {
  if (taglineInterval) {
    window.clearInterval(taglineInterval);
  }
});
