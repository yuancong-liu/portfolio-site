import React, { MouseEvent } from "react";
import styles from './index.module.scss';
import Typed from 'react-typed';
import { useTranslation } from "react-i18next";
import classNames from "classnames";

export const TopWelcome: React.FC = () => {

  const { t } = useTranslation();

  const handleCursorMove = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const mousePercentX = Math.round(e.clientX / windowWidth * 100);
    const mousePercentY = Math.round(e.clientY / windowHeight * 100);

    const pattern = document.getElementsByClassName('pattern')[0];
    pattern.setAttribute('style', `
      display: block;
      -webkit-mask-image: radial-gradient(circle at ${mousePercentX}% ${mousePercentY}%, black 20%, transparent 40%);
    `);
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
