import Globe from '~/assets/icons/globe.svg';
import styles from './index.module.scss';
import { LANGUAGES } from '~/interfaces/languages';
import router from 'next/router';

export const Internationality = () => {
  const handleLanguageChange = (language: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: language });
  };

  return (
    <div className={styles['overall-wrapper']}>
      <button className={styles['internationality-button']}>
        <Globe className={styles['globe-icon']} />
      </button>
      <div className={styles['language-dropdown']}>
        <ul className={styles['list']}>
          {LANGUAGES.map((language) => (
            <li className={styles['item']} key={language.key}>
              <button onClick={() => handleLanguageChange(language.key)}>
                {language.value}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
