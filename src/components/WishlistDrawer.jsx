import React from 'react';
import { useJewellery } from '../context/JewelleryContext';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

const WishlistDrawer = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    calculatePrice
  } = useJewellery();

  return (
    <>
      <div
        className={`side-drawer-overlay ${isWishlistOpen ? 'active' : ''}`}
        onClick={() => setIsWishlistOpen(false)}
      />
      <div className={`side-drawer-panel wishlist-drawer ${isWishlistOpen ? 'active' : ''}`}>
        <div className="drawer-header">
          <h3>Saved Wishlist ({wishlist.length})</h3>
          <button
            className="drawer-close-btn"
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close Wishlist"
          >
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body">
          {wishlist.length > 0 ? (
            <div>
              {wishlist.map((item) => {
                const price = calculatePrice(item);
                return (
                  <div key={item.id} className="drawer-item-row">
                    <img src={item.image} alt={item.name} />
                    <div className="drawer-item-info">
                      <div className="drawer-item-title">{item.name}</div>
                      <div className="drawer-item-specs">
                        {item.purity} • {item.netGoldWeight || item.grossWeight}
                      </div>
                      <div style={{ display: 'flex', gap: '0.65rem', marginTop: '0.5rem', alignItems: 'center' }}>
                        <button
                          className="btn btn-primary"
                          style={{ padding: '0.4rem 0.85rem', fontSize: '0.78rem' }}
                          onClick={() => {
                            addToCart(item);
                            toggleWishlist(item);
                          }}
                        >
                          <ShoppingBag size={12} />
                          <span>Move to Bag</span>
                        </button>
                        <button
                          className="drawer-remove-btn"
                          onClick={() => toggleWishlist(item)}
                          title="Remove from Wishlist"
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
            <div style={{ padding: '3.5rem 1rem', textAlign: 'center', color: '#B8AE9E' }}>
              <Heart size={52} style={{ color: 'rgba(229, 195, 120, 0.45)', marginBottom: '1rem' }} />
              <h4 style={{ color: '#E5C378', fontFamily: 'var(--font-serif-headline)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                Your Wishlist is Empty
              </h4>
              <p style={{ fontSize: '0.88rem', margin: '0.5rem 0 1.5rem', color: '#B8AE9E' }}>
                Save your favourite bridal sets and solitaire designs by tapping the heart icon.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setIsWishlistOpen(false)}
                style={{ padding: '0.75rem 1.4rem' }}
              >
                <span>Explore Masterpieces</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistDrawer;
