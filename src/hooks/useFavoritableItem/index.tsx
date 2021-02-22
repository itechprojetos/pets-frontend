import React, { useState, useEffect, useCallback, useContext, useMemo } from "react"
import api from "../../services/api"
import HeartComponent from "./HeartComponent"
import FavoritesContext from "../../contexts/Favorites/FavoritesContext"

// Aqui vocês passarão o customerId do usuário e o professionalServiceId do professionalService
// Como retorno, terão um component

type FavoriteElementProps = {
  marginTop?: string | number
  marginRight?: string | number
  fontSize?: string | number
}

export default ({ customerId, professionalServiceId = null, donationId = null }) => {
  const { favorites, favoriteItem, unfavoriteItem, errored } = useContext(FavoritesContext)

  const [favorited, setFavorited] = useState(false)

  const favorite = useMemo(() => {
    if (professionalServiceId != null) {
      return favorites.find(f => f.favorite.customerId === customerId && f.favorite.professionalServiceId === professionalServiceId)
    }
    if (donationId != null) {
      return favorites.find(f => f.favorite.customerId === customerId && f.favorite.donationId === donationId)
    }
    return null
  }, [favorites, customerId, professionalServiceId, donationId])

  useEffect(() => {
    setFavorited(favorite != null)
  }, [favorite])

  const toggleFavorited = useCallback(() => {
    if (favorite != null) {
      setFavorited(false)
      unfavoriteItem(favorite.favorite.id)
      return
    }
    setFavorited(true)
    favoriteItem(null, professionalServiceId, donationId)
  }, [favorite, favoriteItem, unfavoriteItem, professionalServiceId, donationId])
  return {
    FavoriteElement: ({ marginTop, marginRight, fontSize }: FavoriteElementProps) =>
      <HeartComponent marginTop={marginTop} marginRight={marginRight} fontSize={fontSize} favorited={favorited} toggleFavorited={toggleFavorited} visible={!errored} />
  }
}