const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}, { passive: true });

const revealTargets = Array.from(document.querySelectorAll("[data-reveal]"));
revealTargets.forEach((el, i) => {
  el.style.transitionDelay = `${(i % 3) * 80}ms`;
});

let pending = revealTargets;
let ticking = false;

function revealCheck() {
  ticking = false;
  const limit = (window.innerHeight || document.documentElement.clientHeight) - 40;
  pending = pending.filter((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < limit && rect.bottom > 0) {
      el.classList.add("is-visible");
      return false;
    }
    return true;
  });
}

function onScrollOrResize() {
  if (!ticking && pending.length) {
    ticking = true;
    requestAnimationFrame(revealCheck);
  }
}

window.addEventListener("scroll", onScrollOrResize, { passive: true });
window.addEventListener("resize", onScrollOrResize, { passive: true });
window.addEventListener("load", revealCheck);
revealCheck();
