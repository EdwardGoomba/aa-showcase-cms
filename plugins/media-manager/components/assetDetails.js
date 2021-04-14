import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Loader from "react-loader-spinner";
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
// components
import Header from './header'

// styles
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.6);
  z-index: 200;
  height: 100%;
  width: 100%;
`

const Container = styled.div`
  display: grid;
  grid-template-rows: 50px 1fr 64px;
  position: fixed;
  top: 6%;
  left: 5%;
  background: #FFFFFF;
  min-height: 60vh;
  max-height: 90vh;
  width: 90vw;
  overflow: scroll;
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

const LoadingContainer = styled.div`
  display: grid;
  justify-content: center;
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
  justify-content: center;
  align-content: center;

  :hover {
    background: #FFFFFF;
    color: #6b7f9e;
    border: 1px solid #3ab667;
    cursor: pointer;
  }
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

const AssetDetails = ({ data, onClick, onClose, thumbnail }) => {
  const [loading, setLoading] = useState(true)
  const [details, setDetails] = useState()
  const [url, setUrl] = useState()

  const getDetails = async (body) => {
    const details = await postData('https://media-plugin.vercel.app/api/getAssetDetails', body)
    setDetails(details)
    setLoading(false)
  }

  const getUrl = async (body) => {
    const url = await postData('https://media-plugin.vercel.app/api/getAssetLink', body)
    setUrl(url)
  }

  useEffect(() => {
    const body = {
      "id": `${data.id}`
    }

    getDetails(body)
  }, [])

  useEffect(() => {
    const body = {
      "data": [{
        "id": `${data.id}`
      }]
    }

    getUrl(body)
  }, [])

  const formatDate = (timestamp) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const date = new Date(timestamp * 1000)
    const year = date.getFullYear()
    const month = monthNames[date.getMonth() + 1]
    const day = date.getDate()

    return `${month} ${day}, ${year}`
  }

  const handleAssetSelect = () => {
    onClose()
    onClick(data, url)
  }

  console.log('url: ', url)
  console.log('Details: ', details)

  // TODO: implement following metadata
  // Student ID - DONE
  // Artist Name - DONE
  // Upload Date - DONE
  // Uploader(user that uploaded the file)
  // Path(the file path in the DAM)
  // School - DONE
  // Title - DONE
  // Description - DONE
  // Filesize - DONE

  return (
    <Background>
      <Container>
        <Header title={data.name} onClose={onClose} />
        <DetailsContainer>
          <Image src={thumbnail.url} />
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
          {!loading &&
            <Details>
              <h4>Details</h4>
              <p>Title: {data.name}</p>
              <p>Upload Date: {data.date_created ? (
                formatDate(data.date_created)
              ) : 'No date provided'}</p>
              {details && details.metadata.map(meta => {
                if (meta.value !== []) {
                  // return <p>{meta.name}: {meta.value}</p>
                  if (
                    meta.name === 'Description' ||
                    meta.name === 'Student ID' ||
                    meta.name === 'Artist Name' ||
                    meta.name === 'School' ||
                    meta.name === 'Size' ||
                    meta.name === 'Title'
                  ) {
                    return <p>{meta.name}: {meta.value ? meta.value : 'No data'}</p>
                  }
                }
              })}
            </Details>
          }
        </DetailsContainer>
        <Button onClick={() => handleAssetSelect(data, url)}>Select</Button>
      </Container>
    </Background>
  )
}

export default AssetDetails
