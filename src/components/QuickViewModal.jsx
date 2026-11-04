import React, { useState, useRef } from 'react';
import { useJewellery } from '../context/JewelleryContext';
import {
  X,
  ShieldCheck,
  ShoppingBag,
  Calendar,
  Video,
  ChevronDown,
  ChevronUp,
  MapPin,
  CheckCircle,
  Sparkles,
  Scale,
  Heart,
  Info
} from 'lucide-react';

const QuickViewModal = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    calculatePrice,
    addToCart,
    openVipBooking,
    triggerVideoCall,
    userPincode,
    setUserPincode,
    getPincodeStatus,
    toggleWishlist,
    isInWishlist
  } = useJewellery();

  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [showPriceBreakup, setShowPriceBreakup] = useState(false);
  const [pincodeVal, setPincodeVal] = useState(userPincode || '231001');
  const [pincodeStatus, setPincodeStatus] = useState(() => getPincodeStatus(userPincode || '231001'));
  const frameRef = useRef(null);

  if (!quickViewProduct) return null;

  const priceInfo = calculatePrice(quickViewProduct);
  const isWishlisted = isInWishlist(quickViewProduct.id);

  const handleMouseMove = (e) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    setUserPincode(pincodeVal);
    setPincodeStatus(getPincodeStatus(pincodeVal));
  };

  return (
    <div
      className="modal-overlay active"
      onClick={() => setQuickViewProduct(null)}
    >
      <div
        className="modal-card quickview-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar: Collection Tag, Wishlist Toggle & Close Button */}
        <div className="qv-top-bar">
          <div className="qv-collection-pill">
            <Sparkles size={13} className="qv-sparkle-gold" />
            <span>SHOWROOM MASTERPIECE • SANGMOHAL COLLECTION</span>
          </div>

          <div className="qv-top-actions">
            {/* Wishlist Button */}
            <button
              type="button"
              className={`qv-action-btn ${isWishlisted ? 'wishlisted' : ''}`}
              onClick={() => toggleWishlist(quickViewProduct)}
              title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
              aria-label="Wishlist"
            >
              <Heart
                size={17}
                fill={isWishlisted ? '#E5C378' : 'none'}
                color={isWishlisted ? '#E5C378' : '#FFFDF9'}
              />
            </button>

            {/* Close Button */}
            <button
              type="button"
              className="qv-close-btn"
              onClick={() => setQuickViewProduct(null)}
              title="Close (Esc)"
              aria-label="Close Modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="quickview-modal-grid">
          {/* Left Column: High-Res Zoom Frame & Quality Guarantees */}
          <div className="qv-left-col">
            <div
              className="zoom-frame"
              ref={frameRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                style={{
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transform: isHovered ? 'scale(2.3)' : 'scale(1)',
                  transition: isHovered ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/images/store/store_display_jewellery.jpg';
                }}
              />
              <div className="zoom-guide-bar">
                <span>🔍 Move cursor over jewellery to inspect filigree & Hallmark (2.3× Zoom)</span>
              </div>
            </div>

            {/* Trust Badges Trio Below Image */}
            <div className="qv-guarantee-grid">
              <div className="qv-guarantee-item">
                <ShieldCheck size={15} className="guarantee-icon green" />
                <div className="guarantee-text">
                  <strong>Govt 6-Digit HUID</strong>
                  <span>BIS 916 Pure Hallmarked</span>
                </div>
              </div>

              <div className="qv-guarantee-item">
                <Sparkles size={15} className="guarantee-icon gold" />
                <div className="guarantee-text">
                  <strong>100% Lifetime</strong>
                  <span>Exchange & Buyback</span>
                </div>
              </div>

              <div className="qv-guarantee-item span-2">
                <Scale size={15} className="guarantee-icon gold" />
                <div className="guarantee-text">
                  <strong>Free Live Karatmeter Testing</strong>
                  <span>Instant computerized purity verification at showroom</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details, Price Breakdown, Pincode & CTAs */}
          <div className="qv-right-col">
            {/* Meta Tags */}
            <div className="qv-meta-tags-row">
              <span className="qv-category-badge">{quickViewProduct.categoryLabel}</span>
              {quickViewProduct.shape && (
                <span className="qv-shape-badge">
                  {quickViewProduct.shape} Cut
                </span>
              )}
              <span className="qv-hallmark-badge">
                <ShieldCheck size={12} />
                <span>{quickViewProduct.purity}</span>
              </span>
              <span className="qv-sku-tag">SKU: {quickViewProduct.id}</span>
            </div>

            {/* Product Headings */}
            <h2 className="qv-product-title">{quickViewProduct.name}</h2>
            {quickViewProduct.hindiName && (
              <div className="qv-product-hindi">{quickViewProduct.hindiName}</div>
            )}

            {/* Editorial Description */}
            <p className="qv-product-desc">{quickViewProduct.description}</p>

            {/* Bespoke 4-Cell Specifications Matrix (Clean & No Collisions!) */}
            <div className="qv-specs-matrix">
              <div className="spec-cell">
                <span className="spec-label">Net Gold Weight</span>
                <strong className="spec-val highlight">
                  {quickViewProduct.netGoldWeight || quickViewProduct.grossWeight}
                </strong>
              </div>

              <div className="spec-cell">
                <span className="spec-label">Gross Weight</span>
                <strong className="spec-val">
                  {quickViewProduct.grossWeight}
                </strong>
              </div>

              <div className="spec-cell full-width">
                <span className="spec-label">Stone & Karigari Details</span>
                <strong className="spec-val">
                  {quickViewProduct.stoneType || 'Pure 22K Solid Gold Handcrafted'}
                </strong>
              </div>

              <div className="spec-cell full-width availability">
                <span className="spec-label">Showroom Availability</span>
                <strong className="spec-val in-stock">
                  <span className="live-pulse-dot"></span>
                  Ready in Sangmohal VIP Lounge (Instant Trial)
                </strong>
              </div>
            </div>

            {/* Live Bullion Computed Price Box */}
            <div className="qv-price-card">
              <div className="qv-price-top-row">
                <div className="qv-price-meta-label">
                  LIVE BULLION COMPUTED PRICE
                </div>
                <button
                  type="button"
                  className="qv-breakup-toggle-btn"
                  onClick={() => setShowPriceBreakup(!showPriceBreakup)}
                >
                  <Info size={13} />
                  <span>{showPriceBreakup ? 'Hide Breakup' : 'Price Breakup'}</span>
                  {showPriceBreakup ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>

              <div className="qv-price-amount-row">
                <div className="qv-main-price">{priceInfo.formattedTotalPrice}</div>
                <div className="qv-price-rates-sub">
                  Rate: ₹{priceInfo.ratePerGram?.toLocaleString('en-IN')}/g • {priceInfo.makingPercent}% Making • 3% GST Included
                </div>
              </div>

              {/* Collapsible Transparent Breakup */}
              {showPriceBreakup && (
                <div className="qv-price-breakdown-list">
                  <div className="breakdown-item">
                    <span>Gold Metal Value ({priceInfo.weightGrams}g × ₹{priceInfo.ratePerGram?.toLocaleString('en-IN')}/g):</span>
                    <strong>₹{priceInfo.metalValue?.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="breakdown-item">
                    <span>Making Charges ({priceInfo.makingPercent}%):</span>
                    <strong>₹{priceInfo.makingCharge?.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="breakdown-item">
                    <span>GST (3% Govt. Tax):</span>
                    <strong>₹{priceInfo.gst?.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="breakdown-item total">
                    <span>Final Transparent Price:</span>
                    <strong>{priceInfo.formattedTotalPrice}</strong>
                  </div>
                </div>
              )}
            </div>

            {/* PINCODE TRIAL & DELIVERY CHECKER */}
            <div className="qv-pincode-card">
              <div className="pincode-header-row">
                <MapPin size={14} className="pincode-map-icon" />
                <span>Showroom Trial & Delivery to Pincode:</span>
              </div>
              <form onSubmit={handlePincodeCheck} className="pincode-form-row">
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeVal}
                  onChange={(e) => setPincodeVal(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit Pincode (e.g. 231001)"
                  className="pincode-input"
                  aria-label="Delivery Pincode"
                />
                <button type="submit" className="pincode-check-btn">
                  Check
                </button>
              </form>
              {pincodeStatus.isValid && (
                <div className="pincode-result-msg">
                  <CheckCircle size={13} className="pincode-check-icon" />
                  <span><strong>{pincodeStatus.title}:</strong> {pincodeStatus.message}</span>
                </div>
              )}
            </div>

            {/* Primary Action Buttons (Always visible and easily accessible!) */}
            <div className="qv-actions-cluster">
              <div className="qv-cta-dual-row">
                <button
                  type="button"
                  className="qv-btn-bag"
                  onClick={() => {
                    addToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                >
                  <ShoppingBag size={17} />
                  <span>Add to Royal Bag</span>
                </button>

                <button
                  type="button"
                  className="qv-btn-trial"
                  onClick={() => {
                    setQuickViewProduct(null);
                    openVipBooking('store');
                  }}
                >
                  <Calendar size={17} />
                  <span>Book In-Store Trial</span>
                </button>
              </div>

              {/* 4K WhatsApp Video Shopping Button */}
              <button
                type="button"
                className="qv-btn-videocall"
                onClick={() => triggerVideoCall(quickViewProduct)}
              >
                <Video size={17} />
                <span>See on 4K WhatsApp Video Call (Live Karigar)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;