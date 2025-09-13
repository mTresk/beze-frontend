import type { IColor, IProductVariant } from '@/types/api'

export function getUniqueColors(variants: IProductVariant[]): IColor[] {
  const uniqueColors = new Map<number, IColor>()

  variants.forEach((variant) => {
    if (!uniqueColors.has(variant.color.id)) {
      uniqueColors.set(variant.color.id, variant.color)
    }
  })

  return Array.from(uniqueColors.values())
}
