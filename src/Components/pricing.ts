export function Pricing() {
  return `
    <section class="pricing" id="pricing">
        
       <h1>Pricing</h1>
        <div class="pricing-container">
        
        <div class="tier">
            <div class="title"><h2>Basic</h2></div>
            <p>$300</p>
            <ul>
                <li>1 Hour Session</li>
                <li>10 Edited Photos</li>
                <li>Online Gallery</li>
            </ul>
            <button class="butt"><span>BOOK NOW</span><span class="arrow">➜</span></button>
        </div>
        <div class="tier">
            <div class="title"><h2>Premium</h2></div>
            <p>$800</p>
            <ul>
                <li>3 Hour Session</li>
                <li>30 Edited Photos</li>
                <li>Online Gallery</li>
                <li>2 Prints Included</li>
                <li>Photo Album</li>
            </ul>
            <button class="butt"><span>BOOK NOW</span><span class="arrow">➜</span></button>
        </div>
        <div class="tier" id="standard-package">
            <div class="title"><h2>Standard</h2></div>
            <p>$500</p>
            <ul>
                <li>2 Hour Session</li>
                <li>20 Edited Photos</li>
                <li>Online Gallery</li>
                <li>1 Print Included</li>
            </ul>
            <button class="butt"><span>BOOK NOW</span><span class="arrow">➜</span></button>
        </div>
        </div>
    </section>
  `;
}
