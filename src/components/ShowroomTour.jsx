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
              <ShieldCheck size={16} className="text-gold" />
              <div>
                <strong>100% BIS 916 Hallmark</strong>
                <span>Govt. 6-Digit Laser HUID</span>
              </div>
            </div>

            <div className="trust-seal-item">
              <Award size={16} className="text-gold" />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
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
              <Star size={16} fill="#F59E0B" color="#F59E0B" />
              <div>
                <strong>{STORE_INFO.googleRating}★ Google Verified</strong>
                <span>{STORE_INFO.googleReviewCount} Genuine Local Reviews</span>
              </div>
            </div>

            <div className="trust-seal-item">
              <CheckCircle2 size={16} className="text-gold" />
              <div>
                <strong>Free Karatmeter Testing</strong>
                <span>Instant In-Store Purity Check</span>
              </div>
            </div>
          </div>
        </div>

        {/* Unified Imperial Showroom Pavilion */}
        <div className="showroom-pavilion-container">
          {/* LEFT: Cinematic Gallery & Walkthrough Experience */}
          <div className="showroom-pavilion-gallery">
            {/* Gallery Media Switcher Tabs */}
            <div className="gallery-tabs-row">
              <button
                type="button"
                className={`gallery-nav-tab ${activeTab === 'photos' ? 'active' : ''}`}
                onClick={() => setActiveTab('photos')}
              >
                <Camera size={15} />
                <span>Showroom Gallery ({photos.length} Views)</span>
              </button>
              <button
                type="button"
                className={`gallery-nav-tab ${activeTab === 'video' ? 'active' : ''}`}
                onClick={() => setActiveTab('video')}
              >
                <Video size={15} />
                <span>Showroom Showcase Video Reel</span>
              </button>
            </div>

            {activeTab === 'photos' ? (
              <div className="gallery-viewport-card">
                {/* Main Large Viewport */}
                <div
                  className="gallery-main-viewport"
                  onClick={() => setIsLightboxOpen(true)}
                  title="Click to view fullscreen photo"
                >
                  <img
                    src={activePhoto.image}
                    alt={activePhoto.title}
                    key={activePhoto.id}
                    className="gallery-display-img"
                    style={{ objectPosition: activePhoto.objectPosition || 'center center' }}
                  />

                  {/* Top Bar HUD */}
                  <div className="gallery-hud-top">
                    <span className="gallery-badge-chip">
                      <Sparkles size={12} />
                      {activePhoto.badge}
                    </span>
                    <div className="gallery-hud-actions">
                      <span className="gallery-counter">
                        {String(selectedPhotoIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
                      </span>
                      <button
                        type="button"
                        className="gallery-zoom-action"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsLightboxOpen(true);
                        }}
                        title="Fullscreen Lightbox"
                      >
                        <Maximize2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Left / Right Arrow Controls */}
                  <button
                    type="button"
                    className="gallery-slider-arrow prev"
                    onClick={handlePrevPhoto}
                    aria-label="Previous Photo"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    className="gallery-slider-arrow next"
                    onClick={handleNextPhoto}
                    aria-label="Next Photo"
                  >
                    <ChevronRight size={20} />
                  </button>

                  {/* Bottom Caption Overlay */}
                  <div className="gallery-hud-bottom">
                    <span className="gallery-photo-subtitle">{activePhoto.subtitle}</span>
                    <h3 className="gallery-photo-title">{activePhoto.title}</h3>
                    <p className="gallery-photo-desc">{activePhoto.desc}</p>
                  </div>
                </div>

                {/* Thumbnails Strip */}
                <div className="gallery-thumbs-rail">
                  {photos.map((photo, idx) => (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => setSelectedPhotoIndex(idx)}
                      className={`gallery-thumb-item ${selectedPhotoIndex === idx ? 'active' : ''}`}
                      title={photo.title}
                    >
                      <img src={photo.image} alt={photo.title} />
                      <div className="thumb-info-bar">
                        <span className="thumb-num">0{idx + 1}</span>
                        <span className="thumb-tag">{photo.badge.split(' ')[0]}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Video Showcase Reel Player */
              <div className="gallery-video-card">
                <img
                  src="/assets/images/store/store_showcase_video_thumb.jpg"
                  alt="Showroom Jewellery Showcase Video Reel"
                  className="gallery-video-bg"
                />
                <div className="gallery-video-glass">
                  {!isVideoPlaying ? (
                    <button
                      type="button"
                      className="grand-play-btn"
                      onClick={() => setIsVideoPlaying(true)}
                      aria-label="Play Showroom Showcase Reel"
                    >
                      <Play size={28} fill="#080103" color="#080103" style={{ marginLeft: '4px' }} />
                    </button>
                  ) : (
                    <div className="video-live-indicator">
                      <div className="audio-wave-bars">
                        <span /><span /><span /><span />
                      </div>
                      <span>Showroom 4K Live Reel Playing</span>
                    </div>
                  )}

                  <div className="video-caption-block">
                    <span className="video-badge-pill">
                      <Volume2 size={13} />
                      HD 1080p Showroom Showcase
                    </span>
                    <h4>Pure 22K Hallmarked Gold Bell Earrings (झुमका व लटकन)</h4>
                    <p>Live showroom recording showcasing intricate filigree craftsmanship, mirror polish, and hallmark verification at Sangmohal showroom.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Showroom Amenities Feature Bar */}
            <div className="showroom-amenities-ribbon">
              <div className="amenity-card">
                <div className="amenity-icon-box">
                  <Coffee size={16} />
                </div>
                <div>
                  <strong>Royal Gaddi Seating</strong>
                  <span>Air-conditioned family salon</span>
                </div>
              </div>

              <div className="amenity-card">
                <div className="amenity-icon-box">
                  <Award size={16} />
                </div>
                <div>
                  <strong>Karatmeter Lab</strong>
                  <span>Free computerized testing</span>
                </div>
              </div>

              <div className="amenity-card">
                <div className="amenity-icon-box">
                  <Car size={16} />
                </div>
                <div>
                  <strong>Showroom Parking</strong>
                  <span>Convenient Station Rd access</span>
                </div>
              </div>

              <div className="amenity-card">
                <div className="amenity-icon-box">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <strong>Armoured Security</strong>
                  <span>Safe & insured environment</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: The Imperial Concierge & Hospitality Salon */}
          <div className="showroom-pavilion-concierge">
            <div className="concierge-card-inner">
              {/* Salon Header with Gold Seal */}
              <div className="concierge-header-block">
                <div className="concierge-badge-wrap">
                  <span className="concierge-crest-icon">
                    <Compass size={18} />
                  </span>
                  <div>
                    <span className="concierge-tag">VISITOR CONCIERGE & SALON</span>
                    <h3 className="concierge-title">Sangmohal Flagship Showroom</h3>
                  </div>
                </div>
                <span className="concierge-status-pill">
                  <span className="pulse-dot" />
                  Open Today
                </span>
              </div>

              {/* Showroom Address Section */}
              <div className="concierge-address-box">
                <div className="address-top-row">
                  <div className="address-label">
                    <MapPin size={16} className="text-gold" />
                    <span>Showroom Address & Landmark</span>
                  </div>
                  <button
                    type="button"
                    className="concierge-copy-btn"
                    onClick={() => handleCopyText(STORE_INFO.fullAddress, 'Address')}
                    title="Copy Full Showroom Address"
                  >
                    {copiedField === 'Address' ? <Check size={12} color="#10B981" /> : <Copy size={12} />}
                    <span>{copiedField === 'Address' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <p className="address-text-body">
                  {STORE_INFO.fullAddress}
                </p>

                <div className="landmark-callout">
                  <span className="landmark-pin">📍</span>
                  <span>
                    <strong>Landmark:</strong> Opposite / Near Jila Karagar (District Jail), Station Road, Sangmohal, Mirzapur (231001)
                  </span>
                </div>
              </div>

              {/* Visiting Hours Section */}
              <div className="concierge-hours-box">
                <div className="hours-header">
                  <Clock size={16} className="text-gold" />
                  <span>Showroom Visiting Hours (खुलने का समय)</span>
                </div>
                <div className="hours-grid">
                  <div className="hour-card regular">
                    <span className="hour-days">Monday – Saturday</span>
                    <strong className="hour-time">10:00 AM – 8:00 PM</strong>
                    <span className="hour-badge">Regular Full Day</span>
                  </div>
                  <div className="hour-card sunday">
                    <span className="hour-days">Sunday Special</span>
                    <strong className="hour-time">10:30 AM – 4:30 PM</strong>
                    <span className="hour-badge gold">Weekend Hours</span>
                  </div>
                </div>
              </div>

              {/* Direct Concierge Calling & WhatsApp Direct Line */}
              <div className="concierge-comms-box">
                <div className="comms-header">
                  <Phone size={15} className="text-gold" />
                  <span>Direct Showroom Desk & WhatsApp</span>
                </div>

                {/* WhatsApp Video Shopping Special Card */}
                <a
                  href={STORE_INFO.whatsappCatalogUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="whatsapp-concierge-card"
                >
                  <div className="wa-icon-bubble">
                    <MessageCircle size={22} />
                  </div>
                  <div className="wa-content-body">
                    <div className="wa-badge-row">
                      <span className="wa-pill">WhatsApp Video Catalog</span>
                      <span className="wa-action-text">Chat Now ➔</span>
                    </div>
                    <strong>{STORE_INFO.whatsappDisplay}</strong>
                    <p>Live 1-on-1 video call to inspect hallmarked designs before visiting</p>
                  </div>
                </a>

                {/* Showroom Direct Phone Lines */}
                <div className="phone-lines-grid">
                  <a href={`tel:${STORE_INFO.phonePrimary}`} className="phone-line-card">
                    <span className="line-label">Main Counter</span>
                    <strong className="line-num">📞 {STORE_INFO.phonePrimaryDisplay}</strong>
                  </a>
                  <a href={`tel:${STORE_INFO.phoneSecondary}`} className="phone-line-card">
                    <span className="line-label">Store Manager</span>
                    <strong className="line-num">📞 {STORE_INFO.phoneSecondaryDisplay}</strong>
                  </a>
                  {STORE_INFO.phoneTertiary && (
                    <a href={`tel:${STORE_INFO.phoneTertiary}`} className="phone-line-card">
                      <span className="line-label">Inquiries Desk</span>
                      <strong className="line-num">📞 {STORE_INFO.phoneTertiaryDisplay}</strong>
                    </a>
                  )}
                </div>
              </div>

              {/* Action Buttons: Regal Dual Primary CTAs */}
              <div className="concierge-actions-row">
                <a
                  href={STORE_INFO.googleDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-imperial-directions"
                  title="Get GPS Turn-by-Turn Navigation to Showroom"
                >
                  <Navigation size={16} />
                  <span>Start GPS Navigation</span>
                  <ExternalLink size={13} style={{ marginLeft: '4px' }} />
                </a>

                <button
                  type="button"
                  className="btn-imperial-vip"
                  onClick={() => setIsVipModalOpen(true)}
                  title="Book Private VIP Gaddi Consultation"
                >
                  <Sparkles size={16} />
                  <span>Book VIP Visit</span>
                </button>
              </div>

              {/* Quick Links Sub-bar */}
              <div className="concierge-sublinks">
                <a
                  href={STORE_INFO.googleReviewsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="sublink-item"
                >
                  <Star size={13} fill="#E5C378" color="#E5C378" />
                  <span>Write Google Review</span>
                </a>
                <span className="sublink-separator">•</span>
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="sublink-item"
                >
                  <MapPin size={13} />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Showroom Satellite & GPS Map */}
        <div className="showroom-map-console">
          <div className="map-console-header">
            <div className="console-title">
              <MapPin size={16} className="text-gold" />
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
            height="340"
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
              <X size={22} />
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
                  className="btn-imperial-directions"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
                >
                  <Navigation size={14} />
                  <span>Visit Showroom in Sangmohal</span>
                </a>
                <button
                  type="button"
                  className="btn-imperial-vip"
                  onClick={() => {
                    setIsLightboxOpen(false);
                    setIsVipModalOpen(true);
                  }}
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
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