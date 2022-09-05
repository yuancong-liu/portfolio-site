import type { NextPage } from 'next'
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
const TheColoradoLoungePage: NextPage<{ films: Film[] }> = ({ films }) => {

  function topTenFilmsDisplay() {
    return films.map((film: Film, index: number) => {
      return (
        <FilmCard key={index} film={film} />
      )
    });
  }

  return (
    <main>
      <h1>Welcome to the Colorado Lounge!</h1>
      <h2>My top 10 films</h2>
      { topTenFilmsDisplay() }
    </main>
  )
}

export async function getStaticProps() {
  const films: Film[] = await getFilms();
  return { props: { films } };
}

export default TheColoradoLoungePage;
