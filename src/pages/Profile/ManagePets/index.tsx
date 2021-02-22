import React, { useEffect /*useContext*/ } from 'react'
import { bindActionCreators } from 'redux'
import { CustomerActions } from '../../../store/actions/customer'
import { connect } from 'react-redux'
//import { Customer } from '../../../models/Customer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, /*faCreditCard*/ faPen, faStar, faUser } from '@fortawesome/free-solid-svg-icons'
import history from '../../../routes/history'
import { Container } from 'react-bootstrap'
import { ServicesActions } from '../../../store/actions/services'
import { PetsActions } from '../../../store/actions/pets'
import { Service } from '../../../models/Service'
import { Pet } from '../../../models/Pet'
//import PaginatedContent from '../../../components/PaginatedContent'
//import AuthenticationContext from '../../../components/Authentication/AuthenticationContext'

interface Props {
    // customer: Customer
    // customerGet: () => void
    servicesUser: Service[]
    serviceGetAllUser: () => void
    userPets: Pet[]
}

const ManagePets: React.FC<Props> = ({ servicesUser, serviceGetAllUser, userPets }) => {
    //const { customer } = useContext(AuthenticationContext)
    // useEffect(() => {
    //     customerGet()
    // }, [customerGet])

    useEffect(() => {
        serviceGetAllUser()
    }, [serviceGetAllUser])

    // console.log('servicesUser: ', servicesUser)
    // console.log('userPets:', userPets)

    return (
        <Container>
            <div className="d-flex align-items-center professional-menu mt-2">
                <div className="professional-menu-item professional-menu-item-active">
                    <FontAwesomeIcon icon={faUser} /><span>MEU PERFIL</span>
                </div>
                <div className="professional-menu-item pointer" onClick={() => history.push('profile/manage-services')}>
                    <FontAwesomeIcon icon={faCog} /><span>GERENCIAR SERVIÇOS</span>
                </div>
                <div className="professional-menu-item pointer">
                    <FontAwesomeIcon icon={faStar} color="#ffbd00" /><span><b>GERENCIAR PETS</b></span>
                </div>
            </div>
            <div className="col-md-5 mt-4">
                <div className="profile-title">Gerenciar Pets</div>

                <div className="profile-subtitle mt-3">PETS CADASTRADOS
                {/* <FontAwesomeIcon 
                    icon={faPen}
                    color='#333' size="sm"
                    className="pointer"
                    onClick={() => history.push('/profile/manage-services/edit')}
                /> */}
                </div>

                {userPets.length === 0 && <div className="mt-5 mb-5">Nenhum pet cadastrado</div>}

                {/* <div className="mt-4 mb-5">
                    {servicesUser.map((service, index) => {
                        return (
                            <div key={index} className="d-flex justify-content-between">
                                <div>{service.description.toUpperCase()}</div>
                            </div>
                        )
                    })}
                </div> */}
                <div className="d-flex justify-content-between mt-3 row">
                    {userPets.map((pet, index) => {
                        return (
                            <div key={index}>
                                <div className="pet-image">
                                    <img
                                        src={pet.url_image ? pet.url_image : require('../../../assets/images/dog.png')}
                                        alt="" />
                                </div>
                                <div className="text-center">{pet.name}
                                    <FontAwesomeIcon
                                        icon={faPen}
                                        style={{ marginLeft: '5px', color: '#333' }}
                                        size="sm"
                                        className="pointer"
                                        onClick={() => history.push(`profile/edit-my-pet/${pet.id}`)}
                                    // onClick={() => setUpdateData(!updateData)}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
                {/* <PaginatedContent currentPage={search.page} loading={search.loading} onNextPage={search.navigateToNextPage} onPreviousPage={search.navigateToPreviousPage} onPageClick={search.navigateToPage} totalPages={search.pagesCount}>
                {search.data.map((v, k) => <SearchItem key={k} />)}
                </PaginatedContent> */}
            </div>
        </Container>
    )
}

const mapStateToProps = (state: any) => ({
    customer: state.customer.customerStatus.customer,
    servicesUser: state.services.servicesStatus.servicesUser,
    userPets: state.pets.petsStatus.userPets,
})

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({ ...CustomerActions, ...ServicesActions, ...PetsActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ManagePets)
