import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import { petsService } from '@/api'

export function useMostConsumedProductsAndServicesTableByPetBreed() {
  const [selectedBreed, setSelectedBreed] = useState<string>('')
  const [breeds, setBreeds] = useState<string[]>([])

  function handleBreedChange(value: string) {
    setSelectedBreed(value)
  }

  async function fetchBreeds() {
    const response = await petsService.getAllBreeds()

    if (response.isFailure) {
      toast.error(
        'Não foi possível obter todas as raças, tente novamente mais tarde',
      )
    }

    setBreeds(response.body)
    if (response.body.length > 0) {
      setSelectedBreed(response.body[0])
    }
  }

  useEffect(() => {
    fetchBreeds()
  }, [])

  return {
    selectedBreed,
    breeds,
    handleBreedChange,
  }
} 