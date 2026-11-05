import React, { useState } from 'react';
import { useJewellery } from '../context/JewelleryContext';
import { X, Sparkles, ArrowRight, RotateCcw, Check } from 'lucide-react';

const RECIPIENTS = [
  { id: 'partner', label: 'Wife / Partner', sub: 'Romantic & Timeless', icon: '👰' },
  { id: 'mother', label: 'Mother', sub: 'Divine & Traditional', icon: '👵' },
  { id: 'sister', label: 'Daughter / Sister', sub: 'Modern & Delicate', icon: '👧' },
  { id: 'groom', label: 'Husband / Brother', sub: 'Prestigious & Bold', icon: '🤴' },
  { id: 'self', label: 'Myself', sub: 'Personal Reward', icon: '✨' }
];

const OCCASIONS = [
  { id: 'bridal', label: 'Wedding / Lagan', sub: 'Bridal Heirloom', icon: '💍', categoryFilter: 'bridal' },
  { id: 'anniversary', label: 'Anniversary / Love', sub: 'Solitaires & Rings', icon: '❤️', categoryFilter: 'diamond' },
  { id: 'festive', label: 'Dhanteras & Diwali', sub: 'Coins & Temple Gold', icon: '🪔', categoryFilter: 'coins' },
  { id: 'everyday', label: 'Birthday / Milestone', sub: 'Jhumkas & Chains', icon: '🎂', categoryFilter: 'everyday' },
  { id: 'all', label: 'Any Auspicious Day', sub: 'All Collections', icon: '🌸', categoryFilter: 'all' }
];

const BUDGETS = [
  { id: 'under-50k', label: 'Under ₹50,000', sub: 'Daily Rings, Earrings & Coins', max: 50000 },
  { id: '50k-150k', label: '₹50,000 - ₹1.5 Lakh', sub: 'Chains, Solitaires, Light Necklaces', min: 50000, max: 150000 },
  { id: '150k-300k', label: '₹1.5L - ₹3 Lakh', sub: 'Filigree Chokers & Diamond Sets', min: 150000, max: 300000 },
  { id: 'above-300k', label: 'Above ₹3 Lakh', sub: 'Bridal Polki & Heavy Heritage', min: 300000 }
];

