import { Experience } from "~/types/Resume";
import { useTranslation } from "react-i18next";
import Image from "next/image";

type Props = {
  experience: Experience;
}

export const ExperienceCard: React.FC<Props> = (props: Props) => {

  const { t } = useTranslation();

  return (
    <div>
      <h2>{props.experience.startYear}</h2>
      { props.experience.imagePath ?
      <div>
        <Image
          src={props.experience.imagePath}
          alt={props.experience.name}
          width={300}
          height={200}
        />
      </div>
      : null }
      <p>{t(props.experience.name)}</p>
      <p>{t(props.experience.department)}</p>
      {props.experience.degree ? <p>{t(props.experience.degree)}</p> : null}
    </div>
  )
}