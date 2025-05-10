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
    stock: number
    color: IColor
    size: ISize
    image: IImage
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
    disabled?: boolean
}

export interface IOrder {
    id?: number
    status?: string
    total?: number
    products: {
        id: number
        quantity: number
    }[]
    name: string
    surname: string
    email: string
    phone: string
    communication?: {
        id: number
        name: string
    }
    deliveryType: 'pickup' | 'tyumen' | 'russia'
    deliveryAddress?: string
    deliveryCost?: number
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
    products?: IProduct[]
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

export interface ISearchResult {
    products: IProduct[]
    categories: ICategory[]
    subcategories: ISubCategory[]
    taps: {
        title: string
        relatedSearch: string
    }[]
}

export interface IUser {
    name: string
    surname: string
    email?: string
    id?: number
    verified: boolean
    isPartial: boolean
    profile?: {
        id: number
        userId: number
        phone: string
        address: string
        communication?: string
    }
}

export interface ILoginCredentials {
    email: string
    password: string
}

export interface IRegisterCredentials {
    name: string
    email: string
    password: string
    password_confirmation: string
}

export interface ICompleteRegistrationCredentials {
    email: string
    password: string
    password_confirmation: string
    token: string
}

export interface IResetPasswordCredentials {
    email: string
    password: string
    password_confirmation: string
    token: string
}

export interface ICartItem {
    readonly id: number
    readonly product_id: number
    readonly product_variant_id: number
    readonly quantity: number
    readonly price: number
    readonly subtotal: number
    readonly product: {
        readonly id: number
        readonly name: string
        readonly slug: string
        readonly description: string
        readonly sku: string
        readonly price: string
        readonly images: readonly {
            readonly normal: string
            readonly retina: string
            readonly original: string
            readonly thumb: string
        }[]
        readonly variants: readonly {
            readonly id: number
            readonly sku: string
            readonly price: string
            readonly stock: number
            readonly color: { readonly id: number, readonly name: string, readonly code: string }
            readonly size: { readonly id: number, readonly name: string }
        }[]
    }
    readonly productVariant: {
        readonly id: number
        readonly sku: string
        readonly price: number
    }
}

export interface ICartData {
    id: number
    total: number
    items: ICartItem[]
}

export interface IWishlistItem {
    id: number
    product: IProduct
}

export interface IWishlistData {
    id: number
    items: IWishlistItem[]
}

export interface IOrderResponse {
    id: number
    status: {
        value: string
        label: string
    }
    total: number
    createdAt: string
    updatedAt: string
    items: IOrderItem[]
    user: IUser
    deliveryCost?: number
    deliveryType?: string
}

export interface IOrderItem {
    id: number
    variantId: number
    sku: string
    price: string
    color: IColor
    size: ISize
    quantity: number
    product: Partial<IProduct>
}

export interface CDEKWidgetOptions {
    root: string | HTMLElement
    apiKey: string
    servicePath: string
    defaultLocation: string
    popup: boolean
    lang: string
    from: string
    currency?: string
    goods?: Array<{ width: number, height: number, length: number, weight: number }>
    tariffs?: { office: number[], door: number[] }
    onChoose?: (type: string, tariff: CdekTariff, point: CdekPoint) => void
    onReady?: () => void
}

export interface CdekTariff {
    tariff_code: number
    tariff_name: string
    tariff_description: string
    delivery_mode: number
    delivery_sum: number
    period_min: number
    period_max: number
    calendar_min: number
    calendar_max: number
    delivery_date_range: {
        min: string
        max: string
    }
}

export interface CdekPoint {
    city_code: number
    city: string
    type: string
    postal_code: string
    country_code: string
    region: string
    have_cashless: boolean
    have_cash: boolean
    allowed_cod: boolean
    is_dressing_room: boolean
    code: string
    name: string
    address: string
    work_time: string
    location: [number, number]
    weight_min: number
    weight_max: number
    dimensions: null | any
}
