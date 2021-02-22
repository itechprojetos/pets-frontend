import React from 'react'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from "styled-components"
import { Link } from "react-router-dom"

import './styles.scss'
import { Product } from '../../models/Product'
import { Service } from '../../models/Service'
import { Pet } from '../../models/Pet'
import { ProfessionalService } from '../../models/ProfessionalService'

const LinkContainer = styled(Link)`
    &:hover{
        text-decoration: none;
    }
`

interface Props {
    product?: Product
    service?: Service
    pet?: Pet
    professional?: ProfessionalService
}

const CardItem: React.FC<Props> = ({ product, service, pet, professional }) => {
    const imageUrl = product && product.imageUrl ?
        product.imageUrl : professional && professional.url_image ? professional.url_image : service && service.imageUrl ?
            service.imageUrl : pet && pet.url_image ? pet.url_image : require('../../assets/images/no-photo.png')

    const description = product && product.description ?
        product.description : professional && professional.description ? professional.description
            : service && service.description ?
                service.description : pet && pet.name ? pet.name : ''


    const destinationLink = product ? `/products/${product.id}` : professional ? `/professionals/${professional.id}/services` : service ? `/services/${service.description.replace(' ', '-')}` : pet ? `/pet-adopt/view/${pet.id}` : '#'

    return (
        <LinkContainer to={destinationLink} className="container-item">
            <img src={imageUrl} alt="" />
            <FontAwesomeIcon className='icon-heart' icon={faHeart} />
            <hr />
            <p>{description}</p>
            {product && product.sellerName && product.rate && <div className="container-item-footer">
                <div className="container-item-footer-rate">
                    <span>{product.sellerName}</span>
                    <div>
                        <FontAwesomeIcon icon={faStar} size="sm"
                            className={`mr-1 container-item-rate${product.rate > 0 ? '-active' : ''}`} />
                        <FontAwesomeIcon icon={faStar} size="sm"
                            className={`mr-1 container-item-rate${product.rate > 1 ? '-active' : ''}`} />
                        <FontAwesomeIcon icon={faStar} size="sm"
                            className={`mr-1 container-item-rate${product.rate > 2 ? '-active' : ''}`} />
                        <FontAwesomeIcon icon={faStar} size="sm"
                            className={`mr-1 container-item-rate${product.rate > 3 ? '-active' : ''}`} />
                        <FontAwesomeIcon icon={faStar} size="sm"
                            className={`mr-1 container-item-rate${product.rate > 4 ? '-active' : ''}`} />
                    </div>
                </div>
                <div className="container-item-value">
                    <span>a partir de</span>
                    <span className="container-item-value-price">{product.getPrice()}</span>
                </div>
            </div>}
        </LinkContainer>
    )
}

export default CardItem
