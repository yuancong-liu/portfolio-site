import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { MongoClient } from "mongodb";
import IndexPage from './components/pages/index/IndexPage';
import LoadingPage from './components/pages/loading/LoadingPage';
import i18n from './locales/init';
import NotFound from "./components/pages/notFound/NotFound";
import Language from "./components/common/Language";
import styled from "styled-components";
import fontsLoader from "./interface/fontsLoader";

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [language, setLanguage] = useState('en')
  
  useEffect(() => {
    fontsLoader(document)
    setTimeout(() => setIsLoading(false), 3000)
  }, [])

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  return (
    <AppWrapper className={language}>
      <Router>
        <Routes>
          <Route path="/" element={ isLoading ? <LoadingPage /> : <IndexPage />} />
          <Route path="/profile" element={ <IndexPage /> } />
          <Route path="/portfolio" element={ <IndexPage /> } />
          <Route path="/blog" element={ <IndexPage /> } />
          <Route path="*" element={ <NotFound /> } />
        </Routes>
      </Router>
      
      <LanguageWrapper>
        <Language 
          currentLanguage={language}
          setLanguage={setLanguage}
        />
      </LanguageWrapper>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
`

const LanguageWrapper = styled.div`
  position: absolute;
  bottom: 10em;
  z-index: 100;
`