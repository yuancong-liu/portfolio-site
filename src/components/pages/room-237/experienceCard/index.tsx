import { Experience } from "~/types/Resume";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import styles from "./index.module.scss";

type Props = {
  experience: Experience;
}

export const ExperienceCard: React.FC<Props> = ({
  experience,
}) => {
  const { t } = useTranslation('common');

  return (
    <div className={styles['card-wrapper']}>
      <h2>{experience.startYear}</h2>
      { experience.imagePath ?
      <div>
        <Image
          src={experience.imagePath}
          alt={experience.name}
          width={300}
          height={200}
        />
      </div>
      : null }
      { experience.url ?
        <a 
          href={experience.url} 
          target="_blank"
          rel="noopener noreferrer"
        >{t(experience.name)}</a>
      : <p>{t(experience.name)}</p> }
      <p>{t(experience.department)}</p>
      {experience.degree ? <p>{t(experience.degree)}</p> : null}
    </div>
  )
}