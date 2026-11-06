import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Layers,
  Menu,
  Sliders,
  PlusCircle,
  Grid,
  FolderOpen,
  Image as ImageIcon,
  Video,
  MessageSquare,
  Tag,
  PiggyBank,
  Calculator,
  Sparkles,
  Store,
  CalendarCheck,
  Search,
  FileText,
  Palette,
  Shield,
  Database,
  History,
  Settings,
  X
} from 'lucide-react';

export const NAV_GROUPS = [
  {
    groupTitle: 'OVERVIEW & ANALYTICS',
    items: [
      { id: 'dashboard', title: '1. Dashboard', desc: 'Real-time KPIs & quick actions', icon: LayoutDashboard },
      { id: 'activity_logs', title: '22. Activity Logs', desc: 'Audit trail & system events', icon: History }
    ]
  },
  {
    groupTitle: 'WEBSITE & PAGE BUILDER',
    items: [
      { id: 'homepage_builder', title: '2. Homepage Builder', desc: 'Visual 19-section layout editor', icon: Layers },
      { id: 'header_nav', title: '3. Header & Navigation', desc: 'Logos, menus & announcement bar', icon: Menu },
      { id: 'offers', title: '11. Offers & Promotions', desc: 'Festival banners & discount codes', icon: Tag, countKey: 'offerCount' },
      { id: 'design', title: '19. Design & Appearance', desc: 'Brand colors, fonts & card presets', icon: Palette },
      { id: 'seo', title: '17. SEO & Content', desc: 'Meta tags, OG cards & schemas', icon: Search },
      { id: 'policies', title: '18. Policies & Legal', desc: 'Store policy & disclaimer editor', icon: FileText }
    ]
  },
  {
    groupTitle: 'JEWELLERY & INVENTORY',
    items: [
      { id: 'products', title: '5. Products & Inventory', desc: 'Catalog, SKUs, weights & prices', icon: PlusCircle, countKey: 'productCount' },
      { id: 'categories', title: '6. Categories & Collections', desc: 'Royal Bridal, Gold & Solitaires', icon: Grid },
      { id: 'rates', title: '4. Gold Rates & Pricing', desc: 'MCX rates, manual & API modes', icon: Sliders },
      { id: 'calculator_config', title: '13. Gold Calculator', desc: 'Making charge & Tola formulas', icon: Calculator }
    ]
  },
  {
    groupTitle: 'MEDIA & SHOWCASE',
    items: [
      { id: 'media_library', title: '7. Media Library', desc: 'Central photo & asset manager', icon: FolderOpen },
      { id: 'gallery', title: '8. Showroom Gallery', desc: 'Flagship showroom photos', icon: ImageIcon },
      { id: 'videos', title: '9. Videos & Reels', desc: '4K Showroom video tour reel', icon: Video },
      { id: 'testimonials', title: '10. Customer Reviews', desc: 'Google verified customer feedback', icon: MessageSquare, countKey: 'reviewCount' }
    ]
  },
  {
    groupTitle: 'SHOWROOM & BUSINESS',
    items: [
      { id: 'showroom_info', title: '14. Showroom Profile', desc: 'Bio, GSTIN & HUID credentials', icon: Sparkles },
      { id: 'contacts', title: '15. Contacts & Hours', desc: 'Address, phones & store timings', icon: Store },
      { id: 'schemes', title: '12. Swarna Nidhi Scheme', desc: '11+1 monthly savings plan', icon: PiggyBank },
      { id: 'bookings', title: '16. Bookings & Inquiries', desc: 'VIP visits & trial requests', icon: CalendarCheck, countKey: 'leadCount' }
    ]
  },
  {
    groupTitle: 'SYSTEM & GOVERNANCE',
    items: [
      { id: 'users_permissions', title: '20. Admin Users', desc: 'Role permissions & PIN access', icon: Shield },
      { id: 'backup_restore', title: '21. Backup & Restore', desc: 'JSON/CSV export & rollback', icon: Database },
      { id: 'general_settings', title: '23. General Settings', desc: 'Currencies, dates & maintenance', icon: Settings }
    ]
  }
];

