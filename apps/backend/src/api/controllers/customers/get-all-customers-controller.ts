import { GetAllCustomersUseCase } from '@pet-lovers/core/use-cases'

import { FastifyHttp } from '../../../app/fastify/fastify-http'
import { customersRepository } from 'src/database'

export class GetAllCustomersController {
  async handle(http: FastifyHttp) {
    const useCase = new GetAllCustomersUseCase(customersRepository)
    const response = await useCase.execute()
    return http.send(response)
  }
}