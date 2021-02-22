import React, { useEffect, useContext } from 'react'
import { bindActionCreators } from 'redux'
import { CustomerActions } from '../../../store/actions/customer'
import { connect } from 'react-redux'
import { Customer } from '../../../models/Customer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faCreditCard, faPen, faStar, faUser } from '@fortawesome/free-solid-svg-icons'
import history from '../../../routes/history'
import { Container } from 'react-bootstrap'
import { ServicesActions } from '../../../store/actions/services'
import { Service } from '../../../models/Service'
import AuthenticationContext from '../../../contexts/Authentication/AuthenticationContext'

interface Props {
    // customer: Customer
    // customerGet: () => void
    servicesUser: Service[]
    serviceGetAllUser: () => void
}

const ManageServices: React.FC<Props> = ({ servicesUser, serviceGetAllUser }) => {
    const { customer } = useContext(AuthenticationContext)
    // useEffect(() => {
    //     customerGet()
    // }, [customerGet])

    useEffect(() => {
        serviceGetAllUser()
    }, [serviceGetAllUser])

    console.log('servicesUser: ', servicesUser)

    return (
        <Container>
            <div className="d-flex align-items-center professional-menu mt-2">
                <div className="professional-menu-item pointer"
                    onClick={() => history.push('/profile')}>
                    <FontAwesomeIcon icon={faUser} /><span>MEU PERFIL</span>
                </div>
                <div className="professional-menu-item pointer"
                    onClick={() => history.push('/profile/my-card')}>
                    <FontAwesomeIcon icon={faCreditCard} /><span>MEUS CARTÕES</span>
                </div>
                <div className="professional-menu-item professional-menu-item-active">
                    <FontAwesomeIcon icon={faCog} /><span>GERENCIAR SERVIÇOS</span>
                </div>
                <div className="professional-menu-item pointer">
                    <FontAwesomeIcon icon={faStar} color="#ffbd00" /><span>MINHAS AVALIAÇÕES</span>
                </div>
            </div>
            <div className="col-md-5 mt-4">
                <div className="profile-title">Gerenciar Serviços</div>
                <div className="profile-subtitle mt-3">SERVIÇOS CADASTRADOS <FontAwesomeIcon icon={faPen}
                    color='#333' size="sm"
                    className="pointer"
                    onClick={() => history.push('/profile/manage-services/edit')}
                />
                </div>
                {servicesUser.length === 0 && <div className="mt-5 mb-5">Nenhum serviço cadastrado</div>}
                <div className="mt-4 mb-5">
                    {servicesUser.map((service, index) => {
                        return (
                            <div key={index} className="d-flex justify-content-between">
                                <div>{service.description.toUpperCase()}</div>
                            </div>
                        )
                    })}
                </div>


            </div>
        </Container>
    )
}

const mapStateToProps = (state: any) => ({
    customer: state.customer.customerStatus.customer,
    servicesUser: state.services.servicesStatus.servicesUser,
})

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({ ...CustomerActions, ...ServicesActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ManageServices)
