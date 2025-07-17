import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Load images
const images = Object.values(
  import.meta.glob<string>("/src/assets/Heroslides/*.webp", {
    eager: true,
    import: "default",
  })
);

let currentIndex = 0;
let slideWidth = window.innerWidth;

function createSlides(): string {
  return images
    .map((src) => `<img src="${src}" class="slide" alt="Slideshow image" />`)
    .join("");
}

function updateSlidePosition() {
  const track = document.querySelector(".slideshow-track") as HTMLElement;
  if (!track) return;

  gsap.to(track, {
    x: -currentIndex * slideWidth,
    duration: 1,
    ease: "power2.out",
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % images.length;
  updateSlidePosition();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateSlidePosition();
}

function startAutoSlide(delay = 15000) {
  setInterval(() => {
    nextSlide(); // Auto-increments index
  }, delay);
}

function setupHeroControls() {
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  if (!prevButton || !nextButton) return;

  prevButton.addEventListener("click", () => {
    prevSlide(); // Manual nav, same index tracker
  });

  nextButton.addEventListener("click", () => {
    nextSlide();
  });
}

function animateButtonsOnScroll() {
  const buttons = document.querySelectorAll(".ctrl");

  const scrollConfig = {
    trigger: document.body,
    start: "top top",
    end: "500vh top",
    scrub: true,
  };

  buttons.forEach((button) => {
    gsap.to(button, {
      opacity: 0,
      ease: "power2.out",
      scrollTrigger: scrollConfig,
    });
  });
}

export function Hero() {
  requestAnimationFrame(() => {
    const track = document.querySelector(".slideshow-track") as HTMLElement;
    if (track) {
      track.style.width = `${images.length * 100}vw`;
    }

    updateSlidePosition(); // Initial
    setupHeroControls();
    animateButtonsOnScroll();
    startAutoSlide(); // 🔥 Always active, never paused

    window.addEventListener("resize", () => {
      slideWidth = window.innerWidth;
      updateSlidePosition();
    });
  });

  return `
    <div class="hero" id="main-content">
      <div class="slideshow-container">
        <div class="slideshow-track">
          ${createSlides()}
        </div>
      </div>
      <div class="ctrl" id="prev"><img src="/arrow-prev.svg" /></div>
      <div class="ctrl" id="next"><img src="/arrow-next.svg" /></div>
    </div>
  `;
}
