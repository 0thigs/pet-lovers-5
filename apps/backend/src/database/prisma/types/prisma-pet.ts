import type { Pet } from '@prisma/client'

export type PrismaPet = Pet & {
  customer_id: string
  customer_name: string
  customer_cpf: string
}
