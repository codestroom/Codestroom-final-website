import { Link } from 'react-router-dom';
import Reveal from '../Reveal';
import HubIcon from '../services/hub/HubIcon';
import '../../styles/build-bento.css';

/* Each tile opens with a small looping demo of what the client actually gets,
   then the promise in plain words. Demos are illustrative UI, not client data. */

function AiDemo() {
  return (
    <div className="bb-demo bb-chat" aria-hidden="true">
      <div className="bb-chat-head"><HubIcon name="bot" size={14} /> Your assistant · online</div>
      <span className="bb-msg bb-msg--me">Are you open on Sunday?</span>
      <span className="bb-typing"><i /><i /><i /></span>
      <span className="bb-msg bb-msg--bot">Yes — 10am to 4pm. Shall I book you a slot?</span>
      <span className="bb-source"><HubIcon name="file" size={11} /> Answered from your FAQ</span>
    </div>
  );
}

function WebDemo() {
  return (
    <div className="bb-demo bb-dash" aria-hidden="true">
      <div className="bb-dash-side"><i className="on" /><i /><i /><i /></div>
      <div className="bb-dash-main">
        <div className="bb-dash-top">
          <span className="bb-live"><i /> Live</span>
          <span className="bb-avatar" />
        </div>
        <div className="bb-kpis">
          <span><small>Bookings</small><b>128</b></span>
          <span><small>Revenue</small><b>↑ 18%</b></span>
          <span><small>Users</small><b>2.4k</b></span>
        </div>
        <svg className="bb-chart" viewBox="0 0 200 60" preserveAspectRatio="none">
          <defs>
            <linearGradient id="bb-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#6e22b8" stopOpacity="0.35" />
              <stop offset="1" stopColor="#6e22b8" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="bb-chart-area" d="M0 50 L25 42 L50 46 L75 30 L100 34 L125 20 L150 24 L175 10 L200 14 L200 60 L0 60Z" />
          <path className="bb-chart-line" d="M0 50 L25 42 L50 46 L75 30 L100 34 L125 20 L150 24 L175 10 L200 14" />
        </svg>
      </div>
    </div>
  );
}

function MobileDemo() {
  return (
    <div className="bb-demo bb-mobile" aria-hidden="true">
      <div className="bb-phone">
        <span className="bb-phone-notch" />
        <span className="bb-row"><i /> Site visit · Plot 14</span>
        <span className="bb-row"><i /> Photo report</span>
        <span className="bb-row"><i /> Customer signature</span>
        <span className="bb-status bb-status--off"><HubIcon name="clock" size={11} /> Offline — saved on phone</span>
        <span className="bb-status bb-status--on"><HubIcon name="check" size={11} /> Back online — 3 synced</span>
      </div>
      <span className="bb-store">App Store · Google Play</span>
    </div>
  );
}

function ShopDemo() {
  return (
    <div className="bb-demo bb-shop" aria-hidden="true">
      <div className="bb-product">
        <span className="bb-product-img" />
        <div className="bb-product-info">
          <b>Handmade tote bag</b>
          <span className="bb-price">
            <em className="p1">₹1,499</em>
            <em className="p2">$18.00</em>
            <em className="p3">€16.50</em>
          </span>
          <span className="bb-cur"><i className="c1">INR</i><i className="c2">USD</i><i className="c3">EUR</i></span>
          <span className="bb-buy">Checkout</span>
        </div>
      </div>
      <span className="bb-order"><HubIcon name="check" size={12} /> Order placed</span>
    </div>
  );
}

const DEMOS = { ai: AiDemo, web: WebDemo, mobile: MobileDemo, shop: ShopDemo };

export default function BuildBento({ items }) {
  return (
    <div className="bb">
      <Reveal className="bb-head">
        <span className="bb-kicker">What we can build for you</span>
        <h2>Pick the outcome. <span>We handle the tech.</span></h2>
      </Reveal>

      <div className="bb-grid">
        {items.map((item, i) => {
          const Demo = DEMOS[item.demo];
          return (
            <Reveal as="article" key={item.slug} delay={i * 90} className={`bb-tile bb-tile--${item.demo}`}>
              <div className="bb-stage">{Demo && <Demo />}</div>
              <div className="bb-body">
                <span className="bb-label">{item.title}</span>
                <h3>{item.outcome}</h3>
                <p className="bb-for"><strong>Great for:</strong> {item.forWho}</p>
                <ul className="bb-benefits">
                  {item.benefits.map((b) => (
                    <li key={b}><HubIcon name="check" size={13} /> {b}</li>
                  ))}
                </ul>
                {item.chips && (
                  <div className="bb-chips">
                    <span>{item.chipsLabel}</span>
                    {item.chips.map((c) => <em key={c}>{c}</em>)}
                  </div>
                )}
                <div className="bb-foot">
                  <span className="bb-time"><HubIcon name="clock" size={14} /> Typical launch: <b>{item.weeks}</b></span>
                  <Link to={`/contact?service=${item.service}`} className="bb-cta">
                    Build this for me <HubIcon name="arrow" size={14} />
                  </Link>
                </div>
                <p className="bb-stack">Built with {item.stack.join(' · ')}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
