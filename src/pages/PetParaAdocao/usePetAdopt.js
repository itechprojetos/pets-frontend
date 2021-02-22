import { useState, useEffect } from "react"
import api from '../../services/api'


export default (id) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [errored, setErrored] = useState(false)


  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await api.get(`/services/app/Donations/GetDonationForView?id=${id}`)

      const customerRes = await api.get(`/services/app/Customers/GetCustomerForView?id=${res.data.result.donation.customerId}`)

      setData({ ...res.data.result, customer: { ...customerRes.data.result } })

      setErrored(false)
    })()
      .catch(() => {
        setErrored(true)
        setData([])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  return { loading, data, errored }
}