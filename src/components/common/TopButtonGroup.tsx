import React from "react";
import { useTranslation } from 'react-i18next'

function TopButtonGroup() {
  const { t } = useTranslation()

  return (
    <ul>
      <li>{ t('button.profile') }</li>
      <li>{ t('button.portfolio') }</li>
      <li>{ t('button.blog') }</li>
    </ul>
  )
}

export default TopButtonGroup