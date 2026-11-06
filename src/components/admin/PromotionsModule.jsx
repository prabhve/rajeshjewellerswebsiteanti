import React, { useState } from 'react';
import { Tag, Plus, Trash2, Edit3, CheckCircle2, Calendar } from 'lucide-react';

const PromotionsModule = ({
  offers = [],
  setOffers = () => {},
  showToast = () => {}
}) => {
  const [editingOfferId, setEditingOfferId] = useState(null);
  const [offerForm, setOfferForm] = useState({
    title: '',
    code: '',
    discountType: 'flat',
    discountValue: 500,
    minPurchase: 10000,
    validUntil: '2026-12-31',
    description: '',
    enabled: true
  });

  const handleSaveOffer = (e) => {
    e.preventDefault();
    if (!offerForm.title || !offerForm.code) return;

    if (editingOfferId) {
      setOffers((prev) => prev.map((o) => (o.id === editingOfferId ? { ...o, ...offerForm } : o)));
      showToast(`Updated offer "${offerForm.code}"`);
    } else {
      const newOffer = {
        ...offerForm,
        id: `off_${Date.now()}`
      };
      setOffers((prev) => [newOffer, ...prev]);
      showToast(`Created new promo offer "${offerForm.code}"! 🎟️`);
    }

    setEditingOfferId(null);
    setOfferForm({ title: '', code: '', discountType: 'flat', discountValue: 500, minPurchase: 10000, validUntil: '2026-12-31', description: '', enabled: true });
  };

  const handleToggleOffer = (id) => {
    setOffers((prev) => prev.map((o) => (o.id === id ? { ...o, enabled: !o.enabled } : o)));
    showToast('Updated promotion status');
  };

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2 className="admin-pane-title">11. Offers &amp; Festive Promotions Manager</h2>
          <p className="admin-pane-desc">
            Configure promotional coupon codes, wedding season discounts, and festival campaign banners displayed at bag checkout.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Column */}
        <div className="lg:col-span-5">
          <form onSubmit={handleSaveOffer} className="admin-card-surface p-5 space-y-4">
            <h3 className="font-bold text-white text-sm pb-2 border-b border-amber-600/20">
              {editingOfferId ? 'Edit Promo Offer' : 'Create New Promotional Offer'}
            </h3>

            <div>
              <label className="admin-label">Campaign Title</label>
              <input
                type="text"
                value={offerForm.title}
                onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })}
                placeholder="e.g. Lagan Wedding Offer"
                className="admin-input-field"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="admin-label">Coupon Code</label>
                <input
                  type="text"
                  value={offerForm.code}
                  onChange={(e) => setOfferForm({ ...offerForm, code: e.target.value.toUpperCase() })}
                  placeholder="ROYAL1000"
                  className="admin-input-field font-mono font-bold"
                  required
                />
              </div>

              <div>
                <label className="admin-label">Discount Value (₹)</label>
                <input
                  type="number"
                  value={offerForm.discountValue}
                  onChange={(e) => setOfferForm({ ...offerForm, discountValue: Number(e.target.value) })}
                  className="admin-input-field"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="admin-label">Min Purchase (₹)</label>
                <input
                  type="number"
                  value={offerForm.minPurchase}
                  onChange={(e) => setOfferForm({ ...offerForm, minPurchase: Number(e.target.value) })}
                  className="admin-input-field"
                />
              </div>

              <div>
                <label className="admin-label">Valid Until</label>
                <input
                  type="date"
                  value={offerForm.validUntil}
                  onChange={(e) => setOfferForm({ ...offerForm, validUntil: e.target.value })}
                  className="admin-input-field"
                />
              </div>
            </div>

            <div>
              <label className="admin-label">Offer Description</label>
              <textarea
                rows={2}
                value={offerForm.description}
                onChange={(e) => setOfferForm({ ...offerForm, description: e.target.value })}
                className="admin-input-field"
              />
            </div>

            <button type="submit" className="admin-btn-primary w-full justify-center">
              <CheckCircle2 size={16} />
              <span>{editingOfferId ? 'Update Offer' : 'Publish Offer'}</span>
            </button>
          </form>
        </div>

        {/* Offers List */}
        <div className="lg:col-span-7 space-y-3">
          <div className="admin-card-surface p-5 space-y-3">
            <h3 className="font-bold text-white text-sm pb-2 border-b border-amber-600/20">
              Active Festive Offers ({offers.length})
            </h3>

            <div className="space-y-3">
              {offers.map((off) => (
                <div key={off.id} className="p-4 rounded-lg bg-black/40 border border-amber-600/20 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-sm text-white">{off.title}</strong>
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-700/50">
                        {off.code}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 mt-1">{off.description}</p>
                    <span className="text-[10px] text-gray-400 block mt-1">
                      Min Purchase: ₹{off.minPurchase?.toLocaleString('en-IN')} • Expires: {off.validUntil}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        off.enabled ? 'bg-emerald-950 text-emerald-400 border border-emerald-700' : 'bg-gray-800 text-gray-400'
                      }`}
                      onClick={() => handleToggleOffer(off.id)}
                    >
                      {off.enabled ? 'Active' : 'Disabled'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PromotionsModule);
