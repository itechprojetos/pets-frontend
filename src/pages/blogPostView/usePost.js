import { useState, useEffect } from 'react'
import api from '../../services/api'

export default (id) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errored, setErrored] = useState(false)

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/services/app/Posts/GetPostForView?id=${id}`)

      setData(data.result.post)
      setErrored(false)
    })()
      .catch(() => {
        setData(null)
        setErrored(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  return {
    data, loading, errored
  }
}