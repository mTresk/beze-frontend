export function useFavorites() {
    const favorites = useState<string[]>('beze-favorites', () => [])

    function updateFavoritesFromStorage() {
        if (import.meta.client) {
            const storedFavorites = localStorage.getItem('beze-favorites')
            favorites.value = storedFavorites ? JSON.parse(storedFavorites) : []
        }
    }

    function toggleFavorite(productId: string, productName: string) {
        const isFav = favorites.value.includes(productId)

        if (isFav) {
            favorites.value = favorites.value.filter(id => id !== productId)
            useToastify(`${productName} удален из избранного`, { type: 'success' })
        }
        else {
            favorites.value = [...favorites.value, productId]
            useToastify(`${productName} добавлен в избранное`, { type: 'success' })
        }

        if (import.meta.client) {
            localStorage.setItem('beze-favorites', JSON.stringify(favorites.value))
        }
    }

    function isFavorite(productId: string) {
        return computed(() => favorites.value.includes(productId))
    }

    function handleStorageChange(event: StorageEvent) {
        if (event.key === 'beze-favorites' && import.meta.client) {
            updateFavoritesFromStorage()
        }
    }

    onMounted(() => {
        updateFavoritesFromStorage()
        window.addEventListener('storage', handleStorageChange)
    })

    onUnmounted(() => {
        window.removeEventListener('storage', handleStorageChange)
    })

    return { favorites, isFavorite, toggleFavorite }
}
