import React, { useState } from 'react';
import { useJewellery } from '../context/JewelleryContext';
import { STORE_INFO } from '../data/storeInfo';
import { RotateCw, MapPin, Phone, Sparkles, ShieldCheck } from 'lucide-react';

const TopBullionBar = () => {
  const { liveRates, rateTicks, lastUpdated, refreshRates } = useJewellery();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshRates();
    setTimeout(() => setIsRefreshing(false), 700);
  };

  const renderTrend = (delta, multiplier = 10, prefix = '₹') => {
    const val = Math.round(delta * multiplier);
    if (val > 0) {
      return (
        <span className="rate-trend-chip up" title="Live Market Micro-Gain">
          ▲ +{prefix}{val.toLocaleString('en-IN')}
        </span>
      );
    }
    if (val < 0) {
      return (
        <span className="rate-trend-chip down" title="Live Market Micro-Dip">
          ▼ {prefix}{Math.abs(val).toLocaleString('en-IN')}
        </span>
      );
    }
    return (
      <span className="rate-trend-chip neutral" title="Steady">
        • 0
      </span>
    );
  };

  return (
    <header className="top-bar">
      <div className="top-bar-container">
        <div className="top-bar-flex">
          {/* Live Bullion Ticker Marquee - Real-Time Live Streaming */}
          <div className="top-rate-marquee">
            {/* Live Status Tag */}
            <div className="rate-live-status-pill" title="Real-Time MCX / IBJA Live Streaming Active">
              <span className="live-pulse-dot"></span>
              <span className="rate-status-text">MCX LIVE</span>
            </div>

            {/* 24K Gold Capsule */}
            <div className="rate-capsule" title="24K Pure 999 Bullion Rate (Auto-Updates Real-Time)">
              <span className="rate-capsule-metal">24K Gold</span>
              <strong className="rate-capsule-val">
                ₹{(liveRates.gold24k * 10).toLocaleString('en-IN')}
              </strong>
              <span className="rate-capsule-unit">/10g</span>
              {renderTrend(rateTicks?.gold24k || 0, 10)}
            </div>

            {/* 22K 916 Hallmark (Featured Gold) */}
            <div className="rate-capsule rate-capsule-highlight" title="22K 916 BIS Hallmark Gold (Auto-Updates Real-Time)">
              <Sparkles size={11} className="rate-sparkle-icon" />
              <span className="rate-capsule-metal">22K 916</span>
              <strong className="rate-capsule-val gold-accent">
                ₹{(liveRates.gold22k * 10).toLocaleString('en-IN')}
              </strong>
              <span className="rate-capsule-unit">/10g</span>
              {renderTrend(rateTicks?.gold22k || 0, 10)}
            </div>

            {/* 18K Diamond Setting Gold */}
            <div className="rate-capsule" title="18K Diamond Setting Gold (Auto-Updates Real-Time)">
              <span className="rate-capsule-metal">18K Gold</span>
              <strong className="rate-capsule-val">
                ₹{(liveRates.gold18k * 10).toLocaleString('en-IN')}
              </strong>
              <span className="rate-capsule-unit">/10g</span>
              {renderTrend(rateTicks?.gold18k || 0, 10)}
            </div>

            {/* Silver 999 Pure Bullion - High Contrast Silver Metallic */}
            <div className="rate-capsule rate-capsule-silver" title="Silver 999 Pure Bullion Rate (Auto-Updates Real-Time)">
              <span className="rate-capsule-metal">Silver 999</span>
              <strong className="rate-capsule-val silver-accent">
                ₹{(Math.round(liveRates.silver999 * 1000)).toLocaleString('en-IN')}
              </strong>
              <span className="rate-capsule-unit">/kg</span>
              {renderTrend(rateTicks?.silver999 || 0, 1000)}
            </div>

            {/* Refresh Button with Live Time */}
            <button
              className={`rate-refresh-capsule ${isRefreshing ? 'refresh-active' : ''}`}
              onClick={handleRefresh}
              title={`Auto-Updates Live Every 7s • Last Tick: ${lastUpdated} • Click to Force Sync`}
              type="button"
            >
              <RotateCw size={11} className={`refresh-icon-spin ${isRefreshing ? 'spinning' : ''}`} />
              <span>Refresh</span>
              {lastUpdated && <span className="rate-clock-text">({lastUpdated})</span>}
            </button>
          </div>

          {/* Store Location & Direct Contact Info */}
          <div className="top-store-info">
            <span className="top-hallmark-badge" title={`GSTIN: ${STORE_INFO.gstin}`}>
              <ShieldCheck size={12} />
              <span>GSTIN: {STORE_INFO.gstin}</span>
            </span>

            <a href="#showroom" className="top-info-link top-loc-link" title="Visit our Sangmohal, Mirzapur Showroom">
              <MapPin size={12} className="top-info-icon" />
              <span>Sangmohal, Mirzapur</span>
            </a>

            <a href={`tel:${STORE_INFO.phonePrimary}`} className="top-info-link top-phone-highlight" title="Call Showroom Desk">
              <Phone size={12} className="top-info-icon" />
              <span>{STORE_INFO.phonePrimaryDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBullionBar;
