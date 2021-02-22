import React from 'react'

import './styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Container } from 'react-bootstrap'
import useProfessionalShop from './useProfessionalServices'
import useImage from '../../hooks/useImage'
import noPhoto from '../../assets/images/no-photo.png'
import { Redirect, useParams } from 'react-router'
import ProfessionalServiceCardList from '../../components/ProfessionalServiceCardList'
import Skeleton from 'react-loading-skeleton'


const Shop: React.FC = () => {
  const { id } = useParams()

  const { loading, services, customer: shopCustomer } = useProfessionalShop(id)

  const image = useImage(shopCustomer ? shopCustomer.url_image : '', noPhoto)

  if (id == null || id === '' || id === 'null') return <Redirect to='/' />

  const store = {
    rate: 3
  }

  return (
    <div>
      <div className="shop-content">
        <img className="w-100" src={require('../../assets/images/bg_header_store.jpg')} alt="" />
        <div className="container shop-content-header-title">
          <div className="shop-content-header-title-content">
            <div className="shop-content-header-title-content-title">
              {loading ? <Skeleton width={300} /> : shopCustomer.fantasyName || shopCustomer.socialReason || shopCustomer.name}
            </div>
            <div>
              <FontAwesomeIcon icon={faStar} size="sm"
                className={`mr-1 shop-content-store-rate${store.rate > 0 ? '-active' : ''}`} />
              <FontAwesomeIcon icon={faStar} size="sm"
                className={`mr-1 shop-content-store-rate${store.rate > 1 ? '-active' : ''}`} />
              <FontAwesomeIcon icon={faStar} size="sm"
                className={`mr-1 shop-content-store-rate${store.rate > 2 ? '-active' : ''}`} />
              <FontAwesomeIcon icon={faStar} size="sm"
                className={`mr-1 shop-content-store-rate${store.rate > 3 ? '-active' : ''}`} />
              <FontAwesomeIcon icon={faStar} size="sm"
                className={`mr-1 shop-content-store-rate${store.rate > 4 ? '-active' : ''}`} />
            </div>
          </div>
        </div>
      </div>
      <Container className='shop-container'>
        <div className="shop-container-profile">
          <div className="picture">
            {loading
              ? <Skeleton circle height="10em" width="10em" />
              : <img src={image.src} onError={image.handleError} alt='' />
            }
          </div>
          <p className='description'>
            {/* DESCRIÇÃO */}
          </p>
          <span className="title-certificacoes">CERTIFICAÇÕES</span>
          <p className="p-content">{loading ? <Skeleton count={3} /> : ''}</p>
          <span className="title-endereco">ENDEREÇO</span>
          <p className="p-content">{loading ? <Skeleton count={3} /> : shopCustomer.address}</p>
          <span className="title-comments">COMENTÁRIOS</span>
          <p className="p-content">{loading ? <Skeleton count={3} /> : ''}</p>
        </div>
        <div className="shop-container-services">
          <h5 className='shop-container-services-title'>NOSSOS SERVIÇOS</h5>
          <ProfessionalServiceCardList loading={loading} services={services} xs={1} sm={1} md={2} lg={3} xl={3} />
        </div>
      </Container>
    </div>
  )
}

export default Shop
