import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
// components
import AssetDetails from './assetDetails'
// img
import defaultThumbnail from '../img/folderThumbnail.jpg'

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

const postData = async (url = '', body = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
  return response.json();
}

const Card = ({ data, selectBranch, selectFolder, file, handleSelect }) => {
  const [detailedView, setDetailedView] = useState(false)
  const [thumbnail, setThumbnail] = useState()

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

  const getThumbnail = async (body) => {
    const thumbnailData = await postData('https://media-plugin.vercel.app/api/getThumbnail', body)
    setThumbnail(thumbnailData)
  }

  useEffect(() => {
    if (data) {
      const body = {
        "id": `${data.id}`,
        "size": "medium"
      }

      if (data.type !== 'other') {
        getThumbnail(body)
      }
    }
  }, [])

  return (
    <>
      <Container onClick={() => handleClick(data.id)}>
        {file && (
          <>
            <ImageContainer>
              <Image src={thumbnail && thumbnail.url || defaultThumbnail} />
            </ImageContainer>
            <p>{data.file.extension} {data.type}</p>
          </>
        )
        }
        {!file &&
          <>
            <ImageContainer>
              <Image src={data.cover_url || defaultThumbnail} />
            </ImageContainer>
            <p>{data.name}</p>
          </>
        }

      </Container>
      {detailedView &&
        <AssetDetails data={data} thumbnail={thumbnail} onClick={handleSelect} onClose={closeDetailView} />
      }
    </>
  )
}

export default Card
