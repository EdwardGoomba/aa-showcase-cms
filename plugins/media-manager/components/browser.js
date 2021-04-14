import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Loader from "react-loader-spinner";
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
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
  height: 84vh;
  overflow-y: scroll;
`

const LoadingContainer = styled.div`
  display: grid;
  justify-content: center;
`

const Folders = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-auto-rows: 240px;
  grid-gap: 1rem;
  padding: 1rem;
`

const Browser = ({ onSelect, onClose }) => {
  const [loading, setLoading] = useState(true)
  const [tree, setTree] = useState()
  const [branchId, setBranchID] = useState()
  const [branches, setBranches] = useState()
  const [folderId, setFolderId] = useState()
  const [folders, setFolders] = useState()
  const [files, setFiles] = useState()

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

  const getAllFolders = () => {
    getData('https://media-plugin.vercel.app/api/getAllFolders')
      .then(data => {
        setTree(data)
        setLoading(false)
      });
  }

  useEffect(() => {
    getAllFolders()
  }, [])

  useEffect(() => {
    if (branchId) {
      setLoading(true)
      setTree()

      const body = {
        "id": `${branchId}`
      }

      postData('https://media-plugin.vercel.app/api/getFolder', body)
        .then(data => {
          setBranches(data)
          setLoading(false)
        });
    }
  }, [branchId])

  const getFolderData = async (body) => {
    const folderData = await postData('https://media-plugin.vercel.app/api/getFolder', body)
    setFolders(folderData)
    setLoading(false)
  }

  useEffect(() => {
    // fetch folder based on ID
    if (folderId) {
      setLoading(true)
      setBranches()

      const body = {
        "id": `${folderId}`
      }

      getFolderData(body)
    }
  }, [folderId])

  const getFileData = async (body) => {
    const fileData = await postData('https://media-plugin.vercel.app/api/searchAssets', body)

    setFiles(fileData.assets)
    setLoading(false)
  }

  useEffect(() => {
    if (folderId) {
      setLoading(true)
      setFolders()

      const body = {
        "folder_id": `${folderId}`,
        "size": 20
      }

      getFileData(body)
    }
  }, [folderId])

  const selectBranch = (id) => {
    setBranchID(id)
  }

  const selectFolder = (id) => {
    console.log('Selected folder: ', id)
    setFolderId(id)
  }

  const handleSelect = (data, url) => {
    console.log('Selected Data: ', data)
    console.log('Selected URL: ', url.data[0].link)
    const image = {
      kind: 'url',
      value: url.data[0].link,
      assetDocumentProps: {
        // originalFilename: `${data.name}.${data.file.extension}`, // Use this filename when saving the image.
        // source: {
        //   source: 'unsplash', // The source this image is from
        //   id: 'hT1E3Z345', // A string that uniquely identifies it within the source
        //   url: 'https://unsplash.com/photos/x_TJKVU1FJA' // Where to find more info about the asset
        // },
        title: data.name,
        // caption: 'The New Normal',
        // altText: 'An image of an empty hallway.',
        // description: 'This image was taken at some point in a hallway.',
        // category: 'buildings',
        // tag: 'events',
        // creditLine: 'By Kyo Azuma'
      }
    }

    onSelect([{ ...image }])
    onClose()
  }

  return (
    <Container>
      <Modal>
        <Header title='Select Assets' onClose={onClose} />
        <AssetContainer>
          {loading &&
            <LoadingContainer>
              <Loader
                type="Bars"
                color="#ee3224"
                height={50}
                width={50}
              />
            </LoadingContainer>
          }
          <Folders>
            {tree && tree.map(data =>
              <Card key={data.id} data={data} selectBranch={selectBranch} />
            )}
            {branches && branches.map(branch =>
              <Card key={branch.id} data={branch} selectFolder={selectFolder} />
            )}
            {folders && folders.map(folder =>
              <Card key={folder.id} data={folder} selectFolder={selectFolder} />
            )}
            {files && files.map(file => {
              return <Card key={file.id} data={file} file handleSelect={handleSelect} />
            })}
          </Folders>
        </AssetContainer>
      </Modal>
    </Container>
  )
}

export default Browser
