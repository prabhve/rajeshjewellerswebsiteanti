import React, { useState } from 'react';
import { FileText, Save, CheckCircle2 } from 'lucide-react';

const PoliciesLegalModule = ({
  legalPolicies = {},
  setLegalPolicies = () => {},
  showToast = () => {}
}) => {
  const [activeTab, setActiveTab] = useState('aboutUs');
  const [policies, setPolicies] = useState(legalPolicies);

  const policyTabs = [
    { id: 'aboutUs', label: 'About Us' },
    { id: 'privacyPolicy', label: 'Privacy Policy' },
    { id: 'termsAndConditions', label: 'Terms & Conditions' },
    { id: 'shippingPolicy', label: 'Shipping & Delivery' },
    { id: 'returnExchangePolicy', label: 'Return & Exchange' }
  ];

  const handleSave = (e) => {
    e.preventDefault();
    setLegalPolicies(policies);
    showToast('Saved legal policies and store information pages! 📜');
  };

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2 className="admin-pane-title">18. Policies &amp; Legal Content Pages</h2>
          <p className="admin-pane-desc">
            Edit content for store policy pages, About Us, Privacy Policy, Terms &amp; Conditions, and Return Policies.
          </p>
        </div>
        <button type="button" className="admin-btn-primary" onClick={handleSave}>
          <Save size={15} />
          <span>Save Policy Content</span>
        </button>
      </div>

      <div className="admin-card-surface p-5 space-y-4">
        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-amber-600/20 pb-3 overflow-x-auto">
          {policyTabs.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === t.id ? 'bg-amber-500 text-black' : 'bg-black/40 text-gray-300 border border-amber-600/20'
              }`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Editor TextArea */}
        <div>
          <label className="admin-label">
            Content Editor ({policyTabs.find((t) => t.id === activeTab)?.label})
          </label>
          <textarea
            rows={12}
            value={policies[activeTab] || ''}
            onChange={(e) => setPolicies({ ...policies, [activeTab]: e.target.value })}
            className="admin-input-field font-sans text-xs leading-relaxed"
          />
        </div>

        <button type="button" className="admin-btn-primary w-full justify-center" onClick={handleSave}>
          <CheckCircle2 size={16} />
          <span>Publish Updated Policy Page</span>
        </button>
      </div>
    </div>
  );
};

export default React.memo(PoliciesLegalModule);
