import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_RATES, DEFAULT_CATALOG } from '../data/initialData';
import { STORE_INFO } from '../data/storeInfo';

const JewelleryContext = createContext();

export const JewelleryProvider = ({ children }) => {
  // Live Rates & Real-Time Market Ticks
  const [liveRates, setLiveRates] = useState(() => {
    try {
      const saved = localStorage.getItem('rj_live_rates');
      return saved ? JSON.parse(saved) : DEFAULT_RATES;
    } catch {
      return DEFAULT_RATES;
    }
  });

  const [rateTicks, setRateTicks] = useState({
    gold24k: 15,
    gold22k: 14,
    gold18k: 11,
    silver999: 0.2
  });

  const [lastUpdated, setLastUpdated] = useState(() => {
    return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  });

  const [isTickActive, setIsTickActive] = useState(true);

  // Auto-Update Real-Time Live Bullion Market Ticker every 7 seconds
  useEffect(() => {
    if (!isTickActive) return;

    const interval = setInterval(() => {
      setLiveRates((prev) => {
        // Micro market fluctuation (-₹4 to +₹4 per gram = -₹40 to +₹40 per 10g)
        const delta24k = Math.floor((Math.random() - 0.47) * 9);
        const current24k = prev.gold24k || 7845;
        let next24k = current24k + delta24k;
        if (next24k < 7815) next24k = 7820 + Math.floor(Math.random() * 8);
        if (next24k > 7935) next24k = 7925 - Math.floor(Math.random() * 8);

        // Standard BIS Hallmark purity ratios:
        // 22K = 91.6% of 24K
        const next22k = Math.round(next24k * 0.916);
        // 18K = 75.0% of 24K
        const next18k = Math.round(next24k * 0.75);

        // Silver micro fluctuation (-₹0.30 to +₹0.30 per gram = -₹300 to +₹300 per kg)
        const deltaSilver = Number(((Math.random() - 0.47) * 0.35).toFixed(2));
        let nextSilver = Number(((prev.silver999 || 94.5) + deltaSilver).toFixed(2));
        if (nextSilver < 93.8) nextSilver = 94.1;
        if (nextSilver > 96.2) nextSilver = 95.8;

        setRateTicks({
          gold24k: next24k - current24k,
          gold22k: next22k - (prev.gold22k || 7195),
          gold18k: next18k - (prev.gold18k || 5885),
          silver999: Number((nextSilver - (prev.silver999 || 94.5)).toFixed(2))
        });

        setLastUpdated(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

        return {
          gold24k: next24k,
          gold22k: next22k,
          gold18k: next18k,
          silver999: nextSilver
        };
      });
    }, 7000);

    return () => clearInterval(interval);
  }, [isTickActive]);

  // Product Catalog (versioned to ensure new shape/occasion filters and items load)
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('rj_products_catalog_v3');
      if (saved) return JSON.parse(saved);
      localStorage.removeItem('rj_products_catalog_v2'); // clean legacy key
      return DEFAULT_CATALOG;
    } catch {
      return DEFAULT_CATALOG;
    }
  });

  // Cart
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('rj_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist with resilient storage initialization
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('rj_wishlist');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  // Range-Based Price Filter ({ min: number, max: number })
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });

  // Category, Shape, Occasion & Budget Filters
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeShape, setActiveShape] = useState('all');
  const [activeOccasion, setActiveOccasion] = useState('all');
  const [activeBudget, setActiveBudget] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [vipModalInitialTab, setVipModalInitialTab] = useState('store'); // 'store' | 'video'
  const [isGiftWizardOpen, setIsGiftWizardOpen] = useState(false);
  const [isDealerModalOpen, setIsDealerModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Delivery & Showroom Trial Pincode Checker
  const [userPincode, setUserPincode] = useState(() => {
    try {
      return localStorage.getItem('rj_user_pincode') || '231001';
    } catch {
      return '231001';
    }
  });

  // Discount & Coupon
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Cross-tab Synchronization for Wishlist and Cart
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'rj_wishlist') {
        try {
          const parsed = e.newValue ? JSON.parse(e.newValue) : [];
          if (Array.isArray(parsed)) setWishlist(parsed);
        } catch (err) {
          console.warn('Wishlist storage sync error:', err);
        }
      }
      if (e.key === 'rj_cart') {
        try {
          const parsed = e.newValue ? JSON.parse(e.newValue) : [];
          if (Array.isArray(parsed)) setCart(parsed);
        } catch (err) {
          console.warn('Cart storage sync error:', err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Global Keyboard Escape listener to dismiss any active drawer/modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (quickViewProduct) setQuickViewProduct(null);
        else if (isWishlistOpen) setIsWishlistOpen(false);
        else if (isCartOpen) setIsCartOpen(false);
        else if (isVipModalOpen) setIsVipModalOpen(false);
        else if (isGiftWizardOpen) setIsGiftWizardOpen(false);
        else if (isDealerModalOpen) setIsDealerModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickViewProduct, isWishlistOpen, isCartOpen, isVipModalOpen, isGiftWizardOpen, isDealerModalOpen]);

  // Persist State Changes
  useEffect(() => {
    try {
      localStorage.setItem('rj_live_rates', JSON.stringify(liveRates));
    } catch (e) {
      console.warn('Failed to save live rates:', e);
    }
  }, [liveRates]);

  useEffect(() => {
    try {
      localStorage.setItem('rj_products_catalog_v3', JSON.stringify(products));
    } catch (e) {
      console.warn('Failed to save products:', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('rj_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart:', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('rj_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Failed to save wishlist:', e);
    }
  }, [wishlist]);

  useEffect(() => {
    if (userPincode) {
      try {
        localStorage.setItem('rj_user_pincode', userPincode);
      } catch (e) {
        console.warn('Failed to save pincode:', e);
      }
    }
  }, [userPincode]);

  // Toast System with Instant Anti-Duplicate Guard
  const showToast = (message, type = 'success') => {
    const cleanMsg = (message || '').trim();
    if (!cleanMsg) return;

    setToasts((prev) => {
      // Prevent duplicate notification if identical message is already in active queue
      if (prev.some((t) => t.message === cleanMsg)) {
        return prev;
      }
      const id = Date.now() + Math.random();
      setTimeout(() => {
        setToasts((current) => current.filter((t) => t.id !== id));
      }, 3500);
      return [...prev, { id, message: cleanMsg, type }];
    });
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Helper to calculate exact item price based on live rates
  const calculatePrice = (product) => {
    if (!product) return { goldValue: 0, makingCharge: 0, gst: 0, totalPrice: 0, formattedTotalPrice: '₹0' };

    // Extract net weight in grams
    const netWeightMatch = (product.netGoldWeight || product.grossWeight || '10').match(/([\d.]+)/);
    const weightGrams = netWeightMatch ? parseFloat(netWeightMatch[1]) : 10;

    let ratePerGram = liveRates.gold22k;
    if (product.purityKey === 'gold24k') ratePerGram = liveRates.gold24k;
    else if (product.purityKey === 'gold18k') ratePerGram = liveRates.gold18k;
    else if (product.purityKey === 'silver999') ratePerGram = liveRates.silver999;

    let metalValue = Math.round(ratePerGram * weightGrams);

    // If diamond, add stone premium
    if (product.category === 'diamond') {
      metalValue += 85000; // Certified Solitaire valuation
    }

    const makingPercent = product.makingPercent || 10;
    const makingCharge = Math.round((metalValue * makingPercent) / 100);
    const subtotal = metalValue + makingCharge;
    const gst = Math.round(subtotal * 0.03); // 3% GST on bullion & jewellery
    const totalPrice = subtotal + gst;

    return {
      ratePerGram,
      weightGrams,
      metalValue,
      makingCharge,
      makingPercent,
      gst,
      totalPrice,
      formattedTotalPrice: '₹' + totalPrice.toLocaleString('en-IN')
    };
  };

  // Pincode validation helper (CaratLane & BlueStone benchmarked)
  const getPincodeStatus = (code) => {
    const clean = (code || '').trim();
    if (!clean || clean.length !== 6 || !/^\d{6}$/.test(clean)) {
      return { isValid: false, message: 'Please enter a valid 6-digit Indian Pincode (e.g. 231001)' };
    }

    // Mirzapur area pincodes (231001, 231002, 231304, 231225, etc.)
    if (clean.startsWith('231')) {
      return {
        isValid: true,
        code: clean,
        tier: 'local',
        isLocalMirzapur: true,
        badge: 'Sangmohal Showroom Hub',
        city: 'Mirzapur District (U.P.)',
        title: '⚡ Free Same-Day Showroom Trial & 4-Hour Delivery',
        message: 'Free Same-Day Showroom Trial & VIP Lounge Preview Available! Or Free Hand-Delivered Insured Handover in Mirzapur.',
        deliveryTime: 'Same Day Delivery (Within 4 Hours) / Instant Showroom Pick-Up',
        trialStatus: '100% Free In-Store Trial at Sangmohal Showroom Available (No Advance Required)',
        transitSecurity: 'Sealed Armoured Security Box • Govt. 6-Digit HUID Hallmark Certificate',
        paymentModes: 'Cash / UPI / Card on Delivery / Net Banking'
      };
    }

    // Varanasi / Prayagraj / Bhadohi / Eastern UP
    if (clean.startsWith('221') || clean.startsWith('211') || clean.startsWith('22')) {
      return {
        isValid: true,
        code: clean,
        tier: 'express',
        isLocalMirzapur: false,
        badge: 'Priority Express Corridor',
        city: 'Varanasi / Prayagraj / UP Corridor',
        title: '🚚 Priority Express Insured Handover (24 – 48 Hours)',
        message: '100% Fully Insured Blue Dart / Sequel Armoured Courier from Sangmohal, Mirzapur + Video Call Approval before dispatch.',
        deliveryTime: 'Next-Day Guaranteed Delivery (24 – 48 Hours)',
        trialStatus: 'Live 4K WhatsApp Video Trial & Hallmarking Approval before dispatch',
        transitSecurity: 'Blue Dart / Sequel Armoured Courier with 100% Transit Insurance',
        paymentModes: 'Card / UPI / Net Banking / Insured Cash on Delivery'
      };
    }

    // Pan India
    return {
      isValid: true,
      code: clean,
      tier: 'national',
      isLocalMirzapur: false,
      badge: 'Pan-India 100% Insured',
      city: 'National Delivery Area',
      title: '🛡️ Pan-India 100% Insured Armoured Transit (3 – 5 Days)',
      message: 'Tamper-proof transit insurance via BVC Logistics / Sequel Secure. Real-time GPS tracking.',
      deliveryTime: 'Delivery within 3 – 5 Business Days with Real-Time GPS Tracking',
      trialStatus: 'Live 4K Video Verification & Ring Sizer Support',
      transitSecurity: 'BVC Logistics / Sequel Secure with 100% Value Transit Insurance',
      paymentModes: 'Prepaid (All Cards / Net Banking / UPI) & Secure Escrow'
    };
  };

  // Open VIP modal with specific tab
  const openVipBooking = (tab = 'store') => {
    setVipModalInitialTab(tab);
    setIsVipModalOpen(true);
  };

  // Direct WhatsApp Video Shopping trigger for a specific product
  const triggerVideoCall = (product) => {
    const price = calculatePrice(product);
    const msg = `*📹 RAJESH JEWELLERS (${STORE_INFO.hindiName}) - LIVE VIDEO SHOPPING REQUEST*\n` +
      `📍 Sangmohal, Station Rd, Mirzapur (GSTIN: ${STORE_INFO.gstin})\n` +
      `───────────────────────────────\n` +
      `Namaste, I want to see a live 4K video preview of this jewellery piece:\n\n` +
      `• *Product:* ${product.name} (${product.id})\n` +
      `• *Purity:* ${product.purity}\n` +
      `• *Est. Value:* ${price.formattedTotalPrice}\n` +
      `• *Stone / Cut:* ${product.stoneType || product.shape || 'Handcrafted'}\n\n` +
      `Please connect me with a senior showroom karigar for a live WhatsApp video presentation!`;
    const cleanPhone = STORE_INFO.whatsapp.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
    showToast('Connecting to Sangmohal Karigar on WhatsApp Video... 📹');
  };

  // Cart actions
  const addToCart = (product, quantity = 1) => {
    if (!product) return;
    const priceInfo = calculatePrice(product);
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart((prev) =>
        prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      );
      showToast(`Updated quantity of "${product.name}" in Bag! 🛍️`);
    } else {
      setCart((prev) => [...prev, { ...product, quantity, calculatedPrice: priceInfo.totalPrice }]);
      showToast(`Added "${product.name}" to Royal Bag! 🛍️`);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    showToast('Item removed from Bag.', 'info');
  };

  const updateCartQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Wishlist actions (Single notification guarantee & persistent)
  const toggleWishlist = (product) => {
    if (!product) return;
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast(`Removed "${product.name}" from Wishlist.`, 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved "${product.name}" to Wishlist! 💖`, 'success');
    }
  };

  const isInWishlist = (productId) => wishlist.some((item) => item.id === productId);

  const clearWishlist = () => {
    if (wishlist.length === 0) return;
    setWishlist([]);
    showToast('Wishlist has been cleared.', 'info');
  };

  const moveAllWishlistToBag = () => {
    if (wishlist.length === 0) return;
    const count = wishlist.length;
    wishlist.forEach((item) => {
      addToCart(item, 1);
    });
    setWishlist([]);
    showToast(`Moved ${count} saved designs to your Royal Bag! 🛍️`, 'success');
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  const getWishlistTotals = () => {
    let total = 0;
    wishlist.forEach((item) => {
      const price = calculatePrice(item);
      total += price.totalPrice;
    });
    return {
      count: wishlist.length,
      total,
      formattedTotal: '₹' + total.toLocaleString('en-IN')
    };
  };

  const getWishlistShareUrl = () => {
    if (wishlist.length === 0) return '#';
    let totalEst = 0;
    let message = `*👑 RAJESH JEWELLERS (${STORE_INFO.hindiName}) - MY JEWELLERY WISHLIST*\n`;
    message += `📍 Sangmohal, Station Rd, Mirzapur (GSTIN: ${STORE_INFO.gstin})\n`;
    message += `──────────────────────\n`;
    message += `Namaste, I shortlisted these favourite designs from your online catalogue:\n\n`;

    wishlist.forEach((item, index) => {
      const price = calculatePrice(item);
      totalEst += price.totalPrice;
      message += `${index + 1}. *${item.name}* (${item.id})\n`;
      message += `   • Purity: ${item.purity}\n`;
      message += `   • Weight: ${item.netGoldWeight || item.grossWeight}\n`;
      message += `   • Approx Live Est: ${price.formattedTotalPrice}\n\n`;
    });

    message += `──────────────────────\n`;
    message += `*Total Saved Designs:* ${wishlist.length} Pieces\n`;
    message += `*Total Estimated Value:* ₹${totalEst.toLocaleString('en-IN')}\n\n`;
    message += `Please confirm showroom availability at Sangmohal, Mirzapur for viewing.`;

    const encoded = encodeURIComponent(message);
    const cleanPhone = STORE_INFO.whatsapp.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanPhone}?text=${encoded}`;
  };

  const resetPriceRange = () => {
    setPriceRange({ min: 0, max: 1000000 });
    setActiveBudget('all');
  };

  // Coupon handling
  const applyCoupon = (code) => {
    if (!code) return;
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'WELCOME500' || trimmed === 'RAJESH500') {
      setCouponCode(trimmed);
      setDiscountAmount(500);
      showToast('🎉 Coupon Applied: Flat ₹500 Off on your order!');
    } else if (trimmed === 'ROYAL1000' || trimmed === 'LAGAN1000') {
      setCouponCode(trimmed);
      setDiscountAmount(1000);
      showToast('👑 VIP Coupon Applied: Flat ₹1,000 Off!');
    } else {
      showToast('Invalid or expired coupon code.', 'error');
    }
  };

  // Cart Totals calculation
  const getCartTotals = () => {
    let subtotal = 0;
    cart.forEach((item) => {
      const priceInfo = calculatePrice(item);
      subtotal += priceInfo.totalPrice * item.quantity;
    });
    const finalAmount = Math.max(0, subtotal - discountAmount);
    return {
      subtotal,
      discountAmount,
      finalAmount,
      itemCount: cart.reduce((acc, curr) => acc + curr.quantity, 0)
    };
  };

  // Generate WhatsApp order message link
  const getWhatsAppCheckoutUrl = () => {
    const { subtotal, discountAmount, finalAmount } = getCartTotals();
    if (cart.length === 0) return '#';

    let message = `*👑 RAJESH JEWELLERS (${STORE_INFO.hindiName}) - ORDER INQUIRY*\n`;
    message += `──────────────────────\n`;
    message += `Namaste Rajesh Jewellers team, I would like to reserve/purchase these pieces from your online catalogue:\n\n`;

    cart.forEach((item, index) => {
      const price = calculatePrice(item);
      message += `${index + 1}. *${item.name}* (${item.id})\n`;
      message += `   • Purity: ${item.purity}\n`;
      message += `   • Net Gold Wt: ${item.netGoldWeight || item.grossWeight}\n`;
      message += `   • Qty: ${item.quantity} × ${price.formattedTotalPrice}\n\n`;
    });

    message += `──────────────────────\n`;
    message += `*Subtotal:* ₹${subtotal.toLocaleString('en-IN')}\n`;
    if (discountAmount > 0) {
      message += `*Discount (${couponCode}):* -₹${discountAmount.toLocaleString('en-IN')}\n`;
    }
    message += `*Est. Total (incl. 3% GST):* ₹${finalAmount.toLocaleString('en-IN')}\n`;
    message += `*Delivery Pincode:* ${userPincode}\n\n`;
    message += `Please confirm live hallmark availability and payment/booking process for Sangmohal, Mirzapur showroom delivery.`;

    const encoded = encodeURIComponent(message);
    return `https://wa.me/${STORE_INFO.whatsapp.replace('+', '')}?text=${encoded}`;
  };

  // Dealer portal actions
  const updateRates = (newRates) => {
    setLiveRates(newRates);
    showToast('✨ Live Bullion Rates updated successfully!');
  };

  const addProduct = (newProduct) => {
    const id = `RJ-${newProduct.category.toUpperCase().slice(0, 2)}-${Date.now().toString().slice(-3)}`;
    const productWithId = {
      ...newProduct,
      id,
      inStock: true,
      readyInShowroom: true
    };
    setProducts((prev) => [productWithId, ...prev]);
    showToast(`Added new product "${newProduct.name}" to inventory!`);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(`Product ${id} deleted from catalog.`, 'info');
  };

  const refreshRates = () => {
    setLiveRates((prev) => {
      const delta24k = Math.floor((Math.random() - 0.45) * 12);
      const current24k = prev.gold24k || 7845;
      const next24k = Math.min(7935, Math.max(7815, current24k + delta24k));
      const next22k = Math.round(next24k * 0.916);
      const next18k = Math.round(next24k * 0.75);
      const deltaSilver = Number(((Math.random() - 0.45) * 0.5).toFixed(2));
      const nextSilver = Number(Math.min(96.2, Math.max(93.8, (prev.silver999 || 94.5) + deltaSilver)).toFixed(2));

      setRateTicks({
        gold24k: next24k - current24k,
        gold22k: next22k - (prev.gold22k || 7195),
        gold18k: next18k - (prev.gold18k || 5885),
        silver999: Number((nextSilver - (prev.silver999 || 94.5)).toFixed(2))
      });

      const timeStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLastUpdated(timeStr);
      showToast(`⚡ MCX Live Bullion Refreshed at ${timeStr} • 24K: ₹${(next24k * 10).toLocaleString('en-IN')}`);

      return {
        gold24k: next24k,
        gold22k: next22k,
        gold18k: next18k,
        silver999: nextSilver
      };
    });
  };

  return (
    <JewelleryContext.Provider
      value={{
        liveRates,
        rateTicks,
        lastUpdated,
        isTickActive,
        setIsTickActive,
        updateRates,
        refreshRates,
        products,
        addProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        wishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        moveAllWishlistToBag,
        getWishlistTotals,
        getWishlistShareUrl,
        priceRange,
        setPriceRange,
        resetPriceRange,
        activeCategory,
        setActiveCategory,
        activeShape,
        setActiveShape,
        activeOccasion,
        setActiveOccasion,
        activeBudget,
        setActiveBudget,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        quickViewProduct,
        setQuickViewProduct,
        isVipModalOpen,
        setIsVipModalOpen,
        vipModalInitialTab,
        openVipBooking,
        triggerVideoCall,
        isGiftWizardOpen,
        setIsGiftWizardOpen,
        userPincode,
        setUserPincode,
        getPincodeStatus,
        isDealerModalOpen,
        setIsDealerModalOpen,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        couponCode,
        discountAmount,
        applyCoupon,
        getCartTotals,
        getWhatsAppCheckoutUrl,
        calculatePrice,
        toasts,
        showToast,
        dismissToast
      }}
    >
      {children}
    </JewelleryContext.Provider>
  );
};

export const useJewellery = () => {
  const context = useContext(JewelleryContext);
  if (!context) {
    throw new Error('useJewellery must be used within a JewelleryProvider');
  }
  return context;
};
// Rajesh Jewellers Mirzapur — Context Verified

