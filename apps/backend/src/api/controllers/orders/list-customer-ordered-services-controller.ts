import type { IHttp } from '@pet-lovers/core/interfaces'
import { ListCustomerOrderedservicesUseCase } from '@pet-lovers/core/use-cases'

import { customersRepository, servicesRepository } from '../../../database'

type QueryParams = {
  page: number
}

type RouteParams = {
  customerId: string
}

export class ListCustomersOrderedServicesController {
  async handle(http: IHttp) {
    const { page } = http.getQueryParams<QueryParams>()
    const { customerId } = http.getRouteParams<RouteParams>()
    const useCase = new ListCustomerOrderedservicesUseCase(
      servicesRepository,
      customersRepository,
    )
    const response = await useCase.execute(customerId, page)

    return http.send(response)
  }
}
