import React from "react";
import styles from './index.module.scss';

export const TopWelcome: React.FC = () => {

  return (
    <div className={styles['top-welcome']}>
      <p className={styles['text']}>Welcome to <br />Overlook<br />Hotel</p>
      <div className={styles['rectangle']} />
    </div>
  )
}
