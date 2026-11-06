import React, { useState } from 'react';
import { Calculator, Save, CheckCircle2 } from 'lucide-react';

const CalculatorConfigModule = ({ showToast = () => {} }) => {
  const [config, setConfig] = useState({
    defaultWeight: 10,
    minMakingPercent: 7,
    benchmarkMakingPercent: 10,
    maxMakingPercent: 16,
    gstPercent: 3,
    metricTolaGramRatio: 10,
    traditionalTolaGramRatio: 8,
    disclaimerText: 'Live computed prices based on today\'s MCX bullion rates & 3% GST. Final price verified on German Karatmeter at Sangmohal showroom with zero wastage deduction.'
  });

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Updated Gold Calculator configuration! 🧮');
  };

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2 className="admin-pane-title">13. Gold Price Calculator Configuration</h2>
          <p className="admin-pane-desc">
            Manage making charge percentage ranges, GST rules, Tola conversion formulas (10g Metric vs 8g Vedic), and disclaimer notes.
          </p>
        </div>
        <button type="button" className="admin-btn-primary" onClick={handleSave}>
          <Save size={15} />
          <span>Save Calculator Config</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="admin-card-surface p-5 space-y-4 max-w-3xl">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="admin-label">Default Weight (Grams)</label>
            <input
              type="number"
              value={config.defaultWeight}
              onChange={(e) => setConfig({ ...config, defaultWeight: Number(e.target.value) })}
              className="admin-input-field"
            />
          </div>

          <div>
            <label className="admin-label">Benchmark Making (%)</label>
            <input
              type="number"
              value={config.benchmarkMakingPercent}
              onChange={(e) => setConfig({ ...config, benchmarkMakingPercent: Number(e.target.value) })}
              className="admin-input-field"
            />
          </div>

          <div>
            <label className="admin-label">Applicable GST (%)</label>
            <input
              type="number"
              value={config.gstPercent}
              onChange={(e) => setConfig({ ...config, gstPercent: Number(e.target.value) })}
              className="admin-input-field"
            />
          </div>
        </div>

        <div>
          <label className="admin-label">Price Disclaimer Note (Shown on Invoice Slip)</label>
          <textarea
            rows={3}
            value={config.disclaimerText}
            onChange={(e) => setConfig({ ...config, disclaimerText: e.target.value })}
            className="admin-input-field"
          />
        </div>

        <button type="submit" className="admin-btn-primary w-full justify-center">
          <CheckCircle2 size={16} />
          <span>Apply Calculator Formulas</span>
        </button>
      </form>
    </div>
  );
};

export default React.memo(CalculatorConfigModule);
