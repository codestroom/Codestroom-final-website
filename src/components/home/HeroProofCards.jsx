import { Link } from 'react-router-dom';
import HubIcon from '../services/hub/HubIcon';
import { CASE_STUDIES } from '../../data/caseStudies';

// Instagram-style count: 9,430 · 21K
const fmt = (n) => (n >= 10000 ? `${Math.round(n / 100) / 10}K`.replace('.0K', 'K') : n.toLocaleString('en-US'));
const bySlug = (slug) => CASE_STUDIES.find((c) => c.slug === slug);

function buildCards() {
  const sukh = bySlug('sukhdarshan-muni-ji');
  const sanjha = bySlug('sanjha-ghar');
  const pannu = bySlug('pannu-vaid');
  return [
    sanjha && {
      key: 'sanjha',
      pos: 'tl',
      icon: 'instagram',
      title: `${sanjha.name} · ${fmt((sanjha.now || sanjha.after).followers)} followers`,
      sub: 'See their results',
      avatar: sanjha.avatar,
      to: `/portfolio#${sanjha.slug}`,
    },
    {
      key: 'lead',
      pos: 'tr',
      icon: 'magnet',
      title: 'New lead from Instagram',
      sub: 'How we bring in enquiries',
      to: '/services/digital-marketing',
    },
    sukh?.before && {
      key: 'sukh',
      pos: 'r',
      icon: 'growth',
      title: `+${(sukh.after.followers - sukh.before.followers).toLocaleString('en-US')} followers in ${sukh.period}`,
      sub: 'See the case study',
      avatar: sukh.avatar,
      to: `/portfolio#${sukh.slug}`,
    },
    pannu && {
      key: 'pannu',
      pos: 'bl',
      icon: 'instagram',
      title: `${pannu.name} · ${fmt((pannu.now || pannu.after).followers)} followers`,
      sub: 'See their results',
      avatar: pannu.avatar,
      to: `/portfolio#${pannu.slug}`,
    },
  ].filter(Boolean);
}

const CARDS = buildCards();

export default function HeroProofCards() {
  return (
    <div className="proof-cards">
      {CARDS.map((card, i) => (
        <Link
          key={card.key}
          to={card.to}
          className={`proof-card proof-card--${card.pos}`}
          style={{ '--i': i }}
          aria-label={`${card.title} — ${card.sub}`}
        >
          <span className="proof-card-float">
            <span className="proof-card-media">
              <span className="proof-card-icon"><HubIcon name={card.icon} size={16} /></span>
              {card.avatar && <img className="proof-card-photo" src={card.avatar} alt="" width="40" height="40" loading="lazy" />}
            </span>
            <span className="proof-card-text">
              <strong>{card.title}</strong>
              <small>{card.sub} →</small>
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
