import React, { useState, useRef, useEffect } from 'react';
import { useJewellery } from '../context/JewelleryContext';
import { Search, Heart, ShoppingBag, Calendar, Sparkles, X } from 'lucide-react';

const Header = () => {
  const {
    products,
    cart,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsVipModalOpen,
    setQuickViewProduct,
    calculatePrice
  } = useJewellery();

  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchWrapRef = useRef(null);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  // Filter products based on search
  const filteredProducts = searchTerm.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (p.hindiName && p.hindiName.includes(searchTerm)) ||
          p.purity.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectItem = (prod) => {
    setQuickViewProduct(prod);
    setIsDropdownOpen(false);
    setSearchTerm('');
  };

  return (
    <header className="site-header" id="navbar">
      <div className="container">
        <div className="header-main-row">
          {/* Brand Logo */}
          <a href="#" className="brand-wrap" title="Rajesh Jewellers - Sangmohal, Mirzapur">
            <div className="brand-emblem">
              <img
                src="/assets/images/store/rajesh_jewellers_emblem_gold_circle.png"
                alt="Rajesh Jewellers Official Logo - 3D Diamond RJ Emblem & BIS Hallmark"
                className="brand-logo-img"
              />
            </div>
            <div className="brand-title-box">
              <span className="brand-name">Rajesh Jewellers</span>
              <span className="brand-sub">SANGMOHAL • MIRZAPUR</span>
            </div>
          </a>

          {/* Live Search Bar */}
          <div className="header-search-wrap" ref={searchWrapRef}>
            <div className="search-input-box">
              <input
                type="text"
                placeholder="Search 22K Gold Chokers, Temple Kadas, Solitaire Rings, Payal..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsDropdownOpen(e.target.value.trim().length > 0);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && filteredProducts.length > 0) {
                    handleSelectItem(filteredProducts[0]);
                  } else if (e.key === 'Escape') {
                    setIsDropdownOpen(false);
                  }
                }}
                onFocus={() => {
                  if (searchTerm.trim().length > 0) setIsDropdownOpen(true);
                }}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setIsDropdownOpen(false);
                  }}
                  style={{ background: 'none', border: 'none', color: '#B8AE9E', cursor: 'pointer', padding: '0 0.25rem', display: 'flex', alignItems: 'center' }}
                  aria-label="Clear Search"
                >
                  <X size={15} />
                </button>
              )}
              <button type="button" aria-label="Search">
                <Search size={18} />
              </button>
            </div>

            {/* Dropdown Results */}
            {isDropdownOpen && (
              <div className="search-dropdown active">
                {filteredProducts.length > 0 ? (
                  <>
                    <div
                      style={{
                        padding: '0.65rem 1rem 0.5rem',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: '#E5C378',
                        borderBottom: '1px solid rgba(229, 195, 120, 0.2)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'rgba(255, 255, 255, 0.02)'
                      }}
                    >
                      <span>Showroom Matches ({filteredProducts.length})</span>
                      <span style={{ fontSize: '0.7rem', color: '#B8AE9E', textTransform: 'none' }}>
                        Click to quick view
                      </span>
                    </div>

                    {filteredProducts.map((prod) => {
                      const price = calculatePrice(prod);
                      return (
                        <div
                          key={prod.id}
                          className="search-drop-item"
                          onClick={() => handleSelectItem(prod)}
                        >
                          <img src={prod.image} alt={prod.name} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                fontWeight: 700,
                                fontSize: '0.88rem',
                                color: '#FFFDF9',
                                lineHeight: 1.3,
                                marginBottom: '0.15rem',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}
                            >
                              {prod.name}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#DFBE6B', fontWeight: 500 }}>
                              {prod.purity} • {prod.netGoldWeight || prod.grossWeight}
                            </div>
                          </div>
                          <div
                            style={{
                              fontWeight: 800,
                              fontSize: '0.92rem',
                              color: '#FFF6D6',
                              fontFamily: 'var(--font-serif-headline)',
                              whiteSpace: 'nowrap',
                              textShadow: '0 0 10px rgba(229, 195, 120, 0.35)'
                            }}
                          >
                            {price.formattedTotalPrice}
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div style={{ padding: '1.25rem 1rem', textAlign: 'center', color: '#D4C5B3', fontSize: '0.85rem' }}>
                    No matching jewellery found for "{searchTerm}". Try searching for "Bridal", "Kada", "Ring", or "Coin".
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Header Action Buttons */}
          <div className="header-actions">
            {/* Wishlist Button */}
            <button
              className="header-icon-btn"
              onClick={() => setIsWishlistOpen(true)}
              title="Saved Designs (Wishlist)"
              aria-label="Wishlist"
            >
              <Heart size={19} />
              {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
            </button>

            {/* Shopping Bag Button */}
            <button
              className="header-icon-btn"
              onClick={() => setIsCartOpen(true)}
              title="Shopping Bag"
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={19} />
              {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
            </button>

            {/* VIP Booking Button */}
            <button
              className="header-vip-btn"
              onClick={() => setIsVipModalOpen(true)}
              title="Book VIP Lounge & Showroom Consultation"
              aria-label="Book VIP Visit"
            >
              <Calendar size={15} />
              <span className="header-vip-text-long">Book VIP Visit</span>
              <span className="header-vip-text-short">VIP</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
