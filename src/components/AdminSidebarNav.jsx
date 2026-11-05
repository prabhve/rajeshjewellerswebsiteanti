import React from 'react';
import {
  Sliders,
  PlusCircle,
  Image as ImageIcon,
  Video,
  MessageSquare,
  PiggyBank,
  Sparkles,
  Store,
  ShieldCheck
} from 'lucide-react';

const NAV_ITEMS = [
  {
    id: 'rates',
    title: '1. Gold Rates',
    desc: 'MCX & Bullion benchmarks',
    icon: Sliders
  },
  {
    id: 'products',
    title: '2. Products',
    desc: 'Catalog & inventory designs',
    icon: PlusCircle,
    countKey: 'productCount'
  },
  {
    id: 'gallery',
    title: '3. Gallery',
    desc: '5 Showroom showcase views',
    icon: ImageIcon
  },
  {
    id: 'videos',
    title: '4. Videos',
    desc: '4K Showroom video tour reel',
    icon: Video
  },
  {
    id: 'testimonials',
    title: '5. Testimonials',
    desc: 'Google verified customer reviews',
    icon: MessageSquare,
    countKey: 'reviewCount'
  },
  {
    id: 'schemes',
    title: '6. Schemes',
    desc: 'Swarna Nidhi (11+1) monthly plan',
    icon: PiggyBank
  },
  {
    id: 'showroom_info',
    title: '7. Showroom Info',
    desc: 'Heritage, bio & GSTIN credentials',
    icon: Sparkles
  },
  {
    id: 'contacts',
    title: '8. Contacts',
    desc: 'Address, phones & timings',
    icon: Store
  }
];

// Memoized individual Navigation Item to eliminate re-rendering unchanged tab buttons
const AdminNavItem = React.memo(({ item, isActive, count, onClick }) => {
  const IconComponent = item.icon;
  return (
    <button
      type="button"
      className={`admin-nav-item ${isActive ? 'is-active' : ''}`}
      onClick={() => onClick(item.id)}
      aria-current={isActive ? 'page' : undefined}
    >
      <IconComponent size={17} className="admin-nav-icon" />
      <div className="admin-nav-label-box">
        <span className="admin-nav-title">{item.title}</span>
        <span className="admin-nav-desc">{item.desc}</span>
      </div>
      {typeof count === 'number' && (
        <span className="admin-nav-count-badge">{count}</span>
      )}
    </button>
  );
});

AdminNavItem.displayName = 'AdminNavItem';

// Memoized Admin Sidebar Navigation Component
const AdminSidebarNav = React.memo(({
  activeTab,
  onSelectTab,
  productCount = 0,
  reviewCount = 0
}) => {
  return (
    <aside className="admin-portal-sidebar" aria-label="Admin CMS Features Navigation">
      <div className="admin-sidebar-section-title">
        <span>CMS MODULES</span>
        <span className="text-[10px] text-amber-400 font-bold bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-600/30">8 SECTIONS</span>
      </div>

      <nav className="admin-sidebar-nav">
        {NAV_ITEMS.map((item) => {
          const count = item.countKey === 'productCount'
            ? productCount
            : item.countKey === 'reviewCount'
            ? reviewCount
            : undefined;

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

      <div className="admin-sidebar-footer-card">
        <ShieldCheck size={14} className="text-amber-400" />
        <span>100% BIS 916 Hallmark Laser HUID Certified CMS</span>
      </div>
    </aside>
  );
});

AdminSidebarNav.displayName = 'AdminSidebarNav';

export default AdminSidebarNav;
