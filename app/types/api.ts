export interface IProduct {
    id: number
    name: string
    slug: string
    price: number
    images: {
        normal: string
        retina: string
    }[]
    colors: {
        id: number
        name: string
        code: string
    }[]
    chips: IChip[]
}

export interface IChip {
    slug: string
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
