import React from 'react';
import styled from 'styled-components';
import { languages } from '~/interface/interfaces';
import LanguageButtonGroup from '../languageButtonGroup';
import { useState } from 'react';
import { shiningColor } from '~/assets/styles';
import { shadow } from '~/assets/styles/color';

export interface LanguageProps {
  currentLanguage: string;
  setLanguage: (language: string) => void;
}

function Language(props: LanguageProps) {

  const [isShowLangButton, setIsShowLangButton] = useState(false)

  return (
    <Wrapper>
      <ButtonWrapper notShowCircle={isShowLangButton}>
        <Button
          type="button"
          className={props.currentLanguage}
          onClick={() => setIsShowLangButton(true)}
        >
          { languages.find(language => language.key === props.currentLanguage)?.value }
        </Button>
      </ButtonWrapper>
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
  display: flex;
  align-items: center;
  justify-content: center;
`

const ButtonWrapper = styled.div<{ notShowCircle: boolean }>`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 2.7em;
    left: 1.6em;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${shiningColor.yellow1};
    box-shadow: 0 3px 6px ${shadow.default};
    opacity: ${props => props.notShowCircle ? "0" : "1"};
    transform: ${props => props.notShowCircle ? "scale(1.3)" : "scale(1)"};
    transition: all 0.2s ease-out;
    z-index: -10;

    @media (max-width: 786px) {
      top: 1.5em;
      left: 0.8em;
      width: 18px;
      height: 18px;
    }
  }
`

const Button = styled.button`
  padding: .1em .5em;
  background-color: transparent;
  text-align: center;
  border: none;
  cursor: pointer;
  font-size: 2.5rem;

  &.kr {
    transform: translateY(0.3rem);
  }

  &.en {
    transform: translateY(0.2rem);
  }

  @media (max-width: 768px) {
    font-size: 1.375rem;
  }
`