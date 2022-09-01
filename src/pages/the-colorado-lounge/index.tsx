import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { FilmCard } from '~/components/pages/the-colorado-lounge/filmCard';
import { Film } from '~/types/Films';
import { getFilms } from '~/utils/films';

/**
 * The Colorado Lounge page
 * ブログ画面
 * 
 * /component/pages/the-colorado-lounge　配下にページコンポーネントを作成
 * 
 */
const TheColoradoLoungePage: NextPage = () => {

  const [films, setFilms] = useState<Film[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    // await getFilms();
    // setFilms(getFilms());
    console.log("here", films);
  }

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
      { films.length === 0 ? <p>Loading...</p> : <FilmCard film={films[0]} />}
      {/* <FilmCard film={films[0]} /> */}
    </main>
  )
}

export default TheColoradoLoungePage;
