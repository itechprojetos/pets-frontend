import React from 'react'
import styled from "styled-components"
import { Link } from 'react-router-dom'
import { Container, Image } from 'react-bootstrap'

import './styles.scss'

const LinkStyled = styled(Link)`
    color: #fff;
    font-size: 12px;
    text-decoration: none;
    &:hover{
        text-decoration: none;
        color: #f1f1f1;
    }
`

const Footer: React.FC = () => {
    return (
        <div className="footer">
            <Container>
                <Image src={require('../../assets/images/logo.png')} height={50} />
                <div>
                    <LinkStyled to="/docs/who-we-are">QUEM SOMOS</LinkStyled>
                    <LinkStyled to="/docs/privacy-policy">POLÍTICA DE PRIVACIDADE</LinkStyled>
                    <LinkStyled to="/docs/terms">TERMOS DE USO</LinkStyled>
                    <LinkStyled to="/docs/be-a-partner">SEJA UM PARCEIRO</LinkStyled>
                </div>
                <div className="footer-col-2">
                    <LinkStyled to="/404redirect">PAGAMENTO RÁPIDO E FÁCIL</LinkStyled>
                </div>
                <div className="footer-col-3">
                    <LinkStyled to="/404redirect">NOSSO SITE É SEGURO</LinkStyled>
                </div>
            </Container>
        </div>

    )
}

export default Footer
