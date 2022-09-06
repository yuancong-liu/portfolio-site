import i18n from "i18next"
import enJson from "./words/en.json"
import jaJson from "./words/ja.json"
import scJson from "./words/sc.json"
import tcJson from "./words/tc.json"
import krJson from "./words/kr.json"
import { initReactI18next } from "react-i18next"

const resources = {
  en: {
    translation: enJson,
  },
  ja: {
    translation: jaJson,
  },
  sc: {
    translation: scJson,
  },
  tc: {
    translation: tcJson,
  },
  kr: {
    translation: krJson,
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',

  interpolation: {
    escapeValue: false,
  }
})

export default i18n
