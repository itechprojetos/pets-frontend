import React, { useEffect, useState } from 'react'
import {
  Row,
  Col,
  Form,
  FormLabel,
  FormGroup,
  FormControl
} from 'react-bootstrap'
import md5 from 'md5'
// import Autocomplete, { AutocompleteOption } from '../../../components/Autocomplete'
import InputMask from 'react-input-mask'
import api from '../../../services/api'
import { toast } from 'react-toastify'
import history from '../../../routes/history'
import styles from './styleProviderForm.js'
import useCEP from '../../../hooks/useCEP'

const ProviderForm = ({ type, veterinaries }) => {
  // name,
  // email,
  // password: pass,
  // cpF_CNPJ: cnpj,
  // customerTypeId: typeForn,
  // socialReason,
  // responsible,
  // zipcode,
  // city,
  // state,
  // address,
  // phone,

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpF_CNPJ, setCpF_CNPJ] = useState('')
  const [socialReason, setSocialReason] = useState('')
  const [responsible, setResponsible] = useState('')
  const [zipcode, setZipcode] = useState('')

  const {
    loading: cepLoading,
    errored: cepErrored,
    address,
    city,
    uf
  } = useCEP(zipcode.replace('.', '').replace('-', ''))
  // const [city, setCity] = useState('')
  // const [state, setState] = useState('')
  // const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')

  const [typeForn, setTypeForn] = useState(type)
  // const [dados, setDados] = useState<any>([]);
  const [allVets, setAllVets] = useState([])
  const [veterinary, setVeterinary] = useState([])
  const [crmv, setCrmv] = useState('')

  const [textAuto, setTextAuto] = useState({
    text: ''
  })
  const [suggestions, setSuggestions] = useState([])
  const [itensList, setItensList] = useState([
    'Maycon',
    'Mario',
    'Maria',
    'Noel',
    'Sara'
  ])

  console.log('textAut', textAuto.text)
  console.log('suggestions', suggestions)

  const handleChangeText = e => {
    const { value } = e.target
    let suggestions = []
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i')
      suggestions = itensList.sort().filter(v => regex.test(v))
    }
    setSuggestions(suggestions)
    setTextAuto({ text: value })
  }

  const suggestionSelected = value => {
    setSuggestions(suggestions)
    setTextAuto({ text: value })
  }

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null
    }
    return (
      <ul style={styles.ul}>
        {suggestions.map(item => (
          <li
            key={item}
            style={{ display: 'flex', width: '100%', padding: '5px' }}
            onClick={() => suggestionSelected(item)}
          >
            {item}{' '}
          </li>
        ))}
      </ul>
    )
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      // console.log('form',dados);

      // const { name, email, password, cnpj, socialReason,responsible, zipcode, city, state, address, phone} = dados;

      const pass = md5(password)
      const data = {
        name,
        email,
        password: pass,
        cpF_CNPJ: cpF_CNPJ.replace(/[.\-/]/g, ''),
        customerTypeId: typeForn,
        socialReason,
        responsible,
        zipcode,
        city,
        state: uf,
        address,
        phone,
        crmv
      }

      const response = await api.post(
        '/services/app/Customers/CreateOrEdit',
        data
      )

      if (response.data.success) {
        toast.success('Cadastro realizado com sucesso!')
        history.push('/')
      }
    } catch (err) {
      const { details } = err.response.data.error

      if (details === 'E-mail already exists.') {
        toast.error('O e-mail informado já está cadastrado.')
        history.push('/sign-up')
      }

      if (details === 'Cpf/Cnpj already exists.') {
        toast.error('O CNPJ informado já está cadastrado.')
        history.push('/sign-up')
      }
    }
  }

  const loadVeterinary = async () => {
    const { data } = await api.get('/services/app/Veterinaries/GetAll')
    const response = data.result.items
    setVeterinary(response)
  }

  useEffect(() => {
    loadVeterinary()
  }, [])

  // console.log('veterinários:', veterinary)

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={12}>
            <label className='small font-weight-bold ml-2'>
              INFORMAÇÕES DE ACESSO
            </label>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl
                name='name'
                placeholder='Nome Completo'
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>E-mail</FormLabel>
              <FormControl
                name='email'
                placeholder='Email'
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>Senha</FormLabel>
              <FormControl
                name='password'
                placeholder='Senha'
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <label className='small font-weight-bold ml-2'>
              INFORMAÇÕES ADICIONAIS
            </label>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>Razão Social</FormLabel>
              <FormControl
                name='socialReason'
                placeholder='Razão Social'
                type='text'
                value={socialReason}
                onChange={e => setSocialReason(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>CNPJ</FormLabel>
              <InputMask
                className='form-control'
                name='cnpj'
                placeholder='CNPJ'
                mask='99.999.999/9999-99'
                type='text'
                value={cpF_CNPJ}
                onChange={e => setCpF_CNPJ(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>Responsável</FormLabel>
              <FormControl
                name='responsible'
                placeholder='Responsável'
                type='text'
                value={responsible}
                onChange={e => setResponsible(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>CEP</FormLabel>
              <InputMask
                name='zipcode'
                className='form-control'
                mask='99.999-999'
                placeholder='CEP'
                type='text'
                value={zipcode}
                onChange={e =>
                  setZipcode(e.target.value.replace(/[._-]+/g, ''))}
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
                name='city'
                placeholder='Cidade'
                type='text'
                value={city}
                disabled
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormLabel>UF</FormLabel>
            <FormControl
              name='state'
              placeholder='UF'
              type='text'
              value={uf}
              disabled
              required
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>Endereço</FormLabel>
              <FormControl
                name='address'
                placeholder='Endereço'
                type='text'
                value={address}
                disabled
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>Telefone</FormLabel>
              <InputMask
                className='form-control'
                name='phone'
                mask='(99) 99999-9999'
                placeholder='Telefone'
                type='text'
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        {/* <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>Veterinário Responsável</FormLabel>
              <input
                value={textAuto.text}
                className='form-control'
                type='text'
                onChange={e => set}
              />
              {renderSuggestions()}
            </FormGroup>
          </Col>
        </Row> */}
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>CRMV</FormLabel>
              <FormControl
                name='crmv'
                placeholder='CRMV'
                type='text'
                value={crmv}
                onChange={e => setCrmv(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className=''>
              <button className='btn btn-primary' type='submit'>
                Cadastrar
              </button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default ProviderForm
