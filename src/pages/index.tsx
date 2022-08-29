/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components';
import TopButtonGroup from '~/components/common/topButonGroup/TopButtonGroup';
import { LayoutTop } from '~/components/layouts/top';

const Home: NextPage = () => {

  return (
      <LayoutTop>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <IndexWrapper>
            <TopButtonGroupWrapper>
              <TopButtonGroup />
            </TopButtonGroupWrapper>
          </IndexWrapper>
        </main>
      </LayoutTop>
  )
}

export default Home

const IndexWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;

  @media (min-width: 768px) {
    grid-template-columns: 5fr 4fr;
  }

  @media (max-width: 768px) {
    grid-template-rows: 5fr 4fr;
  }
`

const TopButtonGroupWrapper = styled.div`
  
  @media (min-width: 768px) {
    grid-column: 2 / 3;
  }

  @media (max-width: 768px) {
    grid-row: 2 / 3;
  }
`
