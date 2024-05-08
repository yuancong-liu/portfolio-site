'use client';

import { ChangeEvent, useState } from 'react';

import { useColorScheme } from '~/hooks';

import styles from './index.module.scss';

type Theme = 'system' | 'light' | 'dark';

export const ThemeRadio = () => {
  const [theme, setTheme] = useState<Theme>('system');
  const [, setUserTheme] = useColorScheme();

  const handleThemeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextTheme = e.target.value as Theme;
    setTheme(nextTheme);
    setUserTheme(nextTheme);
  }

  return (
    <div className={styles['label-group']}>
      <label htmlFor="theme-system">
        <input
          type="radio"
          name="theme"
          value="system"
          id="theme-system"
          checked={theme === 'system'}
          onChange={handleThemeChange}
        />
        System
      </label>
      <label htmlFor="theme-light">
        <input
          type="radio"
          name="theme"
          value="light"
          id="theme-light"
          checked={theme === 'light'}
          onChange={handleThemeChange}
        />
        Light
      </label>
      <label htmlFor="theme-dark">
        <input
          type="radio"
          name="theme"
          value="dark"
          id="theme-dark"
          checked={theme === 'dark'}
          onChange={handleThemeChange}
        />
        Dark
      </label>
    </div>
  );
};
