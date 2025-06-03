import type Lenis from 'lenis'
import type { LenisScrollData } from '@/types/lenis'

export function useScrollState(initialState: false = false) {
    const scrollState = useState<LenisScrollData | false>('scrollState', () => initialState)
    const lenisVS = useState<Lenis | false>('lenisVS', () => initialState)

    const setScrollState = (newScrollState: LenisScrollData | false) => {
        scrollState.value = newScrollState
    }
    const setLenis = (virtualScroll: Lenis | false) => {
        lenisVS.value = virtualScroll
    }

    return {
        scrollState: readonly(scrollState),
        setScrollState,
        setLenis,
    }
}
