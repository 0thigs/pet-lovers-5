import type { IHttp } from '@pet-lovers/core/interfaces'
import { ListCustomerOrderedProductsUseCase } from '@pet-lovers/core/use-cases'

import { customersRepository, productsRepository } from '../../../database'

type QueryParams = {
  page: number
}

type RouteParams = {
  customerId: string
}

export class ListCustomersOrderedProductsController {
  async handle(http: IHttp) {
    const { page } = http.getQueryParams<QueryParams>()
    const { customerId } = http.getRouteParams<RouteParams>()
    const useCase = new ListCustomerOrderedProductsUseCase(
      productsRepository,
      customersRepository,
    )
    const response = await useCase.execute(customerId, page)

    return http.send(response)
  }
}
