'use client';
import { useRef } from 'react';

// import classNames from 'classnames';
// import Link from 'next/link';

import { ImageWithLoading } from '~/components/common/image/imageWithLoading';
import { Experience } from '~/types/Resume';

import styles from './index.module.scss';

type Props = {
  experience: Experience;
};

export const ExperienceCard = ({ experience }: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles['card-wrapper']} ref={cardRef}>
      {experience.imagePath && (
        <div className={styles['image']}>
          <ImageWithLoading src={experience.imagePath} alt={experience.name} />
        </div>
      )}
      {/* <h2 className={styles['year']}>{experience.startYear}</h2>
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
};
