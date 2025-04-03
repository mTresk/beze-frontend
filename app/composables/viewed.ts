export function useViewed() {
    const viewedProducts = useState<string[]>('beze-viewed', () => [])

    function updateViewedFromStorage() {
        if (import.meta.client) {
            const storedViewed = localStorage.getItem('beze-viewed')
            viewedProducts.value = storedViewed ? JSON.parse(storedViewed) : []
        }
    }

    function addToViewed(productId: string) {
        viewedProducts.value = viewedProducts.value.filter(id => id !== productId)
        viewedProducts.value = [...viewedProducts.value, productId]

        if (viewedProducts.value.length > 15) {
            viewedProducts.value = viewedProducts.value.slice(1)
        }

        if (import.meta.client) {
            localStorage.setItem('beze-viewed', JSON.stringify(viewedProducts.value))
        }
    }

    function isViewed(productId: string) {
        return computed(() => viewedProducts.value.includes(productId))
    }

    function handleStorageChange(event: StorageEvent) {
        if (event.key === 'beze-viewed' && import.meta.client) {
            updateViewedFromStorage()
        }
    }

    onMounted(() => {
        updateViewedFromStorage()
        window.addEventListener('storage', handleStorageChange)
    })

    onUnmounted(() => {
        window.removeEventListener('storage', handleStorageChange)
    })

    return {
        viewedProducts,
        isViewed,
        addToViewed,
    }
}
