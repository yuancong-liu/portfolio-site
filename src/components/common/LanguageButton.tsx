import React from 'react';

export interface LanguageButtonProps {
  sortKey: string
  name: string
  isPressed: boolean
  setLanguage: (key: string) => void
}

function LanguageButton(languageButtonProps: LanguageButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={languageButtonProps.isPressed}
      onClick={() => languageButtonProps.setLanguage(languageButtonProps.sortKey)}
    >
      <span>{languageButtonProps.name}</span>
    </button>
  )
}

export default LanguageButton