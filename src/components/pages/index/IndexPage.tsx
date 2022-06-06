import React from 'react';
import { useTranslation } from 'react-i18next'

function IndexPage() {
  const { t } = useTranslation()

  return (
    <>
      <p>{t('index.text')}</p>
    </>
  )
}

export default IndexPage