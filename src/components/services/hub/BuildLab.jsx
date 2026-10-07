import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../../Reveal';
import HubIcon from './HubIcon';
import { BUILD } from '../../../data/servicesHub';

// A block that "builds in" with a staggered delay.
function B({ c = '', s = 0, children }) {
  return <span className={`pv-b ${c}`} style={{ '--s': s }}>{children}</span>;
}

function Browser({ url, children }) {
  return (
    <div className="pv-browser">
      <div className="pv-bar">
        <i /><i /><i />
        <span className="pv-url">{url}</span>
      </div>
      <div className="pv-page">{children}</div>
    </div>
  );
}

const PREVIEWS = {
  static: () => (
    <Browser url="yourbrand.com">
      <B c="pv-nav" s={0} />
      <B c="pv-hero-title" s={1} />
      <B c="pv-line w70" s={2} />
      <B c="pv-line w50" s={2} />
      <B c="pv-btn" s={3} />
      <div className="pv-row3">
        <B c="pv-card" s={4} /><B c="pv-card" s={5} /><B c="pv-card" s={6} />
      </div>
    </Browser>
  ),
  dynamic: () => (
    <Browser url="yourbrand.com/dashboard">
      <div className="pv-dyn">
        <div className="pv-side">
          <B c="pv-avatar" s={0} />
          <B c="pv-line w80" s={1} /><B c="pv-line w60" s={1} /><B c="pv-line w70" s={2} />
        </div>
        <div className="pv-feed">
          {[0, 1, 2].map((i) => (
            <B key={i} c="pv-post" s={2 + i}>
              <i className="pv-dot" /><span className="pv-line w60" /><span className="pv-tag">Edit</span>
            </B>
          ))}
          <B c="pv-toast-ok" s={6}>Saved ✓</B>
        </div>
      </div>
    </Browser>
  ),
  shop: () => (
    <Browser url="yourstore.com/shop">
      <div className="pv-shop-head">
        <B c="pv-line w40" s={0} />
        <B c="pv-cart" s={7}><HubIcon name="cart" size={14} /><b>2</b></B>
      </div>
      <div className="pv-products">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <B key={i} c={`pv-product h${i % 3}`} s={1 + i}>
            <span className="pv-price" />
          </B>
        ))}
      </div>
    </Browser>
  ),
  shopify: () => (
    <Browser url="yourstore.myshopify.com">
      <div className="pv-pdp">
        <B c="pv-pdp-img" s={0} />
        <div className="pv-pdp-info">
          <B c="pv-line w80 thick" s={1} />
          <B c="pv-line w40" s={2} />
          <B c="pv-swatches" s={3}><i /><i /><i /></B>
          <B c="pv-buy" s={4}>Add to cart</B>
          <B c="pv-toast-ok" s={6}>Added ✓</B>
        </div>
      </div>
    </Browser>
  ),
  app: () => (
    <div className="pv-phones">
      {['iOS', 'Android'].map((os, p) => (
        <div key={os} className={`pv-phone ${p ? 'is-back' : ''}`}>
          <span className="pv-notch" />
          <B c="pv-line w50 thick" s={p * 2} />
          <B c="pv-app-card" s={1 + p * 2} />
          <B c="pv-app-card alt" s={2 + p * 2} />
          <div className="pv-tabbar"><i /><i /><i /><i /></div>
          <span className="pv-os">{os}</span>
        </div>
      ))}
    </div>
  ),
  software: () => (
    <Browser url="app.yourcompany.io">
      <div className="pv-kanban">
        {['To do', 'Doing', 'Done'].map((col, c) => (
          <div key={col} className="pv-col">
            <B c="pv-col-title" s={c}>{col}</B>
            {[0, 1, 2].slice(0, 3 - c).map((i) => (
              <B key={i} c="pv-task" s={2 + c + i} />
            ))}
            {c === 2 && <B c="pv-task is-moving" s={6} />}
          </div>
        ))}
      </div>
    </Browser>
  ),
  ai: () => (
    <div className="pv-chat">
      <div className="pv-chat-head"><HubIcon name="bot" size={16} /> AI assistant · online</div>
      <B c="pv-msg me" s={0}>Where is my order #1042?</B>
      <B c="pv-msg bot" s={2}>Shipped today — arriving Friday. Tracking link sent to your email.</B>
      <B c="pv-msg me" s={4}>Great, thanks!</B>
      <B c="pv-flow" s={5}>
        <span>Read message</span><HubIcon name="arrow" size={12} />
        <span>Check order</span><HubIcon name="arrow" size={12} />
        <span>Reply</span>
      </B>
    </div>
  ),
  erp: () => (
    <Browser url="erp.yourcompany.io">
      <div className="pv-kpis">
        {['Stock', 'Orders', 'Invoices'].map((k, i) => (
          <B key={k} c="pv-kpi" s={i}><small>{k}</small><span className="pv-line w60 thick" /></B>
        ))}
      </div>
      <div className="pv-bars">
        {[40, 65, 50, 80, 60, 92, 75].map((h, i) => (
          <B key={i} c="pv-bar-col" s={3 + i * 0.4}><i style={{ height: `${h}%` }} /></B>
        ))}
      </div>
    </Browser>
  ),
  crm: () => (
    <Browser url="crm.yourcompany.io">
      <div className="pv-pipe">
        {['New lead', 'Qualified', 'Won'].map((col, c) => (
          <div key={col} className="pv-col">
            <B c="pv-col-title" s={c}>{col}</B>
            {[0, 1].slice(0, 2 - (c === 2 ? 1 : 0)).map((i) => (
              <B key={i} c="pv-deal" s={2 + c + i}><i className="pv-dot" /><span className="pv-line w60" /></B>
            ))}
          </div>
        ))}
        <span className="pv-deal pv-deal-fly"><i className="pv-dot" /><span className="pv-line w60" /></span>
      </div>
    </Browser>
  ),
  api: () => (
    <div className="pv-term">
      <div className="pv-bar"><i /><i /><i /><span className="pv-url">terminal</span></div>
      <code>
        <B c="pv-code" s={0}><em>$</em> curl api.yourapp.com/v1/orders</B>
        <B c="pv-code ok" s={2}>HTTP/1.1 200 OK · 38ms</B>
        <B c="pv-code" s={3}>{'{'}</B>
        <B c="pv-code ind" s={3.5}>"status": <u>"paid"</u>,</B>
        <B c="pv-code ind" s={4}>"items": <u>3</u>,</B>
        <B c="pv-code ind" s={4.5}>"region": <u>"auto-scaled"</u></B>
        <B c="pv-code" s={5}>{'}'}</B>
      </code>
    </div>
  )
};

