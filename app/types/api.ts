export interface IProduct {
    id: number
    name: string
    slug: string
    description: string
    sku: string
    price: string
    images: IImage[]
    chips: IChip[]
    variants: IProductVariant[]
}

export interface IProductVariant {
    id: number
    sku: string
    price: string
    color: IColor
    size: ISize
    product: {
        id: number
        name: string
        slug: string
        description?: string
        images?: IImage[]
    }
}

export interface ICartProduct {
    id: number
    name: string
    slug: string
    description: string
    sku: string
    price: string
    images: IImage[]
    color: IColor
    size: ISize
    quantity: number
}

export interface IImage {
    normal: string
    retina: string
    original: string
    thumb: string
}

export interface IColor {
    id: number
    name: string
    code: string
}

export interface IChip {
    slug: string
    name: string
}

export interface ISize {
    id: number
    name: string
}

export interface IOrder {
    products: {
        id: number
        quantity: number
    }[]
    name: string
    email: string
    phone: string
    address?: string
    communication?: {
        id: number
        name: string
    }

}

export interface ProductsResponse {
    pageData: IProduct[]
    cursor?: number
}

export interface ApiPaginationMeta {
    current_page: number
    last_page: number
    per_page: number
    total: number
}

export interface ApiResponse<T> {
    data: T
    meta: ApiPaginationMeta
}

export type ValidationErrors = Record<string, string[]>

export interface IApiErrorResponse {
    data?: {
        errors?: ValidationErrors
    }
    response?: {
        status: number
    }
    message: string
}

export interface IUseSubmitOptions<T> {
    onSuccess?: (result: T) => void
    onError?: (error: IApiErrorResponse) => void
}

// Вспомогательные методы для получения уникальных цветов и размеров из вариантов
export function getUniqueColors(variants: IProductVariant[]): IColor[] {
    const uniqueColors = new Map<number, IColor>()
    variants.forEach((variant) => {
        if (!uniqueColors.has(variant.color.id)) {
            uniqueColors.set(variant.color.id, variant.color)
        }
    })
    return Array.from(uniqueColors.values())
}

export function getUniqueSizes(variants: IProductVariant[]): ISize[] {
    const uniqueSizes = new Map<number, ISize>()
    variants.forEach((variant) => {
        if (!uniqueSizes.has(variant.size.id)) {
            uniqueSizes.set(variant.size.id, variant.size)
        }
    })
    return Array.from(uniqueSizes.values())
}
