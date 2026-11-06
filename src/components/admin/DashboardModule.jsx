import React from 'react';
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
  CheckCircle2
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
  publishDraftToLiveSite = () => {}
}) => {
  const newLeadsCount = leads.filter((l) => l.status === 'New').length;
  const verifiedReviewsCount = reviews.filter((r) => r.tag?.includes('Verified') || r.tag?.includes('Google')).length;
  const activeSectionsCount = homepageSections.filter((s) => s.enabled !== false).length;
  const totalSectionsCount = homepageSections.length || 19;

  // Inventory breakdown counts
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

  // Mask contact phone for dashboard privacy
  const maskPhone = (phoneStr) => {
    if (!phoneStr) return '+91 ••••• •••••';
    const clean = phoneStr.trim();
    if (clean.length > 8) {
      return clean.slice(0, 6) + '*****';
    }
    return clean;
  };

  // Format date helper
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

  return (
    <div className="admin-tab-pane">
      {/* SECTION A — DASHBOARD INTRODUCTION */}
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
            </div>
            <p className="text-xs text-[#BAAEA3] max-w-2xl leading-relaxed">
              Manage jewellery inventory, bullion rates, customer enquiries and website operations from one central workspace.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {hasUnsavedDrafts && (
              <button
                type="button"
                className="admin-btn-secondary text-xs px-3.5 py-2 font-bold flex items-center gap-1.5"
                onClick={publishDraftToLiveSite}
              >
                <Sparkles size={14} />
                <span>Publish Drafts to Live Site</span>
              </button>
            )}

            <button
              type="button"
              className="admin-btn-primary text-xs px-4 py-2 font-bold flex items-center gap-1.5"
              onClick={() => onNavigate('products')}
            >
              <PlusCircle size={15} />
              <span>+ Add New Product</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-[#55372E] text-xs text-[#BAAEA3] flex-wrap">
          <span className="inline-flex items-center gap-1">
            <span>Last Updated:</span>
            <strong className="text-[#E7CB87] tabular-nums">{new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</strong>
          </span>
          <span className="text-[#55372E]">•</span>
          <span className="inline-flex items-center gap-1">
            <span>Showroom Location:</span>
            <strong className="text-[#F8F2E9]">Sangmohal, Station Rd, Mirzapur</strong>
          </span>
          <span className="text-[#55372E]">•</span>
          <span className="inline-flex items-center gap-1">
            <span>GSTIN:</span>
            <strong className="text-[#E7CB87] tabular-nums">{storeInfo.gstin || '09ADMPS4528E1Z8'}</strong>
          </span>
        </div>
      </div>

      {/* SECTION B — FOUR KPI CARDS (4-Column Grid on Desktop) */}
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
            <button
              type="button"
              className="admin-btn-secondary text-xs px-3 py-1"
              onClick={() => onNavigate('products')}
            >
              <span>Catalog Manager →</span>
            </button>
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
              className="admin-btn-secondary text-xs px-3 py-1"
              onClick={() => onNavigate('rates')}
            >
              <span>Manage Rates →</span>
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
                <tr>
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
                <tr>
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
                <tr>
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
                <tr>
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
                  <th className="pb-2 pl-2 text-right">Action</th>
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
                      <button
                        type="button"
                        className="text-xs font-bold text-[#C6A15B] hover:underline"
                        onClick={() => onNavigate('bookings')}
                      >
                        View
                      </button>
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
            <button
              type="button"
              className="admin-btn-secondary text-xs px-3 py-1"
              onClick={() => onNavigate('testimonials')}
            >
              <span>Manage Reviews →</span>
            </button>
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
              onClick={() => onNavigate('products')}
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
              onClick={() => onNavigate('rates')}
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
          <h3 className="font-bold text-[#F8F2E9] text-base font-serif pb-3 border-b border-[#55372E]">
            Showroom Verification
          </h3>

          <div className="space-y-2.5 text-xs">
            <div className="p-2.5 rounded-lg bg-[#17090F] border border-[#55372E] space-y-0.5">
              <div className="flex items-center gap-1.5 text-[#E7CB87] font-bold">
                <ShieldCheck size={14} />
                <span>BIS Hallmark Certification</span>
              </div>
              <p className="text-[#BAAEA3] text-[11px]">100% BIS 916 Hallmark with 6-digit HUID purity code.</p>
            </div>

            <div className="p-2.5 rounded-lg bg-[#17090F] border border-[#55372E] space-y-0.5">
              <div className="flex items-center gap-1.5 text-[#E7CB87] font-bold">
                <Award size={14} />
                <span>GSTIN Credentials</span>
              </div>
              <p className="text-[#BAAEA3] font-mono text-[11px]">09ADMPS4528E1Z8 (Registered Enterprise)</p>
            </div>

            <div className="p-2.5 rounded-lg bg-[#17090F] border border-[#55372E] space-y-0.5">
              <div className="flex items-center gap-1.5 text-[#E7CB87] font-bold">
                <MapPin size={14} />
                <span>Sangmohal Showroom Address</span>
              </div>
              <p className="text-[#BAAEA3] text-[11px]">Station Rd, nearby Jila Karagar, Mirzapur, UP 231001</p>
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
    </div>
  );
};

export default React.memo(DashboardModule);
