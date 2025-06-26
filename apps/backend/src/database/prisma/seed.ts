import { faker } from '@faker-js/faker'

import { CustomersFaker, PetsFaker, ProductsFaker, ServicesFaker } from '@pet-lovers/core/fakers'
import { Order } from '@pet-lovers/core/structs'
import {
  productsRepository,
  servicesRepository,
  customersRepository,
  ordersRepository,
  petsRepository,
} from '..'

export async function seed() {
  await Promise.all([
    productsRepository.removeAll(),
    customersRepository.removeAll(),
    ordersRepository.removeAll(),
    servicesRepository.removeAll(),
    petsRepository.removeAll(),
  ])

  const fakeProducts = ProductsFaker.fakeMany(20)
  const fakeServices = ServicesFaker.fakeMany(10)

  const fakeCustomers = []
  const fakePets = []
  const fakeOrders = []

  for (let index = 0; index < 30; index++) {
    const fakeCustomer = CustomersFaker.fake()
    const fakePet = PetsFaker.fake({
      customer: {
        id: fakeCustomer.id,
      },
    })

    for (let index = 0; index < faker.number.int({ min: 0, max: 10 }); index++) {
      const fakeProduct =
        fakeProducts[faker.number.int({ min: 0, max: fakeProducts.length - 1 })]
      const order = Order.create({
        customerId: fakeCustomer.id,
        amount: fakeProduct.price,
        itemId: fakeProduct.id,
        petId: fakePet.id,
      })
      fakeOrders.push(order)
    }

    for (let index = 0; index < faker.number.int({ min: 0, max: 5 }); index++) {
      const fakeService =
        fakeServices[faker.number.int({ min: 0, max: fakeServices.length - 1 })]
      const order = Order.create({
        customerId: fakeCustomer.id,
        amount: fakeService.price,
        itemId: fakeService.id,
        petId: fakePet.id,
      })
      fakeOrders.push(order)
    }

    fakePets.push(fakePet)
    fakeCustomers.push(fakeCustomer)
  }

  await Promise.all([
    customersRepository.addMany(fakeCustomers),
    productsRepository.addMany(fakeProducts),
    servicesRepository.addMany(fakeServices),
  ])
  
  await petsRepository.addMany(fakePets)
  await ordersRepository.addMany(fakeOrders)
}

seed().then(() => {
  console.log('Database seeded 🌱')
})
