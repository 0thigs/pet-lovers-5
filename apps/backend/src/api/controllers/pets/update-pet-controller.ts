import type { IHttp } from '@pet-lovers/core/interfaces'
import { UpdatePetUseCase } from '@pet-lovers/core/use-cases'

import { petsRepository } from '../../../database'
import type { PetDto } from '@pet-lovers/core/dtos'

type RouteParams = {
  petId: string
}

type Body = PetDto

export class UpdatePetController {
  async handle(http: IHttp) {
    const { petId } = http.getRouteParams<RouteParams>()
    const petDto = http.getBody<Body>()
    const useCase = new UpdatePetUseCase(petsRepository)
    await useCase.execute(petDto, petId)

    return http.send(null)
  }
} 