// Memoized individual Navigation Item
const AdminNavItem = React.memo(({ item, isActive, count, onClick }) => {
  const IconComponent = item.icon;
  return (
    <button
      type="button"
      className={`admin-nav-item ${isActive ? 'is-active' : ''}`}
      onClick={() => onClick(item.id)}
      aria-current={isActive ? 'page' : undefined}
    >
      <IconComponent size={16} className="admin-nav-icon" />
      <div className="admin-nav-label-box">
        <span className="admin-nav-title">{item.title}</span>
        <span className="admin-nav-desc">{item.desc}</span>
      </div>
      {typeof count === 'number' && count > 0 && (
        <span className="admin-nav-count-badge">{count}</span>
      )}
    </button>
  );
});

AdminNavItem.displayName = 'AdminNavItem';

// Searchable 23-Module Admin Navigation Sidebar
const AdminSidebarNav = React.memo(({
  activeTab,
  onSelectTab,
  productCount = 0,
  reviewCount = 0,
  leadCount = 0,
  offerCount = 0
}) => {
  const [navSearch, setNavSearch] = useState('');

  // Filter navigation items dynamically based on search query
  const filteredGroups = useMemo(() => {
    const q = navSearch.trim().toLowerCase();
    if (!q) return NAV_GROUPS;

    return NAV_GROUPS.map((group) => {
      const matchingItems = group.items.filter(
        (it) =>
          it.title.toLowerCase().includes(q) ||
          it.desc.toLowerCase().includes(q) ||
          it.id.toLowerCase().includes(q)
      );
      return matchingItems.length > 0 ? { ...group, items: matchingItems } : null;
    }).filter(Boolean);
  }, [navSearch]);

  return (
    <aside className="admin-portal-sidebar" aria-label="Enterprise CMS Modules Navigation">
      {/* Search Modules Filter Input */}
      <div className="admin-sidebar-search-box">
        <Search size={14} className="admin-sidebar-search-icon" />
        <input
          type="text"
          placeholder="Search 23 CMS Modules..."
          value={navSearch}
          onChange={(e) => setNavSearch(e.target.value)}
          className="admin-sidebar-search-input"
        />
        {navSearch && (
          <button
            type="button"
            className="admin-sidebar-search-clear"
            onClick={() => setNavSearch('')}
            aria-label="Clear Search"
          >
            <X size={12} />
          </button>
        )}
      </div>

      <div className="admin-sidebar-nav-scroll">
        {filteredGroups.map((group, gIdx) => (
          <div key={gIdx} className="admin-nav-group">
            <div className="admin-sidebar-section-title">
              <span>{group.groupTitle}</span>
              <span className="admin-group-count">{group.items.length}</span>
            </div>

            <nav className="admin-sidebar-nav">
              {group.items.map((item) => {
                let count;
                if (item.countKey === 'productCount') count = productCount;
                else if (item.countKey === 'reviewCount') count = reviewCount;
                else if (item.countKey === 'leadCount') count = leadCount;
                else if (item.countKey === 'offerCount') count = offerCount;

                return (
                  <AdminNavItem
                    key={item.id}
                    item={item}
                    isActive={activeTab === item.id}
                    count={count}
                    onClick={onSelectTab}
                  />
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      <div className="admin-sidebar-footer-card">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[11px] font-bold text-amber-300">CMS ACTIVE · 23 MODULES</span>
        </div>
        <span className="text-[10px] text-gray-400 block mt-0.5">Sangmohal Flagship Showroom · Mirzapur</span>
      </div>
    </aside>
  );
});

AdminSidebarNav.displayName = 'AdminSidebarNav';

export default AdminSidebarNav;
