import React, { useState } from 'react';
import {
  Layers,
  Eye,
  CheckCircle2,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Monitor,
  Laptop,
  Tablet,
  Smartphone,
  Edit3,
  Check,
  Plus
} from 'lucide-react';

const HomepageBuilderModule = ({
  homepageSections = [],
  setHomepageSections = () => {},
  publishDraftToLiveSite = () => {},
  showToast = () => {}
}) => {
  const [sections, setSections] = useState(homepageSections);
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [previewDevice, setPreviewDevice] = useState('desktop'); // 'desktop' | 'laptop' | 'tablet' | 'mobile'

  const handleToggleEnable = (id) => {
    const updated = sections.map((sec) => (sec.id === id ? { ...sec, enabled: !sec.enabled } : sec));
    setSections(updated);
    setHomepageSections(updated);
    showToast('Updated section visibility status');
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const updated = [...sections];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    setSections(updated);
    setHomepageSections(updated);
    showToast('Reordered homepage sections');
  };

  const handleMoveDown = (index) => {
    if (index === sections.length - 1) return;
    const updated = [...sections];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    setSections(updated);
    setHomepageSections(updated);
    showToast('Reordered homepage sections');
  };

  const handleUpdateSectionData = (id, fields) => {
    const updated = sections.map((sec) => (sec.id === id ? { ...sec, ...fields } : sec));
    setSections(updated);
    setHomepageSections(updated);
    showToast('Updated section content draft');
  };

  const currentEditingSection = sections.find((s) => s.id === editingSectionId);

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2 className="admin-pane-title">2. Homepage Visual Section Builder</h2>
          <p className="admin-pane-desc">
            Complete drag-and-reorder control over all 19 customer-facing homepage sections. Edit English & Hindi headings, call-to-actions, and enable/disable components.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Multi-Device Preview Switcher */}
          <div className="flex items-center bg-black/40 border border-amber-600/30 rounded-lg p-1">
            <button
              type="button"
              className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${previewDevice === 'desktop' ? 'bg-amber-500 text-black font-bold' : 'text-gray-300'}`}
              onClick={() => setPreviewDevice('desktop')}
              title="1920x1080 Desktop View"
            >
              <Monitor size={13} />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              type="button"
              className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${previewDevice === 'laptop' ? 'bg-amber-500 text-black font-bold' : 'text-gray-300'}`}
              onClick={() => setPreviewDevice('laptop')}
              title="1366x768 Laptop View"
            >
              <Laptop size={13} />
              <span className="hidden sm:inline">Laptop</span>
            </button>
            <button
              type="button"
              className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${previewDevice === 'tablet' ? 'bg-amber-500 text-black font-bold' : 'text-gray-300'}`}
              onClick={() => setPreviewDevice('tablet')}
              title="768x1024 Tablet View"
            >
              <Tablet size={13} />
              <span className="hidden sm:inline">Tablet</span>
            </button>
            <button
              type="button"
              className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${previewDevice === 'mobile' ? 'bg-amber-500 text-black font-bold' : 'text-gray-300'}`}
              onClick={() => setPreviewDevice('mobile')}
              title="390x844 Mobile View"
            >
              <Smartphone size={13} />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          <button
            type="button"
            className="admin-btn-primary"
            onClick={publishDraftToLiveSite}
          >
            <Sparkles size={15} />
            <span>Publish Layout to Live Site</span>
          </button>
        </div>
      </div>

      {/* Two Pane Layout: Reorderable Sections List Left (45%) / Live Interactive Visual Preview Right (55%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Section Order & Controls (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="admin-card-surface p-4">
            <div className="flex items-center justify-between pb-3 border-b border-amber-600/20 mb-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Homepage Sections ({sections.length})
              </span>
              <span className="text-[11px] text-gray-400">Reorder &amp; Toggle</span>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {sections.map((sec, idx) => {
                const isEditing = editingSectionId === sec.id;
                return (
                  <div
                    key={sec.id}
                    className={`p-3 rounded-lg border transition ${
                      isEditing
                        ? 'bg-amber-950/60 border-amber-500'
                        : sec.enabled
                        ? 'bg-black/40 border-amber-600/20 hover:border-amber-500/40'
                        : 'bg-black/20 border-white/5 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-amber-400 font-bold w-5">
                          {idx + 1}.
                        </span>
                        <div>
                          <strong className="text-xs text-white block">{sec.name}</strong>
                          <span className="text-[10px] text-gray-400 block line-clamp-1">
                            {sec.title}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {/* Up/Down Reorder Buttons */}
                        <button
                          type="button"
                          className="p-1 rounded bg-black/40 text-gray-400 hover:text-white disabled:opacity-30"
                          onClick={() => handleMoveUp(idx)}
                          disabled={idx === 0}
                          title="Move Section Up"
                        >
                          <ArrowUp size={12} />
                        </button>
                        <button
                          type="button"
                          className="p-1 rounded bg-black/40 text-gray-400 hover:text-white disabled:opacity-30"
                          onClick={() => handleMoveDown(idx)}
                          disabled={idx === sections.length - 1}
                          title="Move Section Down"
                        >
                          <ArrowDown size={12} />
                        </button>

                        {/* Edit Button */}
                        <button
                          type="button"
                          className={`p-1 rounded text-xs font-bold ${
                            isEditing ? 'bg-amber-500 text-black' : 'bg-black/40 text-amber-300 border border-amber-700/50'
                          }`}
                          onClick={() => setEditingSectionId(isEditing ? null : sec.id)}
                          title="Edit section content"
                        >
                          <Edit3 size={12} />
                        </button>

                        {/* Enable/Disable Switch */}
                        <button
                          type="button"
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            sec.enabled ? 'bg-emerald-950 text-emerald-400 border border-emerald-700' : 'bg-gray-800 text-gray-400'
                          }`}
                          onClick={() => handleToggleEnable(sec.id)}
                        >
                          {sec.enabled ? 'ON' : 'OFF'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Visual Content Editor & Live Section Preview (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {currentEditingSection ? (
            <div className="admin-card-surface p-5 space-y-4 border-amber-500">
              <div className="flex items-center justify-between pb-3 border-b border-amber-600/20">
                <div className="flex items-center gap-2">
                  <Edit3 size={16} className="text-amber-400" />
                  <h3 className="font-bold text-white text-sm">
                    Editing Section: {currentEditingSection.name}
                  </h3>
                </div>
                <button
                  type="button"
                  className="text-xs text-amber-300 font-bold hover:underline"
                  onClick={() => setEditingSectionId(null)}
                >
                  Close Editor
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="admin-label">Main Heading (English)</label>
                  <input
                    type="text"
                    value={currentEditingSection.title || ''}
                    onChange={(e) => handleUpdateSectionData(currentEditingSection.id, { title: e.target.value })}
                    className="admin-input-field"
                  />
                </div>

                <div>
                  <label className="admin-label">Hindi Sub-Heading (हिंदी)</label>
                  <input
                    type="text"
                    value={currentEditingSection.hindiTitle || ''}
                    onChange={(e) => handleUpdateSectionData(currentEditingSection.id, { hindiTitle: e.target.value })}
                    className="admin-input-field"
                  />
                </div>

                {currentEditingSection.ctaText !== undefined && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="admin-label">CTA Button Label</label>
                      <input
                        type="text"
                        value={currentEditingSection.ctaText || ''}
                        onChange={(e) => handleUpdateSectionData(currentEditingSection.id, { ctaText: e.target.value })}
                        className="admin-input-field"
                      />
                    </div>
                    <div>
                      <label className="admin-label">CTA Target Section</label>
                      <input
                        type="text"
                        value={currentEditingSection.ctaTarget || ''}
                        onChange={(e) => handleUpdateSectionData(currentEditingSection.id, { ctaTarget: e.target.value })}
                        className="admin-input-field"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="admin-card-surface p-4 text-center text-gray-400 text-xs">
              Click the edit icon on any section to customize headings, CTA buttons, and Hindi titles.
            </div>
          )}

          {/* Visual Responsive Canvas Frame */}
          <div className="admin-card-surface p-4">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10 text-xs text-gray-300">
              <span className="font-bold text-amber-300">Live Website Layout Structure</span>
              <span>Viewport: {previewDevice.toUpperCase()}</span>
            </div>

            <div
              className={`mx-auto bg-black/60 rounded-xl p-3 border border-amber-600/30 transition-all ${
                previewDevice === 'desktop'
                  ? 'w-full'
                  : previewDevice === 'laptop'
                  ? 'max-w-[580px]'
                  : previewDevice === 'tablet'
                  ? 'max-w-[420px]'
                  : 'max-w-[320px]'
              }`}
            >
              <div className="space-y-2">
                {sections
                  .filter((sec) => sec.enabled)
                  .map((sec) => (
                    <div
                      key={sec.id}
                      className="p-2.5 rounded bg-burgundy-950/80 border border-amber-500/30 text-left"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                          {sec.name}
                        </span>
                        <span className="text-[9px] text-emerald-400 bg-emerald-950 px-1 rounded">Active</span>
                      </div>
                      <strong className="text-xs text-white block mt-0.5 line-clamp-1">{sec.title}</strong>
                      {sec.hindiTitle && <span className="text-[10px] text-amber-200/70 block">{sec.hindiTitle}</span>}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default React.memo(HomepageBuilderModule);
