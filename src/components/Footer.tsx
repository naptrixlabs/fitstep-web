import { Link } from 'react-router-dom';

import { Wordmark } from './Mark';
import { Icon } from './Icon';
import { CONTACT_EMAIL } from '../lib/config';
import { useGetApp } from '../hooks/useGetApp';

export function Footer() {
  const getApp = useGetApp();
  const year = 2026; // build-time constant; no runtime clock
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Wordmark size={30} idc="foot" />
          <p className="footer-tag">A calm, private companion for the way you move and eat.</p>
          <p className="footer-nodata">
            <Icon name="spark" size={16} /> Privacy-first · You control your data
          </p>
        </div>

        <nav className="footer-col" aria-label="Product">
          <h4>Product</h4>
          <Link to="/">Overview</Link>
          <Link to="/nutrition">Nutrition data</Link>
          <a href="#get" onClick={getApp}>Get the app</a>
        </nav>

        <nav className="footer-col" aria-label="Legal">
          <h4>Legal</h4>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/help">Help &amp; Support</Link>
        </nav>

        <nav className="footer-col" aria-label="Contact">
          <h4>Contact</h4>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </nav>
      </div>

      <div className="footer-base">
        <span>© {year} Vive. All rights reserved.</span>
        <span className="footer-made">Made with intention.</span>
      </div>
    </footer>
  );
}
