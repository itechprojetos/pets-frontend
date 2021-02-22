import { createContext } from 'react'

const INITIAL_VALUE = {
  initialLoaded: false,
  favorites: [],
  loading: true,
  errored: false,
  favoriteItem: (
    serviceId = null,
    professionalServiceId = null,
    donationId = null
  ) => Promise.resolve(true),
  unfavoriteItem: favoriteId => Promise.resolve(true),
  refetch: () => null
}

export default createContext(INITIAL_VALUE)
