import { Film } from "~/types/Films";
import styles from './index.module.scss';
import Image from "next/image";

type Props = {
  film: Film;
}

export const FilmCard: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles['card-wrapper']}>
      <div className={styles['poster-wrapper']}>
        <Image
          src={props.film.posterPath}
          alt={props.film.title}
          width={100}
          height={150}
        />
      </div>
      <div className={styles['basic-info']}>
        <h3 className={styles['title']}>{props.film.title}</h3>
        {props.film.originalTitle !== props.film.title ? <p className={styles['original']}> / {props.film.originalTitle}</p> : null}
        <p className={styles['release']}>{props.film.releaseDate}</p>
        <p className={styles['countries']}>{props.film.productionCountries}</p>
      </div>
      <p className={styles['overview-text']}>{props.film.overview}</p>
    </div>  
  )
}