import { useTranslation } from "next-i18next";
import { useState } from "react";
import { Language } from "~/components/common/languages/multilingual";

export type Props = {
  children?: React.ReactNode;
}

export const LayoutTop: React.FC<Props> = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'en');

  return (
    <div className={language}>
      <Language
        currentLanguage={language}
        setLanguage={setLanguage}
      />
      {children}
    </div>
  );
}