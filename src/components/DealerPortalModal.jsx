import React, { useState } from 'react';
import { useJewellery } from '../context/JewelleryContext';
import { X, Lock, Sliders, PlusCircle, Trash2, CheckCircle2 } from 'lucide-react';

const DealerPortalModal = () => {
  const {
    isDealerModalOpen,
    setIsDealerModalOpen,
    liveRates,
    updateRates,
    products,
    addProduct,
    deleteProduct,
    showToast
  } = useJewellery();

  const [activeTab, setActiveTab] = useState('rates');

  const [ratesForm, setRatesForm] = useState({
    gold24k: liveRates.gold24k,
    gold22k: liveRates.gold22k,
    gold18k: liveRates.gold18k,
    silver999: liveRates.silver999
  });

  const [newProd, setNewProd] = useState({
    name: '',
    hindiName: '',
    category: 'bridal',
    categoryLabel: 'Royal Bridal',
    purity: '22K BIS 916 Hallmark',
    purityKey: 'gold22k',
    grossWeight: '35.00g',
    netGoldWeight: '35.00g',
    stoneType: 'Uncut Syndicate Polki',
    image: '/assets/images/hero_bridal.jpg',
    description: 'Handcrafted master bridal piece with pure 22K hallmarking from Sangmohal artisans.',
    makingPercent: 12,
    badge: 'New Arrival'
  });

  if (!isDealerModalOpen) return null;

  const handleUpdateRates = (e) => {
    e.preventDefault();
    updateRates({
      gold24k: Number(ratesForm.gold24k),
      gold22k: Number(ratesForm.gold22k),
      gold18k: Number(ratesForm.gold18k),
      silver999: Number(ratesForm.silver999)
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.netGoldWeight) {
      showToast('Please enter item name and net weight.', 'error');
      return;
    }
    addProduct(newProd);
    setNewProd({
      name: '',
      hindiName: '',
      category: 'bridal',
      categoryLabel: 'Royal Bridal',
      purity: '22K BIS 916 Hallmark',
      purityKey: 'gold22k',
      grossWeight: '25.00g',
      netGoldWeight: '25.00g',
      stoneType: 'Pure Gold Handcarved',
      image: '/assets/images/necklace_collection.jpg',
      description: 'Handcrafted jewellery from Rajesh Jewellers Sangmohal, Mirzapur.',
      makingPercent: 10,
      badge: 'New'
    });
  };

  return (
    <div
      className="modal-overlay active"
      onClick={() => setIsDealerModalOpen(false)}
    >
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '2rem', position: 'relative' }}
      >
        <button
          className="drawer-close-btn"
          style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}
          onClick={() => setIsDealerModalOpen(false)}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(229, 195, 120, 0.15)', border: '1px solid rgba(229, 195, 120, 0.4)', color: '#E5C378', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Lock size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', color: '#FFFDF9', margin: 0, fontWeight: 700, fontFamily: 'var(--font-serif-headline)' }}>
              Showroom Dealer Portal
            </h2>
            <span style={{ fontSize: '0.8rem', color: '#BFA888' }}>
              Live MCX Bullion Rate Sync & Inventory Controls • Sangmohal, Mirzapur
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1.5px solid var(--border-medium)', marginBottom: '1.5rem' }}>
          <button
            type="button"
            className={`btn ${activeTab === 'rates' ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: '6px 6px 0 0', padding: '0.65rem 1.25rem' }}
            onClick={() => setActiveTab('rates')}
          >
            <Sliders size={15} />
            <span>Update Bullion Rates</span>
          </button>
          <button
            type="button"
            className={`btn ${activeTab === 'inventory' ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: '6px 6px 0 0', padding: '0.65rem 1.25rem' }}
            onClick={() => setActiveTab('inventory')}
          >
            <PlusCircle size={15} />
            <span>Manage Inventory ({products.length})</span>
          </button>
        </div>

        {/* TAB 1: Live Bullion Rates */}
        {activeTab === 'rates' && (
          <form onSubmit={handleUpdateRates} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="rate-editor-grid">
              <div className="form-field">
                <label>24K Gold (₹/g)</label>
                <input
                  type="number"
                  value={ratesForm.gold24k}
                  onChange={(e) => setRatesForm({ ...ratesForm, gold24k: e.target.value })}
                />
                <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                  = ₹{(ratesForm.gold24k * 10).toLocaleString('en-IN')}/10g
                </span>
              </div>

              <div className="form-field">
                <label>22K Gold (₹/g)</label>
                <input
                  type="number"
                  value={ratesForm.gold22k}
                  onChange={(e) => setRatesForm({ ...ratesForm, gold22k: e.target.value })}
                />
                <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                  = ₹{(ratesForm.gold22k * 10).toLocaleString('en-IN')}/10g
                </span>
              </div>

              <div className="form-field">
                <label>18K Gold (₹/g)</label>
                <input
                  type="number"
                  value={ratesForm.gold18k}
                  onChange={(e) => setRatesForm({ ...ratesForm, gold18k: e.target.value })}
                />
                <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                  = ₹{(ratesForm.gold18k * 10).toLocaleString('en-IN')}/10g
                </span>
              </div>

              <div className="form-field">
                <label>Silver 999 (₹/g)</label>
                <input
                  type="number"
                  step="0.1"
                  value={ratesForm.silver999}
                  onChange={(e) => setRatesForm({ ...ratesForm, silver999: e.target.value })}
                />
                <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                  = ₹{(Math.round(ratesForm.silver999 * 1000)).toLocaleString('en-IN')}/1kg
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: '0.85rem' }}
            >
              <CheckCircle2 size={16} />
              <span>Apply Rates to Live Showroom</span>
            </button>
          </form>
        )}

        {/* TAB 2: Inventory Management */}
        {activeTab === 'inventory' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxHeight: '55vh', overflowY: 'auto' }}>
            <form onSubmit={handleAddProduct} style={{ background: 'var(--bg-warm)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-medium)' }}>
              <h4 style={{ color: 'var(--brand-plum)', fontSize: '1rem', marginBottom: '1rem' }}>
                Add New Design to Online Showcase
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div className="form-field">
                  <label>Item Name (English)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Navratna Royal Choker"
                    value={newProd.name}
                    onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label>Item Name (Hindi)</label>
                  <input
                    type="text"
                    placeholder="e.g. नवरत्न शाही चोकर"
                    value={newProd.hindiName}
                    onChange={(e) => setNewProd({ ...newProd, hindiName: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label>Collection</label>
                  <select
                    value={newProd.category}
                    onChange={(e) => {
                      const cat = e.target.value;
                      const labels = {
                        bridal: 'Royal Bridal',
                        gold: '22K Gold Necklaces',
                        bangles: 'Temple Bangles',
                        diamond: 'Solitaire Diamonds',
                        everyday: 'Everyday & Festive',
                        mens: "Men's Jewels",
                        coins: '24K Gold Coins',
                        silver: 'Silver & Pooja'
                      };
                      setNewProd({
                        ...newProd,
                        category: cat,
                        categoryLabel: labels[cat] || 'Jewellery'
                      });
                    }}
                  >
                    <option value="bridal">Royal Bridal</option>
                    <option value="gold">22K Gold Necklaces</option>
                    <option value="bangles">Temple Bangles</option>
                    <option value="diamond">Solitaire Diamonds</option>
                    <option value="everyday">Everyday & Festive</option>
                    <option value="mens">Men's Jewels</option>
                    <option value="coins">24K Coins</option>
                    <option value="silver">Silver & Pooja</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Net Gold Weight</label>
                  <input
                    type="text"
                    placeholder="e.g. 24.50g"
                    value={newProd.netGoldWeight}
                    onChange={(e) => setNewProd({ ...newProd, netGoldWeight: e.target.value, grossWeight: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label>Making Charge (%)</label>
                  <input
                    type="number"
                    min="3"
                    max="25"
                    value={newProd.makingPercent}
                    onChange={(e) => setNewProd({ ...newProd, makingPercent: parseInt(e.target.value) || 10 })}
                  />
                </div>

                <div className="form-field">
                  <label>Photo Selection</label>
                  <select
                    value={newProd.image}
                    onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                  >
                    <option value="/assets/images/hero_bridal.jpg">Royal Bridal Set</option>
                    <option value="/assets/images/necklace_collection.jpg">Gold Necklace</option>
                    <option value="/assets/images/antique_bangles.jpg">Temple Bangles</option>
                    <option value="/assets/images/diamond_rings.jpg">Diamond Rings</option>
                    <option value="/assets/images/mens_chain_kada.jpg">Men's Kada</option>
                    <option value="/assets/images/gold_coin.jpg">24K Coin</option>
                    <option value="/assets/images/earrings_jhumka.jpg">Jhumkas</option>
                    <option value="/assets/images/silver_collection.jpg">Silver Payal</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '1rem', padding: '0.75rem' }}
              >
                <PlusCircle size={15} />
                <span>Save to Active Showcase</span>
              </button>
            </form>

            <div>
              <h4 style={{ color: 'var(--brand-plum)', fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                Active Showcase Items ({products.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {products.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: '#FFF',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-subtle)',
                      gap: '0.75rem'
                    }}
                  >
                    <img src={p.image} alt={p.name} style={{ width: '42px', height: '42px', borderRadius: '4px', objectFit: 'cover' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                        {p.id} • {p.categoryLabel} • {p.netGoldWeight || p.grossWeight}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteProduct(p.id)}
                      style={{ background: 'none', border: 'none', color: 'var(--danger-ruby)', cursor: 'pointer', padding: '0.4rem' }}
                      title="Delete Product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DealerPortalModal;
