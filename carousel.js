(() => {
  const section = document.querySelector(".hero");
  const track = section.querySelector(".track");
  const dotsWrap = section.querySelector(".dots");
  const btnPrev = section.querySelector(".left");
  const btnNext = section.querySelector(".right");
  const root = section.querySelector(".carousel");
  const autoplay = root?.dataset.autoplay !== "false";
  const intervalMs = Number(root?.dataset.interval || 5000);

  const heroImages = [
    "./assets/hero/904b33e6-39f5-4779-867a-f2d9c2214794.jpg.jpeg",
    "./assets/hero/7cf0cad7-acfc-4df7-9bba-d1e1ccc51872.jpg.jpeg",
    "./assets/hero/7fa59291-2801-455d-8fa2-645322d75e4a.jpg.jpeg",
    "./assets/hero/347bc218-d388-4c3f-baff-bc03b19aa422.jpg.jpeg",
  ].filter(Boolean);

  if (!heroImages.length) {
    heroImages.push(
      "./assets/hero/7fa59291-2801-455d-8fa2-645322d75e4a.jpg.jpeg"
    );
  }

  track.innerHTML = heroImages
    .map((src, i) => {
      const name =
        src
          .split("/")
          .pop()
          ?.split(".")
          .shift()
          ?.replace(/[-_]/g, " ") || `Slide ${i + 1}`;
      return `<div class="slide" role="listitem" aria-roledescription="slide" aria-label="${
        i + 1
      } of ${heroImages.length}">
    <img src="${src}" alt="Hero slide: ${name}">
      </div>`;
    })
    .join("");

  dotsWrap.innerHTML = heroImages
    .map(
      (_, i) =>
        `<button class="dot" type="button" aria-label="Go to slide ${
          i + 1
        }"></button>`
    )
    .join("");
  const dots = Array.from(dotsWrap.querySelectorAll(".dot"));

  let index = 0;
  let timer;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  function goTo(i) {
    index = (i + heroImages.length) % heroImages.length;
    update();
  }

  function start() {
    if (
      !autoplay ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    stop();
    timer = setInterval(() => goTo(index + 1), intervalMs);
  }

  function stop() {
    if (timer) clearInterval(timer);
  }

  btnPrev.addEventListener("click", () => {
    goTo(index - 1);
    start();
  });
  btnNext.addEventListener("click", () => {
    goTo(index + 1);
    start();
  });
  dots.forEach((dot, i) =>
    dot.addEventListener("click", () => {
      goTo(i);
      start();
    })
  );

  section.addEventListener("mouseenter", stop);
  section.addEventListener("mouseleave", start);
  section.addEventListener("focusin", stop);
  section.addEventListener("focusout", start);
  document.addEventListener("visibilitychange", () =>
    document.hidden ? stop() : start()
  );

  let startX = null,
    pointerId = null;
  track.addEventListener("pointerdown", (e) => {
    pointerId = e.pointerId;
    startX = e.clientX;
    track.setPointerCapture(pointerId);
    stop();
  });
  track.addEventListener("pointerup", (e) => {
    if (pointerId !== e.pointerId) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 30) dx < 0 ? goTo(index + 1) : goTo(index - 1);
    startX = null;
    pointerId = null;
    start();
  });

  update();
  start();
})();