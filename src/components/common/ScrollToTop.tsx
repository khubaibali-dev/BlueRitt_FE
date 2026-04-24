import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Check if we should skip scroll to top (e.g., when navigating to specific settings tabs)
    const searchParams = new URLSearchParams(search);
    if (pathname.includes('/settings') && searchParams.has('tab')) {
      return;
    }

    // Scroll the window (for non-dashboard layouts)
    window.scrollTo(0, 0);
    
    // Scroll the main content area (for dashboard layouts with internal scrolling)
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.scrollTo(0, 0);
    }
  }, [pathname, search]);

  return null;
}
