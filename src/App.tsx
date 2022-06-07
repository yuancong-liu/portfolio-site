import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import IndexPage from './components/pages/index/IndexPage';
import LoadingPage from './components/pages/loading/LoadingPage';
import LanguageButtonGroup from './components/common/LanguageButtonGroup';
import i18n from './locales/init';
import NotFound from "./components/pages/notFound/NotFound";

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
      <Router>
        <Routes>
          <Route path='/' element={ isLoading ? <LoadingPage /> : <IndexPage />} />
          <Route path='/profile' element={ <IndexPage /> } />
          <Route path='/portfolio' element={ <IndexPage /> } />
          <Route path='/blog' element={ <IndexPage /> } />
          <Route path='*' element={ <NotFound /> } />
        </Routes>
      </Router>
      
      <LanguageButtonGroup 
        language={language}
        setLanguage={setLanguage}
      />
    </>
  );
}

export default App;
