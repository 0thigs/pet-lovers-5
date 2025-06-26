import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { PetDto } from '@pet-lovers/core/dtos'
import {
  genderSchema,
  nameSchema,
  petTypeSchema,
  idSchema,
} from '@pet-lovers/validation/schemas'
import { PetType } from '@pet-lovers/core/enums'
import { Customer } from '@pet-lovers/core/entities'
import { customersService } from '@/api'

const petSchema = z.object({
  name: nameSchema,
  type: petTypeSchema,
  breed: nameSchema,
  gender: genderSchema,
  customerId: idSchema,
})

type PetFormFields = z.infer<typeof petSchema>

export function usePetForm(
  onSubmit: (petDto: PetDto) => void,
  petDto?: PetDto,
) {
  const { control, formState, register, handleSubmit } = useForm<PetFormFields>({
    defaultValues: {
      name: petDto?.name,
      type: petDto?.type as PetType,
      breed: petDto?.breed,
      gender: (petDto?.gender as 'male' | 'female') ?? 'male',
      customerId: petDto?.customer?.id,
    },
    resolver: zodResolver(petSchema),
  })
  const [customers, setCustomers] = useState<Customer[]>([])

  async function handleFormSubmit(fields: PetFormFields) {
    const petDto: PetDto = {
      name: fields.name,
      type: fields.type,
      breed: fields.breed,
      gender: fields.gender,
      customer: {
        id: fields.customerId,
      }
    }

    onSubmit(petDto)
  }

  async function fetchCustomers() {
    const response = await customersService.getAllCustomers()
    setCustomers(response.body.map(Customer.create))
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  return {
    customers,
    formControl: control,
    formErrors: formState.errors,
    registerField: register,
    handleFormSubmit: handleSubmit(handleFormSubmit),
  }
}
