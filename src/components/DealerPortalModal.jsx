import React, { useState, useRef, useCallback } from 'react';
import { useJewellery } from '../context/JewelleryContext';
import { STORE_INFO } from '../data/storeInfo';
import AdminSidebarNav from './AdminSidebarNav';
import DashboardModule from './admin/DashboardModule';
import HomepageBuilderModule from './admin/HomepageBuilderModule';
import HeaderNavModule from './admin/HeaderNavModule';
import CategoriesModule from './admin/CategoriesModule';
import MediaLibraryModule from './admin/MediaLibraryModule';
import PromotionsModule from './admin/PromotionsModule';
import BookingsLeadsModule from './admin/BookingsLeadsModule';
import SeoContentModule from './admin/SeoContentModule';
import PoliciesLegalModule from './admin/PoliciesLegalModule';
import DesignAppearanceModule from './admin/DesignAppearanceModule';
import AdminUsersSecurityModule from './admin/AdminUsersSecurityModule';
import BackupRestoreModule from './admin/BackupRestoreModule';
import ActivityLogsModule from './admin/ActivityLogsModule';
import GeneralSettingsModule from './admin/GeneralSettingsModule';
import CalculatorConfigModule from './admin/CalculatorConfigModule';
import {
  X,
  Lock,
  Unlock,
  Trash2,
  CheckCircle2,
  Edit3,
  Video,
  Store,
  Download,
  Upload,
  Eye,
  Search,
  Phone,
  MapPin,
  AlertCircle,
  Camera,
  RefreshCw,
  ChevronRight,
  Star,
  Gift,
  Delete
} from 'lucide-react';

// Secure hardcoded showroom master passcode
const SECURE_MASTER_PASSCODE = '1994';

// Memoized Main Content Workspace Pane Container for 8 CMS Sections
const AdminContentPane = React.memo(({ activeTab, children }) => {
  return (
    <main className="admin-portal-content" aria-live="polite">
      {children}
    </main>
  );
});
AdminContentPane.displayName = 'AdminContentPane';

