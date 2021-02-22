import React, { useContext } from 'react'
import styled from 'styled-components'
import FavoriteWrapper from '../FavoriteWrapper'
import AuthenticationContext from '../../contexts/Authentication/AuthenticationContext'
import GenericCard from '../GenericCard'

const Content = styled.div`
  height: 5em;
  display: flex;
  flex-direction: column;
  padding: 0.5em;
`

const PetName = styled.span`
  font-weight: bold;
  text-transform: uppercase;
  padding-top: 0.5em;
  padding-bottom: 1em;
  text-align: center;
`

const Footer = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
`

const DonationCard = ({ donation, customerName }) => {
  const { customer } = useContext(AuthenticationContext)

  const publishedDate = new Date(donation.created)
  const publishedDateStr = publishedDate.toLocaleDateString()

  return (
    <GenericCard
      key={donation.id}
      to={`/donations/${donation.id}`}
      imageUrl={donation.url_image}
      addons={
        <FavoriteWrapper
          customerId={customer ? customer.id : null}
          donationId={donation.id}
        />
      }
    >
      <Content>
        <PetName>{donation.name}</PetName>
        <Footer>
          <span>{customerName}</span>
          <span>{publishedDateStr}</span>
        </Footer>
      </Content>
    </GenericCard>
  )
}

export default DonationCard
