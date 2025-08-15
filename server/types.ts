import type { IImage } from '@/types/api'

export interface ProductsRoute {
  name: string
  slug: string
  updatedAt: string
  images: IImage[]
}

export interface CategoriesRoute {
  name: string
  slug: string
  updatedAt: string
  image: IImage
}

export interface SubcategoriesRoute {
  name: string
  slug: string
  updatedAt: string
  category: CategoriesRoute
}
