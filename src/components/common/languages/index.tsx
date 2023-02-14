import { FC, useMemo } from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import router from 'next/router';
import { languages } from '~/interfaces/languages';
import styles from './index.module.scss';

type Props = {
  currentLanguage: string;
  setLanguage: (language: string) => void;
};

export const Languages: FC<Props> = ({ currentLanguage, setLanguage }) => {
  const [showButtonGroup, setShowButtonGroup] = useState(false);

  const buttonList = useMemo(() => {
    const handleChangeLanguage = (language: string) => {
      const { pathname, asPath, query } = router;
      setLanguage(language);
      setShowButtonGroup(false);
      router.push({ pathname, query }, asPath, { locale: language });
    };

    return languages.map((language) => {
      return (
        currentLanguage !== language.key && (
          <div className={styles['list-button']} key={language.key}>
            <button
              className={classNames(
                language.key,
                styles[language.key],
                styles['button']
              )}
              type="button"
              onClick={() => handleChangeLanguage(language.key)}
            >
              {language.value}
            </button>
          </div>
        )
      );
    });
  }, [currentLanguage, setLanguage]);

  return (
    <div className={styles['overall-wrapper']}>
      <div
        className={classNames(
          { [styles['-no-circle']]: showButtonGroup },
          styles['button-wrapper']
        )}
      >
        <button
          type="button"
          className={classNames(
            currentLanguage,
            styles[currentLanguage],
            styles['button']
          )}
          onClick={() => setShowButtonGroup(!showButtonGroup)}
        >
          {
            languages.find((language) => language.key === currentLanguage)
              ?.value
          }
        </button>
      </div>
      <div
        className={classNames(
          { [styles['-hidden']]: !showButtonGroup },
          styles['button-group']
        )}
      >
        {buttonList}
      </div>
    </div>
  );
};
