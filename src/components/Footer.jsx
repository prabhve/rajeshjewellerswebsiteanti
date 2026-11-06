import React from 'react';
import { useJewellery } from '../context/JewelleryContext';
import { STORE_INFO } from '../data/storeInfo';
import { ShieldCheck, Phone, MapPin, Lock } from 'lucide-react';
import BrandWordmark from './BrandWordmark';

const Footer = () => {
  const { setIsDealerModalOpen, setActiveCategory, storeInfo } = useJewellery();
  const info = storeInfo || STORE_INFO;

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col">
            <div style={{ marginBottom: '1.25rem' }}>
              <BrandWordmark variant="footer" showHindi={true} />
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.65', marginBottom: '1.25rem' }}>
              {info.officialMerchantBio}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'var(--brand-plum)', fontSize: '0.82rem', fontWeight: 700 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={16} style={{ color: 'var(--gold-primary)' }} />
                <span>100% BIS 916 Hallmark (Govt. Laser HUID)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                <span>GSTIN: <strong>{info.gstin}</strong></span>
              </div>
            </div>
          </div>

          {/* Collections Links */}
          <div className="footer-col">
            <h4>Royal Collections</h4>
            <ul className="footer-links">
              <li><a href="#catalog-section" onClick={() => setActiveCategory('bridal')}>Royal Bridal Polki</a></li>
              <li><a href="#catalog-section" onClick={() => setActiveCategory('gold')}>22K Filigree Chokers</a></li>
              <li><a href="#catalog-section" onClick={() => setActiveCategory('bangles')}>Temple Kadas & Bangles</a></li>
              <li><a href="#catalog-section" onClick={() => setActiveCategory('diamond')}>Certified Solitaires</a></li>
              <li><a href="#catalog-section" onClick={() => setActiveCategory('mens')}>Men's Heavy Kadas</a></li>
              <li><a href="#catalog-section" onClick={() => setActiveCategory('coins')}>24K 999 Lakshmi Coins</a></li>
            </ul>
          </div>

          {/* Schemes & Services */}
          <div className="footer-col">
            <h4>Customer Care</h4>
            <ul className="footer-links">
              <li><a href="#calculator">Live Price Estimator</a></li>
              <li><a href="#scheme">Swarna Nidhi 11+1 Scheme</a></li>
              <li><a href="#showroom">Showroom Driving Map</a></li>
              <li><a href="#trust">Karatmeter Purity Guarantee</a></li>
              <li>
                <a
                  href={info.whatsappCatalogUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp Catalog ({info.whatsappDisplay})
                </a>
              </li>
              <li>
                <a
                  href={info.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Google Maps Location
                </a>
              </li>
            </ul>
          </div>

          {/* Showroom Contact */}
          <div className="footer-col">
            <h4>Showroom Visit</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <MapPin size={16} style={{ color: 'var(--brand-plum)', flexShrink: 0 }} />
                <span>{info.fullAddress}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Phone size={16} style={{ color: 'var(--brand-plum)', flexShrink: 0 }} />
                <div>
                  <a href={`tel:${info.phonePrimary}`} style={{ color: 'inherit', display: 'block' }}>
                    {info.phonePrimaryDisplay}
                  </a>
                  <a href={`tel:${info.phoneSecondary}`} style={{ color: 'inherit', display: 'block' }}>
                    {info.phoneSecondaryDisplay}
                  </a>
                </div>
              </div>
              <div style={{ color: 'var(--text-dim)', fontSize: '0.78rem', lineHeight: '1.5' }}>
                Visiting Hours: {info.hours?.regular || STORE_INFO.hours.regular}<br />
                Sunday: {info.hours?.sunday || STORE_INFO.hours.sunday}
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Policy Navigation Row */}
        <div style={{ borderTop: '1px solid rgba(198, 161, 91, 0.18)', borderBottom: '1px solid rgba(198, 161, 91, 0.18)', padding: '0.85rem 0', margin: '2rem 0 1.25rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem 1.5rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
          <a href="#trust" style={{ color: 'inherit', textDecoration: 'none' }} className="hover:text-amber-400">Privacy Policy</a>
          <span style={{ opacity: 0.3 }}>•</span>
          <a href="#scheme" style={{ color: 'inherit', textDecoration: 'none' }} className="hover:text-amber-400">Terms &amp; Conditions</a>
          <span style={{ opacity: 0.3 }}>•</span>
          <a href="#catalog-section" style={{ color: 'inherit', textDecoration: 'none' }} className="hover:text-amber-400">Shipping Policy</a>
          <span style={{ opacity: 0.3 }}>•</span>
          <a href="#trust" style={{ color: 'inherit', textDecoration: 'none' }} className="hover:text-amber-400">Returns &amp; Exchange</a>
          <span style={{ opacity: 0.3 }}>•</span>
          <a href="#trust" style={{ color: 'inherit', textDecoration: 'none' }} className="hover:text-amber-400">Cancellation Policy</a>
          <span style={{ opacity: 0.3 }}>•</span>
          <a href="#calculator" style={{ color: 'inherit', textDecoration: 'none' }} className="hover:text-amber-400">Jewellery Pricing Disclaimer</a>
          <span style={{ opacity: 0.3 }}>•</span>
          <a href="#showroom" style={{ color: 'inherit', textDecoration: 'none' }} className="hover:text-amber-400">Contact Us</a>
        </div>

        {/* Bottom Bar with Discreet Admin Passcode Access */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} {info.name} ({info.hindiName}). GSTIN: {info.gstin}. Sangmohal, Mirzapur. All Rights Reserved.
          </div>

          {/* Showroom Master Admin Trigger with Passcode Access */}
          <button
            type="button"
            className="footer-dealer-btn"
            onClick={() => setIsDealerModalOpen(true)}
            title="Showroom Master Admin & CMS Portal (Passcode: 1994)"
          >
            <Lock size={13} />
            <span>Showroom Admin &amp; CMS (Passcode)</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
