import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function animateButton() {
  gsap.from(".cta-button", {
    y: "10rem",
    opacity: 0,
    ease: "power2.out", // easing for smooth animation
    scrollTrigger: {
      trigger: ".cta",
      start: "top 95%",
      end: "top 60%",
      scrub: 2, // smooth scrolling effect
    },
  });
}

export function Cta() {
  requestAnimationFrame(() => {
    animateButton();
  });

  return `
    <section class="cta" id="cta">
        <div class="cta-button">
          <a href="#contact">Schedule a Shoot</a>
          <img src="/lense.svg"  id="right-img">
        </div>
    </section>
  `;
}
