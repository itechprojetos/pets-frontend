import React, { useState } from 'react'

import './styles.scss'
import { Container } from 'react-bootstrap'
import FooterBanner from '../../../components/FooterBanner'
import ClientForm from './ClientForm'
import ProviderFormChooseType from './ProviderFormChooseType'
import { bindActionCreators } from 'redux'
import { CustomerActions } from '../../../store/actions/customer'
import { connect } from 'react-redux'
import SignUpSuccess from './SignUpSuccess'
import { CustomerTypesIds } from '../../../shared'

interface Props {
    signUpErrorMessage: string
    signUpSuccess: boolean
}

const SignUp: React.FC<Props> = ({signUpSuccess, signUpErrorMessage}) => {

    const [isClient, setIsClient] = useState(true)
    const [providerType, setProviderType] = useState(0)

    const onProviderTypeChosen = (providerTypeChosen: number) => {
        setProviderType(providerTypeChosen)
    }

    let providerTypeDescription = 'cadastro'
    switch (providerType) {
        case CustomerTypesIds.dayCare:
            providerTypeDescription = 'Cadastro para Day Care'
            break
        case CustomerTypesIds.trainingSchool:
            providerTypeDescription = 'Cadastro para Escolha de Treinamento'
            break
        case CustomerTypesIds.hotel:
            providerTypeDescription = 'Cadastro para Hotel'
            break
        case CustomerTypesIds.ong:
            providerTypeDescription = 'Cadastro para ONG'
            break
    }

    return (
        <Container className="sign-up-content">
            {!signUpSuccess && <div className="sign-up-content-title">
                Vamos começar o seu <span>{providerTypeDescription}!</span>
            </div>}
            {!signUpSuccess && signUpErrorMessage && signUpErrorMessage.length > 0 && <div className="sign-up-content-error-message">
                {signUpErrorMessage}
            </div>}
            <form>
                {!signUpSuccess && providerType === 0 && <div className="d-flex sign-up-content-type">
                    <div>
                        VOCÊ É:
                    </div>
                    <div className="form-check form-check-inline ml-3">
                        <input className="form-check-input" type="radio" name="radioClient" id="radioClient"
                               checked={isClient}
                               onChange={event => setIsClient(event.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="radioClient">Cliente</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="ratioProvider"
                               checked={!isClient}
                               onChange={event => setIsClient(!event.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="ratioProvider">Fornecedor</label>
                    </div>
                </div>}
                {signUpSuccess ? <SignUpSuccess/> : (isClient ? <ClientForm/> : <ProviderFormChooseType onChosenType={onProviderTypeChosen}/>)}
            </form>
            {!signUpSuccess && <FooterBanner/>}
        </Container>
    )
}

const mapStateToProps = (state: any) => {
    return ({
        signUpSuccess: state.customer.customerStatus.signUpSuccess,
        signUpErrorMessage: state.customer.customerStatus.signUpErrorMessage,
    })
}

const mapDispatchToPros = (dispatch: any) => bindActionCreators(
    {...CustomerActions}, dispatch
)

export default connect(mapStateToProps, mapDispatchToPros)(SignUp)
