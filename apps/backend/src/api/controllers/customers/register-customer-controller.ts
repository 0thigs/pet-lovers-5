import type { IHttp } from '@pet-lovers/core/interfaces'
import { RegisterCustomerUseCase } from '@pet-lovers/core/use-cases'

import { customersRepository } from '../../../database'
import type { CustomerDto } from '@pet-lovers/core/dtos'

type Body = CustomerDto

export class RegisterCustomerController {
  async handle(http: IHttp) {
    const customerDto = http.getBody<Body>()
    const useCase = new RegisterCustomerUseCase(customersRepository)
    await useCase.execute(customerDto)

    return http.send(null)
  }
}
