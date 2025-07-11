import { Navbar } from "./Components/navbar";
import { Hero } from "./Components/hero";
import { Gallery } from "./Components/gallery";
import { About } from "./Components/about";
import { Footer } from "./Components/footer";
import "./Stylesheets/home.css";
import "./Stylesheets/Gallary.css";
import "./Stylesheets/mobile.css";
import { Pricing } from "./Components/pricing";
import { Intro } from "./Components/intro";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  ${Navbar()}
  ${Hero()}
  ${Intro()}
  ${Gallery()}
  ${Pricing()}
  ${About()}
  ${Footer()}
`;
