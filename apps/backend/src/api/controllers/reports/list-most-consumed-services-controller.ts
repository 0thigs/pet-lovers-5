import type { IHttp } from '@pet-lovers/core/interfaces'
import {
  ListServicesByMostComsumptionAndPetBreedUseCase,
  ListServicesByMostComsumptionAndPetTypeUseCase,
  ListMostConsumedServicesUseCase,
} from '@pet-lovers/core/use-cases'
import { PetType } from '@pet-lovers/core/enums'

import { servicesRepository } from '../../../database'

type QueryParams = {
  page: number
  petType?: PetType,
  petBreed?: string
}

export class ListMostConsumedServicesController {
  async handle(http: IHttp) {
    const { page, petType, petBreed } = http.getQueryParams<QueryParams>()

    if (petBreed) {
      const useCase = new ListServicesByMostComsumptionAndPetBreedUseCase(
        servicesRepository,
      )
      const response = await useCase.execute(page, petBreed)
      return http.send(response)
    }

    if (petType) {
      const useCase = new ListServicesByMostComsumptionAndPetTypeUseCase(
        servicesRepository,
      )
      const response = await useCase.execute(page, petType)
      return http.send(response)
    }

    const useCase = new ListMostConsumedServicesUseCase(servicesRepository)
    const customers = await useCase.execute(page)
    return http.send(customers)
  }
}
