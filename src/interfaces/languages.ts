export type LANGUAGE_KEYS = 'en' | 'ja' | 'zh-Hans' | 'zh-Hant' | 'ko';

type Language = {
  key: LANGUAGE_KEYS;
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
