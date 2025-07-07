import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function animateIntroCards() {
  const cards = document.querySelectorAll(".image-card");

  cards.forEach((card, index) => {
    gsap.from(card, {
      y: 200,
      opacity: 0.2, // start from below
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 90%", // when the top of the card reaches 80% of the viewport height
        end: "top 40%", // when the top of the card reaches 30% of the viewport height
        scrub: 1, // smooth scrubbing
        toggleActions: "play none none reverse", // play on enter, reverse on leave
      },
      delay: index * 0.1, // optional stagger
    });
  });
}

export function Intro() {
  requestAnimationFrame(() => {
    animateIntroCards();
  });

  return `
    <div class="intro">
        <div class='image-container' >
            <div class='image-card' id='card1'>

            </div>
            <div class='image-card' id='card2'>
            
            </div>
            <div class='image-card' id='card3'>
            
            </div>
        </div>
        <div class='text-card'>
            <p>At </p> <h2>Lunaria Photography,</h2> <p>we dont just take pictures - we capture stories, emotions, and the fleeting magic of a moment. Inspired by the delicate beauty of the Lunaria flower, our photography is rooted in elegance, authenticity, and timeless aesthetics.</p>

            <p>Whether its an intimate wedding, a soulful portrait, or a quiet moment in nature, we believe that every frame should feel like poetry. With a keen eye for detail and a passion for natural light, we craft images that evoke warmth, connection, and a sense of quiet wonder.</p>
        </div>
    </div>
  `;
}
