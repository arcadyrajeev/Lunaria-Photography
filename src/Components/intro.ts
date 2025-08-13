import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function animateIntroCards() {
  const mm = gsap.matchMedia();
  const cards = document.querySelectorAll(".image-card");

  // Desktop
  mm.add("(min-width: 1024px)", () => {
    cards.forEach((card, index) => {
      const endOffset = 40 + index * 20; // each card scrolls further = slower animation

      gsap.from(card, {
        y: 150,
        duration: 1,
        ease: "power2.out", // easing for smooth animation
        stagger: 2, // stagger the animation for each card
        scrollTrigger: {
          trigger: card,
          start: "top 100%",
          end: `top ${endOffset}%`,
          scrub: 2, // smooth scrolling effect
        },
      });
    });
  });

  // Mobile
  mm.add("(max-width: 600px)", () => {
    cards.forEach((card) => {
      gsap.from(card, {
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".image-container",
          start: "top 60%", // when the top of the container reaches the bottom of the viewport
          end: "bottom 70%", //when the bottom of the container reaches the bottom of the viewport
          scrub: 1.5,
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
    <section class="intro">
    <h1>“Every story deserves to be told beautifully - through our lens, your moments last forever.”</h1>
      <div class="intro-container">
        <div class="image-container">
          <div class="image-card" id="card1"><img src="/intro/3.webp"></div>
          <div class="image-card" id="card2"><img src="/intro/2.webp"></div>
          <div class="image-card" id="card3"><img src="/intro/1.webp"></div>
        </div>
        <div class="text-card">
          <p>At</p>
          <h2>Lunaria Photography,</h2>
          <p>we don’t just take pictures — we capture stories, emotions, and the fleeting magic of a moment. Inspired by the delicate beauty of the Lunaria flower, our photography is rooted in elegance, authenticity, and timeless aesthetics.</p>

          <p>Whether it’s an intimate wedding, a soulful portrait, or a quiet moment in nature, we believe that every frame should feel like poetry. With a keen eye for detail and a passion for natural light, we craft images that evoke warmth, connection, and a sense of quiet wonder.</p>
        </div>
      </div>
      
    </section>
  `;
}
