import React, { useState } from 'react';
import { Menu, Save, CheckCircle2, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';

const NAV_ITEMS_INITIAL = [
  { id: 'all', label: 'All Jewellery', hindiLabel: 'सभी आभूषण', target: '#catalog-section', enabled: true },
  { id: 'bridal', label: 'Royal Bridal', hindiLabel: 'शाही दुल्हन आभूषण', target: '#catalog-section', enabled: true },
  { id: 'gold', label: 'Gold Necklaces', hindiLabel: '22K सोने के हार', target: '#catalog-section', enabled: true },
  { id: 'bangles', label: 'Temple Kadas', hindiLabel: 'मंदिर कड़े व चूड़ियां', target: '#catalog-section', enabled: true },
  { id: 'diamond', label: 'Solitaires', hindiLabel: 'हीरे के गहने', target: '#catalog-section', enabled: true },
  { id: 'everyday', label: 'Jhumkas & Daily', hindiLabel: 'झुमके व डेली वियर', target: '#catalog-section', enabled: true },
  { id: 'mens', label: "Men's Jewels", hindiLabel: 'पुरुषों के आभूषण', target: '#catalog-section', enabled: true },
  { id: 'coins', label: '24K Coins', hindiLabel: '24K शुद्ध सोने के सिक्के', target: '#catalog-section', enabled: true },
  { id: 'silver', label: '925 Silver', hindiLabel: '925 चांदी के बर्तन', target: '#catalog-section', enabled: true }
];

const HeaderNavModule = ({
  storeInfo = {},
  updateStoreInfo = () => {},
  showToast = () => {}
}) => {
  const [headerForm, setHeaderForm] = useState({
    announcementText: 'MCX Live Bullion Rates Updated · 100% BIS 916 Hallmark Guaranteed · Sangmohal Mirzapur',
    searchPlaceholder: 'Search 22K Gold Chokers, Temple Kadas, Solitaire Rings, Payal...',
    vipButtonLabel: 'Book VIP Visit',
    showTicker: true,
    showWishlistBadge: true,
    showBagBadge: true
  });

  const [navItems, setNavItems] = useState(NAV_ITEMS_INITIAL);

  const handleToggleItem = (id) => {
    setNavItems((prev) => prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item)));
    showToast('Updated navigation item visibility');
  };

  const handleSaveHeader = (e) => {
    e.preventDefault();
    updateStoreInfo({
      announcementBar: headerForm.announcementText,
      searchPlaceholder: headerForm.searchPlaceholder
    });
    showToast('Header & navigation settings saved live! 🚀');
  };

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2 className="admin-pane-title">3. Header &amp; Navigation Manager</h2>
          <p className="admin-pane-desc">
            Customize header branding logos, top announcement bar text, live search placeholders, and navigation menu links.
          </p>
        </div>
        <button
          type="button"
          className="admin-btn-primary"
          onClick={handleSaveHeader}
        >
          <Save size={15} />
          <span>Save Header Settings</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Announcement & Branding Options */}
        <div className="space-y-4">
          <form onSubmit={handleSaveHeader} className="admin-card-surface p-5 space-y-4">
            <h3 className="font-bold text-white text-sm pb-2 border-b border-amber-600/20">
              Top Announcement &amp; Search Config
            </h3>

            <div>
              <label className="admin-label">Top Ticker Announcement Text</label>
              <textarea
                rows={2}
                value={headerForm.announcementText}
                onChange={(e) => setHeaderForm({ ...headerForm, announcementText: e.target.value })}
                className="admin-input-field"
              />
            </div>

            <div>
              <label className="admin-label">Live Search Bar Placeholder</label>
              <input
                type="text"
                value={headerForm.searchPlaceholder}
                onChange={(e) => setHeaderForm({ ...headerForm, searchPlaceholder: e.target.value })}
                className="admin-input-field"
              />
            </div>

            <div>
              <label className="admin-label">VIP Booking Button Label</label>
              <input
                type="text"
                value={headerForm.vipButtonLabel}
                onChange={(e) => setHeaderForm({ ...headerForm, vipButtonLabel: e.target.value })}
                className="admin-input-field"
              />
            </div>

            <div className="pt-2">
              <button type="submit" className="admin-btn-primary w-full justify-center">
                <CheckCircle2 size={16} />
                <span>Apply Header Configuration</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Category Navigation Bar Menu Items */}
        <div className="admin-card-surface p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-amber-600/20">
            <h3 className="font-bold text-white text-sm">Navigation Menu Items ({navItems.length})</h3>
            <span className="text-xs text-amber-300">Click toggle to enable/disable</span>
          </div>

          <div className="space-y-2">
            {navItems.map((item, idx) => (
              <div key={item.id} className="p-3 rounded-lg bg-black/40 border border-amber-600/20 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-amber-400 font-bold">{idx + 1}.</span>
                    <strong className="text-xs text-white">{item.label}</strong>
                    <span className="text-[10px] text-amber-200/70">({item.hindiLabel})</span>
                  </div>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Target: {item.target}</span>
                </div>

                <button
                  type="button"
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    item.enabled ? 'bg-emerald-950 text-emerald-400 border border-emerald-700' : 'bg-gray-800 text-gray-400'
                  }`}
                  onClick={() => handleToggleItem(item.id)}
                >
                  {item.enabled ? 'Enabled' : 'Hidden'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(HeaderNavModule);
