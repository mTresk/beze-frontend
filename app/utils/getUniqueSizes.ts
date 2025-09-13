import type { IProductVariant, ISize } from '@/types/api'

export function getUniqueSizes(variants: IProductVariant[]): ISize[] {
  const uniqueSizes = new Map<number, ISize>()

  variants.forEach((variant) => {
    if (!uniqueSizes.has(variant.size.id)) {
      uniqueSizes.set(variant.size.id, variant.size)
    }
  })

  return Array.from(uniqueSizes.values())
}
