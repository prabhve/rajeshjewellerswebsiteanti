import React, { useState } from 'react';
import { Grid, Plus, Trash2, Edit3, Image as ImageIcon, Save, CheckCircle2 } from 'lucide-react';
import { CATEGORY_BUBBLES } from '../../data/initialData';

const CategoriesModule = ({
  products = [],
  showToast = () => {}
}) => {
  const [categories, setCategories] = useState(CATEGORY_BUBBLES);
  const [editingCatId, setEditingCatId] = useState(null);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    hindiName: '',
    image: '/assets/images/store/store_display_jewellery.jpg',
    description: '',
    priority: 1
  });

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!categoryForm.name) return;

    if (editingCatId) {
      setCategories((prev) =>
        prev.map((c) => (c.id === editingCatId ? { ...c, name: categoryForm.name, image: categoryForm.image } : c))
      );
      showToast(`Updated category "${categoryForm.name}"`);
    } else {
      const newCat = {
        id: `cat_${Date.now()}`,
        name: categoryForm.name,
        count: '0 Designs',
        image: categoryForm.image
      };
      setCategories((prev) => [...prev, newCat]);
      showToast(`Created new collection category "${categoryForm.name}"! 🎉`);
    }

    setEditingCatId(null);
    setCategoryForm({ name: '', hindiName: '', image: '/assets/images/store/store_display_jewellery.jpg', description: '', priority: 1 });
  };

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2 className="admin-pane-title">6. Categories &amp; Collections Manager</h2>
          <p className="admin-pane-desc">
            Manage jewellery category story bubbles, images, Hindi/English labels, and priority sorting for homepage display.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Add / Edit Category */}
        <div className="lg:col-span-5 space-y-4">
          <form onSubmit={handleSaveCategory} className="admin-card-surface p-5 space-y-4">
            <h3 className="font-bold text-white text-sm pb-2 border-b border-amber-600/20">
              {editingCatId ? 'Edit Category' : 'Add New Collection Category'}
            </h3>

            <div>
              <label className="admin-label">Category Name (English)</label>
              <input
                type="text"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                placeholder="e.g. Royal Polki Sets"
                className="admin-input-field"
                required
              />
            </div>

            <div>
              <label className="admin-label">Category Image URL / Asset</label>
              <input
                type="text"
                value={categoryForm.image}
                onChange={(e) => setCategoryForm({ ...categoryForm, image: e.target.value })}
                className="admin-input-field"
              />
            </div>

            <div className="pt-2">
              <button type="submit" className="admin-btn-primary w-full justify-center">
                <CheckCircle2 size={16} />
                <span>{editingCatId ? 'Update Category' : 'Create Category'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right List: Active Categories */}
        <div className="lg:col-span-7 space-y-3">
          <div className="admin-card-surface p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-amber-600/20">
              <h3 className="font-bold text-white text-sm">Active Category Collections ({categories.length})</h3>
              <span className="text-xs text-amber-300">Live Showroom Collections</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.map((cat) => {
                const assignedProductsCount = products.filter((p) => p.category === cat.id).length;
                return (
                  <div key={cat.id} className="p-3 rounded-lg bg-black/40 border border-amber-600/20 flex items-center gap-3">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      decoding="async"
                      className="w-12 h-12 rounded-full object-cover border border-amber-500/40"
                    />
                    <div className="flex-1 min-w-0">
                      <strong className="text-xs text-white block truncate">{cat.name}</strong>
                      <span className="text-[10px] text-amber-300 block">{assignedProductsCount} Active Designs in Store</span>
                    </div>
                    <button
                      type="button"
                      className="p-1.5 rounded bg-black/40 text-amber-300 border border-amber-700/50 hover:bg-amber-950"
                      onClick={() => {
                        setEditingCatId(cat.id);
                        setCategoryForm({ name: cat.name, hindiName: '', image: cat.image, description: '', priority: 1 });
                      }}
                    >
                      <Edit3 size={12} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CategoriesModule);
