import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Pet } from '@pet-lovers/core/entities'
import type { PetDto } from '@pet-lovers/core/dtos'
import { PAGINATION } from '@pet-lovers/core/constants'

import { petsService } from '@/api'

export function usePetsPage() {
  const [pets, setPets] = useState<Pet[]>([])
  const [pagesCount, setPagesCount] = useState(0)
  const [selectedPetsIds, setSelectedPetsIds] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [isFetching, setIsFetching] = useState(true)

  const fetchPets = useCallback(async (page: number) => {
    setIsFetching(true)
    const response = await petsService.listPets(page)

    if (response.isFailure) {
      toast.error('Não foi possível listar pets, tente novamente mais tarde')
      return
    }

    setPets(response.body.items.map(Pet.create))
    setPagesCount(Math.ceil(response.body.itemsCount / PAGINATION.itemsPerPage))
    setPage(page)
    setIsFetching(false)
  }, [])

  async function handlePetsSelectionChange(newSelectedPetsIds: string[]) {
    setSelectedPetsIds(newSelectedPetsIds)
  }

  async function handlePageChange(page: number) {
    await fetchPets(page)
  }

  async function handleDeleteButtonClick() {
    const shouldDelete = confirm(
      selectedPetsIds.length > 1
        ? 'Deseja deletar esses pet\'s?'
        : 'Deseja deletar esse pet?',
    )
    if (!shouldDelete) return

    setIsFetching(true)

    const response = await petsService.deletePets(selectedPetsIds)
    if (response.isFailure) {
      toast.error(response.errorMessage)
    }

    if (response.isSuccess) {
      await fetchPets(1)
      toast.success(
        selectedPetsIds.length > 1
          ? 'Pet\'s deletados com sucessso'
          : 'Pet deletado com sucessso',
      )
    }

    setSelectedPetsIds([])
    setIsFetching(false)
  }

  async function handleRegisterPet(petDto: PetDto) {
    setIsFetching(true)

    const response = await petsService.registerPet(Pet.create(petDto))
    if (response.isFailure) {
      toast.error(response.errorMessage)
    }

    if (response.isSuccess) {
      await fetchPets(1)
      toast.success('Pet criado com sucessso')
    }

    setIsFetching(false)
  }

  async function handleUpdatePet(petDto: PetDto, petId: string) {
    setIsFetching(true)

    const response = await petsService.updatePet(petDto, petId)
    if (response.isFailure) {
      toast.error(response.errorMessage)
    }

    if (response.isSuccess) {
      await fetchPets(1)
      toast.success('Pet atualizado com sucessso')
    }

    setIsFetching(false)
  }


  useEffect(() => {
    fetchPets(1)
  }, [fetchPets])

  return {
    pets,
    isFetching,
    selectedPetsIds,
    page,
    pagesCount,
    handlePageChange,
    handleRegisterPet,
    handleUpdatePet,
    handleDeleteButtonClick,
    handlePetsSelectionChange,
  }
}
