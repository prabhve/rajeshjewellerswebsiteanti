import React, { useState, useEffect } from 'react';
import { useJewellery } from '../context/JewelleryContext';
import { STORE_INFO } from '../data/storeInfo';
import {
  Sparkles,
  ShieldCheck,
  Award,
  MessageCircle,
  Calendar,
  ArrowRight,
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 'rani-haar',
    title: '22K Handcrafted Bridal Rani Haar',
    subtitle: 'हस्तनिर्मित 22K ब्राइडल रानी हार एवं झुमका सेट',
    tag: 'Showroom Original',
    image: '/assets/images/store/store_display_jewellery.jpg',
    purity: '22K BIS 916 Hallmark',
    badge: 'Pure Gold Masterpiece'
  },
  {
    id: 'bridal-polki',
    title: 'Shahi Rajwada Polki & Kundan Set',
    subtitle: 'शाही राजवाड़ा ब्राइडल कुंदन एवं पोलकी चोकर',
    tag: 'Royal Bridal 2026',
    image: '/assets/images/hero_bridal.jpg',
    purity: 'Uncut Syndicate Polki',
    badge: 'Heirloom Edition'
  },
  {
    id: 'storefront',
    title: 'Rajesh Jewellers Flagship Showroom',
    subtitle: 'राजेश ज्वेलर्स — संगमोहाल, स्टेशन रोड, मिर्ज़ापुर',
    tag: 'Verified Showroom',
    image: '/assets/images/store/storefront_facade.jpg',
    purity: 'GST: 09ADMPS4528E1Z8',
    badge: 'Sangmohal Landmark'
  },
  {
    id: 'interior',
    title: 'Traditional Royal Seated Gaddi Lounge',
    subtitle: 'पारंपरिक गद्दी एवं पारिवारिक ज्वैलरी परामर्श',
    tag: 'Luxury Hospitality',
    image: '/assets/images/store/store_interior_counter.jpg',
    purity: 'In-Store Karatmeter Test',
    badge: 'Air-Conditioned'
  }
];

const HeroSection = () => {
  const { setActiveCategory, setIsVipModalOpen } = useJewellery();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Smooth slide cycling (pauses when user hovers over visual frame)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const slide = HERO_SLIDES[activeSlide];

  return (
    <section className="hero-banner-section" id="hero">
      <div className="container">
        <div className="hero-banner-grid">
          {/* Left Column: Brand Copy & Actions */}
          <div className="hero-banner-copy">
            {/* Top Row: Kicker Tag & Google Rating */}
            <div className="hero-top-meta-row">
              <div className="kicker-tag">
                <Sparkles size={11} className="gold-sparkle-icon" />
                <span>Heritage Gold & Bridal 2026 • शुद्धता की गारंटी</span>
              </div>

              <a
                href={STORE_INFO.googleReviewsUrl}
                target="_blank"
                rel="noreferrer"
                className="hero-social-proof"
                title="View Google Maps Reviews for Rajesh Jewellers"
              >
                <div className="hero-stars-row">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={11} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <span className="hero-social-proof-text">
                  <strong>{STORE_INFO.googleRating}★</strong> Google ({STORE_INFO.googleReviewCount} Reviews)
                </span>
              </a>
            </div>

            {/* Main Grand Heading */}
            <h1 className="hero-heading">
              Pure 22K BIS 916 Hallmarked Gold & Royal Bridal Jewellery
            </h1>

            {/* Hindi Brand Moniker */}
            <div className="hero-hindi-moniker">
              {STORE_INFO.hindiName} — {STORE_INFO.tagline}
            </div>

            {/* Description */}
            <p className="hero-desc">
              Mirzapur's trusted destination for handcrafted 22K bridal rani haars, antique temple kadas, certified solitaire diamonds, and sacred 24K bullion. Transparent computerized billing with live Karatmeter purity testing.
            </p>

            {/* Unique Luxury CTA Group */}
            <div className="hero-cta-group">
              <a
                href="#catalog-section"
                className="hero-btn-primary"
                onClick={() => setActiveCategory('bridal')}
              >
                <span>Explore Royal Collections</span>
                <ArrowRight size={15} />
              </a>

              <a
                href={STORE_INFO.whatsappCatalogUrl}
                target="_blank"
                rel="noreferrer"
                className="hero-btn-whatsapp"
                title="Open WhatsApp Catalog"
              >
                <MessageCircle size={16} className="hero-wa-icon" />
                <span>WhatsApp Catalog ({STORE_INFO.whatsappDisplay})</span>
              </a>

              <button
                type="button"
                className="hero-btn-vip"
                onClick={() => setIsVipModalOpen(true)}
              >
                <Calendar size={15} />
                <span>Book VIP Visit</span>
              </button>
            </div>

            {/* Unique Prestigious Trust Badges */}
            <div className="hero-trust-badges">
              <div className="trust-badge-item">
                <div className="trust-badge-icon">
                  <ShieldCheck size={17} />
                </div>
                <div className="trust-badge-text">
                  <strong>100% BIS 916 Hallmark</strong>
                  <span>Govt. 6-Digit HUID Code</span>
                </div>
              </div>

              <div className="trust-badge-item">
                <div className="trust-badge-icon">
                  <Award size={17} />
                </div>
                <div className="trust-badge-text">
                  <strong>In-Store Karatmeter</strong>
                  <span>Instant Precision Purity Test</span>
                </div>
              </div>

              <div className="trust-badge-item">
                <div className="trust-badge-icon">
                  <CheckCircle2 size={17} />
                </div>
                <div className="trust-badge-text">
                  <strong>Transparent GST Bill</strong>
                  <span>GST: {STORE_INFO.gstin}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Frame Showcase Slider with Auto-slide & Controls */}
          <div
            className="hero-showcase-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="hero-visual-frame">
              {/* Floating Top Badge */}
              <div className="floating-hero-top-badge">
                <Sparkles size={11} style={{ color: '#E5C378' }} />
                <span>{slide.badge}</span>
              </div>

              {/* Main Slide Image */}
              <img
                src={slide.image}
                alt={slide.title}
                key={slide.id}
                className="hero-slide-img"
                decoding="async"
                fetchPriority="high"
              />

              {/* Floating Bottom Info Pill with high-contrast Hallmark Badge */}
              <div className="floating-hero-pill">
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div className="hero-slide-title">
                    {slide.title}
                  </div>
                  <div className="hero-slide-meta">
                    {slide.purity} • {slide.tag}
                  </div>
                </div>

                {/* Fixed High-Contrast Pure Hallmark Tag */}
                <div className="hero-hallmark-badge">
                  Pure Hallmark
                </div>
              </div>
            </div>

            {/* Luxury Slider Dots & Arrow Controls */}
            <div className="hero-slider-controls">
              <button
                type="button"
                onClick={() => setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                className="hero-nav-arrow"
                aria-label="Previous slide"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="hero-dots-container">
                {HERO_SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    className={`hero-dot-btn ${activeSlide === idx ? 'active' : ''}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                className="hero-nav-arrow"
                aria-label="Next slide"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;