import React, { useState } from 'react';
import { FolderOpen, Upload, Search, Trash2, Eye, CheckCircle2, Image as ImageIcon } from 'lucide-react';

const MEDIA_ITEMS_INITIAL = [
  { id: 'med_01', name: 'rajesh_jewellers_emblem_gold_circle.png', folder: 'Brand Assets', url: '/assets/images/store/rajesh_jewellers_emblem_gold_circle.png', size: '124 KB', dimensions: '500x500' },
  { id: 'med_02', name: 'hero_bridal.jpg', folder: 'Banners', url: '/assets/images/hero_bridal.jpg', size: '420 KB', dimensions: '1920x1080' },
  { id: 'med_03', name: 'storefront_facade.jpg', folder: 'Showroom Photos', url: '/assets/images/store/storefront_facade.jpg', size: '380 KB', dimensions: '1200x800' },
  { id: 'med_04', name: 'royal_lounge_interior.jpg', folder: 'Showroom Photos', url: '/assets/images/store/royal_lounge_interior.jpg', size: '410 KB', dimensions: '1200x800' },
  { id: 'med_05', name: 'karatmeter_testing_desk.jpg', folder: 'Showroom Photos', url: '/assets/images/store/karatmeter_testing_desk.jpg', size: '390 KB', dimensions: '1200x800' },
  { id: 'med_06', name: 'store_display_jewellery.jpg', folder: 'Products', url: '/assets/images/store/store_display_jewellery.jpg', size: '350 KB', dimensions: '1000x1000' }
];

const MediaLibraryModule = ({ showToast = () => {} }) => {
  const [mediaList, setMediaList] = useState(MEDIA_ITEMS_INITIAL);
  const [selectedFolder, setSelectedFolder] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);

  const folders = ['All', 'Brand Assets', 'Banners', 'Products', 'Showroom Photos'];

  const filteredMedia = mediaList.filter((item) => {
    const matchesFolder = selectedFolder === 'All' || item.folder === selectedFolder;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const newMedia = {
          id: `med_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          name: file.name,
          folder: selectedFolder === 'All' ? 'Products' : selectedFolder,
          url: evt.target.result,
          size: `${Math.round(file.size / 1024)} KB`,
          dimensions: 'User Upload'
        };
        setMediaList((prev) => [newMedia, ...prev]);
        showToast(`Uploaded file "${file.name}" to Media Library! 📸`);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2 className="admin-pane-title">7. Central Media &amp; Asset Library</h2>
          <p className="admin-pane-desc">
            Organize showroom photographs, banners, logos, and product imagery into folders. Upload new files directly from your computer or camera.
          </p>
        </div>

        <label className="admin-btn-primary cursor-pointer">
          <Upload size={15} />
          <span>Upload New Photos</span>
          <input
            type="file"
            multiple
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
        </label>
      </div>

      {/* Filter Bar */}
      <div className="admin-card-surface p-4 mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          {folders.map((f) => (
            <button
              key={f}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedFolder === f ? 'bg-amber-500 text-black' : 'bg-black/40 text-gray-300 border border-amber-600/20 hover:border-amber-500/40'
              }`}
              onClick={() => setSelectedFolder(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search media files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-input-field pl-8"
          />
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="admin-card-surface p-2 border border-amber-600/20 hover:border-amber-500/50 transition group cursor-pointer"
            onClick={() => setSelectedMedia(item)}
          >
            <div className="aspect-square rounded-lg bg-black/60 overflow-hidden relative mb-2">
              <img src={item.url} alt={item.name} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                <button
                  type="button"
                  className="p-1.5 rounded-full bg-amber-500 text-black font-bold"
                  title="View details"
                >
                  <Eye size={14} />
                </button>
              </div>
            </div>

            <strong className="text-[11px] text-white block truncate" title={item.name}>
              {item.name}
            </strong>
            <span className="text-[10px] text-amber-300 block mt-0.5">{item.size} • {item.folder}</span>
          </div>
        ))}
      </div>

      {/* Selected Media Details Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="admin-card-surface max-w-lg w-full p-5 space-y-4 border-amber-500 relative">
            <button
              type="button"
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={() => setSelectedMedia(null)}
            >
              ✕
            </button>

            <h3 className="font-bold text-white text-sm">Media File Details</h3>
            <div className="aspect-video rounded-lg overflow-hidden bg-black/80 border border-amber-600/30">
              <img src={selectedMedia.url} alt={selectedMedia.name} className="w-full h-full object-contain" />
            </div>

            <div className="space-y-1 text-xs text-gray-300">
              <p><strong>Filename:</strong> {selectedMedia.name}</p>
              <p><strong>Folder:</strong> {selectedMedia.folder}</p>
              <p><strong>Size:</strong> {selectedMedia.size}</p>
              <p><strong>Path / URL:</strong> <code className="text-amber-300 text-[11px] font-mono break-all">{selectedMedia.url}</code></p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                className="admin-btn-primary flex-1 justify-center"
                onClick={() => {
                  navigator.clipboard.writeText(selectedMedia.url);
                  showToast('Copied media URL to clipboard!');
                }}
              >
                Copy URL Path
              </button>
              <button
                type="button"
                className="admin-btn-secondary"
                onClick={() => setSelectedMedia(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(MediaLibraryModule);
