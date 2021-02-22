import React, { useState, useMemo, useEffect, useContext, /*useEffect*/ } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { Row, Col, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import './styles.scss'
import { bindActionCreators } from 'redux'
import { CustomerActions } from '../../../store/actions/customer'

import { connect } from 'react-redux'
import history from '../../../routes/history'
import { PetsActions } from '../../../store/actions/pets'
import InputFile from '../../../components/InputFile'
//import awsS3Service from '../../../services/aws-s3.service'
import InputMask from 'react-input-mask'
import Select, { SelectOption } from '../../../components/Select'
import ReactSelect from 'react-select'

import Breeds from '../../../assets/data/breeds'
import ImageSelector from '../../../components/ImageSelector';
import usePet from './usePet';
import { useParams } from 'react-router';
import AuthenticationContext from '../../../contexts/Authentication/AuthenticationContext';

interface Props {
  petsCreateOrEditSuccess: boolean
  petsCreateOrEditErrorMessage: string
  petsCreateOrEdit: (data: any) => void
  petsCreateOrEditSetError: (message: string) => void
  petsClear: () => void
}

const AddMyPets: React.FC<Props> = ({
  petsCreateOrEditSuccess, petsCreateOrEditErrorMessage,
  petsCreateOrEdit, petsCreateOrEditSetError, petsClear,
}) => {
  const { customer } = useContext(AuthenticationContext)
  const { id } = useParams<{ id?: string }>()
  const editingPet = usePet(id)

  const [notMyPet, setNotMyPet] = useState(false)

  const [isDog, setIsDog] = useState(true)
  const [name, setName] = useState('')
  const [specie, setSpecie] = useState('')
  const [breed, setBreed] = useState('')
  const [color, setColor] = useState('')
  const [gender, setGender] = useState('Macho')
  const [weight, setWeight] = useState('')
  const [birthday, setBrithday] = useState('')
  const [port, setPort] = useState('')
  const [coat, setCoat] = useState('')
  const [castration, setCastration] = useState('Castrado')
  const [temper, setTemper] = useState('')
  const [urlImage, setUrlImage] = useState('')

  const breedOptions = useMemo(() => Breeds.filter(breed => breed.breedtypeid === (isDog ? 1 : 2)).map(breed => breed.breedname), [isDog])

  useEffect(() => {
    if (id == null) return;
    if (editingPet.loading) return;
    if (editingPet.data == null) return;

    // setMyPet(editingPet.data.petsTypename)
    // setCustomerId(editingPet.data.pet.customerId)

    if (customer.id !== editingPet.data.pet.customerId) {
      setNotMyPet(true)
    }

    setName(editingPet.data.pet.name)
    setSpecie(editingPet.data.pet.specie)
    setBreed(editingPet.data.pet.breed)
    setColor(editingPet.data.pet.color)
    setGender(editingPet.data.pet.gender)
    setWeight(editingPet.data.pet.weight)
    setPort(editingPet.data.pet.port)
    setBrithday(editingPet.data.pet.birthday)
    setCoat(editingPet.data.pet.coat)
    setCastration(editingPet.data.pet.castration)
    setTemper(editingPet.data.pet.temper)
    setUrlImage(editingPet.data.pet.url_image)

    console.log('updated')
  }, [id, editingPet.loading, editingPet.data])



  // const [imageDescription, setImageDescription] = useState('')

  const register = async (e: any) => {

    e.preventDefault();
    const data = {
      pet: {
        name,
        specie,
        breed,
        color,
        gender,
        weight,
        birthday,
        coat,
        castration,
        temper,
        url_image: urlImage,
        port,
        petsTypeId: (isDog ? 1 : 2),
        id: id == null ? undefined : id
      } as any
    }
    petsCreateOrEdit(data)
  }

  if (petsCreateOrEditSuccess) {
    setTimeout(() => {
      petsClear()
      history.goBack()
    }, 500)
  }

  if (notMyPet) {
    return <Container>
      <p style={{ color: 'red', fontSize: '1.3rem', padding: '2em 0 2em 0' }}>Oops, alguma coisa deu errado... Retorne e tente novamente.</p>
    </Container>
  }

  if (id != null && editingPet.loading) {
    return <div className='loader-spinner'>
      <span>Carregando seu pet...</span>
      <Spinner animation='border' />
    </div>
  }

  return (
    <Container>
      <div className="add-my-pet-content-title">
        {id == null ?
          <>Vamos começar o <span>Cadastro do seu Pet!</span></>
          : <>Edite o seu <span>Pet</span>!</>
        }
      </div>

      <Form onSubmit={register}>
        <div className="d-flex add-my-pet-content-type mt-3">
          <div>
            MEU PET É UM:
                    </div>
          <div className="form-check form-check-inline ml-3">
            <input className="form-check-input" type="radio" name="radioClient" id="radioClient"
              checked={isDog}
              onChange={event => setIsDog(event.target.checked)}
            />
            <label className="form-check-label" htmlFor="radioClient">Cão</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="ratioProvider"
              checked={!isDog}
              onChange={event => setIsDog(!event.target.checked)}
            />
            <label className="form-check-label" htmlFor="ratioProvider">Gato</label>
          </div>
        </div>
        {petsCreateOrEditErrorMessage && <div className="add-my-pet-content-error-message">
          {petsCreateOrEditErrorMessage}
        </div>}
        <Row>
          <Col>
            <FormLabel>Foto</FormLabel>
            <div className=" form-group row">
              <ImageSelector currentImage={urlImage} onChange={setUrlImage} uploadPrefix='pets-images/' />
              {/* <InputFile
                                className="col-md-6"
                                placeholder="Adicionar foto"
                                value={imageDescription}
                                onFileChosen={onImageChosen}
                            /> */}
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>Nome</FormLabel>
              <FormControl
                placeholder="Nome"
                type="text"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>Espécie</FormLabel>
              <FormControl
                placeholder="Espécie"
                type="text"
                value={specie}
                onChange={(e: any) => setSpecie(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>Raça</FormLabel>
              {/* <Select value={breed} className="">
                {breedOptions.map(breedOption => <SelectOption key={breedOption} onSelected={() => setBreed(breedOption)}>{breedOption}</SelectOption>)}
              </Select> */}
              <ReactSelect options={breedOptions.map(b => ({ label: b, value: b }))} value={{ label: breed, value: breed }} placeholder='Selecione a raça' onChange={v => setBreed((v as any).value)} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>Cor</FormLabel>
              <FormControl
                placeholder="Cor"
                type="text"
                value={color}
                onChange={(e: any) => setColor(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>Gênero</FormLabel>
              <Select value={gender} className="">
                <SelectOption onSelected={value => setGender(value)}>Macho</SelectOption>
                <SelectOption onSelected={value => setGender(value)}>Fêmea</SelectOption>
              </Select>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>Aniverśario</FormLabel>
              <InputMask
                placeholder="Aniversário"
                className="form-control"
                type="text"
                value={birthday}
                onChange={(e: any) => setBrithday(e.target.value)}
                mask={'99/99/9999'}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>Peso</FormLabel>
              <FormControl
                placeholder="Peso"
                type="text"
                value={weight}
                onChange={(e: any) => setWeight(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>Porte</FormLabel>
              <FormControl
                placeholder="Porte"
                type="text"
                value={port}
                onChange={(e: any) => setPort(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>Pelagem</FormLabel>
              <FormControl
                placeholder="Pelagem"
                type="text"
                value={coat}
                onChange={(e: any) => setCoat(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>Castrado</FormLabel>
              <Select value={castration} className="">
                <SelectOption onSelected={value => setCastration(value)}>Castrado</SelectOption>
                <SelectOption onSelected={value => setCastration(value)}>Não Castrado</SelectOption>
              </Select>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>Amigável</FormLabel>
              <FormControl
                placeholder="Amigável"
                type="text"
                value={temper}
                onChange={(e: any) => setTemper(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        {/* <Row>
                    <Col md={12}>
                    <InputFile 
                        className="col-md-6" 
                        aria-label="" 
                        placeholder="Adicionar foto"
                        value={imageDescription}
                        onFileChosen={onImageChosen}
                    />
                    </Col>
                </Row> */}
        <Row>
          <Col md={12}>
            <button style={{ marginBottom: '12px' }} className="btn btn-primary" type="submit">{id == null ? 'Cadastrar' : 'Atualizar'}</button>
          </Col>
        </Row>
      </Form>
    </Container >
  )
}

const mapStateToProps = (state: any) => ({
  petsCreateOrEditSuccess: state.pets.petsStatus.petsCreateOrEditSuccess,
  petsCreateOrEditErrorMessage: state.pets.petsStatus.petsCreateOrEditErrorMessage,

})

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ ...PetsActions, ...CustomerActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddMyPets)
