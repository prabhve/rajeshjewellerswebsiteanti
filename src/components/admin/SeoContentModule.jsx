import React, { useState } from 'react';
import { Search, Save, CheckCircle2, Globe, Sparkles } from 'lucide-react';

const SeoContentModule = ({
  seoConfig = {},
  setSeoConfig = () => {},
  showToast = () => {}
}) => {
  const [form, setForm] = useState({
    globalTitle: seoConfig.globalTitle || 'Rajesh Jewellers Mirzapur | Online Jewellery Store & Live Bullion Rates',
    globalMetaDesc: seoConfig.globalMetaDesc || 'Shop 22K BIS 916 hallmarked bridal jewellery, gold necklaces, antique temple bangles, certified diamond solitaires, and 925 silver at Rajesh Jewellers, Sangmohal, Mirzapur.',
    keywords: seoConfig.keywords || 'Rajesh Jewellers Mirzapur, Sangmohal Jewellers, gold store Mirzapur, buy jewellery online Mirzapur, 916 hallmark gold, gold rate today Mirzapur',
    ogImage: seoConfig.ogImage || '/assets/images/hero_bridal.jpg',
    canonicalDomain: seoConfig.canonicalDomain || 'https://rajeshjewellers.com',
    googleSiteVerification: seoConfig.googleSiteVerification || 'rj_google_verify_code_231001',
    indexWebsite: seoConfig.indexWebsite !== false
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSeoConfig(form);
    showToast('Updated global SEO metadata & OpenGraph tags! 🌐');
  };

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2 className="admin-pane-title">17. SEO &amp; Search Engine Optimization</h2>
          <p className="admin-pane-desc">
            Configure global website titles, meta descriptions, OpenGraph social share cards, and Schema.org structured data.
          </p>
        </div>
        <button type="button" className="admin-btn-primary" onClick={handleSave}>
          <Save size={15} />
          <span>Save SEO Settings</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: SEO Inputs */}
        <div className="lg:col-span-7 space-y-4">
          <form onSubmit={handleSave} className="admin-card-surface p-5 space-y-4">
            <h3 className="font-bold text-white text-sm pb-2 border-b border-amber-600/20">
              Global Meta Tags &amp; OpenGraph
            </h3>

            <div>
              <label className="admin-label">Global Page Title (&lt;title&gt;)</label>
              <input
                type="text"
                value={form.globalTitle}
                onChange={(e) => setForm({ ...form, globalTitle: e.target.value })}
                className="admin-input-field"
                required
              />
            </div>

            <div>
              <label className="admin-label">Meta Description (&lt;meta name="description"&gt;)</label>
              <textarea
                rows={3}
                value={form.globalMetaDesc}
                onChange={(e) => setForm({ ...form, globalMetaDesc: e.target.value })}
                className="admin-input-field"
                required
              />
            </div>

            <div>
              <label className="admin-label">Target Keywords (Comma Separated)</label>
              <textarea
                rows={2}
                value={form.keywords}
                onChange={(e) => setForm({ ...form, keywords: e.target.value })}
                className="admin-input-field"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="admin-label">OpenGraph Image URL</label>
                <input
                  type="text"
                  value={form.ogImage}
                  onChange={(e) => setForm({ ...form, ogImage: e.target.value })}
                  className="admin-input-field"
                />
              </div>

              <div>
                <label className="admin-label">Canonical Domain URL</label>
                <input
                  type="text"
                  value={form.canonicalDomain}
                  onChange={(e) => setForm({ ...form, canonicalDomain: e.target.value })}
                  className="admin-input-field"
                />
              </div>
            </div>

            <button type="submit" className="admin-btn-primary w-full justify-center">
              <CheckCircle2 size={16} />
              <span>Apply SEO Configuration</span>
            </button>
          </form>
        </div>

        {/* Right Preview: Google Search Result Snippet Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="admin-card-surface p-5 space-y-3">
            <h3 className="font-bold text-white text-sm pb-2 border-b border-amber-600/20">
              Google Search Result Snippet Preview
            </h3>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-blue-400">
                <Globe size={12} />
                <span className="truncate">{form.canonicalDomain} › sangmohal-mirzapur</span>
              </div>
              <h4 className="text-base text-blue-400 hover:underline font-serif font-bold leading-tight cursor-pointer">
                {form.globalTitle}
              </h4>
              <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                {form.globalMetaDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SeoContentModule);
