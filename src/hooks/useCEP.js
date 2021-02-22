import { useState, useEffect } from 'react'
import axios from 'axios'

export default value => {
  const [loading, setLoading] = useState(false)
  const [errored, setErrored] = useState(false)
  const [lastValue, setLastValue] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [uf, setUf] = useState('')

  useEffect(() => {
    if (value === '' || value.length !== 8) {
      setAddress('')
      setUf('')
      setCity('')
      setErrored(true)
      setLastValue(value)
      return
    }
    if (loading || value === lastValue) {
      return
    }
    setLastValue(value)
    setLoading(true)
    axios
      .get(`http://viacep.com.br/ws/${value}/json/`)
      .then(res => {
        if (res.data.erro === true) {
          throw new Error()
        }

        setAddress(res.data.logradouro)
        setUf(res.data.uf)
        setCity(res.data.localidade)
        setErrored(false)
      })
      .catch(() => {
        setAddress('')
        setUf('')
        setCity('')
        setErrored(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [value, loading, lastValue])

  return { loading, errored, address, city, uf }
}
