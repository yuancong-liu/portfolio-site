'use client';

import {
  ReactNode,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

import { Analytics } from '@vercel/analytics/react';
import { Viewport } from 'next';

import '~/styles/globals.scss';
import { ColorSchemeContext } from '~/contexts/colorSchemeContext';

type Props = {
  children: ReactNode;
};

export const viewport: Viewport = {
  themeColor: '#132043',
};

const RootLayout = ({ children }: Props) => {
  const [scheme, setScheme] = useState<'light' | 'dark'>();
  const [preferredScheme, setPreferredScheme] = useState<'light' | 'dark'>();
  const [option, setOption] = useState<'system' | 'light' | 'dark'>('system');

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setPreferredScheme('dark');
      setScheme('dark');
    } else {
      setPreferredScheme('light');
      setScheme('light');
    }
  }, []);

  const setColorScheme = useCallback((nextScheme: 'light' | 'dark') => {
    setScheme(nextScheme);
  }, []);

  const contextValue = useMemo(
    () => ({
      colorScheme: scheme,
      setColorScheme,
      preferredScheme,
      option,
      setOption,
    }),
    [scheme, setColorScheme, preferredScheme, option],
  );

  return (
    <html lang="en">
      <body>
        <ColorSchemeContext.Provider value={contextValue}>
          {children}
        </ColorSchemeContext.Provider>
        <div className="common-background" />
      </body>
      <Analytics />
    </html>
  );
};

export default RootLayout;
