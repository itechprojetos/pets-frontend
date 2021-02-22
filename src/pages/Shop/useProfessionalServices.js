import { useState, useEffect } from 'react'
import api from '../../services/api'
import { ProfessionalService } from '../../models/ProfessionalService'
import { Customer } from '../../models/Customer'

export default customerId => {
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState([])
  const [customer, setCustomer] = useState(null)
  const [errored, setErrored] = useState(false)

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      const [customerRes, professionalServicesRes] = await Promise.all([
        api.get(`/services/app/Customers/GetCustomerForView?id=${customerId}`),
        api.get(
          `/services/app/ProfessionalServices/GetAll?CustomerIdFilter=${customerId}`
        )
      ])

      const customerItem = customerRes.data.result.customer

      setCustomer(customerItem)

      const servicesList = professionalServicesRes.data.result.items

      setServices(servicesList)

      setErrored(false)
    })()
      .catch(err => {
        console.log(err)
        setErrored(true)
        setServices(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [customerId])

  return { loading, services, errored, customer }
}
