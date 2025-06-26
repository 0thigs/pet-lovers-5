import type { IHttp } from '@pet-lovers/core/interfaces'
import { UpdateServiceUseCase } from '@pet-lovers/core/use-cases'

import { servicesRepository } from '../../../database'
import type { ServiceDto } from '@pet-lovers/core/dtos'

type RouteParams = {
  serviceId: string
}

type Body = ServiceDto

export class UpdateServiceController {
  async handle(http: IHttp) {
    const { serviceId } = http.getRouteParams<RouteParams>()
    const serviceDto = http.getBody<Body>()
    const useCase = new UpdateServiceUseCase(servicesRepository)
    await useCase.execute(serviceDto, serviceId)

    return http.send(null)
  }
}
