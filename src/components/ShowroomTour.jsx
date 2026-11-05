import React, { useState } from 'react';
import { useJewellery } from '../context/JewelleryContext';
import { STORE_INFO } from '../data/storeInfo';
import {
  MapPin,
  Clock,
  Phone,
  ShieldCheck,
  Star,
  ExternalLink,
  Camera,
  Video,
  Navigation,
  CheckCircle2,
  Sparkles,
  Play,
  Volume2,
  Copy,
  Check,
  Maximize2,
  X,
  Coffee,
  Car,
  Award,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Compass
} from 'lucide-react';

const ShowroomTour = () => {
  const { setIsVipModalOpen, addToast } = useJewellery();
  const [activeTab, setActiveTab] = useState('photos'); // 'photos' | 'video'
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const photos = STORE_INFO.photos;
  const activePhoto = photos[selectedPhotoIndex] || photos[0];

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const handleCopyText = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    addToast(`Copied ${fieldName} to clipboard!`, 'success');
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <section className="showroom-tour-section" id="showroom">
      <div className="container">
        {/* Imperial Section Header */}
        <div className="showroom-grand-header">
          <div className="showroom-kicker-crest">
            <span className="crest-line" />
            <span className="crest-badge">
              <Sparkles size={13} className="text-gold" />
              SANGMOHAL, MIRZAPUR • ESTABLISHED FAMILY HERITAGE
              <Sparkles size={13} className="text-gold" />
            </span>
            <span className="crest-line" />
          </div>

          <h2 className="showroom-grand-title">
            {STORE_INFO.hindiName}
            <span className="showroom-title-sub">Rajesh Jewellers Flagship Showroom</span>
          </h2>

          <p className="showroom-proprietor-subtitle">
            Proprietor: <strong>{STORE_INFO.proprietor}</strong> • Landmark Showroom Near Jila Karagar
          </p>

          <p className="showroom-official-bio">
            "{STORE_INFO.officialMerchantBio}"
          </p>

          {/* 4 Pillars Trust Seals Bar */}
          <div className="showroom-trust-bar">
            <div className="trust-seal-item">
              <ShieldCheck size={18} className="text-gold" />
              <div>
                <strong>100% BIS 916 Hallmark</strong>
                <span>Govt. 6-Digit Laser HUID</span>
              </div>
            </div>

            <div className="trust-seal-item">
              <Award size={18} className="text-gold" />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <strong>GSTIN: {STORE_INFO.gstin}</strong>
                  <button
                    type="button"
                    onClick={() => handleCopyText(STORE_INFO.gstin, 'GSTIN')}
                    className="trust-copy-btn"
                    title="Copy GSTIN"
                  >
                    {copiedField === 'GSTIN' ? <Check size={12} color="#10B981" /> : <Copy size={12} />}
                  </button>
                </div>
                <span>Govt. Registered Enterprise</span>
              </div>
            </div>

            <div className="trust-seal-item">
              <Star size={18} fill="#F59E0B" color="#F59E0B" />
              <div>
                <strong>{STORE_INFO.googleRating}★ Google Verified</strong>
                <span>{STORE_INFO.googleReviewCount} Genuine Local Reviews</span>
              </div>
            </div>

            <div className="trust-seal-item">
              <CheckCircle2 size={18} className="text-gold" />
              <div>
                <strong>Free Karatmeter Testing</strong>
                <span>Instant In-Store Purity Check</span>
              </div>
            </div>
          </div>
        </div>

        {/* Unified, Symmetrical Twin Pavilion (Exact Equal Height & Alignment) */}
        <div className="showroom-twin-pavilion">
          {/* LEFT WING: Architectural Showcase & Interactive Gallery */}
          <div className="pavilion-wing pavilion-wing-left">
            {/* Unified Top Header Bar */}
            <div className="wing-header-bar">
              <div className="wing-tabs-segmented">
                <button
                  type="button"
                  className={`wing-segment-btn ${activeTab === 'photos' ? 'active' : ''}`}
                  onClick={() => setActiveTab('photos')}
                >
                  <Camera size={14} />
                  <span>Showroom Gallery ({photos.length})</span>
                </button>
                <button
                  type="button"
                  className={`wing-segment-btn ${activeTab === 'video' ? 'active' : ''}`}
                  onClick={() => setActiveTab('video')}
                >
                  <Video size={14} />
                  <span>4K Video Reel</span>
                </button>
              </div>

              {activeTab === 'photos' && (
                <div className="wing-gallery-counter">
                  <span className="counter-curr">{String(selectedPhotoIndex + 1).padStart(2, '0')}</span>
                  <span className="counter-sep">/</span>
                  <span className="counter-tot">{String(photos.length).padStart(2, '0')}</span>
                </div>
              )}
            </div>

            {/* Gallery Viewport / Video Area */}
            <div className="wing-gallery-body">
              {activeTab === 'photos' ? (
                <div
                  className="gallery-display-stage"
                  onClick={() => setIsLightboxOpen(true)}
                  title="Click to view full photo in lightbox"
                >
                  <img
                    src={activePhoto.image}
                    alt={activePhoto.title}
                    key={activePhoto.id}
                    className="gallery-stage-image"
                    style={{ objectPosition: activePhoto.objectPosition || 'center center' }}
                  />

                  {/* Top Badge & Zoom */}
                  <div className="stage-hud-top">
                    <span className="stage-badge-tag">
                      <Sparkles size={11} />
                      {activePhoto.badge}
                    </span>
                    <button
                      type="button"
                      className="stage-zoom-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsLightboxOpen(true);
                      }}
                      title="Fullscreen Zoom"
                    >
                      <Maximize2 size={13} />
                    </button>
                  </div>

                  {/* Slider Arrows */}
                  <button
                    type="button"
                    className="stage-arrow-btn prev"
                    onClick={handlePrevPhoto}
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    className="stage-arrow-btn next"
                    onClick={handleNextPhoto}
                    aria-label="Next Slide"
                  >
                    <ChevronRight size={18} />
                  </button>

                  {/* Stage Caption Bottom Bar */}
                  <div className="stage-caption-strip">
                    <div className="stage-caption-content">
                      <span className="stage-caption-sub">{activePhoto.subtitle}</span>
                      <h4 className="stage-caption-title">{activePhoto.title}</h4>
                      <p className="stage-caption-desc">{activePhoto.desc}</p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Video Showcase Player */
                <div className="gallery-video-stage">
                  <img
                    src="/assets/images/store/store_showcase_video_thumb.jpg"
                    alt="Showroom Video Reel"
                    className="video-stage-bg"
                  />
                  <div className="video-stage-overlay">
                    {!isVideoPlaying ? (
                      <button
                        type="button"
                        className="video-stage-play"
                        onClick={() => setIsVideoPlaying(true)}
                        aria-label="Play Video Reel"
                      >
                        <Play size={26} fill="#080103" color="#080103" style={{ marginLeft: '3px' }} />
                      </button>
                    ) : (
                      <div className="video-playing-tag">
                        <div className="audio-wave-bars">
                          <span /><span /><span /><span />
                        </div>
                        <span>4K Live Reel Playing</span>
                      </div>
                    )}
                    <div className="video-bottom-info">
                      <span className="video-hd-pill">
                        <Volume2 size={12} />
                        HD 1080p Showroom Showcase
                      </span>
                      <h5>Pure 22K Hallmarked Gold Bell Earrings (झुमका व लटकन)</h5>
                      <p>Showroom recording showcasing fine filigree craftsmanship and hallmark stamp at Sangmohal.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Photo Thumbnails Strip */}
            {activeTab === 'photos' && (
              <div className="gallery-thumbnails-strip">
                {photos.map((photo, idx) => {
                  const shortLabels = [
                    'Storefront',
                    'Gaddi Lounge',
                    'Bridal Haar',
                    'Gold Jhumki',
                    'Street View'
                  ];
                  return (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => setSelectedPhotoIndex(idx)}
                      className={`gallery-thumb-chip ${selectedPhotoIndex === idx ? 'active' : ''}`}
                      title={`${photo.title} (${photo.badge})`}
                    >
                      <img src={photo.image} alt={photo.title} />
                      <span className="thumb-chip-label">{shortLabels[idx] || `View 0${idx + 1}`}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 4 Amenities Strip Docked Cleanly at Bottom */}
            <div className="gallery-amenities-dock">
              <div className="amenity-cell">
                <Coffee size={15} className="amenity-cell-icon" />
                <div>
                  <strong>Royal Gaddi Seating</strong>
                  <span>Air-conditioned lounge</span>
                </div>
              </div>
              <div className="amenity-cell">
                <Award size={15} className="amenity-cell-icon" />
                <div>
                  <strong>Karatmeter Lab</strong>
                  <span>Free purity testing</span>
                </div>
              </div>
              <div className="amenity-cell">
                <Car size={15} className="amenity-cell-icon" />
                <div>
                  <strong>Showroom Parking</strong>
                  <span>Station Rd access</span>
                </div>
              </div>
              <div className="amenity-cell">
                <ShieldCheck size={15} className="amenity-cell-icon" />
                <div>
                  <strong>Armoured Security</strong>
                  <span>Insured & safe billing</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT WING: Imperial Visitor Concierge & Hospitality Salon */}
          <div className="pavilion-wing pavilion-wing-right">
            {/* Unified Top Header Bar */}
            <div className="wing-header-bar">
              <div className="wing-brand-badge">
                <span className="wing-crest-ico">
                  <Compass size={15} />
                </span>
                <div>
                  <span className="wing-pre-tag">VISITOR CONCIERGE & SALON</span>
                  <h3 className="wing-salon-name">Sangmohal Flagship Showroom</h3>
                </div>
              </div>

              <div className="wing-status-indicator">
                <span className="pulse-emerald-dot" />
                <span>Open Today</span>
              </div>
            </div>

            {/* Main Concierge Body */}
            <div className="concierge-content-flow">
              {/* Showroom Address & Landmark Block */}
              <div className="concierge-flow-row address-row">
                <div className="concierge-address-card">
                  <div className="flow-row-header">
                    <div className="flow-title-with-icon">
                      <MapPin size={15} className="text-gold" />
                      <span>Showroom Address & Landmark</span>
                    </div>
                    <button
                      type="button"
                      className="flow-copy-action"
                      onClick={() => handleCopyText(STORE_INFO.fullAddress, 'Address')}
                      title="Copy Showroom Address"
                    >
                      {copiedField === 'Address' ? <Check size={12} color="#10B981" /> : <Copy size={12} />}
                      <span>{copiedField === 'Address' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="flow-address-text">
                    {STORE_INFO.fullAddress}
                  </p>
                  <div className="flow-landmark-stripe">
                    <span className="landmark-tag-badge">Landmark:</span>
                    <span>Opposite / Near Jila Karagar (District Jail), Station Road, Sangmohal, Mirzapur (231001)</span>
                  </div>
                </div>
              </div>

              {/* Showroom Visiting Timings */}
              <div className="concierge-flow-row timings-row">
                <div className="flow-row-header">
                  <div className="flow-title-with-icon">
                    <Clock size={15} className="text-gold" />
                    <span>Showroom Visiting Hours (खुलने का समय)</span>
                  </div>
                </div>
                <div className="flow-timings-grid">
                  <div className="timing-tile">
                    <span className="tile-days">Mon – Sat (Regular)</span>
                    <strong className="tile-hours">10:00 AM – 8:00 PM</strong>
                  </div>
                  <div className="timing-tile sunday">
                    <span className="tile-days">Sunday Special</span>
                    <strong className="tile-hours">10:30 AM – 4:30 PM</strong>
                  </div>
                </div>
              </div>

              {/* Communication: WhatsApp Video + Direct Call Lines */}
              <div className="concierge-flow-row contact-row">
                <div className="flow-row-header">
                  <div className="flow-title-with-icon">
                    <Phone size={15} className="text-gold" />
                    <span>Direct Showroom Desk & WhatsApp</span>
                  </div>
                </div>

                {/* WhatsApp Video Showcase Banner */}
                <a
                  href={STORE_INFO.whatsappCatalogUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="concierge-wa-banner"
                >
                  <div className="wa-bubble-circle">
                    <MessageCircle size={20} />
                  </div>
                  <div className="wa-banner-details">
                    <div className="wa-banner-top">
                      <span className="wa-banner-kicker">WhatsApp Video Shopping</span>
                      <span className="wa-banner-action">Chat Now ➔</span>
                    </div>
                    <strong className="wa-banner-phone">{STORE_INFO.whatsappDisplay}</strong>
                    <span className="wa-banner-sub">1-on-1 video call to inspect hallmarked designs live from home</span>
                  </div>
                </a>

                {/* Direct Calling Line Tiles */}
                <div className="calling-tiles-row">
                  <a href={`tel:${STORE_INFO.phonePrimary}`} className="calling-tile-link">
                    <span className="tile-dept">Main Counter</span>
                    <strong className="tile-num">📞 {STORE_INFO.phonePrimaryDisplay}</strong>
                  </a>
                  <a href={`tel:${STORE_INFO.phoneSecondary}`} className="calling-tile-link">
                    <span className="tile-dept">Store Manager</span>
                    <strong className="tile-num">📞 {STORE_INFO.phoneSecondaryDisplay}</strong>
                  </a>
                  {STORE_INFO.phoneTertiary && (
                    <a href={`tel:${STORE_INFO.phoneTertiary}`} className="calling-tile-link">
                      <span className="tile-dept">Inquiries Desk</span>
                      <strong className="tile-num">📞 {STORE_INFO.phoneTertiaryDisplay}</strong>
                    </a>
                  )}
                </div>
              </div>

              {/* Action Buttons: Dual Primary CTAs & Sublinks */}
              <div className="concierge-flow-row actions-row">
                <div className="concierge-ctas-grid">
                  <a
                    href={STORE_INFO.googleDirectionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-salon-directions"
                    title="Get Turn-by-Turn GPS Directions to Showroom"
                  >
                    <Navigation size={15} />
                    <span>Start GPS Navigation</span>
                    <ExternalLink size={12} />
                  </a>

                  <button
                    type="button"
                    className="btn-salon-vip"
                    onClick={() => setIsVipModalOpen(true)}
                    title="Book Private VIP Gaddi Consultation"
                  >
                    <Sparkles size={15} />
                    <span>Book VIP Visit</span>
                  </button>
                </div>

                <div className="concierge-sublinks-bar">
                  <a
                    href={STORE_INFO.googleReviewsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="sublink-anchor"
                  >
                    <Star size={12} fill="#E5C378" color="#E5C378" />
                    <span>Write Google Review</span>
                  </a>
                  <span className="sublink-dot">•</span>
                  <a
                    href={STORE_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="sublink-anchor"
                  >
                    <MapPin size={12} />
                    <span>Open in Google Maps</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Showroom Satellite & GPS Map */}
        <div className="showroom-map-console">
          <div className="map-console-header">
            <div className="console-title">
              <MapPin size={15} className="text-gold" />
              <span>Live Showroom Satellite & Street Map — Sangmohal, Mirzapur (231001)</span>
            </div>
            <a
              href={STORE_INFO.googleDirectionsUrl}
              target="_blank"
              rel="noreferrer"
              className="console-directions-btn"
            >
              <Navigation size={13} />
              <span>Start Turn-by-Turn GPS ➔</span>
            </a>
          </div>
          <iframe
            src={STORE_INFO.googleEmbedMapUrl}
            width="100%"
            height="320"
            style={{ border: 0, display: 'block' }}
            allowFullScreen=""
            loading="lazy"
            title="Rajesh Jewellers Sangmohal Mirzapur Google Maps Location"
          />
        </div>
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      {isLightboxOpen && (
        <div className="showroom-lightbox-overlay" onClick={() => setIsLightboxOpen(false)}>
          <div className="showroom-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>
            <img src={activePhoto.image} alt={activePhoto.title} className="lightbox-img" />
            <div className="lightbox-caption">
              <span className="lightbox-badge">{activePhoto.badge}</span>
              <h3>{activePhoto.title}</h3>
              <p>{activePhoto.desc}</p>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                <a
                  href={STORE_INFO.googleDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-salon-directions"
                  style={{ padding: '0.6rem 1.15rem', fontSize: '0.85rem' }}
                >
                  <Navigation size={14} />
                  <span>Visit Showroom in Sangmohal</span>
                </a>
                <button
                  type="button"
                  className="btn-salon-vip"
                  onClick={() => {
                    setIsLightboxOpen(false);
                    setIsVipModalOpen(true);
                  }}
                  style={{ padding: '0.6rem 1.15rem', fontSize: '0.85rem' }}
                >
                  <Sparkles size={14} />
                  <span>Book VIP Lounge Visit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ShowroomTour;