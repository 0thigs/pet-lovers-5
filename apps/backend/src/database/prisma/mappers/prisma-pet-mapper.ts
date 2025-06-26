import { Pet } from '@pet-lovers/core/entities'

import type { PrismaPet } from '../types'

export class PrismaPetMapper {
  toDomain(prismaPet: PrismaPet): Pet {
    return Pet.create({
      id: prismaPet.id,
      name: prismaPet.name,
      breed: prismaPet.breed,
      type: prismaPet.type,
      gender: prismaPet.gender,
      customer: {
        id: prismaPet.customer_id,
        name: prismaPet.customer_name,
        cpf: prismaPet.customer_cpf,
      },
    })
  }

  toPrisma(pet: Pet): PrismaPet {
    return {
      id: pet.id,
      name: pet.name,
      breed: pet.breed,
      type: pet.type,
      gender: pet.gender,
      customer_id: pet.customer.id,
      customer_name: pet.customer.name ?? '',
      customer_cpf: pet.customer.cpf ?? '',
      registered_at: new Date(),
    }
  }
}
