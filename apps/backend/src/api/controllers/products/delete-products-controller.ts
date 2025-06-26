import type { IHttp } from '@pet-lovers/core/interfaces'
import { DeleteProductsUseCase } from '@pet-lovers/core/use-cases'

import { productsRepository } from '../../../database'

type Body = {
  productsIds: string[]
}

export class DeleteProductsController {
  async handle(http: IHttp) {
    const { productsIds } = http.getBody<Body>()
    const useCase = new DeleteProductsUseCase(productsRepository)
    await useCase.execute(productsIds)

    return http.send(null)
  }
}
