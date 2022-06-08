import React from 'react';
import { languages } from '../../interface/interfaces';

export interface WakeLanguageProps {
  currentLanguage: string;
  setIsShowLangButton: (newValue: boolean) => void;
}

function WakeLanguage(wakeLanguageProps: WakeLanguageProps) {
  return (
    <button
      type="button"
      onClick={() => wakeLanguageProps.setIsShowLangButton(true)}
    >
      { languages.find(language => language.key === wakeLanguageProps.currentLanguage)!.value }
    </button>
  )
}

export default WakeLanguage