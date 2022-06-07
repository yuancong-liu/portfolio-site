import React from 'react';
import { useTranslation } from 'react-i18next'

function NotFound() {
  const { t } = useTranslation()

  return (
    <>
      <p>{t('notfound')}</p>
    </>
  )
}

export default NotFound