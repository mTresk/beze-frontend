export function useCart() {
    const cartItems = useState<{ variantId: string, qty?: number }[]>('beze-cart', () => [])

    function updateCartFromStorage() {
        if (import.meta.client) {
            const storedCart = localStorage.getItem('beze-cart')
            cartItems.value = storedCart ? JSON.parse(storedCart) : []
        }
    }

    function toggleCartItem(variantId: string, qty?: number) {
        const inCart = cartItems.value.some(item => item.variantId === variantId)

        if (inCart) {
            cartItems.value = cartItems.value.filter(item => item.variantId !== variantId)
            useToastify(`Товар удален из корзины`, { type: 'success' })
        }
        else {
            cartItems.value = [...cartItems.value, { variantId, qty }]
            useToastify(`Товар добавлен в корзину`, { type: 'success' })
        }

        if (import.meta.client) {
            localStorage.setItem('beze-cart', JSON.stringify(cartItems.value))
        }
    }

    function updateCartItem(variantId: string, qty: number) {
        const itemIndex = cartItems.value.findIndex(item => item.variantId === variantId)

        if (itemIndex !== -1) {
            cartItems.value[itemIndex]!.qty = qty
        }

        if (import.meta.client) {
            localStorage.setItem('beze-cart', JSON.stringify(cartItems.value))
        }
    }

    function clearCartItems() {
        cartItems.value = []
        if (import.meta.client) {
            localStorage.setItem('beze-cart', '')
        }
    }

    function isInCart(variantId: string) {
        return computed(() => cartItems.value.some(item => item.variantId === variantId))
    }

    function handleStorageChange(event: StorageEvent) {
        if (event.key === 'beze-cart' && import.meta.client) {
            updateCartFromStorage()
        }
    }

    onMounted(() => {
        updateCartFromStorage()
        window.addEventListener('storage', handleStorageChange)
    })

    onUnmounted(() => {
        window.removeEventListener('storage', handleStorageChange)
    })

    return { cartItems, isInCart, toggleCartItem, updateCartItem, clearCartItems }
}
