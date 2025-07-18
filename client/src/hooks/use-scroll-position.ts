import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';

// Global scroll position store
const scrollPositions = new Map<string, number>();

// Expose globally for navigation components
(window as any).scrollPositions = scrollPositions;

export function useScrollPosition(pageKey?: string) {
  const [location] = useLocation();
  const previousLocation = useRef<string>('');
  const currentPageKey = pageKey || location;

  useEffect(() => {
    // Save current scroll position when location changes
    if (previousLocation.current && previousLocation.current !== currentPageKey) {
      scrollPositions.set(previousLocation.current, window.scrollY);
    }

    // Handle scroll restoration or scroll to top
    const handleScrollPosition = () => {
      if (scrollPositions.has(currentPageKey)) {
        // Restore previous position
        const savedPosition = scrollPositions.get(currentPageKey);
        window.scrollTo(0, savedPosition || 0);
      } else {
        // Scroll to top for new page
        window.scrollTo(0, 0);
      }
    };

    // Use setTimeout to ensure DOM is fully rendered
    const timeoutId = setTimeout(handleScrollPosition, 50);

    // Update previous location
    previousLocation.current = currentPageKey;

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentPageKey]);

  // Save scroll position when component unmounts
  useEffect(() => {
    const handleBeforeUnload = () => {
      scrollPositions.set(currentPageKey, window.scrollY);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      // Save current position when component unmounts
      scrollPositions.set(currentPageKey, window.scrollY);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [currentPageKey]);

  return {
    saveScrollPosition: () => {
      scrollPositions.set(currentPageKey, window.scrollY);
    },
    restoreScrollPosition: () => {
      const savedPosition = scrollPositions.get(currentPageKey);
      if (savedPosition !== undefined) {
        window.scrollTo(0, savedPosition);
      }
    },
    clearScrollPosition: (key?: string) => {
      scrollPositions.delete(key || currentPageKey);
    }
  };
}