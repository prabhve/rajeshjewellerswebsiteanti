import React from 'react';
import { useJewellery } from '../context/JewelleryContext';

const NAV_ITEMS = [
  { id: 'all', label: 'All Jewellery', target: '#catalog-section' },
  { id: 'bridal', label: 'Royal Bridal', target: '#catalog-section' },
  { id: 'gold', label: 'Gold Necklaces', target: '#catalog-section' },
  { id: 'bangles', label: 'Temple Kadas', target: '#catalog-section' },
  { id: 'diamond', label: 'Solitaires', target: '#catalog-section' },
  { id: 'everyday', label: 'Jhumkas & Daily', target: '#catalog-section' },
  { id: 'mens', label: "Men's Jewels", target: '#catalog-section' },
  { id: 'coins', label: '24K Coins', target: '#catalog-section' },
  { id: 'silver', label: '925 Silver', target: '#catalog-section' },
  { id: 'gift-wizard', label: '🎁 Gift Finder', isGift: true },
  { id: 'calculator', label: '★ Calculator', target: '#calculator', isSpecial: true },
  { id: 'scheme', label: '🪙 11+1 Scheme', target: '#scheme', isScheme: true }
];

const CategoryNavBar = () => {
  const { activeCategory, setActiveCategory, setIsGiftWizardOpen } = useJewellery();

  const handleNavClick = (e, item) => {
    if (item.isGift) {
      e.preventDefault();
      setIsGiftWizardOpen(true);
      return;
    }
    if (item.target === '#catalog-section') {
      setActiveCategory(item.id);
    }
  };

  return (
    <nav className="header-nav-bar" aria-label="Jewellery Categories">
      <div className="nav-bar-container">
        <ul className="nav-links-row">
          {NAV_ITEMS.map((item) => {
            const isActive = activeCategory === item.id && item.target === '#catalog-section';
            return (
              <li
                key={item.id}
                className={`nav-link-item ${isActive ? 'active' : ''} ${item.isSpecial ? 'nav-item-special' : ''} ${item.isScheme ? 'nav-item-scheme' : ''} ${item.isGift ? 'nav-item-gift' : ''}`}
              >
                <a
                  href={item.target || '#'}
                  onClick={(e) => handleNavClick(e, item)}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default CategoryNavBar;
