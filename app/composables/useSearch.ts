export function useSearch() {
    const isSearchOpen = useState<boolean>('isSearchOpen', () => false)

    const openSearch = () => {
        isSearchOpen.value = true
    }

    const closeSearch = () => {
        isSearchOpen.value = false
    }

    return {
        isSearchOpen,
        openSearch,
        closeSearch,
    }
}
