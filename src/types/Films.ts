/**
 * @file 映画情報取得関連のtypes
 */

export type Film = {

  /**
   * 映画id
   */
  id: number;

  /**
   * 映画タイトル
   */
  title: string;

  /**
   * 映画の原題
   */
  originalTitle: string;

  /**
   * 映画のジャンル
   */
  genres: string;

  /**
   * 映画の公開日
   */
  releaseDate: string;

  /**
   * 映画の概要
   */
  overview: string;

  /**
   * 映画の制作国
   */
  productionCountries: string;

  /**
   * 映画ポスターのURL
   */
  posterPath: string;

  /**
   * IMDBのURL
   */
  imdbUrl: string; 
}