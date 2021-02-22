import React, { useState, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faCreditCard, faStar, faUser, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import history from '../../../../routes/history'
import '../styles.scss'
import { Row, Col, FormGroup, Form } from 'react-bootstrap';
import { Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import InputMask from 'react-input-mask';
import api from '../../../../services/api'
import AuthenticationContext from '../../../../contexts/Authentication/AuthenticationContext'
import useFetchArray from '../../../../hooks/useFetchArray'
import './styles.scss'

const MyCard = () => {
  const { customer } = useContext(AuthenticationContext)
  const { data } = useFetchArray('/services/app/CardsCustomer/GetAll')

  const [Card, setCard] = useState(false)
  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpireData, setCardExpireData] = useState('')
  const [extractedNumbers, setExtractedNumbers] = useState([])
  const [cardPicture, setCardPicture] = useState(null)
  const [cardCompanyName, setCardCompanyName] = useState(null)

  useEffect(() => {
    data.map((data) => (setExtractedNumbers(data.cardCustomer.card)))
    const cardIddentfier = extractedNumbers[0]
    if (cardIddentfier == 3) {
      setCardPicture(require('../../../../assets/images/cards/american-express.svg'))
      setCardCompanyName('American Express')
    }
    if (cardIddentfier == 4) {
      setCardPicture(require('../../../../assets/images/cards/visa.svg'))
      setCardCompanyName('Visa')
    }
    if (cardIddentfier == 5) {
      setCardPicture(require('../../../../assets/images/cards/mastercard.svg'))
      setCardCompanyName('MasterCard')
    }
    if (cardIddentfier == 6) {
      setCardPicture(require('../../../../assets/images/cards/discover.svg'))
      setCardCompanyName('Discover')
    }
  }, [cardPicture, extractedNumbers, data])

  async function cardDataSubmit(e) {
    e.preventDefault()

    const data = {
      card: cardNumber,
      name: cardName,
      customerId: customer.id,
      cardExpireData,
    } as any
    const response = await api.post('/services/app/CardsCustomer/CreateOrEdit', data)
    console.log(response)
    setCard(false)
    history.push('/profile/my-card')
  }

  async function cardDelete(e) {
    e.preventDefault()

    const cardIdData = {
      id: data.map((data) => (data.cardCustomer.id))
    } as any
    const res = await api.delete('/services/app/CardsCustomer/Delete', cardIdData)
    console.log(res)
  }

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
          {Card === false &&
            <div className="pointer" onClick={() => setCard(true)}>
              <FontAwesomeIcon icon={faPlusSquare} color='#ffbd00' /><span> ADICIONAR</span>
            </div>
          }
        </div>
        {!Card && !data &&
          <>
            <div className="profile-subtitle mt-3">Cartões cadastrados</div>
            <div className="spanDescriver mb-5 mt-5">
              <span>Nenhum cartão cadastrado.</span>
            </div>
          </>
        }
        {!Card && data.map((data) => (
          <div className="dataMainDiv">
            <table className="table">
              <thead className="bg-warning">
                <tr>
                  <th className="height" scope="col">Número do cartão</th>
                  <th className="height" scope="col">Titular do cartão</th>
                  <th className="height" scope="col">Data de vencimento</th>
                  <th className="height" scope="col" />
                  <th className="height" scope="col" />
                </tr>
              </thead>
              <tbody className="table-primary">
                <tr>
                  <th scope="row">
                    <img className="cardImage" src={cardPicture} alt="" /> {cardCompanyName} com final {extractedNumbers.slice(14)}
                  </th>
                <td>Marcos Aurélio de Sousa</td>
                <td>19/21</td>
                <td onClick={cardDelete} className="deleteButton">Excluir</td>
                <td className="editButton" onClick={() => history.push('/profile/my-card/form-edit')}>Editar</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
      {
    Card &&
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
                mask="9999 9999 9999 9999"
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
  }
    </Container >
  )
}


const mapStateToProps = (state: any) => ({
  customer: state.customer.customerStatus.customer
})

export default connect(mapStateToProps)(MyCard)