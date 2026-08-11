import type { MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NAV_OFFSET = 72; // sticky-nav height so the section isn't hidden under it

// Scroll the window to the store-links section (#get).
function smoothScrollToGet() {
  const el = document.getElementById('get');
  if (!el) return;
  const target = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  // Native smooth scroll — honored by all evergreen browsers. Reduced-motion
  // users get an instant jump.
  window.scrollTo({ top: target, behavior: reduce ? 'auto' : 'smooth' });
}

/**
 * Click handler for every "Get the app" control. Scrolls to the store-links
 * section (#get). From another route it navigates home first, then scrolls.
 */
export function useGetApp() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (e?: MouseEvent) => {
    e?.preventDefault();
    if (pathname !== '/') {
      navigate('/');
      window.setTimeout(smoothScrollToGet, 160); // wait for the home route to mount
    } else {
      smoothScrollToGet();
    }
  };
}
