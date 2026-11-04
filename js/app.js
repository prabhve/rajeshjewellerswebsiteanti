/**
 * RAJESH JEWELLERS MIRZAPUR - LUXURY E-COMMERCE & 3D INTERACTIVE ENGINE
 * Inspired by: Tanishq, BlueStone, and Adore By Priyanka
 * Location: Station Road, Wellesley Ganj, Mirzapur, UP
 */

// 1. Initial Bullion Rates (per gram)
const DEFAULT_RATES = {
  gold24k: 7845,   // ₹78,450 / 10g
  gold22k: 7195,   // ₹71,950 / 10g
  gold18k: 5885,   // ₹58,850 / 10g
  silver999: 94.5  // ₹94,500 / 1kg (₹94.50/g)
};

// Retrieve or initialize rates in localStorage
let liveRates = JSON.parse(localStorage.getItem('rajesh_live_rates')) || DEFAULT_RATES;

// 2. Initial Master Products Catalog
const DEFAULT_CATALOG = [
  {
    id: "RJ-BR-101",
    name: "Shahi Rajwada Polki & Kundan Bridal Set",
    hindiName: "शाही राजवाड़ा ब्राइडल कुंदन एवं पोलकी चोकर सेट",
    category: "bridal",
    categoryLabel: "Royal Bridal",
    purity: "22K BIS 916 Hallmark",
    purityKey: "gold22k",
    grossWeight: "78.40g",
    netGoldWeight: "64.20g",
    stoneType: "Uncut Syndicate Polki & Zambian Emeralds",
    image: "assets/images/hero_bridal.jpg",
    description: "An heirloom bridal masterpiece crafted in pure 22K hallmarked gold with uncut syndicate polki, natural emerald drops, and intricate Meenakari on reverse.",
    makingPercent: 12,
    badge: "Masterpiece",
    inStock: true
  },
  {
    id: "RJ-NK-102",
    name: "Kalyani 22K Royal Filigree Choker",
    hindiName: "कल्याणी 22K रॉयल फिलीग्री चोकर हार",
    category: "gold",
    categoryLabel: "22K Gold Necklaces",
    purity: "22K BIS 916 Hallmark",
    purityKey: "gold22k",
    grossWeight: "42.80g",
    netGoldWeight: "42.80g",
    stoneType: "Solid 22K Gold with Ruby Beads",
    image: "assets/images/necklace_collection.jpg",
    description: "Traditional Wellesley Ganj craftsmanship featuring handcrafted mesh filigree gold, layered floral motifs, and delicate gold bell danglers.",
    makingPercent: 10,
    badge: "Bestseller",
    inStock: true
  },
  {
    id: "RJ-BG-103",
    name: "Gaja Lakshmi Antique Temple Kada Pair",
    hindiName: "गज लक्ष्मी पारंपरिक एंटीक मंदिर कड़ा",
    category: "bangles",
    categoryLabel: "Temple Bangles",
    purity: "22K BIS 916 Hallmark",
    purityKey: "gold22k",
    grossWeight: "56.50g",
    netGoldWeight: "54.10g",
    stoneType: "Kemp Rubies & Natural Emeralds",
    image: "assets/images/antique_bangles.jpg",
    description: "Divine antique Lakshmi embossing with elephant motifs, handcrafted by master karigars for auspicious weddings and festive lagan.",
    makingPercent: 11,
    badge: "Heritage",
    inStock: true
  },
  {
    id: "RJ-DM-104",
    name: "Aethelgard Solitaire & Eternity Band Set",
    hindiName: "सॉलिटेयर डायमंड एंगेजमेंट एवं वेडिंग रिंग",
    category: "diamond",
    categoryLabel: "Solitaire Diamonds",
    purity: "18K Gold + VVS/EF Certified",
    purityKey: "gold18k",
    grossWeight: "6.20g",
    netGoldWeight: "5.80g",
    stoneType: "1.25 Carat Solitaire (IGI Certified)",
    image: "assets/images/diamond_rings.jpg",
    description: "Brilliant cut solitaire surrounded by micropavé diamond eternity band, set in gleaming 18K white-gold alloy for eternal love.",
    makingPercent: 14,
    badge: "Certified",
    inStock: true
  },
  {
    id: "RJ-MN-105",
    name: "Royal Lion 22K Solid Gold Men's Kada & Chain",
    hindiName: "शाही सिंह 22K ठोस गोल्ड कड़ा एवं चेन",
    category: "mens",
    categoryLabel: "Men's Jewels",
    purity: "22K BIS 916 Hallmark",
    purityKey: "gold22k",
    grossWeight: "68.50g",
    netGoldWeight: "68.50g",
    stoneType: "Solid Pure Gold Handcarved",
    image: "assets/images/mens_chain_kada.jpg",
    description: "Majestic embossed lion head kada paired with a heavy Italian curb link chain in 22K hallmark gold. Unmatched prestige and weight.",
    makingPercent: 9,
    badge: "Exclusive",
    inStock: true
  },
  {
    id: "RJ-CN-106",
    name: "Sacred 24K 999 Goddess Lakshmi Gold Coin (10g)",
    hindiName: "पवित्र 24K 999 श्री लक्ष्मी स्वर्ण सिक्का",
    category: "coins",
    categoryLabel: "24K Gold Coins",
    purity: "24K Pure 999 Gold",
    purityKey: "gold24k",
    grossWeight: "10.00g",
    netGoldWeight: "10.00g",
    stoneType: "Tamper-Proof Assay Packaging",
    image: "assets/images/gold_coin.jpg",
    description: "Minted in 99.9% pure bullion with embossed Goddess Lakshmi and Shree Yantra. Auspicious for Dhanteras, Akshaya Tritiya, and investments.",
    makingPercent: 3,
    badge: "Investment",
    inStock: true
  },
  {
    id: "RJ-ER-107",
    name: "Chandrika Pearl Chandbali & Mangalsutra Set",
    hindiName: "चंद्रिका मोती चाँदबाली झुमके एवं मंगलसूत्र",
    category: "everyday",
    categoryLabel: "Everyday & Festive",
    purity: "22K BIS 916 Hallmark",
    purityKey: "gold22k",
    grossWeight: "24.60g",
    netGoldWeight: "22.10g",
    stoneType: "Basra Seed Pearls & Rubies",
    image: "assets/images/earrings_jhumka.jpg",
    description: "Delicate royal crescent chandbali jhumkas paired with an elegant modern black-bead 22K gold mangalsutra chain.",
    makingPercent: 9,
    badge: "Trending",
    inStock: true
  },
  {
    id: "RJ-SL-108",
    name: "Aparajita Antique Silver Bridal Payal & Thali",
    hindiName: "अपराजिता 925 शुद्ध चांदी दुल्हन पायल व पूजा सेट",
    category: "silver",
    categoryLabel: "Silver & Pooja",
    purity: "92.5% Sterling Silver",
    purityKey: "silver999",
    grossWeight: "180.00g",
    netGoldWeight: "180.00g",
    stoneType: "Pure Handcarved Silver",
    image: "assets/images/silver_collection.jpg",
    description: "Heavy antique broad bridal payal with rhythmic ghungroos accompanied by sacred Lakshmi silver coins and ceremonial thali.",
    makingPercent: 12,
    badge: "925 Pure",
    inStock: true
  }
];

