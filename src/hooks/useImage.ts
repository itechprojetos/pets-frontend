import { useState, useCallback, useEffect } from 'react'

const defaultNoPhoto = require('../assets/images/no-photo.png')

const getImageUrl = (url: string, fallback: any = defaultNoPhoto) =>
  url == null || url === '' ? fallback : url

export default (imageUrl: string, fallbackImage: any) => {
  const [src, setSrc] = useState(getImageUrl(imageUrl, fallbackImage))

  useEffect(() => {
    setSrc(getImageUrl(imageUrl, fallbackImage))
  }, [imageUrl, fallbackImage])

  const handleError = useCallback(() => {
    setSrc(fallbackImage)
  }, [fallbackImage])

  return { src, handleError }
}
