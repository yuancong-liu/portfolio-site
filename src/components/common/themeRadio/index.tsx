'use client';

import { useState } from 'react';

import styles from './index.module.scss';

type Theme = 'system' | 'light' | 'dark';

export const ThemeRadio = () => {
  const [theme, setTheme] = useState<Theme>('system');

  return (
    <div className={styles['label-group']}>
      <label htmlFor="theme-system">
        <input
          type="radio"
          name="theme"
          value="system"
          id="theme-system"
          checked={theme === 'system'}
          onChange={() => setTheme('system')}
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
          onChange={() => setTheme('light')}
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
          onChange={() => setTheme('dark')}
        />
        Dark
      </label>
    </div>
  );
};
