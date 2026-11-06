import React from 'react';

/**
 * BrandWordmark — Official Rajesh Jewellers Luxury Typographic Identity
 *
 * Implements an authentic high-contrast luxury serif lockup (Bodoni Moda & Cormorant Garamond)
 * with a distinct, unmistakable capital 'J' featuring a graceful serif head and elegant curved hook,
 * paired with the 3D circular RJ gold emblem.
 *
 * Variants:
 * - 'header'  : Compact horizontal lockup for the sticky desktop & tablet header.
 * - 'footer'  : Grand horizontal lockup with heritage tagline for the showroom footer.
 * - 'mobile'  : Proportional compact lockup for mobile viewports.
 * - 'monogram': Standalone 3D gold RJ circular medallion.
 */
const BrandWordmark = ({ variant = 'header', showHindi = false, className = '' }) => {
  const emblemSrc = '/assets/images/store/rajesh_jewellers_emblem_gold_circle.png';

  if (variant === 'monogram') {
    return (
      <div className={`brand-emblem ${className}`} title="Rajesh Jewellers RJ Monogram">
        <img
          src={emblemSrc}
          alt="RJ Monogram - Rajesh Jewellers"
          className="brand-logo-img"
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  const isFooter = variant === 'footer';
  const isMobile = variant === 'mobile';

  return (
    <div className={`brand-identity-lockup brand-variant-${variant} ${className}`}>
      {/* 3D Gold RJ Circular Emblem */}
      <div className="brand-emblem" aria-hidden="true">
        <img
          src={emblemSrc}
          alt="Rajesh Jewellers Emblem"
          className="brand-logo-img"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Luxury Wordmark & Location Subtitle */}
      <div className="brand-title-box">
        <div className="brand-wordmark-row">
          <span className="brand-word-rajesh">RAJESH</span>
          <span className="brand-word-space"> </span>
          <span className="brand-word-jewellers">JEWELLERS</span>
        </div>

        {showHindi && (
          <span className="brand-hindi-moniker">राजेश ज्वेलर्स (सराफ़)</span>
        )}

        <span className="brand-sub">
          {isFooter
            ? 'SANGMOHAL • STATION RD • MIRZAPUR'
            : isMobile
            ? 'SANGMOHAL · MIRZAPUR'
            : 'SANGMOHAL • MIRZAPUR'}
        </span>
      </div>
    </div>
  );
};

export default React.memo(BrandWordmark);
