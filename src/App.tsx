import React, { useEffect, useState } from 'react';
import IndexPage from './components/pages/index/IndexPage';
import LoadingPage from './components/pages/loading/LoadingPage';
import LanguageButtonGroup from './components/common/LanguageButtonGroup';
import i18n from './locales/init';

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [language, setLanguage] = useState('en')
  
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, [])

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  return (
    <>
      { isLoading ? <LoadingPage /> : <IndexPage />}
      <LanguageButtonGroup 
        language={language}
        setLanguage={setLanguage}
      />
    </>
  );
}

export default App;
