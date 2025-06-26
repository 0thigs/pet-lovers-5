import { Phone } from '../../domain/structs'
import type { CustomerDto } from '../../dtos'
import type { ICustomersRepository } from '../../interfaces/repositories'

export class UpdateCustomerUseCase {
  constructor(private readonly customersRepository: ICustomersRepository) {}

  async execute(customerDto: Partial<CustomerDto>, customerId: string) {
    const customer = await this.customersRepository.findById(customerId)
    if (!customer) throw new Error('Cliente não encontrado')

    if (customerDto.cpf) {
      const customer = await this.customersRepository.findByCpf(customerDto.cpf.value)
      if (customer) throw new Error(`CPF ${customer.cpf.value} já em uso`)
    }

    if (customerDto.rgs)
      for (const rg of customerDto.rgs) {
        if (customer.hasRg(rg.value)) continue

        const existingCustomer = await this.customersRepository.findByRg(rg.value)
        if (existingCustomer) throw new Error(`RG ${rg.value} já em uso`)
      }

    if (customerDto.phones)
      for (const phoneDto of customerDto.phones) {
        const phone = Phone.create(phoneDto)
        if (customer.hasPhone(phone)) continue

        const existingCustomer = await this.customersRepository.findByPhone(phone)
        if (existingCustomer) throw new Error(`Telefone ${phone.number} já em uso`)
      }

    const updatedCustomer = customer.update(customerDto)
    await this.customersRepository.update(updatedCustomer)
  }
}
