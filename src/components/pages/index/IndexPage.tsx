import React from 'react';
import styled from 'styled-components';
import TopButtonGroup from '../../common/TopButtonGroup';

function IndexPage() {

  return (
    <IndexWrapper>
      <TopButtonGroupWrapper>
        <TopButtonGroup />
      </TopButtonGroupWrapper>
    </IndexWrapper>
  )
}

export default IndexPage

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

