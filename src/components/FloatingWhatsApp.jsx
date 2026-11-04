import React from 'react';
import { STORE_INFO } from '../data/storeInfo';
import { MessageCircle, Sparkles } from 'lucide-react';

const FloatingWhatsApp = () => {
  const whatsappUrl = `https://wa.me/${STORE_INFO.whatsapp.replace('+', '')}?text=${encodeURIComponent(
    `Namaste Rajesh Jewellers (Mirzapur), I am browsing your showroom website and would like to inquire about 22K hallmark designs and live rates.`
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="royal-floating-whatsapp-btn"
      title={`Chat with Rajesh Jewellers Mirzapur on WhatsApp (${STORE_INFO.whatsappDisplay})`}
      aria-label="Chat on WhatsApp"
    >
      {/* Outer Pulse Beacon Wave */}
      <span className="wa-pulse-wave" />

      {/* Main Jewel Medallion */}
      <div className="wa-emerald-medallion">
        <MessageCircle size={26} className="wa-icon-svg" />
        <span className="wa-sparkle-badge" title="Live Showroom Support">
          <Sparkles size={9} />
        </span>
        <span className="wa-online-dot" />
      </div>

      {/* Hover-Only Micro Floating Tooltip (No permanent screen footprint) */}
      <span className="wa-hover-tooltip">
        Chat on WhatsApp
      </span>
    </a>
  );
};

export default FloatingWhatsApp;
