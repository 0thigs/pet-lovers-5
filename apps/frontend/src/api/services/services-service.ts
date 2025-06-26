import type { IApiClient, IServicesService } from '@pet-lovers/core/interfaces'
import type { PaginationResponse } from '@pet-lovers/core/responses'
import type { Service } from '@pet-lovers/core/entities'
import type { ServiceDto } from '@pet-lovers/core/dtos'

export const ServicesService = (apiClient: IApiClient): IServicesService => {
  return {
    async listServices(page: number) {
      apiClient.setParam('page', page.toString())
      return await apiClient.get<PaginationResponse<ServiceDto>>('/services')
    },

    async registerService(service: Service) {
      return await apiClient.post('/services', service.dto)
    },

    async updateService(service: Service) {
      return await apiClient.put(`/services/${service.id}`, service.dto)
    },

    async deleteServices(servicesIds: string[]) {
      return await apiClient.delete('/services', { servicesIds })
    },
  }
}
