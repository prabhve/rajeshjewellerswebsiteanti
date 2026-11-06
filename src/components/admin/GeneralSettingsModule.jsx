import React, { useState } from 'react';
import { Settings, Save, CheckCircle2 } from 'lucide-react';

const GeneralSettingsModule = ({ showToast = () => {} }) => {
  const [settings, setSettings] = useState({
    currencySymbol: '₹',
    currencyCode: 'INR',
    dateFormat: 'DD/MM/YYYY',
    timeZone: 'Asia/Kolkata (IST)',
    defaultPincode: '231001',
    autoSaveInterval: '15',
    maintenanceMode: false
  });

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Saved general CMS settings! ⚙️');
  };

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2 className="admin-pane-title">23. General System Settings</h2>
          <p className="admin-pane-desc">
            Configure currency formatting, regional time zones, default delivery pincodes, and maintenance mode status.
          </p>
        </div>
        <button type="button" className="admin-btn-primary" onClick={handleSave}>
          <Save size={15} />
          <span>Save Settings</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="admin-card-surface p-5 space-y-4 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="admin-label">Currency Symbol</label>
            <input
              type="text"
              value={settings.currencySymbol}
              onChange={(e) => setSettings({ ...settings, currencySymbol: e.target.value })}
              className="admin-input-field"
            />
          </div>

          <div>
            <label className="admin-label">Currency Code</label>
            <input
              type="text"
              value={settings.currencyCode}
              onChange={(e) => setSettings({ ...settings, currencyCode: e.target.value })}
              className="admin-input-field"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="admin-label">Default Delivery Pincode</label>
            <input
              type="text"
              value={settings.defaultPincode}
              onChange={(e) => setSettings({ ...settings, defaultPincode: e.target.value })}
              className="admin-input-field"
            />
          </div>

          <div>
            <label className="admin-label">Time Zone</label>
            <input
              type="text"
              value={settings.timeZone}
              disabled
              className="admin-input-field bg-black/60 text-gray-400"
            />
          </div>
        </div>

        <button type="submit" className="admin-btn-primary w-full justify-center">
          <CheckCircle2 size={16} />
          <span>Save System Settings</span>
        </button>
      </form>
    </div>
  );
};

export default React.memo(GeneralSettingsModule);
