import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { PAGINATION } from '@pet-lovers/core/constants'
import { Product } from '@pet-lovers/core/entities'

import { reportsService } from '@/api'

export function useMostConsumedProductsTableByPetBreed(petbreed: string) {
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const [pagesCount, setPagesCount] =
    useState(0)
 
  const fetchProducts = useCallback(async (page: number) => {
    const response = await reportsService.listMostConsumedProducts(page, undefined, petbreed)
    
    if (response.isFailure) {
      toast.error(
        'Não foi possível listar clientes masculinos, tente novamente mais tarde',
      )
    }

    setProducts(response.body.items.map(Product.create))
    setPage(page)
    setPagesCount(Math.ceil(response.body.itemsCount / PAGINATION.itemsPerPage))
  }, [petbreed])

  async function handlePageChange(page: number) {
    await fetchProducts(page)
  }

  useEffect(() => {
    if (petbreed) {
      fetchProducts(page)
    }
  }, [fetchProducts, petbreed, page])

  return {
    products,
    page,
    pagesCount,
    handlePageChange,
  }
}
