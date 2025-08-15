import type { IWishlistData, IWishlistItem } from '@/types/api'

let isWishlistInitialized = false
let isUpdatingWishlist = false
let previousAuthState: boolean | null = null

export function useWishlist() {
  const wishlistItems = useState<IWishlistItem[]>('wishlist-items', () => [])
  const wishlistId = useState<number | null>('wishlist-id', () => null)
  const isLoading = useState<boolean>('wishlist-loading', () => false)
  const isOperating = useState<boolean>('wishlist-operating', () => false)

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
      const response = await client<IWishlistData>('/api/wishlist')

      if (response) {
        wishlistItems.value = response.items || []
        wishlistId.value = response.id || null
        isWishlistInitialized = true

        return response
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
    isOperating.value = true
    try {
      if (!productId) {
        useToastify(`Ошибка при добавлении товара в избранное: не указан ID продукта`, { type: 'error' })

        return null
      }

      const response = await client<IWishlistData>('/api/wishlist', {
        method: 'post',
        body: {
          product_id: productId,
        },
      })

      if (response) {
        wishlistItems.value = response.items || []
        wishlistId.value = response.id || null
        isWishlistInitialized = true

        useToastify('Товар добавлен в вишлист', { type: 'success' })

        return response
      }

      return null
    }
    catch (error) {
      console.error('Ошибка при добавлении товара в избранное:', error)
      useToastify(`Ошибка при добавлении товара в избранное`, { type: 'error' })

      return null
    }
    finally {
      isOperating.value = false
    }
  }

  async function removeFromWishlist(productId: number) {
    const wishlistItem = wishlistItems.value.find(item => item.product.id === productId)

    if (!wishlistItem) {
      return null
    }

    const originalItems = [...wishlistItems.value]
    wishlistItems.value = wishlistItems.value.filter(item => item.product.id !== productId)

    isOperating.value = true

    try {
      const response = await client<IWishlistData>(`/api/wishlist/${wishlistItem.id}`, {
        method: 'delete',
      })

      if (response) {
        wishlistItems.value = response.items || []
        wishlistId.value = response.id || null
        isWishlistInitialized = true

        useToastify('Товар удален из вишлиста', { type: 'success' })

        return response
      }

      return null
    }
    catch (error) {
      wishlistItems.value = originalItems
      console.error('Ошибка при удалении товара из избранного:', error)
      useToastify(`Ошибка при удалении товара из избранного`, { type: 'error' })

      return null
    }
    finally {
      isOperating.value = false
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
    isOperating: readonly(isOperating),
    fetchWishlist,
    toggleWishlist,
    isInWishlist,
    wishlistProductIds: readonly(wishlistProductIds),
  }
}
