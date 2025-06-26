import type { Pet } from '@pet-lovers/core/entities'
import type { PetDto } from '@pet-lovers/core/dtos'
import type { PaginationResponse } from '@pet-lovers/core/responses'
import type { IApiClient, IPetsService } from '@pet-lovers/core/interfaces'

export const PetsService = (apiClient: IApiClient): IPetsService => {
  return {
    async listPets(page: number) {
      apiClient.setParam('page', page.toString())
      return await apiClient.get<PaginationResponse<PetDto>>('/pets')
    },

    async getAllBreeds() {
      return await apiClient.get<string[]>('/pets/breeds')
    },

    async registerPet(pet: Pet) {
      return await apiClient.post('/pets', pet.dto)
    },

    async updatePet(pet: Partial<PetDto>, petId: string) {
      return await apiClient.put(`/pets/${petId}`, pet)
    },

    async deletePets(petIds: string[]) {
      return await apiClient.delete('/pets', { petsIds: petIds })
    },
  }
}
