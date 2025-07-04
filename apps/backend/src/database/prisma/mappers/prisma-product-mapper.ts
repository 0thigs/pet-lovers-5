import { Product } from '@pet-lovers/core/entities'

import type { PrismaProduct } from '../types'
import type { Decimal } from '@prisma/client/runtime/library'

export class PrismaProductsMapper {
  toDomain(prismaProduct: PrismaProduct): Product {
    return Product.create({
      id: prismaProduct.id,
      name: prismaProduct.name,
      category: 'product',
      price: Number(prismaProduct.price),
      description: prismaProduct.description,
      ordersCount: prismaProduct._count.orders,
    })
  }

  toPrisma(product: Product): PrismaProduct {
    return {
      id: product.id,
      name: product.name,
      category: 'PRODUCT',
      price: product.price as unknown as Decimal,
      description: product.description,
      registered_at: new Date(),
      _count: { orders: product.ordersCount },
    }
  }
}
