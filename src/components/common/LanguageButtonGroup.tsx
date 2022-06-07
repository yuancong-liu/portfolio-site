import React from 'react';
import { languages } from '../../interface/interfaces';
import LanguageButton from './LanguageButton';

export interface LanguageButtonGroupProps {
  language: string
  setLanguage: (value: string) => void
}

function LanguageButtonGroup(languageButtonGroupProps: LanguageButtonGroupProps) {
  const languageList = languages.map(lang =>
    <LanguageButton
      key={lang.key}
      sortKey={lang.key}
      name={lang.value}
      isPressed={lang.key === languageButtonGroupProps.language}
      setLanguage={languageButtonGroupProps.setLanguage}
    />
  )

  return (
    <div>
      {languageList}
    </div>
  )
}

export default LanguageButtonGroup