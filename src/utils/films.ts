/**
 * @file 映画情報取得関連のUtils
 */

import * as FilmConstants from '~/constants/films';
import { Film } from '~/types/Films';

/**
 * top 10 映画情報を取得する
 * @returns Promise<Film[]>
 */
export const getFilms = async () => {
  const films: Film[] = [];
  await Promise.all(
    FilmConstants.topTenFilmIds.map(async (id) => {
      const filmRes = await fetch(
        `${FilmConstants.TMDB_API_BASE_URL}${id}?api_key=${process.env.API_KEY}`,
      );
      const filmJson = await filmRes.json();
      films.push(filterFilmInfo(filmJson));
    }),
  );

  films.sort(
    (a, b) =>
      FilmConstants.topTenFilmIds.indexOf(a.id) -
      FilmConstants.topTenFilmIds.indexOf(b.id),
  );

  return films;
};

/**
 * 映画情報フィルター
 *
 * @param film
 * @returns filtered film info
 */
export const filterFilmInfo = (film: any) =>
  ({
    id: film.id,
    title: film.title,
    originalTitle: film.original_title,
    genres: getGenreString(film.genres),
    releaseDate: convertFilmReleaseDate(film.release_date),
    overview: film.overview,
    productionCountries: getProductionCountries(film.production_countries),
    posterPath: getPosterUrl(film.poster_path),
    imdbUrl: getImdbUrl(film.imdb_id),
  }) as Film;

/**
 * 映画のジャンルを文字列に変換する
 *
 * @param genres
 * @returns genre string
 */
export const getGenreString = (genres: Array<{ id: number; name: string }>) =>
  genres.map((genre) => genre.name).join(', ');

/**
 * 映画の公開日を文字列に変換する
 *
 * @param releaseDate
 * @returns release date string
 */
export const convertFilmReleaseDate = (releaseDate: string) =>
  releaseDate.split('-')[0];

/**
 * 映画の制作国を文字列に変換する
 *
 * @param productionCountries
 * @returns production countries string
 */
export const getProductionCountries = (
  productionCountries: Array<{ iso_3166_1: string; name: string }>,
) => productionCountries.map((country) => country.name).join(', ');

/**
 * 映画ポスターのURLを文字列に変換する
 *
 * @param posterPath
 * @returns poster path string
 */
export const getPosterUrl = (posterPath: string) =>
  `${FilmConstants.POSTER_PATH}${posterPath}`;

/**
 * 映画のIMDBのURLを文字列に変換する
 *
 * @param imdbId
 * @returns imdb url string
 */
export const getImdbUrl = (imdbId: string) =>
  `${FilmConstants.IMDB_BASE_URL}${imdbId}`;
