import { FilmCard } from '~/components/pages/and/filmCard';
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
const AndPage = async () => {
  const films = await getFilms();

  return (
    <div className={styles['content-wrapper']}>
      <div className={styles['cards-view']}>
        {films.map((film: Film, index: number) => (
          <FilmCard key={film.id} film={film} rank={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default AndPage;
