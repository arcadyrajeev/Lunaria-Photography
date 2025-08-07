import gsap from "gsap";

window.addEventListener("DOMContentLoaded", () => {
  const ctaSection = document.querySelector("#cta");

  if (!ctaSection) return;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Trigger animation
          const tl = gsap.timeline();
          tl.from(".cta-button", {
            y: 60,
            opacity: 0.4,
            duration: 1.2,
            ease: "power2.out",
            stagger: {
              each: 0.1,
              from: "start",
            },
          });

          // Only animate once, then unobserve
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3, // 30% visible triggers the animation
    }
  );

  observer.observe(ctaSection);
});

export function Cta() {
  return `
    <section class="cta" id="cta">
        <div class="cta-button">
          <a href="#contact">Schedule a Shoot</a>
          <img src="/lense.svg" alt="CTA Icon">
        </div>
    </section>
  `;
}
