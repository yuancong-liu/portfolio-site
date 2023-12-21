import { ExperienceCard } from '~/components/pages/about-me/experienceCard';
import { UNSPLASH_IMAGE_PATH } from '~/constants/resume';
import { Experience } from '~/types/Resume';

import styles from './index.module.scss';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const experiences = [
  {
    startYear: 2022,
    endYear: 'Present',
    name: 'teamLab Inc.',
    department: 'Frontend Engineer',
    imagePath: `${UNSPLASH_IMAGE_PATH}photo-1578351709033-367c8046f6be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80`,
    url: 'https://www.team-lab.com/',
  } as Experience,
  {
    startYear: 2021,
    endYear: 2022,
    name: 'University of Glasgow',
    department: 'Computing Science',
    degree: 'Master of Science',
    imagePath: `${UNSPLASH_IMAGE_PATH}photo-1623075838713-24d8993464d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80`,
    url: 'https://www.gla.ac.uk/',
  } as Experience,
  {
    startYear: 2016,
    endYear: 2016,
    name: 'National University of Singapore',
    department: 'Human-Computer Interaction',
    degree: 'Summer School',
    imagePath: `${UNSPLASH_IMAGE_PATH}photo-1615743361511-f046bb122b8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80`,
    url: 'https://www.nus.edu.sg/',
  } as Experience,
  {
    startYear: 2015,
    endYear: 2019,
    name: 'University of Electronic Science and Technology of China',
    department: 'Software Engineering',
    degree: 'Bachelor of Engineering',
    imagePath: `${UNSPLASH_IMAGE_PATH}photo-1593007187880-0d2dee3c90e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80`,
    url: 'https://en.uestc.edu.cn/',
  } as Experience,
];

/**
 * Room 237 page
 * 自分について画面
 *
 * /component/pages/about-me　配下にページコンポーネントを作成
 *
 */
const AboutMePage = () => {
  const experienceCardDisplay = () => {
    return experiences.map((experience, index) => {
      return <ExperienceCard experience={experience} key={index} />;
    });
  };

  return (
    <main>
      {/* <h1 className={styles['back-button']}>hello</h1> */}
      <div className={styles['content-wrapper']}>{experienceCardDisplay()}</div>
    </main>
  );
};

// export const getStaticProps = async ({ locale }: { locale: string }) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ['common'])),
//   },
// });

export default AboutMePage;
