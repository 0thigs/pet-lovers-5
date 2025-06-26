import type { CustomerDto, ProductDto, ServiceDto } from '@pet-lovers/core/dtos'
import { PetType } from '@pet-lovers/core/enums'
import type { IApiClient, IReportsService } from '@pet-lovers/core/interfaces'
import type { PaginationResponse } from '@pet-lovers/core/responses'

export const ReportsService = (apiClient: IApiClient): IReportsService => {
  return {
    async listCustomersByLessConsumption() {
      return await apiClient.get<CustomerDto[]>('/reports/customers-by-less-consumption')
    },

    async listCustomersByMostConsumption() {
      return await apiClient.get<CustomerDto[]>('/reports/customers-by-most-consumption')
    },

    async listCustomersByMostSpending() {
      return await apiClient.get<CustomerDto[]>('/reports/customers-by-most-spending')
    },

    async listMostConsumedProducts(page: number, petType: PetType, petBreed: string) {
      apiClient.clearParams()
      apiClient.setParam('page', page.toString())
      if (petType) apiClient.setParam('petType', petType)
      if (petBreed) apiClient.setParam('petBreed', petBreed)

      return await apiClient.get<PaginationResponse<ProductDto>>(
        '/reports/most-consumed-products',
      )
    },

    async listMostConsumedServices(page: number,  petType: PetType, petBreed: string) {
      apiClient.clearParams()
      apiClient.setParam('page', page.toString())
      if (petType) apiClient.setParam('petType', petType)
      if (petBreed) apiClient.setParam('petBreed', petBreed)
  
      return await apiClient.get<PaginationResponse<ServiceDto>>(
        '/reports/most-consumed-services',
      )
    },
  }
}
