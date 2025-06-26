import { useState } from "react";
import { PetType } from "@pet-lovers/core/enums";

export function useMostConsumedProductsAndServicesTableByPetType() {
  const [selectedPetType, setSelectedPetType] = useState<PetType>(PetType.CACHORRO)

  function handlePetTypeChange(value: string) {
    setSelectedPetType(value as PetType)
  }

  return {
    selectedPetType,
    handlePetTypeChange,
  }
}