import { Entity, type Item } from '../abstracts'
import { Cpf } from '../structs/cpf'
import { Phone } from '../structs/phone'
import { Rg } from '../structs/rg'
import type { CustomerDto } from '../../dtos'
import { Pet } from './pet'

export type CustomerProps = {
  name: string
  socialName: string | null
  cpf: Cpf
  rgs: Rg[]
  phones: Phone[]
  pets: Pet[]
  consumption: number
  spending: number
}

export class Customer extends Entity<CustomerProps> {
  static create(dto: CustomerDto): Customer {
    return new Customer(
      {
        name: dto.name,
        socialName: dto.socialName ?? null,
        cpf: Cpf.create(dto.cpf),
        phones: dto.phones?.map(Phone.create),
        rgs: dto.rgs.map(Rg.create),
        pets: dto.pets ? dto.pets.map(Pet.create) : [],
        consumption: dto.consumption ?? 0,
        spending: dto.spending ?? 0,
      },
      dto.id,
    )
  }

  orderItem(item: Item) {
    this.props.spending += item.price
    this.props.consumption += 1
  }

  update(dto: Partial<CustomerDto>): Customer {
    const updatedCustomer = Customer.create({
      ...this.dto,
      ...dto,
    })

    return updatedCustomer
  }

  hasRg(rgValue: string) {
    return this.rgs.find((currentRg) => currentRg.value === rgValue)
  }

  hasPhone(phone: Phone) {
    return this.phones.find((currentPhone) => currentPhone.codeArea === phone.codeArea && currentPhone.number === phone.number)
  }

  public addPet(pet: Pet) {
    this.props.pets.push(pet)
  }

  public updatePet(pet: Pet) {
    const petIndex = this.props.pets.findIndex((currentPet) => currentPet.isEqualTo(pet))
    if (petIndex === -1) return
    this.props.pets[petIndex] = pet
  }

  public deletePet(pet: Pet) {
    const petIndex = this.props.pets.findIndex((currentPet) => currentPet.isEqualTo(pet))
    this.props.pets.splice(petIndex, 1)
  }

  public hasPet(petId: string): boolean {
    return this.props.pets.some((pet) => pet.id === petId)
  }

  set spending(spending: number) {
    this.props.spending = spending
  }

  set consumption(consumption: number) {
    this.props.consumption = consumption
  }

  get consumption(): number {
    return this.props.consumption
  }

  get spending(): number {
    return this.props.spending
  }

  get name(): string {
    return this.props.name
  }

  get socialName(): string | null {
    return this.props.socialName
  }


  get cpf(): Cpf {
    return this.props.cpf
  }

  get rgs(): Rg[] {
    return this.props.rgs ?? []
  }

  get phones(): Phone[] {
    return this.props.phones ?? []
  }

  get phonesList(): string {
    return this.phones.map((phone) => phone.value).join('; ')
  }

  get rgsList(): string {
    return this.rgs.map((rg) => rg.format).join('; ')
  }

  get pets(): Pet[] {
    return this.props.pets ?? []
  }

  get dto(): CustomerDto {
    return {
      id: this.id,
      name: this.name,
      socialName: this.socialName ?? undefined,
      cpf: this.cpf.dto,
      rgs: this.rgs.map((rg) => rg.dto),
      phones: this.phones,
      consumption: this.consumption,
      spending: this.spending,
      pets: this.props.pets.map((pet) => pet.dto),
    }
  }
}
