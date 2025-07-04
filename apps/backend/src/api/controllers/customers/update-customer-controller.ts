import type { IHttp } from '@pet-lovers/core/interfaces'
import { UpdateCustomerUseCase } from '@pet-lovers/core/use-cases'

import { customersRepository } from '../../../database'
import type { CustomerDto } from '@pet-lovers/core/dtos'

type RouteParams = {
  customerId: string
}

type Body = CustomerDto

export class UpdateCustomerController {
  async handle(http: IHttp) {
    const { customerId } = http.getRouteParams<RouteParams>()
    const customerDto = http.getBody<Body>()
    const useCase = new UpdateCustomerUseCase(customersRepository)
    await useCase.execute(customerDto, customerId)

    return http.send(null)
  }
}
