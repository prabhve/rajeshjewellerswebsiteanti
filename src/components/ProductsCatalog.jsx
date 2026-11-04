import React, { useState } from 'react';
import { useJewellery } from '../context/JewelleryContext';
import { CATEGORY_CHIPS, SHAPE_FILTERS, OCCASION_FILTERS, BUDGET_FILTERS } from '../data/initialData';
import { STORE_INFO } from '../data/storeInfo';
import ProductCard from './ProductCard';
import {
  Video,
  MapPin,
  Sparkles,
  Filter,
  CheckCircle,
  Truck,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Building2,
  MessageCircle,
  Clock,
  Lock
} from 'lucide-react';

// Elegant Diamond Cut Shape SVGs
const ShapeIcon = ({ shape, size = 18 }) => {
  switch (shape) {
    case 'all':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polygon points="6,3 18,3 22,9 12,21 2,9" />
          <polyline points="2,9 12,9 22,9" opacity="0.6" />
          <polyline points="6,3 12,9 18,3" opacity="0.6" />
          <polyline points="12,9 12,21" opacity="0.6" />
        </svg>
      );
    case 'round':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <polygon points="12,3 18.36,5.64 21,12 18.36,18.36 12,21 5.64,18.36 3,12 5.64,5.64" opacity="0.4" />
          <circle cx="12" cy="12" r="3.5" opacity="0.6" />
        </svg>
      );
    case 'princess':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="4" y="4" width="16" height="16" rx="1" />
          <polygon points="4,4 12,8 20,4" opacity="0.4" />
          <polygon points="4,20 12,16 20,20" opacity="0.4" />
          <polygon points="4,4 8,12 4,20" opacity="0.4" />
          <polygon points="20,4 16,12 20,20" opacity="0.4" />
        </svg>
      );
    case 'emerald':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polygon points="6,3 18,3 21,7 21,17 18,21 6,21 3,17 3,7" />
          <polygon points="8,6 16,6 18,9 18,15 16,18 8,18 6,15 6,9" opacity="0.4" />
        </svg>
      );
    case 'oval':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <ellipse cx="12" cy="12" rx="7.5" ry="10" />
          <ellipse cx="12" cy="12" rx="3.5" ry="5.5" opacity="0.4" />
        </svg>
      );
    case 'pear':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 3 C12 3 5 12 5 16 A 7 7 0 0 0 19 16 C 19 12 12 3 12 3 Z" />
          <circle cx="12" cy="15" r="3" opacity="0.4" />
        </svg>
      );
    case 'heart':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      );
    default:
      return <Sparkles size={size} />;
  }
};

