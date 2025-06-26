import type { IHttp } from '@pet-lovers/core/interfaces'
import { ListPetsUseCase } from '@pet-lovers/core/use-cases'

import { petsRepository } from '../../../database'

type QueryParams = {
  page: number
}

export class ListPetsController {
  async handle(http: IHttp) {
    const { page } = http.getQueryParams<QueryParams>()
    const useCase = new ListPetsUseCase(petsRepository)
    const response = await useCase.execute(page)

    return http.send(response)
  }
} 