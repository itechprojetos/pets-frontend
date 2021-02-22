import React, { useContext, useMemo, useEffect } from 'react'
import styled from 'styled-components'
import AuthenticationContext from '../Authentication/AuthenticationContext'
import FavoritesContext from '../Favorites/FavoritesContext'
import LoaderContext from './LoaderContext'

const Loader = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 0, 0, 0.4);
`

const LoaderWrapper = ({ children }) => {
  const auth = useContext(AuthenticationContext)
  const favorites = useContext(FavoritesContext)

  const progress = useMemo(() => {
    if (auth.loading) return 0

    if (!auth.userSigned) return 100

    if (!favorites.initialLoaded) return 50

    return 100
  }, [auth.loading, auth.userSigned, favorites.initialLoaded])

  const loading = useMemo(() => progress < 100, [progress])

  useEffect(() => {
    console.log({ progress, loading })
  }, [progress, loading])

  return (
    <LoaderContext.Provider value={{ loading, progress }}>
      <>
        {children}
        {/* <Loader>{progress}</Loader> */}
      </>
    </LoaderContext.Provider>
  )
}

export default LoaderWrapper
