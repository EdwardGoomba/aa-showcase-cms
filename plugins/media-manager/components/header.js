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

const Actions = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  justify-self: end;
`

const Source = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  p {
    padding: 0;
    margin: 0;
    padding-right: 0.5rem;
  }
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

const Header = ({ title, onClose, switchSource }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Actions>
        <Source>
          <p>Select Source:</p>
          <select onChange={() => switchSource(event)}>
            <option value='datadwell'>Datadwell</option>
            <option value='kaltura'>Kaltura</option>
          </select>
        </Source>
        <Button onClick={onClose}><CloseIcon style={{ fontSize: 20 }} /></Button>
      </Actions>
    </Container>
  )
}

export default Header
