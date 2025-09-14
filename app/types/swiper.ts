import type { SwiperOptions } from 'swiper/types'
import type { DefineComponent, HTMLAttributes, ReservedProps } from 'vue'

interface HTMLBaseProps extends HTMLAttributes, ReservedProps {}

interface SwiperContainerProps extends HTMLBaseProps, Omit<SwiperOptions, 'modules'> {}

interface SwiperSlideProps extends HTMLBaseProps {
  lazy?: boolean
}

declare module 'vue' {
  interface GlobalComponents {
    SwiperContainer: DefineComponent<SwiperContainerProps>
    SwiperSlide: DefineComponent<SwiperSlideProps>
  }
}
