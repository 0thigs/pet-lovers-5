import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { PAGINATION } from '@pet-lovers/core/constants'
import { Service } from '@pet-lovers/core/entities'
import { PetType } from '@pet-lovers/core/enums'

import { reportsService } from '@/api'

export function useMostConsumedServicesTableByPetType(petType: PetType) {
  const [services, setServices] = useState<Service[]>([])
  const [page, setPage] = useState(1)
  const [pagesCount, setPagesCount] =
    useState(0)
 
  const fetchServices = useCallback(async (page: number) => {
    const response = await reportsService.listMostConsumedServices(page, petType)
    
    if (response.isFailure) {
      toast.error(
        'Não foi possível listar clientes masculinos, tente novamente mais tarde',
      )
    }

    setServices(response.body.items.map(Service.create))
    setPage(page)
    setPagesCount(Math.ceil(response.body.itemsCount / PAGINATION.itemsPerPage))
  }, [petType])

  async function handlePageChange(page: number) {
    await fetchServices(page)
  }

  useEffect(() => {
    if (petType) {
      fetchServices(page)
    }
  }, [fetchServices, petType, page])

  return {
    services,
    page,
    pagesCount,
    handlePageChange,
  }
}
