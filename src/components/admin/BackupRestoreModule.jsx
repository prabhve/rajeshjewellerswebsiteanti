import React, { useRef } from 'react';
import { Database, Download, Upload, RefreshCw, CheckCircle2, ShieldCheck } from 'lucide-react';

const BackupRestoreModule = ({
  exportAllDataJSON = () => {},
  importAllDataJSON = () => {},
  resetAllDataToDefaults = () => {},
  showToast = () => {}
}) => {
  const fileRef = useRef(null);

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2 className="admin-pane-title">21. System Backup, Export &amp; Restore</h2>
          <p className="admin-pane-desc">
            Download full website database backups in JSON or CSV, import restored files, or reset settings to factory defaults.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Export JSON */}
        <div className="admin-card-surface p-5 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-950/80 text-amber-400 flex items-center justify-center border border-amber-600/30">
            <Download size={20} />
          </div>
          <h3 className="font-bold text-white text-sm">Export Full Backup (JSON)</h3>
          <p className="text-xs text-gray-300">
            Downloads complete products catalog, gold rates history, gallery photos, and showroom settings into a single JSON file.
          </p>
          <button type="button" className="admin-btn-primary w-full justify-center" onClick={exportAllDataJSON}>
            <span>Download JSON Backup</span>
          </button>
        </div>

        {/* Card 2: Import Backup */}
        <div className="admin-card-surface p-5 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-950/80 text-amber-400 flex items-center justify-center border border-amber-600/30">
            <Upload size={20} />
          </div>
          <h3 className="font-bold text-white text-sm">Import &amp; Restore Backup</h3>
          <p className="text-xs text-gray-300">
            Upload a previously exported backup JSON file to restore website content, products, and rate configurations.
          </p>
          <label className="admin-btn-primary w-full justify-center cursor-pointer">
            <span>Select Backup File</span>
            <input
              type="file"
              ref={fileRef}
              accept=".json,application/json"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (evt) => {
                  importAllDataJSON(evt.target.result);
                  if (fileRef.current) fileRef.current.value = '';
                };
                reader.readAsText(file);
              }}
            />
          </label>
        </div>

        {/* Card 3: Factory Reset */}
        <div className="admin-card-surface p-5 space-y-3 border-red-900/40">
          <div className="w-10 h-10 rounded-lg bg-red-950/80 text-red-400 flex items-center justify-center border border-red-600/30">
            <RefreshCw size={20} />
          </div>
          <h3 className="font-bold text-white text-sm">Reset Factory Defaults</h3>
          <p className="text-xs text-gray-300">
            Restores all showroom product catalogs, rates, and store info to original Sangmohal factory defaults.
          </p>
          <button
            type="button"
            className="w-full py-2 rounded-lg bg-red-950 border border-red-700 text-red-300 font-bold text-xs hover:bg-red-900 transition"
            onClick={() => {
              if (window.confirm('Are you sure you want to reset all showroom data to defaults?')) {
                resetAllDataToDefaults();
              }
            }}
          >
            Reset All to Defaults
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BackupRestoreModule);
