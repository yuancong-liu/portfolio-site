import { Metadata } from 'next';

import { ScrollingText } from '~/components/common/scrollingText';
import { FilmCard } from '~/components/pages/and/filmCard';
import { Film } from '~/types/Films';
import { getFilms } from '~/utils/films';

import styles from './index.module.scss';

export const metadata: Metadata = {
  alternates: {
    canonical: '/and',
  },
};

/**
 * And... page
 */
const AndPage = async () => {
  const films = await getFilms();

  return (
    <main className={styles['content-wrapper']}>
      <div className={styles['films-view']}>
        <div className={styles['rank-title']}>
          <ScrollingText text="FILM RANKING" size={4} />
        </div>
        <div className={styles.cards}>
          {films.map((film: Film, index: number) => (
            <FilmCard key={film.id} film={film} rank={index + 1} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default AndPage;
