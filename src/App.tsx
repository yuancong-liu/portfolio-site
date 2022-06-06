import React, { useEffect, useState } from 'react';
import LanguageButton from './components/common/LanguageButton';
import IndexPage from './components/pages/index/IndexPage';
import LoadingPage from './components/pages/loading/LoadingPage';
import i18n from './locales/init';

enum languages {
  en = 'en',
  ja = 'あ',
  tc = '繁',
  sc = '简',
  kr = '한'
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [language, setLanguage] = useState('en')
  
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, [])

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  const languageList = languages.forEach(lang =>
    <LanguageButton
      key={lang.key}
      name={lang.value}
      isPressed={lang.key === language}
      setLanguage={setLanguage}
    />
  ))

  return (
    <>
      { isLoading ? <LoadingPage /> : <IndexPage />}
      <div>
        {languageList}
      </div>
    </>
  );
}

export default App;
