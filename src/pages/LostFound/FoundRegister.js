import React from 'react'
import LostFoundForm from './LostFoundForm'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2em 0;
`

const Header = styled.h4`
  margin-bottom: 1em;
`

const LostRegister = () => {
  return (
    <Container>
      <Wrapper>
        <Header>Cadastre o pet encontrado</Header>
        <LostFoundForm type='found' validate={false} />
      </Wrapper>
    </Container>
  )
}

export default LostRegister
