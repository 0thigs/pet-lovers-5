import { petsRepository } from '../../../database'
import type { IHttp } from '@pet-lovers/core/interfaces'
import { DeletePetsUseCase } from '@pet-lovers/core/use-cases'

type Body = {
  petsIds: string[]
}

export class DeletePetsController {
  async handle(http: IHttp) {
    const { petsIds } = http.getBody<Body>()
    const useCase = new DeletePetsUseCase(petsRepository)
    await useCase.execute(petsIds)

    return http.send(null)
  }
} 