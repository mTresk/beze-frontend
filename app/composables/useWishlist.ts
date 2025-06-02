import type { IWishlistData, IWishlistItem } from '@/types/api'

let isWishlistInitialized = false
let isUpdatingWishlist = false
let previousAuthState: boolean | null = null

export function useWishlist() {
    const wishlistItems = useState<IWishlistItem[]>('wishlist-items', () => [])
    const wishlistId = useState<number | null>('wishlist-id', () => null)
    const isLoading = useState<boolean>('wishlist-loading', () => false)

    const client = useSanctumClient()
    const { isAuthenticated } = useSanctumAuth()

    const wishlistProductIds = computed(() => {
        return wishlistItems.value.map(item => String(item.product.id))
    })

    async function fetchWishlist(force = false) {
        if (isUpdatingWishlist && !force) {
            return null
        }

        if (isLoading.value && !force) {
            return null
        }

        if (isWishlistInitialized && !force) {
            return null
        }

        isUpdatingWishlist = true
        isLoading.value = true

        try {
            const response = await client<{ wishlist: IWishlistData }>('/api/wishlist')
            if (response && response.wishlist) {
                wishlistItems.value = response.wishlist.items || []
                wishlistId.value = response.wishlist.id || null
                isWishlistInitialized = true
                return response.wishlist
            }
            else {
                wishlistItems.value = []
                wishlistId.value = null
                isWishlistInitialized = true
                return null
            }
        }
        catch (error) {
            console.error('Ошибка при загрузке избранного:', error)
            wishlistItems.value = []
            wishlistId.value = null
            isWishlistInitialized = true
            return null
        }
        finally {
            isLoading.value = false
            isUpdatingWishlist = false
        }
    }

    async function addToWishlist(productId: number) {
        isLoading.value = true
        try {
            if (!productId) {
                useToastify(`Ошибка при добавлении товара в избранное: не указан ID продукта`, { type: 'error' })
                return null
            }

            const response = await client<{ wishlist: IWishlistData, message: string }>('/api/wishlist', {
                method: 'post',
                body: {
                    product_id: productId,
                },
            })

            if (response && response.wishlist) {
                wishlistItems.value = response.wishlist.items || []
                wishlistId.value = response.wishlist.id || null
                isWishlistInitialized = true

                useToastify(response.message, { type: 'success' })
                return response.wishlist
            }
            return null
        }
        catch (error) {
            console.error('Ошибка при добавлении товара в избранное:', error)
            useToastify(`Ошибка при добавлении товара в избранное`, { type: 'error' })
            return null
        }
        finally {
            isLoading.value = false
        }
    }

    async function removeFromWishlist(productId: number) {
        isLoading.value = true
        try {
            const wishlistItem = wishlistItems.value.find(item => item.product.id === productId)

            if (!wishlistItem) {
                return null
            }

            const response = await client<{ wishlist: IWishlistData, message: string }>(`/api/wishlist/${wishlistItem.id}`, {
                method: 'delete',
            })

            if (response && response.wishlist) {
                wishlistItems.value = response.wishlist.items || []
                wishlistId.value = response.wishlist.id || null
                isWishlistInitialized = true

                useToastify(response.message, { type: 'success' })
                return response.wishlist
            }
            return null
        }
        catch (error) {
            console.error('Ошибка при удалении товара из избранного:', error)
            useToastify(`Ошибка при удалении товара из избранного`, { type: 'error' })
            return null
        }
        finally {
            isLoading.value = false
        }
    }

    function isInWishlist(productId: string | number) {
        const id = typeof productId === 'string' ? Number.parseInt(productId) : productId
        return computed(() => wishlistItems.value?.some(item => item.product.id === id) || false)
    }

    async function toggleWishlist(productId: string | number) {
        const id = typeof productId === 'string' ? Number.parseInt(productId) : productId

        const item = wishlistItems.value?.find(item => item.product.id === id)
        if (item) {
            return await removeFromWishlist(id)
        }

        return await addToWishlist(id)
    }

    watch(isAuthenticated, (newVal) => {
        if (previousAuthState !== null && newVal !== previousAuthState) {
            isWishlistInitialized = false
            fetchWishlist(true)
        }
        previousAuthState = newVal
    })

    onMounted(() => {
        previousAuthState = isAuthenticated.value
        if (!isWishlistInitialized) {
            fetchWishlist()
        }
    })

    return {
        wishlistItems: readonly(wishlistItems),
        isLoading: readonly(isLoading),
        fetchWishlist,
        toggleWishlist,
        isInWishlist,
        wishlistProductIds: readonly(wishlistProductIds),
    }
}
