import { faHeart } from '@fortawesome/free-regular-svg-icons'
import {
  faBars,
  faSearch,
  faShoppingCart,
  faComment
} from '@fortawesome/free-solid-svg-icons'
import { FaAngleRight } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState, useContext } from 'react'
import md5 from 'md5'
import {
  Button,
  Container,
  Dropdown,
  // Form,
  FormGroup,
  FormControl,
  FormLabel,
  Image,
  InputGroup,
  Nav,
  Navbar,
  NavDropdown
} from 'react-bootstrap'

import SimpleLoading from '../SimpleLoading'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { CustomerActions } from '../../store/actions/customer'
import { Link, useLocation } from 'react-router-dom'
import history from '../../routes/history'
import {
  NavbarBlack,
  ButtonSearch,
  InputGroupSearch,
  ButtonRegister,
  FormHeader,
  NavbarYellow,
  NavItem,
  NavLink,
  DropdownButtonLogin,
  ButtonLink,
  DropdownToggleProfile,
  ProfileImage,
  FormLogin,
  FormLoginErrorMessage,
  ChatButton
  // FormPerfil,
} from './styles.js'
import { toast } from 'react-toastify'
import { ServicesActions } from '../../store/actions/services'
import AuthenticationContext from '../../contexts/Authentication/AuthenticationContext'
import api from '../../services/api'
import ChatContext from '../../contexts/Chat/ChatContext'

