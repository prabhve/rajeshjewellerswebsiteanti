import React, { Suspense, lazy } from 'react';
import { JewelleryProvider } from './context/JewelleryContext';
import CategorySEO from './components/CategorySEO';
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
import FloatingWhatsApp from './components/FloatingWhatsApp';
import MobileBottomNav from './components/MobileBottomNav';
import ToastContainer from './components/ToastContainer';
import { Analytics } from '@vercel/analytics/react';

// Lazy-load heavy overlay dialogs on demand to dramatically reduce initial bundle size & speed up FCP/LCP
const QuickViewModal = lazy(() => import('./components/QuickViewModal'));
const VipBookingModal = lazy(() => import('./components/VipBookingModal'));
const GiftFinderModal = lazy(() => import('./components/GiftFinderModal'));
const DealerPortalModal = lazy(() => import('./components/DealerPortalModal'));

function App() {
  return (
    <JewelleryProvider>
      <CategorySEO />
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
        <Suspense fallback={null}>
          <QuickViewModal />
          <VipBookingModal />
          <GiftFinderModal />
          <DealerPortalModal />
        </Suspense>

        {/* Floating Utilities */}
        <FloatingWhatsApp />
        <MobileBottomNav />
        <ToastContainer />

        {/* Vercel Web Analytics */}
        <Analytics />
      </div>
    </JewelleryProvider>
  );
}

export default App;
