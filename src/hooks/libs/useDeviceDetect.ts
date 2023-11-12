'use client';
import { useMediaQuery } from 'react-responsive';

const BREAKPOINT = 768;

export const useDeviceDetect = () => {
  const isPc = useMediaQuery({
    query: `(min-width: ${BREAKPOINT}px)`,
  });

  if (typeof window === 'undefined') return { isPc: undefined };

  return { isPc };
};
