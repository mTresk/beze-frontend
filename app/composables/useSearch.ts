import type { ISearchResult } from '@/types/api'

export function useSearch() {
  const client = useSanctumClient()
  const isSearchOpen = useState<boolean>('isSearchOpen', () => false)

  const openSearch = () => {
    isSearchOpen.value = true
  }

  const closeSearch = () => {
    isSearchOpen.value = false
  }

  const layoutMap = {
    'q': 'й',
    'w': 'ц',
    'e': 'у',
    'r': 'к',
    't': 'е',
    'y': 'н',
    'u': 'г',
    'i': 'ш',
    'o': 'щ',
    'p': 'з',
    '[': 'х',
    ']': 'ъ',
    'a': 'ф',
    's': 'ы',
    'd': 'в',
    'f': 'а',
    'g': 'п',
    'h': 'р',
    'j': 'о',
    'k': 'л',
    'l': 'д',
    ';': 'ж',
    '\'': 'э',
    'z': 'я',
    'x': 'ч',
    'c': 'с',
    'v': 'м',
    'b': 'и',
    'n': 'т',
    'm': 'ь',
    ',': 'б',
    '.': 'ю',
  }

  const reverseLayoutMap = Object.fromEntries(
    Object.entries(layoutMap).map(([eng, rus]) => [rus, eng]),
  )

  function convertEngToRus(text: string): string {
    return text
      .toLowerCase()
      .split('')
      .map(char => layoutMap[char as keyof typeof layoutMap] || char)
      .join('')
  }

  function convertRusToEng(text: string): string {
    return text
      .toLowerCase()
      .split('')
      .map(char => reverseLayoutMap[char as keyof typeof reverseLayoutMap] || char)
      .join('')
  }

  function getAlternativeQuery(query: string): string {
    const hasRussianChars = /[абвгдежзийклмнопрстуфхцчшщъыьэюя]/i.test(query)

    if (hasRussianChars) {
      return convertRusToEng(query)
    }
    else {
      return convertEngToRus(query)
    }
  }

  async function smartSearch(query: string): Promise<ISearchResult> {
    try {
      const mainResult = await client<ISearchResult>('/api/search', {
        params: { search: query },
      })

      if (!mainResult.products?.length || mainResult.products.length < 3) {
        const alternativeQuery = getAlternativeQuery(query)

        if (alternativeQuery !== query.toLowerCase()) {
          const alternativeResult = await client<ISearchResult>('/api/search', {
            params: { search: alternativeQuery },
          })

          if (alternativeResult.products?.length) {
            const combinedProducts = [
              ...(mainResult.products || []),
              ...alternativeResult.products.filter(altProduct =>
                !mainResult.products?.some(mainProduct => mainProduct.id === altProduct.id),
              ),
            ]

            return {
              ...mainResult,
              products: combinedProducts,
              taps: [
                ...(mainResult.taps || []),
                ...(alternativeResult.taps || []).filter(altTap =>
                  !mainResult.taps?.some(mainTap => mainTap.title === altTap.title),
                ),
              ],
              validQuery: alternativeResult.products.length > (mainResult.products?.length || 0)
                ? alternativeQuery
                : query,
            }
          }
        }
      }

      return {
        ...mainResult,
        validQuery: query,
      }
    }
    catch (error) {
      console.error('Ошибка поиска:', error)

      return {
        products: [],
        taps: [],
        categories: [],
        subcategories: [],
        validQuery: query,
      }
    }
  }

  return {
    isSearchOpen,
    openSearch,
    closeSearch,
    smartSearch,
    getAlternativeQuery,
  }
}
