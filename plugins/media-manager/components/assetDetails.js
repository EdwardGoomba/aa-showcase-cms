import React from 'react'
import styled from 'styled-components'
// components
import Header from './header'

// styles
const Container = styled.div`
  display: grid;
  position: fixed;
  top: 6%;
  left: 5%;
  background: #FFFFFF;
  min-height: 60%;
  width: 90%;
`

const DetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 2rem;
  padding: 1rem;
`

const Image = styled.img`
  max-width: 600px;
`

const Details = styled.div``

const Button = styled.div`
  display: grid;
  justify-self: end;
  border: 1px solid #3ab667;
  background: #3ab667;
  color: #FFFFFF;
  border-radius: 4px;
  padding: 1rem;
  margin: 1rem;

  :hover {
    background: #FFFFFF;
    color: #6b7f9e;
    border: 1px solid #3ab667;
    cursor: pointer;
  }
`

const AssetDetails = ({ data, onClick, onClose }) => {
  console.log('Data: ', data)
  return (
    <Container>
      <Header title='Some title' onClose={onClose} />
      <DetailsContainer>
        <Image src={data.value} />
        <Details>
          <h4>Details</h4>
          <p>Title: {data.assetDocumentProps.title}</p>
          <p>Caption: {data.assetDocumentProps.caption}</p>
          <p>Alt Text: {data.assetDocumentProps.altText}</p>
          <p>Description: {data.assetDocumentProps.description}</p>
          <p>Category: {data.assetDocumentProps.category}</p>
          <p>Tag: {data.assetDocumentProps.tag}</p>
        </Details>
      </DetailsContainer>
      <Button onClick={onClick}>Select</Button>
    </Container>
  )
}

export default AssetDetails
