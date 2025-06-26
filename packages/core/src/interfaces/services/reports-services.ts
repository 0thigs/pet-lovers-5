import type { CustomerDto, ProductDto, ServiceDto } from '../../dtos'
import { PetType } from '../../enums'
import type { ApiResponse, PaginationResponse } from '../../responses'

export interface IReportsService {
  listCustomersByLessConsumption(): Promise<ApiResponse<CustomerDto[]>>
  listCustomersByMostConsumption(): Promise<ApiResponse<CustomerDto[]>>
  listCustomersByMostSpending(): Promise<ApiResponse<CustomerDto[]>>
  listMostConsumedProducts(
    page: number,
    petType?: PetType,
    petBreed?: string,
  ): Promise<ApiResponse<PaginationResponse<ProductDto>>>
  listMostConsumedServices(
    page: number,
    petType?: PetType,
    petBreed?: string,
  ): Promise<ApiResponse<PaginationResponse<ServiceDto>>>
}
