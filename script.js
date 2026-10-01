const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
const navigation = document.querySelector(".navigation");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.getElementById("nav-links");
const mobileViewport = window.matchMedia("(max-width: 760px)");
if (navigation && menuToggle && navLinks) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
  };
  const syncMenu = () => {
    // Navigation remains visible when JavaScript is unavailable.
    if (!mobileViewport.matches && document.activeElement === menuToggle)
      navLinks.querySelector("a").focus();
    menuToggle.hidden = !mobileViewport.matches;
    navigation.classList.toggle("menu-ready", mobileViewport.matches);
    closeMenu();
  };
  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(open));
    navLinks.classList.toggle("is-open", open);
  });
  navLinks.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link || !mobileViewport.matches) return;
    closeMenu();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  });
  navigation.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      mobileViewport.matches &&
      menuToggle.getAttribute("aria-expanded") === "true"
    ) {
      closeMenu();
      menuToggle.focus();
    }
  });
  mobileViewport.addEventListener("change", syncMenu);
  syncMenu();
}
