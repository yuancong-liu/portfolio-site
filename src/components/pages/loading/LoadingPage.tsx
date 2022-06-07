import React from 'react';
import { useTranslation } from 'react-i18next'

function LoadingPage() {
  const { t } = useTranslation()

  return (
    <>
      <p>{ t('loading.text') }</p>  
    </>
  )
}

export default LoadingPage