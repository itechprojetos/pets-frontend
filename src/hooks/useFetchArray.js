import { useState, useEffect } from 'react'
import api from '../services/api'

export default url => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [errored, setErrored] = useState(false)

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      const res = await api.get(url)

      setData(res.data.result.items)

      setErrored(false)
    })()
      .catch(() => {
        setErrored(true)
        setData([])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [url])

  return { loading, data, errored }
}
