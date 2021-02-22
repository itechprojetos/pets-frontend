import React from 'react'
import styled from 'styled-components'
import useImage from '../../hooks/useImage'
import noPhoto from '../../assets/images/no-photo.png'
import { Link } from 'react-router-dom'

const Container = styled.div`
  position: relative;
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-decoration: none !important;
  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.2);
  min-width: 0;
  min-height: 0;
  max-width: 100%;
`

const Image = styled.img`
  /* width: 100%; */
  object-fit: cover;
  height: 160px;
  width: 100%;
`

const Separator = styled.div`
  /* width: 100%; */
  height: 0.5em;
  background-color: #ffbd00;
`

const Content = styled.div`
  padding: 0.25em;
  text-decoration: none !important;
  color: rgba(0, 0, 0, 0.8);
  &:hover {
    text-decoration: none;
  }
`

const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  width: 100%;
  a {
    text-decoration: none !important;
  }
`

const GenericCard = ({ imageUrl, children, to = '#', addons = null }) => {
  const cardImage = useImage(imageUrl, noPhoto)
  return (
    <Container>
      <CardLink to={to}>
        <Image src={cardImage.src} onError={cardImage.handleError} />
        <Separator />
        <Content>{children}</Content>
      </CardLink>
      {addons && <div>{addons}</div>}
    </Container>
  )
}

export default GenericCard
