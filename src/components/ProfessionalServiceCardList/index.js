import React, { useContext } from 'react'
import GenericCard from '../GenericCard'
import FavoriteWrapper from '../FavoriteWrapper'
import AuthenticationContext from '../../contexts/Authentication/AuthenticationContext'
import ProfessionalServiceCard from '../ProfessionalServiceCard'
import Skeleton from 'react-loading-skeleton'
import CardList from '../CardList'

const ProfessionalServiceCardList = ({
  services,
  xs = 1,
  sm = 2,
  md = 3,
  lg = 4,
  xl = 4,
  loading = true,
  loadingCount = 6
}) => {
  const { customer } = useContext(AuthenticationContext)

  if (loading) {
    const items = Array.from(new Array(loadingCount)).map((item, index) => (
      <Skeleton key={index} height='17.3em' />
    ))
    return (
      <CardList xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
        {items}
      </CardList>
    )
  }

  return (
    <CardList xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      {services.map(({ professionalService: service, customername }) => (
        <GenericCard
          key={service.id}
          to={`/professionals/${service.customerId}/services/${service.id}`}
          imageUrl={service.url_image}
          addons={
            <FavoriteWrapper
              customerId={customer ? customer.id : null}
              professionalServiceId={service.id}
            />
          }
        >
          <ProfessionalServiceCard name={customername} service={service} />
        </GenericCard>
      ))}

      {loading === false && services.length === 0 && (
        <div className='shop-error-message'>Nenhum serviço a ser exibido</div>
      )}
    </CardList>
  )
}

export default ProfessionalServiceCardList
