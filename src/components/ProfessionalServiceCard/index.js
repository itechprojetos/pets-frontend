import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const ServiceCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Lato';
  padding: 0.25em;
  padding-top: 0;
  height: 5em;
  max-width: 100%;
`

const ServiceCardHeader = styled.div`
  & > span {
    font-size: 1.1rem;
  }
`

const ServiceCardFooter = styled.div`
  display: flex;
  margin-top: 0.5em;
  max-width: 100%;
  justify-content: space-between;
`

const ServiceCardNameAndRating = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  margin-top: auto;
  width: auto;
  flex-shrink: 1;
`

const ServiceCardPrice = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  flex-grow: 2;
  & > span {
    margin-left: auto;
  }
  & > span:last-of-type {
    color: #ffbd00;
    font-size: 1.4rem;
    font-weight: 600;
  }
`

const ServiceCardName = styled.div`
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const ProfessionalServiceCard = ({ name, service }) => {
  return (
    <ServiceCardContainer>
      <ServiceCardHeader>
        <span>{service.description}</span>
      </ServiceCardHeader>
      <ServiceCardFooter>
        <ServiceCardNameAndRating>
          <ServiceCardName style={{ whiteSpace: 'nowrap' }} title={name}>
            {name}
          </ServiceCardName>
          <div>
            <FontAwesomeIcon icon={faStar} size='sm' />
            <FontAwesomeIcon icon={faStar} size='sm' />
            <FontAwesomeIcon icon={faStar} size='sm' />
            <FontAwesomeIcon icon={faStar} size='sm' />
          </div>
        </ServiceCardNameAndRating>
        <ServiceCardPrice>
          <span>a partir de</span>
          <span className='inline-block' style={{ whiteSpace: 'nowrap' }}>
            R${' '}
            {service.value == null || service.value === ''
              ? '0,00'
              : parseFloat(service.value)
                .toFixed(2)
                .replace('.', ',')}
          </span>
        </ServiceCardPrice>
      </ServiceCardFooter>
    </ServiceCardContainer>
  )
}

export default ProfessionalServiceCard
