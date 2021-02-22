import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { faCog, faCreditCard, faStar, faUser, faPen } from '@fortawesome/free-solid-svg-icons'
import history from '../../../../routes/history'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles.scss'
import useFetchArray from '../../../../hooks/useFetchArray'
import './styles.scss'

const MyCard = () => {
  const { data } = useFetchArray('/services/app/CardsCustomer/GetAll')

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
        <div className="profile-subtitle mt-3">CARTÕES CADASTRADOS
        <FontAwesomeIcon
            onClick={() => history.push('/profile/my-card/form')}
            icon={faPen}
            color='#333'
            size="sm"
            className="pointer leftPen"
          />
        </div>
        {!data &&
          <div className="spanDescriver mb-5 mt-5">
            <span>Nenhum cartão cadastrado.</span>
          </div>
        }
        {data.map((data) => (
          <div className="dataMainDiv">
            <table className="table">
              <thead className="bg-warning">
                <tr>
                  <th className="height" scope="col">Número do cartão</th>
                  <th className="height" scope="col">Titular do cartão</th>
                  <th className="height" scope="col">Data de vencimento</th>
                </tr>
              </thead>
              <tbody className="table-primary">
                <tr>
                  <th scope="row">
                    <img className="cardImage" src={cardPicture} alt="" /> {cardCompanyName} com final {extractedNumbers.slice(14)}</th>
                  <td>Marcos Aurélio</td>
                  <td>19/21</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default MyCard