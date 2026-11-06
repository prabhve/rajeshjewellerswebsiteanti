import React, { useEffect } from 'react';
import { useJewellery } from '../context/JewelleryContext';

export const CATEGORY_SEO_DATA = {
  all: {
    title: "Rajesh Jewellers Mirzapur | Online Jewellery Store & Live Bullion Rates",
    description: "Shop 22K BIS 916 hallmarked bridal jewellery, gold necklaces, antique temple bangles, certified diamond solitaires, and 925 silver at Rajesh Jewellers, Sangmohal, Mirzapur.",
    keywords: "Rajesh Jewellers Mirzapur, Sangmohal Jewellers, gold store Mirzapur, buy jewellery online Mirzapur, 916 hallmark gold, gold rate today Mirzapur, wedding jewellery Mirzapur",
    heading: "Exclusive Masterpiece Jewellery Collection",
    subheading: "Browse 22K BIS 916 hallmarked gold, certified diamonds, and antique temple ornaments at Sangmohal Showroom, Mirzapur.",
    ogTitle: "Rajesh Jewellers Mirzapur | Online Jewellery Showcase & Live Bullion",
    ogDescription: "Explore pure 22K BIS 916 Hallmarked Gold, Bridal Polki, and Certified Diamonds in Sangmohal, Station Rd, Mirzapur."
  },
  bridal: {
    title: "Bridal Jewellery Collection Mirzapur | 22K Royal Polki & Kundan | Rajesh Jewellers",
    description: "Explore the opulent Bridal Jewellery Collection at Rajesh Jewellers Mirzapur. Handcrafted 22K gold rani haars, bridal polki necklaces, Kundan sets & wedding ornaments at Sangmohal.",
    keywords: "Bridal Jewellery Collection Mirzapur, wedding gold necklace Mirzapur, bridal polki set Mirzapur, Kundan bridal jewellery, Rajesh Jewellers bridal collection, Sangmohal bridal lounge, rani haar Mirzapur",
    heading: "Bridal Jewellery Collection Mirzapur",
    subheading: "Handcrafted 22K BIS 916 gold rani haars, heritage Kundan polki, and wedding bridal sets at Sangmohal Flagship Showroom.",
    ogTitle: "Bridal Jewellery Collection | Rajesh Jewellers Mirzapur",
    ogDescription: "Discover handcrafted 22K BIS 916 bridal necklaces, heritage polki sets, and wedding jewellery in Sangmohal, Mirzapur."
  },
  gold: {
    title: "Gold Necklaces in Mirzapur | 22K BIS 916 Hallmarked Gold Chains & Chokers | Rajesh Jewellers",
    description: "Buy exquisite Gold Necklaces in Mirzapur at Rajesh Jewellers. Certified BIS 916 hallmarked bridal chokers, lightweight chains, harams & traditional temple necklaces.",
    keywords: "Gold Necklaces in Mirzapur, 22K gold necklace rate Mirzapur, 916 gold choker Mirzapur, Rajesh Jewellers gold necklace, Sangmohal gold jewellery, gold haram Mirzapur",
    heading: "Gold Necklaces in Mirzapur — 22K BIS 916 Hallmark",
    subheading: "Explore lightweight gold chains, royal bridal chokers, and traditional temple gold necklaces crafted in Mirzapur.",
    ogTitle: "22K BIS 916 Gold Necklaces in Mirzapur | Rajesh Jewellers",
    ogDescription: "Browse 22K hallmarked gold necklaces, chokers, and designer gold chains at Rajesh Jewellers Sangmohal, Mirzapur."
  },
  bangles: {
    title: "Temple Kadas & Gold Bangles in Mirzapur | 22K Hallmark | Rajesh Jewellers",
    description: "Discover handcrafted 22K gold bangles, antique temple kadas, and Nakshi bridal bangles at Rajesh Jewellers Sangmohal, Mirzapur. 100% BIS 916 certified.",
    keywords: "Gold bangles Mirzapur, temple kada Mirzapur, 22K gold kangan Mirzapur, antique bridal bangles, Rajesh Jewellers bangles, Nakshi kada Mirzapur",
    heading: "Temple Kadas & Gold Bangles in Mirzapur",
    subheading: "Authentic 22K BIS 916 antique temple kadas, carved Nakshi kangans, and lightweight gold bangles.",
    ogTitle: "22K Gold Bangles & Temple Kadas in Mirzapur | Rajesh Jewellers",
    ogDescription: "Handcrafted 22K BIS 916 gold bangles and antique temple kadas in Sangmohal, Mirzapur."
  },
  diamond: {
    title: "Certified Diamond Solitaires & Rings in Mirzapur | VVS-EF IGI Diamonds | Rajesh Jewellers",
    description: "Shop IGI certified diamond solitaires, engagement rings, & diamond necklaces at Rajesh Jewellers Mirzapur. VVS-EF clarity diamonds with lifetime buyback guarantee.",
    keywords: "Diamond jewellery Mirzapur, solitaire ring Mirzapur, diamond engagement ring Mirzapur, IGI certified diamond Rajesh Jewellers, diamond necklace Mirzapur",
    heading: "Certified Diamond Solitaires & Fine Jewellery",
    subheading: "VVS-EF clarity IGI & SGL certified solitaire rings, bridal diamond sets, and tennis bracelets in Mirzapur.",
    ogTitle: "Certified Diamond Solitaires & Rings in Mirzapur | Rajesh Jewellers",
    ogDescription: "IGI & SGL certified solitaire diamond rings and bridal diamond necklaces in Sangmohal, Mirzapur."
  },
  everyday: {
    title: "Gold Jhumkas & Daily Wear Jewellery in Mirzapur | 22K & 18K | Rajesh Jewellers",
    description: "Browse lightweight 22K gold jhumkas, stud earrings, and daily wear gold jewellery at Rajesh Jewellers Mirzapur. Elegant, durable, and 100% BIS hallmarked.",
    keywords: "Gold jhumkas Mirzapur, daily wear gold jewellery Mirzapur, gold earrings Mirzapur, lightweight 22K gold studs, Rajesh Jewellers jhumkas",
    heading: "Gold Jhumkas & Daily Wear Jewellery Collection",
    subheading: "Lightweight, comfortable 22K gold jhumkas, stud earrings, and everyday gold ornaments in Mirzapur.",
    ogTitle: "Gold Jhumkas & Daily Wear Jewellery in Mirzapur | Rajesh Jewellers",
    ogDescription: "Lightweight 22K gold jhumkas, stud earrings, and daily wear gold ornaments in Sangmohal, Mirzapur."
  },
  mens: {
    title: "Men's Gold Jewellery in Mirzapur | 22K Chains, Kadas & Rings | Rajesh Jewellers",
    description: "Explore heavy 22K men's gold chains, solid brass-core gold kadas, and royal gemstone signet rings at Rajesh Jewellers Sangmohal, Mirzapur.",
    keywords: "Men's gold chain Mirzapur, men gold kada Mirzapur, men gold ring Mirzapur, Rajesh Jewellers mens collection, 22K gents jewellery",
    heading: "Men's Royal Gold Jewellery Collection",
    subheading: "Solid 22K gold chains, bold kadas, and gemstone signet rings designed for men at Sangmohal, Mirzapur.",
    ogTitle: "Men's Gold Jewellery in Mirzapur | Rajesh Jewellers",
    ogDescription: "Heavy 22K gold chains, solid kadas, and royal signet rings for men in Sangmohal, Mirzapur."
  },
  coins: {
    title: "24K Pure Gold Coins & Silver Bars in Mirzapur | 999 Purity | Rajesh Jewellers",
    description: "Buy 999 pure 24K Lakshmi Ganesh gold coins, tamper-proof Swiss-certified gold bars, and 999 silver coins at live MCX bullion rates at Rajesh Jewellers Mirzapur.",
    keywords: "24K gold coin Mirzapur, buy gold coins Mirzapur, 999 silver coin Mirzapur, Laxmi Ganesh gold coin, Rajesh Jewellers gold rate coin",
    heading: "24K Pure Gold & 999 Silver Investment Coins",
    subheading: "999 hallmarked pure 24K gold coins and silver bars sold at live MCX bullion rates in Mirzapur.",
    ogTitle: "24K Pure Gold & 999 Silver Coins in Mirzapur | Rajesh Jewellers",
    ogDescription: "Buy 999 pure 24K gold coins and silver bars at live market rates in Sangmohal, Mirzapur."
  },
  silver: {
    title: "925 Sterling Silver Jewellery & Utensils in Mirzapur | Rajesh Jewellers",
    description: "Shop 925 sterling silver payal, chandi bichiye, silver pooja thali, and silver gift items at Rajesh Jewellers Sangmohal, Mirzapur. 100% stamped purity.",
    keywords: "Silver jewellery Mirzapur, 925 silver payal Mirzapur, silver pooja thali Mirzapur, chandi bartan Mirzapur, Rajesh Jewellers silver",
    heading: "925 Sterling Silver Jewellery & Sacred Utensils",
    subheading: "Stamped 925 sterling silver payals, toe rings, pooja thalis, and handcrafted silver gift articles in Mirzapur.",
    ogTitle: "925 Sterling Silver Jewellery & Pooja Articles in Mirzapur | Rajesh Jewellers",
    ogDescription: "Explore 925 sterling silver anklets, pooja thalis, and gift items in Sangmohal, Mirzapur."
  }
};

