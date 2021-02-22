import React, { useEffect } from 'react'
import styled from 'styled-components'
import history from '../../../routes/history'

const Congrats = styled.div`
  color: #fab900;
  font-size: 2rem;
  font-weight: 500;
`

const CongratsMessage = styled.div`
  color: #333;
  font-size: 1.1rem;
  font-weight: 500;
`

interface Props {

}

const SignUpSuccess: React.FC<Props> = () => {

    useEffect(() => {
        setTimeout(() => {
            history.push('/')
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }, 5000)
    })
    return (
        <div className="d-flex justify-content-between mt-5">
            <div className="d-flex flex-column justify-content-center">
                <Congrats>Parabéns!</Congrats>
                <CongratsMessage>
                    Seu cadastro foi concluído com Sucesso!
                </CongratsMessage>
            </div>
            <div>
                <img src={require('../../../assets/images/sign-up-success-img.jpg')} alt="" height={600}/>
            </div>
        </div>
    )
}

export default SignUpSuccess
