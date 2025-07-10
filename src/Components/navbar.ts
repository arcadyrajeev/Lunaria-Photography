import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Animate logo size on scroll
export function AnimateLogoOnScroll() {
  const logo = document.getElementById("logo");
  const mainContent = document.getElementById("main-content");
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-links");
  const mm = gsap.matchMedia();

  if (!logo) return;

  const scrollConfig = {
    trigger: mainContent,
    start: "top top",
    end: "700vh top",
    scrub: true,
  };

  gsap.to(logo, {
    scale: 0.5,
    y: 0,
    transformOrigin: "left center",
    ease: "power2.out",
    scrollTrigger: scrollConfig,
  });

  gsap.to(navbar, {
    backgroundColor: "#1A1A1A",
    height: "7vh",
    transformOrigin: "left center",
    ease: "power2.out",
    scrollTrigger: scrollConfig,
  });

  gsap.to(navLinks, {
    marginLeft: "40%",
    gap: "2rem",
    ease: "power2.out",
    scrollTrigger: scrollConfig,
  });

  mm.add("(max-width: 600px)", () => {
    gsap.to(logo, {
      scale: 0.5,
      y: 0,
      x: -60,
      transformOrigin: "left center",
      ease: "power2.out",
      scrollTrigger: {
        trigger: mainContent,
        start: "top top",
        end: "700vh top",
        scrub: true,
      },
    });
  });
}

export function Navbar() {
  requestAnimationFrame(() => {
    AnimateLogoOnScroll();
  });

  return `
    <div class="navbar">
      <div class="logo" id="logo">
        <img src='/Logo-hero.svg' alt="Lunaria Photography Logo">
      </div>
      <div class="nav-links">
        <a href="#home">Home</a>
        <a href="#pricing">Pricing</a>
        <a href="#gallery">Gallery</a>
        <a href="#about">About</a>
      </div>
      <div class="button">
          <a href="#contact">Contact</a>
      </div>
    </div>
  `;
}
