import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { LANGUAGES } from '~/interfaces/languages';
import { LanguageButtonGroup } from '../languageButtonGroup';
import { useState } from 'react';


type Props = {
  currentLanguage: string;
  setLanguage: (language: string) => void;
}

export const Language: React.FC<Props> = ({
  currentLanguage,
  setLanguage,
}) => {

  const [isShowLangButton, setIsShowLangButton] = useState(false)

  return (
    <div className={styles['overall-wrapper']}>
      <div className={classNames({ [styles['-no-circle']]:isShowLangButton }, styles['button-wrapper'])}>
        <button
          type="button"
          className={classNames(currentLanguage, styles[currentLanguage], styles['button'])}
          onClick={() => setIsShowLangButton(!isShowLangButton)}
        >
          { LANGUAGES.find(language => language.key === currentLanguage)?.value }
        </button>
      </div>
      <LanguageButtonGroup
        language={currentLanguage}
        setLanguage={setLanguage}
        setIsShowLangButton={setIsShowLangButton}
        isShow={isShowLangButton}
      />
    </div>
  )
}
