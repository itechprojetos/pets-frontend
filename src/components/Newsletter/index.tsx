import React, { useCallback, useState } from 'react'

import './styles.scss'
import api from '../../services/api'
import { toast } from 'react-toastify'

interface Props {
}

const CardItem: React.FC = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChangeEmail = useCallback((e) => {
    setEmail(e.target.value)
  }, [])

  const handleSignUp = useCallback(() => {
    setLoading(true)
    api.post('/services/app/Newsletters/CreateOrEdit', { email: email })
      .then(() => {
        toast.success('Você está agora cadastrado para receber nossas novidades!')
        setEmail('')
      })
      .catch(() => {
        toast.error('Algum erro ocorreu.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [email])

  return (
    <div className="newsletter-wrapper">
      <div className="news-container">
        <span className="news-message">CADASTRE-SE PARA RECEBER OFERTAS EXCLUSIVAS POR E-MAIL</span>
        <div className="news-form-wrapper">
          <input className="news-form-input" placeholder="Digite seu email" type="email" value={email} onChange={handleChangeEmail} />
          <button className="news-form-button" type="button" onClick={handleSignUp} disabled={loading}>Cadastre-se</button>
        </div>
      </div>
    </div>
  )
}

export default CardItem
