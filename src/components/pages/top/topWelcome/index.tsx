import { FC, MouseEvent } from "react";
import Typed from 'react-typed';
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import styles from './index.module.scss';

export const TopWelcome: FC = () => {

  const { t } = useTranslation('common');

  const handleCursorMove = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    const pattern = document.getElementsByClassName('pattern')[0];

    const width = pattern.clientWidth;
    const height = pattern.clientHeight;

    const top = e.clientY - pattern.getBoundingClientRect().top;
    const left = e.clientX - pattern.getBoundingClientRect().left;

    const mousePercentX = Math.round(left / width * 100);
    const mousePercentY = Math.round(top / height * 100);

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
