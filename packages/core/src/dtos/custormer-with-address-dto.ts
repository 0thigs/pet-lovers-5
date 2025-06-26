import type { AddressDto } from './address-dto'
import type { PhoneDto } from './phone-dto'

export type CustomerWithAddressDto = {
  id?: string
  name: string
  socialName: string
  email: string
  address: AddressDto
  phones: PhoneDto[]
}
