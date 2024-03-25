import { useMemo } from 'react';

import { ImageWithLoading } from '~/components/common/image/imageWithLoading';
import { Film } from '~/types/Films';

import styles from './index.module.scss';

type Props = {
  film: Film;
  rank: number;
};

export const FilmCard = ({ film, rank }: Props) =>
  useMemo(
    () => (
      <div
        className={styles['card-wrapper']}
        style={{
          background: `url(${film.posterPath})`,
        }}
      >
        <div className={styles.contents}>
          <h1 className={styles['film-rank']}>#{rank}</h1>
          <div className={styles['poster-wrapper']}>
            <ImageWithLoading src={film.posterPath} alt={film.title} />
          </div>
          <div className={styles['basic-info']}>
            <h3 className={styles.title}>{film.title}</h3>
            {film.originalTitle !== film.title ? (
              <p className={styles.original}> / {film.originalTitle}</p>
            ) : null}
            <p className={styles.release}>{film.releaseDate}</p>
            <p className={styles.countries}>{film.productionCountries}</p>
            <p className={styles.overview}>{film.overview}</p>
          </div>
        </div>
      </div>
    ),
    [film, rank],
  );
