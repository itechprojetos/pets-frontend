import React from 'react'
import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton'
import useImage from '../../hooks/useImage'
import noPhoto from '../../assets/images/no-photo.png'
import { Button } from 'react-bootstrap'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: white;
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.09);
  overflow: hidden;
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 66.66%;
`

const ImageWrapper = styled.div`
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: 0;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
`

const PetName = styled.span`
  text-align: center;
  padding-bottom: 0.5em;
`

const LostFoundCard = ({ data, loading }) => {
  const image = useImage(data ? data.lostFind.url_image : null, noPhoto)
  return (
    <Wrapper>
      <ImageContainer>
        <ImageWrapper>
          {loading ? (
            <Skeleton width='100%' height='100%' />
          ) : (
            <img src={image.src} onError={image.handleError} alt='' />
          )}
        </ImageWrapper>
      </ImageContainer>
      <Details>
        <PetName>
          {loading ? <Skeleton /> : data.lostFind.name || 'Nome não informado'}
        </PetName>
        <Button disabled={loading}>Encontrei esse pet</Button>
      </Details>
    </Wrapper>
  )
}

export default LostFoundCard
