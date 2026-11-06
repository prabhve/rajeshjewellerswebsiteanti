import React from 'react';
import { useJewellery } from '../context/JewelleryContext';
import { STORE_INFO } from '../data/storeInfo';
import { Star, ShieldCheck, Heart, Sparkles, Quote, ExternalLink } from 'lucide-react';

const CustomerTestimonials = () => {
  const { storeInfo } = useJewellery();
  const info = storeInfo || STORE_INFO;
  const reviews = info.googleReviews || STORE_INFO.googleReviews;

  return (
    <section className="testimonials-section" id="reviews-section">
      <div className="container">
        {/* Section Header */}
        <div className="testimonials-header">
          <span className="kicker-tag" style={{ justifyContent: 'center' }}>
            <Sparkles size={13} />
            Google Maps Verified Reviews • ग्राहकों का विश्वास
          </span>
          <h2>मिर्जापुर के परिवारों की पहली पसंद (Customer Stories)</h2>
          <p>
            Real reviews directly from our Google Business Profile in Sangmohal, Mirzapur. Experience 100% BIS 916 hallmarked pure jewellery and honest computerized billing.
          </p>

          {/* Aggregated Rating Badge */}
          <div className="google-rating-badge">
            <div className="rating-top-row">
              <div className="stars-cluster">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <span className="rating-score">{info.googleRating} / 5.0</span>
            </div>
            <div className="rating-sub-row">
              <ShieldCheck size={14} style={{ color: '#E5C378', flexShrink: 0 }} />
              <span className="rating-sub">Google Verified Mirzapur Showroom ({info.googleReviewCount} Reviews)</span>
            </div>
          </div>
        </div>

        {/* Real Testimonial Cards from Google Maps */}
        <div className="testimonials-grid">
          {reviews.map((review) => (
            <div key={review.id} className="testimonial-card">
              <div className="testimonial-quote-icon">
                <Quote size={28} />
              </div>

              {/* Stars & Tag */}
              <div className="testimonial-top-row">
                <div className="testimonial-stars">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <span className="testimonial-tag">{review.tag}</span>
              </div>

              {/* Review Text */}
              <p className="testimonial-body">
                "{review.comment}"
              </p>

              {/* Occasion / Time Label */}
              <div className="testimonial-occasion">
                <Heart size={12} className="occasion-icon" />
                <span>{review.occasion} • {review.timeAgo}</span>
              </div>

              {/* Author Footer */}
              <div className="testimonial-author">
                {review.avatar ? (
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="author-avatar-monogram"
                    loading="lazy"
                    decoding="async"
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="author-avatar-monogram">
                    {review.author[0]}
                  </div>
                )}
                <div className="author-meta">
                  <strong className="author-name">{review.author}</strong>
                  <span className="author-loc">Mirzapur, U.P.</span>
                </div>
                <div className="author-verified-badge" title="Verified Google Review">
                  <ShieldCheck size={14} />
                  <span>Google Review</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA for Customer Review */}
        <div className="testimonials-footer-cta">
          <p>Have you visited our Sangmohal, Mirzapur showroom recently?</p>
          <a
            href={STORE_INFO.googleReviewsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
            style={{ padding: '0.55rem 1.25rem', fontSize: '0.84rem' }}
          >
            <Star size={14} fill="#B88E2F" color="#B88E2F" />
            <span>Share Your Google Review</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default React.memo(CustomerTestimonials);
