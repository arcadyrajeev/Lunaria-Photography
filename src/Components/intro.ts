import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function animateIntroCards() {
  const mm = gsap.matchMedia();
  const cards = document.querySelectorAll(".image-card");

  // Desktop
  mm.add("(min-width: 1024px)", () => {
    cards.forEach((card) => {
      gsap.from(card, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "top center",
          scrub: true,
          toggleActions: "play none none reverse",
        },
      });
    });
  });

  // Mobile
  mm.add("(max-width: 600px)", () => {
    cards.forEach((card) => {
      gsap.from(card, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".image-container",
          start: "top 100%", //when the top of the card reaches the bottom of the viewport
          end: "bottom 110%", //when the top of the card reaches the middle of the viewport
          scrub: true,
          toggleActions: "play none none reverse",
        },
      });
    });
  });
}

export function Intro() {
  requestAnimationFrame(() => {
    animateIntroCards();
  });

  return `
    <div class="intro">
      <div class="image-container">
        <div class="image-card" id="card1"></div>
        <div class="image-card" id="card2"></div>
        <div class="image-card" id="card3"></div>
      </div>
      <div class="text-card">
        <p>At</p>
        <h2>Lunaria Photography,</h2>
        <p>we don’t just take pictures — we capture stories, emotions, and the fleeting magic of a moment. Inspired by the delicate beauty of the Lunaria flower, our photography is rooted in elegance, authenticity, and timeless aesthetics.</p>

        <p>Whether it’s an intimate wedding, a soulful portrait, or a quiet moment in nature, we believe that every frame should feel like poetry. With a keen eye for detail and a passion for natural light, we craft images that evoke warmth, connection, and a sense of quiet wonder.</p>
      </div>
    </div>
  `;
}
