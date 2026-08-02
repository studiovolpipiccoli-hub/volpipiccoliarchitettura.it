document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".project-carousel");
  const track = carousel?.querySelector(".carousel-track");
  if (!carousel || !track) return;

  let paused = false;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const cardStep = () => {
    const card = track.querySelector(".carousel-project");
    return (card?.offsetWidth || track.clientWidth * 0.72) + 24;
  };

  const normalize = () => {
    const halfway = track.scrollWidth / 2;
    if (track.scrollLeft >= halfway) track.scrollLeft -= halfway;
  };

  const moveByCard = (direction) => {
    normalize();
    track.scrollBy({
      left: direction * cardStep(),
      behavior: reduceMotion ? "auto" : "smooth",
    });
    window.setTimeout(normalize, reduceMotion ? 0 : 700);
  };

  const advance = () => {
    if (!paused) moveByCard(1);
  };

  carousel.addEventListener("mouseenter", () => { paused = true; });
  carousel.addEventListener("mouseleave", () => { paused = false; });
  carousel.addEventListener("focusin", () => { paused = true; });
  carousel.addEventListener("focusout", () => { paused = false; });
  carousel.addEventListener("touchstart", () => { paused = true; }, { passive: true });
  carousel.addEventListener("touchend", () => { paused = false; }, { passive: true });
  carousel.addEventListener("touchcancel", () => { paused = false; }, { passive: true });

  carousel.querySelector('[aria-label="Progetto precedente"]')?.addEventListener("click", () => moveByCard(-1));
  carousel.querySelector('[aria-label="Progetto successivo"]')?.addEventListener("click", () => moveByCard(1));

  window.setInterval(advance, 3200);
});


document.addEventListener("click", (event) => {
  const opener = event.target.closest("[data-profile-open]");
  if (opener) document.querySelector('[data-profile="' + opener.dataset.profileOpen + '"]')?.showModal();
  const closer = event.target.closest(".profile-dialog-close");
  if (closer) closer.closest("dialog")?.close();
  if (event.target.matches?.(".profile-dialog")) event.target.close();
});
