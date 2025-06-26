import type { IHttp } from '@pet-lovers/core/interfaces'
import { ListCustomersUseCase } from '@pet-lovers/core/use-cases'

import { customersRepository } from '../../../database'

type QueryParams = {
  page: number
}

export class ListCustomersController {
  async handle(http: IHttp) {
    const { page } = http.getQueryParams<QueryParams>()
    const useCase = new ListCustomersUseCase(customersRepository)
    const response = await useCase.execute(page)

    return http.send(response)
  }
}