const updateMetaTag = (selector, attributeName, attributeVal, content) => {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeVal);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const CategorySEO = () => {
  const { activeCategory } = useJewellery();

  useEffect(() => {
    const seo = CATEGORY_SEO_DATA[activeCategory] || CATEGORY_SEO_DATA.all;

    // 1. Page Title
    document.title = seo.title;

    // 2. Standard Meta Tags
    updateMetaTag('meta[name="description"]', 'name', 'description', seo.description);
    updateMetaTag('meta[name="keywords"]', 'name', 'keywords', seo.keywords);

    // 3. Open Graph Tags
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', seo.ogTitle || seo.title);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', seo.ogDescription || seo.description);

    // 4. Twitter Card Tags
    updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', seo.ogTitle || seo.title);
    updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', seo.ogDescription || seo.description);

    // 5. Dynamic Schema.org JSON-LD Collection Page Data
    let schemaScript = document.getElementById('category-seo-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'category-seo-schema';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": seo.heading,
      "description": seo.description,
      "url": window.location.href,
      "isPartOf": {
        "@type": "WebSite",
        "name": "Rajesh Jewellers",
        "url": window.location.origin
      },
      "provider": {
        "@type": "JewelryStore",
        "name": "Rajesh Jewellers Mirzapur",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Sangmohal, Station Rd",
          "addressLocality": "Mirzapur",
          "addressRegion": "Uttar Pradesh",
          "postalCode": "231001",
          "addressCountry": "IN"
        }
      }
    };

    schemaScript.textContent = JSON.stringify(schemaData);
  }, [activeCategory]);

  return null;
};

export default React.memo(CategorySEO);
