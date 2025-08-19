import type Lenis from 'lenis'

export function useScrollLock() {
  const scrollPosition = ref(0)
  const savedScrollClass = ref('')
  const lenis = useState<Lenis | null>('lenisVS')

  const lockScroll = () => {
    scrollPosition.value = window.pageYOffset || document.documentElement.scrollTop

    const wrapper = document.querySelector('[data-wrapper]')

    if (wrapper) {
      if (wrapper.classList.contains('scroll-up')) {
        savedScrollClass.value = 'scroll-up'
      }
      else if (wrapper.classList.contains('scroll-down')) {
        savedScrollClass.value = 'scroll-down'
      }
      else {
        savedScrollClass.value = ''
      }
    }

    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollPosition.value}px`
    document.body.style.width = '100%'
    document.documentElement.classList.add('lock')

    if (lenis.value) {
      lenis.value.destroy()
    }
  }

  const unlockScroll = () => {
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    document.documentElement.classList.remove('lock')

    window.scrollTo(0, scrollPosition.value)

    if (lenis.value) {
      lenis.value.start()
    }

    const wrapper = document.querySelector('[data-wrapper]')

    if (wrapper && savedScrollClass.value) {
      wrapper.classList.remove('scroll-up', 'scroll-down')
      wrapper.classList.add(savedScrollClass.value)
    }
  }

  return {
    lockScroll,
    unlockScroll,
  }
}
