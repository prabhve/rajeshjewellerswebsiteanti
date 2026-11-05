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
  Gem,
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

  // Traditional Tola calculations (Mirzapur/Eastern UP standard: 1 Tola = 10g metric / 8g traditional)
  const tolaMetric = (validWeight / 10).toFixed(2);
  const tolaTraditional = (validWeight / 8).toFixed(2);

  const purityOptions = [
    {
      id: 'gold22k',
      label: '22K Gold',
      fineness: '91.6% Pure (BIS 916)',
      tag: 'Most Chosen for Jewellery',
      desc: 'Ideal for necklaces, chains, bangles & bridal sets',
      rate: liveRates.gold22k,
      popular: true
    },
    {
      id: 'gold24k',
      label: '24K Gold',
      fineness: '99.9% Pure (999)',
      tag: 'Pure Investment Bullion',
      desc: 'Certified gold coins, mint biscuits & savings bars',
      rate: liveRates.gold24k,
      popular: false
    },
    {
      id: 'gold18k',
      label: '18K Gold',
      fineness: '75.0% Pure (750)',
      tag: 'Diamond & Daily Wear',
      desc: 'High-strength alloy engineered for diamond studding',
      rate: liveRates.gold18k,
      popular: false
    }
  ];

  const quickWeights = [
    { label: '5g', val: 5, hint: 'Light Tops / Ring' },
    { label: '8g (1 Tola)', val: 8, hint: '1 Traditional Tola' },
    { label: '10g (1 Tola)', val: 10, hint: '1 Metric Tola' },
    { label: '16g (2 Tola)', val: 16, hint: 'Daily Wear Chain' },
    { label: '24g (3 Tola)', val: 24, hint: 'Partywear Choker' },
    { label: '40g (5 Tola)', val: 40, hint: 'Bridal Haar Set' },
    { label: '80g (10 Tola)', val: 80, hint: 'Royal Bridal Trousseau' }
  ];

  const makingCategories = [
    {
      percent: 8,
      title: 'Chains & Daily Wear',
      desc: 'सादी चेन, कड़े व हल्के आभूषण • Machine Finish',
      tag: '8% Craftsmanship'
    },
    {
      percent: 10,
      title: 'Necklaces & Fancy Sets',
      desc: 'बारीक जालीदार हार, झुमकी व पार्टी वियर • Filigree',
      tag: '10% Benchmark',
      popular: true
    },
    {
      percent: 14,
      title: 'Royal Bridal & Antique',
      desc: 'शाही ब्राइडल, कुंदन, मीनाकारी व टेम्पल ज्वेलरी',
      tag: '14% Master Craft'
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
      `• *Weight:* ${validWeight} Grams (≈ ${tolaMetric} Tola / ${tolaTraditional} Vedic Tola)\n` +
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
          {/* Majestic Royal Header */}
          <div className="calc-bespoke-header">
            <div className="calc-eyebrow-row">
              <span className="calc-eyebrow-accent">RAJESH JEWELLERS</span>
              <span className="calc-eyebrow-sep">◆</span>
              <span>SANGMOHAL ATELIER</span>
              <span className="calc-eyebrow-sep">◆</span>
              <span className="calc-eyebrow-gold">100% TRANSPARENT BENCHMARK</span>
            </div>

            <h2 className="calc-bespoke-title">
              गोल्ड मूल्य एवं मेकिंग कैलकुलेटर
            </h2>

            <p className="calc-bespoke-subtitle">
              Calculate live bullion rates, artisan making charges, and 3% Govt. GST with complete hallmark transparency before visiting our Sangmohal showroom.
            </p>

            {/* Clean Unboxed Trust Separators (Anti-Slop Discipline) */}
            <div className="calc-trust-metadata">
              <span>MCX Live Rates</span>
              <span className="meta-dot">·</span>
              <span>100% BIS 916 Hallmark HUID</span>
              <span className="meta-dot">·</span>
              <span>Govt. Tax Invoice</span>
              <span className="meta-dot">·</span>
              <span>Free German Karatmeter Testing</span>
            </div>
          </div>

          {/* Master 2-Column Luxury Atelier Pavilion */}
          <div className="calc-bespoke-pavilion">
            {/* Left Column: Interactive Valuation Studio */}
            <div className="calc-studio-col">
              {/* Step 1: Purity Selector */}
              <div className="calc-step-chamber">
                <div className="calc-step-header">
                  <div className="calc-step-title-group">
                    <span className="calc-step-index">01</span>
                    <h3 className="calc-step-heading">
                      Select Gold Purity <span>(सोने की शुद्धता चुनें)</span>
                    </h3>
                  </div>
                  <span className="calc-step-note">
                    <ShieldCheck size={14} className="text-amber-300" />
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
                          <span className="karat-tag">{opt.tag}</span>
                          <span className="karat-select-indicator">
                            {isSelected ? <Check size={12} strokeWidth={3} /> : null}
                          </span>
                        </div>

                        <div className="karat-card-body">
                          <strong className="karat-name">{opt.label}</strong>
                          <span className="karat-fineness">{opt.fineness}</span>
                          <p className="karat-desc">{opt.desc}</p>
                        </div>

                        <div className="karat-card-rate">
                          <span className="karat-rate-val">₹{opt.rate.toLocaleString('en-IN')}</span>
                          <span className="karat-rate-unit">/ gram</span>
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
                      Gold Weight <span>(आभूषण का वज़न)</span>
                    </h3>
                  </div>
                  <span className="calc-tola-readout">
                    ≈ {tolaMetric} Metric Tola (10g) · {tolaTraditional} Vedic Tola (8g)
                  </span>
                </div>

                {/* Tactile Master Weight Controller */}
                <div className="calc-weight-console">
                  <button
                    type="button"
                    className="calc-stepper-btn minus"
                    onClick={decrementWeight}
                    aria-label="Decrease weight by 1 gram"
                  >
                    <Minus size={18} />
                  </button>

                  <div className="calc-weight-primary-display">
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
                    <span className="calc-weight-conversion-caption">
                      Equates to {tolaMetric} Tola standard · {Math.round(validWeight * 8)} Ratti approx.
                    </span>
                  </div>

                  <button
                    type="button"
                    className="calc-stepper-btn plus"
                    onClick={incrementWeight}
                    aria-label="Increase weight by 1 gram"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                {/* Refined Indian Quick-Weight Preset Strips */}
                <div className="calc-weight-presets-bar">
                  <span className="presets-label">Popular Weights:</span>
                  <div className="presets-list">
                    {quickWeights.map((w) => {
                      const isActive = Number(weight) === w.val;
                      return (
                        <button
                          key={w.val}
                          type="button"
                          className={`preset-btn ${isActive ? 'active' : ''}`}
                          onClick={() => setWeight(w.val)}
                          title={w.hint}
                        >
                          <span className="preset-val">{w.label}</span>
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
                      Artisan Making Charges <span>(कारीगरी शुल्क)</span>
                    </h3>
                  </div>
                  <div className="calc-making-live-badge">
                    <span className="making-live-percent">{makingPercent}%</span>
                    <span className="making-live-rupees">₹{makingCharges.toLocaleString('en-IN')} Artistry</span>
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
                    <span>7% (Minimal Machine)</span>
                    <span className="scale-center-indicator">10% Showroom Standard Benchmark</span>
                    <span>16% (Royal Bridal Antique)</span>
                  </div>
                </div>

                {/* 3 Craftsmanship Tier Selection Cards */}
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
                          <span className="craft-tier-tag">{cat.tag}</span>
                        </div>
                        <strong className="craft-tier-title">{cat.title}</strong>
                        <p className="craft-tier-desc">{cat.desc}</p>
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
                    <span>Live Estimate</span>
                  </div>
                </div>

                {/* Active Parameters Ribbon */}
                <div className="calc-memo-spec-ribbon">
                  <span className="spec-item-purity">{activePurityObj.label}</span>
                  <span className="spec-sep">•</span>
                  <span className="spec-item-weight">{validWeight}g</span>
                  <span className="spec-sep">•</span>
                  <span className="spec-item-tola">≈ {tolaMetric} Tola</span>
                  <span className="spec-sep">•</span>
                  <span className="spec-item-rate">₹{currentRate.toLocaleString('en-IN')}/g</span>
                </div>

                {/* Itemized Calculation Breakdown Ledger */}
                <div className="calc-memo-ledger">
                  <div className="ledger-entry">
                    <div className="ledger-desc">
                      <span className="ledger-title">Pure Gold Metal Value</span>
                      <span className="ledger-formula">{validWeight}g × ₹{currentRate.toLocaleString('en-IN')} base rate</span>
                    </div>
                    <strong className="ledger-amount">₹{metalValue.toLocaleString('en-IN')}</strong>
                  </div>

                  <div className="ledger-entry">
                    <div className="ledger-desc">
                      <span className="ledger-title">Artisan Making Charges ({makingPercent}%)</span>
                      <span className="ledger-formula">Goldsmith filigree, hallmarking &amp; crafting</span>
                    </div>
                    <strong className="ledger-amount add">+ ₹{makingCharges.toLocaleString('en-IN')}</strong>
                  </div>

                  <div className="ledger-entry subtotal-entry">
                    <div className="ledger-desc">
                      <span className="ledger-title">Net Showroom Subtotal</span>
                      <span className="ledger-formula">Pure bullion metal + artisan making</span>
                    </div>
                    <strong className="ledger-amount highlight">₹{subtotal.toLocaleString('en-IN')}</strong>
                  </div>

                  <div className="ledger-entry">
                    <div className="ledger-desc">
                      <span className="ledger-title">Govt. GST (3%)</span>
                      <span className="ledger-formula">Official tax invoice with HUID laser certificate</span>
                    </div>
                    <strong className="ledger-amount add">+ ₹{gst.toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                {/* Royal Filigree Ornament Separator */}
                <div className="calc-memo-filigree-line">
                  <span className="line-segment"></span>
                  <span className="filigree-emblem">✦ RJ ✦</span>
                  <span className="line-segment"></span>
                </div>

                {/* Grand Total Showcase Box */}
                <div className="calc-grand-total-showcase">
                  <div className="grand-total-label-wrap">
                    <span className="grand-total-label">TOTAL ESTIMATED PRICE (कर सहित)</span>
                    <span className="grand-total-tag">Final All-Inclusive Amount</span>
                  </div>
                  <div className="grand-total-amount-display">
                    <span className="currency-symbol">₹</span>
                    <span className="amount-digits">{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <span className="grand-total-guarantee-note">
                    Verified live at showroom on German Karatmeter with zero wastage deduction.
                  </span>
                </div>

                {/* Action CTAs */}
                <div className="calc-memo-actions">
                  <button
                    type="button"
                    className="btn-royal-whatsapp-lock"
                    onClick={handleShareEstimate}
                  >
                    <MessageCircle size={18} className="whatsapp-icon" />
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
                          <CheckCheck size={15} className="text-emerald-400" />
                          <span className="text-emerald-300">Slip Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={15} />
                          <span>Copy Breakdown Slip</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      className="btn-memo-reset"
                      onClick={handleReset}
                      title="Reset calculator to default 10g 22K"
                    >
                      <RotateCcw size={14} />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>

                {/* Showroom Authenticity Badges */}
                <div className="calc-memo-footer-trust">
                  <div className="trust-item">
                    <Award size={13} className="text-amber-400" />
                    <span>100% BIS 916 Hallmark (HUID)</span>
                  </div>
                  <div className="trust-sep">·</div>
                  <div className="trust-item">
                    <Scale size={13} className="text-amber-400" />
                    <span>Free Karatmeter Testing</span>
                  </div>
                  <div className="trust-sep">·</div>
                  <div className="trust-item">
                    <Gem size={13} className="text-amber-400" />
                    <span>Sangmohal Showroom</span>
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
