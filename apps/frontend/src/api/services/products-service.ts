import type { IApiClient, IProductsService } from '@pet-lovers/core/interfaces'
import type { Product } from '@pet-lovers/core/entities'
import type { ProductDto } from '@pet-lovers/core/dtos'
import type { PaginationResponse } from '@pet-lovers/core/responses'

export const ProductsService = (apiClient: IApiClient): IProductsService => {
  return {
    async listProducts(page: number) {
      apiClient.setParam('page', page.toString())
      return await apiClient.get<PaginationResponse<ProductDto>>('/products')
    },

    async registerProduct(Product: Product) {
      return await apiClient.post('/products', Product.dto)
    },

    async updateProduct(product: Product) {
      return await apiClient.put(`/products/${product.id}`, product.dto)
    },

    async deleteProducts(productsIds: string[]) {
      return await apiClient.delete('/products', { productsIds })
    },
  }
}