export default function BuildLab() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const current = BUILD[active];
  const Preview = PREVIEWS[current.preview];

  useEffect(() => {
    if (!auto) return undefined;
    const t = setInterval(() => setActive((a) => (a + 1) % BUILD.length), 4200);
    return () => clearInterval(t);
  }, [auto]);

  const choose = (i) => {
    setAuto(false);
    setActive(i);
  };

  return (
    <section id="build" className="build">
      <div className="wrap">
        <Reveal className="path-intro path-intro--build">
          <span className="path-tag path-tag--build">Path 02 · IT Services</span>
          <h2>Pick a service. <span>Watch it build.</span></h2>
          <p>Websites, apps and software — designed, built and looked after by one engineering team.</p>
        </Reveal>

        <div className="blab">
          <ol className="blab-list" role="tablist" aria-label="IT services">
            {BUILD.map((s, i) => (
              <li key={s.name}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  className={`blab-item ${active === i ? 'is-active' : ''}`}
                  onClick={() => choose(i)}
                >
                  <span className="blab-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="blab-name">{s.name}</span>
                  <HubIcon name={s.icon} size={18} />
                  {active === i && auto && <span className="blab-progress" aria-hidden="true" />}
                </button>
              </li>
            ))}
          </ol>

          <div className="blab-stage" role="tabpanel">
            <div className="blab-stage-top">
              <span className="blab-live"><i /> Live preview</span>
              <span className="blab-spec">{String(active + 1).padStart(2, '0')} / {String(BUILD.length).padStart(2, '0')}</span>
            </div>
            <div className="blab-canvas" key={current.preview}>
              <Preview />
            </div>
            <div className="blab-caption" key={`cap-${current.name}`}>
              <div>
                <strong>{current.name}</strong>
                <p>{current.line}</p>
              </div>
              <Link to={current.to} className="blab-cta">
                Details <HubIcon name="arrow" size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
