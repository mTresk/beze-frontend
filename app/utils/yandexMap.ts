export function yandexMap(mapRoot: HTMLElement) {
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
    if (!mapRoot) {
      return
    }

    const ymaps3: any = await loadYMaps()

    await ymaps3.ready

    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3
    const coordinates = mapRoot!.getAttribute('data-coordinates')
    const center = coordinates!.split(',').reverse()

    const layer = new YMapDefaultSchemeLayer({
      customization: [
        {
          tags: {
            any: ['road'],
          },
          elements: 'geometry',
          stylers: [
            {
              color: '#e8e8e8',
            },
          ],
        },
        {
          tags: {
            any: ['water'],
          },
          elements: 'geometry',
          stylers: [
            {
              color: '#e0e0e0',
            },
          ],
        },
        {
          tags: {
            any: ['landscape', 'admin', 'land', 'transit'],
          },
          elements: 'geometry',
          stylers: [
            {
              color: '#d0d0d0',
            },
          ],
        },
        {
          tags: {
            any: ['building'],
          },
          elements: 'geometry',
          stylers: [
            {
              color: '#e5e5e5',
            },
          ],
        },
      ],
    })

    const map = new YMap(mapRoot, {
      location: {
        center,
        zoom: 17,
      },
      showScaleInCopyrights: false,
    })

    const markerElement = document.createElement('img')
    markerElement.className = 'icon-marker'
    markerElement.src = 'images/pin.svg'
    const marker = new YMapMarker({ coordinates: center }, markerElement)

    map.addChild(new YMapDefaultFeaturesLayer())
    map.addChild(layer)
    map.addChild(marker)
    map.setBehaviors(['drag', 'pinchZoom', 'mouseRotate', 'mouseTilt'])
  }

  initMap()
}
