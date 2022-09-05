import React from 'react';
import styles from './index.module.scss';
import { languages } from '~/interfaces/languages';
import { LanguageButton } from '../languageButton';
import classNames from 'classnames';

type Props = {
  language: string
  isShow: boolean
  setLanguage: (value: string) => void
  setIsShowLangButton: (value: boolean) => void
}

export const LanguageButtonGroup: React.FC<Props> = (props: Props) => {
  const languageList = languages.map(lang =>
    <LanguageButton
      key={lang.key}
      sortKey={lang.key}
      name={lang.value}
      isPressed={lang.key === props.language}
      setLanguage={props.setLanguage}
      setIsShowLangButton={props.setIsShowLangButton}
    />
  )

  return (
    <div className={classNames({ [styles['-hidden']]:!props.isShow }, styles['group-wrapper'])}>
      {languageList}
    </div>
  )
}
