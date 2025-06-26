import type { IHttp } from '@pet-lovers/core/interfaces'
import { RegisterServiceUseCase } from '@pet-lovers/core/use-cases'

import { servicesRepository } from '../../../database'
import type { ServiceDto } from '@pet-lovers/core/dtos'

type Body = ServiceDto

export class RegisterServiceController {
  async handle(http: IHttp) {
    const serviceDto = http.getBody<Body>()
    const useCase = new RegisterServiceUseCase(servicesRepository)
    await useCase.execute(serviceDto)

    return http.send(null)
  }
}
