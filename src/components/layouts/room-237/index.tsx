import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { Language } from "~/components/common/languages/multilingual";

export type Props = {
  children?: React.ReactNode;
}

export const LayoutRoom237: React.FC<Props> = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'en')

  return (
    <div className={language}>
      <Language
        currentLanguage={language}
        setLanguage={setLanguage}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    </div>
  );
}