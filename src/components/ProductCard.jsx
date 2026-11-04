import React from 'react';
import { useJewellery } from '../context/JewelleryContext';
import { STORE_INFO } from '../data/storeInfo';
import { Heart, Eye, ShoppingBag, ShieldCheck } from 'lucide-react';

const ProductCard = ({ product }) => {
  const {
    calculatePrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct
  } = useJewellery();

  const priceInfo = calculatePrice(product);
  const isWished = isInWishlist(product.id);

  return (
    <div className="ecom-card">
      {/* Top Image Holder */}
      <div className="card-img-holder">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onClick={() => setQuickViewProduct(product)}
          style={{ cursor: 'pointer' }}
        />

        {/* Badge if exists */}
        {product.badge && (
          <span className="card-badge-tag">{product.badge}</span>
        )}

        {/* Hallmark Tag */}
        <span className="card-hallmark-tag">
          <ShieldCheck size={12} style={{ color: 'var(--brand-plum)' }} />
          <span>{product.purity}</span>
        </span>

        {/* Wishlist Button */}
        <button
          className={`card-wishlist-btn ${isWished ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          title={isWished ? 'Remove from Wishlist' : 'Save to Wishlist'}
          aria-label="Wishlist"
        >
          <Heart size={16} fill={isWished ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Card Content */}
      <div className="card-content">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
          <span className="card-category-lbl">{product.categoryLabel}</span>
          {product.shape && (
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                textTransform: 'capitalize',
                color: 'var(--gold-dark)',
                background: 'var(--gold-soft)',
                border: '1px solid var(--gold-border)',
                padding: '0.12rem 0.45rem',
                borderRadius: '4px'
              }}
            >
              {product.shape} Cut
            </span>
          )}
        </div>

        <h3
          className="card-title"
          onClick={() => setQuickViewProduct(product)}
          style={{ cursor: 'pointer' }}
        >
          {product.name}
        </h3>

        {product.hindiName && (
          <div className="card-subtitle">{product.hindiName}</div>
        )}

        {/* Weight and Stone Specs */}
        <div className="card-specs-row">
          <span>Net Gold: <strong>{product.netGoldWeight || product.grossWeight}</strong></span>
          <span>HUID: <strong>Verified</strong></span>
        </div>

        {/* Live Computed Price */}
        <div className="card-price-block">
          <div>
            <div className="card-price">
              {priceInfo.formattedTotalPrice}
            </div>
            <div className="card-making-sub">
              (Live Gold + {priceInfo.makingPercent}% Making + 3% GST)
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="card-buttons-row">
          <button
            className="btn btn-primary"
            style={{ flex: '1 1 auto', padding: '0.65rem 0.5rem', fontSize: '0.82rem' }}
            onClick={() => addToCart(product)}
            title="Add to Shopping Bag"
          >
            <ShoppingBag size={14} />
            <span>Add to Bag</span>
          </button>

          <button
            className="btn btn-outline"
            style={{ padding: '0.65rem 0.6rem', fontSize: '0.82rem' }}
            onClick={() => setQuickViewProduct(product)}
            title="View Details & Certificate"
          >
            <Eye size={14} />
            <span>Quick View</span>
          </button>

          <button
            className="btn-card-wa"
            onClick={(e) => {
              e.stopPropagation();
              const text = `Namaste Rajesh Jewellers (${STORE_INFO.hindiName}), I am interested in *${product.name}* (${product.purity}, Approx ${priceInfo.formattedTotalPrice}). Is this design available in your Sangmohal, Mirzapur showroom for viewing?`;
              const cleanPhone = STORE_INFO.whatsapp.replace(/[^0-9]/g, '');
              window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
            }}
            title="Inquire on WhatsApp"
            aria-label="Inquire on WhatsApp"
          >
            <span style={{ fontSize: '1rem', lineHeight: 1 }}>💬</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