const Header = ({
  signingIn,
  signInSuccess,
  signInError,
  signInErrorMessage,
  // customer,
  userSigned,
  customerSignIn,
  showSignInErrorMessage,
  customerGet,
  customerSignOut,
  serviceGetAll,
  services
}) => {
  const { customer } = useContext(AuthenticationContext)
  const location = useLocation()

  // useEffect(() => {
  //   // localStorage.removeItem(USER_ID)
  //   // console.log('userSigned: ', userSigned)
  //   // const userId = localStorage.getItem(USER_ID)
  //   // console.log('userId: ', userId)
  //   if (userSigned && !customer) {
  //     customerGet();
  //   }
  // }, [userSigned, customer, customerGet]);

  useEffect(() => {
    serviceGetAll()
  }, [serviceGetAll])

  useEffect(() => {
    console.log('customar:', customer)
  }, [customer])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [searchQuery, setSearchQuery] = useState('')

  const [dropdownLoginShow, setDropdownLoginShow] = useState(false)
  const [effect, setEffect] = useState(0)

  useEffect(() => {
    if (location.pathname.includes('/blog')) {
      setEffect(1)
      return
    }
    if (location.pathname.includes('/lost-found')) {
      setEffect(2)
      return
    }
    if (location.pathname.includes('/adopt')) {
      setEffect(3)
      return
    }
    if (location.pathname.includes('/services')) {
      setEffect(4)
      return
    }
    setEffect(0)
  }, [location.pathname])

  const EventKey = evt => {
    if (evt.charCode === 13 && searchQuery !== '') {
      history.push(`/search?q=${searchQuery}`)
    }
  }

  const handleFormKeyPressed = e => {
    if (e.key === 'Enter') {
      signIn()
    }
  }

  const signIn = () => {
    // if (email.trim().length === 0) {
    //   showSignInErrorMessage("Por favor, informe seu e-mail ou CPF ou CNPJ.");
    // } else if (password.trim().length === 0) {
    //   showSignInErrorMessage("Por favor, informe sua senha.");
    // } else {
    //   const pass = md5(password);
    //   customerSignIn({
    //     emailOrCPF_CNPJ: email,
    //     password: pass
    //   });
    // }

    if (email === '') {
      toast.error('Por favor, informe seu email, CPF/CNPJ!')
      return
    }

    if (password === '') {
      toast.error('Por favor, informe sua senha!')
      return
    }

    const pass = md5(password)
    customerSignIn({
      emailOrCPF_CNPJ: email,
      password: pass
    })
    if (customerSignIn) {
      history.push('/')
    }
    console.log('done')
  }

  const signOut = () => {
    console.log('signOut')
    customerSignOut()
    if (signInSuccess && dropdownLoginShow) {
      setDropdownLoginShow(false)
    }
  }

  // const urlEffect = () => {
  //   let location = window.location.pathname;
  //   if (location === '/blog') {
  //     setEffect(1)
  //   } else if (location === '/lost-found') {
  //     setEffect(2)
  //   } else if (location === '/adopt') {
  //     setEffect(3)
  //   } else {
  //     setEffect(0)
  //   }
  // }
  const { opened, openChat } = useContext(ChatContext)
  const forgotPass = () => {
    const email = window.prompt('Digite seu email') || ''
    const validMail = email.split('').includes('@')

    if (!email.trim().length || !validMail) {
      toast.warn('Digite corretamente seu email')
      return
    }

    api
      .post('/services/app/Account/SendPasswordResetCode', {
        emailAddress: email
      })
      .then(() => {
        toast.success(
          'As instruções de redefinição de senha foram enviadas para seu email!'
        )
        setEmail('')
      })
      .catch(() => {
        toast.error('Algum erro ocorreu.')
      })
      .finally(() => {
        // setLoading(false)
      })
  }

  // console.log('Header customer: ', customer)

  // console.log(userSigned)
  const custumerImg =
    customer != null
      ? customer.url_image
      : require('../../assets/images/user_no_photo.jpg')

  return (
    <>
      <NavbarBlack bg='dark' expand='lg'>
        <Container>
          <Navbar.Brand>
            <Link to='/'>
              <Image
                src={require('../../assets/images/logo.png')}
                height={50}
                onClick={() => setEffect(0)}
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle>
            <FontAwesomeIcon icon={faBars} color='#fff' />
          </Navbar.Toggle>
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto ml-auto'>
              <InputGroupSearch>
                <FormControl
                  placeholder='Como podemos te ajudar hoje?'
                  aria-label=''
                  value={searchQuery}
                  onKeyPress={e => EventKey(e)}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <InputGroup.Append>
                  <ButtonSearch
                    variant='primary'
                    onClick={() => {
                      if (searchQuery === '') {
                        return
                      }

                      history.push(`/search?q=${searchQuery}`)
                    }}
                  >
                    <FontAwesomeIcon icon={faSearch} color='#fff' />
                  </ButtonSearch>
                </InputGroup.Append>
              </InputGroupSearch>
            </Nav>
            <FormHeader inline>
              {userSigned && (
                <Link to='/favorites'>
                  <FontAwesomeIcon icon={faHeart} color='#fff' />
                </Link>
              )}
              {/* MENU NOT SIGNED */}
              {!userSigned && (
                <>
                  <FormLogin>
                    <Dropdown
                      onToggle={() => setDropdownLoginShow(!dropdownLoginShow)}
                      show={dropdownLoginShow}
                    >
                      <DropdownButtonLogin id='dropdown-basic'>
                        Acessar
                      </DropdownButtonLogin>
                      <Dropdown.Menu>
                        <FormGroup controlId='formBasicEmail'>
                          <FormLabel>Usuário</FormLabel>
                          <FormControl
                            type='email'
                            placeholder='Informe o e-mail, CPF/CNPJ'
                            disabled={signingIn}
                            onKeyPress={e => handleFormKeyPressed(e)}
                            onChange={e => setEmail(e.target.value)}
                          />
                        </FormGroup>
                        <FormGroup
                          controlId='formBasicPassword'
                          className='mt-3'
                        >
                          <FormLabel>Senha</FormLabel>
                          <FormControl
                            type='password'
                            placeholder='Informe a sua senha'
                            disabled={signingIn}
                            onKeyPress={e => handleFormKeyPressed(e)}
                            onChange={e => setPassword(e.target.value)}
                          />
                        </FormGroup>
                        <button
                          type='button'
                          className='btn-entrar'
                          disabled={signingIn}
                          onClick={signIn}
                        >
                          Enviar
                        </button>
                        {signingIn && !signInError && (
                          <SimpleLoading className='ml-2' />
                        )}
                        {signInError && (
                          <FormLoginErrorMessage>
                            {signInErrorMessage}
                          </FormLoginErrorMessage>
                        )}
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={forgotPass} eventKey='4'>
                          Esqueceu a senha?
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </FormLogin>
                  <Link to='/sign-up'>
                    <ButtonRegister variant='primary'>
                      Cadastre-se
                    </ButtonRegister>
                  </Link>
                </>
              )}
              <Button variant='link'>
                <FontAwesomeIcon icon={faShoppingCart} color='#fff' />
              </Button>
              {userSigned && (
                <ChatButton
                  type='button'
                  onClick={() => {
                    openChat()
                    console.log(opened)
                  }}
                >
                  >
                  <FontAwesomeIcon icon={faComment} color='#fff' />
                </ChatButton>
              )}

              {/* MENU USER SIGNED */}
              {userSigned && (
                <>
                  <ButtonLink variant='link'>Meus Pedidos</ButtonLink>
                  <Dropdown>
                    <DropdownToggleProfile variant='link' id='dropdown-basic'>
                      <ProfileImage
                        src={
                          custumerImg ||
                          require('../../assets/images/user_no_photo.jpg')
                        }
                        alt=''
                      />
                    </DropdownToggleProfile>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => history.push('/profile')}>
                        Perfil
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={signOut}>Sair</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}
            </FormHeader>
          </Navbar.Collapse>
        </Container>
      </NavbarBlack>
      <NavbarYellow bg='light' expand='lg' className='p-0'>
        <Container>
          <Navbar.Toggle>
            <FontAwesomeIcon icon={faBars} color='#fff' />
          </Navbar.Toggle>
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='p-0'>
              {/* <NavItem> */}
              {/* <NavLink to="/shop">PRODUTOS</NavLink> */}
              {/** DropDown */}
              {/* <NavDropdown
                  title="PRODUTOS"
                  id="dropdown-products"
                  to="/shop"
                  className="drop-products"
                >
                  <NavDropdown.Item className="dropdownItem" href="#action/3.2" active={false}>
                    Alimentação{" "}
                    <FaAngleRight
                      style={{
                        color: "#ffbd00",
                        border: "1px solid #ffbd00",
                        borderRadius: 4
                      }}
                    />
                  </NavDropdown.Item>
                  <NavDropdown.Item className="dropdownItem" href="#action/3.2" active={false}>
                    Acessórios{" "}
                    <FaAngleRight
                      style={{
                        color: "#ffbd00",
                        border: "1px solid #ffbd00",
                        borderRadius: 4
                      }}
                    />
                  </NavDropdown.Item>
                  <NavDropdown.Item className="dropdownItem" href="#action/3.2" active={false}>
                    Medicamentos{" "}
                    <FaAngleRight
                      style={{
                        color: "#ffbd00",
                        border: "1px solid #ffbd00",
                        borderRadius: 4
                      }}
                    />
                  </NavDropdown.Item>
                  <NavDropdown.Item className="dropdownItem" href="#action/3.2" active={false}>
                    Higiene e Limpeza{" "}
                    <FaAngleRight
                      style={{
                        color: "#ffbd00",
                        border: "1px solid #ffbd00",
                        borderRadius: 4
                      }}
                    />
                  </NavDropdown.Item>
                  <NavDropdown.Item className="dropdownItem" href="#action/3.2" active={false}>
                    Brinquedos{" "}
                    <FaAngleRight
                      style={{
                        color: "#ffbd00",
                        border: "1px solid #ffbd00",
                        borderRadius: 4
                      }}
                    />
                  </NavDropdown.Item>
                  <NavDropdown.Item className="dropdownItem" href="#action/3.2" active={false}>
                    Cosméticos{" "}
                    <FaAngleRight
                      style={{
                        color: "#ffbd00",
                        border: "1px solid #ffbd00",
                        borderRadius: 4
                      }}
                    />
                  </NavDropdown.Item>
                </NavDropdown> */}
              {/* </NavItem> */}
              <NavItem ElementColor={effect === 4 && true}>
                {/* <NavLink to='/services'>SERVIÇOS</NavLink> */}
                <NavDropdown
                  title='SERVIÇOS'
                  id='dropdown-products'
                  to='/shop'
                  className='drop-products'
                >
                  <NavDropdown.Item
                    className='dropdownItem'
                    as={Link}
                    to='/services'
                    active={false}
                  >
                    Todos os serviços
                    <FaAngleRight
                      style={{
                        color: '#ffbd00',
                        border: '1px solid #ffbd00',
                        borderRadius: 4
                      }}
                    />
                  </NavDropdown.Item>

                  {services &&
                    services.map((service, index) => (
                      <NavDropdown.Item
                        key={index}
                        as={Link}
                        className='dropdownItem'
                        to={`/services/${service.description.replace(
                          ' ',
                          '-'
                        )}`}
                        active={false}
                      >
                        {service.description}
                        {''}
                        <FaAngleRight
                          style={{
                            color: '#ffbd00',
                            border: '1px solid #ffbd00',
                            borderRadius: 4
                          }}
                        />
                      </NavDropdown.Item>
                    ))}
                </NavDropdown>
              </NavItem>
              {/* <NavItem> */}
              {/*    <NavLink as={Link}  to='/'>MARCAS</NavLink> */}
              {/* </NavItem> */}
              {/* <NavItem> */}
              {/*    <NavLink as={Link}  to='/'>ASSINATURAS</NavLink> */}
              {/* </NavItem> */}
              <NavItem
                onClick={() => setEffect(1)}
                ElementColor={effect === 1 && true}
              >
                <NavLink as={Link} to='/blog'>
                  BLOG
                </NavLink>
              </NavItem>
              <NavItem
                onClick={() => setEffect(2)}
                ElementColor={effect === 2 && true}
              >
                <NavLink as={Link} to='/lost-found'>
                  PERDI ou ENCONTREI UM PET
                </NavLink>
              </NavItem>
              <NavItem
                onClick={() => setEffect(3)}
                ElementColor={effect === 3 && true}
              >
                <NavLink as={Link} to='/adopt'>
                  QUERO ADOTAR
                </NavLink>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </NavbarYellow>
    </>
  )
}

const mapStateToProps = state => ({
  signingIn: state.customer.customerStatus.signingIn,
  signInSuccess: state.customer.customerStatus.signInSuccess,
  signInError: state.customer.customerStatus.signInError,
  signInErrorMessage: state.customer.customerStatus.signInErrorMessage,
  customer: state.customer.customerStatus.customer,
  userSigned: state.customer.customerStatus.userSigned,
  services: state.services.servicesStatus.services
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...CustomerActions, ...ServicesActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Header)
