import type { Customer } from '../../domain/entities/customer'
import { Phone } from '../../domain/structs'

export interface ICustomersRepository {
  findById(id: string): Promise<Customer | null>
  findByCpf(cpf: string): Promise<Customer | null>
  findByRg(rg: string): Promise<Customer | null>
  findByPhone(phone: Phone): Promise<Customer | null>
  findByPetId(petId: string): Promise<Customer | null>
  findAll(): Promise<Customer[]>
  findMany(page: number): Promise<{ customers: Customer[]; count: number }>
  findTop10CustomersByMostConsumption(): Promise<Customer[]>
  findTop10CustomersByLessConsumption(): Promise<Customer[]>
  findTop5CustomersByMostSpending(): Promise<Customer[]>
  removeAll(): Promise<void>
  removeMany(customerIds: string[]): Promise<void>
  add(customer: Customer): Promise<void>
  update(customer: Customer): Promise<void>
}
