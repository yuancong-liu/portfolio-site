import i18n from "i18next"
import enJson from "./words/json/en.json"
import jaJson from "./words/json/ja.json"
import scJson from "./words/json/sc.json"
import tcJson from "./words/json/tc.json"
import krJson from "./words/json/kr.json"
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
