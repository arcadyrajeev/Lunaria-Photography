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
import { Location } from "./Components/location";
import { initMap } from "./utils/mapInit";
import { Cta } from "./Components/cta-section";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  ${Navbar()}
  ${Hero()}
  ${Cta()}
  ${Intro()}
  ${Pricing()}
  ${Gallery()}
  ${About()}
  ${Location()}
  ${Footer()}
`;

setTimeout(() => {
  initMap();
}, 100); // slight delay to ensure #map is in DOM
