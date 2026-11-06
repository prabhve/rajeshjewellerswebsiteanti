import React from 'react';
import { useJewellery } from '../context/JewelleryContext';
import { Home, Grid, Calculator, Heart, ShoppingBag } from 'lucide-react';

const MobileBottomNav = () => {
  const {
    cart,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen
  } = useJewellery();

  const cartCount = cart.reduce((t, i) => t + i.quantity, 0);
  const wishlistCount = wishlist.length;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="mobile-bottom-nav">
      <button className="mobile-nav-btn" onClick={() => scrollTo('navbar')}>
        <Home size={18} />
        <span>Home</span>
      </button>

      <button className="mobile-nav-btn" onClick={() => scrollTo('categories-section')}>
        <Grid size={18} />
        <span>Categories</span>
      </button>

      <button className="mobile-nav-btn" onClick={() => scrollTo('calculator')}>
        <Calculator size={18} />
        <span>Calculator</span>
      </button>

      <button
        className="mobile-nav-btn"
        onClick={() => setIsWishlistOpen(true)}
      >
        <div style={{ position: 'relative' }}>
          <Heart size={18} />
          {wishlistCount > 0 && <span className="mobile-badge-dot">{wishlistCount}</span>}
        </div>
        <span>Wishlist</span>
      </button>

      <button
        className="mobile-nav-btn"
        onClick={() => setIsCartOpen(true)}
      >
        <div style={{ position: 'relative' }}>
          <ShoppingBag size={18} />
          {cartCount > 0 && <span className="mobile-badge-dot">{cartCount}</span>}
        </div>
        <span>Bag</span>
      </button>
    </nav>
  );
};

export default React.memo(MobileBottomNav);
