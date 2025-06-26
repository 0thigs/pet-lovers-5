import type { Pet } from '../../domain/entities'
import type { PetDto } from '../../dtos'
import type { ApiResponse, PaginationResponse } from '../../responses'

export interface IPetsService {
  listPets(page: number): Promise<ApiResponse<PaginationResponse<PetDto>>>
  getAllBreeds(): Promise<ApiResponse<string[]>>
  registerPet(pet: Pet): Promise<ApiResponse<void>>
  updatePet(
    pet: Partial<PetDto>,
    petId: string,
  ): Promise<ApiResponse<void>>
  deletePets(petIds: string[]): Promise<ApiResponse<void>>
}