// Persistent Catalogs & States
let productsCatalog = JSON.parse(localStorage.getItem('rajesh_products_catalog')) || DEFAULT_CATALOG;
let shoppingBag = JSON.parse(localStorage.getItem('rajesh_shopping_bag')) || [];
let wishlist = JSON.parse(localStorage.getItem('rajesh_wishlist')) || [];
let appliedCouponDiscount = 0;
let appliedCouponCode = '';

// Current Filter and Sort
let currentFilter = 'all';
let currentSort = 'featured';

// Helper: Format Indian Rupee Currency
function formatINR(number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(number);
}

// Calculate Dynamic Price
function calculateItemPrice(item) {
  const netWt = parseFloat(item.netGoldWeight) || 10;
  const rateKey = item.purityKey || (item.category === 'silver' ? 'silver999' : (item.category === 'diamond' ? 'gold18k' : 'gold22k'));
  const ratePerGram = liveRates[rateKey] || liveRates.gold22k;
  const baseValue = netWt * ratePerGram;
  const makingCharges = baseValue * ((item.makingPercent || 10) / 100);
  const subtotal = baseValue + makingCharges;
  const grandTotal = subtotal * 1.03; // 3% GST
  return {
    ratePerGram,
    baseValue,
    makingCharges,
    gst: subtotal * 0.03,
    grandTotal
  };
}

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initTopBarRates();
  renderProducts();
  initCategoryBubbles();
  initLiveSearch();
  initCalculator();
  initSchemeCalculator();
  initDrawersAndBadges();
  initDealerPortal();
  initGoldParticles();
  initCard3DTilt();

  // Enable smooth horizontal scrolling with mouse wheel on desktop
  const scrollableRows = document.querySelectorAll('.nav-links-row, .bubbles-scroll-track, .category-filter-chips');
  scrollableRows.forEach(row => {
    row.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && e.deltaY !== 0) {
        const maxScroll = row.scrollWidth - row.clientWidth;
        if (maxScroll > 0) {
          e.preventDefault();
          row.scrollLeft += e.deltaY * 0.85;
        }
      }
    }, { passive: false });
  });
});

