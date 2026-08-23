import Reveal from './Reveal';

export default function Work() {
  return (
    <section id="work">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="kicker">Industries we serve</span>
          <h1>Built for the businesses and people who serve their communities.</h1>
          <p>From restaurant tables to online storefronts to public offices — a look at who we work with and how we help them grow.</p>
        </Reveal>
        <div className="work-grid">
          <Reveal as="div" className="work-card work-1 large">
            <span className="kicker">Restaurants &amp; Local Business</span>
            <h3>Turning nearby searches into full tables</h3>
            <p>
              Google Business optimization, social content and local ad campaigns built to get
              restaurants and local businesses found — and chosen — by the people searching
              nearby.
            </p>
            <div className="metrics">
              <div>
                <div className="m-num">Local SEO</div>
                <div className="m-lbl">Google Business &amp; Maps</div>
              </div>
              <div>
                <div className="m-num">Social Content</div>
                <div className="m-lbl">Reels, posts &amp; offers</div>
              </div>
              <div>
                <div className="m-num">Online Ordering</div>
                <div className="m-lbl">Delivery &amp; reservation funnels</div>
              </div>
            </div>
          </Reveal>
          <Reveal as="div" className="work-card work-2">
            <span className="kicker">E-commerce</span>
            <h3>Marketing that turns browsers into buyers</h3>
            <p>
              Paid campaigns, product content and conversion-focused funnels for online stores
              selling across India, Canada, the USA and Europe.
            </p>
            <div className="metrics">
              <div>
                <div className="m-num">Paid Ads</div>
                <div className="m-lbl">Meta &amp; Google Shopping</div>
              </div>
              <div>
                <div className="m-num">Funnels</div>
                <div className="m-lbl">Landing pages that convert</div>
              </div>
            </div>
          </Reveal>
          <Reveal as="div" className="work-card work-3">
            <span className="kicker">Public Leaders &amp; Organizations</span>
            <h3>Building trust and visibility that lasts</h3>
            <p>
              Digital presence and outreach campaigns for religious organizations, community
              leaders and public representatives — built on credibility, not gimmicks.
            </p>
            <div className="metrics">
              <div>
                <div className="m-num">Outreach</div>
                <div className="m-lbl">Community-first messaging</div>
              </div>
              <div>
                <div className="m-num">Reputation</div>
                <div className="m-lbl">Consistent public presence</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
