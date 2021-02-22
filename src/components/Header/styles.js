import styled, { css } from 'styled-components'

import { Link } from 'react-router-dom'

import {
  Button,
  Dropdown,
  Form,
  InputGroup,
  Nav,
  Navbar
} from 'react-bootstrap'

export const NavbarBlack = styled(Navbar)`
  background-color: black !important;
`

export const ButtonSearch = styled(Button)`
  padding: 0 20px;
`

export const InputGroupSearch = styled(InputGroup)`
  width: 600px;
  @media (max-width: 1200px) {
    width: 500px;
  }
  @media (max-width: 1000px) {
    width: 300px;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`

export const ButtonRegister = styled(Button)`
  color: black;
  box-shadow: unset !important;
  &:hover {
    color: black;
    opacity: 0.8;
  }
`

export const ChatButton = styled.button`
  margin: 0;
  padding: 0;
  background: transparent;
`

export const FormHeader = styled(Form)`
  @media (max-width: 800px) {
    margin-top: 8px;
  }
`

export const NavbarYellow = styled(Navbar)`
  background: rgb(213, 157, 0);
  background: linear-gradient(
    180deg,
    rgba(213, 157, 0, 1) 0%,
    rgba(255, 189, 0, 1) 100%
  );
`

export const NavItem = styled(Nav.Item)`
  display: flex;

  ${props =>
    props.ElementColor &&
    css`
      > a {
        color: #ffbd00 !important;
      }
      > .nav-item:first-of-type > .nav-link,
      > a {
        color: #ffbd00 !important;
      }
      background-color: #333333 !important;
    `}

  &:hover {
    background-color: #333333;
    :after {
      content: '';
      background-color: #333333;
    }
    > .nav-item > .nav-link,
    > a {
      color: #ffbd00 !important;
    }
  }

  > .nav-item > .nav-link,
  > a {
    padding: 6px 10px;
    margin-top: auto;
    align-self: center;
  }
  .drop-products {
    font-weight: 500;
    a {
      color: #fff;
      padding: 0 6px;
      :after {
        display: none;
      }
    }
  }

  & > .dropdown.show {
    background-color: #333333;
    > .nav-item > .nav-link,
    > a {
      color: #ffbd00 !important;
    }
  }

  .dropdown-toggle {
    color: #000 !important;
    :hover {
      color: #ffbd00 !important;
    }
  }
  .dropdownItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 35px;
    width: 180px;
    background-color: #333333;
    border: none;

    &:hover {
      color: #ffbd00 !important;
    }
  }
  .dropdown-menu {
    margin: -1px 0;
    background-color: #333333;
    border-radius: 0 !important;
    padding: 0 !important;
  }
`

export const NavLink = styled(Link)`
  color: black !important;
  font-size: 0.85rem !important;
  padding: 0 8px;
  font-weight: 500;
  &:hover {
    text-decoration: none;
    color: #ffbd00 !important;
  }
`

export const DropdownButtonLogin = styled(Dropdown.Toggle)`
  background-color: transparent !important;
  border: 0;
  outline: none !important;
  margin: 0 10px 0 10px;
  box-shadow: unset !important;
  &:after {
    content: ' ' !important;
    border: 0 !important;
    &:focus {
      outline: none !important;
    }
  }
  &:focus {
    outline: none !important;
  }
`

export const ButtonLink = styled(Button)`
  color: white;
  font-size: 0.85rem !important;

  :hover {
    color: #ffbd00;
  }
`

export const DropdownToggleProfile = styled(Dropdown.Toggle)`
  &:after {
    content: ' ' !important;
    border: 0 !important;
  }
`

export const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 15px;
`

export const FormPerfil = styled.div`
  display: flex;

  .dropdown-menu {
    min-width: 0px !important;
    padding: 10px;

    a:hover {
      width: 100%;
      background-color: #ffbd00;
    }
  }
`

export const FormLogin = styled.div`
  .dropdown-menu {
    /* display: flex; */
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    margin-left: 20px;
    color: #333;

    a:hover {
      border-bottom: 1px solid #ffbd00;
    }
  }

  .btn-entrar {
    width: 100%;
    height: 30px;
    border-radius: 10px;
    background-color: #ffbd00 !important;
    border-color: #ffbd00 !important;
    font-size: 0.8rem;
    margin-top: 10px;
  }

  /* border: 1px solid red; */

  .form-label {
    margin-bottom: 5px;
  }
`

export const FormLoginErrorMessage = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: 10px;
`
