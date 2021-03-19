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

const Card = ({ data, selectBranch, selectFolder, file, handleSelect }) => {
  const [detailedView, setDetailedView] = useState(false)

  const handleClick = (id) => {
    if (selectBranch) {
      selectBranch(id)
    }
    if (selectFolder) {
      selectFolder(id)
    }
    if (file) {
      setDetailedView(true)
    }
  }

  const closeDetailView = () => {
    setDetailedView(false)
  }

  return (
    <>
      <Container onClick={() => handleClick(data.id)}>
        {file && (
          <>
            <ImageContainer>
              <Image src={data.thumbnail && data.thumbnail.url || thumbnail} />
            </ImageContainer>
            <p>{data.file.extension} {data.type}</p>
          </>
        )
        }
        {!file &&
          <>
            <ImageContainer>
              <Image src={data.cover_url || thumbnail} />
            </ImageContainer>
            <p>{data.name}</p>
          </>
        }

      </Container>
      {detailedView &&
        <AssetDetails data={data} onClick={handleSelect} onClose={closeDetailView} />
      }
    </>
  )
}

export default Card
