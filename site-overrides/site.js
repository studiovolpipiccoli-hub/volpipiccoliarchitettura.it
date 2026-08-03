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


/* privacy-map-v1 */
document.addEventListener("click", (event) => {
  const loadButton = event.target.closest("[data-map-load]");
  if (loadButton) {
    const map = loadButton.closest(".map-consent-shell");
    const panel = map?.querySelector("[data-map-consent]");
    if (!map || !panel || map.querySelector("iframe")) return;

    const iframe = document.createElement("iframe");
    iframe.title = "Mappa Google Maps dello studio Volpi Piccoli Architettura";
    iframe.src = "https://www.google.com/maps?q=45.46840,10.60161&z=16&output=embed";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.allowFullscreen = true;

    const disable = document.createElement("button");
    disable.type = "button";
    disable.className = "map-disable";
    disable.dataset.mapDisable = "";
    disable.textContent = "Disattiva mappa";

    panel.replaceWith(iframe);
    map.appendChild(disable);
  }

  const disableButton = event.target.closest("[data-map-disable]");
  if (disableButton) {
    const map = disableButton.closest(".map-consent-shell");
    if (!map) return;
    map.querySelector("iframe")?.remove();
    disableButton.remove();
    const logo = map.querySelector(".contact-map-logo");
    logo?.insertAdjacentHTML("beforebegin", '<div class="map-consent" data-map-consent><p class="eyebrow">Google Maps disattivato</p><h3>La vostra privacy viene prima.</h3><p>La mappa è bloccata per evitare collegamenti a Google senza una vostra scelta. Attivandola, l’indirizzo IP e dati tecnici del dispositivo potranno essere trattati da Google secondo la propria informativa.</p><button type="button" data-map-load>Carica la mappa</button><a href="/privacy/#google-maps">Dettagli nella Privacy e Cookie Policy</a></div>');
  }
});
