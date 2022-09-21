/**
 * @file 履歴関連のtypes
 */

export type Experience = {

  /**
   * 開始年
   */
  startYear: number;

  /**
   * 終了年
   */
  endYear?: number;

  /**
   * 学校/会社名
   */
  name: string;

  /**
   * 学部/部署名
   */
  department: string;

  /**
   * 学位
   */
  degree?: string;

  /**
   * 詳細説明
   */
  description?: string;

  /**
   * 画像のURL
   */
  imagePath?: string;

  /**
   * URL
   */
  url?: string;
}