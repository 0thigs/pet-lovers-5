import type { IHttp } from '@pet-lovers/core/interfaces'
import { RegisterOrdersUseCase } from '@pet-lovers/core/use-cases'

import { ordersRepository } from '../../../database'
import type { OrderDto } from '@pet-lovers/core/dtos'

type Body = {
  orders: OrderDto[]
}

export class RegisterOrdersController {
  async handle(http: IHttp) {
    const { orders } = http.getBody<Body>()
    const useCase = new RegisterOrdersUseCase(ordersRepository)
    const response = await useCase.execute(orders)

    return http.send(response)
  }
}
