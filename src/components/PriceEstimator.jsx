import React, { useState } from 'react';
import { useJewellery } from '../context/JewelleryContext';
import { STORE_INFO } from '../data/storeInfo';
import { MessageCircle, Plus, Minus, Check, Sparkles, ShieldCheck } from 'lucide-react';

const PriceEstimator = () => {
  const { liveRates } = useJewellery();

  const [purity, setPurity] = useState('gold22k');
  const [weight, setWeight] = useState(10);
  const [makingPercent, setMakingPercent] = useState(10);

  // Rate per gram based on selected purity
  let currentRate = liveRates.gold22k;
  if (purity === 'gold24k') currentRate = liveRates.gold24k;
  else if (purity === 'gold18k') currentRate = liveRates.gold18k;

  const validWeight = Math.max(0.1, parseFloat(weight) || 0);
  const metalValue = Math.round(currentRate * validWeight);
  const makingCharges = Math.round((metalValue * makingPercent) / 100);
  const subtotal = metalValue + makingCharges;
  const gst = Math.round(subtotal * 0.03);
  const grandTotal = subtotal + gst;

  const purityOptions = [
    {
      id: 'gold22k',
      label: '22K Gold',
      sub: 'BIS 916 Hallmark',
      badge: 'MOST POPULAR',
      rate: liveRates.gold22k
    },
    {
      id: 'gold24k',
      label: '24K Gold',
      sub: '999 Pure Bullion',
      badge: '99.9% PURE',
      rate: liveRates.gold24k
    },
    {
      id: 'gold18k',
      label: '18K Gold',
      sub: 'Diamond Jewelry',
      badge: 'DIAMOND CRAFT',
      rate: liveRates.gold18k
    }
  ];

  const quickWeights = [
    { label: '5g', val: 5 },
    { label: '8g (1 Tola)', val: 8 },
    { label: '10g', val: 10 },
    { label: '16g (2 Tola)', val: 16 },
    { label: '20g', val: 20 },
    { label: '50g', val: 50 },
    { label: '100g', val: 100 }
  ];

  const makingCategories = [
    {
      percent: 8,
      title: 'Chains & Plain',
      desc: 'सादी चेन व कड़े • Lightweight Daily'
    },
    {
      percent: 10,
      title: 'Necklaces & Sets',
      desc: 'हार व फैंसी सेट • Filigree (POPULAR)',
      popular: true
    },
    {
      percent: 14,
      title: 'Bridal & Temple',
      desc: 'शाही ब्राइडल व कुंदन • Antique'
    }
  ];

  const handleWeightInput = (e) => {
    const val = e.target.value;
    if (val === '') {
      setWeight('');
    } else {
      const num = parseFloat(val);
      if (!isNaN(num)) {
        setWeight(Math.min(1000, num));
      }
    }
  };

  const incrementWeight = () => {
    const curr = parseFloat(weight) || 0;
    setWeight(Math.min(1000, Math.round((curr + 1) * 10) / 10));
  };

  const decrementWeight = () => {
    const curr = parseFloat(weight) || 0;
    if (curr > 1) {
      setWeight(Math.max(0.5, Math.round((curr - 1) * 10) / 10));
    }
  };

  const handleShareEstimate = () => {
    const activeOpt = purityOptions.find((p) => p.id === purity) || purityOptions[0];
    const tolaVal = (validWeight / 8).toFixed(2);
    const text =
      `*👑 RAJESH JEWELLERS - SANGMOHAL, MIRZAPUR*\n` +
      `*🏛️ Live Gold Price & Making Estimate Slip*\n` +
      `───────────────────────\n` +
      `• *Purity:* ${activeOpt.label} (${activeOpt.sub})\n` +
      `• *Weight:* ${validWeight} Grams (≈ ${tolaVal} Tola)\n` +
      `• *Today's Rate:* ₹${currentRate.toLocaleString('en-IN')}/g\n` +
      `───────────────────────\n` +
      `• *Gold Metal Value:* ₹${metalValue.toLocaleString('en-IN')}\n` +
      `• *Making Charges (${makingPercent}%):* ₹${makingCharges.toLocaleString('en-IN')}\n` +
      `• *Subtotal:* ₹${subtotal.toLocaleString('en-IN')}\n` +
      `• *GST (3% Govt. Tax):* ₹${gst.toLocaleString('en-IN')}\n` +
      `───────────────────────\n` +
      `*💰 Total Estimated Price:* ₹${grandTotal.toLocaleString('en-IN')}\n` +
      `_(Kar Sahit / All Taxes Included)_\n\n` +
      `📍 *Showroom:* Sangmohal, Mirzapur (U.P.)\n` +
      `✓ 100% BIS 916 Hallmark (HUID)\n` +
      `✓ Free digital Karatmeter purity test available.\n` +
      `Namaste Rajesh Jewellers team, please confirm this estimate for today's visit/booking.`;

    const cleanPhone = STORE_INFO.whatsapp.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const activePurityObj = purityOptions.find((p) => p.id === purity) || purityOptions[0];
  const tolaEquivalent = (validWeight / 8).toFixed(2);

  return (
    <section className="calc-section" id="calculator">
      <div className="container">
        <div className="calc-simple-container">
          {/* Compact Unified Luxury Header */}
          <div className="calc-simple-header">
            <div className="calc-header-top-row">
              <h2 className="calc-simple-title">गोल्ड मूल्य कैलकुलेटर</h2>
              <div className="calc-header-badge">
                <Sparkles size={11} style={{ color: '#E5C378' }} />
                <span>100% Transparent MCX Benchmark • Sangmohal Showroom</span>
              </div>
            </div>
            <p className="calc-simple-subtitle">
              Live Bullion Rate &amp; Transparent Making Charge Estimator — Instant Showroom Estimate
            </p>
          </div>

          {/* Master 2-Column Luxury Fit Card */}
          <div className="calc-simple-card">
            {/* Left Column: Interactive Inputs */}
            <div className="calc-simple-inputs">
              {/* Step 1: Purity Selector */}
              <div className="calc-field-group">
                <div className="calc-field-label-row">
                  <label className="calc-field-label">
                    <span className="calc-step-num">01</span>
                    Select Gold Purity (शुद्धता चुनें)
                  </label>
                  <span className="calc-verified-pill">
                    <ShieldCheck size={12} />
                    BIS Certified
                  </span>
                </div>

                <div className="calc-purity-tabs">
                  {purityOptions.map((opt) => {
                    const isSelected = purity === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        className={`calc-purity-tab ${isSelected ? 'active' : ''}`}
                        onClick={() => setPurity(opt.id)}
                        aria-pressed={isSelected}
                      >
                        <div className="purity-tab-header">
                          <span className={`purity-badge ${opt.id === 'gold22k' ? 'popular' : ''}`}>
                            {opt.badge}
                          </span>
                          {isSelected && (
                            <span className="purity-check-icon">
                              <Check size={10} strokeWidth={3} />
                            </span>
                          )}
                        </div>
                        <div className="purity-tab-main">
                          <span className="purity-tab-name">{opt.label}</span>
                          <span className="purity-tab-sub">{opt.sub}</span>
                        </div>
                        <div className="purity-tab-rate-pill">
                          ₹{opt.rate.toLocaleString('en-IN')}<span className="purity-per-g">/g</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Weight Selector */}
              <div className="calc-field-group">
                <div className="calc-field-label-row">
                  <label className="calc-field-label">
                    <span className="calc-step-num">02</span>
                    Gold Weight (आभूषण का वज़न)
                  </label>
                  <span className="calc-tola-badge">
                    ≈ {tolaEquivalent} Tola (तोला)
                  </span>
                </div>

                <div className="calc-weight-input-wrap">
                  <button
                    type="button"
                    className="calc-step-btn"
                    onClick={decrementWeight}
                    aria-label="Decrease weight"
                  >
                    <Minus size={15} />
                  </button>

                  <div className="calc-weight-display">
                    <div className="calc-weight-num-row">
                      <input
                        type="number"
                        value={weight}
                        min="0.5"
                        max="1000"
                        step="0.5"
                        onChange={handleWeightInput}
                        className="calc-weight-input"
                        aria-label="Gold Weight in Grams"
                      />
                    </div>
                    <span className="calc-weight-unit">Grams (ग्राम) • {tolaEquivalent} Tola</span>
                  </div>

                  <button
                    type="button"
                    className="calc-step-btn"
                    onClick={incrementWeight}
                    aria-label="Increase weight"
                  >
                    <Plus size={15} />
                  </button>
                </div>

                {/* Quick Weight Chips */}
                <div className="calc-quick-chips">
                  {quickWeights.map((w) => (
                    <button
                      key={w.val}
                      type="button"
                      className={`calc-chip ${Number(weight) === w.val ? 'active' : ''}`}
                      onClick={() => setWeight(w.val)}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Making Charges */}
              <div className="calc-field-group">
                <div className="calc-field-label-row">
                  <label className="calc-field-label">
                    <span className="calc-step-num">03</span>
                    Making Charges (मेकिंग शुल्क)
                  </label>
                  <span className="calc-rate-badge">
                    {makingPercent}% RATE
                  </span>
                </div>

                <div className="calc-slider-wrap">
                  <input
                    type="range"
                    min="7"
                    max="16"
                    step="0.5"
                    value={makingPercent}
                    onChange={(e) => setMakingPercent(parseFloat(e.target.value))}
                    className="calc-simple-slider"
                    aria-label="Making charge percentage"
                  />
                  <div className="calc-slider-scale">
                    <span>7% (Plain / Min)</span>
                    <span className="calc-scale-center">Showroom Benchmark</span>
                    <span>16% (Bridal)</span>
                  </div>
                </div>

                {/* Professional Streamlined Category Cards */}
                <div className="calc-category-cards">
                  {makingCategories.map((cat) => {
                    const isSelected = makingPercent === cat.percent;
                    return (
                      <button
                        key={cat.percent}
                        type="button"
                        className={`calc-category-card ${isSelected ? 'active' : ''}`}
                        onClick={() => setMakingPercent(cat.percent)}
                      >
                        <div className="cat-card-top">
                          <span className="cat-rate">{cat.percent}%</span>
                          <span className="cat-title">{cat.title}</span>
                          {cat.popular && <span className="cat-popular-pill">POPULAR</span>}
                        </div>
                        <span className="cat-desc">{cat.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Compact Prestigious Estimate Slip */}
            <div className="calc-simple-summary">
              {/* Receipt Header with RJ Emblem */}
              <div className="calc-receipt-header">
                <div className="calc-rj-brand">
                  <div className="calc-rj-emblem">RJ</div>
                  <div className="calc-rj-info">
                    <strong className="calc-brand-title">RAJESH JEWELLERS</strong>
                    <span className="calc-brand-sub">SANGMOHAL, MIRZAPUR</span>
                  </div>
                </div>
                <div className="calc-live-pill">
                  <span className="calc-live-dot"></span>
                  LIVE ESTIMATE
                </div>
              </div>

              {/* Subheader Pill */}
              <div className="calc-summary-purity-tag">
                <span>{activePurityObj.label}</span>
                <span className="tag-dot">•</span>
                <span>{validWeight}g</span>
                <span className="tag-dot">•</span>
                <span>≈ {tolaEquivalent} Tola</span>
                <span className="tag-dot">•</span>
                <span>₹{currentRate.toLocaleString('en-IN')}/g</span>
              </div>

              {/* Breakdown Rows */}
              <div className="calc-summary-rows">
                <div className="calc-summary-row">
                  <span className="row-main-label">Gold Metal Value ({validWeight}g × ₹{currentRate.toLocaleString('en-IN')})</span>
                  <strong className="row-val">₹{metalValue.toLocaleString('en-IN')}</strong>
                </div>

                <div className="calc-summary-row">
                  <span className="row-main-label">Making Charges ({makingPercent}% कारीगरी)</span>
                  <strong className="row-val">+ ₹{makingCharges.toLocaleString('en-IN')}</strong>
                </div>

                <div className="calc-summary-row net-subtotal">
                  <span className="row-main-label">Net Subtotal (सोना + मेकिंग)</span>
                  <strong className="row-val">₹{subtotal.toLocaleString('en-IN')}</strong>
                </div>

                <div className="calc-summary-row">
                  <span className="row-main-label">Govt. GST (3% पक्का बिल)</span>
                  <strong className="row-val">+ ₹{gst.toLocaleString('en-IN')}</strong>
                </div>
              </div>

              {/* Gold Filigree Divider */}
              <div className="calc-filigree-divider">
                <span></span>
                <i>◆</i>
                <span></span>
              </div>

              {/* Grand Total Box */}
              <div className="calc-total-box">
                <div className="calc-total-label">TOTAL ESTIMATED PRICE (कर सहित)</div>
                <div className="calc-total-amount">₹{grandTotal.toLocaleString('en-IN')}</div>
              </div>

              {/* WhatsApp Action Button */}
              <button
                type="button"
                className="btn-simple-whatsapp"
                onClick={handleShareEstimate}
              >
                <MessageCircle size={18} />
                <span>Lock Estimate on WhatsApp in 2 Minutes</span>
              </button>

              {/* Showroom Trust Guarantees */}
              <div className="calc-simple-guarantee">
                <span>✓ 100% BIS 916 Hallmark</span>
                <span>•</span>
                <span>Free Karatmeter Testing</span>
                <span>•</span>
                <span>Sangmohal Showroom</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceEstimator;
