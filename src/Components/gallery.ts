import "../Stylesheets/Gallary.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type GalleryItem = {
  id: number;
  title: string;
  thumbnail: string;
  full: string;
};

import galleryData from "../data/gallery.json"; // 👈 Your fake DB

gsap.registerPlugin(ScrollTrigger);

function preloadFullImages() {
  const images = document.querySelectorAll(
    ".gallery-image.lazy-load"
  ) as NodeListOf<HTMLImageElement>;

  images.forEach((img) => {
    const fullSrc = img.dataset.full;
    if (!fullSrc) return;

    const fullImg = new Image();
    fullImg.src = fullSrc;

    fullImg.onload = () => {
      // When the full image is loaded, fade it in
      img.classList.add("fade-out");

      setTimeout(() => {
        img.src = fullSrc;
        img.classList.remove("fade-out");
        img.classList.add("fade-in");
      }, 200); // delay to allow CSS fade out
    };
  });
}

function setupImageViewer() {
  const overlay = document.getElementById("fullscreen-overlay") as HTMLElement;
  const fullImage = document.getElementById(
    "fullscreen-image"
  ) as HTMLImageElement;
  const closeBtn = document.getElementById("close-btn");

  document.querySelectorAll(".gallery-image").forEach((img) => {
    img.addEventListener("click", () => {
      const fullSrc = (img as HTMLImageElement).dataset.full;
      fullImage.src = fullSrc || "image didn't load";
      overlay.classList.add("active");
    });
  });

  closeBtn?.addEventListener("click", () => {
    overlay.classList.remove("active");
    fullImage.src = "";
  });
}

function animateImages() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#gallery",
      start: "top-=130 top",
      end: "top+=200 top",
    },
  });

  const imageContainers = document.querySelectorAll(".img-container");

  tl.from(imageContainers, {
    opacity: 0,
    y: 60,
    stagger: {
      each: 0.1,
      from: "start",
    },
    duration: 1,
    ease: "power2.out",
  });
}

export function Gallery() {
  setTimeout(() => {
    setupImageViewer();
    animateImages();
    preloadFullImages();
  }, 0);

  const columns: GalleryItem[][] = [[], [], [], []];

  galleryData.forEach((img, index) => {
    columns[index % 4].push(img); // evenly distribute across 4 columns
  });

  return `
    <section class="gallery" id="gallery">
      <h1 class="gallery-title">Gallery</h1>
      <div class="image-grid">
        ${columns
          .map(
            (col) => `
            <div class="column">
              ${col
                .map(
                  (img) => `
                  <div class="img-container">
                    <img 
                      src="${img.thumbnail}" 
                      alt="${img.title}" 
                      class="gallery-image" 
                      data-full="${img.full}" 
                      loading="lazy" 
                    />
                  </div>
                `
                )
                .join("")}
            </div>
          `
          )
          .join("")}
      </div>
    </section>

    <!-- Fullscreen viewer -->
    <div class="fullscreen-overlay" id="fullscreen-overlay">
      <button class="close-btn" id="close-btn">×</button>
      <img id="fullscreen-image" />
    </div>
  `;
}
