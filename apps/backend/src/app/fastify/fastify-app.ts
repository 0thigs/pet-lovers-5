import Fastify, { type FastifyInstance } from 'fastify'
import Cors from '@fastify/cors'
import { HTTP_STATUS_CODE } from '@pet-lovers/core/constants'
import type { IApp } from '@pet-lovers/core/interfaces'

import {
  CustomersRoutes,
  PetsRoutes,
  OrdersRoutes,
  ProductsRoutes,
  ReportsRoutes,
  ServicesRoutes,
} from './routes'

export class FastifyApp implements IApp {
  private readonly app: FastifyInstance

  constructor() {
    this.app = Fastify()
    this.app.register(Cors, { origin: '*' })

    this.setErrorHandler()
    this.registerRoutes()
  }

  startServer() {
    this.app
      .listen({ port: 3333 })
      .then(() => {
        console.log('📟 Server running on port: http://localhost:3333')
      })
      .catch((error) => {
        console.error(`❌ Error on start server: ${error}`)
        process.exit(1)
      })
  }

  stopServer() {}

  private setErrorHandler() {
    this.app.setErrorHandler((error, _, reply) => {
      console.error(error)

      return reply.status(HTTP_STATUS_CODE.serverError).send({
        title: 'Server Error',
        message: error.message,
      })
    })
  }

  private registerRoutes() {
    this.app.register(CustomersRoutes, { prefix: '/customers' })
    this.app.register(PetsRoutes, { prefix: '/pets' })
    this.app.register(ProductsRoutes, { prefix: '/products' })
    this.app.register(ServicesRoutes, { prefix: '/services' })
    this.app.register(ReportsRoutes, { prefix: '/reports' })
    this.app.register(OrdersRoutes, { prefix: '/orders' })
  }
}
