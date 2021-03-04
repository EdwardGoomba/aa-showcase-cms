import React, { useState } from 'react'
import styled from 'styled-components'
// components
import AssetDetails from './assetDetails'

// styles
const Container = styled.div`
  display: grid;
  justify-content: center;
  border: 1px solid #6b7f9e;
  border-radius: 4px;
  overflow: hidden;

  :hover {
    border: 1px solid #ee3224;
    cursor: pointer;
  }
`

const Image = styled.img`
  max-width: 300px;
  max-height: 200px;
`

const Card = ({ data, onClick }) => {
  const [detailedView, setDetailedView] = useState(false)
  const viewDetails = () => {
    setDetailedView(true)
  }

  const closeDetailView = () => {
    setDetailedView(false)
  }

  return (
    <>
      <Container onClick={viewDetails}>
        <Image src={data.value} />
      </Container>
      {detailedView &&
        <AssetDetails data={data} onClick={onClick} onClose={closeDetailView} />
      }
    </>
  )
}

export default Card
