import React, { useContext } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import './styles.scss'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faStar } from "@fortawesome/free-solid-svg-icons";
import { /*useRouteMatch*/ useParams } from 'react-router';
import useServiceSearch from './useServiceSearch';
import { ProfessionalService } from '../../models/ProfessionalService';
import useImage from '../../hooks/useImage';
import { Link } from 'react-router-dom';
import useFavoritableItem from '../../hooks/useFavoritableItem';
//import { useSelector } from 'react-redux';
//import { Customer } from '../../models/Customer';
import AuthenticationContext from '../../contexts/Authentication/AuthenticationContext';
import ProfessionalServiceCardList from '../../components/ProfessionalServiceCardList';

const noPhoto = require('../../assets/images/no-photo.png')

type ProfessionalData = { customername: string, professionalService: ProfessionalService }

const ProfessionalItem: React.FC<{ professional: ProfessionalData }> = ({ professional }) => {
  // const customer: Customer = useSelector<any>(state => state.customer.customerStatus.customer)
  const { customer } = useContext(AuthenticationContext)

  const { FavoriteElement } = useFavoritableItem({ customerId: customer ? customer.id : null, professionalServiceId: professional.professionalService.id })
  const professionalImage = useImage(professional.professionalService.url_image, noPhoto)


  return (
    <div className='position-relative'>
      <Link to={`/professionals/${professional.professionalService.customerId}/services/${professional.professionalService.id}`}>
        <div className='professional-card'>
          <img className='professional-card-picture' src={professionalImage.src} onError={professionalImage.handleError} alt='' />
          <div className='professional-card-separator' />
          <span className='professional-card-name'>{professional.customername}</span>
          <span className='professional-card-profession'>{professional.professionalService.description}</span>
        </div>
      </Link>
      <FavoriteElement />
    </div>
  )
}

const ServiceSearch: React.FC<{}> = () => {
  const params = useParams<{ description: string }>()

  const description = params.description.replace('-', ' ')

  const { loading, data, /*errored*/ } = useServiceSearch(description)

  // if (loading) return (
  //   <div className='loader-spinner'>
  //     <span>Carregando resultados para a busca...</span>
  //     <Spinner animation="border" />
  //   </div>
  // )

  return (
    <Container className='search-page'>
      <div className='row mb-4'>
        <header className='search-page-header'>
          <h1 className="search-page-header-title mb-0 pb-0"><span>Você buscou por:</span> {description}</h1>
          <span className='search-page-header-info'>e sua busca retornou {data.length} resultado(s)</span>
        </header>
      </div>
      <div className='row mb-4'>
        {/* <div className='professional-services-cards'>
          {data.map(service => <ProfessionalItem key={service.professionalService.id} professional={service} />)}
        </div> */}
        <ProfessionalServiceCardList services={data} loading={loading} loadingCount={8} />
      </div>
    </Container>
  )
}

export default ServiceSearch