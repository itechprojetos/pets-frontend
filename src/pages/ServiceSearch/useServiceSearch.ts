import { useState, useEffect } from "react"
import api from '../../services/api'
import { ProfessionalService } from "../../models/ProfessionalService"

export default (description: string) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<{ customername: string, professionalService: ProfessionalService }[]>([])
  const [errored, setErrored] = useState(false)

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await api.get(`/services/app/ProfessionalServices/GetAll?Filter=${description}`)


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
  }, [description])

  return { loading, data, errored }
}