import { useEffect, useState } from 'react';
import { PORTRAIT_QUERY } from '../utils/device';

export function useOrientation(): boolean {
  const [isPortrait, setIsPortrait] = useState(() => window.matchMedia(PORTRAIT_QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(PORTRAIT_QUERY);
    const onChange = (event: MediaQueryListEvent) => setIsPortrait(event.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return isPortrait;
}