// Toast Notification Engine
window.showToast = function(msg, icon = '✨') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.innerHTML = `
    <span style="font-size: 1.2rem;">${icon}</span>
    <span>${msg}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3200);
};

// 1. Interactive 3D Gold Dust & Particle Canvas
function initGoldParticles() {
  const canvas = document.getElementById('gold-particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = canvas.offsetWidth;
  let height = canvas.height = canvas.offsetHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  });

  const particleCount = 45;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.6,
      speedY: Math.random() * 0.5 + 0.2,
      speedX: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * 0.02 + 0.005
    });
  }

  let mouseX = width / 2;
  let mouseY = height / 2;
  canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.y -= p.speedY;
      p.x += p.speedX;
      p.alpha += Math.sin(Date.now() * p.pulse) * 0.01;

      // Wrap around
      if (p.y < 0) p.y = height;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;

      // Slight interaction with mouse
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        p.x -= dx * 0.01;
        p.y -= dy * 0.01;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(223, 190, 107, ${Math.max(0.1, Math.min(0.8, p.alpha))})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(184, 142, 47, 0.4)';
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

// 2. Vanilla 3D Tilt Engine for Cards with Realistic Specular Sheen
function initCard3DTilt() {
  const cards = document.querySelectorAll('.ecom-card, .calc-bright-box, .hero-visual-frame');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6; // Max 6deg
      const rotateY = ((x - centerX) / centerX) * 6;
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;

      card.style.setProperty('--mouse-x', `${percentX}%`);
      card.style.setProperty('--mouse-y', `${percentY}%`);
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
    });
  });
}

// 3. Top Bar Live Bullion Rates
function initTopBarRates() {
  const el24 = document.getElementById('rate-24k');
  const el22 = document.getElementById('rate-22k');
  const el18 = document.getElementById('rate-18k');
  const elSil = document.getElementById('rate-silver');
  const elTime = document.getElementById('rate-timestamp');

  if (el24) el24.textContent = formatINR(liveRates.gold24k * 10);
  if (el22) el22.textContent = formatINR(liveRates.gold22k * 10);
  if (el18) el18.textContent = formatINR(liveRates.gold18k * 10);
  if (elSil) elSil.textContent = formatINR(liveRates.silver999 * 1000) + '/kg';

  if (elTime) {
    const now = new Date();
    elTime.textContent = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) + ' ' + now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' Live';
  }
}

window.refreshLiveRates = function() {
  // Minor realistic market fluctuation +/- 10-20 rs
  const delta = (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 15 + 5);
  liveRates.gold22k += delta;
  liveRates.gold24k += delta;
  localStorage.setItem('rajesh_live_rates', JSON.stringify(liveRates));

  initTopBarRates();
  renderProducts();
  if (window.recalculateEstimator) window.recalculateEstimator();
  showToast('Live bullion rates refreshed from Mirzapur market', '📊');
};

// 4. Render Products Catalog (E-Commerce Store Grid)
function renderProducts() {
  const container = document.getElementById('products-grid');
  const countDisplay = document.getElementById('items-count-display');
  if (!container) return;

  let items = [...productsCatalog];
  if (currentFilter !== 'all') {
    items = items.filter(i => i.category === currentFilter);
  }

  if (currentSort === 'price-low') {
    items.sort((a, b) => calculateItemPrice(a).grandTotal - calculateItemPrice(b).grandTotal);
  } else if (currentSort === 'price-high') {
    items.sort((a, b) => calculateItemPrice(b).grandTotal - calculateItemPrice(a).grandTotal);
  } else if (currentSort === 'weight') {
    items.sort((a, b) => parseFloat(a.netGoldWeight) - parseFloat(b.netGoldWeight));
  }

  if (countDisplay) {
    countDisplay.textContent = `Showing ${items.length} Designs in Wellesley Ganj`;
  }

  if (items.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
        <h3 style="font-size: 1.4rem; color: var(--brand-plum); margin-bottom: 0.5rem;">No Designs Found</h3>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Try selecting another category or check back as our dealer adds new stock.</p>
        <button class="btn btn-outline" onclick="filterCategory('all')">View All Collections</button>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(item => {
    const pricing = calculateItemPrice(item);
    const isWishlisted = wishlist.includes(item.id);
    const inBagItem = shoppingBag.find(i => i.id === item.id);

    return `
      <div class="ecom-card" data-id="${item.id}">
        <div class="card-img-holder">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          
          ${item.badge ? `<span class="card-badge-tag">${item.badge}</span>` : ''}
          
          <span class="card-hallmark-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#B88E2F"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
            ${item.purity}
          </span>

          <button class="card-wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist('${item.id}', this)" title="Add to Wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? '#BA1A1A' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>

        <div class="card-content">
          <span class="card-category-lbl">${item.categoryLabel}</span>
          <h3 class="card-title">${item.name}</h3>
          <p class="card-subtitle">${item.hindiName || ''}</p>

          <div class="card-specs-row">
            <span>Gross: <strong>${item.grossWeight}</strong></span>
            <span>Net Gold: <strong>${item.netGoldWeight}</strong></span>
          </div>

          <div class="card-price-block">
            <div>
              <span class="card-making-sub">Live Price (+${item.makingPercent}% Making + GST)</span>
              <div class="card-price">${formatINR(pricing.grandTotal)}</div>
            </div>
            <span style="font-size: 0.72rem; color: #0E8345; font-weight: 700; background: #E8F8EF; padding: 0.2rem 0.5rem; border-radius: 4px;">
              ${item.inStock ? 'Ready in Store' : 'Made to Order'}
            </span>
          </div>

          <div class="card-buttons-row">
            <button class="btn btn-outline" style="padding: 0.55rem 0.75rem; font-size: 0.78rem;" onclick="openQuickView('${item.id}')">
              Quick View
            </button>
            <button class="btn ${inBagItem ? 'btn-primary' : 'btn-gold'}" style="padding: 0.55rem 0.75rem; font-size: 0.78rem;" onclick="toggleShoppingBag('${item.id}', this)">
              ${inBagItem ? `✓ In Bag (${inBagItem.qty || 1})` : '+ Add to Bag'}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Re-bind 3D tilt on newly rendered cards
  initCard3DTilt();
}

// 5. Category Filter Chips & Bubbles
function initCategoryBubbles() {
  const bubbles = document.querySelectorAll('.cat-bubble-item');
  const chips = document.querySelectorAll('.filter-chip');

  bubbles.forEach(b => {
    b.addEventListener('click', (e) => {
      e.preventDefault();
      bubbles.forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      filterCategory(b.dataset.filter);
      document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  chips.forEach(c => {
    c.addEventListener('click', () => {
      chips.forEach(x => x.classList.remove('active'));
      c.classList.add('active');
      filterCategory(c.dataset.filter);
    });
  });

  const sortSelect = document.getElementById('catalog-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }
}

window.filterCategory = function(cat) {
  currentFilter = cat;
  document.querySelectorAll('.filter-chip').forEach(c => {
    if (c.dataset.filter === cat) c.classList.add('active');
    else c.classList.remove('active');
  });
  document.querySelectorAll('.cat-bubble-item').forEach(b => {
    if (b.dataset.filter === cat) b.classList.add('active');
    else b.classList.remove('active');
  });
  document.querySelectorAll('.nav-link-item').forEach(n => {
    const a = n.querySelector('a');
    if (a && a.getAttribute('onclick')?.includes(`'${cat}'`)) n.classList.add('active');
    else n.classList.remove('active');
  });
  renderProducts();
};

// 6. Live Search Engine
function initLiveSearch() {
  const input = document.getElementById('search-input');
  const dropdown = document.getElementById('search-dropdown');
  if (!input || !dropdown) return;

  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      dropdown.classList.remove('active');
      return;
    }

    const matches = productsCatalog.filter(p => 
      p.name.toLowerCase().includes(query) ||
      (p.hindiName && p.hindiName.toLowerCase().includes(query)) ||
      p.categoryLabel.toLowerCase().includes(query) ||
      p.purity.toLowerCase().includes(query) ||
      p.stoneType.toLowerCase().includes(query)
    ).slice(0, 6);

    if (matches.length > 0) {
      dropdown.innerHTML = matches.map(item => {
        const price = calculateItemPrice(item).grandTotal;
        return `
          <div class="search-drop-item" onclick="openQuickView('${item.id}'); document.getElementById('search-dropdown').classList.remove('active');">
            <img src="${item.image}" alt="${item.name}">
            <div style="flex: 1;">
              <div style="font-size: 0.88rem; font-weight: 600; color: var(--text-main);">${item.name}</div>
              <div style="font-size: 0.75rem; color: var(--text-dim);">${item.categoryLabel} • ${item.netGoldWeight} Net</div>
            </div>
            <div style="font-size: 0.95rem; font-weight: 700; color: var(--brand-plum);">${formatINR(price)}</div>
          </div>
        `;
      }).join('');
      dropdown.classList.add('active');
    } else {
      dropdown.innerHTML = `
        <div style="padding: 1.25rem; text-align: center; color: var(--text-dim); font-size: 0.85rem;">
          No matching ornaments for "<strong>${input.value}</strong>" in store.
        </div>
      `;
      dropdown.classList.add('active');
    }
  });

  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });
}

