export type LanguageKey = 'en' | 'ja' | 'zh-Hans' | 'zh-Hant' | 'ko';

type Language = {
  key: LanguageKey;
  value: string;
};

export const LANGUAGES: Language[] = [
  {
    key: 'en',
    value: 'Eng',
  },
  {
    key: 'ja',
    value: 'Jpn',
  },
  {
    key: 'zh-Hans',
    value: 'Chs',
  },
  {
    key: 'zh-Hant',
    value: 'Cht',
  },
  {
    key: 'ko',
    value: 'Kor',
  },
];
