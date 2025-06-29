import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Customer } from '@pet-lovers/core/entities'
import type { CustomerDto } from '@pet-lovers/core/dtos'
import { PAGINATION } from '@pet-lovers/core/constants'

import { customersService } from '@/api'

export function useCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [pagesCount, setPagesCount] = useState(0)
  const [selectedCustomersIds, setSelectedCustomersIds] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [isFetching, setIsFetching] = useState(true)

  const fetchCustomers = useCallback(async (page: number) => {
    setIsFetching(true)
    const response = await customersService.listCustomers(page)

    if (response.isFailure) {
      toast.error('Não foi possível listar clientes, tente novamente mais tarde')
      return
    }

    setCustomers(response.body.items.map(Customer.create))
    setPagesCount(Math.ceil(response.body.itemsCount / PAGINATION.itemsPerPage))
    setPage(page)
    setIsFetching(false)
  }, [])

  async function handleCustomersSelectionChange(newSelectedCustomersIds: string[]) {
    setSelectedCustomersIds(newSelectedCustomersIds)
  }

  async function handlePageChange(page: number) {
    await fetchCustomers(page)
  }

  async function handleDeleteButtonClick() {
    const shouldDelete = confirm(
      selectedCustomersIds.length > 1
        ? 'Deseja deletar esses clientes?'
        : 'Deseja deletar esse cliente?',
    )
    if (!shouldDelete) return

    setIsFetching(true)

    const response = await customersService.deleteCustomers(selectedCustomersIds)
    if (response.isFailure) {
      toast.error(response.errorMessage)
    }

    if (response.isSuccess) {
      await fetchCustomers(1)
      toast.success(
        selectedCustomersIds.length > 1
          ? 'Clientes deletados com sucessso'
          : 'Cliente deletado com sucessso',
      )
    }

    setSelectedCustomersIds([])
    setIsFetching(false)
  }

  async function handleRegisterCustomer(customerDto: CustomerDto) {
    setIsFetching(true)

    const response = await customersService.registerCustomer(Customer.create(customerDto))
    if (response.isFailure) {
      toast.error(response.errorMessage)
    }

    if (response.isSuccess) {
      await fetchCustomers(1)
      toast.success('Cliente criado com sucessso')
    }

    setIsFetching(false)
  }

  async function handleUpdateCustomer(customerDto: CustomerDto, customerId: string) {
    setIsFetching(true)

    const response = await customersService.updateCustomer(customerDto, customerId)
    if (response.isFailure) {
      toast.error(response.errorMessage)
    }

    if (response.isSuccess) {
      await fetchCustomers(1)
      toast.success('Cliente atualizado com sucessso')
    }

    setIsFetching(false)
  }

  async function handleCustomerOrderItems() {
    await fetchCustomers(1)
    toast('Pedido realizado com sucesso!', { type: 'success' })
  }

  useEffect(() => {
    fetchCustomers(1)
  }, [fetchCustomers])

  return {
    customers,
    isFetching,
    selectedCustomersIds,
    page,
    pagesCount,
    handlePageChange,
    handleRegisterCustomer,
    handleUpdateCustomer,
    handleDeleteButtonClick,
    handleCustomerOrderItems,
    handleCustomersSelectionChange,
  }
}