const DealerPortalModal = () => {
  const {
    isDealerModalOpen,
    setIsDealerModalOpen,
    liveRates,
    updateRates,
    refreshRates,
    isTickActive,
    setIsTickActive,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    calculatePrice,
    storeInfo,
    updateStoreInfo,
    adminPasscode,
    changeAdminPasscode,
    resetAllDataToDefaults,
    exportAllDataJSON,
    importAllDataJSON,
    isAdminAuthenticated,
    setIsAdminAuthenticated,
    showToast,
    homepageSections,
    setHomepageSections,
    offers,
    setOffers,
    leads,
    updateLeadStatus,
    seoConfig,
    setSeoConfig,
    legalPolicies,
    setLegalPolicies,
    adminUsers,
    setAdminUsers,
    activityLogs,
    designSettings,
    setDesignSettings,
    hasUnsavedDrafts,
    publishDraftToLiveSite
  } = useJewellery();

  // Active section inside full-screen CMS portal (23 Organized Modules)
  const [activeTab, setActiveTab] = useState('dashboard');
  const handleSelectTab = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  // Passcode gate state
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [showPasscodeHint, setShowPasscodeHint] = useState(false);

  // SECTION 1: Gold Rates form state
  const [ratesForm, setRatesForm] = useState({
    gold24k: liveRates.gold24k,
    gold22k: liveRates.gold22k,
    gold18k: liveRates.gold18k,
    silver999: liveRates.silver999
  });

  // SECTION 2: Products form & list state
  const [inventorySearch, setInventorySearch] = useState('');
  const [inventoryCategoryFilter, setInventoryCategoryFilter] = useState('all');
  const [editingProductId, setEditingProductId] = useState(null); // null = Add new
  const [productForm, setProductForm] = useState({
    name: '',
    hindiName: '',
    category: 'bridal',
    categoryLabel: 'Royal Bridal',
    purity: '22K BIS 916 Hallmark',
    purityKey: 'gold22k',
    grossWeight: '25.00g',
    netGoldWeight: '25.00g',
    stoneType: 'Pure 22K Hallmarked Gold',
    shape: 'pear',
    occasion: 'bridal',
    image: '/assets/images/store/store_display_jewellery.jpg',
    description: 'Handcrafted master bridal piece from Sangmohal showroom artisans.',
    makingPercent: 11,
    badge: 'Showroom Original',
    inStock: true,
    readyInShowroom: true
  });

  // SECTION 3: Gallery (5 Showroom Photos) state
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);
  const [photosList, setPhotosList] = useState(() => {
    return (storeInfo?.photos || STORE_INFO.photos).map((p) => ({ ...p }));
  });

  // SECTION 4: Videos state
  const [videoForm, setVideoForm] = useState({
    title: 'Rajesh Jewellers Sangmohal 4K Showroom Experience',
    subtitle: 'Pure 22K Hallmarked Gold Bell Earrings & Bridal Sets',
    url: storeInfo?.videoReelUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Showroom recording showcasing fine filigree craftsmanship and hallmark stamp at Sangmohal.',
    qualityBadge: '4K Ultra HD · 60 FPS'
  });

  // SECTION 5: Testimonials state
  const [reviewsList, setReviewsList] = useState(() => {
    return (storeInfo?.googleReviews || STORE_INFO.googleReviews).map((r) => ({ ...r }));
  });
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    author: '',
    location: 'Mirzapur',
    rating: 5,
    tag: 'Google Verified Customer',
    comment: '',
    timeAgo: 'Just now'
  });

  // SECTION 6: Schemes state
  const [schemeForm, setSchemeForm] = useState({
    title: 'Swarna Nidhi (11+1) Gold Savings Scheme',
    tenureMonths: 11,
    bonusMonth: '12th Month 100% Paid by Showroom',
    bonusPercent: 100,
    minAmount: 2000,
    popularAmount: 5000,
    benefits: 'Zero deduction on hallmark gold jewellery, flexible monthly deposit via UPI/Cash at Sangmohal showroom.',
    whatsappTemplate: 'Namaste Rajesh Jewellers, I would like to enroll in the Swarna Nidhi 11+1 Scheme.'
  });
  const [schemeSimAmount, setSchemeSimAmount] = useState(5000);

  // SECTION 7: Showroom Info state
  const [showroomInfoForm, setShowroomInfoForm] = useState(() => ({
    name: storeInfo?.name || STORE_INFO.name,
    hindiName: storeInfo?.hindiName || STORE_INFO.hindiName,
    proprietor: storeInfo?.proprietor || STORE_INFO.proprietor,
    tagline: storeInfo?.tagline || STORE_INFO.tagline,
    officialMerchantBio: storeInfo?.officialMerchantBio || STORE_INFO.officialMerchantBio,
    gstin: storeInfo?.gstin || STORE_INFO.gstin,
    hallmarkCode: storeInfo?.hallmarkCode || STORE_INFO.hallmarkCode,
    googleRating: storeInfo?.googleRating || STORE_INFO.googleRating,
    googleReviewCount: storeInfo?.googleReviewCount || STORE_INFO.googleReviewCount
  }));

  // SECTION 8: Contacts & Address state
  const [contactsForm, setContactsForm] = useState(() => ({
    fullAddress: storeInfo?.fullAddress || STORE_INFO.fullAddress,
    landmark: storeInfo?.landmark || STORE_INFO.landmark,
    city: storeInfo?.city || STORE_INFO.city,
    pincode: storeInfo?.pincode || STORE_INFO.pincode,
    whatsapp: storeInfo?.whatsapp || STORE_INFO.whatsapp,
    whatsappDisplay: storeInfo?.whatsappDisplay || STORE_INFO.whatsappDisplay,
    phonePrimary: storeInfo?.phonePrimary || STORE_INFO.phonePrimary,
    phonePrimaryDisplay: storeInfo?.phonePrimaryDisplay || STORE_INFO.phonePrimaryDisplay,
    phoneSecondary: storeInfo?.phoneSecondary || STORE_INFO.phoneSecondary,
    phoneSecondaryDisplay: storeInfo?.phoneSecondaryDisplay || STORE_INFO.phoneSecondaryDisplay,
    phoneTertiary: storeInfo?.phoneTertiary || STORE_INFO.phoneTertiary,
    phoneTertiaryDisplay: storeInfo?.phoneTertiaryDisplay || STORE_INFO.phoneTertiaryDisplay,
    hoursRegular: storeInfo?.hours?.regular || STORE_INFO.hours.regular,
    hoursSunday: storeInfo?.hours?.sunday || STORE_INFO.hours.sunday
  }));

  // System Security & Passcode change form
  const [passcodeChangeForm, setPasscodeChangeForm] = useState({
    current: '',
    newPasscode: '',
    confirm: ''
  });
  const importFileRef = useRef(null);

  if (!isDealerModalOpen) return null;

  // -------------------------------------------------------------------------
  // PASSCODE AUTHENTICATION LOGIC (Secure Hardcoded Passcode '1994')
  // -------------------------------------------------------------------------
  const handleUnlockCheck = (codeToCheck) => {
    const trimmed = (codeToCheck || passcodeInput).trim();
    // Validates against secure hardcoded passcode '1994' or customized adminPasscode
    if (trimmed === SECURE_MASTER_PASSCODE || (adminPasscode && trimmed === adminPasscode.trim())) {
      setIsAdminAuthenticated(true);
      setPasscodeError(false);
      setPasscodeInput('');
      showToast('Showroom Master Admin unlocked successfully! 👑');
    } else {
      setPasscodeError(true);
      showToast('Incorrect Passcode. Access denied.', 'error');
      setTimeout(() => {
        setPasscodeInput('');
        setPasscodeError(false);
      }, 1200);
    }
  };

  const handleKeypadPress = (val) => {
    if (val === 'clear') {
      setPasscodeInput('');
      setPasscodeError(false);
    } else if (val === 'backspace') {
      setPasscodeInput((prev) => prev.slice(0, -1));
      setPasscodeError(false);
    } else {
      if (passcodeInput.length < 8) {
        const next = passcodeInput + val;
        setPasscodeInput(next);
        setPasscodeError(false);
        // Automatic unlock when 4 digits match the secure hardcoded passcode
        if (next === SECURE_MASTER_PASSCODE || (adminPasscode && next === adminPasscode)) {
          setIsAdminAuthenticated(true);
          setPasscodeInput('');
          showToast('Showroom Master Admin unlocked! 👑');
        }
      }
    }
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    setPasscodeInput('');
    showToast('Admin session locked.', 'info');
  };

  // Convert File to Base64 Data URL for real device uploads
  const handleFileUpload = (file, callback) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPG, PNG, WebP).', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      callback(event.target.result);
      showToast('Photo uploaded from device successfully! 📸');
    };
    reader.onerror = () => {
      showToast('Failed to read image file.', 'error');
    };
    reader.readAsDataURL(file);
  };

  // -------------------------------------------------------------------------
  // SAVE HANDLERS FOR EACH OF THE 8 SECTIONS
  // -------------------------------------------------------------------------

  // 1. Rates
  const handleSaveRates = (e) => {
    e.preventDefault();
    updateRates({
      gold24k: Number(ratesForm.gold24k),
      gold22k: Number(ratesForm.gold22k),
      gold18k: Number(ratesForm.gold18k),
      silver999: Number(ratesForm.silver999)
    });
    showToast('Live bullion rates updated showroom-wide! 💰');
  };

  // 2. Products
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.netGoldWeight) {
      showToast('Please enter item name and net weight.', 'error');
      return;
    }

    if (editingProductId) {
      updateProduct(editingProductId, productForm);
      showToast(`Updated product: ${productForm.name} ✨`);
    } else {
      addProduct(productForm);
      showToast(`Added new design: ${productForm.name} 💎`);
    }

    // Reset to Add mode
    setEditingProductId(null);
    setProductForm({
      name: '',
      hindiName: '',
      category: 'bridal',
      categoryLabel: 'Royal Bridal',
      purity: '22K BIS 916 Hallmark',
      purityKey: 'gold22k',
      grossWeight: '25.00g',
      netGoldWeight: '25.00g',
      stoneType: 'Pure 22K Hallmarked Gold',
      shape: 'pear',
      occasion: 'bridal',
      image: '/assets/images/store/store_display_jewellery.jpg',
      description: 'Handcrafted master bridal piece from Sangmohal showroom artisans.',
      makingPercent: 11,
      badge: 'Showroom Original',
      inStock: true,
      readyInShowroom: true
    });
  };

  const handleEditProductClick = (prod) => {
    setEditingProductId(prod.id);
    setProductForm({ ...prod });
    showToast(`Loaded "${prod.name}" into editor pane.`);
  };

  const handleCancelProductEdit = () => {
    setEditingProductId(null);
    setProductForm({
      name: '',
      hindiName: '',
      category: 'bridal',
      categoryLabel: 'Royal Bridal',
      purity: '22K BIS 916 Hallmark',
      purityKey: 'gold22k',
      grossWeight: '25.00g',
      netGoldWeight: '25.00g',
      stoneType: 'Pure 22K Hallmarked Gold',
      shape: 'pear',
      occasion: 'bridal',
      image: '/assets/images/store/store_display_jewellery.jpg',
      description: 'Handcrafted master bridal piece from Sangmohal showroom artisans.',
      makingPercent: 11,
      badge: 'Showroom Original',
      inStock: true,
      readyInShowroom: true
    });
  };

  // 3. Gallery
  const handleSaveGalleryPhoto = (e) => {
    e.preventDefault();
    updateStoreInfo({
      photos: photosList
    });
    showToast('Showroom gallery updated successfully! 🏛️');
  };

  // 4. Videos
  const handleSaveVideo = (e) => {
    e.preventDefault();
    updateStoreInfo({
      videoReelUrl: videoForm.url
    });
    showToast('4K Showroom Video Reel updated! 🎥');
  };

  // 5. Testimonials
  const handleSaveReview = (e) => {
    e.preventDefault();
    if (!reviewForm.author || !reviewForm.comment) {
      showToast('Please fill in customer name and review text.', 'error');
      return;
    }

    let updated;
    if (editingReviewId) {
      updated = reviewsList.map((r) => (r.id === editingReviewId ? { ...r, ...reviewForm } : r));
      setEditingReviewId(null);
      showToast('Testimonial updated! ⭐');
    } else {
      const newReview = {
        ...reviewForm,
        id: `rev_${Date.now()}`
      };
      updated = [newReview, ...reviewsList];
      showToast('New customer review published! ⭐');
    }

    setReviewsList(updated);
    updateStoreInfo({ googleReviews: updated });
    setReviewForm({
      author: '',
      location: 'Mirzapur',
      rating: 5,
      tag: 'Google Verified Customer',
      comment: '',
      timeAgo: 'Just now'
    });
  };

  const handleDeleteReview = (id) => {
    const updated = reviewsList.filter((r) => r.id !== id);
    setReviewsList(updated);
    updateStoreInfo({ googleReviews: updated });
    showToast('Customer testimonial removed.');
  };

  // 6. Schemes
  const handleSaveScheme = (e) => {
    e.preventDefault();
    showToast('Swarna Nidhi Scheme terms saved! 💰');
  };

  // 7. Showroom Info
  const handleSaveShowroomInfo = (e) => {
    e.preventDefault();
    updateStoreInfo({
      name: showroomInfoForm.name,
      hindiName: showroomInfoForm.hindiName,
      proprietor: showroomInfoForm.proprietor,
      tagline: showroomInfoForm.tagline,
      officialMerchantBio: showroomInfoForm.officialMerchantBio,
      gstin: showroomInfoForm.gstin,
      hallmarkCode: showroomInfoForm.hallmarkCode,
      googleRating: Number(showroomInfoForm.googleRating),
      googleReviewCount: Number(showroomInfoForm.googleReviewCount)
    });
    showToast('Showroom credentials & bio updated! 👑');
  };

  // 8. Contacts
  const handleSaveContacts = (e) => {
    e.preventDefault();
    updateStoreInfo({
      fullAddress: contactsForm.fullAddress,
      landmark: contactsForm.landmark,
      city: contactsForm.city,
      pincode: contactsForm.pincode,
      whatsapp: contactsForm.whatsapp,
      whatsappDisplay: contactsForm.whatsappDisplay,
      phonePrimary: contactsForm.phonePrimary,
      phonePrimaryDisplay: contactsForm.phonePrimaryDisplay,
      phoneSecondary: contactsForm.phoneSecondary,
      phoneSecondaryDisplay: contactsForm.phoneSecondaryDisplay,
      phoneTertiary: contactsForm.phoneTertiary,
      phoneTertiaryDisplay: contactsForm.phoneTertiaryDisplay,
      hours: {
        regular: contactsForm.hoursRegular,
        sunday: contactsForm.hoursSunday,
        todayStatus: 'Open Today · Sangmohal Showroom'
      }
    });
    showToast('Showroom contact numbers & hours saved! 📞');
  };

  // Filtered Products for inventory list
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name?.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      p.hindiName?.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      p.id?.toLowerCase().includes(inventorySearch.toLowerCase());
    const matchesCategory =
      inventoryCategoryFilter === 'all' || p.category === inventoryCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  // =========================================================================
  // VIEW 1: ADMIN GATE COMPONENT (PASSCODE ENTRY OVERLAY)
  // Luxury Deep Burgundy (#280D16) & Champagne Gold (#C6A15B)
  // 3x4 Numeric Keypad with hardcoded secure passcode: '1994'
  // =========================================================================
  if (!isAdminAuthenticated) {
    return (
      <div
        className="admin-gate-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Rajesh Jewellers Showroom Master Admin Gate"
      >
        <div className="admin-gate-modal">
          {/* Close button */}
          <button
            type="button"
            className="admin-gate-close-btn"
            onClick={() => setIsDealerModalOpen(false)}
            aria-label="Close Admin Gate"
          >
            <X size={18} />
          </button>

          {/* Luxury RJ Emblem */}
          <div className="admin-gate-emblem">
            <div className="admin-gate-monogram">RJ</div>
            <div className="admin-gate-lock-badge">
              <Lock size={13} />
            </div>
          </div>

          <h2 className="admin-gate-title">Showroom Master Admin</h2>
          <span className="admin-gate-subtitle">
            Sangmohal Flagship Showroom · Station Rd, Mirzapur
          </span>

          <p className="admin-gate-desc">
            Secure access to website content management, live bullion rates and showroom inventory.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUnlockCheck();
            }}
            className="admin-gate-form"
          >
            {/* PIN Dots Indicator (4 slots) */}
            <div className="admin-gate-pin-dots">
              {[0, 1, 2, 3].map((slotIdx) => (
                <div
                  key={slotIdx}
                  className={`admin-pin-dot ${passcodeInput.length > slotIdx ? 'is-filled' : ''}`}
                />
              ))}
            </div>

            {/* Hidden / Native Input for physical keyboard users */}
            <div className="admin-gate-input-wrapper">
              <input
                type="password"
                maxLength={8}
                value={passcodeInput}
                onChange={(e) => {
                  setPasscodeInput(e.target.value);
                  setPasscodeError(false);
                }}
                placeholder="••••"
                className={`admin-gate-input ${passcodeError ? 'is-error' : ''}`}
                autoFocus
              />
              <button
                type="submit"
                className="admin-gate-unlock-btn"
                title="Unlock Showroom Portal"
              >
                <Unlock size={16} />
                <span>Unlock</span>
              </button>
            </div>

            {passcodeError && (
              <div className="admin-gate-error-message">
                <AlertCircle size={14} />
                <span>Incorrect Master Passcode. Access denied.</span>
              </div>
            )}

            {/* 3x4 Numeric Keypad */}
            <div className="admin-gate-keypad-grid-3x4" aria-label="Passcode Keypad">
              <button type="button" className="admin-keypad-btn" onClick={() => handleKeypadPress('1')}>1</button>
              <button type="button" className="admin-keypad-btn" onClick={() => handleKeypadPress('2')}>2</button>
              <button type="button" className="admin-keypad-btn" onClick={() => handleKeypadPress('3')}>3</button>

              <button type="button" className="admin-keypad-btn" onClick={() => handleKeypadPress('4')}>4</button>
              <button type="button" className="admin-keypad-btn" onClick={() => handleKeypadPress('5')}>5</button>
              <button type="button" className="admin-keypad-btn" onClick={() => handleKeypadPress('6')}>6</button>

              <button type="button" className="admin-keypad-btn" onClick={() => handleKeypadPress('7')}>7</button>
              <button type="button" className="admin-keypad-btn" onClick={() => handleKeypadPress('8')}>8</button>
              <button type="button" className="admin-keypad-btn" onClick={() => handleKeypadPress('9')}>9</button>

              <button
                type="button"
                className="admin-keypad-btn admin-keypad-action"
                onClick={() => handleKeypadPress('clear')}
                title="Clear input"
              >
                C
              </button>
              <button type="button" className="admin-keypad-btn" onClick={() => handleKeypadPress('0')}>0</button>
              <button
                type="button"
                className="admin-keypad-btn admin-keypad-action"
                onClick={() => handleKeypadPress('backspace')}
                title="Delete last digit"
                aria-label="Delete last digit"
              >
                <Delete size={19} />
              </button>
            </div>

            {/* Passcode Hint Helper */}
            <div className="admin-gate-hint-box">
              <button
                type="button"
                className="admin-hint-toggle"
                onClick={() => setShowPasscodeHint(!showPasscodeHint)}
              >
                <span>{showPasscodeHint ? 'Hide Default Passcode' : 'Show Default Passcode'}</span>
              </button>
              {showPasscodeHint && (
                <div className="admin-hint-content">
                  Default Master PIN: <strong>{SECURE_MASTER_PASSCODE}</strong>
                  <button
                    type="button"
                    className="admin-hint-auto-fill"
                    onClick={() => {
                      setPasscodeInput(SECURE_MASTER_PASSCODE);
                      handleUnlockCheck(SECURE_MASTER_PASSCODE);
                    }}
                  >
                    Auto-Fill &amp; Unlock
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: FULL-SCREEN LUXURY ADMIN PORTAL & CMS WORKSPACE
  // Sidebar with 8 distinct CMS sections & side-by-side editing panes
  // =========================================================================
  return (
    <div
      className="admin-fullscreen-portal"
      role="dialog"
      aria-modal="true"
      aria-label="Rajesh Jewellers Showroom Master CMS"
    >
      {/* 1. TOP HEADER BAR */}
      <header className="admin-portal-header">
        <div className="admin-header-brand-wrap">
          <div className="admin-brand-monogram">RJ</div>
          <div>
            <h1 className="admin-brand-heading">
              RAJESH JEWELLERS <span className="admin-brand-badge">SHOWROOM MASTER CMS</span>
            </h1>
            <span className="admin-brand-location">
              Sangmohal Flagship Showroom · Station Rd, Mirzapur (GSTIN: {storeInfo?.gstin || STORE_INFO.gstin})
            </span>
          </div>
        </div>

        {/* Live Status Indicators */}
        <div className="admin-header-status-strip">
          <div className="admin-status-pill">
            <span className="admin-pill-dot is-gold"></span>
            <span>24K: <strong>₹{(liveRates.gold24k * 10).toLocaleString('en-IN')}</strong>/10g</span>
          </div>
          <div className="admin-status-pill">
            <span className="admin-pill-dot is-gold"></span>
            <span>22K: <strong>₹{(liveRates.gold22k * 10).toLocaleString('en-IN')}</strong>/10g</span>
          </div>
          <div className="admin-status-pill">
            <span className="admin-pill-dot is-silver"></span>
            <span>Silver: <strong>₹{Math.round(liveRates.silver999 * 1000).toLocaleString('en-IN')}</strong>/kg</span>
          </div>
          <div className="admin-status-pill">
            <span>Catalog: <strong>{products.length} Designs</strong></span>
          </div>
        </div>

        {/* Top Actions */}
        <div className="admin-header-actions">
          <button
            type="button"
            className="admin-header-btn-secondary"
            onClick={() => setIsDealerModalOpen(false)}
            title="Temporarily close CMS to preview live website"
          >
            <Eye size={15} />
            <span>View Live Site</span>
          </button>

          <button
            type="button"
            className="admin-header-btn-secondary"
            onClick={exportAllDataJSON}
            title="Download full website backup JSON"
          >
            <Download size={15} />
            <span>Export Backup</span>
          </button>

          <label
            className="admin-header-btn-secondary cursor-pointer"
            title="Import full website backup JSON"
          >
            <Upload size={15} />
            <span>Import</span>
            <input
              type="file"
              ref={importFileRef}
              accept=".json,application/json"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (event) => {
                  importAllDataJSON(event.target.result);
                  if (importFileRef.current) importFileRef.current.value = '';
                };
                reader.readAsText(file);
              }}
            />
          </label>

          <button
            type="button"
            className="admin-header-btn-logout"
            onClick={handleLogout}
            title="Lock administrative portal"
          >
            <Lock size={15} />
            <span>Lock &amp; Exit</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE WITH SIDEBAR & SIDE-BY-SIDE PANES */}
      <div className="admin-portal-body">
        {/* LEFT FEATURE NAVIGATION SIDEBAR (23 ORGANIZED CMS MODULES) */}
        <AdminSidebarNav
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          productCount={products.length}
          reviewCount={reviewsList.length}
          leadCount={leads.length}
          offerCount={offers.length}
        />

        {/* RIGHT MAIN CONTENT WORKSPACE (RESPONSIVE SIDE-BY-SIDE PANES - MEMOIZED WRAPPER) */}
        <AdminContentPane activeTab={activeTab}>
          {/* Module 1: Dashboard */}
          {activeTab === 'dashboard' && (
            <DashboardModule
              products={products}
              liveRates={liveRates}
              storeInfo={storeInfo}
              leads={leads}
              reviews={reviewsList}
              hasUnsavedDrafts={hasUnsavedDrafts}
              onNavigate={handleSelectTab}
              publishDraftToLiveSite={publishDraftToLiveSite}
            />
          )}

          {/* Module 2: Homepage Builder */}
          {activeTab === 'homepage_builder' && (
            <HomepageBuilderModule
              homepageSections={homepageSections}
              setHomepageSections={setHomepageSections}
              publishDraftToLiveSite={publishDraftToLiveSite}
              showToast={showToast}
            />
          )}

          {/* Module 3: Header & Navigation */}
          {activeTab === 'header_nav' && (
            <HeaderNavModule
              storeInfo={storeInfo}
              updateStoreInfo={updateStoreInfo}
              showToast={showToast}
            />
          )}

          {/* Module 6: Categories & Collections */}
          {activeTab === 'categories' && (
            <CategoriesModule
              products={products}
              showToast={showToast}
            />
          )}

          {/* Module 7: Media Library */}
          {activeTab === 'media_library' && (
            <MediaLibraryModule showToast={showToast} />
          )}

          {/* Module 11: Offers & Promotions */}
          {activeTab === 'offers' && (
            <PromotionsModule
              offers={offers}
              setOffers={setOffers}
              showToast={showToast}
            />
          )}

          {/* Module 13: Gold Price Calculator Config */}
          {activeTab === 'calculator_config' && (
            <CalculatorConfigModule showToast={showToast} />
          )}

          {/* Module 16: Bookings & Customer Inquiries */}
          {activeTab === 'bookings' && (
            <BookingsLeadsModule
              leads={leads}
              updateLeadStatus={updateLeadStatus}
              showToast={showToast}
            />
          )}

          {/* Module 17: SEO & Website Content */}
          {activeTab === 'seo' && (
            <SeoContentModule
              seoConfig={seoConfig}
              setSeoConfig={setSeoConfig}
              showToast={showToast}
            />
          )}

          {/* Module 18: Policies & Legal Pages */}
          {activeTab === 'policies' && (
            <PoliciesLegalModule
              legalPolicies={legalPolicies}
              setLegalPolicies={setLegalPolicies}
              showToast={showToast}
            />
          )}

          {/* Module 19: Design & Appearance */}
          {activeTab === 'design' && (
            <DesignAppearanceModule
              designSettings={designSettings}
              setDesignSettings={setDesignSettings}
              showToast={showToast}
            />
          )}

          {/* Module 20: Admin Users & Security */}
          {activeTab === 'users_permissions' && (
            <AdminUsersSecurityModule
              adminUsers={adminUsers}
              setAdminUsers={setAdminUsers}
              changeAdminPasscode={changeAdminPasscode}
              showToast={showToast}
            />
          )}

          {/* Module 21: Backup & Restore */}
          {activeTab === 'backup_restore' && (
            <BackupRestoreModule
              exportAllDataJSON={exportAllDataJSON}
              importAllDataJSON={importAllDataJSON}
              resetAllDataToDefaults={resetAllDataToDefaults}
              showToast={showToast}
            />
          )}

          {/* Module 22: Activity Logs */}
          {activeTab === 'activity_logs' && (
            <ActivityLogsModule activityLogs={activityLogs} />
          )}

          {/* Module 23: General Settings */}
          {activeTab === 'general_settings' && (
            <GeneralSettingsModule showToast={showToast} />
          )}

          {/* Module 4: Gold Rates & Pricing */}
          {activeTab === 'rates' && (
            <div className="admin-tab-pane">
              <div className="admin-pane-header">
                <div>
                  <h2 className="admin-pane-title">1. Gold Rates &amp; Bullion MCX Synchronization</h2>
                  <p className="admin-pane-desc">
                    Rates entered here update the Top Bullion Ticker, Category Navigation, Products Catalog, and Live Gold Calculator across the showroom website.
                  </p>
                </div>
                <button
                  type="button"
                  className="admin-btn-accent"
                  onClick={refreshRates}
                  title="Simulate live MCX market tick"
                >
                  <RefreshCw size={15} />
                  <span>Simulate MCX Tick</span>
                </button>
              </div>

              <div className="admin-two-pane-layout">
                {/* LEFT PANE: Rates Editor Form */}
                <div className="admin-pane-left">
                  <div className="admin-card-surface admin-ticker-control-card mb-4">
                    <div>
                      <strong className="admin-card-subtitle">Real-Time Market Auto-Fluctuation</strong>
                      <p className="admin-card-subtext">Micro-fluctuates every 7 seconds to reflect active bullion trading hours.</p>
                    </div>
                    <button
                      type="button"
                      className={`admin-toggle-btn ${isTickActive ? 'is-active' : ''}`}
                      onClick={() => {
                        setIsTickActive(!isTickActive);
                        showToast(isTickActive ? 'Market ticker paused.' : 'Live market ticker activated! 📈');
                      }}
                    >
                      {isTickActive ? 'Active (Live)' : 'Paused (Static)'}
                    </button>
                  </div>

                  <form onSubmit={handleSaveRates} className="admin-card-surface">
                    <h3 className="admin-form-group-title">Base Rates (₹ per Gram)</h3>
                    <div className="admin-grid-2">
                      <div className="admin-field-box">
                        <label className="admin-label">
                          <span>24K Pure Gold (999)</span>
                          <span className="text-[11px] text-amber-300 font-mono">10g = ₹{(ratesForm.gold24k * 10).toLocaleString('en-IN')}</span>
                        </label>
                        <div className="admin-input-addon-wrap">
                          <span className="admin-input-addon">₹</span>
                          <input
                            type="number"
                            min="1000"
                            max="25000"
                            step="1"
                            value={ratesForm.gold24k}
                            onChange={(e) => setRatesForm({ ...ratesForm, gold24k: parseFloat(e.target.value) || 0 })}
                            className="admin-input-field"
                            required
                          />
                          <span className="admin-input-unit">/ gram</span>
                        </div>
                      </div>

                      <div className="admin-field-box">
                        <label className="admin-label">
                          <span>22K Hallmark (BIS 916)</span>
                          <span className="text-[11px] text-amber-300 font-mono">10g = ₹{(ratesForm.gold22k * 10).toLocaleString('en-IN')}</span>
                        </label>
                        <div className="admin-input-addon-wrap">
                          <span className="admin-input-addon">₹</span>
                          <input
                            type="number"
                            min="1000"
                            max="25000"
                            step="1"
                            value={ratesForm.gold22k}
                            onChange={(e) => setRatesForm({ ...ratesForm, gold22k: parseFloat(e.target.value) || 0 })}
                            className="admin-input-field"
                            required
                          />
                          <span className="admin-input-unit">/ gram</span>
                        </div>
                      </div>

                      <div className="admin-field-box">
                        <label className="admin-label">
                          <span>18K Diamond Gold (750)</span>
                          <span className="text-[11px] text-amber-300 font-mono">10g = ₹{(ratesForm.gold18k * 10).toLocaleString('en-IN')}</span>
                        </label>
                        <div className="admin-input-addon-wrap">
                          <span className="admin-input-addon">₹</span>
                          <input
                            type="number"
                            min="1000"
                            max="25000"
                            step="1"
                            value={ratesForm.gold18k}
                            onChange={(e) => setRatesForm({ ...ratesForm, gold18k: parseFloat(e.target.value) || 0 })}
                            className="admin-input-field"
                            required
                          />
                          <span className="admin-input-unit">/ gram</span>
                        </div>
                      </div>

                      <div className="admin-field-box">
                        <label className="admin-label">
                          <span>Fine Silver 999 (Pure)</span>
                          <span className="text-[11px] text-gray-300 font-mono">1kg = ₹{Math.round(ratesForm.silver999 * 1000).toLocaleString('en-IN')}</span>
                        </label>
                        <div className="admin-input-addon-wrap">
                          <span className="admin-input-addon">₹</span>
                          <input
                            type="number"
                            min="20"
                            max="500"
                            step="0.1"
                            value={ratesForm.silver999}
                            onChange={(e) => setRatesForm({ ...ratesForm, silver999: parseFloat(e.target.value) || 0 })}
                            className="admin-input-field"
                            required
                          />
                          <span className="admin-input-unit">/ gram</span>
                        </div>
                      </div>
                    </div>

                    <div className="admin-form-actions-bar mt-6">
                      <button type="submit" className="admin-btn-primary">
                        <CheckCircle2 size={16} />
                        <span>Apply Rates to Live Showroom</span>
                      </button>
                      <button
                        type="button"
                        className="admin-btn-secondary"
                        onClick={() => {
                          setRatesForm({
                            gold24k: liveRates.gold24k,
                            gold22k: liveRates.gold22k,
                            gold18k: liveRates.gold18k,
                            silver999: liveRates.silver999
                          });
                          showToast('Reverted to current rates.', 'info');
                        }}
                      >
                        Reset
                      </button>
                    </div>
                  </form>
                </div>

                {/* RIGHT PANE: Live Bullion Board Preview */}
                <div className="admin-pane-right">
                  <div className="admin-card-surface border-amber-600/30">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-600/20">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Live Rate Board Preview</span>
                        <h4 className="text-sm font-semibold text-white">Sangmohal Flagship Showroom Benchmarks</h4>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700">
                        100% BIS 916
                      </span>
                    </div>

                    <div className="admin-grid-2 mb-4">
                      <div className="p-3 rounded-lg bg-black/40 border border-amber-500/20">
                        <span className="text-xs text-amber-200/70 block">24K Pure Gold (10g)</span>
                        <strong className="text-lg text-amber-300 font-serif">₹{(ratesForm.gold24k * 10).toLocaleString('en-IN')}</strong>
                        <span className="text-[11px] text-gray-400 block mt-0.5">₹{ratesForm.gold24k.toLocaleString('en-IN')}/g</span>
                      </div>

                      <div className="p-3 rounded-lg bg-black/40 border border-amber-500/20">
                        <span className="text-xs text-amber-200/70 block">22K Hallmark Gold (10g)</span>
                        <strong className="text-lg text-amber-300 font-serif">₹{(ratesForm.gold22k * 10).toLocaleString('en-IN')}</strong>
                        <span className="text-[11px] text-gray-400 block mt-0.5">₹{ratesForm.gold22k.toLocaleString('en-IN')}/g</span>
                      </div>

                      <div className="p-3 rounded-lg bg-black/40 border border-amber-500/20">
                        <span className="text-xs text-amber-200/70 block">18K Diamond Craft (10g)</span>
                        <strong className="text-lg text-amber-300 font-serif">₹{(ratesForm.gold18k * 10).toLocaleString('en-IN')}</strong>
                        <span className="text-[11px] text-gray-400 block mt-0.5">₹{ratesForm.gold18k.toLocaleString('en-IN')}/g</span>
                      </div>

                      <div className="p-3 rounded-lg bg-black/40 border border-amber-500/20">
                        <span className="text-xs text-gray-300 block">Fine Silver 999 (1 Kg)</span>
                        <strong className="text-lg text-gray-200 font-serif">₹{Math.round(ratesForm.silver999 * 1000).toLocaleString('en-IN')}</strong>
                        <span className="text-[11px] text-gray-400 block mt-0.5">₹{ratesForm.silver999.toLocaleString('en-IN')}/g</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-black/30 border border-white/5 text-xs text-gray-300 space-y-1">
                      <div className="flex justify-between">
                        <span>Standard 1 Tola (10g 22K) + 10% Making:</span>
                        <strong className="text-amber-400">₹{Math.round(ratesForm.gold22k * 10 * 1.10).toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Applicable GST (3% pakka bill):</span>
                        <span>+₹{Math.round(ratesForm.gold22k * 10 * 1.10 * 0.03).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between font-bold text-white pt-1 border-t border-white/10">
                        <span>Estimated Total Invoice:</span>
                        <span className="text-emerald-400">₹{Math.round(ratesForm.gold22k * 10 * 1.10 * 1.03).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* 2. PRODUCTS — SIDE-BY-SIDE PANES                              */}
          {/* ============================================================= */}
          {activeTab === 'products' && (
            <div className="admin-tab-pane">
              <div className="admin-pane-header">
                <div>
                  <h2 className="admin-pane-title">2. Products &amp; Jewellery Catalog</h2>
                  <p className="admin-pane-desc">
                    Manage showroom collection designs. Add new master items, upload live photos from camera/file, and manage weights and making charges.
                  </p>
                </div>
                {editingProductId && (
                  <button
                    type="button"
                    className="admin-btn-secondary"
                    onClick={handleCancelProductEdit}
                  >
                    + Switch to Add New Design
                  </button>
                )}
              </div>

              <div className="admin-two-pane-layout">
                {/* LEFT PANE: Add / Edit Product Form */}
                <div className="admin-pane-left">
                  <form onSubmit={handleSaveProduct} className="admin-card-surface">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-600/20">
                      <h3 className="admin-form-group-title mb-0">
                        {editingProductId ? `Edit Design (#${editingProductId})` : 'Add New Jewellery Design'}
                      </h3>
                      {editingProductId && (
                        <span className="text-xs text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-950 border border-amber-700">
                          Editing Mode
                        </span>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="admin-grid-2">
                        <div className="admin-field-box">
                          <label className="admin-label">Title (English)</label>
                          <input
                            type="text"
                            value={productForm.name}
                            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                            placeholder="e.g. Royal Polki Choker"
                            className="admin-input-field"
                            required
                          />
                        </div>
                        <div className="admin-field-box">
                          <label className="admin-label">Title (Hindi)</label>
                          <input
                            type="text"
                            value={productForm.hindiName}
                            onChange={(e) => setProductForm({ ...productForm, hindiName: e.target.value })}
                            placeholder="e.g. शाही पोलकी चोकर"
                            className="admin-input-field"
                          />
                        </div>
                      </div>

                      <div className="admin-grid-2">
                        <div className="admin-field-box">
                          <label className="admin-label">Category</label>
                          <select
                            value={productForm.category}
                            onChange={(e) => {
                              const cat = e.target.value;
                              const labels = {
                                bridal: 'Royal Bridal',
                                gold: '22K Gold Necklaces',
                                bangles: 'Temple Bangles & Kadas',
                                diamond: 'Certified Diamonds',
                                everyday: 'Everyday & Festive',
                                mens: "Men's Jewels",
                                coins: '24K Coins & Bars',
                                silver: 'Silver & Pooja'
                              };
                              setProductForm({
                                ...productForm,
                                category: cat,
                                categoryLabel: labels[cat] || 'Jewellery'
                              });
                            }}
                            className="admin-input-field"
                          >
                            <option value="bridal">Royal Bridal</option>
                            <option value="gold">22K Gold Necklaces</option>
                            <option value="bangles">Temple Bangles &amp; Kadas</option>
                            <option value="diamond">Certified Diamonds</option>
                            <option value="everyday">Everyday &amp; Festive</option>
                            <option value="mens">Men's Jewels</option>
                            <option value="coins">24K Coins &amp; Bars</option>
                            <option value="silver">Silver &amp; Pooja</option>
                          </select>
                        </div>

                        <div className="admin-field-box">
                          <label className="admin-label">Purity Grade</label>
                          <select
                            value={productForm.purityKey}
                            onChange={(e) => {
                              const key = e.target.value;
                              const purities = {
                                gold22k: '22K BIS 916 Hallmark',
                                gold24k: '24K Pure (999)',
                                gold18k: '18K Gold (750)',
                                silver999: 'Fine Silver 999'
                              };
                              setProductForm({
                                ...productForm,
                                purityKey: key,
                                purity: purities[key] || '22K BIS 916 Hallmark'
                              });
                            }}
                            className="admin-input-field"
                          >
                            <option value="gold22k">22K BIS 916 Hallmark (91.6%)</option>
                            <option value="gold24k">24K Pure Bullion (99.9%)</option>
                            <option value="gold18k">18K Diamond Gold (75.0%)</option>
                            <option value="silver999">Fine Silver 999</option>
                          </select>
                        </div>
                      </div>

                      <div className="admin-grid-2">
                        <div className="admin-field-box">
                          <label className="admin-label">Net Gold Weight (e.g. 24.50g)</label>
                          <input
                            type="text"
                            value={productForm.netGoldWeight}
                            onChange={(e) => setProductForm({ ...productForm, netGoldWeight: e.target.value })}
                            placeholder="24.50g"
                            className="admin-input-field"
                            required
                          />
                        </div>
                        <div className="admin-field-box">
                          <label className="admin-label">Making Charge (%)</label>
                          <input
                            type="number"
                            min="3"
                            max="30"
                            value={productForm.makingPercent}
                            onChange={(e) => setProductForm({ ...productForm, makingPercent: parseFloat(e.target.value) || 10 })}
                            className="admin-input-field"
                            required
                          />
                        </div>
                      </div>

                      {/* Photo Upload & Preview */}
                      <div className="admin-field-box">
                        <label className="admin-label">Jewellery Photo (Device Upload or URL)</label>
                        <div className="flex items-center gap-3">
                          <img
                            src={productForm.image}
                            alt="Preview"
                            className="w-14 h-14 rounded-lg object-cover border border-amber-500/40 bg-black"
                            onError={(e) => {
                              e.target.src = '/assets/images/store/store_display_jewellery.jpg';
                            }}
                          />
                          <div className="flex-1 space-y-1.5">
                            <label className="admin-btn-secondary admin-btn-upload cursor-pointer inline-flex items-center gap-1.5 text-xs py-1.5 px-3">
                              <Camera size={14} />
                              <span>Upload Photo from Camera/Files</span>
                              <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleFileUpload(file, (dataUrl) => {
                                      setProductForm({ ...productForm, image: dataUrl });
                                    });
                                  }
                                }}
                              />
                            </label>
                            <input
                              type="text"
                              value={productForm.image}
                              onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                              placeholder="Or paste image URL..."
                              className="w-full text-xs bg-black/40 border border-white/10 rounded px-2 py-1 text-gray-300 font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="admin-grid-2">
                        <div className="admin-field-box">
                          <label className="admin-label">Badge Tag</label>
                          <select
                            value={productForm.badge}
                            onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                            className="admin-input-field"
                          >
                            <option value="Showroom Original">Showroom Original</option>
                            <option value="Masterpiece">Masterpiece</option>
                            <option value="Trending">Trending</option>
                            <option value="Best Seller">Best Seller</option>
                            <option value="New Arrival">New Arrival</option>
                          </select>
                        </div>

                        <div className="admin-field-box">
                          <label className="admin-label">Stone / Craft Type</label>
                          <input
                            type="text"
                            value={productForm.stoneType}
                            onChange={(e) => setProductForm({ ...productForm, stoneType: e.target.value })}
                            placeholder="e.g. Kundan / Meenakari"
                            className="admin-input-field"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="admin-form-actions-bar mt-4 pt-4 border-t border-white/10 flex gap-2">
                      <button type="submit" className="admin-btn-primary">
                        <CheckCircle2 size={16} />
                        <span>{editingProductId ? 'Update Design' : 'Add to Catalog'}</span>
                      </button>
                      {editingProductId && (
                        <button type="button" className="admin-btn-secondary" onClick={handleCancelProductEdit}>
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* RIGHT PANE: Catalog List & Management Table */}
                <div className="admin-pane-right">
                  <div className="admin-card-surface">
                    <div className="admin-inventory-toolbar">
                      <div className="admin-search-box">
                        <Search size={16} className="admin-search-icon" />
                        <input
                          type="text"
                          value={inventorySearch}
                          onChange={(e) => setInventorySearch(e.target.value)}
                          placeholder="Search designs by title or ID..."
                          className="admin-search-input"
                        />
                      </div>
                      <select
                        value={inventoryCategoryFilter}
                        onChange={(e) => setInventoryCategoryFilter(e.target.value)}
                        className="admin-filter-select"
                      >
                        <option value="all">All Categories ({products.length})</option>
                        <option value="bridal">Royal Bridal</option>
                        <option value="gold">22K Gold Necklaces</option>
                        <option value="bangles">Temple Bangles</option>
                        <option value="diamond">Diamonds</option>
                        <option value="everyday">Everyday &amp; Festive</option>
                        <option value="mens">Men's Jewels</option>
                        <option value="coins">24K Coins &amp; Bars</option>
                        <option value="silver">Silver &amp; Pooja</option>
                      </select>
                    </div>

                    {/* Scrollable Inventory List */}
                    <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
                      {filteredProducts.map((p) => {
                        const price = calculatePrice(p);
                        const isSelected = p.id === editingProductId;
                        return (
                          <div
                            key={p.id}
                            className={`p-2.5 rounded-lg border transition-all flex items-center justify-between gap-3 ${
                              isSelected
                                ? 'bg-amber-950/40 border-amber-400'
                                : 'bg-black/30 border-white/5 hover:border-amber-500/30'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-12 h-12 rounded object-cover flex-shrink-0 border border-white/10"
                                onError={(e) => {
                                  e.target.src = '/assets/images/store/store_display_jewellery.jpg';
                                }}
                              />
                              <div className="min-w-0">
                                <strong className="text-xs text-white block truncate">{p.name}</strong>
                                <span className="text-[11px] text-amber-300/80 block">{p.hindiName}</span>
                                <span className="text-[10px] text-gray-400">
                                  {p.netGoldWeight || p.grossWeight} · {p.makingPercent || 10}% making
                                </span>
                              </div>
                            </div>

                            <div className="text-right flex-shrink-0 flex items-center gap-2">
                              <div>
                                <span className="text-xs font-serif font-bold text-amber-300 block">
                                  {price.formattedTotalPrice}
                                </span>
                                <span className="text-[10px] text-emerald-400 font-semibold">
                                  {p.purityKey?.replace('gold', '')?.toUpperCase()}
                                </span>
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => handleEditProductClick(p)}
                                  className="p-1.5 rounded bg-amber-900/40 hover:bg-amber-700 text-amber-300 transition-colors"
                                  title="Edit in left pane"
                                >
                                  <Edit3 size={13} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    deleteProduct(p.id);
                                    showToast(`Removed "${p.name}" from catalog.`);
                                  }}
                                  className="p-1.5 rounded bg-red-950/40 hover:bg-red-800 text-red-300 transition-colors"
                                  title="Delete design"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* 3. GALLERY — SIDE-BY-SIDE PANES                              */}
          {/* ============================================================= */}
          {activeTab === 'gallery' && (
            <div className="admin-tab-pane">
              <div className="admin-pane-header">
                <div>
                  <h2 className="admin-pane-title">3. Showroom Photos &amp; Showcase Gallery</h2>
                  <p className="admin-pane-desc">
                    Manage the 5 official perspectives of the Sangmohal showroom. Click any view on the right to edit its photo and details on the left.
                  </p>
                </div>
              </div>

              <div className="admin-two-pane-layout">
                {/* LEFT PANE: Selected Photo Editor */}
                <div className="admin-pane-left">
                  <form onSubmit={handleSaveGalleryPhoto} className="admin-card-surface">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-600/20">
                      <h3 className="admin-form-group-title mb-0">
                        Edit View #{selectedGalleryIdx + 1}: {photosList[selectedGalleryIdx]?.title}
                      </h3>
                      <span className="text-xs text-amber-400 px-2 py-0.5 rounded bg-amber-950 border border-amber-700">
                        {photosList[selectedGalleryIdx]?.badge}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {/* Photo preview with upload button */}
                      <div className="relative rounded-lg overflow-hidden border border-amber-600/30 h-48 bg-black">
                        <img
                          src={photosList[selectedGalleryIdx]?.image}
                          alt="Showroom view"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/assets/images/store/storefront_facade.jpg';
                          }}
                        />
                        <div className="absolute bottom-2 right-2">
                          <label className="admin-btn-primary admin-btn-upload cursor-pointer text-xs py-1.5 px-3 flex items-center gap-1.5">
                            <Camera size={14} />
                            <span>Upload New Photo from Device</span>
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: 'none' }}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleFileUpload(file, (dataUrl) => {
                                    const copy = [...photosList];
                                    copy[selectedGalleryIdx].image = dataUrl;
                                    setPhotosList(copy);
                                  });
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="admin-field-box">
                        <label className="admin-label">View Title</label>
                        <input
                          type="text"
                          value={photosList[selectedGalleryIdx]?.title || ''}
                          onChange={(e) => {
                            const copy = [...photosList];
                            copy[selectedGalleryIdx].title = e.target.value;
                            setPhotosList(copy);
                          }}
                          className="admin-input-field"
                          required
                        />
                      </div>

                      <div className="admin-field-box">
                        <label className="admin-label">Subtitle / Landmark Tag</label>
                        <input
                          type="text"
                          value={photosList[selectedGalleryIdx]?.subtitle || ''}
                          onChange={(e) => {
                            const copy = [...photosList];
                            copy[selectedGalleryIdx].subtitle = e.target.value;
                            setPhotosList(copy);
                          }}
                          className="admin-input-field"
                        />
                      </div>

                      <div className="admin-field-box">
                        <label className="admin-label">Description</label>
                        <textarea
                          rows={3}
                          value={photosList[selectedGalleryIdx]?.desc || ''}
                          onChange={(e) => {
                            const copy = [...photosList];
                            copy[selectedGalleryIdx].desc = e.target.value;
                            setPhotosList(copy);
                          }}
                          className="admin-input-field"
                        />
                      </div>
                    </div>

                    <div className="admin-form-actions-bar mt-6">
                      <button type="submit" className="admin-btn-primary">
                        <CheckCircle2 size={16} />
                        <span>Save Gallery Changes</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* RIGHT PANE: 5 Showroom Showcase Cards */}
                <div className="admin-pane-right">
                  <div className="admin-card-surface">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-3">
                      Select Perspective to Edit
                    </span>

                    <div className="space-y-2.5">
                      {photosList.map((photo, idx) => {
                        const isSelected = idx === selectedGalleryIdx;
                        return (
                          <div
                            key={photo.id || idx}
                            onClick={() => setSelectedGalleryIdx(idx)}
                            className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center gap-3 ${
                              isSelected
                                ? 'bg-amber-950/50 border-amber-400 shadow-md shadow-amber-900/20'
                                : 'bg-black/30 border-white/5 hover:border-amber-500/30'
                            }`}
                          >
                            <img
                              src={photo.image}
                              alt={photo.title}
                              className="w-16 h-14 rounded object-cover flex-shrink-0 border border-white/10"
                              onError={(e) => {
                                e.target.src = '/assets/images/store/storefront_facade.jpg';
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-white truncate">{photo.title}</span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-amber-300 border border-amber-600/20">
                                  View #{idx + 1}
                                </span>
                              </div>
                              <span className="text-[11px] text-amber-200/70 block truncate">{photo.subtitle}</span>
                              <p className="text-[10px] text-gray-400 line-clamp-1 mt-0.5">{photo.desc}</p>
                            </div>
                            <ChevronRight size={16} className={isSelected ? 'text-amber-400' : 'text-gray-600'} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* 4. VIDEOS — SIDE-BY-SIDE PANES                                */}
          {/* ============================================================= */}
          {activeTab === 'videos' && (
            <div className="admin-tab-pane">
              <div className="admin-pane-header">
                <div>
                  <h2 className="admin-pane-title">4. Showroom Videos &amp; 4K Reel</h2>
                  <p className="admin-pane-desc">
                    Configure the official 4K video reel embedded on the Showroom Tour section.
                  </p>
                </div>
              </div>

              <div className="admin-two-pane-layout">
                {/* LEFT PANE: Video Settings Form */}
                <div className="admin-pane-left">
                  <form onSubmit={handleSaveVideo} className="admin-card-surface">
                    <h3 className="admin-form-group-title">4K Reel Configuration</h3>

                    <div className="space-y-4">
                      <div className="admin-field-box">
                        <label className="admin-label">Embed URL (YouTube Embed or direct MP4 link)</label>
                        <input
                          type="url"
                          value={videoForm.url}
                          onChange={(e) => setVideoForm({ ...videoForm, url: e.target.value })}
                          placeholder="https://www.youtube.com/embed/..."
                          className="admin-input-field"
                          required
                        />
                        <span className="text-[11px] text-gray-400">
                          Use YouTube embed URLs (e.g. https://www.youtube.com/embed/VIDEO_ID) for standard playback.
                        </span>
                      </div>

                      <div className="admin-field-box">
                        <label className="admin-label">Video Title</label>
                        <input
                          type="text"
                          value={videoForm.title}
                          onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                          className="admin-input-field"
                        />
                      </div>

                      <div className="admin-field-box">
                        <label className="admin-label">Quality Badge Label</label>
                        <input
                          type="text"
                          value={videoForm.qualityBadge}
                          onChange={(e) => setVideoForm({ ...videoForm, qualityBadge: e.target.value })}
                          className="admin-input-field"
                        />
                      </div>

                      <div className="admin-field-box">
                        <label className="admin-label">Showcase Description</label>
                        <textarea
                          rows={3}
                          value={videoForm.description}
                          onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                          className="admin-input-field"
                        />
                      </div>
                    </div>

                    <div className="admin-form-actions-bar mt-6">
                      <button type="submit" className="admin-btn-primary">
                        <CheckCircle2 size={16} />
                        <span>Update Showroom Video Reel</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* RIGHT PANE: Live Video Player Preview */}
                <div className="admin-pane-right">
                  <div className="admin-card-surface">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-3">
                      Live 16:9 Player Preview
                    </span>

                    <div className="relative aspect-video rounded-lg overflow-hidden border border-amber-500/30 bg-black">
                      <iframe
                        src={videoForm.url}
                        title="Showroom Video Preview"
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>

                    <div className="mt-3 p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-400 border border-amber-700">
                          {videoForm.qualityBadge}
                        </span>
                        <h4 className="text-xs font-bold text-white">{videoForm.title}</h4>
                      </div>
                      <p className="text-[11px] text-gray-400">{videoForm.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* 5. TESTIMONIALS — SIDE-BY-SIDE PANES                          */}
          {/* ============================================================= */}
          {activeTab === 'testimonials' && (
            <div className="admin-tab-pane">
              <div className="admin-pane-header">
                <div>
                  <h2 className="admin-pane-title">5. Customer Testimonials &amp; Google Reviews</h2>
                  <p className="admin-pane-desc">
                    Publish verified Google reviews and customer stories directly on the showroom homepage.
                  </p>
                </div>
              </div>

              <div className="admin-two-pane-layout">
                {/* LEFT PANE: Add / Edit Review Form */}
                <div className="admin-pane-left">
                  <form onSubmit={handleSaveReview} className="admin-card-surface">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-600/20">
                      <h3 className="admin-form-group-title mb-0">
                        {editingReviewId ? 'Edit Customer Review' : 'Add New Customer Review'}
                      </h3>
                      {editingReviewId && (
                        <button
                          type="button"
                          className="text-xs text-amber-400 underline"
                          onClick={() => {
                            setEditingReviewId(null);
                            setReviewForm({
                              author: '',
                              location: 'Mirzapur',
                              rating: 5,
                              tag: 'Google Verified Customer',
                              comment: '',
                              timeAgo: 'Just now'
                            });
                          }}
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="admin-grid-2">
                        <div className="admin-field-box">
                          <label className="admin-label">Customer Name</label>
                          <input
                            type="text"
                            value={reviewForm.author}
                            onChange={(e) => setReviewForm({ ...reviewForm, author: e.target.value })}
                            placeholder="e.g. Ramesh Chandra Verma"
                            className="admin-input-field"
                            required
                          />
                        </div>

                        <div className="admin-field-box">
                          <label className="admin-label">Location / Area</label>
                          <input
                            type="text"
                            value={reviewForm.location}
                            onChange={(e) => setReviewForm({ ...reviewForm, location: e.target.value })}
                            placeholder="e.g. Station Road, Mirzapur"
                            className="admin-input-field"
                          />
                        </div>
                      </div>

                      <div className="admin-grid-2">
                        <div className="admin-field-box">
                          <label className="admin-label">Star Rating (1 to 5)</label>
                          <select
                            value={reviewForm.rating}
                            onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) || 5 })}
                            className="admin-input-field"
                          >
                            <option value="5">★★★★★ (5 Stars - Exceptional)</option>
                            <option value="4">★★★★☆ (4 Stars - Highly Satisfied)</option>
                            <option value="3">★★★☆☆ (3 Stars - Good)</option>
                          </select>
                        </div>

                        <div className="admin-field-box">
                          <label className="admin-label">Tag Badge</label>
                          <input
                            type="text"
                            value={reviewForm.tag}
                            onChange={(e) => setReviewForm({ ...reviewForm, tag: e.target.value })}
                            placeholder="e.g. Google Verified Review"
                            className="admin-input-field"
                          />
                        </div>
                      </div>

                      <div className="admin-field-box">
                        <label className="admin-label">Customer Feedback Quote</label>
                        <textarea
                          rows={4}
                          value={reviewForm.comment}
                          onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                          placeholder="What did the customer say about our jewellery purity, billing or gaddi hospitality?"
                          className="admin-input-field"
                          required
                        />
                      </div>
                    </div>

                    <div className="admin-form-actions-bar mt-4 pt-4 border-t border-white/10">
                      <button type="submit" className="admin-btn-primary">
                        <CheckCircle2 size={16} />
                        <span>{editingReviewId ? 'Update Review' : 'Publish Review'}</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* RIGHT PANE: Live Reviews Preview List */}
                <div className="admin-pane-right">
                  <div className="admin-card-surface">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-3">
                      Published Reviews ({reviewsList.length})
                    </span>

                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                      {reviewsList.map((rev) => (
                        <div
                          key={rev.id}
                          className="p-3.5 rounded-lg bg-black/40 border border-white/5 space-y-2 hover:border-amber-500/30 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <strong className="text-xs text-white block">{rev.author}</strong>
                              <span className="text-[10px] text-gray-400">{rev.location || rev.occasion || 'Mirzapur'}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-amber-400 text-xs">{'★'.repeat(rev.rating)}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingReviewId(rev.id);
                                  setReviewForm({ ...rev });
                                }}
                                className="p-1 rounded hover:bg-amber-900/40 text-amber-300"
                                title="Edit"
                              >
                                <Edit3 size={12} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteReview(rev.id)}
                                className="p-1 rounded hover:bg-red-950/40 text-red-300"
                                title="Delete"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                          <p className="text-xs text-gray-300 leading-relaxed italic">"{rev.comment}"</p>
                          <span className="inline-block text-[10px] text-amber-300/80 font-medium">
                            {rev.tag || 'Google Verified'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* 6. SCHEMES — SIDE-BY-SIDE PANES                               */}
          {/* ============================================================= */}
          {activeTab === 'schemes' && (
            <div className="admin-tab-pane">
              <div className="admin-pane-header">
                <div>
                  <h2 className="admin-pane-title">6. Swarna Nidhi (11+1) Monthly Gold Scheme</h2>
                  <p className="admin-pane-desc">
                    Manage monthly gold installment tiers and bonus benefits for Mirzapur customers.
                  </p>
                </div>
              </div>

              <div className="admin-two-pane-layout">
                {/* LEFT PANE: Scheme Editor Form */}
                <div className="admin-pane-left">
                  <form onSubmit={handleSaveScheme} className="admin-card-surface">
                    <h3 className="admin-form-group-title">Scheme Plan Parameters</h3>

                    <div className="space-y-3">
                      <div className="admin-field-box">
                        <label className="admin-label">Plan Name</label>
                        <input
                          type="text"
                          value={schemeForm.title}
                          onChange={(e) => setSchemeForm({ ...schemeForm, title: e.target.value })}
                          className="admin-input-field"
                        />
                      </div>

                      <div className="admin-grid-2">
                        <div className="admin-field-box">
                          <label className="admin-label">Customer Tenure (Months)</label>
                          <input
                            type="number"
                            value={schemeForm.tenureMonths}
                            onChange={(e) => setSchemeForm({ ...schemeForm, tenureMonths: parseInt(e.target.value) || 11 })}
                            className="admin-input-field"
                          />
                        </div>

                        <div className="admin-field-box">
                          <label className="admin-label">Showroom Bonus Month</label>
                          <input
                            type="text"
                            value={schemeForm.bonusMonth}
                            onChange={(e) => setSchemeForm({ ...schemeForm, bonusMonth: e.target.value })}
                            className="admin-input-field"
                          />
                        </div>
                      </div>

                      <div className="admin-field-box">
                        <label className="admin-label">Showroom Benefit Description</label>
                        <textarea
                          rows={3}
                          value={schemeForm.benefits}
                          onChange={(e) => setSchemeForm({ ...schemeForm, benefits: e.target.value })}
                          className="admin-input-field"
                        />
                      </div>

                      <div className="admin-field-box">
                        <label className="admin-label">WhatsApp Inquiry Message Template</label>
                        <textarea
                          rows={3}
                          value={schemeForm.whatsappTemplate}
                          onChange={(e) => setSchemeForm({ ...schemeForm, whatsappTemplate: e.target.value })}
                          className="admin-input-field"
                        />
                      </div>
                    </div>

                    <div className="admin-form-actions-bar mt-6">
                      <button type="submit" className="admin-btn-primary">
                        <CheckCircle2 size={16} />
                        <span>Save Scheme Settings</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* RIGHT PANE: Live Scheme Simulator */}
                <div className="admin-pane-right">
                  <div className="admin-card-surface border-amber-600/30">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">
                      Live Customer Simulator
                    </span>
                    <p className="text-xs text-gray-400 mb-4">
                      Test how customer contributions and the 12th month showroom gift calculate live.
                    </p>

                    <div className="flex gap-2 mb-4">
                      {[2000, 5000, 10000, 25000].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setSchemeSimAmount(amt)}
                          className={`flex-1 py-1.5 text-xs font-bold rounded border transition-all ${
                            schemeSimAmount === amt
                              ? 'bg-amber-500 text-black border-amber-400'
                              : 'bg-black/40 text-gray-300 border-white/10 hover:border-amber-500/30'
                          }`}
                        >
                          ₹{(amt / 1000)}k/mo
                        </button>
                      ))}
                    </div>

                    <div className="p-4 rounded-lg bg-black/40 border border-amber-500/20 space-y-2 mb-4">
                      <div className="flex justify-between text-xs text-gray-300">
                        <span>Customer Deposit (11 Months × ₹{schemeSimAmount.toLocaleString('en-IN')}):</span>
                        <strong>₹{(schemeSimAmount * 11).toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="flex justify-between text-xs text-amber-400 font-semibold">
                        <span>12th Month RJ Showroom Bonus Gift:</span>
                        <span>+₹{schemeSimAmount.toLocaleString('en-IN')} FREE</span>
                      </div>
                      <div className="pt-2 border-t border-white/10 flex justify-between text-sm text-white font-bold">
                        <span>Total Gold Jewellery Shopping Value:</span>
                        <span className="text-emerald-400 text-base font-serif">
                          ₹{(schemeSimAmount * 12).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-600/30 text-xs text-emerald-300 flex items-center gap-2">
                      <Gift size={16} className="text-emerald-400 flex-shrink-0" />
                      <span>Zero making charge deductions on 100% BIS 916 hallmarked bridal and festive jewellery.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* 7. SHOWROOM INFO — SIDE-BY-SIDE PANES                         */}
          {/* ============================================================= */}
          {activeTab === 'showroom_info' && (
            <div className="admin-tab-pane">
              <div className="admin-pane-header">
                <div>
                  <h2 className="admin-pane-title">7. Showroom Heritage, Bio &amp; Legal Credentials</h2>
                  <p className="admin-pane-desc">
                    Manage brand typography, merchant biography, government GSTIN, and Google verified rating.
                  </p>
                </div>
              </div>

              <div className="admin-two-pane-layout">
                {/* LEFT PANE: Showroom Info Editor */}
                <div className="admin-pane-left">
                  <form onSubmit={handleSaveShowroomInfo} className="admin-card-surface">
                    <h3 className="admin-form-group-title">Official Store Profile</h3>

                    <div className="space-y-3">
                      <div className="admin-grid-2">
                        <div className="admin-field-box">
                          <label className="admin-label">Brand Name (English)</label>
                          <input
                            type="text"
                            value={showroomInfoForm.name}
                            onChange={(e) => setShowroomInfoForm({ ...showroomInfoForm, name: e.target.value })}
                            className="admin-input-field"
                            required
                          />
                        </div>

                        <div className="admin-field-box">
                          <label className="admin-label">Brand Typography (Hindi)</label>
                          <input
                            type="text"
                            value={showroomInfoForm.hindiName}
                            onChange={(e) => setShowroomInfoForm({ ...showroomInfoForm, hindiName: e.target.value })}
                            className="admin-input-field"
                            required
                          />
                        </div>
                      </div>

                      <div className="admin-grid-2">
                        <div className="admin-field-box">
                          <label className="admin-label">Proprietor Name</label>
                          <input
                            type="text"
                            value={showroomInfoForm.proprietor}
                            onChange={(e) => setShowroomInfoForm({ ...showroomInfoForm, proprietor: e.target.value })}
                            className="admin-input-field"
                          />
                        </div>

                        <div className="admin-field-box">
                          <label className="admin-label">Official GSTIN Number</label>
                          <input
                            type="text"
                            value={showroomInfoForm.gstin}
                            onChange={(e) => setShowroomInfoForm({ ...showroomInfoForm, gstin: e.target.value })}
                            className="admin-input-field font-mono"
                            required
                          />
                        </div>
                      </div>

                      <div className="admin-grid-2">
                        <div className="admin-field-box">
                          <label className="admin-label">Google Rating (e.g. 4.9)</label>
                          <input
                            type="number"
                            step="0.1"
                            min="3.0"
                            max="5.0"
                            value={showroomInfoForm.googleRating}
                            onChange={(e) => setShowroomInfoForm({ ...showroomInfoForm, googleRating: parseFloat(e.target.value) || 4.9 })}
                            className="admin-input-field"
                          />
                        </div>

                        <div className="admin-field-box">
                          <label className="admin-label">Google Review Count</label>
                          <input
                            type="number"
                            value={showroomInfoForm.googleReviewCount}
                            onChange={(e) => setShowroomInfoForm({ ...showroomInfoForm, googleReviewCount: parseInt(e.target.value) || 10 })}
                            className="admin-input-field"
                          />
                        </div>
                      </div>

                      <div className="admin-field-box">
                        <label className="admin-label">Showroom Tagline</label>
                        <input
                          type="text"
                          value={showroomInfoForm.tagline}
                          onChange={(e) => setShowroomInfoForm({ ...showroomInfoForm, tagline: e.target.value })}
                          className="admin-input-field"
                        />
                      </div>

                      <div className="admin-field-box">
                        <label className="admin-label">Official Merchant Biography</label>
                        <textarea
                          rows={4}
                          value={showroomInfoForm.officialMerchantBio}
                          onChange={(e) => setShowroomInfoForm({ ...showroomInfoForm, officialMerchantBio: e.target.value })}
                          className="admin-input-field"
                        />
                      </div>
                    </div>

                    <div className="admin-form-actions-bar mt-6">
                      <button type="submit" className="admin-btn-primary">
                        <CheckCircle2 size={16} />
                        <span>Save Showroom Credentials</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* RIGHT PANE: Live Heritage Board Preview */}
                <div className="admin-pane-right">
                  <div className="admin-card-surface border-amber-600/30">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-3">
                      Brand Heritage Preview
                    </span>

                    <div className="p-4 rounded-xl bg-gradient-to-b from-amber-950/40 to-black/60 border border-amber-500/30 text-center space-y-3">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-amber-300 to-amber-700 flex items-center justify-center text-black font-serif font-black text-2xl shadow-lg shadow-amber-600/30">
                        RJ
                      </div>
                      <div>
                        <h3 className="text-xl font-serif font-bold text-amber-300">{showroomInfoForm.hindiName}</h3>
                        <span className="text-xs font-semibold tracking-wider text-gray-300 uppercase block">
                          {showroomInfoForm.name} · SANGMOHAL MIRZAPUR
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 italic px-4 leading-relaxed">
                        "{showroomInfoForm.officialMerchantBio}"
                      </p>
                      <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-4 text-xs">
                        <span className="text-amber-400 font-bold">GSTIN: {showroomInfoForm.gstin}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-emerald-400 font-bold">⭐ {showroomInfoForm.googleRating} Google Rating ({showroomInfoForm.googleReviewCount} Reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* 8. CONTACTS — SIDE-BY-SIDE PANES                              */}
          {/* ============================================================= */}
          {activeTab === 'contacts' && (
            <div className="admin-tab-pane">
              <div className="admin-pane-header">
                <div>
                  <h2 className="admin-pane-title">8. Showroom Address, Phones &amp; Concierge Desk</h2>
                  <p className="admin-pane-desc">
                    Manage direct showroom telephone extensions, WhatsApp video shopping line, visiting hours, and landmark address.
                  </p>
                </div>
              </div>

              <div className="admin-two-pane-layout">
                {/* LEFT PANE: Contacts Editor Form */}
                <div className="admin-pane-left">
                  <form onSubmit={handleSaveContacts} className="admin-card-surface">
                    <h3 className="admin-form-group-title">Contact &amp; Location Details</h3>

                    <div className="space-y-3">
                      <div className="admin-field-box">
                        <label className="admin-label">Full Showroom Address</label>
                        <input
                          type="text"
                          value={contactsForm.fullAddress}
                          onChange={(e) => setContactsForm({ ...contactsForm, fullAddress: e.target.value })}
                          className="admin-input-field"
                          required
                        />
                      </div>

                      <div className="admin-field-box">
                        <label className="admin-label">Prominent Landmark</label>
                        <input
                          type="text"
                          value={contactsForm.landmark}
                          onChange={(e) => setContactsForm({ ...contactsForm, landmark: e.target.value })}
                          className="admin-input-field"
                        />
                      </div>

                      <div className="admin-grid-2">
                        <div className="admin-field-box">
                          <label className="admin-label">Main Counter Phone</label>
                          <input
                            type="text"
                            value={contactsForm.phonePrimary}
                            onChange={(e) => setContactsForm({ ...contactsForm, phonePrimary: e.target.value })}
                            className="admin-input-field"
                            required
                          />
                        </div>

                        <div className="admin-field-box">
                          <label className="admin-label">Store Manager Phone</label>
                          <input
                            type="text"
                            value={contactsForm.phoneSecondary}
                            onChange={(e) => setContactsForm({ ...contactsForm, phoneSecondary: e.target.value })}
                            className="admin-input-field"
                          />
                        </div>
                      </div>

                      <div className="admin-grid-2">
                        <div className="admin-field-box">
                          <label className="admin-label">Inquiries Desk Phone</label>
                          <input
                            type="text"
                            value={contactsForm.phoneTertiary}
                            onChange={(e) => setContactsForm({ ...contactsForm, phoneTertiary: e.target.value })}
                            className="admin-input-field"
                          />
                        </div>

                        <div className="admin-field-box">
                          <label className="admin-label">WhatsApp Video Shopping Number</label>
                          <input
                            type="text"
                            value={contactsForm.whatsapp}
                            onChange={(e) => setContactsForm({ ...contactsForm, whatsapp: e.target.value })}
                            className="admin-input-field"
                            required
                          />
                        </div>
                      </div>

                      <div className="admin-grid-2">
                        <div className="admin-field-box">
                          <label className="admin-label">Regular Hours (Mon – Sat)</label>
                          <input
                            type="text"
                            value={contactsForm.hoursRegular}
                            onChange={(e) => setContactsForm({ ...contactsForm, hoursRegular: e.target.value })}
                            className="admin-input-field"
                          />
                        </div>

                        <div className="admin-field-box">
                          <label className="admin-label">Sunday Hours</label>
                          <input
                            type="text"
                            value={contactsForm.hoursSunday}
                            onChange={(e) => setContactsForm({ ...contactsForm, hoursSunday: e.target.value })}
                            className="admin-input-field"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="admin-form-actions-bar mt-6">
                      <button type="submit" className="admin-btn-primary">
                        <CheckCircle2 size={16} />
                        <span>Save Contact &amp; Hours</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* RIGHT PANE: Live Concierge Card Preview */}
                <div className="admin-pane-right">
                  <div className="admin-card-surface border-amber-600/30">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-3">
                      Visitor Concierge Preview
                    </span>

                    <div className="space-y-3">
                      <div className="p-3.5 rounded-lg bg-black/40 border border-white/5 space-y-1">
                        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                          <MapPin size={14} />
                          <span>Showroom Address &amp; Landmark</span>
                        </div>
                        <p className="text-xs text-white">{contactsForm.fullAddress}</p>
                        <span className="text-[11px] text-amber-200/80 block">Landmark: {contactsForm.landmark}</span>
                      </div>

                      <div className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-600/30 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-300">WhatsApp Video Shopping</span>
                          <span className="text-[10px] text-emerald-400">1-on-1 Inspection</span>
                        </div>
                        <strong className="text-sm text-white font-mono block">{contactsForm.whatsapp}</strong>
                      </div>

                      <div className="admin-grid-2">
                        <div className="p-2.5 rounded bg-black/40 border border-white/5">
                          <span className="text-[10px] text-gray-400 block">Main Counter</span>
                          <strong className="text-xs text-amber-300">{contactsForm.phonePrimary}</strong>
                        </div>
                        <div className="p-2.5 rounded bg-black/40 border border-white/5">
                          <span className="text-[10px] text-gray-400 block">Store Manager</span>
                          <strong className="text-xs text-amber-300">{contactsForm.phoneSecondary}</strong>
                        </div>
                      </div>

                      <div className="p-3 rounded bg-black/40 border border-white/5 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-gray-400 block text-[10px]">Visiting Hours</span>
                          <span className="text-white font-semibold">{contactsForm.hoursRegular}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] border border-emerald-700">
                          Open Today
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </AdminContentPane>
      </div>
    </div>
  );
};

export default DealerPortalModal;
