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
    category: ICategory
}

export interface IProductVariant {
    id: number
    sku: string
    price: string
    color: IColor
    size: ISize
    image: IImage
    category: ICategory
    product: {
        id: number
        name: string
        slug: string
        description?: string
        images?: IImage[]
    }
}

export interface IProductWithFeatured {
    data: IProduct
    featured: IProduct[]
}

export interface ICartProduct {
    id: number
    name: string
    slug: string
    description: string
    sku: string
    price: string
    image: IImage
    color: IColor
    size: ISize
    quantity: number
    category: ICategory
}

export interface ICertificate {
    id: number
    name: string
    amount: number
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

export interface ICertificateOrder {
    certificate: ICertificate
    quantity: number
    name: string
    email: string
    phone: string
    address: string
    communication: {
        id: number
        name: string
    }
}

export interface IFeedback {
    name: string
    phone: string
    email?: string
    message?: string
}

export interface ICategory {
    id: number
    name: string
    slug: string
    label?: string
    description?: string
    subcategories: ISubCategory[]
    image: {
        normal: string
        retina: string
    }
}

export interface ISubCategory {
    id: number
    name: string
    slug: string
    label?: string
    description?: string
}

export interface IInfoPage {
    id: number
    name: string
    slug: string
    content: string
}

export interface IInfoPageContent {
    data: IInfoPage
    otherPages: IInfoPage[]
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

export interface IMenuSubcategory {
    name: string
    slug: string
}

export interface IMenuCategory {
    name: string
    slug: string
    subcategories?: IMenuSubcategory[]
}

export interface IMenuItem {
    name: string
    slug?: string
    items?: IMenuItem[]
}

export interface IMenu {
    categories: IMenuCategory[]
    header_menu: IMenuItem[]
    footer_menu: IMenuItem[]
}

export interface ISettings {
    phone: string
    email: string
    address: string
    vk?: string
    telegram?: string
    whatsapp?: string
}

export interface IGallery {
    images: Partial<IImage>[]
}

export interface IReview {
    images: Partial<IImage>[]
}

export interface ICertificate {
    id: number
    name: string
    amount: number
}
