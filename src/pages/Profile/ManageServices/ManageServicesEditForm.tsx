import React, { useEffect, useState, useMemo } from 'react'
import { bindActionCreators } from 'redux'
//import { CustomerActions } from '../../../store/actions/customer'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faCreditCard, faStar, faUser } from '@fortawesome/free-solid-svg-icons'
import history from '../../../routes/history'
import { Container } from 'react-bootstrap'
import { ServicesActions } from '../../../store/actions/services'
import InputFile from '../../../components/InputFile'
import { Service } from '../../../models/Service'
import { ProfessionalService } from '../../../models/ProfessionalService'
import AwsS3Service from '../../../services/aws-s3.service'

import Select from 'react-select'

interface Props {
    serviceCreateOrEdit: (data: any) => void
    serviceSetErrorMessage: (message: string) => void
    serviceClear: () => void
    servicesErrorMessage: string
    servicesCreateEditSuccess: boolean
    serviceEditing: ProfessionalService,
    serviceGetAll: () => void,
    services: Service[],
    servicesUser: ProfessionalService[]
}

const ManageServicesEditForm: React.FC<Props> = ({
    servicesErrorMessage,
    serviceSetErrorMessage,
    serviceCreateOrEdit,
    serviceClear,
    servicesCreateEditSuccess,
    serviceEditing,
    serviceGetAll,
    services,
    servicesUser
}) => {

    const [description, setDescription] = useState('Selecione o serviço')
    const [value, setValue] = useState('')
    const [image, setImage] = useState('')
    const [imageDescription, setImageDescription] = useState('')
    const [file, setFile] = useState<File | undefined>(undefined)

    useEffect(() => {
        if (serviceEditing) {
            setDescription(serviceEditing.description)
        }
    }, [serviceEditing])

    useEffect(() => {
        serviceGetAll()
    }, [serviceGetAll])

    const onImageChosen = async (file: File, dataBase64: string) => {
        setImage(dataBase64)
        setImageDescription(file.name)
        setFile(file)
    }

    const register = async () => {
        if (description.trim().length === 0) {
            serviceSetErrorMessage('Por favor, informe uma descrição.')
        } else {
            const data = {
                file,
                description,
                value: value.replace(',', '.'),
                id: serviceEditing && serviceEditing.id ? serviceEditing.id : 0,
                url_image: image,
            } as any
            serviceCreateOrEdit(data)
            const response = await AwsS3Service.upload(data.url_image, '/api​/services​/app​/Services​/CreateOrEdit')
            console.log(response)
        }
    }

    if (servicesCreateEditSuccess) {
        console.log('SERVICES CREATE EDIT SUCCESS')
        setTimeout(() => {
            history.goBack()
        })
        serviceClear()
    }

    console.log({ services, description })

    const servicesOptions = useMemo(() => {
        let existingDescriptions = servicesUser.map(s => s.description)
        if (serviceEditing) {
            existingDescriptions = existingDescriptions.filter(d => d !== serviceEditing.description)
        }

        return services.map(s => s.description).filter(sd => !existingDescriptions.includes(sd)).map(description => ({ value: description, label: description }))
    }, [services, servicesUser, serviceEditing])

    function handleNumberChange({ target: { value } }) {
        if (value.length < 10 && /^\d*,?\d*$/.test(value)) {
            setValue(value)
        }
    }

    return (
        <Container>
            <div className="d-flex align-items-center professional-menu mt-2">
                <div className="professional-menu-item pointer"
                    onClick={() => history.push('/profile')}>
                    <FontAwesomeIcon icon={faUser} /><span>MEU PERFIL</span>
                </div>
                <div className="professional-menu-item pointer"
                    onClick={() => history.push('/profile/my-card')}>
                    <FontAwesomeIcon icon={faCreditCard} /><span>MEUS CARTÕES</span>
                </div>
                <div className="professional-menu-item pointer professional-menu-item-active"
                    onClick={() => history.push('/profile/manage-services')}>
                    <FontAwesomeIcon icon={faCog} /><span>GERENCIAR SERVIÇOS</span>
                </div>
                <div className="professional-menu-item pointer">
                    <FontAwesomeIcon icon={faStar} color="#ffbd00" /><span>MINHAS AVALIAÇÕES</span>
                </div>
            </div>
            <div className="col-md-5 mt-4">

                <div className="profile-title mr-4">Gerenciar Serviços</div>

                {servicesErrorMessage && <div className="sign-up-content-error-message">
                    {servicesErrorMessage}
                </div>}

                <div className="form-group row mt-5" >
                    <Select className='w-100' options={servicesOptions} value={{ label: description, value: description }} onChange={(item) => {
                        if (item && 'value' in item)
                            setDescription(item.value)
                    }}>
                    </Select>
                </div>
                <div className='inputDiv form-group row'>
                    <span className='position-absolute mt-1 ml-2'>R$</span>
                    <input
                        value={value}
                        onChange={handleNumberChange}
                        className='inptPrice'
                        placeholder='Valor do serviço' />
                </div>
                <div className="form-group row">
                    <InputFile className="col-md-12" aria-label="" placeholder="Adicionar foto"
                        value={imageDescription}
                        onFileChosen={onImageChosen} />
                </div>
                {image && <div className="form-group row">
                    <img src={image} className="col-md-12 w-100" alt="" />
                </div>}
                <div className="form-group row">
                    <button className="btn btn-primary" type="button"
                        onClick={register}>Salvar
                    </button>
                </div>

            </div>
        </Container>
    )
}

const mapStateToProps = (state: any) => ({
    servicesCreateEditSuccess: state.services.servicesStatus.servicesCreateEditSuccess,
    servicesErrorMessage: state.services.servicesStatus.servicesErrorMessage,
    serviceEditing: state.services.servicesStatus.serviceEditing,
    services: state.services.servicesStatus.services,
    servicesUser: state.services.servicesStatus.servicesUser
})

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({ ...ServicesActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ManageServicesEditForm)
