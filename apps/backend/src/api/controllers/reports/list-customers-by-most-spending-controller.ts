import type { IHttp } from '@pet-lovers/core/interfaces'
import { ListCustomersByMostSpendingUseCase } from '@pet-lovers/core/use-cases'

import { customersRepository } from '../../../database'

export class ListCustomersByMostSpendingController {
  async handle(http: IHttp) {
    const useCase = new ListCustomersByMostSpendingUseCase(customersRepository)
    const customers = await useCase.execute()

    return http.send(customers)
  }
}
