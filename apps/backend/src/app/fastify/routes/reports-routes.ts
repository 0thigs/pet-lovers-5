import type { FastifyInstance } from 'fastify'

import {
  ListCustomersByLessConsumptionController,
  ListCustomersByMostConsumptionController,
  ListCustomersByMostSpendingController,
  ListMostConsumedProductsController,
  ListMostConsumedServicesController,
} from '../../../api/controllers'
import { FastifyHttp } from '../fastify-http'

export const ReportsRoutes = async (app: FastifyInstance) => {
  const listCustomersByLessConsumptionController =
    new ListCustomersByLessConsumptionController()
  const listCustomersByMostConsumptionController =
    new ListCustomersByMostConsumptionController()
  const listCustomersByMostSpendingController =
    new ListCustomersByMostSpendingController()
  const listMostConsumedProductsController = new ListMostConsumedProductsController()
  const listMostConsumedServicesController = new ListMostConsumedServicesController()

  app.get('/customers-by-less-consumption', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return listCustomersByLessConsumptionController.handle(http)
  })

  app.get('/customers-by-most-consumption', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return listCustomersByMostConsumptionController.handle(http)
  })

  app.get('/customers-by-most-spending', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return listCustomersByMostSpendingController.handle(http)
  })

  app.get('/most-consumed-products', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return listMostConsumedProductsController.handle(http)
  })

  app.get('/most-consumed-services', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return listMostConsumedServicesController.handle(http)
  })
}
