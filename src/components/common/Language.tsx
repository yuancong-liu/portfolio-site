import React from 'react';
import styled from 'styled-components';
import { languages } from '../../interface/interfaces';
import LanguageButtonGroup from './LanguageButtonGroup';
import { useState } from 'react';

export interface LanguageProps {
  currentLanguage: string;
  setLanguage: (language: string) => void;
}

function Language(props: LanguageProps) {

  const [isShowLangButton, setIsShowLangButton] = useState(false)

  return (
    <Wrapper>
      <Button
        type="button"
        className={props.currentLanguage}
        onClick={() => setIsShowLangButton(true)}
        notShowCircle={isShowLangButton}
      >
        { languages.find(language => language.key === props.currentLanguage)!.value }
      </Button>
      <LanguageButtonGroup
        language={props.currentLanguage}
        setLanguage={props.setLanguage}
        setIsShowLangButton={setIsShowLangButton}
        isShow={isShowLangButton}
      />
    </Wrapper>
  )
}

export default Language

const Wrapper = styled.div`
  position: absolute;
  padding: 20px;
  display: flex;
  align-items: baseline;
`

const Button = styled.button<{ notShowCircle: boolean }>`
  padding: .1em .5em;
  background-color: transparent;
  text-align: center;
  border: none;
  cursor: pointer;
  font-size: 2.5rem;

  &::before {
    content: "";
    position: absolute;
    top: 1.7em;
    left: 1.15em;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #F2E205;
    box-shadow: 0 3px 6px rgba(238, 217, 109, 0.41);
    opacity: ${props => props.notShowCircle ? "0" : "1"};
    transform: ${props => props.notShowCircle ? "scale(1.3)" : "scale(1)"};
    transition: all 0.2s ease-out;
    z-index: -10;
  }

  &.en {
    font-family: 'Fira Code';
    font-style: normal;
  }

  &.sc, &.tc {
    font-family: source-han-sans-simplified-c;
    font-style: normal;
  }

  &.ja {
    font-family: kinuta-reiwa-kana, iroha-21popura-stdn;
    font-style: normal;
  }

  &.kr {
    font-family: omnigothic;
    font-style: normal;
    font-weight: 300;
  }
`