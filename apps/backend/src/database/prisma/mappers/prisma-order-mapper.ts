import { Order } from '@pet-lovers/core/structs'

import type { PrismaOrder } from '../types'

export class PrismaOrderssMapper {
  toDomain(prismaOrder: PrismaOrder): Order {
    return Order.create({
      customerId: prismaOrder.customer_id,
      petId: prismaOrder.pet_id,
      itemId: prismaOrder.item_id,
      amount: Number(prismaOrder.amount),
    })
  }

  toPrisma(order: Order): PrismaOrder {
    return {
      id: '',
      customer_id: order.customerId,
      pet_id: order.petId,
      item_id: order.itemId,
      amount: order.amount,
      registered_at: new Date(),
    }
  }
}
