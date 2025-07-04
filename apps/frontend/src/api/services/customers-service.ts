import type { Customer } from '@pet-lovers/core/entities'
import type { CustomerDto } from '@pet-lovers/core/dtos'
import type { PaginationResponse } from '@pet-lovers/core/responses'
import type { IApiClient, ICustomersService } from '@pet-lovers/core/interfaces'

export const CustomersService = (apiClient: IApiClient): ICustomersService => {
  return {
    async getAllCustomers() {
      return await apiClient.get<CustomerDto[]>('/customers/all')
    },

    async listCustomers(page: number) {
      apiClient.setParam('page', page.toString())
      return await apiClient.get<PaginationResponse<CustomerDto>>('/customers')
    },

    async registerCustomer(customer: Customer) {
      return await apiClient.post('/customers', customer.dto)
    },

    async updateCustomer(customer: Partial<CustomerDto>, customerId: string) {
      return await apiClient.put(`/customers/${customerId}`, customer)
    },

    async deleteCustomers(customerIds: string[]) {
      return await apiClient.delete('/customers', { customersIds: customerIds })
    },
  }
}
