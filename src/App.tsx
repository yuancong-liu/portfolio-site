import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React, { useEffect, useState } from 'react';
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
          <Route path='/' element={ isLoading ? <LoadingPage /> : <IndexPage />} />
          <Route path='/profile' element={ <IndexPage /> } />
          <Route path='/portfolio' element={ <IndexPage /> } />
          <Route path='/blog' element={ <IndexPage /> } />
          <Route path='*' element={ <NotFound /> } />
        </Routes>
      </Router>
      
      <Language 
        currentLanguage={language}
        setLanguage={setLanguage}
      />
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
`