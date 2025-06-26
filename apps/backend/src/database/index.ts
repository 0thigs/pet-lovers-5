import {
  CustomersRepository,
  PetRepository,
  ProductsRepository,
  ServicesRepository,
  OrdersRepository,
} from './prisma/repositories'

export const customersRepository = new CustomersRepository()
export const petsRepository = new PetRepository()
export const productsRepository = new ProductsRepository()
export const servicesRepository = new ServicesRepository()
export const ordersRepository = new OrdersRepository()
