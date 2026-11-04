import React, { useState } from 'react';
import { useJewellery } from '../context/JewelleryContext';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react';

const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    calculatePrice,
    couponCode,
    discountAmount,
    applyCoupon,
    getCartTotals,
    getWhatsAppCheckoutUrl
  } = useJewellery();

  const [inputCoupon, setInputCoupon] = useState('');
  const { subtotal, finalAmount, itemCount } = getCartTotals();

  return (
    <>
      <div
        className={`side-drawer-overlay ${isCartOpen ? 'active' : ''}`}
        onClick={() => setIsCartOpen(false)}
      />
      <div className={`side-drawer-panel cart-drawer ${isCartOpen ? 'active' : ''}`}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <h3>Royal Shopping Bag ({itemCount})</h3>
          <button
            className="drawer-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close Bag"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="drawer-body">
          {cart.length > 0 ? (
            <div>
              {cart.map((item) => {
                const price = calculatePrice(item);
                return (
                  <div key={item.id} className="drawer-item-row">
                    <img src={item.image} alt={item.name} />
                    <div className="drawer-item-info">
                      <div className="drawer-item-title">{item.name}</div>
                      <div className="drawer-item-specs">
                        {item.purity} • {item.netGoldWeight || item.grossWeight}
                      </div>
                      <div className="drawer-qty-row">
                        <button
                          className="qty-btn"
                          onClick={() => updateCartQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                          title="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="qty-num">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateCartQuantity(item.id, 1)}
                          title="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          className="drawer-remove-btn"
                          onClick={() => removeFromCart(item.id)}
                          title="Remove item"
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

              {/* Promo Code Input */}
              <div style={{ marginTop: '1.25rem', marginBottom: '0.5rem' }}>
                <div className="coupon-input-box">
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. WELCOME500)"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                  />
                  <button
                    type="button"
                    className="coupon-apply-btn"
                    onClick={() => {
                      applyCoupon(inputCoupon);
                      setInputCoupon('');
                    }}
                  >
                    Apply
                  </button>
                </div>
                {couponCode && (
                  <div style={{ fontSize: '0.8rem', color: '#10B981', marginTop: '0.4rem', fontWeight: 600 }}>
                    ✓ Applied <strong>{couponCode}</strong> (-₹{discountAmount.toLocaleString('en-IN')})
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div style={{ padding: '3.5rem 1rem', textAlign: 'center', color: '#B8AE9E' }}>
              <ShoppingBag size={52} style={{ color: 'rgba(229, 195, 120, 0.45)', marginBottom: '1rem' }} />
              <h4 style={{ color: '#E5C378', fontFamily: 'var(--font-serif-headline)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                Your Bag is Empty
              </h4>
              <p style={{ fontSize: '0.88rem', margin: '0.5rem 0 1.5rem', color: '#B8AE9E' }}>
                Add your favorite 22K hallmarked ornaments to view live computed invoice.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setIsCartOpen(false)}
                style={{ padding: '0.75rem 1.4rem' }}
              >
                <span>Browse Collections</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem', fontSize: '0.9rem', color: '#E6E0D6' }}>
              <span>Subtotal:</span>
              <strong style={{ color: '#FFFDF9' }}>₹{subtotal.toLocaleString('en-IN')}</strong>
            </div>

            {discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem', fontSize: '0.9rem', color: '#10B981' }}>
                <span>Discount ({couponCode}):</span>
                <strong>-₹{discountAmount.toLocaleString('en-IN')}</strong>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.85rem', fontSize: '0.78rem', color: '#B8AE9E' }}>
              <span>GST (3%):</span>
              <span>Included in totals</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1.5px solid rgba(229, 195, 120, 0.25)', paddingTop: '0.85rem', alignItems: 'baseline' }}>
              <span style={{ fontWeight: 700, color: '#FFFDF9', fontSize: '1.05rem' }}>Total Estimate:</span>
              <strong style={{ fontSize: '1.5rem', color: '#F3D89A', fontFamily: 'var(--font-serif-headline)', textShadow: '0 0 14px rgba(229, 195, 120, 0.35)' }}>
                ₹{finalAmount.toLocaleString('en-IN')}
              </strong>
            </div>

            <a
              href={getWhatsAppCheckoutUrl()}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '1rem', padding: '0.85rem', textDecoration: 'none', justifyContent: 'center' }}
            >
              <MessageCircle size={18} style={{ color: '#25D366' }} />
              <span>Checkout via WhatsApp Concierge</span>
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
