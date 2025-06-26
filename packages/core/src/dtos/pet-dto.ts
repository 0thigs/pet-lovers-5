export type PetDto = {
  id?: string
  name: string
  type: string
  breed: string
  gender: string
  customer?: {
    id: string
    name?: string
    cpf?: string
  }
}
