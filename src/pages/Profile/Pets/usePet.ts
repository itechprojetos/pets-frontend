import { useEffect /*useCallback*/ } from 'react'
import { useState } from 'react'
import api from '../../../services/api'
import { Pet } from '../../../models/Pet'

export default (id?: string) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<{
    petsTypename: string
    customername: string
    pet: Pet
  }>(null)
  const [errored, setErrored] = useState(false)

  useEffect(() => {
    if (id == null) return
    setLoading(true)
    ;(async () => {
      const res = await api.get(`/services/app/Pets/GetPetForEdit?Id=${id}`)

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
  }, [id])

  return { loading, data, errored }
}
