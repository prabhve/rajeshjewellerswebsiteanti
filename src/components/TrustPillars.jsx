import React from 'react';
import { ShieldCheck, Award, RefreshCw, FileText, Heart } from 'lucide-react';

const PILLARS_LIST = [
  {
    icon: ShieldCheck,
    title: '100% BIS 916 HUID',
    desc: 'Every gold item carries the government BIS hallmark & unique 6-digit laser HUID code.'
  },
  {
    icon: Award,
    title: 'Karatmeter Testing',
    desc: 'Non-destructive computerized purity checking machine available free for all walk-ins.'
  },
  {
    icon: RefreshCw,
    title: 'Lifetime Buyback',
    desc: 'Guaranteed lifetime exchange and buyback at prevailing market rates with full transparency.'
  },
  {
    icon: FileText,
    title: 'Computerized Tax Bill',
    desc: 'Clear separation of gold rate, net weight, making charge, and GST for complete peace of mind.'
  },
  {
    icon: Heart,
    title: 'Mirzapur Heritage Trust',
    desc: 'Generations of personalized family relationship, ethical trade, and warm hospitality.'
  }
];

const TrustPillars = () => {
  return (
    <section className="trust-bright-section" id="trust">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
          <span className="kicker-tag" style={{ letterSpacing: '0.12em', fontSize: '0.72rem', textTransform: 'uppercase' }}>
            THE RAJESH JEWELLERS PROMISE
          </span>
          <h2 style={{ fontSize: '2.3rem', fontFamily: 'var(--font-hindi-heading)', margin: '0.4rem 0 0.2rem', color: '#FFFDF9', fontWeight: 700 }}>
            हमारी पाँच स्वर्ण प्रतिज्ञाएँ
          </h2>
          <span style={{ display: 'block', fontSize: '1.05rem', fontFamily: 'var(--font-serif-headline)', color: '#E5C378', fontStyle: 'italic', marginBottom: '0.75rem', letterSpacing: '0.04em' }}>
            Five Pillars of Trust
          </span>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
            Why thousands of families across Mirzapur trust Rajesh Jewellers for their most sacred celebrations.
          </p>
        </div>

        <div className="pillars-5-grid">
          {PILLARS_LIST.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="pillar-bright-card">
                <div className="pillar-icon-wrap">
                  <IconComponent size={22} style={{ color: 'var(--brand-plum)' }} />
                </div>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.35rem', color: 'var(--brand-plum)' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default React.memo(TrustPillars);
