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

let resizeTimeout: number;
let currentIndex = 0;
let slideWidth = window.innerWidth;

function createSlides(lazy = true): string {
  return images
    .map((src, i) =>
      lazy
        ? `<img class="slide" loading="lazy" src="" data-src="${src}" alt="Hero slide ${i}" />`
        : `<img class="slide" src="${src}" alt="Hero slide ${i}" />`
    )
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
    nextSlide();
  }, delay);
}

function setupHeroControls() {
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  if (!prevButton || !nextButton) return;

  prevButton.addEventListener("click", prevSlide);
  nextButton.addEventListener("click", nextSlide);
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

// ✅ Lazy loading using IntersectionObserver
function setupLazyLoad() {
  const lazyImages =
    document.querySelectorAll<HTMLImageElement>("img[data-src]");
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src!;
          img.removeAttribute("data-src");
          observer.unobserve(img);
        }
      });
    },
    {
      rootMargin: "200px", // preload a bit earlier
    }
  );

  lazyImages.forEach((img) => observer.observe(img));
}

export function Hero() {
  requestAnimationFrame(() => {
    const track = document.querySelector(".slideshow-track") as HTMLElement;
    if (track) {
      track.style.width = `${images.length * 100}vw`;
    }

    updateSlidePosition();
    setupHeroControls();
    animateButtonsOnScroll();
    startAutoSlide();
    setupLazyLoad(); // 🧠 initialize lazy loading here

    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        slideWidth = window.innerWidth;
        updateSlidePosition();
      }, 200);
    });
  });

  return `
    <div class="hero" id="main-content">
      <div class="slideshow-container">
        <div class="slideshow-track">
          ${createSlides(true)} <!-- enable lazy loading -->
        </div>
      </div>
      <div class="ctrl" id="prev"><img src="/arrow-prev.svg" /></div>
      <div class="ctrl" id="next"><img src="/arrow-next.svg" /></div>
    </div>
  `;
}
