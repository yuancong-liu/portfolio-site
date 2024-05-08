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
    window.matchMedia('(prefers-color-scheme: dark)').onchange =
      updatePreferredTheme;

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').onchange = null;
    };
  }, [updatePreferredTheme]);

  const setTheme = useCallback((theme: Theme) => {
    if (theme === 'system') {
      setFinalTheme(preferredTheme);
    } else {
      setFinalTheme(theme);
    }
  }, [preferredTheme]);

  return [finalTheme, setTheme] as const;
};
