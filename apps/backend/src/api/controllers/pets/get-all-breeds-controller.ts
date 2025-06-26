import { GetAllBreedsUseCase } from '@pet-lovers/core/use-cases'

import { FastifyHttp } from '../../../app/fastify/fastify-http'
import { petsRepository } from 'src/database'

export class GetAllBreedsController {
  async handle(http: FastifyHttp) {
    const useCase = new GetAllBreedsUseCase(petsRepository)
    const response = await useCase.execute()
    return http.send(response)
  }
}