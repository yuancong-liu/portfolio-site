import classNames from 'classnames';
import Link from 'next/link';

import { ImageWithLoading } from '~/components/common/image/imageWithLoading';
import { Experience } from '~/types/Resume';

// import { useTranslation } from 'next-i18next';
import styles from './index.module.scss';

type Props = {
  experience: Experience;
};

export const ExperienceCard = ({ experience }: Props) => {
  // const { t } = useTranslation('common');

  return (
    <div className={styles['card-wrapper']}>
      <h2 className={styles['year']}>{experience.startYear}</h2>
      {experience.imagePath && (
        <div className={styles['image']}>
          <ImageWithLoading src={experience.imagePath} alt={experience.name} />
        </div>
      )}
      {experience.url ? (
        <Link
          className={styles['name']}
          href={experience.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {experience.name}
        </Link>
      ) : (
        <p className={styles['name']}>{experience.name}</p>
      )}
      <div className={styles['details']}>
        <p className={styles['detail']}>{experience.department}</p>
        {experience.degree && (
          <p className={styles['detail']}>{experience.degree}</p>
        )}
      </div>
      <div className={styles['border']} />
      <h2 className={classNames(styles['year'], styles['end-year'])}>
        {experience.endYear}
      </h2>
    </div>
  );
};
