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
  }, 0); // delay ensures DOM is available

  return `
    <div class="gallery" id="gallery">
      <h1 class="gallery-title">Gallery</h1>
      <div class="image-grid">
        ${images
          .map(
            (src, index) =>
              `<img src="${src}" alt="Gallery Image ${index + 1}" class="gallery-image" data-index="${index}">`
          )
          .join("")}
      </div>
    </div>
  `;
}
