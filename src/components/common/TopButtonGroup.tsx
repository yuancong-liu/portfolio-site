import React from "react";
import { useTranslation } from 'react-i18next'
import styled from "styled-components";

function TopButtonGroup() {
  const { t } = useTranslation()

  return (
    <List>
      <Item>{ t('button.profile') }</Item>
      <Item>{ t('button.portfolio') }</Item>
      <Item>{ t('button.blog') }</Item>
    </List>
  )
}

export default TopButtonGroup

const List = styled.ul`
  padding: 0;
`

const Item = styled.li`
  list-style-type: none;
  font-size: 3.5rem;
`