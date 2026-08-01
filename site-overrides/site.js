document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".project-carousel");
  const track = carousel?.querySelector(".carousel-track");
  if (!carousel || !track) return;

  let paused = false;
  let previous = performance.now();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const move = (time) => {
    const delta = Math.min(time - previous, 40);
    previous = time;
    if (!paused && !reduceMotion) {
      track.scrollLeft += delta * 0.025;
      const halfway = track.scrollWidth / 2;
      if (halfway > 0 && track.scrollLeft >= halfway) track.scrollLeft -= halfway;
    }
    requestAnimationFrame(move);
  };

  const moveByCard = (direction) => {
    const card = track.querySelector(".carousel-project");
    track.scrollBy({
      left: direction * ((card?.offsetWidth || track.clientWidth * 0.72) + 24),
      behavior: "smooth",
    });
  };

  carousel.addEventListener("mouseenter", () => { paused = true; });
  carousel.addEventListener("mouseleave", () => { paused = false; });
  carousel.addEventListener("focusin", () => { paused = true; });
  carousel.addEventListener("focusout", () => { paused = false; });
  carousel.addEventListener("touchstart", () => { paused = true; }, { passive: true });
  carousel.addEventListener("touchend", () => { paused = false; }, { passive: true });

  carousel.querySelector('[aria-label="Progetto precedente"]')?.addEventListener("click", () => moveByCard(-1));
  carousel.querySelector('[aria-label="Progetto successivo"]')?.addEventListener("click", () => moveByCard(1));
  requestAnimationFrame(move);
});
