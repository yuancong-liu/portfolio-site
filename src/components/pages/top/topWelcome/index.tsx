import React from "react";
import styles from './index.module.scss';
import Typed from 'react-typed';
import { useTranslation } from "react-i18next";

export const TopWelcome: React.FC = () => {

  const { t } = useTranslation();

  return (
    <div className={styles['top-welcome']}>
      <div className={styles['text']}>
        <Typed
          strings={[t('lobby.welcome')]}
          typeSpeed={40}
          smartBackspace
          loop
        />
      </div>
      <div className={styles['rectangle']} />
    </div>
  )
}
