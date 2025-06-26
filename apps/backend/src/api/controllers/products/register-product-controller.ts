import type { IHttp } from '@pet-lovers/core/interfaces'
import { RegisterProductUseCase } from '@pet-lovers/core/use-cases'

import { productsRepository } from '../../../database'
import type { ProductDto } from '@pet-lovers/core/dtos'

type Body = ProductDto

export class RegisterProductController {
  async handle(http: IHttp) {
    const productDto = http.getBody<Body>()
    const useCase = new RegisterProductUseCase(productsRepository)
    await useCase.execute(productDto)

    return http.send(null)
  }
}
