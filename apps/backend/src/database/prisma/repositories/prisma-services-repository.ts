import type { Service } from '@pet-lovers/core/entities'
import type { IServicesRepository } from '@pet-lovers/core/interfaces'

import { prisma } from '../client'
import { PrismaServicesMapper } from '../mappers'
import { PAGINATION } from '@pet-lovers/core/constants'
import { PetType } from '@pet-lovers/core/enums'

export class PrismaServicesRepository implements IServicesRepository {
  async findManyByPetType(
    page: number,
    petType: PetType,
  ): Promise<{ services: Service[]; count: number }> {
    const itemsPerPage = PAGINATION.itemsPerPage

    const prismaServices = await prisma.orderItem.findMany({
      skip: itemsPerPage * (page - 1),
      take: itemsPerPage,
      where: {
        category: 'SERVICE',
        orders: {
          some: {
            customer: {
              pets: {
                some: {
                  type: petType,
                },
              },
            },
          },
        },
      },
      include: {
        _count: {
          select: {
            orders: {
              where: {
                customer: {
                  pets: {
                    some: {
                      type: petType,
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: [{ orders: { _count: 'desc' } }, { registered_at: 'desc' }],
    })

    const count = await prisma.orderItem.count({
      where: {
        category: 'SERVICE',
        orders: {
          some: {
            customer: {
              pets: {
                some: {
                  type: petType,
                },
              },
            },
          },
        },
      },
    })

    const services = prismaServices.map(this.mapper.toDomain)
    services.sort((a, b) => b.ordersCount - a.ordersCount)

    return {
      services,
      count,
    }
  }

  async findManyByPetBreed(
    page: number,
    petBreed: string,
  ): Promise<{ services: Service[]; count: number }> {
    const itemsPerPage = PAGINATION.itemsPerPage

    const prismaServices = await prisma.orderItem.findMany({
      skip: itemsPerPage * (page - 1),
      take: itemsPerPage,
      where: {
        category: 'SERVICE',
        orders: {
          some: {
            customer: {
              pets: {
                some: {
                  breed: petBreed,
                },
              },
            },
          },
        },
      },
      include: {
        _count: {
          select: {
            orders: {
              where: {
                customer: {
                  pets: {
                    some: {
                      breed: petBreed,
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: [{ orders: { _count: 'desc' } }, { registered_at: 'desc' }],
    })

    const count = await prisma.orderItem.count({
      where: {
        category: 'SERVICE',
        orders: {
          some: {
            customer: {
              pets: {
                some: {
                  breed: petBreed,
                },
              },
            },
          },
        },
      },
    })

    const services = prismaServices.map(this.mapper.toDomain)
    services.sort((a, b) => b.ordersCount - a.ordersCount)

    return {
      services,
      count,
    }
  }

  private readonly mapper = new PrismaServicesMapper()

  async findById(ServiceId: string): Promise<Service | null> {
    const prismaItem = await prisma.orderItem.findUnique({
      include: { _count: { select: { orders: true } } },
      where: { id: ServiceId },
    })

    if (!prismaItem) return null

    return this.mapper.toDomain(prismaItem)
  }

  async findAll(): Promise<Service[]> {
    const prismaServices = await prisma.orderItem.findMany({
      include: { _count: { select: { orders: true } } },
      orderBy: { registered_at: 'desc' },
    })

    return prismaServices.map(this.mapper.toDomain)
  }

  async findMany(page: number = 1): Promise<Service[]> {
    const itemsPerPage = PAGINATION.itemsPerPage

    const prismaServices = await prisma.orderItem.findMany({
      skip: itemsPerPage * (page - 1),
      take: itemsPerPage,
      where: { category: 'SERVICE' },
      include: { _count: { select: { orders: true } } },
      orderBy: { registered_at: 'desc' },
    })

    return prismaServices.map(this.mapper.toDomain)
  }

  async findManyByCustomerId(
    page: number,
    customerId: string,
  ): Promise<{ services: Service[]; count: number }> {
    const itemsPerPage = PAGINATION.itemsPerPage

    const prismaServices = await prisma.orderItem.findMany({
      skip: itemsPerPage * (page - 1),
      take: itemsPerPage,
      where: { category: 'SERVICE', orders: { some: { customer_id: customerId } } },
      include: {
        _count: { select: { orders: { where: { customer_id: customerId } } } },
      },
      orderBy: { registered_at: 'desc' },
    })

    const count = await prisma.orderItem.count({
      where: { category: 'SERVICE', orders: { some: { customer_id: customerId } } },
    })

    return {
      services: prismaServices.map(this.mapper.toDomain),
      count,
    }
  }

  async findManyMostConsumedServices(
    page: number,
  ): Promise<{ services: Service[]; count: number }> {
    const itemsPerPage = PAGINATION.itemsPerPage

    const prismaProducts = await prisma.orderItem.findMany({
      skip: itemsPerPage * (page - 1),
      take: itemsPerPage,
      include: { _count: { select: { orders: true } } },
      where: { category: 'SERVICE' },
      orderBy: [{ orders: { _count: 'desc' } }, { registered_at: 'desc' }],
    })

    const count = await prisma.orderItem.count({ where: { category: 'SERVICE' } })

    return {
      services: prismaProducts.map(this.mapper.toDomain),
      count,
    }
  }

  async removeAll(): Promise<void> {
    await prisma.orderItem.deleteMany({ where: { category: 'SERVICE' } })
  }

  async removeMany(servicesIds: string[]): Promise<void> {
    await prisma.orderItem.deleteMany({ where: { id: { in: servicesIds } } })
  }

  async count(): Promise<number> {
    return await prisma.orderItem.count({ where: { category: 'SERVICE' } })
  }

  async update(Service: Service): Promise<void> {
    await prisma.orderItem.update({
      data: {
        name: Service.name,
        price: Service.price,
        description: Service.description,
        category: 'SERVICE',
      },
      where: {
        id: Service.id,
      },
    })
  }

  async add(Service: Service): Promise<void> {
    await prisma.orderItem.create({
      data: {
        id: Service.id,
        name: Service.name,
        price: Service.price,
        description: Service.description,
        category: 'SERVICE',
      },
    })
  }

  async addMany(Services: Service[]): Promise<void> {
    const prismaServices = Services.map(this.mapper.toPrisma)

    await prisma.orderItem.createMany({
      data: prismaServices.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description,
        category: 'SERVICE',
      })),
    })
  }
}
