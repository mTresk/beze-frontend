export function useScrollLock() {
  const scrollPosition = ref(0)
  const isScrollLocked = useState<boolean>('scrollLocked', () => false)

  const lockScroll = () => {
    scrollPosition.value = window.pageYOffset || document.documentElement.scrollTop

    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollPosition.value}px`
    document.body.style.width = '100%'
    document.documentElement.classList.add('lock')

    isScrollLocked.value = true

    nextTick(() => {
      if (typeof window !== 'undefined' && ScrollTrigger) {
        ScrollTrigger.refresh()
      }
    })
  }

  const unlockScroll = () => {
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    document.documentElement.classList.remove('lock')
    window.scrollTo(0, scrollPosition.value)

    isScrollLocked.value = false

    nextTick(() => {
      if (typeof window !== 'undefined' && ScrollTrigger) {
        ScrollTrigger.refresh()
      }
    })
  }

  return {
    lockScroll,
    unlockScroll,
    isScrollLocked,
  }
}
