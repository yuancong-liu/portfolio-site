import React from 'react';

export interface LanguageButtonProps {
  sortKey: string
  name: string
  isPressed: boolean
  setLanguage: (key: string) => void
  setIsShowLangButton: (newValue: boolean) => void;
}

function LanguageButton(languageButtonProps: LanguageButtonProps) {

  function handleClick() {
    languageButtonProps.setLanguage(languageButtonProps.sortKey)
    languageButtonProps.setIsShowLangButton(false)
  }

  return (
    <>
      { !languageButtonProps.isPressed ? 
        <button
          type="button"
          aria-pressed={languageButtonProps.isPressed}
          onClick={() => handleClick()}
        >
          <span>{ languageButtonProps.name }</span>
        </button> : <></>
      }
    </>
  )
}

export default LanguageButton