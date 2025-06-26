import type { ProductDto, ServiceDto } from '@pet-lovers/core/dtos'
import type { IApiClient, IOrdersService } from '@pet-lovers/core/interfaces'
import type { PaginationResponse } from '@pet-lovers/core/responses'
import type { Order } from '@pet-lovers/core/structs'

export const OrdersService = (apiClient: IApiClient): IOrdersService => {
  return {
    async registerOrders(orders: Order[]) {
      return await apiClient.post('/orders', { orders: orders.map((order) => order.dto) })
    },

    async listProducts(customerId: string, page: number) {
      apiClient.setParam('page', page.toString())
      return await apiClient.get<PaginationResponse<ProductDto>>(
        `/orders/${customerId}/products`,
      )
    },

    async listServices(customerId: string, page: number) {
      apiClient.setParam('page', page.toString())
      return await apiClient.get<PaginationResponse<ServiceDto>>(
        `/orders/${customerId}/services`,
      )
    },
  }
}
