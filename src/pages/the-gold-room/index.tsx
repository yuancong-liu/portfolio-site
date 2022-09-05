import type { NextPage } from 'next'
import { FilmCard } from '~/components/pages/the-gold-room/filmCard';
import { Film } from '~/types/Films';
import { getFilms } from '~/utils/films';

/**
 * The Gold Room page
 * ホビー画面
 * 
 * /component/pages/the-gold-room　配下にページコンポーネントを作成
 * 
 */
const TheGoldRoomPage: NextPage<{ films: Film[] }> = ({ films }) => {

  function topTenFilmsDisplay() {
    return films.map((film: Film, index: number) => {
      return (
        <FilmCard key={index} film={film} />
      )
    });
  }

  return (
    <main>
      <h1>Welcome to the Gold Room!</h1>
      <h2>My top 10 films</h2>
      { topTenFilmsDisplay() }
    </main>
  )
}

export async function getStaticProps() {
  const films: Film[] = await getFilms();
  return { props: { films } };
}

export default TheGoldRoomPage;
