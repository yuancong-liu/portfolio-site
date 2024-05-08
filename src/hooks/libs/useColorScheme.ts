import { useCallback, useLayoutEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';
type DualTheme = 'light' | 'dark';

export const useColorScheme = () => {
  const [finalTheme, setFinalTheme] = useState<DualTheme>();
  const [preferredTheme, setPreferredTheme] = useState<DualTheme>();

  const updatePreferredTheme = useCallback((e: MediaQueryListEvent) => {
    const nextTheme = e.matches ? 'dark' : 'light';
    setPreferredTheme(nextTheme);
  }, []);

  useLayoutEffect(() => {
    setPreferredTheme(
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light',
    );
    window.matchMedia('(prefers-color-scheme: dark)').onchange =
      updatePreferredTheme;

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').onchange = null;
    };
  }, [updatePreferredTheme]);

  const setTheme = (theme: Theme) => {
    if (theme === 'system') {
      setFinalTheme(preferredTheme);
    } else {
      setFinalTheme(theme);
    }
  };

  return [finalTheme, setTheme] as const;
};
