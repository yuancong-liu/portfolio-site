/**
 * @file ローカライゼーション関連のUtils
 */

/**
 * タグから、言語タグを取得する
 * @param languageTag 
 * @returns 
 */
export const getLocale = (languageTag: string) => {
  switch (languageTag) {
    case 'Chinese':
      return 'zh-Hant';
    case 'English':
      return 'en';
    case 'Japanese':
      return 'ja';
    default:
      return 'en';
  }
};