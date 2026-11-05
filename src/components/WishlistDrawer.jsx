import React, { useState } from 'react';
import { useJewellery } from '../context/JewelleryContext';
import { STORE_INFO } from '../data/storeInfo';
import {
  X,
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
  MessageCircle,
  Share2,
  Sparkles,
  ShieldCheck,
  Eye
} from 'lucide-react';

const WishlistDrawer = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    calculatePrice,
    clearWishlist,
    moveAllWishlistToBag,
    getWishlistTotals,
    getWishlistShareUrl,
    setQuickViewProduct
  } = useJewellery();

  const [confirmClear, setConfirmClear] = useState(false);
  const { count, formattedTotal } = getWishlistTotals();

  const handleOpenProduct = (item) => {
    setQuickViewProduct(item);
    setIsWishlistOpen(false);
  };

  return (
    <>
      <div
        className={`side-drawer-overlay ${isWishlistOpen ? 'active' : ''}`}
        onClick={() => {
          setIsWishlistOpen(false);
          setConfirmClear(false);
        }}
        aria-hidden="true"
      />
      <div
        className={`side-drawer-panel wishlist-drawer ${isWishlistOpen ? 'active' : ''}`}
        role="dialog"
        aria-label="Wishlist Drawer"
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Heart size={18} fill="#E5C378" color="#E5C378" />
              <h3>Saved Wishlist ({count})</h3>
            </div>
            {count > 0 && (
              <span style={{ fontSize: '0.78rem', color: '#DFBE6B', fontWeight: 600 }}>
                Est. Value: {formattedTotal} (Live Bullion)
              </span>
            )}
          </div>
          <button
            className="drawer-close-btn"
            onClick={() => {
              setIsWishlistOpen(false);
              setConfirmClear(false);
            }}
            aria-label="Close Wishlist"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Sub-Action Bar (when items exist) */}
        {count > 0 && (
          <div
            style={{
              padding: '0.65rem 1.25rem',
              background: 'rgba(229, 195, 120, 0.06)',
              borderBottom: '1px solid rgba(229, 195, 120, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.5rem',
              flexWrap: 'wrap'
            }}
          >
            <button
              type="button"
              onClick={moveAllWishlistToBag}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: 'linear-gradient(135deg, #FFF6D6 0%, #E5C378 100%)',
                color: '#080103',
                border: 'none',
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(229, 195, 120, 0.3)'
              }}
              title="Move all saved items into shopping bag"
            >
              <ShoppingBag size={12} />
              <span>Move All to Bag</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <a
                href={getWishlistShareUrl()}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  background: 'rgba(37, 211, 102, 0.15)',
                  border: '1px solid rgba(37, 211, 102, 0.35)',
                  color: '#25D366',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '6px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
                title="Share your wishlist on WhatsApp with family or store"
              >
                <Share2 size={12} />
                <span>Share</span>
              </a>

              {!confirmClear ? (
                <button
                  type="button"
                  onClick={() => setConfirmClear(true)}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#B8AE9E',
                    padding: '0.35rem 0.55rem',
                    borderRadius: '6px',
                    fontSize: '0.74rem',
                    cursor: 'pointer'
                  }}
                  title="Clear all saved items"
                >
                  Clear
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    clearWishlist();
                    setConfirmClear(false);
                  }}
                  style={{
                    background: '#EF4444',
                    border: 'none',
                    color: '#FFF',
                    padding: '0.35rem 0.6rem',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                  title="Confirm clear all"
                >
                  Confirm Clear?
                </button>
              )}
            </div>
          </div>
        )}

        {/* Drawer Body */}
        <div className="drawer-body">
          {wishlist.length > 0 ? (
            <div>
              {wishlist.map((item) => {
                const price = calculatePrice(item);
                return (
                  <div key={item.id} className="drawer-item-row">
                    <img
                      src={item.image}
                      alt={item.name}
                      onClick={() => handleOpenProduct(item)}
                      style={{ cursor: 'pointer' }}
                      title="Click to view details & certificate"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/images/store/store_display_jewellery.jpg';
                      }}
                    />
                    <div className="drawer-item-info">
                      <div
                        className="drawer-item-title"
                        onClick={() => handleOpenProduct(item)}
                        style={{ cursor: 'pointer' }}
                        title="Click to view details"
                      >
                        {item.name}
                      </div>
                      <div className="drawer-item-specs">
                        <span style={{ color: '#E5C378' }}>{item.purity}</span> • {item.netGoldWeight || item.grossWeight}
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.55rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <button
                          className="btn btn-primary"
                          style={{ padding: '0.38rem 0.75rem', fontSize: '0.76rem' }}
                          onClick={() => {
                            addToCart(item);
                            toggleWishlist(item);
                          }}
                          title="Move this item to Royal Bag"
                        >
                          <ShoppingBag size={12} />
                          <span>Move to Bag</span>
                        </button>

                        <button
                          type="button"
                          className="btn btn-outline"
                          style={{ padding: '0.38rem 0.65rem', fontSize: '0.76rem' }}
                          onClick={() => handleOpenProduct(item)}
                          title="Quick view product specs & Hallmark"
                        >
                          <Eye size={12} />
                          <span>Inspect</span>
                        </button>

                        <button
                          className="drawer-remove-btn"
                          onClick={() => toggleWishlist(item)}
                          title="Remove from Wishlist"
                          aria-label="Remove from Wishlist"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                    <div className="drawer-item-price">
                      {price.formattedTotalPrice}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ padding: '3.5rem 1.25rem', textAlign: 'center', color: '#B8AE9E' }}>
              <div
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '50%',
                  background: 'rgba(229, 195, 120, 0.1)',
                  border: '1.5px solid rgba(229, 195, 120, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem'
                }}
              >
                <Heart size={36} style={{ color: '#E5C378' }} />
              </div>
              <h4 style={{ color: '#FFFDF9', fontFamily: 'var(--font-serif-headline)', fontSize: '1.35rem', marginBottom: '0.5rem' }}>
                Your Wishlist is Empty
              </h4>
              <p style={{ fontSize: '0.88rem', margin: '0.5rem 0 1.75rem', color: '#D4C5B3', lineHeight: 1.5 }}>
                Save your favourite bridal rani haars, antique temple kadas, and solitaire rings by tapping the heart icon. Your saved designs persist across browser visits.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setIsWishlistOpen(false)}
                style={{ padding: '0.75rem 1.6rem' }}
              >
                <Sparkles size={14} />
                <span>Explore Masterpieces</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {count > 0 && (
          <div className="drawer-footer">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.65rem', alignItems: 'baseline' }}>
              <span style={{ fontSize: '0.9rem', color: '#E6E0D6' }}>Total Estimated Value:</span>
              <strong style={{ fontSize: '1.4rem', color: '#F3D89A', fontFamily: 'var(--font-serif-headline)', textShadow: '0 0 12px rgba(229, 195, 120, 0.35)' }}>
                {formattedTotal}
              </strong>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.75rem', color: '#B8AE9E', marginBottom: '1rem' }}>
              <ShieldCheck size={14} style={{ color: '#E5C378' }} />
              <span>100% BIS 916 Hallmark • Lifetime Buyback Guarantee</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.65rem' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={moveAllWishlistToBag}
                style={{ width: '100%', padding: '0.8rem', justifyContent: 'center' }}
              >
                <ShoppingBag size={16} />
                <span>Move All ({count}) to Royal Bag</span>
              </button>

              <a
                href={getWishlistShareUrl()}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
                style={{ width: '100%', padding: '0.7rem', justifyContent: 'center', textDecoration: 'none' }}
              >
                <MessageCircle size={16} style={{ color: '#25D366' }} />
                <span>Send Wishlist to Sangmohal Karigar on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WishlistDrawer;
