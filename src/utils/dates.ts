/**
 * @file Dates Utils
 */

/**
 * Get Date String
 * @param date
 * @returns
 */
export const getDateString = (date: string) => {
  const dateObj = new Date(date);
  return `${dateObj.getFullYear()} ${MONTH_MAP[dateObj.getMonth()]} ${
    dateObj.getDate() - 1
  }`;
};

/**
 * Month Map
 */
export const MONTH_MAP = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];
