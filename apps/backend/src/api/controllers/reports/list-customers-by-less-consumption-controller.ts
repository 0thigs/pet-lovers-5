import type { IHttp } from '@pet-lovers/core/interfaces'
import { ListCustomersByLessConsumptionUseCase } from '@pet-lovers/core/use-cases'

import { customersRepository } from '../../../database'

export class ListCustomersByLessConsumptionController {
  async handle(http: IHttp) {
    const useCase = new ListCustomersByLessConsumptionUseCase(customersRepository)
    const customers = await useCase.execute()
    return http.send(customers)
  }
}
