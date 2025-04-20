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

export function yandexMap(mapRoot: HTMLElement) {
    // Загружаем API Яндекс Карт
    function loadYMaps() {
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line ts/ban-ts-comment
            // @ts-expect-error
            if (window.ymaps3) {
                // eslint-disable-next-line ts/ban-ts-comment
                // @ts-expect-error
                resolve(window.ymaps3)
                return
            }

            const script = document.createElement('script')
            script.src = `https://api-maps.yandex.ru/v3/?apikey=${useRuntimeConfig().public.yandexMapsApiKey}&lang=ru_RU`
            script.onload = () => {
                // eslint-disable-next-line ts/ban-ts-comment
                // @ts-expect-error
                resolve(window.ymaps3)
            }
            script.onerror = () => reject(new Error('Failed to load Yandex Maps API'))
            document.body.appendChild(script)
        })
    }

    async function initMap() {
        if (!mapRoot)
            return
        const ymaps3: any = await loadYMaps()
        await ymaps3.ready
        const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3

        // Координаты центра
        const coordinates = mapRoot!.getAttribute('data-coordinates')
        const center = coordinates!.split(',').reverse()

        // Создаем слой
        const layer = new YMapDefaultSchemeLayer({
            customization: [],
        })

        // Создаем карту
        const map = new YMap(mapRoot, {
            location: {
                center,
                zoom: 17,
            },
            showScaleInCopyrights: false,
        })

        // Создаем маркер
        const markerElement = document.createElement('img')
        markerElement.className = 'icon-marker'
        markerElement.src = 'images/pin.svg'
        const marker = new YMapMarker({ coordinates: center }, markerElement)

        // Добавляем элементы на карту
        map.addChild(new YMapDefaultFeaturesLayer())
        map.addChild(layer)
        map.addChild(marker)
        map.setBehaviors(['drag', 'pinchZoom', 'mouseRotate', 'mouseTilt'])
    }

    initMap()
}

export function formatDate(dateStr: string) {
    const date = new Date(dateStr)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${day}.${month}.${year} ${hours}:${minutes}`
}

export function sortSizes(sizes: ISize[]): ISize[] {
    const sizeOrder = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL', '4XL', '5XL']

    return [...sizes].sort((a, b) => {
        const aIndex = sizeOrder.indexOf(a.name.toUpperCase())
        const bIndex = sizeOrder.indexOf(b.name.toUpperCase())

        // Если размер не найден в sizeOrder, поместить его в конец
        if (aIndex === -1 && bIndex === -1)
            return 0
        if (aIndex === -1)
            return 1
        if (bIndex === -1)
            return -1

        return aIndex - bIndex
    })
}
