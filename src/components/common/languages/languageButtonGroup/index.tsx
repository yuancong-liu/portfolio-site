import React from 'react';
import styles from './index.module.scss';
import { LANGUAGES } from '~/interfaces/languages';
import { LanguageButton } from '../languageButton';
import classNames from 'classnames';

type Props = {
  language: string
  isShow: boolean
  setLanguage: (value: string) => void
  setIsShowLangButton: (value: boolean) => void
}

export const LanguageButtonGroup: React.FC<Props> = ({
  language,
  isShow,
  setLanguage,
  setIsShowLangButton,
}) => {
  const languageList = LANGUAGES.map(lang =>
    <LanguageButton
      key={lang.key}
      sortKey={lang.key}
      name={lang.value}
      isPressed={lang.key === language}
      setLanguage={setLanguage}
      setIsShowLangButton={setIsShowLangButton}
    />
  )

  return (
    <div className={classNames({ [styles['-hidden']]:!isShow }, styles['group-wrapper'])}>
      {languageList}
    </div>
  )
}
