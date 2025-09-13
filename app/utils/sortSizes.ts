import type { ISize } from '@/types/api'

export function sortSizes(sizes: ISize[]): ISize[] {
  const sizeOrder = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL', '4XL', '5XL']

  return [...sizes].sort((a, b) => {
    const aIndex = sizeOrder.indexOf(a.name.toUpperCase())
    const bIndex = sizeOrder.indexOf(b.name.toUpperCase())

    if (aIndex === -1 && bIndex === -1) {
      return 0
    }

    if (aIndex === -1) {
      return 1
    }

    if (bIndex === -1) {
      return -1
    }

    return aIndex - bIndex
  })
}
