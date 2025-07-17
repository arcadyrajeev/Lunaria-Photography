export function Footer() {
  return `
    <section class="footer" id="footer">
      <div class="footer-container">
        <div class="site-map">
          <a href="#navbar">Home</a>
          <a href="#pricing">Pricing</a>
          <a href="#gallery">Gallery</a>
          <a href="#about">About</a>
          <a href="#location">Find Us</a>
        </div>

        <div class="contact-form">
          <h3>Let’s Connect</h3>
          <form id="contactForm">
            <div class="input-group">
              <label for="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Your Name" required />
            </div>
            <div class="input-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" placeholder="your@email.com" required />
            </div>
            <div class="input-group">
              <label for="message">Message</label>
              <textarea id="message" name="message" rows="4" placeholder="Tell us about your idea..." required></textarea>
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
      <div class="copyright">
        <p>&copy; ${new Date().getFullYear()} Lunaria Photography. All rights reserved.</p>
        <p id="creator">CREATED BY ARCADY</p>
      </div>
    </section>
  `;
}
