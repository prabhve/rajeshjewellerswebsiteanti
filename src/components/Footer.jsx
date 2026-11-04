import React from 'react';
import { useJewellery } from '../context/JewelleryContext';
import { STORE_INFO } from '../data/storeInfo';
import { ShieldCheck, Phone, MapPin, Lock, ExternalLink } from 'lucide-react';

const Footer = () => {
  const { setIsDealerModalOpen, setActiveCategory } = useJewellery();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col">
            <div className="brand-wrap" style={{ marginBottom: '1.25rem' }}>
              <div className="brand-emblem">
                <img
                  src="/assets/images/store/rajesh_jewellers_emblem_gold_circle.png"
                  alt="Rajesh Jewellers Official Logo - 3D Diamond RJ Emblem & BIS Hallmark"
                  className="brand-logo-img"
                />
              </div>
              <div className="brand-title-box">
                <span className="brand-name">{STORE_INFO.name}</span>
                <span className="brand-sub">SANGMOHAL • STATION RD • MIRZAPUR</span>
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.65', marginBottom: '1.25rem' }}>
              {STORE_INFO.officialMerchantBio}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'var(--brand-plum)', fontSize: '0.82rem', fontWeight: 700 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={16} style={{ color: 'var(--gold-primary)' }} />
                <span>100% BIS 916 Hallmark (Govt. Laser HUID)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                <span>GSTIN: <strong>{STORE_INFO.gstin}</strong></span>
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
                  href={STORE_INFO.whatsappCatalogUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp Catalog ({STORE_INFO.whatsappDisplay})
                </a>
              </li>
              <li>
                <a
                  href={STORE_INFO.googleMapsUrl}
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
                <span>{STORE_INFO.fullAddress}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Phone size={16} style={{ color: 'var(--brand-plum)', flexShrink: 0 }} />
                <div>
                  <a href={`tel:${STORE_INFO.phonePrimary}`} style={{ color: 'inherit', display: 'block' }}>
                    {STORE_INFO.phonePrimaryDisplay}
                  </a>
                  <a href={`tel:${STORE_INFO.phoneSecondary}`} style={{ color: 'inherit', display: 'block' }}>
                    {STORE_INFO.phoneSecondaryDisplay}
                  </a>
                </div>
              </div>
              <div style={{ color: 'var(--text-dim)', fontSize: '0.78rem', lineHeight: '1.5' }}>
                Visiting Hours: {STORE_INFO.hours.regular}<br />
                Sunday: {STORE_INFO.hours.sunday}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Discreet Dealer Access */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} {STORE_INFO.name} ({STORE_INFO.hindiName}). GSTIN: {STORE_INFO.gstin}. Sangmohal, Mirzapur. All Rights Reserved.
          </div>

          {/* Discreet Dealer Portal Trigger in Footer */}
          <button
            type="button"
            className="footer-dealer-btn"
            onClick={() => setIsDealerModalOpen(true)}
            title="Showroom Staff & Dealer Inventory Portal"
          >
            <Lock size={13} />
            <span>Dealer & Rate Management</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
