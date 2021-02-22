import { createContext } from 'react'

const INITIAL_VALUE = {
  loading: true,
  progress: 0
}

const LoaderContext = createContext(INITIAL_VALUE)

export default LoaderContext
