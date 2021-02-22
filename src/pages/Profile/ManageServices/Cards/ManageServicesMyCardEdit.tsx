import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faCreditCard, faStar, faUser } from '@fortawesome/free-solid-svg-icons'
import history from '../../../../routes/history'
import '../styles.scss'
import { Row, Col, FormGroup, Form } from 'react-bootstrap';
import { Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import InputMask from 'react-input-mask';
import useFetchArray from '../../../../hooks/useFetchArray'
import './styles.scss'

const MyCardEdit = () => {
  const { data } = useFetchArray('/services/app/CardsCustomer/GetAll')
  
  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpireData, setCardExpireData] = useState('')
  
  function cardDataSubmit() {}

  return (
    <Container>
      <div className="d-flex align-items-center professional-menu mt-2">
        <div className="professional-menu-item pointer"
          onClick={() => history.push('/profile')}>
          <FontAwesomeIcon icon={faUser} /><span>MEU PERFIL</span>
        </div>
        <div className="professional-menu-item pointer professional-menu-item-active">
          <FontAwesomeIcon icon={faCreditCard} /><span>MEUS CARTÕES</span>
        </div>
        <div className="professional-menu-item pointer"
          onClick={() => history.push('/profile/manage-services')}>
          <FontAwesomeIcon icon={faCog} /><span>GERENCIAR SERVIÇOS</span>
        </div>
        <div className="professional-menu-item pointer">
          <FontAwesomeIcon icon={faStar} color="#ffbd00" /><span>MINHAS AVALIAÇÕES</span>
        </div>
      </div>
      <div className="col-md-7 mt-4">
        <div className="d-flex align-items-center">
          <div className="profile-title mr-4">Gerenciar Cartões</div>
        </div>
      </div>
      <div className="cardFormDiv">
        <Form onSubmit={cardDataSubmit}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <InputMask
                  mask=""
                  className="inputMaskStyle"
                  placeholder="Nome do titular do cartão"
                  type='text'
                  value={cardName}
                  onChange={e => setCardName(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <InputMask
                  mask="9999999999999999"
                  maskChar=""
                  className="inputMaskStyle"
                  placeholder="Número do cartão"
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <InputMask
                  mask="99/99"
                  maskChar=""
                  placeholder="Data de vencimento"
                  className="inputMaskStyle"
                  value={cardExpireData}
                  onChange={e => setCardExpireData(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Col md={12}>
            <button style={{ marginBottom: '12px' }} className="btn btn-primary" type="submit">Adicionar cartão</button>
          </Col>
        </Form>
      </div>
    </Container>
  )
}


const mapStateToProps = (state: any) => ({
  customer: state.customer.customerStatus.customer
})

export default connect(mapStateToProps)(MyCardEdit)