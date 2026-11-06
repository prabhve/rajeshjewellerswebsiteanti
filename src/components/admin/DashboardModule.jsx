import React, { useState } from 'react';
import {
  Package,
  Grid,
  MessageSquare,
  CalendarCheck,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  PlusCircle,
  Sliders,
  Layers,
  Award,
  FolderOpen,
  MapPin,
  Scale,
  Edit3,
  X,
  CheckCircle2,
  RefreshCw,
  Eye,
  Camera,
  Trash2,
  Star
} from 'lucide-react';

const DashboardModule = ({
  products = [],
  liveRates = {},
  storeInfo = {},
  leads = [],
  reviews = [],
  homepageSections = [],
  hasUnsavedDrafts = false,
  onNavigate = () => {},
  publishDraftToLiveSite = () => {},
  updateRates = () => {},
  updateStoreInfo = () => {},
  addProduct = () => {},
  updateProduct = () => {},
  deleteProduct = () => {},
  updateLeadStatus = () => {},
  showToast = () => {},
  setHomepageSections = () => {},
  setReviewsList = () => {}
}) => {
  // Modal states for direct editing on the dashboard
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);

  // Quick Rates Form State
  const [ratesForm, setRatesForm] = useState({
    gold24k: liveRates.gold24k || 7845,
    gold22k: liveRates.gold22k || 7195,
    gold18k: liveRates.gold18k || 5885,
    silver999: liveRates.silver999 || 94.5
  });

  // Quick Store Info Form State
  const [infoForm, setInfoForm] = useState({
    name: storeInfo.name || 'Rajesh Jewellers',
    hindiName: storeInfo.hindiName || 'राजेश ज्वेलर्स (सराफ़)',
    fullAddress: storeInfo.fullAddress || 'Station Rd, nearby Jila Karagar, Mirzapur, UP 231001',
    landmark: storeInfo.landmark || 'Sangmohal Showroom',
    gstin: storeInfo.gstin || '09ADMPS4528E1Z8',
    hallmarkCode: storeInfo.hallmarkCode || 'BIS 916 HUID',
    googleRating: storeInfo.googleRating || 4.5
  });

  // Quick Add Product Form State
  const [productForm, setProductForm] = useState({
    name: '',
    hindiName: '',
    category: 'bridal',
    purityKey: 'gold22k',
    netGoldWeight: '22.50g',
    makingPercent: 10,
    image: '/assets/images/store/store_display_jewellery.jpg',
    badge: 'Showroom Original'
  });

  // Quick Add Review Form State
  const [reviewForm, setReviewForm] = useState({
    author: '',
    location: 'Mirzapur',
    rating: 5,
    tag: 'Google Verified Customer',
    comment: ''
  });

  const newLeadsCount = leads.filter((l) => l.status === 'New').length;
  const verifiedReviewsCount = reviews.filter((r) => r.tag?.includes('Verified') || r.tag?.includes('Google')).length;
  const activeSectionsCount = homepageSections.filter((s) => s.enabled !== false).length;
  const totalSectionsCount = homepageSections.length || 19;

  // Category counts breakdown
  const categoryCounts = {
    bridal: products.filter((p) => p.category === 'bridal').length,
    gold: products.filter((p) => p.category === 'gold').length,
    bangles: products.filter((p) => p.category === 'bangles').length,
    diamond: products.filter((p) => p.category === 'diamond').length,
    everyday: products.filter((p) => p.category === 'everyday').length,
    mens: products.filter((p) => p.category === 'mens').length,
    coins: products.filter((p) => p.category === 'coins').length,
    silver: products.filter((p) => p.category === 'silver').length
  };

  const readyInStoreCount = products.filter((p) => p.readyInShowroom !== false).length;

  // Mask phone for customer privacy
  const maskPhone = (phoneStr) => {
    if (!phoneStr) return '+91 ••••• •••••';
    const clean = phoneStr.trim();
    if (clean.length > 8) {
      return clean.slice(0, 6) + '*****';
    }
    return clean;
  };

  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return 'Recent Inquiry';
    if (dateStr.includes('-')) {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const dateObj = new Date(dateStr);
        if (!isNaN(dateObj.getTime())) {
          return dateObj.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
        }
      }
    }
    return dateStr;
  };

  // Save Handlers for Quick Modals
  const handleSaveRates = (e) => {
    e.preventDefault();
    updateRates({
      gold24k: Number(ratesForm.gold24k),
      gold22k: Number(ratesForm.gold22k),
      gold18k: Number(ratesForm.gold18k),
      silver999: Number(ratesForm.silver999)
    });
    setIsRateModalOpen(false);
    showToast('Gold & Silver rates updated live across showroom! 💰');
  };

  const handleSaveInfo = (e) => {
    e.preventDefault();
    updateStoreInfo({
      name: infoForm.name,
      hindiName: infoForm.hindiName,
      fullAddress: infoForm.fullAddress,
      landmark: infoForm.landmark,
      gstin: infoForm.gstin,
      hallmarkCode: infoForm.hallmarkCode,
      googleRating: Number(infoForm.googleRating)
    });
    setIsInfoModalOpen(false);
    showToast('Showroom business profile & credentials updated! 👑');
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.name) {
      showToast('Please enter item name.', 'error');
      return;
    }
    addProduct({
      ...productForm,
      categoryLabel: productForm.category === 'bridal' ? 'Royal Bridal' : 'Gold Jewels',
      purity: productForm.purityKey === 'gold24k' ? '24K Pure Bullion' : '22K BIS 916 Hallmark',
      inStock: true,
      readyInShowroom: true
    });
    setIsAddProductModalOpen(false);
    setProductForm({
      name: '',
      hindiName: '',
      category: 'bridal',
      purityKey: 'gold22k',
      netGoldWeight: '22.50g',
      makingPercent: 10,
      image: '/assets/images/store/store_display_jewellery.jpg',
      badge: 'Showroom Original'
    });
    showToast(`Added design "${productForm.name}" directly from dashboard! 💎`);
  };

  const handleSaveReview = (e) => {
    e.preventDefault();
    if (!reviewForm.author || !reviewForm.comment) {
      showToast('Please enter customer name and review comment.', 'error');
      return;
    }
    const newRev = {
      id: `rev_${Date.now()}`,
      ...reviewForm
    };
    if (setReviewsList) {
      setReviewsList((prev) => [newRev, ...prev]);
    }
    updateStoreInfo({ googleReviews: [newRev, ...reviews] });
    setIsAddReviewModalOpen(false);
    setReviewForm({ author: '', location: 'Mirzapur', rating: 5, tag: 'Google Verified Customer', comment: '' });
    showToast('Customer review added directly from dashboard! ⭐');
  };

  return (
    <div className="admin-tab-pane">
      {/* SECTION A — DASHBOARD INTRODUCTION HEADER */}
      <div className="admin-card-surface p-5 mb-5 bg-[#260F18] border-[#55372E]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold font-serif text-[#F8F2E9] tracking-wide">
                Showroom Business Dashboard
              </h2>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#168653]/20 text-[#34D399] border border-[#168653]">
                System Operational
              </span>
              <button
                type="button"
                className="text-xs text-[#C6A15B] hover:text-[#E7CB87] flex items-center gap-1 font-semibold underline"
                onClick={() => setIsInfoModalOpen(true)}
              >
                <Edit3 size={13} />
                <span>Edit Profile</span>
              </button>
            </div>
            <p className="text-xs text-[#BAAEA3] max-w-2xl leading-relaxed">
              Manage jewellery inventory, bullion rates, customer enquiries and website operations from one central workspace.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              className="admin-btn-secondary text-xs px-3.5 py-2 font-bold flex items-center gap-1.5"
              onClick={() => {
                setRatesForm({
                  gold24k: liveRates.gold24k || 7845,
                  gold22k: liveRates.gold22k || 7195,
                  gold18k: liveRates.gold18k || 5885,
                  silver999: liveRates.silver999 || 94.5
                });
                setIsRateModalOpen(true);
              }}
            >
              <Sliders size={14} />
              <span>Quick Edit Gold Rates</span>
            </button>

            {hasUnsavedDrafts && (
              <button
                type="button"
                className="admin-btn-secondary text-xs px-3.5 py-2 font-bold flex items-center gap-1.5"
                onClick={publishDraftToLiveSite}
              >
                <Sparkles size={14} />
                <span>Publish Drafts</span>
              </button>
            )}

            <button
              type="button"
              className="admin-btn-primary text-xs px-4 py-2 font-bold flex items-center gap-1.5"
              onClick={() => setIsAddProductModalOpen(true)}
            >
              <PlusCircle size={15} />
              <span>+ Add New Product</span>
            </button>
          </div>
        </div>

        {/* Supporting Metadata Badges */}
        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-[#55372E] text-xs text-[#BAAEA3] flex-wrap">
          <span className="inline-flex items-center gap-1">
            <span>Last Updated:</span>
            <strong className="text-[#E7CB87] tabular-nums">{new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</strong>
          </span>
          <span className="text-[#55372E]">•</span>
          <span className="inline-flex items-center gap-1">
            <span>Showroom Location:</span>
            <strong className="text-[#F8F2E9]">{storeInfo.landmark || 'Sangmohal'}, Mirzapur</strong>
          </span>
          <span className="text-[#55372E]">•</span>
          <span className="inline-flex items-center gap-1">
            <span>GSTIN:</span>
            <strong className="text-[#E7CB87] tabular-nums">{storeInfo.gstin || '09ADMPS4528E1Z8'}</strong>
          </span>
          <span className="text-[#55372E]">•</span>
          <span className="inline-flex items-center gap-1">
            <span>HUID:</span>
            <strong className="text-[#34D399]">{storeInfo.hallmarkCode || 'BIS 916 Certified'}</strong>
          </span>
        </div>
      </div>

      {/* SECTION B — FOUR KPI CARDS (Strict 4-Column Grid on Desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {/* CARD 1: Active Products */}
        <div
          className="admin-card-surface p-4 border border-[#55372E] hover:border-[#C6A15B] transition group cursor-pointer flex flex-col justify-between h-[145px]"
          onClick={() => onNavigate('products')}
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-[#BAAEA3] uppercase tracking-wider">Active Products</span>
              <div className="w-8 h-8 rounded-lg bg-[#17090F] text-[#C6A15B] flex items-center justify-center border border-[#55372E]">
                <Package size={16} />
              </div>
            </div>
            <strong className="text-2xl font-serif text-[#F8F2E9] block tabular-nums leading-tight">
              {products.length}
            </strong>
            <span className="text-xs text-[#BAAEA3] block">Published jewellery designs</span>
          </div>
          <div className="flex items-center text-xs font-bold text-[#C6A15B] group-hover:text-[#E7CB87] transition gap-1 pt-2 border-t border-[#55372E]/50">
            <span>Manage Products</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition" />
          </div>
        </div>

        {/* CARD 2: Customer Leads */}
        <div
          className="admin-card-surface p-4 border border-[#55372E] hover:border-[#C6A15B] transition group cursor-pointer flex flex-col justify-between h-[145px]"
          onClick={() => onNavigate('bookings')}
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-[#BAAEA3] uppercase tracking-wider">Customer Leads</span>
              <div className="w-8 h-8 rounded-lg bg-[#17090F] text-[#C6A15B] flex items-center justify-center border border-[#55372E]">
                <CalendarCheck size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <strong className="text-2xl font-serif text-[#F8F2E9] tabular-nums leading-tight">{leads.length}</strong>
              {newLeadsCount > 0 && (
                <span className="text-[10px] font-bold text-[#34D399] bg-[#168653]/20 px-1.5 py-0.5 rounded border border-[#168653]">
                  {newLeadsCount} New
                </span>
              )}
            </div>
            <span className="text-xs text-[#BAAEA3] block">Customer enquiries and bookings</span>
          </div>
          <div className="flex items-center text-xs font-bold text-[#C6A15B] group-hover:text-[#E7CB87] transition gap-1 pt-2 border-t border-[#55372E]/50">
            <span>Manage Leads</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition" />
          </div>
        </div>

        {/* CARD 3: Customer Reviews */}
        <div
          className="admin-card-surface p-4 border border-[#55372E] hover:border-[#C6A15B] transition group cursor-pointer flex flex-col justify-between h-[145px]"
          onClick={() => onNavigate('testimonials')}
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-[#BAAEA3] uppercase tracking-wider">Customer Reviews</span>
              <div className="w-8 h-8 rounded-lg bg-[#17090F] text-[#C6A15B] flex items-center justify-center border border-[#55372E]">
                <MessageSquare size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <strong className="text-2xl font-serif text-[#F8F2E9] leading-tight">{storeInfo.googleRating || 4.5} ★</strong>
              <span className="text-xs text-[#C6A15B] font-semibold tabular-nums">({reviews.length} Total)</span>
            </div>
            <span className="text-xs text-[#BAAEA3] block">Published customer feedback</span>
          </div>
          <div className="flex items-center text-xs font-bold text-[#C6A15B] group-hover:text-[#E7CB87] transition gap-1 pt-2 border-t border-[#55372E]/50">
            <span>Manage Reviews</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition" />
          </div>
        </div>

        {/* CARD 4: Homepage Sections */}
        <div
          className="admin-card-surface p-4 border border-[#55372E] hover:border-[#C6A15B] transition group cursor-pointer flex flex-col justify-between h-[145px]"
          onClick={() => onNavigate('homepage_builder')}
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-[#BAAEA3] uppercase tracking-wider">Homepage Sections</span>
              <div className="w-8 h-8 rounded-lg bg-[#17090F] text-[#C6A15B] flex items-center justify-center border border-[#55372E]">
                <Layers size={16} />
              </div>
            </div>
            <strong className="text-2xl font-serif text-[#F8F2E9] block tabular-nums leading-tight">
              {activeSectionsCount} / {totalSectionsCount}
            </strong>
            <span className="text-xs text-[#BAAEA3] block">Website content blocks</span>
          </div>
          <div className="flex items-center text-xs font-bold text-[#C6A15B] group-hover:text-[#E7CB87] transition gap-1 pt-2 border-t border-[#55372E]/50">
            <span>Edit Homepage</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition" />
          </div>
        </div>
      </div>

      {/* SECTION C — INVENTORY & GOLD RATE OVERVIEW (Two-Column Desktop Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
        {/* LEFT PANEL: Inventory & Collection Breakdown (7 Cols) */}
        <div className="lg:col-span-7 admin-card-surface p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#55372E]">
            <div className="flex items-center gap-2">
              <Package size={17} className="text-[#C6A15B]" />
              <h3 className="font-bold text-[#F8F2E9] text-base font-serif">Inventory &amp; Collection Breakdown</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="admin-btn-primary text-xs px-2.5 py-1"
                onClick={() => setIsAddProductModalOpen(true)}
              >
                <span>+ Add Item</span>
              </button>
              <button
                type="button"
                className="admin-btn-secondary text-xs px-3 py-1"
                onClick={() => onNavigate('products')}
              >
                <span>Catalog Manager →</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
            <div className="p-2.5 rounded-lg bg-[#17090F] border border-[#55372E]">
              <span className="text-[11px] text-[#BAAEA3] block">Total Products</span>
              <strong className="text-lg text-[#F8F2E9] font-serif block mt-0.5 tabular-nums">{products.length}</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-[#17090F] border border-[#55372E]">
              <span className="text-[11px] text-[#BAAEA3] block">Ready in Showroom</span>
              <strong className="text-lg text-[#34D399] font-serif block mt-0.5 tabular-nums">{readyInStoreCount}</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-[#17090F] border border-[#55372E]">
              <span className="text-[11px] text-[#BAAEA3] block">Royal Bridal</span>
              <strong className="text-lg text-[#E7CB87] font-serif block mt-0.5 tabular-nums">{categoryCounts.bridal}</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-[#17090F] border border-[#55372E]">
              <span className="text-[11px] text-[#BAAEA3] block">Solitaires</span>
              <strong className="text-lg text-[#E7CB87] font-serif block mt-0.5 tabular-nums">{categoryCounts.diamond}</strong>
            </div>
          </div>

          {/* Structured Category List */}
          <div className="pt-1 space-y-1.5">
            <span className="text-xs font-bold text-[#C6A15B] block mb-2">Category Counts:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded bg-[#30141E] border border-[#55372E] flex justify-between items-center">
                <span className="text-[#F8F2E9]">Royal Bridal</span>
                <strong className="text-[#E7CB87] font-mono tabular-nums">{categoryCounts.bridal}</strong>
              </div>
              <div className="p-2.5 rounded bg-[#30141E] border border-[#55372E] flex justify-between items-center">
                <span className="text-[#F8F2E9]">Solitaires</span>
                <strong className="text-[#E7CB87] font-mono tabular-nums">{categoryCounts.diamond}</strong>
              </div>
              <div className="p-2.5 rounded bg-[#30141E] border border-[#55372E] flex justify-between items-center">
                <span className="text-[#F8F2E9]">Gold Necklaces</span>
                <strong className="text-[#E7CB87] font-mono tabular-nums">{categoryCounts.gold}</strong>
              </div>
              <div className="p-2.5 rounded bg-[#30141E] border border-[#55372E] flex justify-between items-center">
                <span className="text-[#F8F2E9]">Temple Kadas</span>
                <strong className="text-[#E7CB87] font-mono tabular-nums">{categoryCounts.bangles}</strong>
              </div>
              <div className="p-2.5 rounded bg-[#30141E] border border-[#55372E] flex justify-between items-center">
                <span className="text-[#F8F2E9]">Jhumkas &amp; Daily</span>
                <strong className="text-[#E7CB87] font-mono tabular-nums">{categoryCounts.everyday}</strong>
              </div>
              <div className="p-2.5 rounded bg-[#30141E] border border-[#55372E] flex justify-between items-center">
                <span className="text-[#F8F2E9]">Men's Jewels</span>
                <strong className="text-[#E7CB87] font-mono tabular-nums">{categoryCounts.mens}</strong>
              </div>
              <div className="p-2.5 rounded bg-[#30141E] border border-[#55372E] flex justify-between items-center">
                <span className="text-[#F8F2E9]">24K Coins</span>
                <strong className="text-[#E7CB87] font-mono tabular-nums">{categoryCounts.coins}</strong>
              </div>
              <div className="p-2.5 rounded bg-[#30141E] border border-[#55372E] flex justify-between items-center">
                <span className="text-[#F8F2E9]">925 Silver</span>
                <strong className="text-[#E7CB87] font-mono tabular-nums">{categoryCounts.silver}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: MCX Bullion Rate Summary (5 Cols) */}
        <div className="lg:col-span-5 admin-card-surface p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#55372E]">
            <div className="flex items-center gap-2">
              <Sliders size={17} className="text-[#C6A15B]" />
              <h3 className="font-bold text-[#F8F2E9] text-base font-serif">MCX Bullion Rate Summary</h3>
            </div>
            <button
              type="button"
              className="admin-btn-secondary text-xs px-3 py-1 flex items-center gap-1"
              onClick={() => {
                setRatesForm({
                  gold24k: liveRates.gold24k || 7845,
                  gold22k: liveRates.gold22k || 7195,
                  gold18k: liveRates.gold18k || 5885,
                  silver999: liveRates.silver999 || 94.5
                });
                setIsRateModalOpen(true);
              }}
            >
              <Edit3 size={12} />
              <span>Edit Rates</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-[#55372E] text-[#C6A15B] uppercase text-[10px] tracking-wider">
                  <th className="pb-2 pr-2">Metal / Purity</th>
                  <th className="pb-2 px-2 text-right">Rate / Gram</th>
                  <th className="pb-2 px-2 text-right">Rate / 10g or 1kg</th>
                  <th className="pb-2 pl-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#55372E]/40">
                <tr className="hover:bg-[#30141E]/40 cursor-pointer" onClick={() => setIsRateModalOpen(true)}>
                  <td className="py-2.5 pr-2">
                    <strong className="text-[#F8F2E9] block font-semibold">24K Gold</strong>
                    <span className="text-[10px] text-[#BAAEA3]">999 Fine Pure</span>
                  </td>
                  <td className="py-2.5 px-2 text-right font-mono text-[#E7CB87] font-bold tabular-nums">
                    ₹{(liveRates.gold24k || 7845).toLocaleString('en-IN')}
                  </td>
                  <td className="py-2.5 px-2 text-right font-mono text-[#F8F2E9] tabular-nums">
                    ₹{((liveRates.gold24k || 7845) * 10).toLocaleString('en-IN')} / 10g
                  </td>
                  <td className="py-2.5 pl-2 text-center">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#168653]/20 text-[#34D399] border border-[#168653]">
                      MCX LIVE
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-[#30141E]/40 cursor-pointer" onClick={() => setIsRateModalOpen(true)}>
                  <td className="py-2.5 pr-2">
                    <strong className="text-[#F8F2E9] block font-semibold">22K Gold</strong>
                    <span className="text-[10px] text-[#BAAEA3]">BIS 916 Hallmark</span>
                  </td>
                  <td className="py-2.5 px-2 text-right font-mono text-[#E7CB87] font-bold tabular-nums">
                    ₹{(liveRates.gold22k || 7195).toLocaleString('en-IN')}
                  </td>
                  <td className="py-2.5 px-2 text-right font-mono text-[#F8F2E9] tabular-nums">
                    ₹{((liveRates.gold22k || 7195) * 10).toLocaleString('en-IN')} / 10g
                  </td>
                  <td className="py-2.5 pl-2 text-center">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#168653]/20 text-[#34D399] border border-[#168653]">
                      MCX LIVE
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-[#30141E]/40 cursor-pointer" onClick={() => setIsRateModalOpen(true)}>
                  <td className="py-2.5 pr-2">
                    <strong className="text-[#F8F2E9] block font-semibold">18K Gold</strong>
                    <span className="text-[10px] text-[#BAAEA3]">750 Diamond Setting</span>
                  </td>
                  <td className="py-2.5 px-2 text-right font-mono text-[#E7CB87] font-bold tabular-nums">
                    ₹{(liveRates.gold18k || 5885).toLocaleString('en-IN')}
                  </td>
                  <td className="py-2.5 px-2 text-right font-mono text-[#F8F2E9] tabular-nums">
                    ₹{((liveRates.gold18k || 5885) * 10).toLocaleString('en-IN')} / 10g
                  </td>
                  <td className="py-2.5 pl-2 text-center">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#168653]/20 text-[#34D399] border border-[#168653]">
                      MCX LIVE
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-[#30141E]/40 cursor-pointer" onClick={() => setIsRateModalOpen(true)}>
                  <td className="py-2.5 pr-2">
                    <strong className="text-[#F8F2E9] block font-semibold">Silver 999</strong>
                    <span className="text-[10px] text-[#BAAEA3]">Pure Bullion</span>
                  </td>
                  <td className="py-2.5 px-2 text-right font-mono text-[#BAAEA3] font-bold tabular-nums">
                    ₹{(liveRates.silver999 || 94.5).toLocaleString('en-IN')}
                  </td>
                  <td className="py-2.5 px-2 text-right font-mono text-[#F8F2E9] tabular-nums">
                    ₹{Math.round((liveRates.silver999 || 94.5) * 1000).toLocaleString('en-IN')} / 1kg
                  </td>
                  <td className="py-2.5 pl-2 text-center">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#168653]/20 text-[#34D399] border border-[#168653]">
                      MCX LIVE
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SECTION D — CUSTOMER INQUIRIES & SECTION E — GOOGLE REVIEWS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
        {/* SECTION D: Customer Inquiries Table (7 Cols) */}
        <div className="lg:col-span-7 admin-card-surface p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#55372E]">
            <div className="flex items-center gap-2">
              <CalendarCheck size={17} className="text-[#C6A15B]" />
              <h3 className="font-bold text-[#F8F2E9] text-base font-serif">Customer Inquiries</h3>
            </div>
            <button
              type="button"
              className="admin-btn-secondary text-xs px-3 py-1"
              onClick={() => onNavigate('bookings')}
            >
              <span>View All Leads ({leads.length}) →</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-[#55372E] text-[#C6A15B] uppercase text-[10px] tracking-wider">
                  <th className="pb-2 pr-2">Customer</th>
                  <th className="pb-2 px-2">Inquiry Type</th>
                  <th className="pb-2 px-2">Contact</th>
                  <th className="pb-2 px-2">Product Reference</th>
                  <th className="pb-2 px-2 text-center">Status</th>
                  <th className="pb-2 pl-2 text-right">Quick Toggle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#55372E]/40">
                {leads.slice(0, 4).map((lead) => (
                  <tr key={lead.id}>
                    <td className="py-2.5 pr-2">
                      <strong className="text-[#F8F2E9] block">{lead.customerName}</strong>
                      <span className="text-[10px] text-[#BAAEA3] block">
                        Date: {formatDateDisplay(lead.preferredDate)}
                      </span>
                    </td>
                    <td className="py-2.5 px-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#30141E] text-[#E7CB87] border border-[#55372E]">
                        {lead.inquiryType}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 font-mono text-[#BAAEA3] text-[11px]">
                      {maskPhone(lead.contactNumber)}
                    </td>
                    <td className="py-2.5 px-2 text-[#BAAEA3] max-w-[130px] truncate" title={lead.productReference || 'Store Inquiry'}>
                      {lead.productReference || 'Sangmohal Store'}
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                          lead.status === 'New'
                            ? 'bg-[#C6A15B]/20 text-[#E7CB87] border border-[#C6A15B]'
                            : lead.status === 'Confirmed'
                            ? 'bg-[#168653]/20 text-[#34D399] border border-[#168653]'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500'
                        }`}
                      >
                        {lead.status || 'New'}
                      </span>
                    </td>
                    <td className="py-2.5 pl-2 text-right">
                      <select
                        value={lead.status || 'New'}
                        onChange={(e) => {
                          updateLeadStatus(lead.id, e.target.value);
                          showToast(`Updated lead status to ${e.target.value}`);
                        }}
                        className="bg-[#17090F] border border-[#55372E] text-[10px] text-[#E7CB87] rounded px-1.5 py-0.5 cursor-pointer outline-none"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION E: Google Reviews & Feedback (5 Cols) */}
        <div className="lg:col-span-5 admin-card-surface p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#55372E]">
            <div className="flex items-center gap-2">
              <MessageSquare size={17} className="text-[#C6A15B]" />
              <h3 className="font-bold text-[#F8F2E9] text-base font-serif">Google Reviews</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="admin-btn-primary text-xs px-2.5 py-1"
                onClick={() => setIsAddReviewModalOpen(true)}
              >
                <span>+ Add Review</span>
              </button>
              <button
                type="button"
                className="admin-btn-secondary text-xs px-2.5 py-1"
                onClick={() => onNavigate('testimonials')}
              >
                <span>Manage →</span>
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#17090F] border border-[#55372E] flex items-center justify-between">
            <div>
              <span className="text-xs text-[#BAAEA3] block">Google Rating</span>
              <strong className="text-2xl font-serif text-[#F8F2E9] block mt-0.5">{storeInfo.googleRating || 4.5} ★</strong>
              <span className="text-[10px] text-[#34D399] block mt-0.5">10 Verified Reviews</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#BAAEA3] block">Website Testimonials</span>
              <strong className="text-2xl font-serif text-[#E7CB87] block mt-0.5 tabular-nums">{reviews.length}</strong>
              <span className="text-[10px] text-[#C6A15B] block mt-0.5">{verifiedReviewsCount} Verified</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-[#C6A15B] block">Recent Verified Customer Feedback:</span>
            {reviews.slice(0, 2).map((rev) => (
              <div key={rev.id} className="p-2.5 rounded bg-[#30141E] border border-[#55372E] space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <strong className="text-[#F8F2E9]">{rev.author}</strong>
                  <span className="text-[#C6A15B] font-bold">{'★'.repeat(rev.rating || 5)}</span>
                </div>
                <p className="text-xs text-[#BAAEA3] italic line-clamp-2">"{rev.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION F — QUICK ACTIONS & SECTION G — SHOWROOM VERIFICATION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* SECTION F: Quick Actions 4-Card Grid (8 Cols) */}
        <div className="lg:col-span-8 admin-card-surface p-5 space-y-4">
          <h3 className="font-bold text-[#F8F2E9] text-base font-serif pb-3 border-b border-[#55372E]">
            Quick Actions &amp; Administrative Shortcuts
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Action 1 */}
            <div
              className="p-3.5 rounded-lg bg-[#17090F] border border-[#55372E] hover:border-[#C6A15B] transition cursor-pointer group space-y-1.5 h-[110px] flex flex-col justify-between"
              onClick={() => onNavigate('homepage_builder')}
            >
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-lg bg-[#30141E] text-[#C6A15B] flex items-center justify-center border border-[#55372E]">
                  <Layers size={15} />
                </div>
                <ArrowRight size={14} className="text-[#BAAEA3] group-hover:text-[#C6A15B] group-hover:translate-x-1 transition" />
              </div>
              <div>
                <strong className="text-xs text-[#F8F2E9] block group-hover:text-[#E7CB87] transition">Edit Homepage Layout</strong>
                <p className="text-[11px] text-[#BAAEA3] line-clamp-1">Customise visual banner sequences and sections.</p>
              </div>
            </div>

            {/* Action 2 */}
            <div
              className="p-3.5 rounded-lg bg-[#17090F] border border-[#55372E] hover:border-[#C6A15B] transition cursor-pointer group space-y-1.5 h-[110px] flex flex-col justify-between"
              onClick={() => setIsAddProductModalOpen(true)}
            >
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-lg bg-[#30141E] text-[#C6A15B] flex items-center justify-center border border-[#55372E]">
                  <PlusCircle size={15} />
                </div>
                <ArrowRight size={14} className="text-[#BAAEA3] group-hover:text-[#C6A15B] group-hover:translate-x-1 transition" />
              </div>
              <div>
                <strong className="text-xs text-[#F8F2E9] block group-hover:text-[#E7CB87] transition">Add Jewellery Product</strong>
                <p className="text-[11px] text-[#BAAEA3] line-clamp-1">Publish new 22K hallmarked gold or polki designs.</p>
              </div>
            </div>

            {/* Action 3 */}
            <div
              className="p-3.5 rounded-lg bg-[#17090F] border border-[#55372E] hover:border-[#C6A15B] transition cursor-pointer group space-y-1.5 h-[110px] flex flex-col justify-between"
              onClick={() => setIsRateModalOpen(true)}
            >
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-lg bg-[#30141E] text-[#C6A15B] flex items-center justify-center border border-[#55372E]">
                  <Sliders size={15} />
                </div>
                <ArrowRight size={14} className="text-[#BAAEA3] group-hover:text-[#C6A15B] group-hover:translate-x-1 transition" />
              </div>
              <div>
                <strong className="text-xs text-[#F8F2E9] block group-hover:text-[#E7CB87] transition">Update Gold Rates</strong>
                <p className="text-[11px] text-[#BAAEA3] line-clamp-1">Adjust MCX 24K, 22K, 18K and silver rates.</p>
              </div>
            </div>

            {/* Action 4 */}
            <div
              className="p-3.5 rounded-lg bg-[#17090F] border border-[#55372E] hover:border-[#C6A15B] transition cursor-pointer group space-y-1.5 h-[110px] flex flex-col justify-between"
              onClick={() => onNavigate('media_library')}
            >
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-lg bg-[#30141E] text-[#C6A15B] flex items-center justify-center border border-[#55372E]">
                  <FolderOpen size={15} />
                </div>
                <ArrowRight size={14} className="text-[#BAAEA3] group-hover:text-[#C6A15B] group-hover:translate-x-1 transition" />
              </div>
              <div>
                <strong className="text-xs text-[#F8F2E9] block group-hover:text-[#E7CB87] transition">Upload Showroom Media</strong>
                <p className="text-[11px] text-[#BAAEA3] line-clamp-1">Upload photography, banners, and video reels.</p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION G: Showroom Verification Panel (4 Cols) */}
        <div className="lg:col-span-4 admin-card-surface p-5 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-[#55372E]">
            <h3 className="font-bold text-[#F8F2E9] text-base font-serif">
              Showroom Verification
            </h3>
            <button
              type="button"
              className="text-xs text-[#C6A15B] hover:underline font-bold"
              onClick={() => setIsInfoModalOpen(true)}
            >
              Edit Details
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-2.5 rounded-lg bg-[#17090F] border border-[#55372E] space-y-0.5">
              <div className="flex items-center gap-1.5 text-[#E7CB87] font-bold">
                <ShieldCheck size={14} />
                <span>BIS Hallmark Certification</span>
              </div>
              <p className="text-[#BAAEA3] text-[11px]">100% BIS 916 Hallmark ({storeInfo.hallmarkCode || 'HUID Certified'})</p>
            </div>

            <div className="p-2.5 rounded-lg bg-[#17090F] border border-[#55372E] space-y-0.5">
              <div className="flex items-center gap-1.5 text-[#E7CB87] font-bold">
                <Award size={14} />
                <span>GSTIN Credentials</span>
              </div>
              <p className="text-[#BAAEA3] font-mono text-[11px]">{storeInfo.gstin || '09ADMPS4528E1Z8'} (Registered Enterprise)</p>
            </div>

            <div className="p-2.5 rounded-lg bg-[#17090F] border border-[#55372E] space-y-0.5">
              <div className="flex items-center gap-1.5 text-[#E7CB87] font-bold">
                <MapPin size={14} />
                <span>Sangmohal Showroom Address</span>
              </div>
              <p className="text-[#BAAEA3] text-[11px]">{storeInfo.fullAddress || 'Station Rd, nearby Jila Karagar, Mirzapur, UP 231001'}</p>
            </div>

            <div className="p-2.5 rounded-lg bg-[#17090F] border border-[#55372E] space-y-0.5">
              <div className="flex items-center gap-1.5 text-[#E7CB87] font-bold">
                <Scale size={14} />
                <span>Purity Karatmeter Testing Lab</span>
              </div>
              <p className="text-[#BAAEA3] text-[11px]">Free in-store computerized gold purity testing.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DIRECT INLINE EDITING MODALS ON DASHBOARD                                 */}
      {/* ========================================================================= */}

      {/* 1. QUICK GOLD RATES EDIT MODAL */}
      {isRateModalOpen && (
        <div className="fixed inset-0 z-[110000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#260F18] border border-[#C6A15B] rounded-xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-[#55372E]">
              <div className="flex items-center gap-2">
                <Sliders size={18} className="text-[#C6A15B]" />
                <h3 className="font-serif text-lg font-bold text-[#F8F2E9]">Quick Edit Live Gold &amp; Silver Rates</h3>
              </div>
              <button
                type="button"
                className="text-[#BAAEA3] hover:text-[#F8F2E9] p-1"
                onClick={() => setIsRateModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveRates} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#E7CB87] block mb-1">
                    24K Pure Gold (₹/g)
                  </label>
                  <input
                    type="number"
                    value={ratesForm.gold24k}
                    onChange={(e) => setRatesForm({ ...ratesForm, gold24k: e.target.value })}
                    className="admin-input-field font-mono"
                    required
                  />
                  <span className="text-[10px] text-[#BAAEA3] block mt-0.5">10g = ₹{(ratesForm.gold24k * 10).toLocaleString('en-IN')}</span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#E7CB87] block mb-1">
                    22K Hallmark Gold (₹/g)
                  </label>
                  <input
                    type="number"
                    value={ratesForm.gold22k}
                    onChange={(e) => setRatesForm({ ...ratesForm, gold22k: e.target.value })}
                    className="admin-input-field font-mono"
                    required
                  />
                  <span className="text-[10px] text-[#BAAEA3] block mt-0.5">10g = ₹{(ratesForm.gold22k * 10).toLocaleString('en-IN')}</span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#E7CB87] block mb-1">
                    18K Diamond Gold (₹/g)
                  </label>
                  <input
                    type="number"
                    value={ratesForm.gold18k}
                    onChange={(e) => setRatesForm({ ...ratesForm, gold18k: e.target.value })}
                    className="admin-input-field font-mono"
                    required
                  />
                  <span className="text-[10px] text-[#BAAEA3] block mt-0.5">10g = ₹{(ratesForm.gold18k * 10).toLocaleString('en-IN')}</span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#E7CB87] block mb-1">
                    Silver 999 (₹/g)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={ratesForm.silver999}
                    onChange={(e) => setRatesForm({ ...ratesForm, silver999: e.target.value })}
                    className="admin-input-field font-mono"
                    required
                  />
                  <span className="text-[10px] text-[#BAAEA3] block mt-0.5">1kg = ₹{Math.round(ratesForm.silver999 * 1000).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#55372E]">
                <button
                  type="button"
                  className="admin-btn-secondary text-xs"
                  onClick={() => setIsRateModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary text-xs">
                  Save Rates Live
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. QUICK STORE INFO EDIT MODAL */}
      {isInfoModalOpen && (
        <div className="fixed inset-0 z-[110000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#260F18] border border-[#C6A15B] rounded-xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-[#55372E]">
              <div className="flex items-center gap-2">
                <Edit3 size={18} className="text-[#C6A15B]" />
                <h3 className="font-serif text-lg font-bold text-[#F8F2E9]">Quick Edit Showroom Profile</h3>
              </div>
              <button
                type="button"
                className="text-[#BAAEA3] hover:text-[#F8F2E9] p-1"
                onClick={() => setIsInfoModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveInfo} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#E7CB87] block mb-1">Store Name</label>
                <input
                  type="text"
                  value={infoForm.name}
                  onChange={(e) => setInfoForm({ ...infoForm, name: e.target.value })}
                  className="admin-input-field"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#E7CB87] block mb-1">Hindi Title</label>
                <input
                  type="text"
                  value={infoForm.hindiName}
                  onChange={(e) => setInfoForm({ ...infoForm, hindiName: e.target.value })}
                  className="admin-input-field"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#E7CB87] block mb-1">GSTIN Number</label>
                <input
                  type="text"
                  value={infoForm.gstin}
                  onChange={(e) => setInfoForm({ ...infoForm, gstin: e.target.value })}
                  className="admin-input-field font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#E7CB87] block mb-1">Full Showroom Address</label>
                <textarea
                  rows={2}
                  value={infoForm.fullAddress}
                  onChange={(e) => setInfoForm({ ...infoForm, fullAddress: e.target.value })}
                  className="admin-input-field"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#55372E]">
                <button
                  type="button"
                  className="admin-btn-secondary text-xs"
                  onClick={() => setIsInfoModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary text-xs">
                  Update Showroom Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. QUICK ADD PRODUCT MODAL */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-[110000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#260F18] border border-[#C6A15B] rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-[#55372E]">
              <div className="flex items-center gap-2">
                <PlusCircle size={18} className="text-[#C6A15B]" />
                <h3 className="font-serif text-lg font-bold text-[#F8F2E9]">Add New Jewellery Design</h3>
              </div>
              <button
                type="button"
                className="text-[#BAAEA3] hover:text-[#F8F2E9] p-1"
                onClick={() => setIsAddProductModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#E7CB87] block mb-1">Product Title</label>
                <input
                  type="text"
                  placeholder="e.g. Royal Bridal Choker Set"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="admin-input-field"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#E7CB87] block mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="admin-input-field"
                  >
                    <option value="bridal">Royal Bridal</option>
                    <option value="gold">Gold Necklaces</option>
                    <option value="bangles">Temple Bangles</option>
                    <option value="diamond">Solitaires</option>
                    <option value="everyday">Everyday &amp; Festive</option>
                    <option value="mens">Men's Jewels</option>
                    <option value="coins">24K Coins</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#E7CB87] block mb-1">Net Weight</label>
                  <input
                    type="text"
                    value={productForm.netGoldWeight}
                    onChange={(e) => setProductForm({ ...productForm, netGoldWeight: e.target.value })}
                    placeholder="22.50g"
                    className="admin-input-field"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#E7CB87] block mb-1">Making Charge (%)</label>
                  <input
                    type="number"
                    value={productForm.makingPercent}
                    onChange={(e) => setProductForm({ ...productForm, makingPercent: parseFloat(e.target.value) || 10 })}
                    className="admin-input-field"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#E7CB87] block mb-1">Badge Tag</label>
                  <select
                    value={productForm.badge}
                    onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                    className="admin-input-field"
                  >
                    <option value="Showroom Original">Showroom Original</option>
                    <option value="Masterpiece">Masterpiece</option>
                    <option value="Trending">Trending</option>
                    <option value="Best Seller">Best Seller</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#55372E]">
                <button
                  type="button"
                  className="admin-btn-secondary text-xs"
                  onClick={() => setIsAddProductModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary text-xs">
                  Save Product to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. QUICK ADD REVIEW MODAL */}
      {isAddReviewModalOpen && (
        <div className="fixed inset-0 z-[110000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#260F18] border border-[#C6A15B] rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-[#55372E]">
              <div className="flex items-center gap-2">
                <Star size={18} className="text-[#C6A15B]" />
                <h3 className="font-serif text-lg font-bold text-[#F8F2E9]">Add Verified Customer Review</h3>
              </div>
              <button
                type="button"
                className="text-[#BAAEA3] hover:text-[#F8F2E9] p-1"
                onClick={() => setIsAddReviewModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveReview} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#E7CB87] block mb-1">Customer Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Chandra Verma"
                    value={reviewForm.author}
                    onChange={(e) => setReviewForm({ ...reviewForm, author: e.target.value })}
                    className="admin-input-field"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#E7CB87] block mb-1">Rating</label>
                  <select
                    value={reviewForm.rating}
                    onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) || 5 })}
                    className="admin-input-field"
                  >
                    <option value="5">★★★★★ (5 Stars)</option>
                    <option value="4">★★★★☆ (4 Stars)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#E7CB87] block mb-1">Review Text</label>
                <textarea
                  rows={3}
                  placeholder="Customer feedback quote..."
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  className="admin-input-field"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#55372E]">
                <button
                  type="button"
                  className="admin-btn-secondary text-xs"
                  onClick={() => setIsAddReviewModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary text-xs">
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(DashboardModule);
