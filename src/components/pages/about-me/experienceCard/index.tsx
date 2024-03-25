import { forwardRef } from 'react';

import { ImageWithLoading } from '~/components/common/image/imageWithLoading';
import { Experience } from '~/types/Resume';

import styles from './index.module.scss';

type Props = {
  experience: Experience;
  index: number;
};

export const ExperienceCard = forwardRef<HTMLDivElement, Props>(
  ({ experience, index }, ref) => {
    const {
      startYear,
      endYear,
      name,
      // department,
      // degree,
      // description,
      imagePath,
      // url,
    } = experience;

    return (
      <div className={styles['card-wrapper']} ref={ref}>
        {imagePath && (
          <div className={styles.image}>
            <ImageWithLoading src={imagePath} alt={name} />
          </div>
        )}
        <div className={styles.details}>
          <h2 className={styles.index}>#{index + 1}</h2>
          <h2 className={styles.year}>
            <span className={styles.start}>{startYear} - </span>
            {endYear}
          </h2>
          <h3 className={styles.name}>{name}</h3>
        </div>
        {/* {experience.url ? (
      ) : (
      )}
      <div className={styles['details']}>
        <p>{experience.department}</p>
        {experience.degree && <p>{experience.degree}</p>}
      </div>
      <div
        className={classNames(styles['border'], inView && styles['-in-view'])}
      />
      <div
        className={classNames(
          styles['year'],
          styles['end-year'],
          inView && styles['-in-view'],
        )}
      >
        {experience.endYear}
      </div> */}
      </div>
    );
  },
);

ExperienceCard.displayName = 'ExperienceCard';
