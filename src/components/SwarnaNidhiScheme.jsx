import React, { useState } from 'react';
import { useJewellery } from '../context/JewelleryContext';
import { STORE_INFO } from '../data/storeInfo';
import { Gift, MessageCircle } from 'lucide-react';

const SwarnaNidhiScheme = () => {
  const { liveRates } = useJewellery();
  const [monthlyAmount, setMonthlyAmount] = useState(5000);

  const customerPaid = monthlyAmount * 11;
  const showroomBonus = monthlyAmount; // 12th Month 100% Free Bonus
  const totalPurchaseValue = customerPaid + showroomBonus;

  const handleEnrollScheme = () => {
    const message = `*👑 RAJESH JEWELLERS (${STORE_INFO.hindiName}) - SWARNA NIDHI (11+1) ENROLLMENT*\n` +
      `📍 Sangmohal, Station Rd, Mirzapur (GSTIN: ${STORE_INFO.gstin})\n` +
      `───────────────────────────────\n` +
      `Namaste, I want to enroll in the Swarna Nidhi 11+1 Gold Scheme:\n` +
      `• Monthly Installment: ₹${monthlyAmount.toLocaleString('en-IN')}\n` +
      `• My Deposit (11 Months): ₹${customerPaid.toLocaleString('en-IN')}\n` +
      `• 12th Month Showroom Bonus: +₹${showroomBonus.toLocaleString('en-IN')} FREE\n` +
      `• Total Jewellery Shopping Value: ₹${totalPurchaseValue.toLocaleString('en-IN')}\n\n` +
      `Please share the enrollment form and digital receipt details for Sangmohal showroom visit.`;

    const cleanPhone = STORE_INFO.whatsapp.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="scheme-bright-section" id="scheme">
      <div className="container">
        <div className="scheme-card-wrap">
          <div>
            <span
              className="kicker-tag"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#FFF',
                borderColor: 'rgba(255, 255, 255, 0.3)'
              }}
            >
              <Gift size={13} style={{ marginRight: '4px' }} />
              Rajesh Swarna Nidhi • मासिक स्वर्ण बचत योजना
            </span>
            <h2>
              Save for 11 Months, <br />
              <span style={{ color: '#FDE047' }}>12th Month 100% Free Bonus!</span>
            </h2>
            <p style={{ fontSize: '1.05rem', opacity: 0.9, lineHeight: 1.7, marginBottom: '2rem' }}>
              Plan for future weddings, anniversaries, or gold investments with zero financial pressure. Deposit a fixed monthly sum for 11 months, and Rajesh Jewellers pays the 12th installment as our festive blessing!
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
              <li>✓ <strong>100% Purity:</strong> Redeem on any 22K 916 Hallmark or Diamond ornament.</li>
              <li>✓ <strong>Extra 25% Off:</strong> Exclusive making charge discount voucher for scheme members.</li>
              <li>✓ <strong>Affordable:</strong> Start with as low as ₹1,000/month up to ₹50,000/month.</li>
            </ul>
          </div>

          <div className="scheme-calc-white">
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--brand-plum)', fontWeight: 700, letterSpacing: '0.08em' }}>
              Monthly Savings Budget
            </span>
            <div
              style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--brand-plum)', margin: '0.5rem 0' }}
            >
              ₹{monthlyAmount.toLocaleString('en-IN')}
            </div>
            <input
              type="range"
              min="1000"
              max="25000"
              step="1000"
              value={monthlyAmount}
              onChange={(e) => setMonthlyAmount(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--brand-plum)', cursor: 'pointer' }}
            />

            <div style={{ background: 'var(--bg-warm)', borderRadius: '8px', padding: '1.25rem', margin: '1.5rem 0', textAlign: 'left', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>You Deposit (11 Months):</span>
                <strong style={{ color: 'var(--text-main)' }}>₹{customerPaid.toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#0E8345' }}>
                <span>Rajesh Jewellers Bonus (Month 12):</span>
                <strong>+₹{showroomBonus.toLocaleString('en-IN')} FREE</strong>
              </div>
              <div style={{ borderTop: '1.5px solid var(--border-medium)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontWeight: 800, color: 'var(--brand-plum)', fontSize: '1.15rem' }}>
                <span>Total Jewellery Value:</span>
                <span>₹{totalPurchaseValue.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              className="btn-scheme-enroll"
              onClick={handleEnrollScheme}
            >
              <MessageCircle size={18} />
              <span>Enroll via WhatsApp in 2 Minutes</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SwarnaNidhiScheme;
