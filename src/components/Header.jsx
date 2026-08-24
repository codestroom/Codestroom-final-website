import { useEffect, useState, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import ServiceMegaMenu from './ServiceMegaMenu';

const NAV_LINKS = [
  { to: '/services', label: 'Services', hasDropdown: true },
  { to: '/about', label: 'About Us' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mega menu on route change
  useEffect(() => {
    setMegaMenuOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  const closeMenu = () => {
    setMenuOpen(false);
    setMegaMenuOpen(false);
  };

  const isServicesActive = location.pathname.startsWith('/services');

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <nav className="wrap">
        <Link to="/" className="brand" onClick={closeMenu}>
          <img className="mark" src="/assets/logo-icon.webp" alt="Codestroom logo" width="34" height="34" />
          Codestroom
        </Link>

        <ul className={`nav-links ${menuOpen ? 'mobile-open' : ''}`}>
          {NAV_LINKS.map((link) => {
            if (link.hasDropdown) {
              return (
                <li
                  key={link.to}
                  className="nav-item-dropdown"
                  ref={dropdownRef}
                  onMouseEnter={() => setMegaMenuOpen(true)}
                  onMouseLeave={() => setMegaMenuOpen(false)}
                >
                  <NavLink
                    to={link.to}
                    className={isServicesActive ? 'active' : undefined}
                    onClick={() => {
                      setMegaMenuOpen(false);
                      closeMenu();
                    }}
                  >
                    <span>{link.label}</span>
                    <span className="dropdown-caret">▾</span>
                  </NavLink>
                  {megaMenuOpen && <ServiceMegaMenu onClose={() => setMegaMenuOpen(false)} />}
                </li>
              );
            }

            return (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            );
          })}
          <li className="nav-links-cta">
            <Link to="/contact" className="btn btn-gradient" onClick={closeMenu}>
              Get a Free Quote →
            </Link>
          </li>
        </ul>

        <Link to="/contact" className="btn btn-gradient nav-cta">
          Get a Free Quote
        </Link>

        <button
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span></span>
        </button>
      </nav>
    </header>
  );
}
