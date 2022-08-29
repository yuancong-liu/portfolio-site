import { useEffect, useState } from "react";
import Language from "~/components/common/multilingual";
import i18n from "~/locales/init";

export type Props = {
  children?: React.ReactNode;
}

export const LayoutTop: React.FC<Props> = ({ children }) => {
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  return (
    <div>
      <Language
        currentLanguage={language}
        setLanguage={setLanguage}
      />
      {children}
    </div>
  );
}