// 7. DEALER / SHOP ADMIN MANAGEMENT SUITE
function initDealerPortal() {
  const dealerTabs = document.querySelectorAll('.dealer-tab-btn');
  const dealerPanes = document.querySelectorAll('.dealer-tab-pane');

  dealerTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      dealerTabs.forEach(b => b.classList.remove('active'));
      dealerPanes.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.pane)?.classList.add('active');
    });
  });

  const in24 = document.getElementById('dealer-rate-24k');
  const in22 = document.getElementById('dealer-rate-22k');
  const in18 = document.getElementById('dealer-rate-18k');
  const inSil = document.getElementById('dealer-rate-silver');

  if (in24) in24.value = liveRates.gold24k;
  if (in22) in22.value = liveRates.gold22k;
  if (in18) in18.value = liveRates.gold18k;
  if (inSil) inSil.value = liveRates.silver999;

  renderDealerInventoryTable();
}

window.openDealerModal = function() {
  const modal = document.getElementById('dealer-modal');
  if (modal) {
    modal.classList.add('active');
    renderDealerInventoryTable();
  }
};

window.closeDealerModal = function() {
  document.getElementById('dealer-modal')?.classList.remove('active');
};

window.saveDealerRates = function(e) {
  e.preventDefault();
  const rate24 = parseFloat(document.getElementById('dealer-rate-24k').value) || liveRates.gold24k;
  const rate22 = parseFloat(document.getElementById('dealer-rate-22k').value) || liveRates.gold22k;
  const rate18 = parseFloat(document.getElementById('dealer-rate-18k').value) || liveRates.gold18k;
  const rateSil = parseFloat(document.getElementById('dealer-rate-silver').value) || liveRates.silver999;

  liveRates = {
    gold24k: rate24,
    gold22k: rate22,
    gold18k: rate18,
    silver999: rateSil
  };

  localStorage.setItem('rajesh_live_rates', JSON.stringify(liveRates));
  initTopBarRates();
  renderProducts();
  if (window.recalculateEstimator) window.recalculateEstimator();
  showToast('Live bullion rates updated! Catalog recalculated.', '💾');
};

window.handleDealerAddProduct = function(e) {
  e.preventDefault();

  const name = document.getElementById('new-item-name').value.trim();
  const hindiName = document.getElementById('new-item-hindi').value.trim();
  const category = document.getElementById('new-item-category').value;
  const purityKey = document.getElementById('new-item-purity').value;
  const grossWeight = parseFloat(document.getElementById('new-item-gross').value) || 10;
  const netWeight = parseFloat(document.getElementById('new-item-net').value) || 10;
  const making = parseFloat(document.getElementById('new-item-making').value) || 10;
  const imageChoice = document.getElementById('new-item-image').value;
  const badge = document.getElementById('new-item-badge').value;
  const stone = document.getElementById('new-item-stone').value.trim() || 'Pure Solid Metal';
  const desc = document.getElementById('new-item-desc').value.trim() || 'Handcrafted fine jewellery from Wellesley Ganj showroom.';

  const purityLabels = {
    gold22k: "22K BIS 916 Hallmark",
    gold24k: "24K Pure 999 Bullion",
    gold18k: "18K Diamond Certified Gold",
    silver999: "92.5% Pure Sterling Silver"
  };

  const categoryLabels = {
    bridal: "Royal Bridal",
    gold: "22K Gold Necklaces",
    bangles: "Temple Bangles",
    diamond: "Solitaire Diamonds",
    everyday: "Everyday & Festive",
    mens: "Men's Jewels",
    coins: "24K Gold Coins",
    silver: "Silver & Pooja"
  };

  const newItem = {
    id: "RJ-" + Math.floor(100 + Math.random() * 900),
    name: name,
    hindiName: hindiName,
    category: category,
    categoryLabel: categoryLabels[category] || "Fine Jewellery",
    purity: purityLabels[purityKey] || "22K 916 Hallmark",
    purityKey: purityKey,
    grossWeight: grossWeight.toFixed(2) + "g",
    netGoldWeight: netWeight.toFixed(2) + "g",
    stoneType: stone,
    image: imageChoice,
    description: desc,
    makingPercent: making,
    badge: badge,
    inStock: true
  };

  productsCatalog.unshift(newItem);
  localStorage.setItem('rajesh_products_catalog', JSON.stringify(productsCatalog));

  renderProducts();
  renderDealerInventoryTable();
  showToast(`'${name}' published to online store!`, '🎉');
  document.getElementById('add-product-form').reset();
};

