import React from 'react'
import { CloseIcon } from '@sanity/icons'
import styled from 'styled-components'

// styles
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 1rem;
`

const Title = styled.h4`
  margin: 0;
`

const Button = styled.button`
  display: grid;
  justify-self: end;
  border: 1px solid #6b7f9e;
  border-radius: 4px;

  :hover {
    background: #FFFFFF;
    border: 1px solid #ee3224;
    cursor: pointer;
  }
`

const Header = ({ title, onClose }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Button onClick={onClose}><CloseIcon style={{ fontSize: 20 }} /></Button>
    </Container>
  )
}

export default Header
