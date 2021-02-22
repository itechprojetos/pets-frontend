import React, { useContext } from 'react'
import FooterBanner from '../../components/FooterBanner'
import { Container } from 'react-bootstrap'

import { Link } from 'react-router-dom'
import './styles.scss'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// import { LostFindsActions } from '../../store/actions/lostfinds'
// import awsS3Service from '../../services/aws-s3.service'

// import defaultImg from '../../assets/images/default.jpg'

import usePaginatedFetch from '../../hooks/usePaginatedFetch'
import PaginatedContent from '../../components/PaginatedContent'
import LostFoundList from '../../components/LostFoundCard/LostFoundList'
import AuthenticationContext from '../../contexts/Authentication/AuthenticationContext'

const LostFound = () => {
  const { customer } = useContext(AuthenticationContext)
  const lostPets = usePaginatedFetch('/services/app/LostFinds/GetAll', 8)

  return (
    <Container className='lost-finds-content'>
      <div className='row d-flex flex-column justify-content-between align-items-center'>
        <div className='lost-finds-content-title '>
          Perdeu ou Encontrou um Pet?{' '}
          <span>Compartilha com a nossa comunidade!</span>
        </div>

        {customer != null && (
          <div className='p-2'>
            <Link to='/lost-found/lost' className='btn text-white btn-warning'>
              Perdi um pet
            </Link>
            <Link
              to='/lost-found/found'
              className='ml-3 btn text-white btn-warning'
            >
              Encontrei um pet
            </Link>
          </div>
        )}
        {customer == null && (
          <p className='p-2'>
            Faça login para ter acesso à todas as funcionalidades
          </p>
        )}
      </div>

      {lostPets.errored && (
        <div className='lost-finds-content-message-error'>
          Algum erro ocorreu ao buscar os pets
        </div>
      )}

      {/* notSignedError && (
        <div className="lost-finds-content-message-error">{notSignedError}</div>
      ) */}

      <div className='w-100'>
        <h3>Animais perdidos</h3>
        <div className='w-100'>
          <PaginatedContent paginatedFetch={lostPets}>
            <LostFoundList
              loading={lostPets.loading}
              lostFounds={lostPets.data}
            />
          </PaginatedContent>
        </div>
      </div>

      <FooterBanner />
    </Container>
  )
}

export default LostFound
