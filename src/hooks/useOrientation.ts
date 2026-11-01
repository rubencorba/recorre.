import { useEffect, useState } from 'react';
import { PORTRAIT_QUERY } from '../utils/device';

/**
 * Tracks whether the viewport is currently in portrait orientation.
 * Combine it with isMobileUserAgent() where it only matters on phones.
 */
export function useOrientation(): boolean {
  const [isPortrait, setIsPortrait] = useState<boolean>(
    () => typeof window !== 'undefined' && window.matchMedia(PORTRAIT_QUERY).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(PORTRAIT_QUERY);

    const handleChange = (event: MediaQueryList | MediaQueryListEvent) => {
      setIsPortrait(event.matches);
    };

    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isPortrait;
}