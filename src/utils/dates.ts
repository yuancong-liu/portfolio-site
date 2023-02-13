/**
 * @file 日時関連のUtils
 */

/**
 * 日付けを文字列に変換する
 * @param date 
 * @returns 
 */
export const getDateString = (date: string) => {
  const dateObj = new Date(date);
  return `${dateObj.getFullYear()}/${dateObj.getMonth() + 1}/${
    dateObj.getDate()
  }`;
};