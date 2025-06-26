import type { IHttp } from '@pet-lovers/core/interfaces'
import { ListCustomersByMostConsumptionUseCase } from '@pet-lovers/core/use-cases'

import { customersRepository } from '../../../database'

export class ListCustomersByMostConsumptionController {
  async handle(http: IHttp) {
    const useCase = new ListCustomersByMostConsumptionUseCase(customersRepository)
    const customers = await useCase.execute()

    return http.send(customers)
  }
}
