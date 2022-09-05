import { Film } from "~/types/Films";
import Image from "next/image";

type Props = {
  film: Film;
}

export const FilmCard: React.FC<Props> = (props: Props) => {
  return (
    <div>
      <Image
        src={props.film.posterPath}
        alt={props.film.title}
        width={300}
        height={450}
      />
      <div>
        <h3>{props.film.title}</h3>
        <span> / {props.film.originalTitle}</span>
      </div>
      <p>{props.film.releaseDate}</p>
      <p>{props.film.productionCountries}</p>
      <p>{props.film.overview}</p>
    </div>  
  )
}