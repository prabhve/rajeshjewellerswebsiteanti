// Initial Master CMS Configuration for Rajesh Jewellers
// Supports Draft vs Published States, 23 Management Modules, and Complete Live Site Control

export const DEFAULT_HOMEPAGE_SECTIONS = [
  { id: 'announcement', name: 'Announcement Bar', enabled: true, title: 'MCX Live Bullion Rates Updated · 100% BIS 916 Hallmark Guaranteed', hindiTitle: 'लाइव बुलियन भाव · 100% बीआईएस 916 हॉलमार्क गारंटी' },
  { id: 'bullion_ticker', name: 'Live Gold Rate Ticker', enabled: true, title: 'MCX Bullion Rate Board', hindiTitle: 'लाइव सोने-चांदी का भाव' },
  { id: 'main_nav', name: 'Header Navigation', enabled: true, title: 'Rajesh Jewellers Mirzapur', hindiTitle: 'राजेश ज्वेलर्स मिर्ज़ापुर' },
  { id: 'hero', name: 'Hero Banner Carousel', enabled: true, title: 'Royal Heritage Jewellery', hindiTitle: 'शाही विरासत आभूषण संग्रह', ctaText: 'Explore Masterpieces', ctaTarget: '#catalog-section' },
  { id: 'trust_strip', name: 'Trust Indicator Strip', enabled: true, title: '100% Verified Hallmarking & Lifetime Buyback', hindiTitle: '100% हॉलमार्क व आजीवन बायबैक गारंटी' },
  { id: 'categories', name: 'Shop by Category Carousel', enabled: true, title: 'Curated Collections', hindiTitle: 'श्रेणी अनुसार आभूषण' },
  { id: 'featured_collections', name: 'Featured Collections Grid', enabled: true, title: 'Sangmohal Showroom Exclusives', hindiTitle: 'संगमोहाल शोरूम खास संग्रह' },
  { id: 'catalog', name: 'Masterpiece Jewellery Catalog', enabled: true, title: 'Online Showcase & Filter', hindiTitle: 'ऑनलाइन आभूषण कैटलॉग' },
  { id: 'pincode_checker', name: 'Showroom Trial & Pincode Checker', enabled: true, title: 'Check Free Insured Delivery Speed', hindiTitle: 'निःशुल्क डिलीवरी समय जांचें' },
  { id: 'video_banner', name: '4K Live Video Shopping', enabled: true, title: 'Interactive Video Consultation', hindiTitle: 'वीडियो कॉल पर गहने देखें' },
  { id: 'calculator', name: 'Gold Price & Making Calculator', enabled: true, title: 'Transparent Price Estimator', hindiTitle: 'गोल्ड मूल्य एवं मेकिंग कैलकुलेटर' },
  { id: 'swarna_nidhi', name: 'Swarna Nidhi 11+1 Monthly Plan', enabled: true, title: 'Gold Savings Scheme', hindiTitle: 'स्वर्ण निधि 11+1 मासिक बचत योजना' },
  { id: 'showroom_tour', name: 'Showroom Photo Tour & Maps', enabled: true, title: 'Sangmohal Flagship Showroom', hindiTitle: 'संगमोहाल फ्लैगशिप शोरूम दर्शन' },
  { id: 'testimonials', name: 'Customer Reviews & Stories', enabled: true, title: 'Google Verified Feedback', hindiTitle: 'ग्राहकों के अनुभव एवं समीक्षाएं' },
  { id: 'trust_pillars', name: 'The 5 Pillars of Trust', enabled: true, title: 'Our Customer Promises', hindiTitle: 'विश्वास के 5 मुख्य स्तंभ' },
  { id: 'footer', name: 'Footer & Store Info', enabled: true, title: 'Rajesh Jewellers Sangmohal', hindiTitle: 'राजेश ज्वेलर्स संगमोहाल' }
];

export const DEFAULT_OFFERS = [
  {
    id: 'off_01',
    title: 'Lagan Wedding Special Offer',
    code: 'ROYAL1000',
    discountType: 'flat',
    discountValue: 1000,
    minPurchase: 25000,
    validUntil: '2026-12-31',
    description: 'Flat ₹1,000 Off on bridal polki and gold necklace sets above ₹25,000.',
    targetSection: '#catalog-section',
    enabled: true
  },
  {
    id: 'off_02',
    title: 'Welcome Showroom Coupon',
    code: 'WELCOME500',
    discountType: 'flat',
    discountValue: 500,
    minPurchase: 10000,
    validUntil: '2026-12-31',
    description: 'Flat ₹500 Off on first purchase at Sangmohal showroom or online.',
    targetSection: '#catalog-section',
    enabled: true
  }
];

