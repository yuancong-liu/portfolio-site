import { motion } from "framer-motion";
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
      <motion.div
        initial={{ opacity: 0, scale: 2, x: 0 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 1, x: 1000 }}
      >
        {children}
      </motion.div>
    </div>
  );
}