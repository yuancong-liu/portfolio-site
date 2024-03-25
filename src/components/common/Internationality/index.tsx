import router from 'next/router';

import Globe from '~/assets/icons/globe.svg';
import { LANGUAGES } from '~/interfaces/languages';

import styles from './index.module.scss';

export const Internationality = () => {
  const handleLanguageChange = (language: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: language });
  };

  return (
    <div className={styles['overall-wrapper']}>
      <button
        type="button"
        aria-label="Languages"
        className={styles['internationality-button']}
      >
        <Globe className={styles['globe-icon']} />
      </button>
      <div className={styles['language-dropdown']}>
        <ul className={styles.list}>
          {LANGUAGES.map((language) => (
            <li className={styles.item} key={language.key}>
              <button
                aria-label={language.value}
                onClick={() => handleLanguageChange(language.key)}
                type="button"
              >
                {language.value}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
