import React from 'react'
import LostFoundForm from './LostFoundForm'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'
import api from '../../services/api'
import { toast } from 'react-toastify'
import history from '../../routes/history'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2em 0;
`

const Header = styled.h4`
  margin-bottom: 1em;
`

const LostRegister = () => {
  const submitHandler = data => {
    api
      .post('/services/app/LostFinds/CreateOrEdit', data)
      .then(() => {
        toast.success('O pet foi cadastrado com sucesso!')
        history.push('/lost-found')
      })
      .catch(() => {
        toast.error('Erro na sua solicitação')
      })
  }
  return (
    <Container>
      <Wrapper>
        <Header>Cadastre seu pet perdido</Header>
        <LostFoundForm type='lost' submitHandler={submitHandler} />
      </Wrapper>
    </Container>
  )
}

export default LostRegister
