import type { SwiperContainer } from 'swiper/element'
import type { Swiper } from 'swiper/types'

export function useSwiper(swiperContainerRef: Ref<SwiperContainer | null>, options?: SwiperContainer['swiper']['params']) {
  const swiper = ref<Swiper>()

  const isBeginning = computed(() => swiper.value?.isBeginning ?? true)
  const isEnd = computed(() => swiper.value?.isEnd ?? false)
  const activeIndex = computed(() => swiper.value?.activeIndex ?? 0)
  const realIndex = computed(() => swiper.value?.realIndex ?? 0)
  const slides = computed(() => swiper.value?.slides ?? [])
  const slidesPerView = computed(() => swiper.value?.slidesPerViewDynamic() ?? 0)
  const progress = computed(() => swiper.value?.progress ?? 0)
  const getNumberOfSlides = computed(() => swiper.value?.slides.length ?? 0)

  const next = (...params: Parameters<SwiperContainer['swiper']['slideNext']>) => {
    if (!swiper.value) {
      return
    }

    if (params.length === 0) {
      swiper.value.slideNext()
    }
    else { swiper.value.slideNext(...params) }
  }

  const to = (...params: Parameters<SwiperContainer['swiper']['slideTo']>) => {
    if (!swiper.value) {
      return
    }

    swiper.value.slideTo(...params)
  }

  const reset = (...params: Parameters<SwiperContainer['swiper']['slideReset']>) => {
    if (!swiper.value) {
      return
    }

    if (params.length === 0) {
      swiper.value.slideReset()
    }
    else { swiper.value.slideReset(...params) }
  }

  const prev = (...params: Parameters<SwiperContainer['swiper']['slidePrev']>) => {
    if (!swiper.value) {
      return
    }

    if (params.length === 0) {
      swiper.value.slidePrev()
    }
    else { swiper.value.slidePrev(...params) }
  }

  const checkSwiperRef = () => {
    const isSwiperContainer = swiperContainerRef.value?.nodeName === 'SWIPER-CONTAINER'

    if (!isSwiperContainer && swiper.value !== null && !options) {
      console.warn(
        '"useSwiper()" requires a ref and is tied to the %c`<swiper-container ref="swiperContainerRef"></swiper-container>` element.',
        'font-weight: bold;',
      )
    }
  }

  const _initialize = () => {
    if (swiperContainerRef.value && options !== undefined) {
      Object.assign(swiperContainerRef.value, options)
      swiperContainerRef.value?.initialize()
    }

    swiper.value = swiperContainerRef?.value?.swiper
  }

  watch(swiper, () => checkSwiperRef())

  onMounted(() => nextTick(() => _initialize()))

  return {
    instance: swiper,
    isBeginning,
    isEnd,
    activeIndex,
    realIndex,
    slides,
    slidesPerView,
    progress,
    getNumberOfSlides,
    next,
    prev,
    to,
    reset,
  }
}
