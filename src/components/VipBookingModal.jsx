import React, { useState, useEffect } from 'react';
import { useJewellery } from '../context/JewelleryContext';
import { STORE_INFO } from '../data/storeInfo';
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  Sparkles,
  MessageCircle,
  Video,
  Store
} from 'lucide-react';

const VipBookingModal = () => {
  const { isVipModalOpen, setIsVipModalOpen, vipModalInitialTab, showToast } = useJewellery();

  const [activeTab, setActiveTab] = useState('store'); // 'store' | 'video'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '12:00 PM',
    interest: 'Royal Bridal Polki Sets',
    notes: ''
  });

  useEffect(() => {
    if (vipModalInitialTab) {
      setActiveTab(vipModalInitialTab);
    }
  }, [vipModalInitialTab]);

  if (!isVipModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast('Please enter your name and contact phone.', 'error');
      return;
    }

    let message = '';
    if (activeTab === 'video') {
      message =
        `*📹 RAJESH JEWELLERS (SANGMOHAL, MIRZAPUR) - 4K VIDEO SHOPPING BOOKING*\n` +
        `──────────────────────\n` +
        `Namaste Rajesh Jewellers, I would like to schedule a 1-on-1 WhatsApp 4K Video Consultation:\n\n` +
        `• *Client Name:* ${formData.name}\n` +
        `• *WhatsApp Phone:* ${formData.phone}\n` +
        `• *Preferred Date:* ${formData.date}\n` +
        `• *Preferred Time Slot:* ${formData.time}\n` +
        `• *Jewellery Interest:* ${formData.interest}\n` +
        (formData.notes ? `• *Special Notes:* ${formData.notes}\n` : '') +
        `\nPlease assign a senior jewellery specialist to showcase real BIS 916 hallmarks, diamond clarity, and live weight on camera.`;
    } else {
      message =
        `*👑 RAJESH JEWELLERS (SANGMOHAL, MIRZAPUR) - VIP SHOWROOM VISIT BOOKING*\n` +
        `──────────────────────\n` +
        `Namaste Rajesh Jewellers, I would like to reserve an exclusive in-store appointment:\n\n` +
        `• *Guest Name:* ${formData.name}\n` +
        `• *Phone:* ${formData.phone}\n` +
        `• *Visit Date:* ${formData.date}\n` +
        `• *Preferred Slot:* ${formData.time}\n` +
        `• *Collection Focus:* ${formData.interest}\n` +
        (formData.notes ? `• *Notes:* ${formData.notes}\n` : '') +
        `\nPlease reserve our Sangmohal Showroom Consultation Desk and prepare the Karatmeter testing console.`;
    }

    window.open(`https://wa.me/${STORE_INFO.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank');
    showToast(
      activeTab === 'video'
        ? '📹 Video shopping appointment request sent via WhatsApp!'
        : '👑 VIP Showroom Appointment sent! Our concierge looks forward to welcoming you.'
    );
    setIsVipModalOpen(false);
  };

  return (
    <div
      className="modal-overlay active"
      onClick={() => setIsVipModalOpen(false)}
    >
      <div
        className="modal-card vip-booking-container"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: '560px',
          width: '95%',
          borderRadius: '16px'
        }}
      >
        <button
          className="drawer-close-btn"
          style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}
          onClick={() => setIsVipModalOpen(false)}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Tab Switcher: Store Visit vs Video Shopping */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', background: 'rgba(255, 255, 255, 0.04)', padding: '0.35rem', borderRadius: '12px', marginBottom: '1.25rem', border: '1.5px solid rgba(229, 195, 120, 0.3)' }}>
          <button
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
              padding: '0.7rem 0.5rem',
              fontSize: '0.86rem',
              fontWeight: 800,
              borderRadius: '9px',
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'store' ? 'linear-gradient(135deg, #FFF6D6 0%, #E5C378 40%, #C59D3F 100%)' : 'transparent',
              color: activeTab === 'store' ? '#080103' : '#E6E0D6',
              transition: 'all 0.2s ease',
              boxShadow: activeTab === 'store' ? '0 4px 14px rgba(229, 195, 120, 0.35)' : 'none'
            }}
            onClick={() => setActiveTab('store')}
          >
            <Store size={16} />
            <span>In-Store VIP Visit</span>
          </button>

          <button
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
              padding: '0.7rem 0.5rem',
              fontSize: '0.86rem',
              fontWeight: 800,
              borderRadius: '9px',
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'video' ? 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' : 'transparent',
              color: activeTab === 'video' ? '#080103' : '#E6E0D6',
              transition: 'all 0.2s ease',
              boxShadow: activeTab === 'video' ? '0 4px 14px rgba(37, 211, 102, 0.35)' : 'none'
            }}
            onClick={() => setActiveTab('video')}
          >
            <Video size={16} />
            <span>📹 4K Video Shopping</span>
          </button>
        </div>

        {/* Header details depending on tab */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <span className="kicker-tag" style={{ justifyContent: 'center' }}>
            <Sparkles size={13} />
            {activeTab === 'video' ? 'CaratLane Standard 4K Remote Viewing' : 'Exclusive In-Store Hospitality'}
          </span>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--brand-plum)', margin: '0.35rem 0 0.2rem' }}>
            {activeTab === 'video' ? 'Book Live Video Shopping' : 'Book a VIP Bridal Appointment'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', margin: 0 }}>
            {activeTab === 'video'
              ? 'Connect 1-on-1 with our master jeweller via WhatsApp 4K Video. Inspect real gold purity, hallmarks & try on models live.'
              : 'Enjoy dedicated bridal suite consultation, refreshments, and free Karatmeter gold purity testing at our Sangmohal showroom.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div className="form-field">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <User size={14} />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Aditi Agarwal / Sharma Family"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-field">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Phone size={14} />
              <span>WhatsApp / Contact Number</span>
            </label>
            <input
              type="tel"
              required
              placeholder="e.g. 9876543210 (WhatsApp active)"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="vip-datetime-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-field">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={14} />
                <span>Preferred Date</span>
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <div className="form-field">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={14} />
                <span>Time Slot</span>
              </label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              >
                <option value="11:30 AM">11:30 AM (Morning)</option>
                <option value="01:00 PM">01:00 PM (Afternoon)</option>
                <option value="03:30 PM">03:30 PM (Tea Time)</option>
                <option value="05:30 PM">05:30 PM (Evening)</option>
                <option value="07:30 PM">07:30 PM (Late VIP)</option>
              </select>
            </div>
          </div>

          <div className="form-field">
            <label>Primary Collection Focus</label>
            <select
              value={formData.interest}
              onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
            >
              <option value="Royal Bridal Polki Sets">Royal Bridal Polki & Kundan Sets</option>
              <option value="22K Filigree Chokers & Necklaces">22K Gold Necklaces & Chokers</option>
              <option value="Antique Temple Kadas & Bangles">Antique Temple Kadas & Bangles</option>
              <option value="Solitaire Engagement Rings">Certified Solitaire Rings</option>
              <option value="Old Gold Karatmeter Exchange">Old Gold Exchange & Karatmeter Check</option>
              <option value="Swarna Nidhi 11+1 Gold Scheme">Swarna Nidhi 11+1 Gold Scheme</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '0.85rem',
              marginTop: '0.35rem',
              background:
                activeTab === 'video'
                  ? 'linear-gradient(135deg, #128C7E, #075E54)'
                  : 'linear-gradient(135deg, var(--gold-primary), #976f1c)'
            }}
          >
            {activeTab === 'video' ? <Video size={17} /> : <MessageCircle size={17} />}
            <span>
              {activeTab === 'video' ? 'Confirm 4K Video Slot via WhatsApp' : 'Confirm Showroom Visit via WhatsApp'}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default VipBookingModal;
