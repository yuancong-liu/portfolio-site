import { useEffect, useState } from 'react';

const BREAKPOINT = 768;

export const useDeviceDetect = () => {
  const [isPc, setIsPc] = useState<boolean | undefined>(undefined);

  const handleResize = () =>
    setIsPc(window.matchMedia(`(min-width: ${BREAKPOINT}px)`).matches);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  return isPc;
};
