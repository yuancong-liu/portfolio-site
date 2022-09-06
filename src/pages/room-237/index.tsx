import type { NextPage } from 'next'
import { LayoutRoom237 } from '~/components/layouts/room-237';
import { Experience } from '~/types/Resume';
import { ExperienceCard } from '~/components/pages/room-237/experienceCard';
import { UNSPLASH_IMAGE_PATH } from '~/constants/resume';

const experiences = [
  {
    startYear: 2015,
    endYear: 2019,
    name: "resume.bachelor.name",
    department: "resume.bachelor.major",
    degree: "resume.bachelor.degree",
  } as Experience,
  {
    startYear: 2016,
    endYear: 2016,
    name: "resume.summer.name",
    department: "resume.summer.major",
    degree: "resume.summer.degree",
  } as Experience,
  {
    startYear: 2021,
    endYear: 2022,
    name: "resume.master.name",
    department: "resume.master.major",
    degree: "resume.master.degree",
    imagePath: `${UNSPLASH_IMAGE_PATH}photo-1623075838713-24d8993464d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80`
  } as Experience,
  {
    startYear: 2022,
    name: "resume.lab.name",
    department: "resume.lab.major",
  } as Experience
]

/**
 * Room 237 page
 * 自分について画面
 * 
 * /component/pages/room-237　配下にページコンポーネントを作成
 * 
 */
const Room237Page: NextPage = () => {

  function experienceCardDisplay() {
    return experiences.map((experience, index) => {
      return <ExperienceCard experience={experience} key={index} />
    })
  }
  
  return (
    <LayoutRoom237>
      <main>
        { experienceCardDisplay() }
      </main>
    </LayoutRoom237>
  )
}

export default Room237Page;
