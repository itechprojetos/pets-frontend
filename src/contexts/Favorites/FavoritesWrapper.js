import React, { useContext, useEffect, useState, useCallback } from 'react'
import FavoritesContext from './FavoritesContext'
import AuthenticationContext from '../Authentication/AuthenticationContext'
import api from '../../services/api'

// Este wrapper só pode ser chamado caso o usuário esteja autenticado e a autenticação não esteja mais carregando
const FavoritesWrapper = ({ children }) => {
  const { customer } = useContext(AuthenticationContext)
  const [initialLoaded, setInitialLoaded] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [errored, setErrored] = useState(false)
  const [shouldRefetch, setShouldRefetch] = useState(true)

  useEffect(() => {
    if (!shouldRefetch) return

    if (customer == null) {
      setErrored(true)
      setLoading(false)
      setFavorites([])
      return
    }
    setShouldRefetch(false)
    setLoading(true)
    ;(async () => {
      const res = await api.get(
        '/services/app/Favorites/GetAll?customerIdFilter=' + customer.id
      )

      setFavorites(
        res.data.result.items.filter(
          item => item.favorite.customerId === customer.id
        )
      )
      setErrored(false)
    })()
      .catch(() => {
        setErrored(true)
      })
      .finally(() => {
        setLoading(false)
        setInitialLoaded(true)
      })
  }, [shouldRefetch, customer])

  const favoriteItem = useCallback(
    async (serviceId, professionalServiceId, donationId) => {
      if (customer == null) return false
      try {
        if (
          favorites.findIndex(
            item =>
              item.customerId === customer.id &&
              item.serviceId === serviceId &&
              item.professionalServiceId === professionalServiceId &&
              item.donationId === donationId
          ) >= 0
        ) {
          return true
        }

        const currDate = new Date()

        const newFavorite = {
          desc: '',
          created: currDate,
          updated: currDate,
          customerId: customer.id,
          professionalServiceId,
          donationId,
          serviceId: null
        }

        const res = await api.post(
          '/services/app/Favorites/CreateOrEdit',
          newFavorite
        )

        setShouldRefetch(true)

        return res.status === 200
      } catch {
        return false
      }
    },
    [customer, favorites]
  )

  const unfavoriteItem = useCallback(async favoriteId => {
    try {
      const res = await api.delete(
        `/services/app/Favorites/Delete?id=${favoriteId}`
      )

      setShouldRefetch(true)

      return res.status === 200
    } catch {
      return false
    }
  }, [])

  const refetch = useCallback(() => {
    setShouldRefetch(true)
  }, [])

  useEffect(() => {
    console.log({ favorites })
  }, [favorites])

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        loading,
        errored,
        favoriteItem,
        unfavoriteItem,
        refetch,
        initialLoaded
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export default FavoritesWrapper
