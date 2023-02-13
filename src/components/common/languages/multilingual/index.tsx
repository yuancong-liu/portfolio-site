import { FC } from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import { languages } from '~/interfaces/languages';
import { LanguageButtonGroup } from '../languageButtonGroup';
import styles from './index.module.scss';


type Props = {
  currentLanguage: string;
  setLanguage: (language: string) => void;
}

export const Language: FC<Props> = ({
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
          { languages.find(language => language.key === currentLanguage)?.value }
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
