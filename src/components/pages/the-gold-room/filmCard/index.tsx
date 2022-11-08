import { Film } from '~/types/Films';
import styles from './index.module.scss';
import Image from 'next/image';

type Props = {
  film: Film;
  rank: number;
};

export const FilmCard: React.FC<Props> = (props: Props) => {
  return (
    <div
      className={styles['card-wrapper']}
      style={{
        background: `url(${props.film.posterPath})`,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className={styles['contents']}>
        <h1 className={styles['film-rank']}>#{props.rank}</h1>
        <div className={styles['poster-wrapper']}>
          <Image
            src={props.film.posterPath}
            alt={props.film.title}
            width={200}
            height={300}
          />
        </div>
        <div className={styles['basic-info']}>
          <h3 className={styles['title']}>{props.film.title}</h3>
          {props.film.originalTitle !== props.film.title ? (
            <p className={styles['original']}> / {props.film.originalTitle}</p>
          ) : null}
          <p className={styles['release']}>{props.film.releaseDate}</p>
          <p className={styles['countries']}>{props.film.productionCountries}</p>
          <p className={styles['overview']}>{props.film.overview}</p>
        </div>
      </div>
    </div>
  );
};
