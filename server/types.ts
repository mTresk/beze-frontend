import type { IImage } from '@/types/api'

export interface PageRoute {
    name: string
    slug: string
    updatedAt: string
    images: IImage[]
}
