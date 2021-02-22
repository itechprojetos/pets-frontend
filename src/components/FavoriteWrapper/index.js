import React from 'react'
import useFavoritableItem from '../../hooks/useFavoritableItem'

const FavoriteWrapper = ({
  customerId,
  professionalServiceId = null,
  donationId = null,
  marginTop = null,
  marginRight = null,
  fontSize = null
}) => {
  const { FavoriteElement } = useFavoritableItem({
    customerId,
    professionalServiceId,
    donationId
  })

  return (
    <FavoriteElement
      marginTop={marginTop}
      marginRight={marginRight}
      fontSize={fontSize}
    />
  )
}

export default FavoriteWrapper
