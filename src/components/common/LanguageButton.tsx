import React from 'react';
import styled from 'styled-components';

export interface LanguageButtonProps {
  sortKey: string
  name: string
  isPressed: boolean
  setLanguage: (key: string) => void
  setIsShowLangButton: (newValue: boolean) => void;
}

function LanguageButton(props: LanguageButtonProps) {

  function handleClick() {
    props.setLanguage(props.sortKey)
    props.setIsShowLangButton(false)
  }

  return (
    <>
      { !props.isPressed ? 
        <Button
          className={props.sortKey}
          type="button"
          aria-pressed={props.isPressed}
          onClick={() => handleClick()}
        >
          <span>{ props.name }</span>
        </Button> : <></>
      }
    </>
  )
}

export default LanguageButton

const Button = styled.button`
  padding: .1em .5em;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 2.5rem;

  &::after {
    content: "";
    position: absolute;
    top: 1.7em;
    left: 1.15em;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #F2E205;
    box-shadow: 0 3px 6px rgba(238, 217, 109, 0.41);
    opacity: 0;
    transform: scale(1.3);
    transition: all 0.2s ease-out;
    z-index: -10;
  }

  &:hover::after {
    opacity: 1;
    transform: scale(1);
  }
`