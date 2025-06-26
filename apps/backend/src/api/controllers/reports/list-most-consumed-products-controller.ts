import type { IHttp } from '@pet-lovers/core/interfaces'
import {
  ListProductsByMostComsumptionAndPetBreedUseCase,
  ListProductsByMostComsumptionAndPetTypeUseCase,
  ListMostConsumedProductsUseCase,
} from '@pet-lovers/core/use-cases'
import { PetType } from '@pet-lovers/core/enums'

import { productsRepository } from '../../../database'

type QueryParams = {
  page: number
  petType?: PetType,
  petBreed?: string
}

export class ListMostConsumedProductsController {
  async handle(http: IHttp) {
    const { page, petType, petBreed } = http.getQueryParams<QueryParams>()

    if (petBreed) {
      const useCase = new ListProductsByMostComsumptionAndPetBreedUseCase(
        productsRepository,
      )
      const response = await useCase.execute(page, petBreed)
      return http.send(response)
    }

    if (petType) {
      const useCase = new ListProductsByMostComsumptionAndPetTypeUseCase(
        productsRepository,
      )
      const response = await useCase.execute(page, petType)
      return http.send(response)
    }

    const useCase = new ListMostConsumedProductsUseCase(productsRepository)
    const customers = await useCase.execute(page)
    return http.send(customers)
  }
}
