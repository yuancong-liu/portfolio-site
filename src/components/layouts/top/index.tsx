import { FC, useState } from "react";
import { useTranslation } from "next-i18next";
import { Languages } from "~/components/common/languages";

export type Props = {
  children?: React.ReactNode;
}

export const LayoutTop: FC<Props> = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'en');

  return (
    <div className={language}>
      <Languages
        currentLanguage={language}
        setLanguage={setLanguage}
      />
      {children}
    </div>
  );
}