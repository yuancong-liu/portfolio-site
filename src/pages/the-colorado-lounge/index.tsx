import type { NextPage } from 'next'
import { FilmCard } from '~/components/pages/the-colorado-lounge/filmCard';
import { filterFilmInfo, getFilms } from '~/utils/films';
import * as FilmConstants from "~/constants/films";
import { Film } from '~/types/Films';
import axios from 'axios';
// import { useEffect } from 'react';

/**
 * The Colorado Lounge page
 * ブログ画面
 * 
 * /component/pages/the-colorado-lounge　配下にページコンポーネントを作成
 * 
 */
const TheColoradoLoungePage: NextPage<{ film: Film }> = ({ film }) => {

  // function topTenFilmsDisplay() {
  //   return films.map((film: Film, index: number) => {
  //     return (
  //       <FilmCard key={index} film={film} />
  //     )
  //   });
  // }

  return (
    <main>
      <h1>Welcome to the Colorado Lounge!</h1>
      <h2>My top 10 films</h2>
      {/* { topTenFilmsDisplay() } */}
      <FilmCard film={film} />
    </main>
  )
}

export async function getStaticProps() {
  // const films = FilmConstants.topTenFilmIds.forEach(async (id) => {
  //   const res = await fetch(`${FilmConstants.TMDB_API_BASE_URL}${id}?api_key=7c1960f09f8990909fa5fffb0f89043e`)
  //   const film = await res.json()
  //   return film;
  //   // films.push(response as Film);
  //   console.log('hi');
  // });
  const res = await fetch(`${FilmConstants.TMDB_API_BASE_URL}550?api_key=7c1960f09f8990909fa5fffb0f89043e`);
  const film = await res.json();
  return { props: { film } };
}

export default TheColoradoLoungePage;
