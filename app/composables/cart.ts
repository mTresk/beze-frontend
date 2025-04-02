export function useCart() {
    const cartItems = useState<{ productId: string, colorId: string, sizeId: string, qty?: number }[]>('beze-cart', () => [])

    function updateCartFromStorage() {
        if (import.meta.client) {
            const storedCart = localStorage.getItem('beze-cart')
            cartItems.value = storedCart ? JSON.parse(storedCart) : []
        }
    }

    function toggleCartItem(productId: string, productName: string, colorId: string, colorName: string, sizeId: string, sizeName: string, qty?: number) {
        const inCart = cartItems.value.some(item => item.productId === productId && item.colorId === colorId && item.sizeId === sizeId)

        if (inCart) {
            cartItems.value = cartItems.value.filter(item => !(item.productId === productId && item.colorId === colorId && item.sizeId === sizeId))
            useToastify(`${productName} (${colorName}, размер ${sizeName}) удален из корзины`, { type: 'success' })
        }
        else {
            cartItems.value = [...cartItems.value, { productId, colorId, sizeId, qty }]
            useToastify(`${productName} (${colorName}, размер ${sizeName}) добавлен в корзину`, { type: 'success' })
        }

        if (import.meta.client) {
            localStorage.setItem('beze-cart', JSON.stringify(cartItems.value))
        }
    }

    function updateCartItem(productId: string, colorId: string, sizeId: string, qty: number) {
        const itemIndex = cartItems.value.findIndex(item => item.productId === productId && item.colorId === colorId && item.sizeId === sizeId)

        if (itemIndex !== -1) {
            cartItems.value[itemIndex]!.qty = qty
        }

        if (import.meta.client) {
            localStorage.setItem('beze-cart', JSON.stringify(cartItems.value))
        }
    }

    function clearCartItems() {
        if (import.meta.client) {
            localStorage.setItem('beze-cart', '')
        }
    }

    function isInCart(productId: string, colorId: string, sizeId: string) {
        return computed(() =>
            cartItems.value.some(item => item.productId === productId && item.colorId === colorId && item.sizeId === sizeId),
        )
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
