import React, { /*useEffect*/ } from 'react'

import './styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, /*faStar*/ } from '@fortawesome/free-solid-svg-icons'
//import { Product } from '../../models/Product'
import { bindActionCreators } from 'redux'
//import { ProductActions } from '../../store/actions/product'
import { connect } from 'react-redux'
//import CardItem from '../../components/CardItem'
import { Container, Nav, Navbar } from 'react-bootstrap'
import styled from 'styled-components'
import { Service } from '../../models/Service'
import { ServicesActions } from '../../store/actions/services'
import { Link } from 'react-router-dom'
import useImage from '../../hooks/useImage'
const noPhoto = require('../../assets/images/no-photo.png')


const CategoriesContainer = styled(Container)`
  
`

const NavbarCategories = styled(Navbar)`
    margin-top: 0;
    padding: 6px 16px !important;
    background: white;
    -webkit-box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.25);
    -moz-box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.25);
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.25);
`

const NavLink = styled(Nav.Link)`
    color: black !important;
    font-size: 0.85rem !important;
    &:hover {
        color: #333 !important;
    }
`

const NavLinkCategories = styled(NavLink)`
  color: #fab900 !important;
  &:hover {
    cursor: default;  
    color: #fab900 !important;
  }
`

// const ContainerSection = styled(Container)`
//   position: relative;
//   z-index: 2000; 
// `

// const InfoSection = styled.div`
//     -webkit-box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.25);
//     -moz-box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.25);
//     box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.25);
//     position: relative;
// `

interface Props {
    services: Service[];
    // serviceGetAll: () => void;
}

const ServiceItem: React.FC<{ service: Service }> = ({ service }) => {
    const image = useImage(service.imageUrl, noPhoto)

    return (
        <Link to={`/services/${service.description.replace(' ', '-')}`}>
            <div className='service-card'>
                <img className='service-card-picture' src={image.src} alt="" onError={image.handleError} />
                <div className='service-card-separator' />
                <span className='service-card-profession'>{service.description}</span>
            </div>
        </Link>
    )
}

const Services: React.FC<Props> = ({ services }) => {

    // useEffect(() => {
    //     getServicesAll()
    // }, [getProducts])

    // const store = {
    //     rate: 3
    // }

    return (
        <div>
            {/* <CategoriesContainer>
                <NavbarCategories bg='light' expand='lg' className='p-0'>
                    <Navbar.Toggle>
                        <FontAwesomeIcon icon={faBars} color='#fff' />
                    </Navbar.Toggle>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='p-0'>

                            <Nav.Item>
                                <NavLinkCategories href='#'>CATEGORIAS:</NavLinkCategories>
                            </Nav.Item>
                            {services.map(service => <Nav.Item>
                                <NavLink href={`/services/${service.description.replace(' ', '-')}`}>{service.description.toUpperCase()}</NavLink>
                            </Nav.Item>)}
                        </Nav>
                    </Navbar.Collapse>
                </NavbarCategories>
            </CategoriesContainer> */}
            <Container>
                <div className="block-items-container">
                    <h5 className='m-2'>SERVIÇOS</h5>
                    <div className="row">
                        <div className='services-cards'>
                            {services.map((service) => <ServiceItem key={service.id} service={service} />)}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    services: state.services.servicesStatus.services,
})

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({ ...ServicesActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Services)
