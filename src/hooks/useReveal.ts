import { useEffect, useRef, useState } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Reveals an element once when it scrolls into view. Returns a ref to attach
 * and a boolean that flips to true on first intersection. If the user prefers
 * reduced motion, it starts visible so nothing is hidden.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (shown) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setShown(true); return; }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { setShown(true); obs.disconnect(); }
      });
    }, options);
    obs.observe(el);
    // Safety net: never leave content hidden if the observer doesn't fire
    // (some embedded/automation browsers skip IO on programmatic scroll).
    const fallback = window.setTimeout(() => setShown(true), 1600);
    return () => { obs.disconnect(); window.clearTimeout(fallback); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, shown };
}