const GiftFinderModal = () => {
  const {
    isGiftWizardOpen,
    setIsGiftWizardOpen,
    setActiveCategory,
    setActiveBudget,
    setActiveOccasion,
    showToast
  } = useJewellery();

  const [step, setStep] = useState(1);
  const [selectedRecipient, setSelectedRecipient] = useState('partner');
  const [selectedOccasion, setSelectedOccasion] = useState('bridal');
  const [selectedBudget, setSelectedBudget] = useState('50k-150k');

  if (!isGiftWizardOpen) return null;

  const currentRecipientObj = RECIPIENTS.find((r) => r.id === selectedRecipient);
  const currentOccasionObj = OCCASIONS.find((o) => o.id === selectedOccasion);
  const currentBudgetObj = BUDGETS.find((b) => b.id === selectedBudget);

  const handleApplyGiftFilter = () => {
    // Apply matching filters
    const occObj = OCCASIONS.find((o) => o.id === selectedOccasion);
    if (occObj && occObj.categoryFilter !== 'all') {
      setActiveCategory(occObj.categoryFilter);
    } else {
      setActiveCategory('all');
    }

    setActiveBudget(selectedBudget);
    setActiveOccasion(selectedOccasion === 'anniversary' ? 'gifting' : (selectedOccasion === 'all' ? 'all' : selectedOccasion));

    setIsGiftWizardOpen(false);
    showToast('🎁 Gift matches filtered in catalog below!');

    // Smooth scroll to catalog
    const catalog = document.getElementById('catalog-section');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedRecipient('partner');
    setSelectedOccasion('bridal');
    setSelectedBudget('50k-150k');
  };

  return (
    <div
      className="modal-overlay active"
      onClick={() => setIsGiftWizardOpen(false)}
      style={{
        zIndex: 2900,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <div
        className="modal-card gift-wizard-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(180deg, #18050D 0%, #0B0205 100%)',
          borderRadius: '18px',
          border: '1.5px solid rgba(229, 195, 120, 0.4)',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.95), 0 0 50px rgba(229, 195, 120, 0.2)',
          overflow: 'hidden'
        }}
      >
        {/* Close Button */}
        <button
          className="drawer-close-btn"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 10,
            width: '34px',
            height: '34px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(229, 195, 120, 0.35)',
            borderRadius: '8px',
            color: '#E5C378',
            cursor: 'pointer'
          }}
          onClick={() => setIsGiftWizardOpen(false)}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Wizard Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #200611 0%, #100207 100%)',
            padding: '1.5rem 1.75rem 1.25rem',
            borderBottom: '1.5px solid rgba(229, 195, 120, 0.25)',
            position: 'relative',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.45rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '0.25rem 0.75rem',
                borderRadius: '999px',
                background: 'rgba(229, 195, 120, 0.15)',
                border: '1px solid rgba(229, 195, 120, 0.4)',
                color: '#FFF0C2'
              }}
            >
              <Sparkles size={12} style={{ color: '#E5C378' }} /> BlueStone & CaratLane Gifting Standard
            </span>
          </div>

          <h2
            style={{
              fontSize: '1.55rem',
              margin: '0.25rem 0',
              color: '#FFFDF9',
              fontFamily: 'var(--font-serif-royal), Cinzel, Georgia, serif',
              fontWeight: 700,
              letterSpacing: '0.02em',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)'
            }}
          >
            Find the Perfect Jewellery Gift
          </h2>

          <p style={{ fontSize: '0.86rem', color: '#D4C5B3', margin: '0.25rem 0 0', lineHeight: 1.4 }}>
            Answer 3 quick questions. We'll handpick hallmarked masterpieces from our Sangmohal showroom.
          </p>

          {/* Stepper Progress Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.15rem' }}>
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                style={{
                  flex: 1,
                  height: '4px',
                  borderRadius: '3px',
                  background:
                    step >= s
                      ? 'linear-gradient(90deg, #FFF6D6 0%, #E5C378 100%)'
                      : 'rgba(255, 255, 255, 0.12)',
                  boxShadow: step >= s ? '0 0 10px rgba(229, 195, 120, 0.5)' : 'none',
                  transition: 'background 0.3s ease'
                }}
              />
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.78rem',
              marginTop: '0.45rem'
            }}
          >
            <span
              style={{
                color: step === 1 ? '#FFFDF9' : (step > 1 ? '#E5C378' : '#8A8074'),
                fontWeight: step === 1 ? 800 : 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              {step > 1 && <Check size={12} style={{ color: '#E5C378' }} />} 1. Recipient
            </span>
            <span
              style={{
                color: step === 2 ? '#FFFDF9' : (step > 2 ? '#E5C378' : '#8A8074'),
                fontWeight: step === 2 ? 800 : 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              {step > 2 && <Check size={12} style={{ color: '#E5C378' }} />} 2. Occasion
            </span>
            <span
              style={{
                color: step === 3 ? '#FFFDF9' : '#8A8074',
                fontWeight: step === 3 ? 800 : 600
              }}
            >
              3. Budget
            </span>
          </div>
        </div>

        {/* Wizard Body (Scrollable if height constrained) */}
        <div
          style={{
            padding: '1.35rem 1.75rem',
            overflowY: 'auto',
            flex: 1
          }}
        >
          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <div style={{ marginBottom: '1.15rem' }}>
                <h3
                  style={{
                    fontSize: '1.15rem',
                    color: '#FFFDF9',
                    margin: '0 0 0.25rem',
                    fontFamily: 'var(--font-serif-headline), Georgia, serif',
                    fontWeight: 700
                  }}
                >
                  Step 1: Who are you shopping for?
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#BFA888', margin: 0 }}>
                  Select the special person receiving this precious memory.
                </p>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(115px, 1fr))',
                  gap: '0.75rem'
                }}
              >
                {RECIPIENTS.map((rec) => {
                  const isSelected = selectedRecipient === rec.id;
                  return (
                    <div
                      key={rec.id}
                      onClick={() => setSelectedRecipient(rec.id)}
                      style={{
                        cursor: 'pointer',
                        padding: '1.1rem 0.65rem',
                        borderRadius: '12px',
                        border: isSelected
                          ? '2px solid #E5C378'
                          : '1.5px solid rgba(229, 195, 120, 0.22)',
                        background: isSelected
                          ? 'rgba(229, 195, 120, 0.16)'
                          : 'rgba(255, 255, 255, 0.035)',
                        textAlign: 'center',
                        transition: 'all 0.2s ease',
                        transform: isSelected ? 'translateY(-2px)' : 'none',
                        boxShadow: isSelected
                          ? '0 6px 20px rgba(229, 195, 120, 0.25)'
                          : 'none'
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>{rec.icon}</div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          color: isSelected ? '#FFFDF9' : '#E6E0D6',
                          lineHeight: 1.25
                        }}
                      >
                        {rec.label}
                      </div>
                      <div
                        style={{
                          fontSize: '0.74rem',
                          color: isSelected ? '#DFBE6B' : '#A89E90',
                          marginTop: '0.25rem',
                          lineHeight: 1.3
                        }}
                      >
                        {rec.sub}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <div style={{ marginBottom: '1.15rem' }}>
                <h3
                  style={{
                    fontSize: '1.15rem',
                    color: '#FFFDF9',
                    margin: '0 0 0.25rem',
                    fontFamily: 'var(--font-serif-headline), Georgia, serif',
                    fontWeight: 700
                  }}
                >
                  Step 2: What is the special occasion?
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#BFA888', margin: 0 }}>
                  Every auspicious moment has a signature jewellery style.
                </p>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(115px, 1fr))',
                  gap: '0.75rem'
                }}
              >
                {OCCASIONS.map((occ) => {
                  const isSelected = selectedOccasion === occ.id;
                  return (
                    <div
                      key={occ.id}
                      onClick={() => setSelectedOccasion(occ.id)}
                      style={{
                        cursor: 'pointer',
                        padding: '1.1rem 0.65rem',
                        borderRadius: '12px',
                        border: isSelected
                          ? '2px solid #E5C378'
                          : '1.5px solid rgba(229, 195, 120, 0.22)',
                        background: isSelected
                          ? 'rgba(229, 195, 120, 0.16)'
                          : 'rgba(255, 255, 255, 0.035)',
                        textAlign: 'center',
                        transition: 'all 0.2s ease',
                        transform: isSelected ? 'translateY(-2px)' : 'none',
                        boxShadow: isSelected
                          ? '0 6px 20px rgba(229, 195, 120, 0.25)'
                          : 'none'
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>{occ.icon}</div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          color: isSelected ? '#FFFDF9' : '#E6E0D6',
                          lineHeight: 1.25
                        }}
                      >
                        {occ.label}
                      </div>
                      <div
                        style={{
                          fontSize: '0.74rem',
                          color: isSelected ? '#DFBE6B' : '#A89E90',
                          marginTop: '0.25rem',
                          lineHeight: 1.3
                        }}
                      >
                        {occ.sub}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              <div style={{ marginBottom: '1.15rem' }}>
                <h3
                  style={{
                    fontSize: '1.15rem',
                    color: '#FFFDF9',
                    margin: '0 0 0.25rem',
                    fontFamily: 'var(--font-serif-headline), Georgia, serif',
                    fontWeight: 700
                  }}
                >
                  Step 3: What is your comfortable budget?
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#BFA888', margin: 0 }}>
                  100% transparent pricing with no hidden charges.
                </p>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '0.75rem'
                }}
              >
                {BUDGETS.map((bud) => {
                  const isSelected = selectedBudget === bud.id;
                  return (
                    <div
                      key={bud.id}
                      onClick={() => setSelectedBudget(bud.id)}
                      style={{
                        cursor: 'pointer',
                        padding: '1.15rem 1.1rem',
                        borderRadius: '12px',
                        border: isSelected
                          ? '2px solid #E5C378'
                          : '1.5px solid rgba(229, 195, 120, 0.22)',
                        background: isSelected
                          ? 'rgba(229, 195, 120, 0.16)'
                          : 'rgba(255, 255, 255, 0.035)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.85rem',
                        transition: 'all 0.2s ease',
                        boxShadow: isSelected
                          ? '0 6px 20px rgba(229, 195, 120, 0.22)'
                          : 'none'
                      }}
                    >
                      <div
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          border: isSelected
                            ? '6px solid #E5C378'
                            : '2px solid rgba(229, 195, 120, 0.35)',
                          background: isSelected ? '#FFFDF9' : 'transparent',
                          flexShrink: 0
                        }}
                      />
                      <div>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: '0.98rem',
                            color: isSelected ? '#FFFDF9' : '#E6E0D6'
                          }}
                        >
                          {bud.label}
                        </div>
                        <div
                          style={{
                            fontSize: '0.78rem',
                            color: isSelected ? '#DFBE6B' : '#A89E90',
                            marginTop: '0.15rem'
                          }}
                        >
                          {bud.sub}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Live Selection Summary Tag */}
          <div
            style={{
              marginTop: '1.25rem',
              padding: '0.65rem 1rem',
              borderRadius: '8px',
              background: 'rgba(229, 195, 120, 0.08)',
              border: '1px solid rgba(229, 195, 120, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.5rem',
              fontSize: '0.8rem',
              color: '#D4C5B3'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span style={{ color: '#E5C378', fontWeight: 700 }}>Your Selections:</span>
              <span>{currentRecipientObj?.icon} {currentRecipientObj?.label}</span>
              {step >= 2 && (
                <>
                  <span style={{ color: 'rgba(229, 195, 120, 0.5)' }}>•</span>
                  <span>{currentOccasionObj?.icon} {currentOccasionObj?.label}</span>
                </>
              )}
              {step >= 3 && (
                <>
                  <span style={{ color: 'rgba(229, 195, 120, 0.5)' }}>•</span>
                  <span style={{ color: '#FFFDF9', fontWeight: 600 }}>{currentBudgetObj?.label}</span>
                </>
              )}
            </div>
            <span style={{ fontSize: '0.74rem', color: '#BFA888' }}>
              Step {step} of 3
            </span>
          </div>
        </div>

        {/* Pinned Navigation Controls Footer (Always Visible) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.75rem',
            background: 'rgba(14, 2, 6, 0.98)',
            borderTop: '1.5px solid rgba(229, 195, 120, 0.25)',
            flexShrink: 0
          }}
        >
          {step > 1 ? (
            <button
              type="button"
              style={{
                padding: '0.6rem 1.25rem',
                fontSize: '0.86rem',
                fontWeight: 600,
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1.5px solid rgba(229, 195, 120, 0.35)',
                color: '#FFFDF9',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s ease'
              }}
              onClick={() => setStep(step - 1)}
            >
              ← Back
            </button>
          ) : (
            <button
              type="button"
              style={{
                padding: '0.6rem 1.25rem',
                fontSize: '0.86rem',
                fontWeight: 600,
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1.5px solid rgba(229, 195, 120, 0.35)',
                color: '#FFFDF9',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s ease'
              }}
              onClick={handleReset}
            >
              <RotateCcw size={13} style={{ color: '#E5C378' }} /> Reset
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              style={{
                padding: '0.7rem 1.6rem',
                fontSize: '0.92rem',
                fontWeight: 800,
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #FFF6D6 0%, #E5C378 40%, #C59D3F 100%)',
                color: '#080103',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 16px rgba(229, 195, 120, 0.35)',
                transition: 'all 0.2s ease'
              }}
              onClick={() => setStep(step + 1)}
            >
              <span>Next Step</span>
              <ArrowRight size={15} />
            </button>
          ) : (
            <button
              type="button"
              style={{
                padding: '0.75rem 1.85rem',
                fontSize: '0.96rem',
                fontWeight: 800,
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #FFF6D6 0%, #E5C378 35%, #C59D3F 100%)',
                color: '#080103',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                boxShadow: '0 6px 22px rgba(229, 195, 120, 0.5)',
                transition: 'all 0.2s ease'
              }}
              onClick={handleApplyGiftFilter}
            >
              <Sparkles size={16} />
              <span>Show My Perfect Gifts</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GiftFinderModal;
