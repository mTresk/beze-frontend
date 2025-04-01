export interface IProduct {
    id: number
    name: string
    slug: string
    sku: string
    price: number
    images: {
        normal: string
        retina: string
    }[]
    colors: IColor[]
    chips: IChip[]
    sizes: ISize[]
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