function renderDealerInventoryTable() {
  const tbody = document.getElementById('dealer-inventory-tbody');
  if (!tbody) return;

  tbody.innerHTML = productsCatalog.map(item => {
    const price = calculateItemPrice(item).grandTotal;
    return `
      <tr style="border-bottom: 1px solid var(--border-subtle);">
        <td style="padding: 0.75rem;"><img src="${item.image}" style="width: 42px; height: 42px; border-radius: 4px; object-fit: cover;"></td>
        <td style="padding: 0.75rem;"><strong>${item.name}</strong><br><small style="color: var(--text-dim);">${item.id} • ${item.categoryLabel}</small></td>
        <td style="padding: 0.75rem;">${item.netGoldWeight}</td>
        <td style="padding: 0.75rem; font-weight: 700; color: var(--brand-plum);">${formatINR(price)}</td>
        <td style="padding: 0.75rem;"><span style="color: #0E8345; font-weight: 600;">Active</span></td>
        <td style="padding: 0.75rem;">
          <button onclick="deleteProduct('${item.id}')" style="background: var(--danger-soft); color: var(--danger-ruby); border: 1px solid var(--danger-ruby); padding: 0.25rem 0.6rem; border-radius: 4px; cursor: pointer; font-size: 0.78rem;">
            Remove
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

window.deleteProduct = function(id) {
  if (confirm('Are you sure you want to remove this ornament from the showcase?')) {
    productsCatalog = productsCatalog.filter(p => p.id !== id);
    localStorage.setItem('rajesh_products_catalog', JSON.stringify(productsCatalog));
    renderProducts();
    renderDealerInventoryTable();
    showToast('Ornament removed from showcase', '🗑️');
  }
};

// 8. Transparent Gold Price Calculator (Bright Luxury Card)
function initCalculator() {
  const weightInput = document.getElementById('calc-weight');
  const makingInput = document.getElementById('calc-making');
  const makingValDisplay = document.getElementById('calc-making-val');
  const metalButtons = document.querySelectorAll('.metal-choice-btn');
  const weightChips = document.querySelectorAll('.chip-btn');
  const whatsappCalcBtn = document.getElementById('calc-whatsapp-btn');

  let selectedMetal = 'gold22k';
  let metalLabel = '22K 916 Hallmark Gold';

  metalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      metalButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedMetal = btn.dataset.metal;
      metalLabel = btn.querySelector('strong').textContent;
      recalc();
    });
  });

  weightChips.forEach(chip => {
    chip.addEventListener('click', () => {
      weightChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      weightInput.value = chip.dataset.weight;
      recalc();
    });
  });

  if (weightInput) {
    weightInput.addEventListener('input', () => {
      weightChips.forEach(c => c.classList.remove('active'));
      recalc();
    });
  }

  if (makingInput && makingValDisplay) {
    makingInput.addEventListener('input', () => {
      makingValDisplay.textContent = makingInput.value + '%';
      recalc();
    });
  }

  function recalc() {
    const weight = parseFloat(weightInput.value) || 0;
    const makingRate = parseFloat(makingInput.value) || 10;
    const ratePerGram = liveRates[selectedMetal] || liveRates.gold22k;

    const baseVal = weight * ratePerGram;
    const makingCharge = baseVal * (makingRate / 100);
    const subtotal = baseVal + makingCharge;
    const gst = subtotal * 0.03;
    const grandTotal = subtotal + gst;

    document.getElementById('res-metal-name').textContent = `${metalLabel} (${weight}g @ ₹${ratePerGram}/g)`;
    document.getElementById('res-gold-val').textContent = formatINR(baseVal);
    document.getElementById('res-making-val').textContent = formatINR(makingCharge) + ` (${makingRate}%)`;
    document.getElementById('res-gst-val').textContent = formatINR(gst) + ` (3%)`;
    document.getElementById('res-total-val').textContent = formatINR(grandTotal);

    if (whatsappCalcBtn) {
      const msg = encodeURIComponent(
        `Namaste Rajesh Jewellers Mirzapur,\n\nI calculated an estimate on your online store:\n• Metal: ${metalLabel}\n• Weight: ${weight} Grams\n• Estimated Total: ${formatINR(grandTotal)}\n\nPlease let me know if similar bridal/ornament designs are available at your Wellesley Ganj showroom.`
      );
      whatsappCalcBtn.href = `https://wa.me/919450000000?text=${msg}`;
    }
  }

  window.recalculateEstimator = recalc;
  recalc();
}

// 9. Swarna Nidhi (11+1 Monthly Gold Scheme)
function initSchemeCalculator() {
  const slider = document.getElementById('scheme-slider');
  const amountDisp = document.getElementById('scheme-monthly-display');
  const totalPaidDisp = document.getElementById('scheme-total-paid');
  const bonusDisp = document.getElementById('scheme-bonus');
  const totalValueDisp = document.getElementById('scheme-total-value');
  const schemeEnrollBtn = document.getElementById('scheme-enroll-btn');

  if (!slider) return;

  function updateScheme() {
    const monthly = parseInt(slider.value) || 5000;
    const paidByCustomer = monthly * 11;
    const bonus = monthly;
    const total = paidByCustomer + bonus;

    if (amountDisp) amountDisp.textContent = formatINR(monthly);
    if (totalPaidDisp) totalPaidDisp.textContent = formatINR(paidByCustomer);
    if (bonusDisp) bonusDisp.textContent = formatINR(bonus) + " FREE";
    if (totalValueDisp) totalValueDisp.textContent = formatINR(total);

    if (schemeEnrollBtn) {
      const msg = encodeURIComponent(
        `Namaste Rajesh Jewellers Mirzapur,\n\nI want to enroll in the 'Rajesh Swarna Nidhi' 11+1 Monthly Gold Scheme for ₹${monthly}/month.\nPlease send me enrollment details for your Wellesley Ganj showroom.`
      );
      schemeEnrollBtn.href = `https://wa.me/919450000000?text=${msg}`;
    }
  }

  slider.addEventListener('input', updateScheme);
  updateScheme();
}

