'use client';

import { ChangeEvent, useState } from 'react';

import { useColorSchemeContext } from '~/contexts/colorSchemeContext';

import styles from './index.module.scss';

type Theme = 'system' | 'light' | 'dark';

export const ThemeRadio = () => {
  const { preferredColorScheme, option, setColorScheme, setOption } =
    useColorSchemeContext();
  const [value, setValue] = useState<Theme>(option);

  const handleSetTheme = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value as Theme;
    setValue(newValue);
    setOption?.(newValue);
    const nextScheme =
      newValue === 'system' ? preferredColorScheme ?? 'light' : newValue;
    setColorScheme?.(nextScheme);
  };

  return (
    <div className={styles['label-group']}>
      <label className={styles.label} htmlFor="theme-system">
        <input
          type="radio"
          name="theme"
          value="system"
          id="theme-system"
          checked={value === 'system'}
          onChange={handleSetTheme}
        />
        System
      </label>
      <label className={styles.label} htmlFor="theme-light">
        <input
          type="radio"
          name="theme"
          value="light"
          id="theme-light"
          checked={value === 'light'}
          onChange={handleSetTheme}
        />
        Light
      </label>
      <label className={styles.label} htmlFor="theme-dark">
        <input
          type="radio"
          name="theme"
          value="dark"
          id="theme-dark"
          checked={value === 'dark'}
          onChange={handleSetTheme}
        />
        Dark
      </label>
    </div>
  );
};
