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
  Volume2
} from 'lucide-react';

const ShowroomTour = () => {
  const { setIsVipModalOpen } = useJewellery();
  const [activeTab, setActiveTab] = useState('photos'); // 'photos' | 'video'
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const activePhoto = STORE_INFO.photos[selectedPhotoIndex] || STORE_INFO.photos[0];

  return (
    <section className="showroom-tour-section" id="showroom">
      <div className="container">
        {/* Section Header */}
        <div className="showroom-header">
          <span className="kicker-tag" style={{ justifyContent: 'center' }}>
            <Camera size={13} />
            Verified Google Maps Showroom • हमारा अधिकृत प्रतिष्ठान
          </span>
          <h2 className="showroom-main-title">
            {STORE_INFO.hindiName} — {STORE_INFO.name}
          </h2>
          <p className="showroom-proprietor-badge">
            Proprietor: <strong>{STORE_INFO.proprietor}</strong> • Sangmohal Landmark
          </p>
          <p className="showroom-bio-text">
            {STORE_INFO.officialMerchantBio}
          </p>

          {/* Media Switcher Tabs: Photos vs Showroom Video */}
          <div className="showroom-media-tabs">
            <button
              type="button"
              className={`showroom-tab-btn ${activeTab === 'photos' ? 'active' : ''}`}
              onClick={() => setActiveTab('photos')}
            >
              <Camera size={15} />
              <span>Google Maps Verified Photos ({STORE_INFO.photos.length})</span>
            </button>
            <button
              type="button"
              className={`showroom-tab-btn ${activeTab === 'video' ? 'active' : ''}`}
              onClick={() => setActiveTab('video')}
            >
              <Video size={15} />
              <span>Showroom Showcase Video Reel</span>
            </button>
          </div>
        </div>

        {/* Showroom Interactive Gallery & Details Grid */}
        <div className="showroom-split-grid">
          {/* Left Column: Photos Showcase or Video Player */}
          <div className="showroom-media-column">
            {activeTab === 'photos' ? (
              <>
                <div className="showroom-photo-box">
                  <img
                    src={activePhoto.image}
                    alt={activePhoto.title}
                    key={activePhoto.id}
                    className="showroom-main-img"
                    style={{ objectPosition: activePhoto.objectPosition || 'center center' }}
                  />
                  <div className="showroom-photo-overlay">
                    <span className="showroom-badge-pill">
                      <Sparkles size={11} style={{ marginRight: '4px' }} />
                      {activePhoto.badge}
                    </span>
                    <h4 className="showroom-photo-title">
                      {activePhoto.title}
                    </h4>
                    <p className="showroom-photo-desc">
                      {activePhoto.desc}
                    </p>
                  </div>
                </div>

                {/* Photo Thumbnails Selector */}
                <div className="showroom-thumbs-grid">
                  {STORE_INFO.photos.map((photo, idx) => (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => setSelectedPhotoIndex(idx)}
                      className={`showroom-thumb-btn ${selectedPhotoIndex === idx ? 'active' : ''}`}
                      title={photo.title}
                    >
                      <img
                        src={photo.image}
                        alt={photo.title}
                      />
                      <span className="thumb-label">{photo.badge.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              /* Video Showcase Reel Player */
              <div className="showroom-video-box">
                <img
                  src="/assets/images/store/store_showcase_video_thumb.jpg"
                  alt="Showroom Jewellery Showcase Video Reel"
                  className="showroom-video-thumb"
                />
                <div className="video-glass-overlay">
                  {!isVideoPlaying ? (
                    <button
                      type="button"
                      className="video-play-btn"
                      onClick={() => setIsVideoPlaying(true)}
                      aria-label="Play Showroom Showcase Reel"
                    >
                      <Play size={26} fill="#080103" color="#080103" style={{ marginLeft: '4px' }} />
                    </button>
                  ) : (
                    <div className="video-playing-state">
                      <div className="audio-wave">
                        <span /><span /><span /><span />
                      </div>
                      <span style={{ fontSize: '0.85rem', color: '#FFFDF9', fontWeight: 600 }}>
                        Showroom Live Showcase Reel Playing
                      </span>
                    </div>
                  )}

                  <div className="video-bottom-caption">
                    <div className="video-live-badge">
                      <Volume2 size={13} />
                      <span>HD 1080p Showroom Showcase</span>
                    </div>
                    <h4>Pure 22K Hallmarked Gold Bell Earrings (झुमका व लटकन)</h4>
                    <p>Live showroom recording displaying intricate filigree craftsmanship and mirror polish at Sangmohal showroom.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Showroom Details & Contact */}
          <div className="showroom-details-column">
            <div className="showroom-details-card">
              {/* GSTIN, Hallmark & Google Rating Badges */}
              <div className="showroom-proof-badges">
                <div className="showroom-proof-pill gold">
                  <ShieldCheck size={14} />
                  <span>GST: {STORE_INFO.gstin}</span>
                </div>

                <div className="showroom-proof-pill green">
                  <Star size={13} fill="#F59E0B" color="#F59E0B" />
                  <span>{STORE_INFO.googleRating}★ Google Verified ({STORE_INFO.googleReviewCount} Reviews)</span>
                </div>

                <div className="showroom-proof-pill gold-subtle">
                  <CheckCircle2 size={13} />
                  <span>100% BIS 916 Hallmark (HUID)</span>
                </div>
              </div>

              {/* Address with Landmark */}
              <div className="showroom-info-block">
                <div className="showroom-info-icon">
                  <MapPin size={18} />
                </div>
                <div className="showroom-info-content">
                  <strong className="info-title">
                    Showroom Address & Landmark
                  </strong>
                  <p className="info-desc">
                    {STORE_INFO.fullAddress}
                  </p>
                  <span className="info-highlight-badge">
                    📍 Landmark: Opposite / Near Jila Karagar (District Jail), Station Road, Sangmohal, Mirzapur
                  </span>
                </div>
              </div>

              {/* Timings */}
              <div className="showroom-info-block">
                <div className="showroom-info-icon">
                  <Clock size={18} />
                </div>
                <div className="showroom-info-content">
                  <div className="showroom-timings-header">
                    <strong className="info-title">
                      Showroom Timings (खुलने का समय)
                    </strong>
                    <span className="live-status-pill">
                      <span className="live-status-dot"></span>
                      Open Now
                    </span>
                  </div>
                  <div className="showroom-timings-grid">
                    <span className="timing-chip">Mon – Sat: <strong>10:00 AM – 8:00 PM</strong></span>
                    <span className="timing-chip">Sun: <strong>10:30 AM – 4:30 PM (Weekend Hours)</strong></span>
                  </div>
                </div>
              </div>

              {/* Contact Phones */}
              <div className="showroom-info-block contacts-block">
                <div className="showroom-info-icon">
                  <Phone size={18} />
                </div>
                <div className="showroom-info-content">
                  <strong className="info-title">
                    Direct Showroom Calling & WhatsApp
                  </strong>
                  <div className="showroom-contacts-grid">
                    <a href={`tel:${STORE_INFO.phonePrimary}`} className="showroom-contact-card">
                      <span className="contact-badge">Main Counter</span>
                      <span className="contact-number">📞 {STORE_INFO.phonePrimaryDisplay}</span>
                    </a>
                    <a href={`tel:${STORE_INFO.phoneSecondary}`} className="showroom-contact-card">
                      <span className="contact-badge">Manager</span>
                      <span className="contact-number">📞 {STORE_INFO.phoneSecondaryDisplay}</span>
                    </a>
                    {STORE_INFO.phoneTertiary && (
                      <a href={`tel:${STORE_INFO.phoneTertiary}`} className="showroom-contact-card">
                        <span className="contact-badge">Inquiries</span>
                        <span className="contact-number">📞 {STORE_INFO.phoneTertiaryDisplay}</span>
                      </a>
                    )}
                    <a
                      href={STORE_INFO.whatsappCatalogUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="showroom-contact-card whatsapp"
                    >
                      <span className="contact-badge wa">WhatsApp Catalog</span>
                      <span className="contact-number">💬 {STORE_INFO.whatsappDisplay}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Balanced 2x2 Matrix */}
              <div className="showroom-actions-matrix">
                <a
                  href={STORE_INFO.googleDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-showroom-directions"
                  title="Get GPS Turn-by-Turn Directions to Showroom"
                >
                  <Navigation size={15} />
                  <span>Get Directions</span>
                  <ExternalLink size={12} />
                </a>

                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-showroom-secondary"
                >
                  <MapPin size={15} />
                  <span>Open in Google Maps</span>
                </a>

                <a
                  href={STORE_INFO.googleReviewsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-showroom-secondary"
                >
                  <Star size={14} fill="#E5C378" color="#E5C378" />
                  <span>Write Google Review</span>
                </a>

                <button
                  type="button"
                  className="btn-showroom-vip"
                  onClick={() => setIsVipModalOpen(true)}
                >
                  <Sparkles size={14} />
                  <span>Book VIP Visit</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Google Maps Embed with Verified Marker */}
        <div className="showroom-map-container">
          <div className="map-top-bar">
            <span className="map-title">
              <MapPin size={14} style={{ color: '#E5C378' }} />
              Live Showroom Satellite & Map View — Sangmohal, Mirzapur (231001)
            </span>
            <a
              href={STORE_INFO.googleDirectionsUrl}
              target="_blank"
              rel="noreferrer"
              className="map-directions-link"
            >
              Start GPS Navigation ➔
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
    </section>
  );
};

export default ShowroomTour;