import { Experience } from '~/types/Resume';
import { ExperienceCard } from '~/components/pages/room-237/experienceCard';
import { UNSPLASH_IMAGE_PATH } from '~/constants/resume';
import styles from './index.module.scss';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const experiences = [
  {
    startYear: 2015,
    endYear: 2019,
    name: 'resume.bachelor.name',
    department: 'resume.bachelor.major',
    degree: 'resume.bachelor.degree',
    imagePath: `${UNSPLASH_IMAGE_PATH}photo-1593007187880-0d2dee3c90e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80`,
    url: 'https://en.uestc.edu.cn/',
  } as Experience,
  {
    startYear: 2016,
    endYear: 2016,
    name: 'resume.summer.name',
    department: 'resume.summer.major',
    degree: 'resume.summer.degree',
    imagePath: `${UNSPLASH_IMAGE_PATH}photo-1615743361511-f046bb122b8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80`,
    url: 'https://www.nus.edu.sg/',
  } as Experience,
  {
    startYear: 2021,
    endYear: 2022,
    name: 'resume.master.name',
    department: 'resume.master.major',
    degree: 'resume.master.degree',
    imagePath: `${UNSPLASH_IMAGE_PATH}photo-1623075838713-24d8993464d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80`,
    url: 'https://www.gla.ac.uk/',
  } as Experience,
  {
    startYear: 2022,
    name: 'resume.lab.name',
    department: 'resume.lab.major',
    imagePath: `${UNSPLASH_IMAGE_PATH}photo-1578351709033-367c8046f6be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80`,
    url: 'https://www.team-lab.com/',
  } as Experience,
];

/**
 * Room 237 page
 * 自分について画面
 *
 * /component/pages/room-237　配下にページコンポーネントを作成
 *
 */
const Room237Page = () => {
  const experienceCardDisplay = () => {
    return experiences.map((experience, index) => {
      return <ExperienceCard experience={experience} key={index} />;
    });
  }

  return (
    <main>
      <h1 className={styles['back-button']}>hello</h1>
      <div className={styles['content-wrapper']}>{experienceCardDisplay()}</div>
    </main>
  );
};

// export const getStaticProps = async ({ locale }: { locale: string }) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ['common'])),
//   },
// });

export default Room237Page;
