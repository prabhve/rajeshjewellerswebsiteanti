import React from 'react';
import {
  Package,
  Grid,
  Image as ImageIcon,
  Video,
  MessageSquare,
  Users,
  CalendarCheck,
  TrendingUp,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  PlusCircle,
  Sliders,
  Layers,
  Tag,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

const DashboardModule = ({
  products = [],
  liveRates = {},
  storeInfo = {},
  leads = [],
  reviews = [],
  hasUnsavedDrafts = false,
  onNavigate = () => {},
  publishDraftToLiveSite = () => {}
}) => {
  const newLeadsCount = leads.filter((l) => l.status === 'New').length;
  const verifiedReviewsCount = reviews.filter((r) => r.tag?.includes('Verified')).length;

  return (
    <div className="admin-tab-pane">
      {/* Top Banner with Quick Publish Status */}
      <div className="admin-pane-header bg-gradient-to-r from-amber-950/60 to-burgundy-950 p-4 rounded-xl border border-amber-600/30 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold font-serif text-white">Showroom Business & Website Control Dashboard</h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              Live & Real-time
            </span>
          </div>
          <p className="text-xs text-amber-200/80 mt-1">
            Welcome to Rajesh Jewellers Sangmohal Store Management Platform. Manage all 23 CMS modules, live bullion rates, inventory, and customer leads.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {hasUnsavedDrafts && (
            <button
              type="button"
              className="px-3 py-2 rounded-lg bg-amber-500 text-black font-bold text-xs flex items-center gap-1.5 hover:bg-amber-400 transition"
              onClick={publishDraftToLiveSite}
            >
              <Sparkles size={14} />
              <span>Publish Drafts to Live Site</span>
            </button>
          )}
          <button
            type="button"
            className="admin-btn-accent"
            onClick={() => onNavigate('products')}
          >
            <PlusCircle size={15} />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row 1: Business Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div
          className="admin-card-surface p-4 border border-amber-600/20 cursor-pointer hover:border-amber-500/50 transition"
          onClick={() => onNavigate('products')}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-amber-200/70 font-semibold">Active Inventory</span>
            <div className="w-8 h-8 rounded-lg bg-amber-950/80 text-amber-400 flex items-center justify-center border border-amber-600/30">
              <Package size={18} />
            </div>
          </div>
          <strong className="text-2xl font-serif text-white block">{products.length}</strong>
          <span className="text-[11px] text-gray-400 mt-1 block">Hallmarked 22K & 24K Designs</span>
        </div>

        <div
          className="admin-card-surface p-4 border border-amber-600/20 cursor-pointer hover:border-amber-500/50 transition"
          onClick={() => onNavigate('bookings')}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-amber-200/70 font-semibold">Customer Leads</span>
            <div className="w-8 h-8 rounded-lg bg-amber-950/80 text-amber-400 flex items-center justify-center border border-amber-600/30">
              <CalendarCheck size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <strong className="text-2xl font-serif text-white block">{leads.length}</strong>
            {newLeadsCount > 0 && (
              <span className="text-xs font-bold text-amber-400 bg-amber-950 px-1.5 py-0.5 rounded border border-amber-600/40">
                {newLeadsCount} New
              </span>
            )}
          </div>
          <span className="text-[11px] text-gray-400 mt-1 block">VIP Visits & Video Shopping</span>
        </div>

        <div
          className="admin-card-surface p-4 border border-amber-600/20 cursor-pointer hover:border-amber-500/50 transition"
          onClick={() => onNavigate('testimonials')}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-amber-200/70 font-semibold">Google Reviews</span>
            <div className="w-8 h-8 rounded-lg bg-amber-950/80 text-amber-400 flex items-center justify-center border border-amber-600/30">
              <MessageSquare size={18} />
            </div>
          </div>
          <strong className="text-2xl font-serif text-white block">{reviews.length}</strong>
          <span className="text-[11px] text-emerald-400 mt-1 block">⭐ {storeInfo?.googleRating || 4.9} Rating ({verifiedReviewsCount} Verified)</span>
        </div>

        <div
          className="admin-card-surface p-4 border border-amber-600/20 cursor-pointer hover:border-amber-500/50 transition"
          onClick={() => onNavigate('rates')}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-amber-200/70 font-semibold">22K Gold Benchmark</span>
            <div className="w-8 h-8 rounded-lg bg-amber-950/80 text-amber-400 flex items-center justify-center border border-amber-600/30">
              <TrendingUp size={18} />
            </div>
          </div>
          <strong className="text-2xl font-serif text-amber-300 block">₹{(liveRates.gold22k * 10 || 71860).toLocaleString('en-IN')} / 10g</strong>
          <span className="text-[11px] text-gray-400 mt-1 block">24K: ₹{(liveRates.gold24k * 10 || 78450).toLocaleString('en-IN')} / 10g</span>
        </div>
      </div>

      {/* Grid Row 2: Live Rate Status & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left Column 2-Spans: Live Rates Overview & System Status */}
        <div className="lg:col-span-2 space-y-6">
          <div className="admin-card-surface p-5">
            <div className="flex items-center justify-between pb-3 border-b border-amber-600/20 mb-4">
              <div className="flex items-center gap-2">
                <Sliders size={16} className="text-amber-400" />
                <h3 className="font-bold text-white text-sm">MCX Live Bullion Rates Status</h3>
              </div>
              <button
                type="button"
                className="text-xs font-bold text-amber-300 hover:text-white flex items-center gap-1"
                onClick={() => onNavigate('rates')}
              >
                <span>Manage Rates</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-black/40 border border-amber-600/20">
                <span className="text-[11px] text-gray-400 block">24K Pure Gold</span>
                <strong className="text-base text-amber-300 font-serif">₹{liveRates.gold24k?.toLocaleString('en-IN')}/g</strong>
                <span className="text-[10px] text-gray-500 block">10g = ₹{(liveRates.gold24k * 10).toLocaleString('en-IN')}</span>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-amber-600/20">
                <span className="text-[11px] text-gray-400 block">22K Hallmark</span>
                <strong className="text-base text-amber-300 font-serif">₹{liveRates.gold22k?.toLocaleString('en-IN')}/g</strong>
                <span className="text-[10px] text-gray-500 block">10g = ₹{(liveRates.gold22k * 10).toLocaleString('en-IN')}</span>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-amber-600/20">
                <span className="text-[11px] text-gray-400 block">18K Diamond</span>
                <strong className="text-base text-amber-300 font-serif">₹{liveRates.gold18k?.toLocaleString('en-IN')}/g</strong>
                <span className="text-[10px] text-gray-500 block">10g = ₹{(liveRates.gold18k * 10).toLocaleString('en-IN')}</span>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-amber-600/20">
                <span className="text-[11px] text-gray-400 block">Fine Silver 999</span>
                <strong className="text-base text-gray-200 font-serif">₹{liveRates.silver999?.toLocaleString('en-IN')}/g</strong>
                <span className="text-[10px] text-gray-500 block">1Kg = ₹{Math.round(liveRates.silver999 * 1000).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Customer Leads Tray Summary */}
          <div className="admin-card-surface p-5">
            <div className="flex items-center justify-between pb-3 border-b border-amber-600/20 mb-4">
              <div className="flex items-center gap-2">
                <CalendarCheck size={16} className="text-amber-400" />
                <h3 className="font-bold text-white text-sm">Recent Customer Inquiries & VIP Requests</h3>
              </div>
              <button
                type="button"
                className="text-xs font-bold text-amber-300 hover:text-white flex items-center gap-1"
                onClick={() => onNavigate('bookings')}
              >
                <span>View All Leads ({leads.length})</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="space-y-2">
              {leads.slice(0, 3).map((lead) => (
                <div key={lead.id} className="p-3 rounded-lg bg-black/30 border border-white/5 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-sm text-white">{lead.customerName}</strong>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700/50">
                        {lead.inquiryType}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 block mt-0.5">{lead.contactNumber} • {lead.productReference || 'General Inquiry'}</span>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                    {lead.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column 1-Span: Quick Action Shortcuts */}
        <div className="admin-card-surface p-5 space-y-4">
          <h3 className="font-bold text-white text-sm pb-2 border-b border-amber-600/20">
            Quick Actions & Shortcuts
          </h3>

          <div className="space-y-2">
            <button
              type="button"
              className="w-full p-3 rounded-lg bg-black/40 border border-amber-600/20 hover:border-amber-500/50 text-left flex items-center justify-between group transition"
              onClick={() => onNavigate('homepage_builder')}
            >
              <div className="flex items-center gap-2.5">
                <Layers size={16} className="text-amber-400" />
                <span className="text-xs font-semibold text-gray-200 group-hover:text-white">Edit Homepage Layout</span>
              </div>
              <ArrowRight size={13} className="text-gray-500 group-hover:text-amber-400 transition" />
            </button>

            <button
              type="button"
              className="w-full p-3 rounded-lg bg-black/40 border border-amber-600/20 hover:border-amber-500/50 text-left flex items-center justify-between group transition"
              onClick={() => onNavigate('offers')}
            >
              <div className="flex items-center gap-2.5">
                <Tag size={16} className="text-amber-400" />
                <span className="text-xs font-semibold text-gray-200 group-hover:text-white">Manage Festive Offers</span>
              </div>
              <ArrowRight size={13} className="text-gray-500 group-hover:text-amber-400 transition" />
            </button>

            <button
              type="button"
              className="w-full p-3 rounded-lg bg-black/40 border border-amber-600/20 hover:border-amber-500/50 text-left flex items-center justify-between group transition"
              onClick={() => onNavigate('seo')}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles size={16} className="text-amber-400" />
                <span className="text-xs font-semibold text-gray-200 group-hover:text-white">Update SEO Meta Tags</span>
              </div>
              <ArrowRight size={13} className="text-gray-500 group-hover:text-amber-400 transition" />
            </button>

            <button
              type="button"
              className="w-full p-3 rounded-lg bg-black/40 border border-amber-600/20 hover:border-amber-500/50 text-left flex items-center justify-between group transition"
              onClick={() => onNavigate('backup_restore')}
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span className="text-xs font-semibold text-gray-200 group-hover:text-white">Download Backup JSON</span>
              </div>
              <ArrowRight size={13} className="text-gray-500 group-hover:text-amber-400 transition" />
            </button>
          </div>

          <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-600/30 text-xs text-amber-200 space-y-1">
            <strong className="block text-amber-300">Showroom Verification</strong>
            <span>100% BIS 916 Hallmark (Govt Laser HUID) • Sangmohal, Mirzapur</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DashboardModule);