// 10. Shopping Bag & Wishlist Drawers (with Quantity Controls & Promo Codes)
function initDrawersAndBadges() {
  updateBadges();
}

function updateBadges() {
  const bagBadges = document.querySelectorAll('.bag-count');
  const wishBadges = document.querySelectorAll('.wishlist-count');
  const totalQty = shoppingBag.reduce((sum, item) => sum + (item.qty || 1), 0);
  bagBadges.forEach(b => b.textContent = totalQty);
  wishBadges.forEach(b => b.textContent = wishlist.length);
}

window.toggleShoppingBag = function(productId, btnElement) {
  const item = productsCatalog.find(p => p.id === productId);
  if (!item) return;

  const existing = shoppingBag.find(i => i.id === productId);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
    showToast(`Increased quantity of ${item.name}`, '🛍️');
  } else {
    shoppingBag.push({ ...item, qty: 1 });
    showToast(`Added ${item.name} to Jewellery Bag!`, '✨');
  }

  localStorage.setItem('rajesh_shopping_bag', JSON.stringify(shoppingBag));
  updateBadges();
  renderProducts();
  openCartDrawer();
};

window.changeItemQty = function(id, delta) {
  const item = shoppingBag.find(i => i.id === id);
  if (!item) return;

  item.qty = (item.qty || 1) + delta;
  if (item.qty <= 0) {
    shoppingBag = shoppingBag.filter(i => i.id !== id);
    showToast(`Removed from bag`, '🗑️');
  }
  localStorage.setItem('rajesh_shopping_bag', JSON.stringify(shoppingBag));
  updateBadges();
  renderProducts();
  openCartDrawer();
};

window.applyCouponCode = function() {
  const code = (document.getElementById('coupon-code-input')?.value || '').trim().toUpperCase();
  if (code === 'LAGAN2026' || code === 'WELLESLEY10') {
    appliedCouponDiscount = 1500;
    appliedCouponCode = code;
    showToast(`🎉 Coupon ${code} applied! ₹1,500 Discount on Making Charges`, '🏷️');
  } else if (code) {
    showToast('Invalid Coupon. Try code LAGAN2026', '⚠️');
  }
  openCartDrawer();
};

window.openCartDrawer = function() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const body = document.getElementById('cart-drawer-items');
  const totalDisplay = document.getElementById('cart-total-price');
  const checkoutBtn = document.getElementById('cart-checkout-btn');

  if (shoppingBag.length === 0) {
    body.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--brand-plum)" stroke-width="1.5" style="margin-bottom: 1rem;"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        <h4 style="font-size: 1.15rem; color: var(--brand-plum); margin-bottom: 0.35rem;">Your Jewellery Bag is Empty</h4>
        <p style="color: var(--text-dim); font-size: 0.85rem; margin-bottom: 1.5rem;">Explore our royal bridal necklaces, bangles, and diamond rings to add items.</p>
        <button class="btn btn-primary" onclick="closeDrawers()">Start Shopping</button>
      </div>
    `;
    if (totalDisplay) totalDisplay.textContent = formatINR(0);
    if (checkoutBtn) checkoutBtn.style.display = 'none';
  } else {
    let grandTotal = 0;
    let totalNetWeight = 0;

    body.innerHTML = `
      <!-- Delivery / Pickup Selector -->
      <div style="display: flex; gap: 0.5rem; background: var(--bg-warm); padding: 0.35rem; border-radius: 6px; margin-bottom: 1.25rem;">
        <button class="btn btn-primary" style="flex: 1; padding: 0.45rem; font-size: 0.78rem;">🏬 Wellesley Ganj Pickup</button>
        <button class="btn btn-outline" style="flex: 1; padding: 0.45rem; font-size: 0.78rem;" onclick="showToast('Insured Doorstep Delivery active across UP', '🚚')">🚚 Insured Delivery</button>
      </div>

      <!-- Item Rows -->
      ${shoppingBag.map(item => {
        const qty = item.qty || 1;
        const singlePrice = calculateItemPrice(item).grandTotal;
        const lineTotal = singlePrice * qty;
        grandTotal += lineTotal;
        totalNetWeight += (parseFloat(item.netGoldWeight) || 0) * qty;

        return `
          <div class="drawer-item-row">
            <img src="${item.image}" alt="${item.name}">
            <div class="drawer-item-info">
              <h4 class="drawer-item-title">${item.name}</h4>
              <div class="drawer-item-specs">${item.purity} • ${item.netGoldWeight} Net</div>
              <div class="drawer-qty-row">
                <button class="qty-btn" onclick="changeItemQty('${item.id}', -1)">-</button>
                <span class="qty-num">${qty}</span>
                <button class="qty-btn" onclick="changeItemQty('${item.id}', 1)">+</button>
              </div>
            </div>
            <div style="text-align: right;">
              <div class="drawer-item-price">${formatINR(lineTotal)}</div>
              <button class="drawer-remove-btn" onclick="changeItemQty('${item.id}', -${qty})" title="Remove">&times;</button>
            </div>
          </div>
        `;
      }).join('')}

      <!-- Promo Code Section -->
      <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px dashed var(--border-medium);">
        <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-main); display: block; margin-bottom: 0.35rem;">Promo Code / कूपन कोड</label>
        <div class="coupon-input-box">
          <input type="text" id="coupon-code-input" placeholder="e.g. LAGAN2026" value="${appliedCouponCode}">
          <button class="btn btn-gold" style="padding: 0.5rem 1rem; font-size: 0.78rem;" onclick="applyCouponCode()">Apply</button>
        </div>
        ${appliedCouponDiscount > 0 ? `<div style="font-size: 0.78rem; color: #0E8345; font-weight: 600;">✓ ₹${appliedCouponDiscount} Making Charge Discount Applied</div>` : ''}
      </div>

      <!-- Weight & Summary Box -->
      <div style="background: var(--bg-warm); border-radius: 8px; padding: 1rem; margin-top: 1rem; font-size: 0.82rem;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
          <span style="color: var(--text-dim);">Total Pure Gold/Silver Wt:</span>
          <strong>${totalNetWeight.toFixed(2)} Grams</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
          <span style="color: var(--text-dim);">Purity Certification:</span>
          <span style="color: #0E8345; font-weight: 700;">100% BIS 916 HUID</span>
        </div>
        ${appliedCouponDiscount > 0 ? `
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem; color: #0E8345;">
            <span>Coupon Discount:</span>
            <strong>-₹${appliedCouponDiscount}</strong>
          </div>
        ` : ''}
        <div style="display: flex; justify-content: space-between; color: var(--text-dim);">
          <span>GST (3%) & Insured Packing:</span>
          <span>Included</span>
        </div>
      </div>
    `;

    const finalPayable = Math.max(0, grandTotal - appliedCouponDiscount);
    if (totalDisplay) totalDisplay.textContent = formatINR(finalPayable);

    if (checkoutBtn) {
      checkoutBtn.style.display = 'inline-flex';
      const itemsList = shoppingBag.map(i => `• ${i.name} [Qty: ${i.qty || 1}, Net: ${i.netGoldWeight}]`).join('\n');
      const msg = encodeURIComponent(
        `Namaste Rajesh Jewellers Mirzapur,\n\nI want to finalize/inquire about my Jewellery Bag:\n\n${itemsList}\n\n• Total Approx Value: ${formatINR(finalPayable)}\n• Total Net Weight: ${totalNetWeight.toFixed(2)}g\n${appliedCouponCode ? `• Coupon: ${appliedCouponCode} (-₹${appliedCouponDiscount})\n` : ''}• Pickup: Wellesley Ganj Showroom\n\nPlease confirm product availability.`
      );
      checkoutBtn.href = `https://wa.me/919450000000?text=${msg}`;
    }
  }

  drawer.classList.add('active');
  overlay.classList.add('active');
};

