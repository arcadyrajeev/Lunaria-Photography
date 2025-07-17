import "../Stylesheets/Gallary.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Dynamically import all images from the folder
const images = Object.values(
  import.meta.glob<string>("/src/assets/Gallery/*.webp", {
    eager: true,
    import: "default",
  })
);

function setupImageViewer() {
  const overlay = document.getElementById("fullscreen-overlay") as HTMLElement;
  const fullImage = document.getElementById(
    "fullscreen-image"
  ) as HTMLImageElement;
  const closeBtn = document.getElementById("close-btn");

  document.querySelectorAll(".gallery-image").forEach((img) => {
    img.addEventListener("click", () => {
      const src = (img as HTMLImageElement).src;
      fullImage.src = src;
      overlay.classList.add("active");
    });
  });

  closeBtn?.addEventListener("click", () => {
    overlay.classList.remove("active");
    fullImage.src = "";
  });
}

function animateGalleryImages() {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {
    const imageGrid = document.querySelector(".image-grid");
    const gallery = document.querySelector(".gallery");

    if (!imageGrid || !gallery) return;

    const scrollWidth = imageGrid.scrollWidth;
    const scrollDistance = scrollWidth - window.innerWidth;

    gsap.to(imageGrid, {
      x: -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: gallery,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: true,
        scrub: 0.5, // smooth scroll binding
        anticipatePin: 1,
      },
    });
  });
}

export function Gallery() {
  setTimeout(() => {
    animateGalleryImages();
    setupImageViewer();
  }, 0); // delay ensures DOM is available

  return `
    <div class="gallery" id="gallery">
      <h1 class="gallery-title">Gallery</h1>
      <div class="image-grid">
        ${images
          .map(
            (src, index) =>
              `<img src="${src}" alt="Gallery Image ${index + 1}" class="gallery-image" data-index="${index}" loading="lazy">`
          )
          .join("")}
      </div>
    </div>

    <!-- Fullscreen viewer -->
      <div class="fullscreen-overlay" id="fullscreen-overlay">
        <button class="close-btn" id="close-btn">×</button>
        <img id="fullscreen-image" />
      </div>
    </div>
  `;
}