export const DEFAULT_LEADS = [
  {
    id: 'lead_101',
    customerName: 'Priya Sharma',
    contactNumber: '+91 98765 43210',
    email: 'priya.sharma@example.com',
    inquiryType: 'VIP Visit Request',
    productReference: 'Royal Polki Choker Set (RJ-BR-001)',
    preferredDate: '2026-11-10',
    preferredTime: '11:30 AM',
    message: 'Looking for bridal Kundan necklace for wedding in December. Please keep VIP Lounge ready.',
    source: 'Website VIP Booking Modal',
    createdAt: '2026-11-05T14:30:00Z',
    status: 'New',
    assignedAdmin: 'Owner',
    notes: 'Inquired about 22K 45g bridal set.'
  },
  {
    id: 'lead_102',
    customerName: 'Rajesh Verma',
    contactNumber: '+91 94152 11223',
    email: 'rverma.vns@example.com',
    inquiryType: 'Video Shopping Request',
    productReference: 'Antique Temple Kada (RJ-BA-003)',
    preferredDate: '2026-11-08',
    preferredTime: '04:00 PM',
    message: 'Want to view live Karatmeter test of 22K temple bangles on WhatsApp Video.',
    source: 'WhatsApp Video Consultation Button',
    createdAt: '2026-11-04T10:15:00Z',
    status: 'Confirmed',
    assignedAdmin: 'Store Manager',
    notes: 'Scheduled WhatsApp video call with senior karigar.'
  }
];

export const DEFAULT_SEO_CONFIG = {
  globalTitle: 'Rajesh Jewellers Mirzapur | Online Jewellery Store & Live Bullion Rates',
  globalMetaDesc: 'Shop 22K BIS 916 hallmarked bridal jewellery, gold necklaces, antique temple bangles, certified diamond solitaires, and 925 silver at Rajesh Jewellers, Sangmohal, Mirzapur.',
  keywords: 'Rajesh Jewellers Mirzapur, Sangmohal Jewellers, gold store Mirzapur, buy jewellery online Mirzapur, 916 hallmark gold, gold rate today Mirzapur',
  ogImage: '/assets/images/hero_bridal.jpg',
  canonicalDomain: 'https://rajeshjewellers.com',
  googleSiteVerification: 'rj_google_verify_code_231001',
  indexWebsite: true
};

export const DEFAULT_LEGAL_POLICIES = {
  aboutUs: `Rajesh Jewellers is a premier heritage jewellery house located at Sangmohal, Station Rd, Mirzapur, Uttar Pradesh. Operating under GSTIN 09AABCJ1234F1Z1, we specialise in 100% BIS 916 Hallmarked Gold, Certified Diamonds, Antique Temple Kadas, and 925 Sterling Silver. Every piece comes with a lifetime buyback guarantee and transparent computerized Karatmeter testing.`,
  privacyPolicy: `At Rajesh Jewellers Mirzapur, we respect your privacy. All customer phone numbers, pincodes, and consultation requests submitted on this website are kept strictly confidential and used solely for fulfilling orders, WhatsApp video appointments, and delivery tracking.`,
  termsAndConditions: `All gold and silver purchases from Rajesh Jewellers are governed by daily MCX market rates. Quotations generated on our online calculator remain valid for the calendar day of issuance. All sales are issued with an official tax invoice containing 6-digit Laser HUID certificates.`,
  shippingPolicy: `We offer free same-day insured delivery and showroom trials within Mirzapur District (231001 corridor). Priority express transit across UP (Varanasi, Prayagraj, Bhadohi) takes 24-48 hours via Blue Dart / Sequel Armoured logistics. Pan-India shipments take 3-5 business days.`,
  returnExchangePolicy: `We offer a 100% Lifetime Exchange and Buyback Guarantee at prevailing daily bullion market rates. Products can be exchanged or returned at our Sangmohal showroom upon presentation of the original tax invoice and undamaged hallmark stamp.`
};

export const DEFAULT_ADMIN_USERS = [
  {
    id: 'usr_owner',
    name: 'Jewellery Owner / Proprietor',
    role: 'Owner',
    email: 'owner@rajeshjewellers.com',
    passcode: '1994',
    lastLogin: '2026-11-05T17:55:00Z',
    status: 'Active'
  },
  {
    id: 'usr_mgr',
    name: 'Showroom Manager',
    role: 'Manager',
    email: 'manager@rajeshjewellers.com',
    passcode: '2026',
    lastLogin: '2026-11-04T09:12:00Z',
    status: 'Active'
  }
];

export const DEFAULT_ACTIVITY_LOGS = [
  { id: 'log_01', event: 'Gold Rate Changed', user: 'Owner', timestamp: '2026-11-05 17:50:00', details: '24K Gold updated to ₹7,845/g • 22K Gold updated to ₹7,186/g' },
  { id: 'log_02', event: 'Product Added', user: 'Owner', timestamp: '2026-11-05 16:20:00', details: 'Added new item "Royal Kundan Bridal Haar" (22K 42.5g)' },
  { id: 'log_03', event: 'CMS Published', user: 'Owner', timestamp: '2026-11-05 15:00:00', details: 'Published draft changes to live customer website' }
];

export const DEFAULT_DESIGN_SETTINGS = {
  primaryColor: '#280D16',
  accentColor: '#C6A15B',
  softGold: '#E4C77D',
  fontHeading: 'Playfair Display',
  fontBody: 'Plus Jakarta Sans',
  buttonStyle: 'rounded-luxury',
  headerLayout: 'split-bar',
  cardLayout: 'luxury-gold-border'
};
