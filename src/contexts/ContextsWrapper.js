import React, { useContext } from 'react'
import AuthenticationContext from './Authentication/AuthenticationContext'
import AuthenticationWrapper from './Authentication/AuthenticationWrapper'
import FavoritesWrapper from './Favorites/FavoritesWrapper'
import LoaderWrapper from './Loader/LoaderWrapper'
import ChatWrapper from './Chat/ChatWrapper'

const AuthenticatedWrappers = ({ children }) =>
  [FavoritesWrapper, ChatWrapper].reduce(
    (result, item) => item({ children: result }),
    children
  )
const UnauthenticatedWrappers = ({ children }) =>
  [].reduce((result, item) => item({ children: result }), children)

const MergedWrappers = ({ children }) => {
  const { userSigned, customer, loading } = useContext(AuthenticationContext)

  // if (!userSigned || customer == null) {
  //   return UnauthenticatedWrappers({ children })
  // }

  return AuthenticatedWrappers({
    children: UnauthenticatedWrappers({ children })
  })

  // const wrappers =
  //   userSigned && customer != null
  //     ?
  //     : UnauthenticatedWrappers({ children })

  // return <>{wrappers}</>
}

const ContextsWrapper = ({ children }) => {
  return (
    <AuthenticationWrapper>
      <MergedWrappers>
        <LoaderWrapper>{children}</LoaderWrapper>
      </MergedWrappers>
    </AuthenticationWrapper>
  )
}

export default ContextsWrapper
