import React, { useState } from 'react';
import { useJewellery } from '../context/JewelleryContext';
import { STORE_INFO } from '../data/storeInfo';
import { 
  MessageCircle, 
  Plus, 
  Minus, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Copy, 
  CheckCheck, 
  RotateCcw,
  Scale,
  Award
} from 'lucide-react';

const PriceEstimator = () => {
  const { liveRates } = useJewellery();

  const [purity, setPurity] = useState('gold22k');
  const [weight, setWeight] = useState(10);
  const [makingPercent, setMakingPercent] = useState(10);
  const [copied, setCopied] = useState(false);

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

  // Traditional Tola calculations
  const tolaMetric = (validWeight / 10).toFixed(2);
  const tolaTraditional = (validWeight / 8).toFixed(2);

  const purityOptions = [
    {
      id: 'gold22k',
      label: '22K Gold',
      fineness: 'BIS 916 (91.6%)',
      tag: 'Jewellery',
      rate: liveRates.gold22k,
      popular: true
    },
    {
      id: 'gold24k',
      label: '24K Gold',
      fineness: '999 (99.9% Pure)',
      tag: 'Bullion',
      rate: liveRates.gold24k,
      popular: false
    },
    {
      id: 'gold18k',
      label: '18K Gold',
      fineness: '750 (Diamond Craft)',
      tag: 'Diamond',
      rate: liveRates.gold18k,
      popular: false
    }
  ];

  const quickWeights = [
    { label: '5g', val: 5 },
    { label: '8g (1T)', val: 8, hint: '1 Vedic Tola' },
    { label: '10g (1T)', val: 10, hint: '1 Metric Tola' },
    { label: '16g (2T)', val: 16 },
    { label: '24g (3T)', val: 24 },
    { label: '40g (5T)', val: 40 },
    { label: '80g (10T)', val: 80 }
  ];

  const makingCategories = [
    {
      percent: 8,
      title: 'Chains & Daily',
      desc: 'सादी चेन व कड़े',
      tag: '8%'
    },
    {
      percent: 10,
      title: 'Necklaces & Sets',
      desc: 'हार, झुमकी व फैंसी',
      tag: '10% Popular',
      popular: true
    },
    {
      percent: 14,
      title: 'Bridal & Antique',
      desc: 'शाही कुंदन व ब्राइडल',
      tag: '14%'
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

  const handleReset = () => {
    setPurity('gold22k');
    setWeight(10);
    setMakingPercent(10);
  };

  const activePurityObj = purityOptions.find((p) => p.id === purity) || purityOptions[0];

  const generateEstimateText = () => {
    return (
      `*👑 RAJESH JEWELLERS - SANGMOHAL, MIRZAPUR*\n` +
      `*🏛️ Live Gold Price & Making Estimate Slip*\n` +
      `───────────────────────\n` +
      `• *Purity:* ${activePurityObj.label} (${activePurityObj.fineness})\n` +
      `• *Weight:* ${validWeight}g (≈ ${tolaMetric} Tola / ${tolaTraditional} Vedic Tola)\n` +
      `• *Today's Rate:* ₹${currentRate.toLocaleString('en-IN')}/g\n` +
      `───────────────────────\n` +
      `• *Gold Metal Value:* ₹${metalValue.toLocaleString('en-IN')}\n` +
      `• *Making Charges (${makingPercent}%):* ₹${makingCharges.toLocaleString('en-IN')}\n` +
      `• *Subtotal:* ₹${subtotal.toLocaleString('en-IN')}\n` +
      `• *Govt. GST (3%):* ₹${gst.toLocaleString('en-IN')}\n` +
      `───────────────────────\n` +
      `*💰 Total Estimated Price:* ₹${grandTotal.toLocaleString('en-IN')}\n` +
      `_(All Taxes Included / पक्का बिल)_\n\n` +
      `📍 *Showroom:* Sangmohal, Station Rd, near Jila Karagar, Mirzapur (U.P.)\n` +
      `✓ 100% BIS 916 Hallmark (Govt. Laser HUID)\n` +
      `✓ Free in-store computerized Karatmeter testing.\n` +
      `Namaste Rajesh Jewellers team, please confirm this estimate for today's visit.`
    );
  };

  const handleShareEstimate = () => {
    const text = generateEstimateText();
    const cleanPhone = STORE_INFO.whatsapp.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopyEstimate = () => {
    const text = generateEstimateText();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  return (
    <section className="calc-section" id="calculator" aria-label="Gold Price and Making Calculator">
      <div className="container">
        <div className="calc-bespoke-shell">
          {/* Streamlined Viewport-Optimized Header */}
          <div className="calc-viewport-header">
            <div className="calc-title-cluster">
              <div className="calc-brand-kicker">
                <span>RAJESH JEWELLERS</span>
                <span className="kicker-sep">◆</span>
                <span className="kicker-gold">SANGMOHAL ATELIER</span>
              </div>
              <h2 className="calc-viewport-title">
                गोल्ड मूल्य एवं मेकिंग कैलकुलेटर
              </h2>
            </div>

            <div className="calc-header-trust-bar">
              <div className="trust-pill">
                <ShieldCheck size={13} className="text-emerald-400" />
                <span>100% BIS 916 Hallmark (HUID)</span>
              </div>
              <div className="trust-pill">
                <Scale size={13} className="text-amber-400" />
                <span>MCX Live Rates</span>
              </div>
              <div className="trust-pill">
                <Award size={13} className="text-amber-400" />
                <span>Free Karatmeter Testing</span>
              </div>
            </div>
          </div>

          {/* Master 2-Column Balanced Pavilion — Viewport Perfect Fit */}
          <div className="calc-bespoke-pavilion">
            {/* Left Column: Interactive Valuation Studio */}
            <div className="calc-studio-col">
              {/* Step 1: Purity Selector */}
              <div className="calc-step-chamber">
                <div className="calc-step-header">
                  <div className="calc-step-title-group">
                    <span className="calc-step-index">01</span>
                    <h3 className="calc-step-heading">
                      Gold Purity <span>(शुद्धता)</span>
                    </h3>
                  </div>
                  <span className="calc-step-note">
                    <Check size={12} className="text-amber-300" />
                    Govt. Hallmark Certified
                  </span>
                </div>

                <div className="calc-karat-grid">
                  {purityOptions.map((opt) => {
                    const isSelected = purity === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        className={`calc-karat-card ${isSelected ? 'is-selected' : ''}`}
                        onClick={() => setPurity(opt.id)}
                        aria-pressed={isSelected}
                      >
                        <div className="karat-card-top">
                          <span className="karat-name">{opt.label}</span>
                          <span className="karat-tag">{opt.tag}</span>
                        </div>
                        <div className="karat-card-bottom">
                          <span className="karat-rate-val">₹{opt.rate.toLocaleString('en-IN')}<small>/g</small></span>
                          <span className="karat-fineness">{opt.fineness}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Weight Selector */}
              <div className="calc-step-chamber">
                <div className="calc-step-header">
                  <div className="calc-step-title-group">
                    <span className="calc-step-index">02</span>
                    <h3 className="calc-step-heading">
                      Weight <span>(वज़न)</span>
                    </h3>
                  </div>
                  <span className="calc-tola-readout">
                    ≈ {tolaMetric} Tola (10g) · {tolaTraditional} Vedic Tola (8g)
                  </span>
                </div>

                {/* Tactile Master Weight Controller */}
                <div className="calc-weight-console">
                  <div className="calc-weight-stepper-wrap">
                    <button
                      type="button"
                      className="calc-stepper-btn minus"
                      onClick={decrementWeight}
                      aria-label="Decrease weight"
                    >
                      <Minus size={16} />
                    </button>

                    <div className="calc-weight-numeric-wrap">
                      <input
                        type="number"
                        value={weight}
                        min="0.5"
                        max="1000"
                        step="0.5"
                        onChange={handleWeightInput}
                        className="calc-weight-master-input"
                        aria-label="Gold Weight in Grams"
                      />
                      <span className="calc-weight-unit-badge">Grams (ग्राम)</span>
                    </div>

                    <button
                      type="button"
                      className="calc-stepper-btn plus"
                      onClick={incrementWeight}
                      aria-label="Increase weight"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Compact Quick-Weight Presets */}
                  <div className="presets-list">
                    {quickWeights.map((w) => {
                      const isActive = Number(weight) === w.val;
                      return (
                        <button
                          key={w.val}
                          type="button"
                          className={`preset-btn ${isActive ? 'active' : ''}`}
                          onClick={() => setWeight(w.val)}
                        >
                          {w.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Step 3: Artisan Making Charges */}
              <div className="calc-step-chamber">
                <div className="calc-step-header">
                  <div className="calc-step-title-group">
                    <span className="calc-step-index">03</span>
                    <h3 className="calc-step-heading">
                      Making Charges <span>(कारीगरी शुल्क)</span>
                    </h3>
                  </div>
                  <div className="calc-making-live-badge">
                    <span className="making-live-percent">{makingPercent}%</span>
                    <span className="making-live-rupees">+ ₹{makingCharges.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Custom Gold Range Slider */}
                <div className="calc-bespoke-slider-wrap">
                  <input
                    type="range"
                    min="7"
                    max="16"
                    step="0.5"
                    value={makingPercent}
                    onChange={(e) => setMakingPercent(parseFloat(e.target.value))}
                    className="calc-gold-range-slider"
                    aria-label="Making charge percentage slider"
                  />
                  <div className="calc-slider-scale-labels">
                    <span>7% Min</span>
                    <span className="scale-center-indicator">10% Standard Benchmark</span>
                    <span>16% Bridal</span>
                  </div>
                </div>

                {/* 3 Streamlined Craft Tiers */}
                <div className="calc-craft-tiers-grid">
                  {makingCategories.map((cat) => {
                    const isSelected = makingPercent === cat.percent;
                    return (
                      <button
                        key={cat.percent}
                        type="button"
                        className={`calc-craft-tier-card ${isSelected ? 'active' : ''}`}
                        onClick={() => setMakingPercent(cat.percent)}
                      >
                        <div className="craft-tier-header">
                          <span className="craft-tier-rate">{cat.percent}%</span>
                          <span className="craft-tier-title">{cat.title}</span>
                        </div>
                        <span className="craft-tier-desc">{cat.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: The Royal Showroom Purchase Memo Slip */}
            <div className="calc-memo-col">
              <div className="calc-royal-memo-card">
                {/* Salon Memorandum Header */}
                <div className="calc-memo-header">
                  <div className="calc-memo-brand">
                    <div className="calc-memo-emblem">RJ</div>
                    <div className="calc-memo-brand-text">
                      <strong className="memo-brand-name">RAJESH JEWELLERS</strong>
                      <span className="memo-brand-location">Sangmohal Flagship Showroom · Mirzapur</span>
                    </div>
                  </div>
                  <div className="calc-memo-status-badge">
                    <span className="status-indicator-dot"></span>
                    <span>Live Slip</span>
                  </div>
                </div>

                {/* Active Parameters Ribbon */}
                <div className="calc-memo-spec-ribbon">
                  <span>{activePurityObj.label}</span>
                  <span className="spec-sep">•</span>
                  <span>{validWeight}g</span>
                  <span className="spec-sep">•</span>
                  <span>≈ {tolaMetric} Tola</span>
                  <span className="spec-sep">•</span>
                  <span>₹{currentRate.toLocaleString('en-IN')}/g</span>
                  <span className="spec-sep">•</span>
                  <span>{makingPercent}% Craft</span>
                </div>

                {/* Itemized Calculation Breakdown Ledger */}
                <div className="calc-memo-ledger">
                  <div className="ledger-entry">
                    <span className="ledger-title">Pure Gold Metal ({validWeight}g × ₹{currentRate.toLocaleString('en-IN')})</span>
                    <strong className="ledger-amount">₹{metalValue.toLocaleString('en-IN')}</strong>
                  </div>

                  <div className="ledger-entry">
                    <span className="ledger-title">Artisan Making ({makingPercent}% कारीगरी)</span>
                    <strong className="ledger-amount add">+ ₹{makingCharges.toLocaleString('en-IN')}</strong>
                  </div>

                  <div className="ledger-entry subtotal-entry">
                    <span className="ledger-title">Net Showroom Subtotal (सोना + मेकिंग)</span>
                    <strong className="ledger-amount highlight">₹{subtotal.toLocaleString('en-IN')}</strong>
                  </div>

                  <div className="ledger-entry">
                    <span className="ledger-title">Govt. GST (3% पक्का बिल - HUID)</span>
                    <strong className="ledger-amount add">+ ₹{gst.toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                {/* Grand Total Showcase Box */}
                <div className="calc-grand-total-showcase">
                  <div className="grand-total-label-wrap">
                    <span className="grand-total-label">TOTAL ESTIMATED PRICE (कर सहित)</span>
                    <span className="grand-total-tag">Final Invoice Amount</span>
                  </div>
                  <div className="grand-total-amount-display">
                    <span className="currency-symbol">₹</span>
                    <span className="amount-digits">{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <span className="grand-total-guarantee-note">
                    Verified on German Karatmeter with zero wastage deduction.
                  </span>
                </div>

                {/* Action CTAs */}
                <div className="calc-memo-actions">
                  <button
                    type="button"
                    className="btn-royal-whatsapp-lock"
                    onClick={handleShareEstimate}
                  >
                    <MessageCircle size={17} className="whatsapp-icon" />
                    <span>Lock Estimate on WhatsApp in 2 Mins</span>
                  </button>

                  <div className="calc-secondary-action-row">
                    <button
                      type="button"
                      className="btn-memo-copy"
                      onClick={handleCopyEstimate}
                      title="Copy full estimate slip to clipboard"
                    >
                      {copied ? (
                        <>
                          <CheckCheck size={14} className="text-emerald-400" />
                          <span className="text-emerald-300">Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Copy Slip</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      className="btn-memo-reset"
                      onClick={handleReset}
                      title="Reset to default"
                    >
                      <RotateCcw size={13} />
                      <span>Reset</span>
                    </button>

                    <div className="calc-quick-hallmark-tag">
                      <ShieldCheck size={12} className="text-amber-400" />
                      <span>BIS 916 Hallmark Guaranteed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceEstimator;
