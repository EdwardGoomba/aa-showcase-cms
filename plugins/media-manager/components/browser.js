import React from 'react'
import styled from 'styled-components'
// components
import Header from './header'
import Card from './card'

// styles
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.6);
  z-index: 200;
  height: 100%;
  width: 100%;
`

const Modal = styled.div`
  max-width: 90vw;
  margin: 4rem auto;
  background: #FFFFFF;
`

const AssetContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px,1fr));
  grid-auto-rows: 200px;
  grid-gap: 1rem;
  padding: 1rem;
`

const imageData = [
  {
    kind: 'url',
    value: 'https://i.imgur.com/hT1E3ZL.jpg',
    assetDocumentProps: {
      originalFilename: 'bamse.jpg', // Use this filename when saving the image.
      source: {
        source: 'imgur', // The source this image is from
        id: 'hT1E3ZL', // A string that uniquely identifies it within the source
        url: 'https://imgur.com/hT1E3ZL' // Where to find more info about the asset
      },
      description: 'Bamse the Cat',
      creditLine: 'Bamse by Victoria'
    }
  },
  {
    kind: 'url',
    value: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8',
    assetDocumentProps: {
      originalFilename: 'pensils.jpg', // Use this filename when saving the image.
      source: {
        source: 'unsplash', // The source this image is from
        id: 'hT1E3ZL24', // A string that uniquely identifies it within the source
        url: 'https://unsplash.com/photos/l3N9Q27zULw' // Where to find more info about the asset
      },
      description: 'Colored Pensils',
      creditLine: 'By Jess Bailey'
    }
  },
  {
    kind: 'url',
    value: 'https://images.unsplash.com/photo-1495727034151-8fdc73e332a8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw',
    assetDocumentProps: {
      originalFilename: 'hallway.jpg', // Use this filename when saving the image.
      source: {
        source: 'unsplash', // The source this image is from
        id: 'hT1E3ZL12', // A string that uniquely identifies it within the source
        url: 'https://unsplash.com/photos/x_TJKVU1FJA' // Where to find more info about the asset
      },
      description: 'Empty Hallway',
      creditLine: 'By Kyo Azuma'
    }
  },
  {
    kind: 'url',
    value: 'https://images.unsplash.com/photo-1495727034151-8fdc73e332a8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw',
    assetDocumentProps: {
      originalFilename: 'hallway.jpg', // Use this filename when saving the image.
      source: {
        source: 'unsplash', // The source this image is from
        id: 'hT1E3Z345', // A string that uniquely identifies it within the source
        url: 'https://unsplash.com/photos/x_TJKVU1FJA' // Where to find more info about the asset
      },
      description: 'Empty Hallway',
      creditLine: 'By Kyo Azuma'
    }
  },
]

const Browser = ({ onSelect, onClose }) => {
  const handleSelect = (image) => {
    onSelect([{ ...image }]
    )
  }

  return (
    <Container>
      <Modal>
        <Header title='Select Assets' onClose={onClose} />
        <AssetContainer>
          {imageData && imageData.map(image => (
            <Card data={image} onClick={() => handleSelect(image)} />
          ))}
        </AssetContainer>
      </Modal>
    </Container>
  )
}

export default Browser
