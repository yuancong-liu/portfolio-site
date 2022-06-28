import React from 'react';
import styled from 'styled-components';
import { shadow, shiningColor } from '../../assets/styles/color';

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
        <ButtonWrapper>
          <Button
            className={props.sortKey}
            type="button"
            aria-pressed={props.isPressed}
            onClick={() => handleClick()}
          >
            <span>{ props.name }</span>
          </Button>
        </ButtonWrapper> : <></>
      }
    </>
  )
}

export default LanguageButton

const ButtonWrapper = styled.div`
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 2.7em;
    left: 1.6em;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${shiningColor.yellow1};
    box-shadow: 0 3px 6px ${shadow.default};
    opacity: 0;
    transform: scale(1.3);
    transition: all 0.2s ease-out;
    z-index: -10;

    @media (max-width: 786px) {
      top: 1.5em;
      left: 0.8em;
      width: 18px;
      height: 18px;
    }
  }

  &:hover::after {
    opacity: 1;
    transform: scale(1);
  }
`

const Button = styled.button`
  padding: .1em .5em;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 2.5rem;

  &.kr {
    transform: translateY(0.3rem);
  }

  &.ja {
    transform: translateY(0.1rem);
  }

  &.en {
    transform: translateY(0.2rem);
  }

  @media (max-width: 768px) {
    font-size: 1.375rem;
  }
`