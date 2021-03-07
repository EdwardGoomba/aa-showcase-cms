import React, { useState } from 'react'
import styled from 'styled-components'
// components
import AssetDetails from './assetDetails'
// img
import thumbnail from '../img/folderThumbnail.jpg'

// styles
const Container = styled.div``

const ImageContainer = styled.div`
  display: grid;
  justify-content: center;
  border: 2px solid #6b7f9e;
  border-radius: 4px;
  overflow: hidden;

  :hover {
    border: 2px solid #ee3224;
    cursor: pointer;
  }
`

const Image = styled.img`
  height: 180px;
`

const Card = ({ data, selectFolder }) => {
  const [detailedView, setDetailedView] = useState(false)
  const viewDetails = () => {
    setDetailedView(true)
  }

  const closeDetailView = () => {
    setDetailedView(false)
  }

  return (
    <>
      <Container onClick={() => selectFolder(data.id)}>
        <ImageContainer>
          <Image src={data.cover_url || thumbnail} />
        </ImageContainer>
        <p>{data.name}</p>
      </Container>
      {/* {detailedView &&
        <AssetDetails data={data} onClick={onClick} onClose={closeDetailView} />
      } */}
    </>
  )
}

export default Card
