import "../Stylesheets/Gallary.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Dynamically import all images from the folder
const images = Object.values(
  import.meta.glob<string>("/src/assets/thumb/*.webp", {
    eager: true,
    import: "default",
  })
);

function getFileName(path: string): string {
  return path.split("/").pop() || "";
}

function pullImage(fileName: string): string {
  const images = import.meta.glob<string>("/src/assets/full/*.webp", {
    eager: true,
    import: "default",
  });

  const path = `/src/assets/full/${fileName}`;
  const image = images[path];

  if (!image) {
    console.warn(`Image not found: ${fileName} path: ${path}`);
    return "";
  } else {
    console.log("It fucking worked!");
  }

  return image;
}

function setupImageViewer() {
  const overlay = document.getElementById("fullscreen-overlay") as HTMLElement;
  const fullImage = document.getElementById(
    "fullscreen-image"
  ) as HTMLImageElement;
  const closeBtn = document.getElementById("close-btn");

  document.querySelectorAll(".gallery-image").forEach((img) => {
    img.addEventListener("click", () => {
      const thumbSrc = (img as HTMLImageElement).src;
      const fileName = getFileName(thumbSrc); // same helper from before
      console.log(fileName);
      const fullSrc = pullImage(fileName);

      fullImage.src = fullSrc;
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
      start: "top-=100 top", // trigger after 100px scroll
      end: "top+=200 top", // animation range
    },
  });

  const imageContainers = document.querySelectorAll(".img-container");

  tl.from(imageContainers, {
    opacity: 0,
    y: 60,
    stagger: {
      each: 0.1, // adjust delay between each image
      from: "start", // can also use "center" or "edges"
    },
    duration: 1,
    ease: "power2.out",
  });
}

export function Gallery() {
  setTimeout(() => {
    setupImageViewer();
    animateImages(); // <-- Call the animation timeline here
  }, 0); // delay ensures DOM is available

  const total = images.length;
  const partSize = Math.ceil(total / 4);
  console.log(partSize, total);

  const firstPart = images.slice(0, partSize);
  const secondPart = images.slice(partSize, partSize * 2);
  const thirdPart = images.slice(partSize * 2, partSize * 3);
  const fourthPart = images.slice(partSize * 3, total);

  return `
    <div class="gallery" id="gallery">
      <h1 class="gallery-title">Gallery</h1>
      <div class="image-grid">
        <div class="column">
          ${firstPart
            .map(
              (src, index) => `
              <div class="img-container">
                <img src="${src}" alt="Gallery Image ${index + 1}" class="gallery-image" data-index="${index}" loading="lazy" />
              </div>`
            )
            .join("")}
        </div>
        <div class="column">
          ${secondPart
            .map(
              (src, index) => `
              <div class="img-container">
                <img src="${src}" alt="Gallery Image ${index + 1 + partSize}" class="gallery-image" data-index="${index + partSize}" loading="lazy" />
              </div>`
            )
            .join("")}
        </div>
        <div class="column">
          ${thirdPart
            .map(
              (src, index) => `
              <div class="img-container">
                <img src="${src}" alt="Gallery Image ${index + 1 + partSize * 2}" class="gallery-image" data-index="${index + partSize * 2}" loading="lazy" />
              </div>`
            )
            .join("")}
        </div>

        <div class="column">
          ${fourthPart
            .map(
              (src, index) => `
              <div class="img-container">
                <img src="${src}" alt="Gallery Image ${index + 1 + partSize * 3}" class="gallery-image" data-index="${index + partSize * 2}" loading="lazy" />
              </div>`
            )
            .join("")}
        </div>
      </div>
    </div>

    <!-- Fullscreen viewer -->
    <div class="fullscreen-overlay" id="fullscreen-overlay">
      <button class="close-btn" id="close-btn">×</button>
      <img id="fullscreen-image" />
    </div>
  `;
}
