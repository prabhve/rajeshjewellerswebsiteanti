import React, { useState } from 'react';
import { useJewellery } from '../context/JewelleryContext';
import { CATEGORY_BUBBLES } from '../data/initialData';
import { STORE_INFO } from '../data/storeInfo';
import {
  Sparkles,
  Eye,
  ShoppingBag,
  MessageCircle,
  X,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

const CategoryBubbles = () => {
  const {
    products,
    activeCategory,
    setActiveCategory,
    calculatePrice,
    addToCart,
    setQuickViewProduct
  } = useJewellery();

  // Selected category for the inline instant product tray
  const [openCategory, setOpenCategory] = useState(null);

  const handleBubbleClick = (catId) => {
    setActiveCategory(catId);
    setOpenCategory(catId);

    // Gently bring the opened products tray into comfortable view
    setTimeout(() => {
      const trayEl = document.getElementById('category-products-tray');
      if (trayEl) {
        trayEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  };

  const handleCloseTray = () => {
    setOpenCategory(null);
  };

  const handleScrollToCatalog = () => {
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Find active category details
  const currentCategoryData = CATEGORY_BUBBLES.find((c) => c.id === openCategory);

  // Filter products matching this category
  const categoryProducts = openCategory
    ? products.filter((p) => p.category === openCategory)
    : [];

  return (
    <section className="category-bubbles-section" id="categories-section">
      <div className="container">
        {/* Section Header */}
        <div className="category-section-header">
          <span className="kicker-tag">
            <Sparkles size={13} />
            Curated Collections • शाही आभूषण श्रेणी
          </span>
          <h2>Shop by Category (श्रेणी अनुसार आभूषण)</h2>
          <p>
            Select any collection to immediately explore pure 22K BIS 916 hallmarked bridal sets, temple kadas, certified solitaires, and 24K gold coins.
          </p>
        </div>

        {/* Circular Category Bubbles Track */}
        <div className="bubbles-scroll-track">
          {CATEGORY_BUBBLES.map((cat) => {
            const isOpen = openCategory === cat.id;
            return (
              <div
                key={cat.id}
                className={`cat-bubble-item ${isOpen ? 'active is-open' : ''} cat-bubble-${cat.id}`}
                data-category={cat.id}
                onClick={() => handleBubbleClick(cat.id)}
                title={isOpen ? `Showing ${cat.name} collection below` : `Click to open ${cat.name} products`}
              >
                <div className="cat-bubble-avatar">
                  <img src={cat.image} alt={cat.name} loading="lazy" />
                  {isOpen && <div className="cat-active-glow-ring" />}
                </div>
                <div className="cat-bubble-title">{cat.name}</div>
                <span className="cat-bubble-count">
                  {cat.count}
                </span>
                {isOpen && (
                  <span className="cat-open-indicator">
                    Open ▼
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* INSTANT CATEGORY PRODUCTS TRAY (Opens right in front of user with unique styling) */}
        {openCategory && currentCategoryData && (
          <div className="category-products-tray" id="category-products-tray">
            {/* Tray Top Bar */}
            <div className="tray-top-bar">
              <div className="tray-title-group">
                <div className="tray-category-thumb">
                  <img src={currentCategoryData.image} alt={currentCategoryData.name} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <h3 className="tray-heading">
                      {currentCategoryData.name} Collection
                    </h3>
                    <span className="tray-badge">
                      {categoryProducts.length} Showroom Masterpieces
                    </span>
                  </div>
                  <p className="tray-subtitle">
                    Pure BIS 916 Hallmark • In-Store Karatmeter Tested • Sangmohal Showroom
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="tray-actions-group">
                <button
                  type="button"
                  className="btn-tray-view-all"
                  onClick={handleScrollToCatalog}
                  title="View this category in the full catalog with filters"
                >
                  <span>Explore in Full Catalog</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  type="button"
                  className="btn-tray-close"
                  onClick={handleCloseTray}
                  title="Close category view"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Products Grid */}
            {categoryProducts.length > 0 ? (
              <div className="tray-products-grid">
                {categoryProducts.map((product) => {
                  const pricing = calculatePrice(product);
                  const whatsappMsg = `Namaste Rajesh Jewellers (Mirzapur), I am inquiring about "${product.name}" (${product.purity}, Weight: ${product.netGoldWeight || product.grossWeight}) priced at ₹${pricing.totalPrice.toLocaleString('en-IN')}. Please share availability.`;
                  const waUrl = `https://wa.me/${STORE_INFO.whatsapp.replace('+', '')}?text=${encodeURIComponent(whatsappMsg)}`;

                  return (
                    <div key={product.id} className="tray-product-card">
                      {/* Image Frame */}
                      <div
                        className="tray-img-box"
                        onClick={() => setQuickViewProduct(product)}
                        style={{ cursor: 'pointer' }}
                        title="Click to view details & certificate"
                      >
                        <img src={product.image} alt={product.name} loading="lazy" />

                        {product.badge && (
                          <span className="tray-item-badge">
                            {product.badge}
                          </span>
                        )}

                        {/* Quick View Button */}
                        <button
                          type="button"
                          className="tray-quickview-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewProduct(product);
                          }}
                          title="Quick View & High-Res Zoom"
                        >
                          <Eye size={15} />
                          <span>Quick View</span>
                        </button>
                      </div>

                      {/* Card Content */}
                      <div className="tray-card-body">
                        <div className="tray-purity-row">
                          <span className="tray-purity-pill">
                            <ShieldCheck size={11} />
                            {product.purity}
                          </span>
                          <span className="tray-weight-tag">
                            {product.netGoldWeight || product.grossWeight}
                          </span>
                        </div>

                        <h4 className="tray-prod-name" title={product.name}>
                          {product.name}
                        </h4>
                        <div className="tray-prod-hindi">
                          {product.hindiName}
                        </div>

                        {/* Price Row */}
                        <div className="tray-price-row">
                          <div className="tray-price-value">
                            ₹{pricing.totalPrice.toLocaleString('en-IN')}
                          </div>
                          <span className="tray-making-tag">
                            +{product.makingPercent}% Making
                          </span>
                        </div>

                        {/* CTA Buttons */}
                        <div className="tray-btn-row">
                          <button
                            type="button"
                            className="btn-tray-add-cart"
                            onClick={() => addToCart(product, 1)}
                          >
                            <ShoppingBag size={14} />
                            <span>Add to Bag</span>
                          </button>

                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-tray-whatsapp"
                            title="Inquire on WhatsApp"
                          >
                            <MessageCircle size={15} />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="tray-empty-state">
                <Sparkles size={24} style={{ color: '#E5C378', marginBottom: '0.5rem' }} />
                <p>New designs for this category are being hallmarked in our Sangmohal showroom.</p>
                <button
                  type="button"
                  className="btn-tray-view-all"
                  onClick={handleScrollToCatalog}
                >
                  Browse Full Catalog
                </button>
              </div>
            )}

            {/* Tray Bottom Footer */}
            <div className="tray-bottom-bar">
              <span className="tray-bottom-text">
                <CheckCircle2 size={13} style={{ color: '#25D366' }} />
                100% Lifetime Buyback & Exchange Guarantee • Live Karatmeter Purity Verification
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="tray-bottom-link"
                  onClick={handleScrollToCatalog}
                >
                  <span>View all {products.length} showroom pieces with filters</span>
                  <ChevronRight size={13} />
                </button>
                <button
                  type="button"
                  className="btn-tray-close-secondary"
                  onClick={handleCloseTray}
                  title="Close category products view"
                  aria-label="Close tray"
                >
                  <X size={14} />
                  <span>Close (बंद करें)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryBubbles;