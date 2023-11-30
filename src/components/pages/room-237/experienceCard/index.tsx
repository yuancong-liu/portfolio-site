import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { ImageWithLoading } from '~/components/common/image/imageWithLoading';
import { Experience } from '~/types/Resume';
import styles from './index.module.scss';

type Props = {
  experience: Experience;
};

export const ExperienceCard: FC<Props> = ({ experience }) => {
  const { t } = useTranslation('common');

  return (
    <div className={styles['card-wrapper']}>
      <h2>{experience.startYear}</h2>
      {experience.imagePath ? (
        <div className={styles['image']}>
          <ImageWithLoading src={experience.imagePath} alt={experience.name} />
        </div>
      ) : null}
      {experience.url ? (
        <a href={experience.url} target="_blank" rel="noopener noreferrer">
          {t(experience.name)}
        </a>
      ) : (
        <p>{t(experience.name)}</p>
      )}
      <p>{t(experience.department)}</p>
      {experience.degree ? <p>{t(experience.degree)}</p> : null}
    </div>
  );
};
