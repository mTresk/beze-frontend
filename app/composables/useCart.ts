import type { ICartData, ICartItem } from '@/types/api'

let isCartInitialized = false
let isUpdatingCart = false
let previousAuthState: boolean | null = null

export function useCart() {
  const cartItems = useState<ICartItem[]>('cart-items', () => [])
  const cartTotal = useState<number>('cart-total', () => 0)
  const cartId = useState<number | null>('cart-id', () => null)
  const isLoading = useState<boolean>('cart-loading', () => false)

  const client = useSanctumClient()
  const { isAuthenticated } = useSanctumAuth()

  async function fetchCart(force = false) {
    if (isUpdatingCart && !force) {
      return null
    }

    if (isLoading.value && !force) {
      return null
    }

    if (isCartInitialized && !force) {
      return null
    }

    isUpdatingCart = true
    isLoading.value = true

    try {
      const response = await client<ICartData>('/api/cart')

      if (response) {
        cartItems.value = response.items || []
        cartTotal.value = response.total || 0
        cartId.value = response.id || null
        isCartInitialized = true

        return response
      }
      else {
        cartItems.value = []
        cartTotal.value = 0
        cartId.value = null
        isCartInitialized = true

        return null
      }
    }
    catch (error) {
      console.error('Ошибка при загрузке корзины:', error)
      cartItems.value = []
      cartTotal.value = 0
      cartId.value = null
      isCartInitialized = true

      return null
    }
    finally {
      isLoading.value = false
      isUpdatingCart = false
    }
  }

  async function addToCart(variantId: number | null, quantity: number = 1, productId: number) {
    isLoading.value = true
    try {
      if (!productId) {
        useToastify(`Ошибка при добавлении товара в корзину: не указан ID продукта`, { type: 'error' })

        return null
      }

      const productVariantId = variantId && variantId > 0 ? variantId : null

      const response = await client<ICartData>('/api/cart', {
        method: 'post',
        body: {
          product_variant_id: productVariantId,
          product_id: productId,
          quantity,
        },
      })

      if (response) {
        cartItems.value = response.items || []
        cartTotal.value = response.total || 0
        cartId.value = response.id || null
        isCartInitialized = true

        useToastify('Товар добавлен в корзину', { type: 'success' })

        return response
      }
      return null
    }
    catch (error) {
      console.error('Ошибка при добавлении товара в корзину:', error)
      useToastify(`Ошибка при добавлении товара в корзину`, { type: 'error' })

      return null
    }
    finally {
      isLoading.value = false
    }
  }

  async function removeFromCart(cartItemId: number) {
    isLoading.value = true
    try {
      const response = await client<ICartData>(`/api/cart/${cartItemId}`, {
        method: 'delete',
      })

      if (response) {
        cartItems.value = response.items || []
        cartTotal.value = response.total || 0
        cartId.value = response.id || null
        isCartInitialized = true

        useToastify('Товар удален из корзины', { type: 'success' })

        return response
      }
      return null
    }
    catch (error) {
      console.error('Ошибка при удалении товара из корзины:', error)
      useToastify(`Ошибка при удалении товара из корзины`, { type: 'error' })

      return null
    }
    finally {
      isLoading.value = false
    }
  }

  async function updateCartItem(cartItemId: number, quantity: number) {
    if (quantity <= 0) {
      return removeFromCart(cartItemId)
    }

    isLoading.value = true

    try {
      const response = await client<ICartData>(`/api/cart/${cartItemId}`, {
        method: 'put',
        body: { quantity },
      })

      if (response) {
        cartItems.value = response.items || []
        cartTotal.value = response.total || 0
        cartId.value = response.id || null
        isCartInitialized = true

        useToastify('Количество товара обновлено', { type: 'success' })

        return response
      }
      return null
    }
    catch (error) {
      console.error('Ошибка при обновлении товара в корзине:', error)

      return null
    }
    finally {
      isLoading.value = false
    }
  }

  async function clearCartItems() {
    isLoading.value = true

    try {
      await client('/api/cart/clear', { method: 'delete' })
      cartItems.value = []
      cartTotal.value = 0
      cartId.value = null
      isCartInitialized = true

      return true
    }
    catch (error) {
      console.error('Ошибка при очистке корзины:', error)

      return null
    }
    finally {
      isLoading.value = false
    }
  }

  function isProductInCart(variantId: number) {
    return computed(() => cartItems.value?.some(item => item.productVariant.id === variantId) || false)
  }

  async function toggleCartItem(variantId: number | null, quantity: number = 1, productId: number) {
    if (variantId) {
      const item = cartItems.value?.find(item => item.productVariant.id === variantId)

      if (item) {
        return await removeFromCart(item.id)
      }
    }
    else {
      const item = cartItems.value?.find(item => item.product.id === productId)

      if (item) {
        return await removeFromCart(item.id)
      }
    }

    return await addToCart(variantId, quantity, productId)
  }

  watch(isAuthenticated, (newVal) => {
    if (previousAuthState !== null && newVal !== previousAuthState) {
      isCartInitialized = false
      fetchCart(true)
    }

    previousAuthState = newVal
  })

  onMounted(() => {
    previousAuthState = isAuthenticated.value

    if (!isCartInitialized) {
      fetchCart()
    }
  })

  return {
    cartItems: readonly(cartItems),
    cartTotal: readonly(cartTotal),
    cartId: readonly(cartId),
    isLoading: readonly(isLoading),
    fetchCart,
    addToCart,
    removeFromCart,
    updateCartItem,
    toggleCartItem,
    clearCartItems,
    isProductInCart,
  }
}
