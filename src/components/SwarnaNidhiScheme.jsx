import React, { useState } from 'react';
import { useJewellery } from '../context/JewelleryContext';
import { STORE_INFO } from '../data/storeInfo';
import { Gift, MessageCircle, ChevronDown, ChevronUp, ShieldCheck, CheckCircle2, Clock, FileText } from 'lucide-react';

const SwarnaNidhiScheme = () => {
  const { liveRates, storeInfo } = useJewellery();
  const info = storeInfo || STORE_INFO;
  const [monthlyAmount, setMonthlyAmount] = useState(5000);
  const [openTerms, setOpenTerms] = useState(false);

  const customerPaid = monthlyAmount * 11;
  const showroomBonus = monthlyAmount; // 12th Month 100% Free Bonus
  const totalPurchaseValue = customerPaid + showroomBonus;

  const handleEnrollScheme = () => {
    const message = `*👑 RAJESH JEWELLERS (${info.hindiName}) - SWARNA NIDHI (11+1) ENROLLMENT*\n` +
      `📍 Sangmohal, Station Rd, Mirzapur (GSTIN: ${info.gstin})\n` +
      `───────────────────────────────\n` +
      `Namaste, I want to enroll in the Swarna Nidhi 11+1 Gold Scheme:\n` +
      `• Monthly Installment: ₹${monthlyAmount.toLocaleString('en-IN')}\n` +
      `• My Deposit (11 Months): ₹${customerPaid.toLocaleString('en-IN')}\n` +
      `• 12th Month Showroom Bonus: +₹${showroomBonus.toLocaleString('en-IN')} FREE\n` +
      `• Total Jewellery Shopping Value: ₹${totalPurchaseValue.toLocaleString('en-IN')}\n\n` +
      `Please share the enrollment form and digital receipt details for Sangmohal showroom visit.`;

    const cleanPhone = (info.whatsapp || '919161123840').replace(/[^0-9]/g, '');
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
            <p style={{ fontSize: '1rem', opacity: 0.92, lineHeight: 1.65, marginBottom: '1.75rem' }}>
              Plan for future weddings, anniversaries, or gold investments with zero financial pressure. Deposit a fixed monthly sum for 11 months, and Rajesh Jewellers pays the 12th installment as our festive blessing!
            </p>

            {/* 3-Step Simple Explanation */}
            <div className="scheme-steps-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.75rem' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '0.85rem', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.2rem' }}>Step 1</span>
                <strong style={{ fontSize: '0.88rem', color: '#FFF' }}>Set Monthly Sum</strong>
                <p style={{ fontSize: '0.78rem', opacity: 0.8, marginTop: '0.2rem', lineHeight: 1.4 }}>Choose ₹1,000 to ₹50,000 as per your budget.</p>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '0.85rem', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.2rem' }}>Step 2</span>
                <strong style={{ fontSize: '0.88rem', color: '#FFF' }}>Pay 11 Months</strong>
                <p style={{ fontSize: '0.78rem', opacity: 0.8, marginTop: '0.2rem', lineHeight: 1.4 }}>Digital or showroom receipts provided monthly.</p>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '0.85rem', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.2rem' }}>Step 3</span>
                <strong style={{ fontSize: '0.88rem', color: '#FFF' }}>Redeem 12th Free</strong>
                <p style={{ fontSize: '0.78rem', opacity: 0.8, marginTop: '0.2rem', lineHeight: 1.4 }}>Buy 22K Hallmark gold with 100% free bonus.</p>
              </div>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
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
              style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--brand-plum)', margin: '0.35rem 0' }}
            >
              ₹{monthlyAmount.toLocaleString('en-IN')}
            </div>
            <input
              type="range"
              min="1000"
              max="50000"
              step="1000"
              value={monthlyAmount}
              onChange={(e) => setMonthlyAmount(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--brand-plum)', cursor: 'pointer' }}
            />

            <div style={{ background: 'var(--bg-warm)', borderRadius: '8px', padding: '1.15rem', margin: '1.25rem 0', textAlign: 'left', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                <span>You Deposit (11 Months):</span>
                <strong style={{ color: 'var(--text-main)' }}>₹{customerPaid.toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem', color: '#168C57' }}>
                <span>Rajesh Jewellers Bonus (Month 12):</span>
                <strong style={{ color: '#10B981' }}>+₹{showroomBonus.toLocaleString('en-IN')} FREE</strong>
              </div>
              <div style={{ borderTop: '1.5px solid var(--border-medium)', paddingTop: '0.65rem', display: 'flex', justifyContent: 'space-between', fontWeight: 800, color: 'var(--brand-plum)', fontSize: '1.15rem' }}>
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

        {/* Expandable Scheme Terms & Conditions Accordion */}
        <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.15)', paddingTop: '1.25rem' }}>
          <button
            type="button"
            onClick={() => setOpenTerms(!openTerms)}
            style={{
              background: 'none',
              border: 'none',
              color: '#FDE047',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              width: '100%'
            }}
          >
            <FileText size={15} />
            <span>{openTerms ? 'Hide Scheme Terms & Authorised Conditions' : 'View Scheme Terms & Authorised Conditions'}</span>
            {openTerms ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {openTerms && (
            <div style={{ marginTop: '1rem', background: 'rgba(0, 0, 0, 0.35)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '12px', padding: '1.25rem', fontSize: '0.82rem', color: '#E6E0D6', lineHeight: 1.6, textAlign: 'left' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <strong style={{ color: '#FDE047', display: 'block', marginBottom: '0.35rem' }}>1. Eligibility & Installments</strong>
                  <p>Open to Indian citizens aged 18+. Monthly installments must be paid consecutively on or before the 10th of every month. Grace period of 5 days applies.</p>
                </div>
                <div>
                  <strong style={{ color: '#FDE047', display: 'block', marginBottom: '0.35rem' }}>2. Showroom Bonus & Redemption</strong>
                  <p>Upon completing 11 regular installments, Rajesh Jewellers contributes the 12th installment as a 100% free bonus towards purchase of 22K hallmark gold or diamond jewellery at Sangmohal showroom.</p>
                </div>
                <div>
                  <strong style={{ color: '#FDE047', display: 'block', marginBottom: '0.35rem' }}>3. Making Charges & Taxes</strong>
                  <p>Jewellery selection is subject to standard artisan making charges and applicable 3% GST on the final invoice amount at the prevailing gold market rate on redemption day.</p>
                </div>
                <div>
                  <strong style={{ color: '#FDE047', display: 'block', marginBottom: '0.35rem' }}>4. Cancellation & Refunds</strong>
                  <p>In case of early cancellation before 11 months, deposited funds can be redeemed against gold jewellery equivalent to accumulated installments without the 12th month bonus.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default React.memo(SwarnaNidhiScheme);
