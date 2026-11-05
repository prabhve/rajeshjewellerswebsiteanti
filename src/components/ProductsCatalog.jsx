import React, { useState, useId, useMemo } from 'react';
import { useJewellery } from '../context/JewelleryContext';
import { CATEGORY_CHIPS, SHAPE_FILTERS, OCCASION_FILTERS } from '../data/initialData';
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
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  X
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

const PRICE_PRESETS = [
  { id: 'all', label: 'All Budgets', min: 0, max: 1000000 },
  { id: 'under-50k', label: 'Under ₹50K', min: 0, max: 50000 },
  { id: '50k-150k', label: '₹50K – ₹1.5L', min: 50000, max: 150000 },
  { id: '150k-300k', label: '₹1.5L – ₹3L', min: 150000, max: 300000 },
  { id: '300k-500k', label: '₹3L – ₹5L', min: 300000, max: 500000 },
  { id: 'above-500k', label: '₹5 Lakh+', min: 500000, max: 1000000 }
];

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
    priceRange,
    setPriceRange,
    resetPriceRange,
    sortBy,
    setSortBy,
    calculatePrice,
    openVipBooking,
    userPincode,
    setUserPincode,
    getPincodeStatus,
    setIsGiftWizardOpen
  } = useJewellery();

  const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(false);
  const [pincodeInput, setPincodeInput] = useState(userPincode);
  const [pincodeCheckActive, setPincodeCheckActive] = useState(false);
  const [pincodeFeedback, setPincodeFeedback] = useState(() => getPincodeStatus(userPincode));

  const minRangeId = useId();
  const maxRangeId = useId();

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
    resetPriceRange();
  };

  // Preset Budget Selection handler
  const handleSelectBudgetPreset = (preset) => {
    setActiveBudget(preset.id);
    setPriceRange({ min: preset.min, max: preset.max });
  };

  // Custom min/max price range slider handlers
  const handleMinSliderChange = (e) => {
    const newMin = Math.min(Number(e.target.value), priceRange.max - 5000);
    setPriceRange((prev) => ({ ...prev, min: newMin }));
    setActiveBudget('custom');
  };

  const handleMaxSliderChange = (e) => {
    const newMax = Math.max(Number(e.target.value), priceRange.min + 5000);
    setPriceRange((prev) => ({ ...prev, max: newMax }));
    setActiveBudget('custom');
  };

  const handleAdjustPrice = (type, delta) => {
    if (type === 'min') {
      const next = Math.max(0, Math.min(priceRange.min + delta, priceRange.max - 5000));
      setPriceRange((prev) => ({ ...prev, min: next }));
    } else {
      const next = Math.min(1000000, Math.max(priceRange.max + delta, priceRange.min + 5000));
      setPriceRange((prev) => ({ ...prev, max: next }));
    }
    setActiveBudget('custom');
  };

  const isPriceRangeNarrowed = priceRange.min > 0 || priceRange.max < 1000000;

  const hasAnyActiveFilters =
    activeCategory !== 'all' ||
    activeShape !== 'all' ||
    activeOccasion !== 'all' ||
    isPriceRangeNarrowed ||
    activeBudget !== 'all';

  // Comprehensive Multi-Tier Filter & Sort Logic with useMemo
  const displayed = useMemo(() => {
    // 1. Pre-map with calculated prices and numeric weights once per product
    const mapped = products.map((p) => {
      const priceObj = calculatePrice(p);
      const wtMatch = (p.netGoldWeight || p.grossWeight || '10').match(/[\d.]+/);
      const wt = wtMatch ? parseFloat(wtMatch[0]) : 10;
      return {
        product: p,
        totalPrice: priceObj.totalPrice,
        weight: wt
      };
    });

    // 2. Filter matching criteria
    const filtered = mapped.filter(({ product, totalPrice }) => {
      if (activeCategory !== 'all' && product.category !== activeCategory) return false;
      if (activeShape !== 'all' && product.shape !== activeShape) return false;
      if (activeOccasion !== 'all' && product.occasion !== activeOccasion) return false;
      if (totalPrice < priceRange.min || totalPrice > priceRange.max) return false;
      return true;
    });

    // 3. Sort using pre-computed values
    filtered.sort((a, b) => {
      if (sortBy === 'price-low') return a.totalPrice - b.totalPrice;
      if (sortBy === 'price-high') return b.totalPrice - a.totalPrice;
      if (sortBy === 'weight-heavy' || sortBy === 'weight') return b.weight - a.weight;
      if (sortBy === 'weight-light') return a.weight - b.weight;
      return 0; // featured default
    });

    return filtered.map((item) => item.product);
  }, [products, activeCategory, activeShape, activeOccasion, priceRange, sortBy, calculatePrice]);

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
              Showing <strong style={{ color: '#FFF6D6' }}>{displayed.length} of {products.length} Masterpiece Designs</strong> in Sangmohal, Mirzapur Showroom
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

        {/* 2. OCCASION FILTER ROW */}
        <div className="multi-filter-bar">
          <div className="filter-group" style={{ width: '100%' }}>
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
        </div>

        {/* 3. CONTROLS BAR: CATEGORIES, RANGE-BASED PRICE FILTER & SORT */}
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

          <div className="catalog-controls-right" style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Price Filter Trigger Button in Controls Bar */}
            <button
              type="button"
              className={`catalog-price-toggle-btn ${isPriceFilterOpen || isPriceRangeNarrowed ? 'active' : ''}`}
              onClick={() => setIsPriceFilterOpen(!isPriceFilterOpen)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.55rem 0.95rem',
                borderRadius: '8px',
                background: isPriceRangeNarrowed
                  ? 'linear-gradient(135deg, rgba(229, 195, 120, 0.25) 0%, rgba(197, 157, 63, 0.15) 100%)'
                  : 'rgba(255, 255, 255, 0.05)',
                border: isPriceRangeNarrowed
                  ? '1.5px solid var(--gold-primary)'
                  : '1px solid rgba(229, 195, 120, 0.3)',
                color: isPriceRangeNarrowed ? '#FFF6D6' : '#E6E0D6',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title="Click to toggle budget and price range slider"
            >
              <SlidersHorizontal size={14} style={{ color: 'var(--gold-primary)' }} />
              <span>
                {isPriceRangeNarrowed
                  ? `₹${priceRange.min.toLocaleString('en-IN')} – ₹${priceRange.max.toLocaleString('en-IN')}`
                  : 'Price / Budget Filter'}
              </span>
              {isPriceFilterOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {/* Sort Select Box */}
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
                <option value="weight-heavy">Weight: Heavy to Light</option>
                <option value="weight-light">Weight: Light to Heavy</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3B. RANGE-BASED PRICE FILTER EXPANDED CONTROLLER */}
        <div
          className={`price-range-panel ${isPriceFilterOpen || isPriceRangeNarrowed ? 'open' : ''}`}
          style={{
            background: 'linear-gradient(180deg, rgba(26, 6, 14, 0.98) 0%, rgba(14, 2, 7, 0.98) 100%)',
            border: '1.5px solid rgba(229, 195, 120, 0.35)',
            borderRadius: '12px',
            padding: '1.25rem 1.5rem',
            margin: '0.75rem 0 1.25rem',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(229, 195, 120, 0.12)',
            display: isPriceFilterOpen || isPriceRangeNarrowed ? 'block' : 'none'
          }}
        >
          {/* Top Row: Title, Current Range & Reset */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: 'rgba(229, 195, 120, 0.15)',
                  border: '1px solid rgba(229, 195, 120, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#E5C378'
                }}
              >
                <SlidersHorizontal size={14} />
              </span>
              <div>
                <strong style={{ color: '#FFFDF9', fontSize: '0.94rem' }}>
                  Filter by Price Range (बजट अनुसार छांटें)
                </strong>
                <span style={{ display: 'block', fontSize: '0.76rem', color: '#B8AE9E' }}>
                  Live computed prices based on today's MCX bullion rates & 3% GST
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span
                style={{
                  background: 'rgba(229, 195, 120, 0.15)',
                  border: '1px solid rgba(229, 195, 120, 0.4)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.84rem',
                  fontWeight: 800,
                  color: '#FFF6D6',
                  fontFamily: 'var(--font-serif-headline)',
                  letterSpacing: '0.02em'
                }}
              >
                ₹{priceRange.min.toLocaleString('en-IN')} – ₹{priceRange.max.toLocaleString('en-IN')}
              </span>

              {isPriceRangeNarrowed && (
                <button
                  type="button"
                  onClick={resetPriceRange}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    color: '#F87171',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '6px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                  title="Reset price range filter to ₹0 – ₹10 Lakhs"
                >
                  <RotateCcw size={11} />
                  <span>Reset Range</span>
                </button>
              )}
            </div>
          </div>

          {/* Preset Quick Budget Chips */}
          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#DFBE6B', alignSelf: 'center', marginRight: '0.25rem' }}>
              Quick Presets:
            </span>
            {PRICE_PRESETS.map((preset) => {
              const isActive =
                activeBudget === preset.id ||
                (!['all', 'custom'].includes(activeBudget) &&
                  priceRange.min === preset.min &&
                  priceRange.max === preset.max);

              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectBudgetPreset(preset)}
                  style={{
                    padding: '0.3rem 0.7rem',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: isActive
                      ? 'linear-gradient(135deg, #FFF6D6 0%, #E5C378 100%)'
                      : 'rgba(255, 255, 255, 0.05)',
                    color: isActive ? '#080103' : '#D4C5B3',
                    border: isActive
                      ? '1px solid #FFF6D6'
                      : '1px solid rgba(229, 195, 120, 0.22)',
                    transition: 'all 0.18s ease'
                  }}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          {/* Dual Sliders and Exact Numeric Inputs Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem',
              alignItems: 'center'
            }}
          >
            {/* Min Price Slider Block */}
            <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '0.85rem', borderRadius: '8px', border: '1px solid rgba(229, 195, 120, 0.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                <label htmlFor={minRangeId} style={{ fontSize: '0.78rem', color: '#B8AE9E', fontWeight: 600 }}>
                  Minimum Budget (न्यूनतम)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <button
                    type="button"
                    onClick={() => handleAdjustPrice('min', -10000)}
                    style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(229, 195, 120, 0.2)', color: '#FFFDF9', borderRadius: '4px', padding: '0.1rem 0.4rem', fontSize: '0.7rem', cursor: 'pointer' }}
                    title="-₹10,000"
                  >
                    -10k
                  </button>
                  <strong style={{ fontSize: '0.92rem', color: '#FFFDF9', fontFamily: 'var(--font-serif-headline)' }}>
                    ₹{priceRange.min.toLocaleString('en-IN')}
                  </strong>
                  <button
                    type="button"
                    onClick={() => handleAdjustPrice('min', 10000)}
                    style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(229, 195, 120, 0.2)', color: '#FFFDF9', borderRadius: '4px', padding: '0.1rem 0.4rem', fontSize: '0.7rem', cursor: 'pointer' }}
                    title="+₹10,000"
                  >
                    +10k
                  </button>
                </div>
              </div>
              <input
                id={minRangeId}
                type="range"
                min="0"
                max="500000"
                step="5000"
                value={priceRange.min}
                onChange={handleMinSliderChange}
                style={{
                  width: '100%',
                  accentColor: 'var(--gold-primary)',
                  cursor: 'pointer'
                }}
                aria-label="Minimum Price Slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#8A8074', marginTop: '0.2rem' }}>
                <span>₹0</span>
                <span>₹2.5 Lakhs</span>
                <span>₹5 Lakhs</span>
              </div>
            </div>

            {/* Max Price Slider Block */}
            <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '0.85rem', borderRadius: '8px', border: '1px solid rgba(229, 195, 120, 0.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                <label htmlFor={maxRangeId} style={{ fontSize: '0.78rem', color: '#B8AE9E', fontWeight: 600 }}>
                  Maximum Budget (अधिकतम)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <button
                    type="button"
                    onClick={() => handleAdjustPrice('max', -25000)}
                    style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(229, 195, 120, 0.2)', color: '#FFFDF9', borderRadius: '4px', padding: '0.1rem 0.4rem', fontSize: '0.7rem', cursor: 'pointer' }}
                    title="-₹25,000"
                  >
                    -25k
                  </button>
                  <strong style={{ fontSize: '0.92rem', color: '#FFFDF9', fontFamily: 'var(--font-serif-headline)' }}>
                    ₹{priceRange.max.toLocaleString('en-IN')}
                  </strong>
                  <button
                    type="button"
                    onClick={() => handleAdjustPrice('max', 25000)}
                    style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(229, 195, 120, 0.2)', color: '#FFFDF9', borderRadius: '4px', padding: '0.1rem 0.4rem', fontSize: '0.7rem', cursor: 'pointer' }}
                    title="+₹25,000"
                  >
                    +25k
                  </button>
                </div>
              </div>
              <input
                id={maxRangeId}
                type="range"
                min="50000"
                max="1000000"
                step="10000"
                value={priceRange.max}
                onChange={handleMaxSliderChange}
                style={{
                  width: '100%',
                  accentColor: 'var(--gold-primary)',
                  cursor: 'pointer'
                }}
                aria-label="Maximum Price Slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#8A8074', marginTop: '0.2rem' }}>
                <span>₹50K</span>
                <span>₹5 Lakhs</span>
                <span>₹10 Lakhs+</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3C. ACTIVE FILTER CHIPS SUMMARY STRIP */}
        {hasAnyActiveFilters && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap',
              padding: '0.65rem 0.95rem',
              background: 'rgba(229, 195, 120, 0.08)',
              border: '1px solid rgba(229, 195, 120, 0.25)',
              borderRadius: '8px',
              marginBottom: '1.25rem',
              fontSize: '0.78rem'
            }}
          >
            <span style={{ color: '#DFBE6B', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Filter size={12} /> Active Filters:
            </span>

            {activeCategory !== 'all' && (
              <span
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '4px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  color: '#FFFDF9'
                }}
              >
                Category: <strong>{activeCategory}</strong>
                <button
                  type="button"
                  onClick={() => setActiveCategory('all')}
                  style={{ background: 'none', border: 'none', color: '#E5C378', cursor: 'pointer', padding: 0 }}
                  title="Remove category filter"
                >
                  <X size={12} />
                </button>
              </span>
            )}

            {isPriceRangeNarrowed && (
              <span
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '4px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  color: '#FFFDF9'
                }}
              >
                Budget: <strong>₹{priceRange.min.toLocaleString('en-IN')} – ₹{priceRange.max.toLocaleString('en-IN')}</strong>
                <button
                  type="button"
                  onClick={resetPriceRange}
                  style={{ background: 'none', border: 'none', color: '#E5C378', cursor: 'pointer', padding: 0 }}
                  title="Reset price range"
                >
                  <X size={12} />
                </button>
              </span>
            )}

            {activeShape !== 'all' && (
              <span
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '4px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  color: '#FFFDF9'
                }}
              >
                Cut: <strong>{activeShape}</strong>
                <button
                  type="button"
                  onClick={() => setActiveShape('all')}
                  style={{ background: 'none', border: 'none', color: '#E5C378', cursor: 'pointer', padding: 0 }}
                  title="Remove cut filter"
                >
                  <X size={12} />
                </button>
              </span>
            )}

            {activeOccasion !== 'all' && (
              <span
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '4px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  color: '#FFFDF9'
                }}
              >
                Occasion: <strong>{activeOccasion}</strong>
                <button
                  type="button"
                  onClick={() => setActiveOccasion('all')}
                  style={{ background: 'none', border: 'none', color: '#E5C378', cursor: 'pointer', padding: 0 }}
                  title="Remove occasion filter"
                >
                  <X size={12} />
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={handleResetFilters}
              style={{
                marginLeft: 'auto',
                background: 'transparent',
                border: 'none',
                color: '#E5C378',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <RotateCcw size={12} />
              <span>Clear All</span>
            </button>
          </div>
        )}

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

          {/* Luxury Result Dashboard */}
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
                {isPriceRangeNarrowed
                  ? `No pieces found within ₹${priceRange.min.toLocaleString('en-IN')} – ₹${priceRange.max.toLocaleString('en-IN')}. We craft custom bridal polki, solitaire cuts, and temple ornaments to any budget in our Sangmohal karigar workshop.`
                  : 'We craft custom bridal polki, solitaire cuts, and temple ornaments to any weight or budget in our Sangmohal karigar workshop.'}
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
