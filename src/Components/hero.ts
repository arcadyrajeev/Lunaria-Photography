import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = Object.values(
  import.meta.glob<string>("/src/assets/Heroslides/*.webp", {
    eager: true,
    import: "default",
  })
);

let currentIndex = 0;

function showSlide(index: number) {
  const img = document.getElementById("hero-image") as HTMLImageElement | null;
  if (!img) return;
  img.src = images[index];
}

function startSlideshow(interval = 15000) {
  if (images.length === 0) return;
  showSlide(currentIndex);

  setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    showSlide(currentIndex);
  }, interval);
}

function animateButtonsOnScroll() {
  const buttons = document.querySelectorAll(".ctrl");
  if (!buttons) return;

  const scrollConfig = {
    trigger: document.body,
    start: "top top",
    end: "500vh top",
    scrub: true,
  };

  for (const button of buttons) {
    gsap.to(button, {
      opacity: 0,
      ease: "power2.out",
      scrollTrigger: scrollConfig,
    });
  }
}

function setupHeroControls() {
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  if (!prevButton || !nextButton) return;

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showSlide(currentIndex);
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    showSlide(currentIndex);
  });
}
export function Hero() {
  // Important: You will inject markup manually, so Hero() can still be used inside template literals
  // If you prefer auto-append instead, we can adjust.
  requestAnimationFrame(() => {
    startSlideshow();
    animateButtonsOnScroll();
    setupHeroControls();
  });

  return `
    <div class="hero" id="main-content">
      <div class="slideshow">
        <img src="" id="hero-image" alt="hero slideshow image" />
      </div>
      <div class="ctrl" id="prev"><img src="/arrow-prev.svg" /></div>
      <div class="ctrl" id="next"><img src="/arrow-next.svg" /></div>
    </div>
  `;
}
