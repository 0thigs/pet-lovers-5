import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Customer } from '@pet-lovers/core/entities'

import { reportsService } from '@/api'

export function useCustomersByMostConsumptionTable() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [page, setPage] = useState(1)
  const [isFetching, setIsFetching] = useState(true)

  const fetchCustomers = useCallback(async () => {
    setIsFetching(true)
    const response = await reportsService.listCustomersByMostConsumption()

    if (response.isFailure) {
      toast.error(response.errorMessage)
      return
    }

    setCustomers(response.body.map(Customer.create))
    setIsFetching(false)
  }, [])

  async function handlePageChange(page: number) {
    setPage(page)
  }

  useEffect(() => {
    fetchCustomers()
  }, [fetchCustomers])

  return {
    isFetching,
    page,
    customers,
    handlePageChange,
  }
}
