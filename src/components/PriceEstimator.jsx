import React, { useState } from 'react';
import { useJewellery } from '../context/JewelleryContext';
import { STORE_INFO } from '../data/storeInfo';
import { 
  MessageCircle, 
  Plus, 
  Minus, 
  Check, 
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
  let currentRate = liveRates?.gold22k || 7163;
  if (purity === 'gold24k') currentRate = liveRates?.gold24k || 7820;
  else if (purity === 'gold18k') currentRate = liveRates?.gold18k || 5865;

  const validWeight = Math.max(0.1, parseFloat(weight) || 0);
  const metalValue = Math.round(currentRate * validWeight);
  const makingCharges = Math.round((metalValue * makingPercent) / 100);
  const subtotal = metalValue + makingCharges;
  const gst = Math.round(subtotal * 0.03);
  const grandTotal = subtotal + gst;

  // Accurate Standard Tola (11.6638g) and Pavan / Sovereign (8g) calculations
  const standardTola = (validWeight / 11.6638).toFixed(2);
  const pavanSovereign = (validWeight / 8).toFixed(2);

  const purityOptions = [
    {
      id: 'gold22k',
      label: '22K Gold',
      fineness: 'BIS 916 (91.6%)',
      category: 'Jewellery',
      tag: 'Most Popular',
      rate: liveRates?.gold22k || 7163,
      desc: 'Ideal for necklaces, chains, bangles & bridal sets'
    },
    {
      id: 'gold24k',
      label: '24K Gold',
      fineness: '999 (99.9% Pure)',
      category: 'Bullion',
      tag: 'Investment',
      rate: liveRates?.gold24k || 7820,
      desc: 'Certified gold coins, mint biscuits & savings bars'
    },
    {
      id: 'gold18k',
      label: '18K Gold',
      fineness: '750 (75.0% Pure)',
      category: 'Diamond Jewellery',
      tag: 'Diamond Craft',
      rate: liveRates?.gold18k || 5865,
      desc: 'High-strength alloy engineered for diamond studding'
    }
  ];

  const quickWeights = [
    { label: '5g', val: 5, hint: '5 grams' },
    { label: '8g', val: 8, hint: '1 Pavan / Sovereign = 8g' },
    { label: '10g', val: 10, hint: '10 grams commercial unit' },
    { label: '11.66g', val: 11.66, hint: '1 Standard Tola ≈ 11.6638g' },
    { label: '16g', val: 16, hint: '2 Pavan = 16g' },
    { label: '23.33g', val: 23.33, hint: '2 Standard Tola ≈ 23.33g' },
    { label: '40g', val: 40, hint: '5 Pavan Bridal = 40g' },
    { label: '80g', val: 80, hint: '10 Pavan Heavy Set = 80g' }
  ];

  const makingCategories = [
    {
      percent: 8,
      title: 'Chains & Daily Wear',
      hindiDesc: 'सादी चेन, कड़े व हल्के आभूषण',
      badge: '8% Minimum'
    },
    {
      percent: 10,
      title: 'Necklaces & Sets',
      hindiDesc: 'बारीक जालीदार हार, झुमकी व सेट',
      badge: '10% Benchmark',
      popular: true
    },
    {
      percent: 14,
      title: 'Bridal & Antique',
      hindiDesc: 'शाही कुंदन, मीनाकारी व ब्राइडल',
      badge: '14% Master Craft'
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
      `• *Weight:* ${validWeight}g (≈ ${standardTola} Standard Tola / ${pavanSovereign} Pavan)\n` +
      `• *Gold Benchmark Rate:* ₹${currentRate.toLocaleString('en-IN')}/g\n` +
      `───────────────────────\n` +
      `• *Pure Gold Metal Value:* ₹${metalValue.toLocaleString('en-IN')}\n` +
      `• *Artisan Making Charges (${makingPercent}%):* ₹${makingCharges.toLocaleString('en-IN')}\n` +
      `• *Net Showroom Subtotal:* ₹${subtotal.toLocaleString('en-IN')}\n` +
      `• *Govt. GST (3% Tax Invoice):* ₹${gst.toLocaleString('en-IN')}\n` +
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
    const cleanPhone = (STORE_INFO?.whatsapp || '919161123840').replace(/[^0-9]/g, '');
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
    <section className="calc-master-section" id="calculator" aria-label="Gold Price and Making Calculator">
      <div className="calc-master-wrapper">
        
        {/* Section Header */}
        <header className="calc-header-block">
          <div className="calc-kicker-row">
            <span className="calc-kicker-brand">RAJESH JEWELLERS</span>
            <span className="calc-kicker-sep">·</span>
            <span className="calc-kicker-loc">SANGMOHAL FLAGSHIP SHOWROOM, MIRZAPUR</span>
          </div>

          <h2 className="calc-heading-title">
            गोल्ड मूल्य एवं मेकिंग कैलकुलेटर
          </h2>

          <p className="calc-heading-subtitle">
            Transparent Bullion &amp; Craftsmanship Valuation • Instant Showroom Estimate Slip
          </p>

          <div className="calc-trust-badges-bar">
            <div className="calc-trust-tag">
              <ShieldCheck size={14} className="calc-trust-icon" />
              <span>100% BIS 916 Hallmark (HUID)</span>
            </div>
            <span className="calc-tag-dot">•</span>
            <div className="calc-trust-tag">
              <Scale size={14} className="calc-trust-icon" />
              <span>MCX Real-time Rates</span>
            </div>
            <span className="calc-tag-dot">•</span>
            <div className="calc-trust-tag">
              <Award size={14} className="calc-trust-icon" />
              <span>Free Karatmeter Testing</span>
            </div>
          </div>
        </header>

        {/* 2-Column Desktop Grid Layout (56% Calculator / 44% Live Price Summary) */}
        <div className="calc-two-column-layout">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: GOLD CALCULATOR (56%)                       */}
          {/* ======================================================== */}
          <div className="calc-card-panel calc-left-studio">
            
            {/* STEP 01 — GOLD PURITY */}
            <section className="calc-step-unit" aria-labelledby="step-01-title">
              <div className="calc-step-bar">
                <div className="calc-step-label-group">
                  <span className="calc-step-badge">01</span>
                  <h3 id="step-01-title" className="calc-step-title">
                    Select Gold Purity <span className="calc-hindi-hint">(शुद्धता चुनें)</span>
                  </h3>
                </div>
                <span className="calc-step-guarantee">
                  <ShieldCheck size={13} />
                  Govt. Hallmark Certified
                </span>
              </div>

              <div className="calc-purity-cards-row" role="radiogroup" aria-label="Gold purity selection">
                {purityOptions.map((opt) => {
                  const isSelected = purity === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      className={`calc-purity-select-card ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => setPurity(opt.id)}
                    >
                      <div className="purity-card-header">
                        <div className="purity-card-name-wrap">
                          <strong className="purity-card-karat">{opt.label}</strong>
                          <span className="purity-card-fineness">{opt.fineness}</span>
                        </div>
                        <div className="purity-indicator-box">
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </div>
                      </div>

                      <div className="purity-card-category-tag">
                        {opt.category}
                      </div>

                      <div className="purity-card-price-row">
                        <span className="purity-price-number">₹{opt.rate.toLocaleString('en-IN')}</span>
                        <span className="purity-price-unit">/ gram</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* STEP 02 — WEIGHT SELECTION */}
            <section className="calc-step-unit" aria-labelledby="step-02-title">
              <div className="calc-step-bar">
                <div className="calc-step-label-group">
                  <span className="calc-step-badge">02</span>
                  <h3 id="step-02-title" className="calc-step-title">
                    Weight Selection <span className="calc-hindi-hint">(आभूषण का वज़न)</span>
                  </h3>
                </div>
                <span className="calc-tola-conversion">
                  ≈ {standardTola} Standard Tola (11.6638g) · {pavanSovereign} Pavan (8g)
                </span>
              </div>

              {/* Large & Comfortable Numeric Controller */}
              <div className="calc-weight-controller-box">
                <button
                  type="button"
                  className="calc-stepper-btn"
                  onClick={decrementWeight}
                  aria-label="Decrease weight by 1 gram"
                >
                  <Minus size={18} />
                </button>

                <div className="calc-weight-input-container">
                  <input
                    type="number"
                    value={weight}
                    min="0.5"
                    max="1000"
                    step="0.5"
                    onChange={handleWeightInput}
                    className="calc-weight-field"
                    aria-label="Gold Weight in Grams"
                  />
                  <span className="calc-weight-field-unit">Grams (ग्राम)</span>
                </div>

                <button
                  type="button"
                  className="calc-stepper-btn"
                  onClick={incrementWeight}
                  aria-label="Increase weight by 1 gram"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Quick-Selection Chips */}
              <div className="calc-quick-chips-wrapper">
                <span className="calc-chips-label">Standard Sizes:</span>
                <div className="calc-chips-grid">
                  {quickWeights.map((w) => {
                    const isActive = Number(weight) === w.val;
                    return (
                      <button
                        key={w.val}
                        type="button"
                        className={`calc-chip-btn ${isActive ? 'is-active' : ''}`}
                        onClick={() => setWeight(w.val)}
                        title={w.hint || `${w.val} grams`}
                      >
                        {w.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* STEP 03 — MAKING CHARGES */}
            <section className="calc-step-unit" aria-labelledby="step-03-title">
              <div className="calc-step-bar">
                <div className="calc-step-label-group">
                  <span className="calc-step-badge">03</span>
                  <h3 id="step-03-title" className="calc-step-title">
                    Artisan Making Charges <span className="calc-hindi-hint">(मेकिंग शुल्क)</span>
                  </h3>
                </div>
                <div className="calc-making-rate-indicator">
                  <span className="making-rate-percent">{makingPercent}%</span>
                  <span className="making-rate-rupees">(+₹{makingCharges.toLocaleString('en-IN')})</span>
                </div>
              </div>

              {/* Smooth Gold Range Slider */}
              <div className="calc-slider-box">
                <input
                  type="range"
                  min="7"
                  max="16"
                  step="0.5"
                  value={makingPercent}
                  onChange={(e) => setMakingPercent(parseFloat(e.target.value))}
                  className="calc-luxury-range"
                  aria-label="Making charges percentage"
                />
                <div className="calc-slider-milestones">
                  <span>7% (Minimum)</span>
                  <span className="milestone-benchmark">10% (Standard Benchmark)</span>
                  <span>16% (Bridal / Antique)</span>
                </div>
              </div>

              {/* 3 Preset Making Category Cards */}
              <div className="calc-preset-categories-grid">
                {makingCategories.map((cat) => {
                  const isSelected = makingPercent === cat.percent;
                  return (
                    <button
                      key={cat.percent}
                      type="button"
                      className={`calc-preset-category-card ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => setMakingPercent(cat.percent)}
                    >
                      <div className="preset-card-top">
                        <span className="preset-card-rate">{cat.percent}%</span>
                        <span className="preset-card-badge">{cat.badge}</span>
                      </div>
                      <strong className="preset-card-name">{cat.title}</strong>
                      <span className="preset-card-hindi">{cat.hindiDesc}</span>
                    </button>
                  );
                })}
              </div>
            </section>

          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: LIVE PRICE SLIP / INVOICE (44%)           */}
          {/* ======================================================== */}
          <div className="calc-card-panel calc-right-slip">
            
            {/* Showroom Invoice Header */}
            <div className="slip-invoice-header">
              <div className="slip-brand-identity">
                <div className="slip-brand-monogram">RJ</div>
                <div className="slip-brand-meta">
                  <h4 className="slip-brand-title">RAJESH JEWELLERS</h4>
                  <span className="slip-brand-showroom">Sangmohal Flagship Showroom · Mirzapur</span>
                </div>
              </div>
              <div className="slip-live-indicator">
                <span className="slip-live-pulsing-dot" aria-hidden="true"></span>
                <span>LIVE SLIP</span>
              </div>
            </div>

            {/* Selected Configuration Clean Info Row */}
            <div className="slip-selected-summary-strip">
              <span className="summary-item-gold">{activePurityObj.label}</span>
              <span className="summary-sep">·</span>
              <span className="summary-item">{validWeight}g</span>
              <span className="summary-sep">·</span>
              <span className="summary-item">≈ {standardTola} Tola</span>
              <span className="summary-sep">·</span>
              <span className="summary-item">₹{currentRate.toLocaleString('en-IN')}/g</span>
              <span className="summary-sep">·</span>
              <span className="summary-item">{makingPercent}% Making</span>
            </div>

            {/* Structured Itemized Breakdown Ledger */}
            <div className="slip-breakdown-ledger">
              <div className="slip-breakdown-row">
                <div className="slip-row-label">
                  <span className="slip-row-primary">1. Pure Gold Metal Value</span>
                  <span className="slip-row-secondary">{validWeight}g × ₹{currentRate.toLocaleString('en-IN')}/g benchmark</span>
                </div>
                <strong className="slip-row-price">₹{metalValue.toLocaleString('en-IN')}</strong>
              </div>

              <div className="slip-breakdown-row">
                <div className="slip-row-label">
                  <span className="slip-row-primary">2. Artisan Making Charges ({makingPercent}%)</span>
                  <span className="slip-row-secondary">Filigree, precision crafting &amp; hallmarking</span>
                </div>
                <strong className="slip-row-price slip-price-making">+ ₹{makingCharges.toLocaleString('en-IN')}</strong>
              </div>

              <div className="slip-breakdown-row slip-row-subtotal">
                <div className="slip-row-label">
                  <span className="slip-row-primary">3. Net Showroom Subtotal</span>
                  <span className="slip-row-secondary">Pure Bullion Metal + Artisan Crafting</span>
                </div>
                <strong className="slip-row-price slip-price-subtotal">₹{subtotal.toLocaleString('en-IN')}</strong>
              </div>

              <div className="slip-breakdown-row">
                <div className="slip-row-label">
                  <span className="slip-row-primary">4. Applicable GST (3%)</span>
                  <span className="slip-row-secondary">Official Tax Invoice with Laser HUID Certificate</span>
                </div>
                <strong className="slip-row-price slip-price-gst">+ ₹{gst.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            {/* TOTAL ESTIMATED PRICE — Strongest Visual Element */}
            <div className="slip-total-showcase-box">
              <div className="slip-total-meta-row">
                <span className="slip-total-title">TOTAL ESTIMATED PRICE (कर सहित)</span>
                <span className="slip-total-tag">All-Inclusive Quotation</span>
              </div>
              <div className="slip-total-price-display">
                <span className="slip-currency-mark">₹</span>
                <span className="slip-price-digits">{grandTotal.toLocaleString('en-IN')}</span>
              </div>
              <p className="slip-total-guarantee-note">
                Final price verified on German Karatmeter with zero wastage deduction.
              </p>
            </div>

            {/* PRIMARY ACTION: WhatsApp CTA */}
            <div className="slip-actions-group">
              <button
                type="button"
                className="btn-whatsapp-estimate-lock"
                onClick={handleShareEstimate}
              >
                <MessageCircle size={19} className="whatsapp-action-icon" />
                <span>Lock Your Gold Estimate on WhatsApp</span>
              </button>

              {/* Secondary Utility Actions */}
              <div className="slip-secondary-actions-bar">
                <button
                  type="button"
                  className="btn-slip-action-secondary"
                  onClick={handleCopyEstimate}
                  title="Copy formatted price quotation to clipboard"
                >
                  {copied ? (
                    <>
                      <CheckCheck size={14} className="text-emerald-400" />
                      <span className="text-emerald-300">Quotation Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Price Slip</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="btn-slip-action-secondary"
                  onClick={handleReset}
                  title="Reset calculator to 10g 22K default"
                >
                  <RotateCcw size={14} />
                  <span>Reset Calculator</span>
                </button>
              </div>
            </div>

            {/* Slip Footer Trust Note */}
            <div className="slip-footer-trust-strip">
              <ShieldCheck size={13} className="slip-trust-icon" />
              <span>100% BIS 916 Hallmark (Govt. Laser HUID) · Sangmohal Showroom</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default React.memo(PriceEstimator);
