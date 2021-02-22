import React from 'react'
import FooterBanner from '../../components/FooterBanner'
import { Container } from 'react-bootstrap'

import './styles.scss'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { LostFindsActions } from '../../store/actions/lostfinds'

const LostFound = ({
  userSigned,
  lostFindsSuccess,
  lostFindsErrorMessage,
  lostFind,
  lostFindSetError
}) => {
  const notSignedError = !userSigned
    ? 'Você precisa estar logado para acessar essa funcionalidade.'
    : undefined

  const sendRegister = () => {}

  return (
    <Container className='lost-finds-content'>
      <div className='lost-finds-content-title'>
        Perdeu ou Encontrou um Pet?{' '}
        <span>Compartilha com a nossa comunidade!</span>
      </div>
      {lostFindsErrorMessage && (
        <div className='lost-finds-content-message-error'>
          {lostFindsErrorMessage}
        </div>
      )}
      {notSignedError && (
        <div className='lost-finds-content-message-error'>{notSignedError}</div>
      )}
      {lostFindsSuccess && (
        <div className='donate-content-message-success'>
          Cadastro de achados e perdidos efetuado com sucesso!
        </div>
      )}
      {!lostFindsSuccess && userSigned && (
        <form>
          <div className='form-group row mt-5 mb-1'>
            <label className='small font-weight-bold ml-2'>
              Fale um pouco sobre o Pet
            </label>
          </div>
          <div className='form-group row'>
            <input
              className='form-control col-md-6'
              aria-label=''
              placeholder='Local onde foi encontrado'
            />
          </div>
          <div className='form-group row'>
            <input
              className='form-control col-md-6'
              aria-label=''
              placeholder='Ponto de referência'
            />
          </div>
          <div className='form-group row'>
            <textarea
              className='form-control col-md-6'
              aria-label=''
              placeholder='Informações adicionais'
            />
          </div>
          <div className='form-group row'>
            <button
              className='btn btn-primary'
              type='button'
              onClick={sendRegister}
            >
              Cadastrar
            </button>
          </div>
        </form>
      )}
      <FooterBanner />
    </Container>
  )
}

const mapStateToProps = state => ({
  userSigned: state.customer.customerStatus.userSigned,
  lostFindsSuccess: state.lostfinds.lostFindsStatus.lostFindsSuccess,
  lostFindsErrorMessage: state.lostfinds.lostFindsStatus.lostFindsErrorMessage
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...LostFindsActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LostFound)
