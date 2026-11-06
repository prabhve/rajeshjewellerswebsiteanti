import { useEffect } from 'react';

/**
 * Custom React hook `useScrollReveal`
 * Tracks section containers and elements with `.scroll-reveal` or provided selectors,
 * adding the `is-visible` class when they enter the viewport to trigger smooth CSS animations.
 *
 * @param {string} selector - CSS selector string for target elements
 * @param {object} options - IntersectionObserver configuration options
 */
export function useScrollReveal(
  selector = 'section, main > div, footer, .scroll-reveal',
  options = { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
) {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, options);

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      el.classList.add('scroll-reveal');
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [selector, options.threshold, options.rootMargin]);
}

export default useScrollReveal;
