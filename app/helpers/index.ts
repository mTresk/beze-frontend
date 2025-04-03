import type { IColor, IProductVariant, ISize } from '@/types/api'

export function getUniqueColors(variants: IProductVariant[]): IColor[] {
    const uniqueColors = new Map<number, IColor>()
    variants.forEach((variant) => {
        if (!uniqueColors.has(variant.color.id)) {
            uniqueColors.set(variant.color.id, variant.color)
        }
    })
    return Array.from(uniqueColors.values())
}

export function getUniqueSizes(variants: IProductVariant[]): ISize[] {
    const uniqueSizes = new Map<number, ISize>()
    variants.forEach((variant) => {
        if (!uniqueSizes.has(variant.size.id)) {
            uniqueSizes.set(variant.size.id, variant.size)
        }
    })
    return Array.from(uniqueSizes.values())
}
