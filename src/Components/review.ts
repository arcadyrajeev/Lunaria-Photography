import "../Stylesheets/review.css";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

import reviewData from "../data/review.json"; //  fake

function setupReviewStars(rating = 0) {
  const width = (rating / 5) * 8.1;

  return `${width}rem`;
}

window.addEventListener("DOMContentLoaded", () => {
  const reviewsContainer = document.querySelector(
    ".review-container"
  ) as HTMLElement;

  const reviews = document.querySelector(".reviews") as HTMLElement;

  gsap.registerPlugin(Draggable, InertiaPlugin);

  const mm = gsap.matchMedia();

  mm.add("(min-width: 786px)", () => {
    Draggable.create(reviews, {
      type: "x", // horizontal dragging
      inertia: true,
      edgeResistance: 0.85,

      bounds: {
        minX: -(reviewsContainer.scrollWidth - reviewsContainer.clientWidth),
        maxX: 0,
      },
      onDrag() {
        reviews.scrollLeft = -this.x;
      },
      onThrowUpdate() {
        reviews.scrollLeft = -this.x;
      },
    });
  });
});

export function Review() {
  return `
    <section class="review-section">
        <h1>What Our Clients Say</h1>
        <div class="review-container">
            <div class="reviews">
            ${reviewData
              .map(
                (review) => `
            <div class="review-card">
                <div class="review-box">
                    <img src="${review.image || "/profile-default.svg"}" alt="${review.name}">
                    <p class="review-text">${review.review}</p>
                </div>
                <h3 class="reviewer" >- ${review.name}</h3>
                <div class="star-container">
                <img src="/empty-stars.svg" alt="Rating Stars">
                    <div class="star-mask-wrapper" style="width: ${setupReviewStars(review.stars)}">
                        <img src="/yellow-stars.svg" >
        
                    </div>
                </div>
                    
            </div>
            `
              )
              .join("")}
            </div>
        </div>
    </section>
  `;
}
