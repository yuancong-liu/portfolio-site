import React from 'react';
import styled from 'styled-components';
import { languages } from '../../interface/interfaces';
import LanguageButton from './LanguageButton';

export interface LanguageButtonGroupProps {
  language: string
  isShow: boolean
  setLanguage: (value: string) => void
  setIsShowLangButton: (value: boolean) => void
}

function LanguageButtonGroup(props: LanguageButtonGroupProps) {
  const languageList = languages.map(lang =>
    <LanguageButton
      key={lang.key}
      sortKey={lang.key}
      name={lang.value}
      isPressed={lang.key === props.language}
      setLanguage={props.setLanguage}
      setIsShowLangButton={props.setIsShowLangButton}
    />
  )

  return (
    <Wrapper isShow={props.isShow}>
      {languageList}
    </Wrapper>
  )
}

export default LanguageButtonGroup

const Wrapper = styled.div<{ isShow: boolean }>`
  visibility: ${props => props.isShow ? 'visible' : 'hidden' };
  display: flex;
  align-items: center;

  > * {
    opacity: ${props => props.isShow ? '1' : '0' };
    transform: ${props => props.isShow ? 'translateX(0)' : 'translateX(-2em)'};
    transition: all 0.1s ease-out;
  }

  > *:nth-child(2) {
    transition-delay: 0.05s;
  }

  > *:nth-child(3) {
    transition-delay: 0.1s;
  }

  > *:nth-child(4) {
    transition-delay: 0.15s;
  }
`