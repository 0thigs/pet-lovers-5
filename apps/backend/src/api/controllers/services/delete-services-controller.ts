import type { IHttp } from '@pet-lovers/core/interfaces'
import { DeleteServicesUseCase } from '@pet-lovers/core/use-cases'

import { servicesRepository } from '../../../database'

type Body = {
  servicesIds: string[]
}

export class DeleteServicesController {
  async handle(http: IHttp) {
    const { servicesIds } = http.getBody<Body>()
    const useCase = new DeleteServicesUseCase(servicesRepository)
    await useCase.execute(servicesIds)

    return http.send(null)
  }
}
