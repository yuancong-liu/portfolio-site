import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';

type Props = {
  sortKey: string
  name: string
  isPressed: boolean
  setLanguage: (key: string) => void
  setIsShowLangButton: (newValue: boolean) => void;
}

export const LanguageButton: React.FC<Props> = (props: Props) => {

  function handleClick() {
    props.setLanguage(props.sortKey)
    props.setIsShowLangButton(false)
  }

  return (
    <>
      { !props.isPressed ? 
        <div className={styles['button-wrapper']}>
          <button
            className={classNames(props.sortKey, styles[props.sortKey], styles['lang-button'])}
            type="button"
            aria-pressed={props.isPressed}
            onClick={() => handleClick()}
          >
            <span>{ props.name }</span>
          </button>
        </div> : <></>
      }
    </>
  )
}
