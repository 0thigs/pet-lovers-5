import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import type { Item } from '@pet-lovers/core/abstracts'
import { PAGINATION } from '@pet-lovers/core/constants'
import { Product, Service } from '@pet-lovers/core/entities'
import { Order } from '@pet-lovers/core/structs'
import { ordersService, productsService, servicesService } from '@/api'

export function useOrderForm(customerId: string, onOrderItems: (items: Item[]) => void) {
  const [products, setProducts] = useState<Product[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [selectedProductsIds, setSelectedProductsIds] = useState<string[]>([])
  const [selectedServicesIds, setSelectedServicesIds] = useState<string[]>([])
  const [selectedPetId, setSelectedPetId] = useState('')
  const [productsPage, setProductsPage] = useState(0)
  const [productsPagesCount, setProductsPagesCount] = useState(0)
  const [servicesPage, setServicesPage] = useState(0)
  const [servicesPagesCount, setServicesPagesCount] = useState(0)
  const [isFetchingProducts, setIsFetchingProducts] = useState(true)
  const [isFetchingServices, setIsFetchingServices] = useState(true)

  const fetchProducts = useCallback(async (page: number) => {
    setIsFetchingProducts(true)
    const response = await productsService.listProducts(page)

    if (response.isFailure) {
      toast.error('Não foi possível listar produtos, tente novamente mais tarde')
    }

    if (response.isSuccess) {
      setProducts(response.body.items.map(Product.create))
      setProductsPagesCount(Math.ceil(response.body.itemsCount / PAGINATION.itemsPerPage))
      setProductsPage(page)
    }

    setIsFetchingProducts(false)
  }, [])

  const fetchServices = useCallback(async (page: number) => {
    setIsFetchingServices(true)
    const response = await servicesService.listServices(page)

    if (response.isFailure) {
      toast.error('Não foi possível listar produtos, tente novamente mais tarde')
      return
    }

    if (response.isSuccess) {
      setServices(response.body.items.map(Service.create))
      setServicesPagesCount(Math.ceil(response.body.itemsCount / PAGINATION.itemsPerPage))
      setServicesPage(page)
    }

    setIsFetchingServices(false)
  }, [])

  async function handleProductsPageChange(page: number) {
    await fetchProducts(page)
  }

  async function handleServicesPageChange(page: number) {
    await fetchServices(page)
  }

  function handleProductsSelectionChange(selectedProductsIds: string[]) {
    setSelectedProductsIds(selectedProductsIds)
  }

  function handleServicesSelectionChange(selectedServicesIds: string[]) {
    setSelectedServicesIds(selectedServicesIds)
  }

  function handlePetSelectionChange(selectedPetId: string) {
    setSelectedPetId(selectedPetId)
  }

  async function handleOrderButtonClick() {
    setIsFetchingProducts(true)
    setIsFetchingServices(true)

    const selectedProducts = products.filter((product) =>
      selectedProductsIds.includes(product.id),
    )
    const selectedServices = services.filter((service) =>
      selectedServicesIds.includes(service.id),
    )
    const orders: Order[] = []

    for (const product of selectedProducts) {
      orders.push(
        Order.create({
          amount: product.price,
          customerId: customerId,
          itemId: product.id,
          petId: selectedPetId,
        }),
      )
    }
    for (const service of selectedServices) {
      orders.push(
        Order.create({
          amount: service.price,
          customerId: customerId,
          itemId: service.id,
          petId: selectedPetId,
        }),
      )
    }

    const response = await ordersService.registerOrders(orders)

    if (response.isFailure) {
      toast.error(response.errorMessage)
    }

    if (response.isSuccess) onOrderItems([...selectedProducts, ...selectedServices])

    setIsFetchingProducts(false)
    setIsFetchingServices(false)
  }

  useEffect(() => {
    ;(async () => await Promise.all([fetchProducts(1), fetchServices(1)]))()
  }, [fetchProducts, fetchServices])

  return {
    isFetchingProducts,
    isFetchingServices,
    products,
    productsPage,
    productsPagesCount,
    selectedProductsIds,
    services,
    servicesPage,
    servicesPagesCount,
    selectedServicesIds,
    selectedPetId,
    handlePetSelectionChange,
    handleProductsPageChange,
    handleProductsSelectionChange,
    handleServicesPageChange,
    handleServicesSelectionChange,
    handleOrderButtonClick,
  }
}
