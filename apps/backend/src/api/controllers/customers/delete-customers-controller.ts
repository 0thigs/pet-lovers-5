import { customersRepository } from '../../../database'
import type { IHttp } from '@pet-lovers/core/interfaces'
import { DeleteCustomersUseCase } from '@pet-lovers/core/use-cases'

type Body = {
  customersIds: string[]
}

export class DeleteCustomersController {
  async handle(http: IHttp) {
    const { customersIds } = http.getBody<Body>()
    const useCase = new DeleteCustomersUseCase(customersRepository)
    await useCase.execute(customersIds)

    return http.send(null)
  }
}
