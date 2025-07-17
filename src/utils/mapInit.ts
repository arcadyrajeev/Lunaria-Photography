import { Loader } from "@googlemaps/js-api-loader";

export async function initMap(): Promise<void> {
  const loader = new Loader({
    apiKey: "AIzaSyCJU3TdxGsYiDtkM6C6AlZH9PO4zj-4Fyc",
    version: "beta",
    libraries: ["maps"],
    mapIds: ["8dfd6a731b5d1a6d7727abb4"],
  });

  const { Map } = await loader.importLibrary("maps");
  const { AdvancedMarkerElement } = await loader.importLibrary("marker");

  const mapElement = document.getElementById("map");
  if (!mapElement) {
    console.warn("Map element not found");
    return;
  }

  const map = new Map(mapElement, {
    center: { lat: 19.07283, lng: 72.88261 },
    zoom: 14,
    mapId: "8dfd6a731b5d1a6d7727abb4",
    gestureHandling: "greedy",
  });

  new AdvancedMarkerElement({
    map,
    position: { lat: 19.07283, lng: 72.88261 },
    title: "My Location",
  });
}
