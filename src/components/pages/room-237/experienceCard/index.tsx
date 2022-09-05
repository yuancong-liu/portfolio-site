import { Experience } from "~/types/Resume";
import { useTranslation } from "react-i18next";

type Props = {
  experience: Experience;
}

export const ExperienceCard: React.FC<Props> = (props: Props) => {

  const { t } = useTranslation();

  return (
    <div>
      <h2>{props.experience.startYear}</h2>
      <p>{t(props.experience.name)}</p>
      <p>{t(props.experience.department)}</p>
      {props.experience.degree ? <p>{t(props.experience.degree)}</p> : null}
    </div>
  )
}