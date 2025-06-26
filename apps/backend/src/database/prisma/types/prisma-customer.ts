import type { Customer, Cpf, Pet, Rg, Phone } from '@prisma/client'

export type PrismaCustomer = Customer & {
  pets: Pet[]
  cpf: Cpf
  rgs: Rg[]
  phones: Phone[]
  consumption: number
  spending: number
}
