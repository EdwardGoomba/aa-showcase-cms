import React, { useEffect, useState } from 'react'
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
  max-height: 90vh;
  margin: 4rem auto;
  background: #FFFFFF;
`

const AssetContainer = styled.div`
  max-height: 84vh;
  overflow-y: scroll;
`

const Folders = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-auto-rows: 240px;
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
      title: 'Bamse the Cat',
      caption: 'One never knows what a cat thinks.',
      altText: 'An image of a cat',
      description: 'An orange face of a cat.',
      category: 'animals',
      tag: 'events',
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
      title: 'Colored Pensils',
      caption: 'Color the world.',
      altText: 'An image of a colored pencils.',
      description: 'An array of pencils to choose.',
      category: 'supplies',
      tag: 'events',
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
      title: 'Empty Hallway',
      caption: 'The New Normal',
      altText: 'An image of an empty hallway.',
      description: 'This image was taken at some point in a hallway.',
      category: 'buildings',
      tag: 'events',
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
      title: 'Empty Hallway 2',
      caption: 'The New Normal',
      altText: 'An image of an empty hallway.',
      description: 'This image was taken at some point in a hallway.',
      category: 'buildings',
      tag: 'events',
      creditLine: 'By Kyo Azuma'
    }
  },
]

const Browser = ({ onSelect, onClose }) => {
  const [folders, setFolders] = useState()
  const [folderId, setFolderId] = useState()

  const getData = async (url = '') => {
    const response = await fetch(url)
    return response.json();
  }

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

  useEffect(() => {
    console.log('Fetching DAM data')
    getData('https://media-plugin.vercel.app/api/getAllFolders')
      .then(data => {
        console.log('Data: ', data);
        setFolders(data)
      });

  }, [])

  useEffect(() => {
    // fetch folder based on ID
    if (folderId) {
      console.log('Fetching folder based on : ', folderId)
      const body = {
        "id": `${folderId}`
      }

      postData('https://media-plugin.vercel.app/api/getFolder', body)
        .then(data => {
          console.log('Selected Folder Data: ', data);
          setFolders(data)
        });
    }
  }, [folderId])

  const selectFolder = (id) => {
    console.log('Selected Folder: ', id)
    setFolderId(id)
  }

  const handleSelect = (image) => {
    onSelect([{ ...image }]
    )
  }

  return (
    <Container>
      <Modal>
        <Header title='Select Assets' onClose={onClose} />
        <AssetContainer>
          <Folders>
            {!folders && <p>Loading...</p>}
            {folders && folders.map(folder => {
              console.log('Folder Data: ', folder)
              return <Card key={folder.id} data={folder} selectFolder={selectFolder} />
            }
            )}
            {/* {imageData && imageData.map(image => (
            <Card data={image} onClick={() => handleSelect(image)} />
          ))} */}
          </Folders>
        </AssetContainer>
      </Modal>
    </Container>
  )
}

export default Browser
