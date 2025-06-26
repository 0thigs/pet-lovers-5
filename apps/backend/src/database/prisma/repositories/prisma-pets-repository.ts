import { Pet } from '@pet-lovers/core/entities'
import { PetType } from '@pet-lovers/core/enums'
import type { IPetsRepository } from '@pet-lovers/core/interfaces'
import { PAGINATION } from '@pet-lovers/core/constants'
import { prisma } from '../client'
import { PrismaPetMapper } from '../mappers'
import type { PrismaPet } from '../types'

export class PrismaPetsRepository implements IPetsRepository {
  private readonly mapper = new PrismaPetMapper()

  async findById(id: string): Promise<Pet | undefined> {
    const data = await prisma.pet.findUnique({
      include: {
        customer: {
          include: {
            cpf: true,
          },
        },
      },
      where: {
        id,
      },
    })

    if (!data) return undefined

    const prismaPet: PrismaPet = {
      id: data.id,
      name: data.name,
      breed: data.breed,
      type: data.type,
      gender: data.gender,
      registered_at: data.registered_at,
      customer_id: data.customer_id,
      customer_name: data.customer.name,
      customer_cpf: data.customer.cpf?.value ?? '',
    }

    return this.mapper.toDomain(prismaPet)
  }

  async findAll(): Promise<Pet[]> {
    const data = await prisma.pet.findMany({
      include: {
        customer: {
          include: {
            cpf: true,
          },
        },
      },
      orderBy: {
        registered_at: 'desc',
      },
    })

    const prismaPets: PrismaPet[] = data.map((pet) => ({
      id: pet.id,
      name: pet.name,
      breed: pet.breed,
      type: pet.type,
      gender: pet.gender,
      registered_at: pet.registered_at,
      customer_id: pet.customer_id,
      customer_name: pet.customer.name,
      customer_cpf: pet.customer.cpf?.value ?? '',
    }))

    return prismaPets.map(this.mapper.toDomain)
  }

  async findAllBreeds(): Promise<string[]> {
    const data = await prisma.pet.findMany({
      select: {
        breed: true,
      },
      distinct: ['breed'],
      orderBy: {
        breed: 'asc',
      },
    })

    return data.map((pet) => pet.breed)
  }

  async findMany(page: number = 1): Promise<{ pets: Pet[]; count: number }> {
    const itemsPerPage = PAGINATION.itemsPerPage

  const data = await prisma.pet.findMany({
      take: itemsPerPage,
      skip: itemsPerPage * (page - 1),
      include: {
        customer: {
          include: {
            cpf: true,
          },
        },
      },
      orderBy: {
        registered_at: 'desc',
      },
    })

    const prismaPets: PrismaPet[] = data.map((pet) => ({
      id: pet.id,
      name: pet.name,
      breed: pet.breed,
      type: pet.type,
      gender: pet.gender,
      registered_at: pet.registered_at,
      customer_id: pet.customer_id,
      customer_name: pet.customer.name,
      customer_cpf: pet.customer.cpf?.value ?? '',
    }))

    const count = await prisma.pet.count()

    return {
      pets: prismaPets.map(this.mapper.toDomain),
      count,
    }
  }

  async findAllByType(type: PetType): Promise<Pet[]> {
    const data = await prisma.pet.findMany({
      include: {
        customer: {
          include: {
            cpf: true,
          },
        },
      },
      where: {
        type,
      },
      orderBy: {
        registered_at: 'desc',
      },
    })

    const prismaPets: PrismaPet[] = data.map((pet) => ({
      id: pet.id,
      name: pet.name,
      breed: pet.breed,
      type: pet.type,
      gender: pet.gender,
      registered_at: pet.registered_at,
      customer_id: pet.customer_id,
      customer_name: pet.customer.name,
      customer_cpf: pet.customer.cpf?.value ?? '',
    }))

    return prismaPets.map(this.mapper.toDomain)
  }

  async findAllByBreed(breed: string): Promise<Pet[]> {
    const data = await prisma.pet.findMany({
      include: {
        customer: {
          include: {
            cpf: true,
          },
        },
      },
      where: {
        breed,
      },
      orderBy: {
        registered_at: 'desc',
      },
    })

    const prismaPets: PrismaPet[] = data.map((pet) => ({
      id: pet.id,
      name: pet.name,
      breed: pet.breed,
      type: pet.type,
      gender: pet.gender,
      registered_at: pet.registered_at,
      customer_id: pet.customer_id,
      customer_name: pet.customer.name,
      customer_cpf: pet.customer.cpf?.value ?? '',
    }))

    return prismaPets.map(this.mapper.toDomain)
  }

  async removeAll(): Promise<void> {
    await prisma.pet.deleteMany()
  }

  async removeMany(petIds: string[]): Promise<void> {
    await prisma.pet.deleteMany({
      where: {
        id: { in: petIds },
      },
    })
  }

  async add(pet: Pet): Promise<void> {
    const prismaPet = this.mapper.toPrisma(pet)

    await prisma.pet.create({
      data: {
        id: pet.id,
        name: prismaPet.name,
        breed: prismaPet.breed,
        type: prismaPet.type,
        gender: prismaPet.gender,
        customer_id: prismaPet.customer_id,
      },
    })
  }

  async addMany(pets: Pet[]): Promise<void> {
    for (const pet of pets) await this.add(pet)
  }

  async update(pet: Pet): Promise<void> {
    const prismaPet = this.mapper.toPrisma(pet)

    await prisma.pet.update({
      data: {
        name: prismaPet.name,
        breed: prismaPet.breed,
        type: prismaPet.type,
        gender: prismaPet.gender,
        customer_id: prismaPet.customer_id,
      },
      where: {
        id: pet.id,
      },
    })
  }
}