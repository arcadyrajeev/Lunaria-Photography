import "../Stylesheets/Gallary.css";

// Dynamically import all images from the folder
const images = Object.values(
  import.meta.glob<string>("/src/assets/Gallery/*.webp", {
    eager: true,
    import: "default",
  })
);

export function Gallery() {
  return `
  <div class="gallery">
  <h1 class="gallery-title">Gallery</h1>
    <div class="image-grid">
      ${images
        .map(
          (src, index) => `
        <img src="${src}" alt="Gallery Image ${index + 1}" class="gallery-image" data-index="${index}">
      `
        )
        .join("")}
    </div>
  </div>
  `;
}
