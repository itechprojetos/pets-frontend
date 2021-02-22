import React, { useEffect, useState /*useContext*/ } from 'react'
import { bindActionCreators } from 'redux'
import { CustomerActions } from '../../../store/actions/customer'
import { connect } from 'react-redux'
//import { Customer } from '../../../models/Customer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faCreditCard, faPlusSquare, faStar, faUser } from '@fortawesome/free-solid-svg-icons'
import history from '../../../routes/history'
import { Button, Container, Modal } from 'react-bootstrap'
import { ServicesActions } from '../../../store/actions/services'
import { Service } from '../../../models/Service'

import './styles.scss'
//import AuthenticationContext from '../../../components/Authentication/AuthenticationContext'

interface Props {
  // customer: Customer
  // customerGet: () => void
  servicesUser: Service[]
  serviceGetAllUser: () => void
  serviceDelete: (id: number) => void
  serviceEdit: (service: Service) => void
}

const ManageServicesEdit: React.FC<Props> = ({
  //  customer,
  //  customerGet,
  servicesUser,
  serviceGetAllUser,
  serviceDelete,
  serviceEdit
}) => {

  //const { customer } = useContext(AuthenticationContext)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletingService, setDeletingService] = useState<Service | undefined>(undefined)



  useEffect(() => {
    serviceGetAllUser()
  }, [serviceGetAllUser])

  const edit = (service: Service) => {
    serviceEdit(service)
    setTimeout(() => {
      history.push('/profile/manage-services/edit/form')
    })
  }

  const prepareDeleteService = (service: Service) => {
    setDeletingService(service)
    setShowDeleteModal(true)
  }

  const deleteService = () => {
    setShowDeleteModal(false)
    if (deletingService) {
      serviceDelete(deletingService.id)
    }
  }

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
        <div className="professional-menu-item pointer professional-menu-item-active"
          onClick={() => history.push('/profile/manage-services')}>
          <FontAwesomeIcon icon={faCog} /><span>GERENCIAR SERVIÇOS</span>
        </div>
        <div className="professional-menu-item pointer">
          <FontAwesomeIcon icon={faStar} color="#ffbd00" /><span>MINHAS AVALIAÇÕES</span>
        </div>
      </div>
      <div className="col-md-5 mt-4">

        <div className="d-flex align-items-center">
          <div className="profile-title mr-4">Gerenciar Serviços</div>
          <div className="pointer" onClick={() => history.push('/profile/manage-services/edit/form')}>
            <FontAwesomeIcon icon={faPlusSquare} color='#ffbd00' /><span> ADICIONAR</span>
          </div>
        </div>
        <div className="profile-subtitle mt-3">SERVIÇOS CADASTRADOS</div>


        {servicesUser.length === 0 && <div className="mt-5 mb-5">Nenhum serviço cadastrado</div>}

        <div className="mt-4 mb-5">
          {servicesUser.map((service, index) => {
            return (
              <div key={index} className="d-flex justify-content-between">
                <div>{service.description.toUpperCase()}</div>
                <div>
                  <button className="button-edit-delete" onClick={() => edit(service)}>(EDITAR)
                                    </button>
                  <button className="button-edit-delete"
                    onClick={() => prepareDeleteService(service)}>(EXCLUIR)
                                    </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>EXCLUIR</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir o
                    serviço <strong>{deletingService?.description}</strong>?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Não
                    </Button>
          <Button variant="primary" onClick={deleteService}>
            Sim
                    </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

const mapStateToProps = (state: any) => ({
  customer: state.customer.customerStatus.customer,
  servicesUser: state.services.servicesStatus.servicesUser,
})

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ ...CustomerActions, ...ServicesActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ManageServicesEdit)
