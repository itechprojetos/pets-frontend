import { useState, useEffect } from 'react'
import api from '../services/api'

export default url => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [errored, setErrored] = useState(false)

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      const res = await api.get(url)

      setData(res.data.result)

      setErrored(false)
    })()
      .catch(() => {
        setErrored(true)
        setData(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [url])

  return { loading, data, errored }
}
