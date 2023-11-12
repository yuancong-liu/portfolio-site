import { useMemo } from 'react';
import Image from 'next/image';
import { Film } from '~/types/Films';
import styles from './index.module.scss';

type Props = {
  film: Film;
  rank: number;
};

export const FilmCard = ({ film, rank }: Props) => {
  return useMemo(() => {
    return (
      <div
        className={styles['card-wrapper']}
        style={{
          background: `url(${film.posterPath})`,
        }}
      >
        <div className={styles['contents']}>
          <h1 className={styles['film-rank']}>#{rank}</h1>
          <div className={styles['poster-wrapper']}>
            <Image
              src={film.posterPath}
              alt={film.title}
              width={200}
              height={300}
            />
          </div>
          <div className={styles['basic-info']}>
            <h3 className={styles['title']}>{film.title}</h3>
            {film.originalTitle !== film.title ? (
              <p className={styles['original']}> / {film.originalTitle}</p>
            ) : null}
            <p className={styles['release']}>{film.releaseDate}</p>
            <p className={styles['countries']}>{film.productionCountries}</p>
            <p className={styles['overview']}>{film.overview}</p>
          </div>
        </div>
      </div>
    );
  }, [film, rank]);
};
