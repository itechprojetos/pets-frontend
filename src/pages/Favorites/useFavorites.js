import { useContext, useState, useEffect } from 'react'
import AuthenticationContext from '../../contexts/Authentication/AuthenticationContext'
import api from '../../services/api'
import FavoritesContext from '../../contexts/Favorites/FavoritesContext'

export default () => {
  const { customer } = useContext(AuthenticationContext)
  const { favorites, loading: favoritesLoading } = useContext(FavoritesContext)
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState([])
  const [donations, setDonations] = useState([])

  useEffect(() => {
    setLoading(true)
    if (customer == null || favoritesLoading) return
    const serviceFavorites = favorites.filter(
      f => f.favorite.professionalServiceId != null
    )
    // const donationFavorites = favorites.filter(f => f.donationId != null)

    Promise.all(
      serviceFavorites.map(async fav => {
        const res = await api.get(
          '/services/app/ProfessionalServices/GetProfessionalServiceForView?id=' +
            fav.favorite.professionalServiceId
        )

        return res.data.result
      })
    )
      .then(setServices)
      .catch(() => setServices([]))
      .finally(() => setLoading(false))

    setDonations([])
  }, [favorites, customer, favoritesLoading])

  return { services, donations, loading }
}
