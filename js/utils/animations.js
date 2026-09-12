// ============================================================
// SCROLL ANIMATIONS — Intersection Observer
// ============================================================

/**
 * Initialize scroll-reveal animations for elements with .animate-on-scroll
 * Call this after page content is rendered.
 */
export function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll:not(.is-visible)');

  if (elements.length === 0) return;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Show all elements immediately
    elements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  elements.forEach(el => observer.observe(el));
}

// Make globally available for router
window.initScrollAnimations = initScrollAnimations;

/**
 * Create stagger classes for children of a container
 */
export function addStaggerClasses(containerSelector, childSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const children = container.querySelectorAll(childSelector);
  children.forEach((child, i) => {
    if (i < 6) {
      child.classList.add(`stagger-${i + 1}`);
    }
  });
}
