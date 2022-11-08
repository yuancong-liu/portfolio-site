import type { NextPage } from 'next'
import { FilmCard } from '~/components/pages/the-gold-room/filmCard';
import { Film } from '~/types/Films';
import { getFilms } from '~/utils/films';
import styles from './index.module.scss';

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
        <FilmCard 
          key={index} 
          film={film} 
          rank={index + 1}  
        />
      )
    });
  }

  return (
    <div className={styles['content-wrapper']}>
      <div className={styles['cards-view']}>{ topTenFilmsDisplay() }</div>
    </div>
  )
}

export async function getStaticProps() {
  const films: Film[] = await getFilms();
  return { props: { films } };
}

export default TheGoldRoomPage;
