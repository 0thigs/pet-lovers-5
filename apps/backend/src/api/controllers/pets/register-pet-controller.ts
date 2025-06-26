import type { IHttp } from '@pet-lovers/core/interfaces'
import { RegisterPetUseCase } from '@pet-lovers/core/use-cases'

import { petsRepository } from '../../../database'
import type { PetDto } from '@pet-lovers/core/dtos'

type Body = PetDto

export class RegisterPetController {
  async handle(http: IHttp) {
    const petDto = http.getBody<Body>()
    const useCase = new RegisterPetUseCase(petsRepository)
    await useCase.execute(petDto)

    return http.send(null)
  }
} 