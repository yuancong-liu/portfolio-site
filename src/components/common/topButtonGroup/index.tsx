import React from "react";
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';
import classNames from 'classnames';

export const TopButtonGroup: React.FC = () => {
  const { t } = useTranslation()

  return (
    <ul className={classNames(styles[''])}>
      <li className={classNames(styles['item'])}>{ t('button.profile') }</li>
      <li className={classNames(styles['item'])}>{ t('button.portfolio') }</li>
      <li className={classNames(styles['item'])}>{ t('button.blog') }</li>
    </ul>
  )
}
