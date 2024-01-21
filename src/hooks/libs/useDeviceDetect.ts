'use client';
import { useLayoutEffect, useState } from 'react';

const BREAKPOINT = 768;

export const useDeviceDetect = () => {
  const [isPc, setIsPc] = useState<boolean | undefined>(undefined);

  const handleResize = () => {
    setIsPc(window.matchMedia(`(min-width: ${BREAKPOINT}px)`).matches);
  };

  useLayoutEffect(() => {
    if (typeof window === 'undefined') setIsPc(undefined);
    else {
      window.addEventListener('resize', handleResize);
      setIsPc(window.matchMedia(`(min-width: ${BREAKPOINT}px)`).matches);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isPc };
};