const ProductsCatalog = () => {
  const {
    products,
    activeCategory,
    setActiveCategory,
    activeShape,
    setActiveShape,
    activeOccasion,
    setActiveOccasion,
    activeBudget,
    setActiveBudget,
    sortBy,
    setSortBy,
    calculatePrice,
    openVipBooking,
    userPincode,
    setUserPincode,
    getPincodeStatus,
    setIsGiftWizardOpen
  } = useJewellery();

  const [pincodeInput, setPincodeInput] = useState(userPincode);
  const [pincodeCheckActive, setPincodeCheckActive] = useState(false);
  const [pincodeFeedback, setPincodeFeedback] = useState(() => getPincodeStatus(userPincode));

  const QUICK_PINCODES = [
    { code: '231001', label: 'Mirzapur', detail: 'Sangmohal' },
    { code: '221001', label: 'Varanasi', detail: '24h Express' },
    { code: '211001', label: 'Prayagraj', detail: '24h Express' },
    { code: '221401', label: 'Bhadohi', detail: 'Same Day' },
    { code: '226001', label: 'Lucknow', detail: 'Next Day' },
    { code: '110001', label: 'Delhi NCR', detail: '2-3 Days' }
  ];

  const handleQuickPincode = (code) => {
    setPincodeInput(code);
    setUserPincode(code);
    setPincodeFeedback(getPincodeStatus(code));
    setPincodeCheckActive(true);
  };

  const handlePincodeChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPincodeInput(val);
    if (val.length === 6) {
      setUserPincode(val);
      setPincodeFeedback(getPincodeStatus(val));
      setPincodeCheckActive(true);
    }
  };

  const handlePincodeSubmit = (e) => {
    e.preventDefault();
    setUserPincode(pincodeInput);
    setPincodeFeedback(getPincodeStatus(pincodeInput));
    setPincodeCheckActive(true);
  };

  const handleResetFilters = () => {
    setActiveCategory('all');
    setActiveShape('all');
    setActiveOccasion('all');
    setActiveBudget('all');
  };

  const hasActiveSecondaryFilters =
    activeShape !== 'all' ||
    activeOccasion !== 'all' ||
    activeBudget !== 'all' ||
    activeCategory !== 'all';

  // Comprehensive Multi-Tier Filter Logic
  let displayed = products.filter((p) => {
    // 1. Category Filter
    if (activeCategory !== 'all' && p.category !== activeCategory) {
      return false;
    }

    // 2. Diamond / Gemstone Shape Filter
    if (activeShape !== 'all') {
      if (p.shape !== activeShape) {
        return false;
      }
    }

    // 3. Occasion Filter
    if (activeOccasion !== 'all') {
      if (p.occasion !== activeOccasion) {
        return false;
      }
    }

    // 4. Budget Filter
    if (activeBudget !== 'all') {
      const price = calculatePrice(p).totalPrice;
      if (activeBudget === 'under-50k' && price >= 50000) return false;
      if (activeBudget === '50k-150k' && (price < 50000 || price > 150000)) return false;
      if (activeBudget === '150k-300k' && (price < 150000 || price > 300000)) return false;
      if (activeBudget === 'above-300k' && price < 300000) return false;
    }

    return true;
  });

  // Sort products
  displayed.sort((a, b) => {
    const priceA = calculatePrice(a).totalPrice;
    const priceB = calculatePrice(b).totalPrice;

    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    if (sortBy === 'weight') {
      const wtA = parseFloat((a.netGoldWeight || a.grossWeight || '0').match(/[\d.]+/)?.[0] || '0');
      const wtB = parseFloat((b.netGoldWeight || b.grossWeight || '0').match(/[\d.]+/)?.[0] || '0');
      return wtB - wtA;
    }
    return 0; // featured default
  });

  return (
    <section className="catalog-section" id="catalog-section">
      <div className="container">
        {/* Header Flex */}
        <div className="catalog-header-flex">
          <div className="catalog-header-left">
            <div className="catalog-kicker-row">
              <span className="kicker-tag catalog-kicker-tag">
                <Sparkles size={11} style={{ color: '#E5C378' }} />
                100% BIS 916 Hallmark & Certified Solitaires
              </span>
              <span className="catalog-live-badge">
                <span className="live-pulse-dot" />
                Sangmohal Showroom Real-Time Inventory
              </span>
            </div>
            <h2 className="catalog-main-title">
              राजेश ज्वेलर्स ऑनलाइन आभूषण संग्रह
            </h2>
            <p className="catalog-subtitle">
              Showing <strong style={{ color: '#FFF6D6' }}>{displayed.length} Masterpiece Designs</strong> in Sangmohal, Mirzapur Showroom
            </p>
          </div>

          {/* Quick Action Badges */}
          <div className="catalog-action-buttons">
            <button
              type="button"
              className="btn-catalog-gift"
              onClick={() => setIsGiftWizardOpen(true)}
            >
              <Sparkles size={14} className="catalog-gift-sparkle" />
              <span>🎁 Gift Finder Wizard</span>
            </button>

            <button
              type="button"
              className="btn-catalog-video"
              onClick={() => openVipBooking('video')}
            >
              <Video size={14} />
              <span>📹 1-on-1 Video Shopping</span>
            </button>
          </div>
        </div>

        {/* 1. DIAMOND & GEMSTONE CUT SHAPE STRIP (Jewelbox & CaratLane Inspired) */}
        <div className="shape-filter-wrapper">
          <div className="shape-filter-header">
            <span className="shape-filter-title">
              <Sparkles size={14} style={{ color: 'var(--gold-primary)' }} />
              <span>Filter by Gemstone & Diamond Cut (कट के अनुसार चुनें):</span>
            </span>
            {activeShape !== 'all' && (
              <button
                type="button"
                className="shape-clear-btn"
                onClick={() => setActiveShape('all')}
              >
                Clear Shape ({activeShape})
              </button>
            )}
          </div>

          <div className="shape-cards-row">
            {SHAPE_FILTERS.map((s) => {
              const isActive = activeShape === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  className={`shape-card ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveShape(s.id)}
                >
                  <div className="shape-icon-box">
                    <ShapeIcon shape={s.icon} size={22} />
                  </div>
                  <span className="shape-card-label">{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. OCCASION & BUDGET FILTER ROW (BlueStone & Voylla Inspired) */}
        <div className="multi-filter-bar">
          <div className="filter-group">
            <span className="filter-group-label">Occasion:</span>
            <div className="filter-chips-scroll">
              {OCCASION_FILTERS.map((occ) => (
                <button
                  key={occ.id}
                  type="button"
                  className={`filter-pill ${activeOccasion === occ.id ? 'active' : ''}`}
                  onClick={() => setActiveOccasion(occ.id)}
                >
                  {occ.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-group-label">Budget:</span>
            <div className="filter-chips-scroll">
              {BUDGET_FILTERS.map((bud) => (
                <button
                  key={bud.id}
                  type="button"
                  className={`filter-pill ${activeBudget === bud.id ? 'active' : ''}`}
                  onClick={() => setActiveBudget(bud.id)}
                >
                  {bud.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. CONTROLS BAR: CATEGORIES & SORT */}
        <div className="catalog-controls-bar">
          <div className="category-filter-chips">
            {CATEGORY_CHIPS.map((chip) => (
              <button
                key={chip.id}
                className={`filter-chip ${activeCategory === chip.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(chip.id)}
              >
                {chip.label}
              </button>
            ))}
          </div>

          <div className="sort-select-box">
            <label htmlFor="catalog-sort-select">Sort By:</label>
            <select
              id="catalog-sort-select"
              className="sort-dropdown-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured / लोकप्रिय</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="weight">Weight: Heavy to Light</option>
            </select>
          </div>
        </div>

        {/* 4. PINCODE DELIVERY & SHOWROOM TRIAL CHECKER (CaratLane & BlueStone Benchmarked) */}
        <div className="pincode-trial-section">
          <div className="pincode-header-row">
            <div className="pincode-title-box">
              <div className="pincode-icon-disc">
                <MapPin size={18} />
              </div>
              <div>
                <strong className="pincode-main-heading">
                  Check Showroom Trial & Free Insured Delivery
                </strong>
                <span className="pincode-sub-heading">
                  Enter your 6-digit Pincode to view instant Sangmohal showroom trial & delivery speed
                </span>
              </div>
            </div>

            <form className="pincode-input-form" onSubmit={handlePincodeSubmit}>
              <div className="pincode-input-wrap">
                <MapPin size={14} className="pincode-field-icon" />
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode"
                  value={pincodeInput}
                  onChange={handlePincodeChange}
                  aria-label="Enter Pincode"
                />
              </div>
              <button type="submit" className="pincode-submit-btn">
                Check
              </button>
            </form>
          </div>

          {/* Quick-Select Nearby Pincode Chips */}
          <div className="pincode-quick-chips">
            <span className="quick-chip-label">Quick Select:</span>
            {QUICK_PINCODES.map((item) => (
              <button
                key={item.code}
                type="button"
                className={`quick-pincode-btn ${userPincode === item.code ? 'active' : ''}`}
                onClick={() => handleQuickPincode(item.code)}
              >
                <span>{item.code}</span>
                <small>({item.label})</small>
              </button>
            ))}
          </div>

          {/* Luxury Result Dashboard (Replaces the stark pale mint bar) */}
          {pincodeFeedback.isValid && (
            <div className={`pincode-dashboard-card ${pincodeFeedback.tier || 'local'}`}>
              {/* Top Status Header */}
              <div className="pincode-dash-top">
                <div className="dash-title-wrap">
                  <div className="dash-check-circle">
                    <CheckCircle size={16} />
                  </div>
                  <div>
                    <h4 className="dash-tier-title">{pincodeFeedback.title}</h4>
                    <span className="dash-city-tag">
                      📍 Pincode: <strong>{pincodeFeedback.code || userPincode}</strong> • {pincodeFeedback.city || 'Verified Zone'}
                    </span>
                  </div>
                </div>
                <span className="dash-hub-badge">
                  {pincodeFeedback.badge || 'Verified Delivery'}
                </span>
              </div>

              {/* 3-Pillar Visual Benefit Grid */}
              <div className="pincode-pillars-grid">
                <div className="pincode-pillar-item">
                  <div className="pillar-icon">
                    <Truck size={16} />
                  </div>
                  <div>
                    <span className="pillar-label">Delivery Timeline</span>
                    <strong className="pillar-value">{pincodeFeedback.deliveryTime}</strong>
                  </div>
                </div>

                <div className="pincode-pillar-item">
                  <div className="pillar-icon">
                    <Building2 size={16} />
                  </div>
                  <div>
                    <span className="pillar-label">Showroom Trial (100% Free)</span>
                    <strong className="pillar-value">{pincodeFeedback.trialStatus}</strong>
                  </div>
                </div>

                <div className="pincode-pillar-item">
                  <div className="pillar-icon">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <span className="pillar-label">Transit Insurance & Certificate</span>
                    <strong className="pillar-value">{pincodeFeedback.transitSecurity}</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="pincode-dash-actions">
                <button
                  type="button"
                  className="btn-pincode-trial"
                  onClick={() => openVipBooking('store')}
                >
                  <Building2 size={14} />
                  <span>Book Free Showroom Trial</span>
                </button>

                <a
                  href={`https://wa.me/${STORE_INFO.whatsapp.replace('+', '')}?text=${encodeURIComponent(
                    `Namaste Rajesh Jewellers (Mirzapur), I verified pincode ${pincodeFeedback.code || userPincode} (${pincodeFeedback.city || 'Mirzapur'}). Please confirm trial and delivery for this area.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-pincode-wa"
                >
                  <MessageCircle size={14} />
                  <span>Confirm on WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* 5. 4K LIVE VIDEO SHOPPING PROMO RIBBON (CaratLane & BlueStone Inspired) */}
        <div className="video-shopping-ribbon">
          <div className="video-ribbon-content">
            <div className="video-ribbon-badge">
              <Video size={14} /> 4K Live Video Shopping
            </div>
            <div className="video-ribbon-text">
              <strong>Can't visit our Sangmohal showroom today?</strong>
              <span> Connect with our master jewellery consultants over 1-on-1 WhatsApp Video. Inspect real hallmarks, diamond fire, and karatage live from your home!</span>
            </div>
          </div>
          <button
            type="button"
            className="video-ribbon-cta"
            onClick={() => openVipBooking('video')}
          >
            <span>Book Video Slot</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 6. PRODUCT CARDS GRID */}
        <div className="ecommerce-grid" id="products-grid">
          {displayed.length > 0 ? (
            displayed.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))
          ) : (
            <div
              style={{
                gridColumn: '1 / -1',
                padding: '3.5rem 1.5rem',
                textAlign: 'center',
                background: 'var(--bg-warm)',
                borderRadius: '16px',
                border: '1px dashed var(--gold-border)'
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>💎</div>
              <h3 style={{ color: 'var(--brand-plum)', marginBottom: '0.5rem', fontSize: '1.3rem' }}>
                No jewellery matched these active filters.
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '500px', margin: '0 auto 1.25rem' }}>
                We craft custom bridal polki, solitaire cuts, and temple ornaments to any weight or budget in our Sangmohal karigar workshop.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleResetFilters}
                >
                  <RotateCcw size={14} /> Reset All Filters
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => openVipBooking('video')}
                >
                  <Video size={14} /> Inquire Custom Piece on WhatsApp
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsCatalog;
