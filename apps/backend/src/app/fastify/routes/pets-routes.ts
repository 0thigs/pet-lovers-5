import type { FastifyInstance } from 'fastify'

import {
  DeletePetsController,
  GetAllBreedsController,
  ListPetsController,
  RegisterPetController,
  UpdatePetController,
} from '../../../api/controllers/pets'
import { FastifyHttp } from '../fastify-http'

export const PetsRoutes = async (app: FastifyInstance) => {
  const registerPetController = new RegisterPetController()
  const listPetController = new ListPetsController()
  const deletePetController = new DeletePetsController()
  const updatePetController = new UpdatePetController()
  const getAllBreedsController = new GetAllBreedsController()

  app.get('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return listPetController.handle(http)
  })

  app.get('/breeds', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return getAllBreedsController.handle(http)
  })

  app.post('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return registerPetController.handle(http)
  })

  app.put('/:petId', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return updatePetController.handle(http)
  })

  app.delete('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return deletePetController.handle(http)
  })
}
