import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch /* useSelector */ } from 'react-redux'
// import { AuthActions } from '../../store/actions/auth'
import AuthenticationContext from './AuthenticationContext'
import api, { API_TOKEN_SYSTEM, API_TOKEN_SYSTEM_TIME, USER_ID } from '../../services/api'
import actions from '../../store/actions'

export const systemLogin = async () => {
  try {
    const res = await api.post('/TokenAuth/Authenticate', {
      userNameOrEmailAddress: 'admin',
      password: '123qwe'
    })

    const data = res.data

    if (data.success && data.result && data.result.accessToken) {
      console.log('data.result.accessToken', data.result.accessToken)
      window.localStorage.setItem(API_TOKEN_SYSTEM, data.result.accessToken)
      window.localStorage.setItem(API_TOKEN_SYSTEM_TIME, new Date().getTime().toString(10))
      return true
    } else {
      return false
    }
  } catch {
    return false
  }
}

export const getSystemSigned = () => {
  const tokenSystem = window.localStorage.getItem(API_TOKEN_SYSTEM)
  const tokenSystemTime = parseInt(window.localStorage.getItem(API_TOKEN_SYSTEM_TIME), 10)
  const timeDiff = (new Date().getTime() - (tokenSystemTime || 0)) / 1000
  return tokenSystem && timeDiff < 86400
}

export const getUserSigned = () => {
  // const token = localStorage.getItem(API_TOKEN)
  // const tokenTime = localStorage.getItem(API_TOKEN_TIME)
  const userId = parseInt(window.localStorage.getItem(USER_ID))
  // const timeDiff = (new Date().getTime() - (tokenTime || 0)) / 1000
  // return token && timeDiff < 86400 && userId
  return !isNaN(userId) && (userId + 0) > 0
}

const AuthenticationWrapper = ({ children }) => {
  const dispatch = useDispatch()
  // const storeCustomer = useSelector(state => state.customer.customerStatus.customer)
  const [systemSigned, setSystemSigned] = useState(false)
  const [userSigned, setUserSigned] = useState(false)
  const [customer, setCustomer] = useState(null)
  const [systemLoading, setSystemLoading] = useState(true)
  const [loading, setLoading] = useState(true)

  const userLogin = useCallback(() => {
    console.log({ message: 'userLogin()' })
    const userSigned = getUserSigned()

    console.log({ userSigned })

    if (!userSigned) {
      console.log('User not signed!!')
      setCustomer(null)
      setUserSigned(false)
      setLoading(false)
      dispatch({ type: 'INITIAL_LOADING_FINISHED' })
      return
    }

    const userId = parseInt(window.localStorage.getItem(USER_ID))

    return api.get(`/services/app/Customers/GetCustomerForView?id=${userId}`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error()
        }

        console.log('setando customer e userSigned')
        setCustomer(response.data.result.customer)
        setUserSigned(true)
      }).catch(() => {
        setUserSigned(false)
        setCustomer(null)
      }).finally(() => {
        dispatch({ type: 'INITIAL_LOADING_FINISHED' })
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const systemSigned = getSystemSigned()

    if (systemSigned) {
      setSystemSigned(true)
      setSystemLoading(false)
      return userLogin()
    }

    systemLogin().then(response => {
      setSystemSigned(response)
      console.log('System login efetuado')
      return userLogin()
      // dispatch({ type: actions.AuthTypes.SYSTEM_LOGIN_SUCCESS })
    }).finally(() => {
      console.log('System login finalizado')
      setSystemLoading(false)
    })
  }, [])

  return (
    <AuthenticationContext.Provider value={{
      systemSigned,
      userSigned,
      customer,
      loading,
      systemLoading
    }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationWrapper
