import { createContext } from 'react'

const INITIAL_VALUE = {
  systemSigned: false,
  userSigned: false,
  customer: null,
  loading: true
}

export default createContext(INITIAL_VALUE)