window.closeDrawers = function() {
  document.getElementById('cart-drawer')?.classList.remove('active');
  document.getElementById('wishlist-drawer')?.classList.remove('active');
  document.getElementById('drawer-overlay')?.classList.remove('active');
};

// Wishlist handling
window.toggleWishlist = function(productId, btnElement) {
  const idx = wishlist.indexOf(productId);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    if (btnElement) btnElement.classList.remove('active');
    showToast('Removed from wishlist', '💔');
  } else {
    wishlist.push(productId);
    if (btnElement) btnElement.classList.add('active');
    showToast('Saved to your Wishlist!', '❤️');
  }
  localStorage.setItem('rajesh_wishlist', JSON.stringify(wishlist));
  updateBadges();
  renderProducts();
};

window.openWishlistDrawer = function() {
  const drawer = document.getElementById('wishlist-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const body = document.getElementById('wishlist-drawer-items');

  if (wishlist.length === 0) {
    body.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--danger-ruby)" stroke-width="1.5" style="margin-bottom: 1rem;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        <h4 style="font-size: 1.15rem; color: var(--brand-plum); margin-bottom: 0.35rem;">No Saved Designs</h4>
        <p style="color: var(--text-dim); font-size: 0.85rem; margin-bottom: 1.5rem;">Click the heart icon on any bridal set or kada to view here.</p>
        <button class="btn btn-primary" onclick="closeDrawers()">Browse Designs</button>
      </div>
    `;
  } else {
    const items = productsCatalog.filter(p => wishlist.includes(p.id));
    body.innerHTML = items.map(item => {
      const price = calculateItemPrice(item).grandTotal;
      return `
        <div class="drawer-item-row">
          <img src="${item.image}" alt="${item.name}">
          <div class="drawer-item-info">
            <h4 class="drawer-item-title">${item.name}</h4>
            <div class="drawer-item-specs">${item.purity} • ${item.netGoldWeight} Net</div>
            <div class="drawer-item-price">${formatINR(price)}</div>
          </div>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <button class="btn btn-gold" style="padding: 0.35rem 0.65rem; font-size: 0.72rem;" onclick="toggleShoppingBag('${item.id}')">Add to Bag</button>
            <button class="drawer-remove-btn" onclick="toggleWishlist('${item.id}'); openWishlistDrawer();">&times;</button>
          </div>
        </div>
      `;
    }).join('');
  }

  drawer.classList.add('active');
  overlay.classList.add('active');
};

// 11. Quick View Modal with 3D Zoom
window.openQuickView = function(productId) {
  const item = productsCatalog.find(p => p.id === productId);
  if (!item) return;

  const modal = document.getElementById('quickview-modal');
  const body = document.getElementById('quickview-body');
  const price = calculateItemPrice(item);

  body.innerHTML = `
    <div class="quickview-modal-grid">
      <!-- Interactive Zoom Container -->
      <div class="zoom-frame" id="quickview-zoom-frame">
        <img src="${item.image}" alt="${item.name}" id="quickview-zoom-img">
        <div style="position: absolute; bottom: 0.75rem; left: 0.75rem; background: rgba(0,0,0,0.7); color: #FFF; font-size: 0.7rem; padding: 0.2rem 0.6rem; border-radius: 4px; pointer-events: none;">
          🔍 Hover / Move to Magnify
        </div>
      </div>

      <div style="display: flex; flex-direction: column;">
        <span style="font-size: 0.75rem; color: var(--gold-dark); text-transform: uppercase; font-weight: 700; margin-bottom: 0.35rem;">${item.categoryLabel}</span>
        <h2 style="font-size: 1.6rem; color: var(--brand-plum); line-height: 1.2; margin-bottom: 0.35rem;">${item.name}</h2>
        <h4 style="font-size: 0.92rem; color: var(--text-dim); margin-bottom: 1.25rem; font-weight: 400;">${item.hindiName || ''}</h4>

        <div style="background: var(--bg-warm); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 1.15rem; margin-bottom: 1.25rem; font-size: 0.85rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
            <span style="color: var(--text-dim);">Purity Certification:</span>
            <strong style="color: var(--brand-plum);">${item.purity}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
            <span style="color: var(--text-dim);">Gross Weight:</span>
            <strong>${item.grossWeight}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
            <span style="color: var(--text-dim);">Pure Net Gold Wt:</span>
            <strong style="color: var(--gold-dark);">${item.netGoldWeight}</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-dim);">Stone / Detailing:</span>
            <strong>${item.stoneType}</strong>
          </div>
        </div>

        <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.5rem;">${item.description}</p>

        <div style="margin-bottom: 1.5rem;">
          <span style="font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase;">Today's Rate Price (Making + 3% GST Included):</span>
          <div style="font-size: 1.85rem; font-weight: 800; color: var(--brand-plum);">${formatINR(price.grandTotal)}</div>
        </div>

        <div style="display: flex; gap: 0.75rem;" class="quickview-actions-row">
          <button class="btn btn-gold" style="flex: 1;" onclick="toggleShoppingBag('${item.id}'); closeModal('quickview-modal');">
            Add to Bag
          </button>
          <a href="https://wa.me/919450000000?text=${encodeURIComponent(`Namaste Rajesh Jewellers Mirzapur,\nI would like to inquire about: ${item.name} (${item.id})\nWeight: ${item.netGoldWeight}\nApprox Price: ${formatINR(price.grandTotal)}\nShowroom: Wellesley Ganj, Mirzapur.`)}" target="_blank" class="btn btn-primary" style="flex: 1;">
            Order on WhatsApp
          </a>
        </div>
      </div>
    </div>
  `;

  // Attach interactive zoom effect
  const zoomFrame = document.getElementById('quickview-zoom-frame');
  const zoomImg = document.getElementById('quickview-zoom-img');
  if (zoomFrame && zoomImg) {
    zoomFrame.addEventListener('mousemove', (e) => {
      const rect = zoomFrame.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      zoomImg.style.transformOrigin = `${x}% ${y}%`;
      zoomImg.style.transform = 'scale(2)';
    });

    zoomFrame.addEventListener('mouseleave', () => {
      zoomImg.style.transform = 'scale(1)';
      zoomImg.style.transformOrigin = 'center center';
    });
  }

  modal.classList.add('active');
};

window.closeModal = function(id) {
  document.getElementById(id)?.classList.remove('active');
};

// 12. VIP Showroom Consultation Booking
window.bookShowroomVisit = function(optionalItem = '') {
  const modal = document.getElementById('quickview-modal');
  const body = document.getElementById('quickview-body');

  body.innerHTML = `
    <div class="vip-booking-container">
      <div class="kicker-tag" style="margin-bottom: 0.5rem;">VIP Showroom Consultation</div>
      <h2 style="font-size: 1.6rem; color: var(--brand-plum); margin-bottom: 0.5rem;">Visit Wellesley Ganj Showroom</h2>
      <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1.5rem;">
        Station Road, Wellesley Ganj, Mirzapur. Book a private viewing session for wedding lagan shopping.
      </p>

      <form onsubmit="handleVisitSubmit(event, '${optionalItem}')" style="display: flex; flex-direction: column; gap: 1rem;">
        <div class="form-field">
          <label>Full Name / आपका नाम</label>
          <input type="text" id="visit-name" placeholder="e.g. Rajesh Singh / Priya Gupta" required>
        </div>
        <div class="form-field">
          <label>Mobile Number / फ़ोन नंबर</label>
          <input type="tel" id="visit-phone" placeholder="e.g. 9876543210" required>
        </div>
        <div class="form-field">
          <label>Preferred Date / मिलने की तारीख</label>
          <input type="date" id="visit-date" required>
        </div>
        <div class="form-field">
          <label>Jewellery Requirement / पसंद</label>
          <select id="visit-category">
            <option value="Bridal Lagan Sets">Bridal Lagan Sets (विवाह आभूषण)</option>
            <option value="22K Gold Chains & Necklaces">22K Gold Chains & Necklaces</option>
            <option value="Temple Bangles & Kadas">Temple Bangles & Kadas</option>
            <option value="Solitaire Engagement Ring">Solitaire Engagement Rings</option>
            <option value="Silver Utensils & Payal">Silver Payal & Pooja Articles</option>
            <option value="Swarna Nidhi Scheme">Rajesh Swarna Nidhi Scheme</option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary" style="margin-top: 0.5rem; padding: 0.95rem;">
          Confirm & Send Appointment on WhatsApp
        </button>
      </form>
    </div>
  `;

  modal.classList.add('active');
};

window.handleVisitSubmit = function(e, optionalItem) {
  e.preventDefault();
  const name = document.getElementById('visit-name').value;
  const phone = document.getElementById('visit-phone').value;
  const date = document.getElementById('visit-date').value;
  const cat = document.getElementById('visit-category').value;

  const msg = encodeURIComponent(
    `Namaste Rajesh Jewellers Mirzapur,\n\nI want to book a VIP Showroom Visit at Wellesley Ganj:\n• Name: ${name}\n• Mobile: ${phone}\n• Visit Date: ${date}\n• Category: ${cat} ${optionalItem ? `(${optionalItem})` : ''}\n\nPlease confirm our viewing appointment.`
  );

  window.open(`https://wa.me/919450000000?text=${msg}`, '_blank');
  closeModal('quickview-modal');
  showToast('Appointment details sent to Wellesley Ganj showroom!', '📅');
};
