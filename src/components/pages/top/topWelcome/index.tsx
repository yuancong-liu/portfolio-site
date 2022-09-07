import React, { MouseEvent } from "react";
import styles from './index.module.scss';
import Typed from 'react-typed';
import { useTranslation } from "react-i18next";
import classNames from "classnames";

export const TopWelcome: React.FC = () => {

  const { t } = useTranslation();

  const handleCursorMove = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pattern = document.getElementsByClassName('pattern')[0];
    console.log(e);
    pattern.setAttribute('style', `width: ${e.clientX}px; height: ${e.clientY}px;`);
  }

  return (
    <div onMouseMove={handleCursorMove} className={styles['top-welcome']}>
      <div className={styles['text']}>
        <Typed
          strings={[t('lobby.welcome')]}
          typeSpeed={40}
          smartBackspace
          loop
        />
      </div>
      <div  className={classNames('pattern', styles['pattern'])} />
      <div className={styles['rectangle']} />
    </div>
  )
}
