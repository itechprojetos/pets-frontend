import React, { useContext } from 'react'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'
import ProfessionalServiceCardList from '../../components/ProfessionalServiceCardList'
import useFavorites from './useFavorites'
import AuthenticationContext from '../../contexts/Authentication/AuthenticationContext'
import { Redirect } from 'react-router'

const FavoritesContainer = styled(Container)`
  padding: 1em 0;
  & > h2 {
    margin-bottom: 0.5em;
  }
`

const Section = styled.section`
  & > h5 {
    text-transform: uppercase;
  }
`

const Favorites = () => {
  const { customer } = useContext(AuthenticationContext)
  const { services, loading } = useFavorites()

  if (customer == null) return <Redirect to='/' />

  return (
    <FavoritesContainer>
      <h2>Favoritos</h2>
      <Section>
        <h5>Serviços</h5>
        <div>
          <ProfessionalServiceCardList
            services={services}
            loading={loading}
            loadingCount={8}
          />
        </div>
      </Section>
    </FavoritesContainer>
  )
}

export default Favorites
