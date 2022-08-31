import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { languages } from '~/interface/languages';
import { LanguageButtonGroup } from '../languageButtonGroup';
import { useState } from 'react';


type Props = {
  currentLanguage: string;
  setLanguage: (language: string) => void;
}

export const Language: React.FC<Props> = (props: Props) => {

  const [isShowLangButton, setIsShowLangButton] = useState(false)

  return (
    <div className={styles['overall-wrapper']}>
      <div className={classNames({ [styles['-no-circle']]:isShowLangButton }, styles['button-wrapper'])}>
        <button
          type="button"
          className={classNames(props.currentLanguage, styles[props.currentLanguage], styles['button'])}
          onClick={() => setIsShowLangButton(!isShowLangButton)}
        >
          { languages.find(language => language.key === props.currentLanguage)?.value }
        </button>
      </div>
      <LanguageButtonGroup
        language={props.currentLanguage}
        setLanguage={props.setLanguage}
        setIsShowLangButton={setIsShowLangButton}
        isShow={isShowLangButton}
      />
    </div>
  )
}
