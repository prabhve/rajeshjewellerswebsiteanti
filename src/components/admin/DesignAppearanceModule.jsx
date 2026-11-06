import React, { useState } from 'react';
import { Palette, Save, CheckCircle2, RefreshCw } from 'lucide-react';

const DesignAppearanceModule = ({
  designSettings = {},
  setDesignSettings = () => {},
  showToast = () => {}
}) => {
  const [settings, setSettings] = useState(designSettings);

  const handleSave = (e) => {
    e.preventDefault();
    setDesignSettings(settings);
    showToast('Applied brand theme & appearance presets! 🎨');
  };

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2 className="admin-pane-title">19. Design &amp; Brand Appearance Settings</h2>
          <p className="admin-pane-desc">
            Customize primary luxury colors, font pairings, button border radius, and product card styling presets.
          </p>
        </div>
        <button type="button" className="admin-btn-primary" onClick={handleSave}>
          <Save size={15} />
          <span>Save Appearance Settings</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form onSubmit={handleSave} className="admin-card-surface p-5 space-y-4">
          <h3 className="font-bold text-white text-sm pb-2 border-b border-amber-600/20">
            Brand Color Scheme
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="admin-label">Deep Burgundy (#280D16)</label>
              <input
                type="color"
                value={settings.primaryColor || '#280D16'}
                onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                className="w-full h-10 rounded bg-black/60 border border-amber-600/30 p-1 cursor-pointer"
              />
            </div>

            <div>
              <label className="admin-label">Champagne Gold (#C6A15B)</label>
              <input
                type="color"
                value={settings.accentColor || '#C6A15B'}
                onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                className="w-full h-10 rounded bg-black/60 border border-amber-600/30 p-1 cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="admin-label">Heading Font Family</label>
            <select
              value={settings.fontHeading || 'Playfair Display'}
              onChange={(e) => setSettings({ ...settings, fontHeading: e.target.value })}
              className="admin-input-field"
            >
              <option value="Playfair Display">Playfair Display (Royal Classic)</option>
              <option value="Cinzel">Cinzel (Monogram Luxury)</option>
              <option value="Cormorant Garamond">Cormorant Garamond (Editorial Elegance)</option>
            </select>
          </div>

          <div>
            <label className="admin-label">Button Style Preset</label>
            <select
              value={settings.buttonStyle || 'rounded-luxury'}
              onChange={(e) => setSettings({ ...settings, buttonStyle: e.target.value })}
              className="admin-input-field"
            >
              <option value="rounded-luxury">Rounded Luxury (6px radius)</option>
              <option value="sharp-gold">Sharp Gold Edges (2px radius)</option>
              <option value="full-pill">Full Pill (999px radius)</option>
            </select>
          </div>

          <button type="submit" className="admin-btn-primary w-full justify-center">
            <CheckCircle2 size={16} />
            <span>Apply Theme Settings</span>
          </button>
        </form>

        {/* Live Brand Palette Preview */}
        <div className="admin-card-surface p-5 space-y-4">
          <h3 className="font-bold text-white text-sm pb-2 border-b border-amber-600/20">
            Brand Palette Preview
          </h3>

          <div className="p-4 rounded-xl space-y-3" style={{ background: settings.primaryColor || '#280D16', border: `1.5px solid ${settings.accentColor || '#C6A15B'}` }}>
            <h4 className="text-xl text-white font-serif font-bold" style={{ fontFamily: settings.fontHeading }}>
              RAJESH JEWELLERS
            </h4>
            <p className="text-xs text-amber-200">
              Sangmohal Flagship Showroom · Station Rd, Mirzapur
            </p>
            <button
              type="button"
              className="px-4 py-2 text-xs font-bold rounded"
              style={{ background: settings.accentColor || '#C6A15B', color: '#080103' }}
            >
              Sample Gold Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DesignAppearanceModule);
