import React, { useState, useEffect } from 'react'
import FooterBanner from '../../../components/FooterBanner'
import { Container } from 'react-bootstrap'
import { Row, Col, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import './styles.scss'
import Select, { SelectOption } from '../../../components/Select'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DonationActions } from '../../../store/actions/donation'
import history from '../../../routes/history'
import InputFile from '../../../components/InputFile'
import { useParams } from 'react-router'
import useDonate from './useDonate'
import ImageSelector from '../../../components/ImageSelector'
import Breeds from '../../../assets/data/breeds'

interface Props {
  userSigned: boolean
  donationSuccess: boolean
  donationErrorMessage: string
  donate: (data: any) => void
  donateSetError: (message: string) => void
  donateClear: () => void
}

const Donate: React.FC<Props> = ({ userSigned, donationSuccess, donationErrorMessage, donate, donateSetError, donateClear }) => {
  const { id } = useParams()
  const donation = useDonate(id)

  const [isDog, setIsDog] = useState(true)
  const [castration, setCastration] = useState('Castrado')
  const [name, setName] = useState('')
  const [gender, setGender] = useState('Macho')
  const [age, setAge] = useState('')
  const [vaccines, setVaccines] = useState('')
  const [temper, setTemper] = useState('')
  const [vermifuge, setVermifuge] = useState('')
  const [urlImage, setUrlImage] = useState('')
  const [zipcode, setZipCode] = useState('')
  const [address, setAddress] = useState('')
  const [complement, setComplement] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [reference, setReference] = useState('')
  const [document, setDocument] = useState('')
  const [status, setStatus] = useState(false)
  const [specie, setSpecie] = useState('Cachorro')
  const [breed, setBreed] = useState('')
  const [color, setColor] = useState('')
  const [birthday, setBirthday] = useState('')
  const [weight, setWeight] = useState('')
  const [port, setPort] = useState('')
  const [coat, setCoat] = useState('')
  const [rules, setRules] = useState('')
  const [obs, setObs] = useState('')

  // const [temper, setTemper] = useState('')
  // const [vermifuge, setVermifuge] = useState('')

  const [imageDescription, setImageDescription] = useState('')
  const [file, setFile] = useState<File | undefined>(undefined)
  const [image, setImage] = useState('')

  useEffect(() => {
    if (id == null || donation.loading || donation.data == null) return;

    setIsDog(donation.data.donation.petsTypeId === 1)
    setCastration(donation.data.donation.castration || '')
    setName(donation.data.donation.name || '')
    setGender(donation.data.donation.gender || '')
    setAge(donation.data.donation.age || '')
    setVaccines(donation.data.donation.vaccines || '')
    setTemper(donation.data.donation.temper || '')
    setVermifuge(donation.data.donation.vermifuge || '')
    setUrlImage(donation.data.donation.url_image || '')
    setZipCode(donation.data.donation.zipcode || '')
    setAddress(donation.data.donation.address || '')
    setComplement(donation.data.donation.complement || '')
    setReference(donation.data.donation.reference || '')
    setDocument(donation.data.donation.document || '')
    setStatus(donation.data.donation.status === true)
    setSpecie(donation.data.donation.specie || '')
    setBreed(donation.data.donation.breed || '')
    setColor(donation.data.donation.color || '')
    setBirthday(donation.data.donation.birthday || '')
    setWeight(donation.data.donation.weight || '')
    setPort(donation.data.donation.port || '')
    setCoat(donation.data.donation.coat || '')
    setRules(donation.data.donation.rules || '')
    setObs(donation.data.donation.obs || '')
  }, [id, donation.loading, donation.data])

  const notSignedError = !userSigned ? 'Você precisa estar logado para acessar essa funcionalidade.' : undefined

  const performDonation = (e: any) => {

    console.log(urlImage)

    e.preventDefault();

    donate({
      pet: {
        castration,
        name,
        gender,
        age,
        vaccines,
        temper,
        vermifuge,
        url_image: urlImage,
        zipcode,
        address,
        complement,
        reference,
        state,
        city,
        document,
        status,
        specie,
        breed,
        color,
        birthday,
        weight,
        port,
        coat,
        rules,
        obs,
        petsTypeId: isDog ? 1 : 2
      },
      id: id == null ? undefined : id
    })
  }

  if (donationSuccess) {
    setTimeout(() => {
      donateClear()
      history.goBack()
    }, 1500)
  }

  return (
    <Container className="donate-content">
      <div className="donate-content-title">
        {id == null ?
          <>Vamos começar o seu <span>Cadastro para DOAÇÃO de Pet!</span></> :
          <>Editar dados <span>para DOAÇÃO de Pet!</span></>
        }
      </div>
      {notSignedError && <div className="donate-content-message-error">
        {notSignedError}
      </div>}
      {donationErrorMessage && <div className="donate-content-message-error">
        {donationErrorMessage}
      </div>}
      {donationSuccess && <div className="donate-content-message-success">
        Cadastro de doação efetuado com sucesso!
            </div>}
      {!donationSuccess && userSigned &&
        <Form onSubmit={performDonation}>
          <Row>
            <Col md={12}>
              <label className="small font-weight-bold ml-2">Fale um pouco sobre o Pet</label>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col className='d-flex'>
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
            </Col>
          </Row>

          <Row className='mt-3'>
            <Col>
              <FormLabel>Foto</FormLabel>
              <div className=" form-group row">
                <ImageSelector currentImage={urlImage} onChange={setUrlImage} uploadPrefix='donations-images/' />
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
                <FormLabel>Gênero</FormLabel>
                <Select value={gender} className="">
                  <SelectOption onSelected={value => setGender(value)}>Macho</SelectOption>
                  <SelectOption onSelected={value => setGender(value)}>Fêmea</SelectOption>
                </Select>
              </FormGroup>
            </Col>
          </Row>
          <Row className="columnEffect">
            <Col md={6}>
              <FormGroup>
                <FormLabel>Idade</FormLabel>
                <FormControl
                  placeholder="Idade"
                  type="text"
                  value={age}
                  onChange={(e: any) => setAge(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <FormLabel>Castrado</FormLabel>
                <Select value={castration} className="">
                  <SelectOption onSelected={value => setCastration(value)}>Castrado</SelectOption>
                  <SelectOption onSelected={value => setCastration(value)}>Não Castrado</SelectOption>
                </Select>
                {/* <FormControl
                                as="select"
                                type="select"
                                value={castration}
                                onChange={(e : any) => setCastration(e.target.value)}
                                required
                            >
                                <option value="">Selecione...</option>
                                <option>Castrado</option>
                                <option>Não Castrado</option>
                            </FormControl> */}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <FormLabel>Vacinas</FormLabel>
                <FormControl
                  placeholder="Vacinas"
                  type="text"
                  value={vaccines}
                  onChange={(e: any) => setVaccines(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <FormLabel>Temperamento</FormLabel>
                <FormControl
                  placeholder="Temperamento"
                  type="text"
                  value={temper}
                  onChange={(e: any) => setTemper(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <FormLabel>Vermífugos</FormLabel>
                <FormControl
                  placeholder="Vermífugos"
                  type="text"
                  value={vermifuge}
                  onChange={(e: any) => setVermifuge(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <FormLabel>CEP</FormLabel>
                <FormControl
                  placeholder="CEP"
                  type="text"
                  value={zipcode}
                  onChange={(e: any) => setZipCode(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <FormLabel>Endereço</FormLabel>
                <FormControl
                  placeholder="Endereço"
                  type="text"
                  value={address}
                  onChange={(e: any) => setAddress(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <FormLabel>Complemento</FormLabel>
                <FormControl
                  placeholder="Complemento"
                  type="text"
                  value={complement}
                  onChange={(e: any) => setComplement(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <FormLabel>Estado</FormLabel>
                <FormControl
                  placeholder="Estado"
                  type="text"
                  value={state}
                  onChange={(e: any) => setState(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <FormLabel>Cidade</FormLabel>
                <FormControl
                  placeholder="Cidade"
                  type="text"
                  value={city}
                  onChange={(e: any) => setCity(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <FormLabel>Referência</FormLabel>
                <FormControl
                  placeholder="Referência"
                  type="text"
                  value={reference}
                  onChange={(e: any) => setReference(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <FormLabel>Documentação necessária para adoção</FormLabel>
                <FormControl
                  placeholder="Documentação necessária para adoção"
                  type="text"
                  value={document}
                  onChange={(e: any) => setDocument(e.target.value)}
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
                <FormControl
                  placeholder="Raça"
                  type="text"
                  value={breed}
                  onChange={(e: any) => setBreed(e.target.value)}
                  required
                />
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
                <FormLabel>Aniversário</FormLabel>
                <FormControl
                  placeholder="Aniversário"
                  type="text"
                  value={birthday}
                  onChange={(e: any) => setBirthday(e.target.value)}
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
                <FormLabel>Regras</FormLabel>
                <FormControl
                  placeholder="Regras"
                  type="text"
                  value={rules}
                  onChange={(e: any) => setRules(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <FormLabel>Observações</FormLabel>
                <FormControl
                  placeholder="Observações"
                  type="text"
                  value={obs}
                  onChange={(e: any) => setObs(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <button className="btn btn-primary" type="submit">Cadastrar</button>
            </Col>
          </Row>
        </Form>
      }
      <FooterBanner />
    </Container>
  )
}

const mapStateToProps = (state: any) => ({
  userSigned: state.customer.customerStatus.userSigned,
  donationErrorMessage: state.donation.donationStatus.donationErrorMessage,
  donationSuccess: state.donation.donationStatus.donationSuccess,
})

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ ...DonationActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Donate)
