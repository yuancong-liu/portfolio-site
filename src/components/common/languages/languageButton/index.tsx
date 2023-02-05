import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import router from 'next/router';

type Props = {
  sortKey: string
  name: string
  isPressed: boolean
  setLanguage: (key: string) => void
  setIsShowLangButton: (newValue: boolean) => void;
}

export const LanguageButton: React.FC<Props> = ({
  sortKey,
  name,
  isPressed,
  setLanguage,
  setIsShowLangButton,
}) => {
  const handleClick = () => {
    const { pathname, asPath, query } = router;
    setLanguage(sortKey);
    setIsShowLangButton(false);
    router.push({ pathname, query }, asPath, { locale: sortKey });
  }

  return (
    <>
      { !isPressed ? 
        <div className={styles['button-wrapper']}>
          <button
            className={classNames(sortKey, styles[sortKey], styles['lang-button'])}
            type="button"
            aria-pressed={isPressed}
            onClick={() => handleClick()}
          >
            <span>{ name }</span>
          </button>
        </div> : <></>
      }
    </>
  )
}
