// Rajesh Jewellers Mirzapur App
import React from 'react';
import { JewelleryProvider } from './context/JewelleryContext';
import TopBullionBar from './components/TopBullionBar';
import Header from './components/Header';
import CategoryNavBar from './components/CategoryNavBar';
import HeroSection from './components/HeroSection';
import CategoryBubbles from './components/CategoryBubbles';
import ProductsCatalog from './components/ProductsCatalog';
import PriceEstimator from './components/PriceEstimator';
import SwarnaNidhiScheme from './components/SwarnaNidhiScheme';
import ShowroomTour from './components/ShowroomTour';
import CustomerTestimonials from './components/CustomerTestimonials';
import TrustPillars from './components/TrustPillars';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import QuickViewModal from './components/QuickViewModal';
import VipBookingModal from './components/VipBookingModal';
import GiftFinderModal from './components/GiftFinderModal';
import DealerPortalModal from './components/DealerPortalModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import MobileBottomNav from './components/MobileBottomNav';
import ToastContainer from './components/ToastContainer';

function App() {
  return (
    <JewelleryProvider>
      <div className="rajesh-app-wrapper">
        {/* Top Bullion Bar with Live MCX Ticker */}
        <TopBullionBar />

        {/* Site Header with Live Search & Badges */}
        <Header />

        {/* Horizontal Category Navigation Bar with Gift Finder */}
        <CategoryNavBar />

        {/* Main Content Flow */}
        <main>
          {/* Majestic Hero Banner with 3D Gold Particle Canvas */}
          <HeroSection />

          {/* Circular Story-Style Category Carousel (Tanishq/BlueStone inspired) */}
          <CategoryBubbles />

          {/* Masterpiece Jewellery Catalog with Cut Shape, Occasion & Pincode Filter */}
          <ProductsCatalog />

          {/* 100% Transparent Gold & Jewellery Price Estimator */}
          <PriceEstimator />

          {/* Swarna Nidhi 11+1 Monthly Gold Scheme */}
          <SwarnaNidhiScheme />

          {/* Sangmohal Flagship Showroom Tour & Google Map */}
          <ShowroomTour />

          {/* Real Customer Stories & Google Reviews */}
          <CustomerTestimonials />

          {/* The 5 Pillars of Customer Trust */}
          <TrustPillars />
        </main>

        {/* Footer with discreet Dealer Portal access */}
        <Footer />

        {/* Interactive Drawers & Overlays */}
        <CartDrawer />
        <WishlistDrawer />
        <QuickViewModal />
        <VipBookingModal />
        <GiftFinderModal />
        <DealerPortalModal />

        {/* Floating Utilities */}
        <FloatingWhatsApp />
        <MobileBottomNav />
        <ToastContainer />
      </div>
    </JewelleryProvider>
  );
}

export default App;
