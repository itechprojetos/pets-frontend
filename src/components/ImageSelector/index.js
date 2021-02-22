import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import useImage from '../../hooks/useImage'
import noPhoto from '../../assets/images/no-photo.png'
import awsS3Service from '../../services/aws-s3.service'

const ChangeOverlay = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  &:focus {
    outline: none;
  }
  & > h5 {
    margin: auto;
    color: white;
    font-weight: 600;
  }
`

const LoadingOverlay = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  &:focus {
    outline: none;
  }
  & > h5 {
    margin: auto;
    color: white;
    font-weight: 600;
  }
`

const Container = styled.div`
  position: relative;
  border-radius: 200px;
  overflow: hidden;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.2);

  & > img {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }

  &:hover ${ChangeOverlay} {
    display: flex;
  }
`

const ImageSelector = ({ currentImage, onChange, uploadPrefix }) => {
  const inputRef = useRef(null)
  const image = useImage(currentImage, noPhoto)
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    const files = e.target.files

    if (files.length === 0) return

    setLoading(true)
    awsS3Service
      .upload(files[0], uploadPrefix)
      .then(url => {
        onChange(url)
        console.log(url)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Container>
      <img
        src={image.src}
        onError={image.handleError}
        onLoadStart={() => setLoading(true)}
        onLoadedData={() => setLoading(false)}
      />
      <input
        type='file'
        ref={inputRef}
        hidden
        onChange={handleChange}
        accept='image/png, image/jpeg'
      />
      {loading === true ? (
        <LoadingOverlay>
          <h5>CARREGANDO...</h5>
        </LoadingOverlay>
      ) : (
        <ChangeOverlay type='button' onClick={() => inputRef.current.click()}>
          <h5>ALTERAR</h5>
        </ChangeOverlay>
      )}
    </Container>
  )
}

export default ImageSelector
