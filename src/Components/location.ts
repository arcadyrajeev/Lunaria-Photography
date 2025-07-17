export function Location() {
  return `
    <section class="location" id="location">
      <div class="findus-text">
        <h2>Find Us</h2>
        <p>
          Our studio is based in <strong>Kurla, Mumbai</strong> — a vibrant neighborhood where creativity meets culture.
          Whether you're planning a wedding shoot, personal portrait, or editorial session, Lunaria Photography is here to bring your vision to life.
        </p>
        <p>
          <strong>Studio Address:</strong> Lunaria Photography, Kurla (West), Mumbai, Maharashtra
        </p>
        <p>
          Studio visits are by <strong>appointment only</strong>. Use the map below to locate us, and feel free to
          <a href="#contact">get in touch</a> for bookings or inquiries.
        </p>

        <div class="cta-button">
          <a href="#contact">Schedule a Shoot</a>
        </div>
      </div>

      <div class="map-container">
        <div id="map" style="width: 100%; height: max(40vw, 24rem);"></div>
      </div>
    </section>
  `;
}
