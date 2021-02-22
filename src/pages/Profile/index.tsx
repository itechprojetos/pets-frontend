import React, { useEffect, useState, useContext } from 'react'
import { Container } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { CustomerActions } from '../../store/actions/customer'
import { Customer } from '../../models/Customer'
import { Row, Col, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import './styles.scss'
import { faCamera, faPen, faPlusSquare, faUser, faCreditCard, faCog, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import md5 from 'md5'
import history from '../../routes/history'
//import { CustomerTypesIds } from '../../shared'
import { PetsActions } from '../../store/actions/pets'
import { Pet } from '../../models/Pet'
import { DonationActions } from '../../store/actions/donation'
import InputMask from 'react-input-mask'
import awsS3Service from '../../services/aws-s3.service'

import UploadFile from '../../components/UploadFile'
import AuthenticationContext from '../../contexts/Authentication/AuthenticationContext'
import { Spinner } from 'react-bootstrap'

interface Props {
    customer: Customer
    // customerGet: () => void
    customerCreateOrEdit: (data: any) => void
    petsGetAllUser: () => void
    userPets: Pet[]
    donateGetAllUser: () => void
    userDonations: Pet[]
}

const Profile: React.FC<Props> = ({
    // customer,
    // customerGet,
    customerCreateOrEdit,
    petsGetAllUser,
    userPets,
    donateGetAllUser,
    userDonations
}) => {
    const { customer } = useContext(AuthenticationContext)
    const [updateData, setUpdateData] = useState(false)
    const [updateAdditionalData, setUpdateAdditionalData] = useState(false)
    const custumerImg = customer !== undefined ? customer.url_image : require("../../assets/images/user_no_photo.jpg")

    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [userPreviewImage, setUserImage] = useState(custumerImg !== null ? custumerImg : require("../../assets/images/user_no_photo.jpg"));
    const [thumbLoading, setThumbLoading] = useState(false)

    useEffect(() => {
        petsGetAllUser()
    }, [petsGetAllUser])

    useEffect(() => {
        donateGetAllUser()
    }, [donateGetAllUser])

    // useEffect(() => {
    //     customerGet()
    // }, [customerGet])

    useEffect(() => {
        if (customer && customer.id) {
            setName(customer.name || '')
            setCpf(customer.cpF_CNPJ || '')
            setEmail(customer.email || '')
            setPhone(customer.phone || '')
            setZipcode(customer.zipcode || '')
            setCity(customer.city || '')
            setAddress(customer.address || '')
        }
    }, [customer])

    const performUpdateData = async () => {
        const pass = password.trim().length > 0 ? md5(password) : undefined
        const data = {
            ...customer,
            name,
            email,
            cpF_CNPJ: cpf.replace('.', '').replace('-', '').replace('/', ''),
            url_image: userPreviewImage,
        } as any
        if (pass) {
            data.password = pass
        }
        setUpdateData(false)
        customerCreateOrEdit(data)
        if (data.url_image !== undefined) {
            try {
                const response = await awsS3Service.upload(data.url_image, 'api/services/app/Profile/UpdateProfilePicture')
                if (customer) {
                    customer.url_image = data.url_image
                }
                console.log(response)
            } catch (e) {
                console.log('error')
            }
        }
    }

    const performUpdateAdditionalData = () => {
        const data = {
            ...customer,
            phone,
            zipcode,
            city,
            address,
        }
        setUpdateAdditionalData(false)
        customerCreateOrEdit(data)
    }

    const petSize = 120
    // "{"id":1,"password":"e10adc3949ba59abbe56e057f20f883e","phone":"48999999999","zipcode":"","city":"","address":""}"

    let customerTypeId = 0
    if (customer) {
        customerTypeId = customer.customerTypeId || 0
    }

    // console.log('aqui', customerTypeId);


    // const showImgInput = async (idCampo) => {
    //     let reader = new FileReader()
    //     const campo = document.getElementById(idCampo) as HTMLInputElement

    //     if (campo.files[0] !== undefined) {
    //         const response = await awsS3Service.upload(campo.files[0], 'api/services/app/Profile/UpdateProfilePicture')
    //         setUploadImage(response)
    //         setUserImage(response)
    //         return reader.readAsDataURL(campo.files[0])
    //     }
    // }

    const handleThumbChange = (e) => {
        setThumbLoading(true)
        awsS3Service.upload(e.target.files[0], 'api/services/app/Profile/UpdateProfilePicture')
            .then(link => {
                setUserImage(link)
            })
            .catch(() => {
                // setState({...state, })
            })
            .finally(() => {
                setThumbLoading(false)
            })
    }

    return (
        <Container>
            {/** Customer CLIENT =  1 */}
            {customerTypeId === 1 &&
                <div className="d-flex align-items-center professional-menu mt-2">
                    <div className="professional-menu-item professional-menu-item-active">
                        <FontAwesomeIcon icon={faUser} /><span>MEU PERFIL</span>
                    </div>
                    <div className="professional-menu-item pointer" onClick={() => history.push('profile/my-card')}>
                        <FontAwesomeIcon icon={faCreditCard} /><span>MEUS CARTÕES</span>
                    </div>
                    <div className="professional-menu-item pointer" onClick={() => history.push('profile/manage-services')}>
                        <FontAwesomeIcon icon={faCog} /><span>GERENCIAR SERVIÇOS</span>
                    </div>
                    <div className="professional-menu-item pointer">
                        <FontAwesomeIcon icon={faStar} color="#ffbd00" /><span>MINHAS AVALIAÇÕES</span>
                    </div>
                </div>}
            {/** Customer DayCare =  2 */}
            {customerTypeId === 2 &&
                <div className="d-flex align-items-center professional-menu mt-2">
                    <div className="professional-menu-item professional-menu-item-active">
                        <FontAwesomeIcon icon={faUser} /><span>MEU PERFIL</span>
                    </div>
                    <div className="professional-menu-item pointer">
                        <FontAwesomeIcon icon={faCreditCard} /><span>MEUS CARTÕES</span>
                    </div>
                    <div className="professional-menu-item pointer" onClick={() => history.push('profile/manage-services')}>
                        <FontAwesomeIcon icon={faCog} /><span>GERENCIAR SERVIÇOS</span>
                    </div>
                    <div className="professional-menu-item pointer">
                        <FontAwesomeIcon icon={faStar} color="#ffbd00" /><span>MINHAS AVALIAÇÕES</span>
                    </div>
                </div>}
                {customerTypeId === 3 &&
                <div className="d-flex align-items-center professional-menu mt-2">
                    <div className="professional-menu-item professional-menu-item-active">
                        <FontAwesomeIcon icon={faUser} /><span>MEU PERFIL</span>
                    </div>
                    <div className="professional-menu-item pointer">
                        <FontAwesomeIcon icon={faCreditCard} /><span>MEUS CARTÕES</span>
                    </div>
                    <div className="professional-menu-item pointer" onClick={() => history.push('profile/manage-services')}>
                        <FontAwesomeIcon icon={faCog} /><span>GERENCIAR SERVIÇOS</span>
                    </div>
                    <div className="professional-menu-item pointer">
                        <FontAwesomeIcon icon={faStar} color="#ffbd00" /><span>MINHAS AVALIAÇÕES</span>
                    </div>
                </div>}
            {/** Customer ONG = 5 */}
            {customerTypeId === 5 &&
                <div className="d-flex align-items-center professional-menu mt-2">
                    <div className="professional-menu-item professional-menu-item-active">
                        <FontAwesomeIcon icon={faUser} /><span>MEU PERFIL</span>
                    </div>
                    <div className="professional-menu-item pointer" onClick={() => history.push('profile/manage-services')}>
                        <FontAwesomeIcon icon={faCog} /><span>GERENCIAR SERVIÇOS</span>
                    </div>
                    <div className="professional-menu-item pointer" onClick={() => history.push('profile/manage-pets')}>
                        <FontAwesomeIcon icon={faStar} color="#ffbd00" /><span><b>GERENCIAR PETS</b></span>
                    </div>
                </div>}

            <div className="row profile mt-4">
                <div className="col-md-2 d-flex justify-content-center">
                    <div className={['profile-photo-container', updateData ? 'pointer' : ''].join(' ')}>
                        <img
                            className="profile-photo mt-4"
                            src={userPreviewImage !== null ? userPreviewImage : custumerImg}
                            alt=""
                            hidden={thumbLoading}
                        />
                        <div hidden={!thumbLoading} className='profile-photo mt-4' style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <Spinner animation='border' style={{ margin: '0 auto' }} />
                        </div>

                        {updateData &&

                            <label htmlFor="userImageID">
                                <input
                                    onChange={(e) => handleThumbChange(e)}
                                    id="userImageID"
                                    type="file"
                                    style={{
                                        visibility: "hidden",
                                        display: "none"
                                    }} />
                                <FontAwesomeIcon icon={faCamera} color='#888' size="2x" style={{ cursor: "pointer" }} className="profile-photo-edit" />
                            </label>
                        }
                    </div>
                </div>
                <div className="col-md-5 mt-4">
                    <div className="profile-title">Meu Perfil</div>
                    <div className="profile-subtitle mt-3">
                        MEU DADOS DE ACESSO
                    <FontAwesomeIcon
                            icon={faPen}
                            style={{ marginLeft: '5px', color: '#333' }}
                            size="sm"
                            className="pointer"
                            onClick={() => setUpdateData(!updateData)}
                        />
                    </div>
                    {!updateData && <>
                        {/* <div>NOME: {customer?.name || ''}</div>
                        <div>CPF: {customer?.cpF_CNPJ || ''}</div>
                        <div>EMAIL: {customer?.email || ''}</div>
                        <div>SENHA: {customer ? '********' : ''}</div> */}
                        <Row>
                            <Col md={12}>
                                <p>NOME: {name !== '' ? name : customer?.name}</p>
                                <p>CPF: {cpf !== '' ? cpf : customer?.cpF_CNPJ}</p>
                                <p>EMAIL: {email !== '' ? email : customer?.email}</p>
                                <p>SENHA: {customer ? '********' : ''}</p>
                            </Col>
                        </Row>
                    </>}
                    {/** Infos Adicionais */}
                    {updateData && <>
                        <Form onSubmit={performUpdateData}>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl
                                            placeholder="Nome Completo"
                                            type="text"
                                            value={name}
                                            onChange={(e: any) => setName(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <FormLabel>CPF</FormLabel>
                                        <InputMask
                                            className="form-control"
                                            mask={'999.999.999-99'}
                                            placeholder="CPF"
                                            type="text"
                                            value={cpf}
                                            onChange={(e: any) => setCpf(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl
                                            placeholder="EMAIL"
                                            type="text"
                                            value={email}
                                            onChange={(e: any) => setCpf(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl
                                            type="password"
                                            placeholder="Alterar Senha"
                                            value={password}
                                            onChange={(e: any) => setPassword(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <button className="btn btn-primary" type="submit">Atualizar</button>
                                </Col>
                            </Row>
                        </Form>
                    </>}

                    <div className="profile-subtitle mt-4">
                        INFORMAÇÕES ADICIONAIS
                        <FontAwesomeIcon
                            icon={faPen}
                            style={{ marginLeft: '5px', color: '#333' }}
                            size="sm"
                            className="pointer"
                            onClick={() => setUpdateAdditionalData(!updateAdditionalData)}
                        />
                    </div>
                    <Row>
                        <Col md={12}>
                            <p>Complete as informações adicionais para que possamos saber mais sobre você =)</p>
                        </Col>
                    </Row>

                    {!updateAdditionalData && <>
                        {/* <div>CELULAR: {customer?.phone || ''}</div>
                        <div>CEP: {customer?.zipcode || ''}</div>
                        <div>CIDADE: {customer?.city || ''}</div>
                        <div>ENDEREÇO: {customer?.address || ''}</div> */}
                        <Row>
                            <Col md={12}>
                                <p>CELULAR: {phone !== '' ? phone : customer?.phone}</p>
                                <p>CEP: {zipcode !== '' ? zipcode : customer?.zipcode}</p>
                                <p>CIDADE: {city !== '' ? city : customer?.city}</p>
                                <p>ENDEREÇO: {address !== '' ? address : customer?.address}</p>
                            </Col>
                        </Row>
                    </>}

                    {updateAdditionalData && <>
                        <Form onSubmit={performUpdateAdditionalData}>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <FormLabel>Celular</FormLabel>
                                        <InputMask
                                            mask={'(99) 99999-9999'}
                                            className="form-control"
                                            placeholder="Celular"
                                            type="text"
                                            value={phone}
                                            onChange={(e: any) => setPhone(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <FormLabel>CEP</FormLabel>
                                        <InputMask
                                            mask={'99.999-999'}
                                            className="form-control"
                                            placeholder="CEP"
                                            type="text"
                                            value={zipcode}
                                            onChange={(e: any) => setZipcode(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <FormLabel>Cidade</FormLabel>
                                        <FormControl
                                            placeholder="Cidade"
                                            type="text"
                                            value={city}
                                            onChange={(e: any) => setCity(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <FormLabel>Endereço</FormLabel>
                                        <FormControl
                                            placeholder="Endereço"
                                            type="text"
                                            value={address}
                                            onChange={(e: any) => setAddress(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Col md={12}>
                                <button className="btn btn-primary" type="submit">Atualizar</button>
                            </Col>
                        </Form>
                    </>}

                    {/* <hr/>
                    <br/>
                    <UploadFile localImage={'/api​/services​/app​/Blog/UploadFile'}/> */}

                </div>
                <div className="col-md-5 mt-4">
                    <div className="d-flex justify-content-between">
                        <div className="profile-title">
                            <span>Meus Pets</span>
                        </div>
                        <div className="pointer" onClick={() => history.push('profile/add-my-pet')}>
                            <FontAwesomeIcon icon={faPlusSquare} color='#ffbd00' />
                            <span> ADD PET</span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mt-3 row">
                        {userPets.map((pet, index) => {
                            return (
                                <div key={index}>
                                    <div className="pet-image">
                                        <img
                                            src={pet.url_image ? pet.url_image : require('../../assets/images/dog.png')}
                                            alt="" />
                                    </div>
                                    <div className="text-center">{pet.name}
                                        <FontAwesomeIcon
                                            icon={faPen}
                                            style={{ marginLeft: '5px', color: '#333' }}
                                            size="sm"
                                            className="pointer"
                                            onClick={() => history.push(`profile/edit-my-pet/${pet.id}`)}
                                        // onClick={() => setUpdateData(!updateData)}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="d-flex justify-content-between mt-5">
                        <div className="profile-title">
                            <span>Quero Doar</span>
                        </div>
                        <div className="pointer" onClick={() => history.push('profile/donate')}>
                            <FontAwesomeIcon icon={faPlusSquare} color='#ffbd00' />
                            <span> ADD PET</span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mt-3 row">
                        {userDonations.map((pet, index) => {
                            return (
                                <div key={index}>
                                    <div className="pet-image">
                                        <img
                                            src={pet.url_image ? pet.url_image : require('../../assets/images/dog.png')}
                                            alt="" />
                                    </div>
                                    <div className="text-center">{pet.name}
                                        <FontAwesomeIcon
                                            icon={faPen}
                                            style={{ marginLeft: '5px', color: '#333' }}
                                            size="sm"
                                            className="pointer"
                                            onClick={() => history.push(`profile/edit-donate/${pet.id}`)}
                                        // onClick={() => setUpdateData(!updateData)}
                                        />
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Container>
    )
}

const mapStateToProps = (state: any) => ({
    customer: state.customer.customerStatus.customer,
    userPets: state.pets.petsStatus.userPets,
    userDonations: state.donation.donationStatus.userDonations,
})

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({ ...CustomerActions, ...PetsActions, ...DonationActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
