let scrollPosition = 0

export function useScrollLock() {
  const isScrollLocked = useState<boolean>('scrollLocked', () => false)

  const lockScroll = () => {
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop

    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollPosition}px`
    document.body.style.width = '100%'
    document.documentElement.classList.add('lock')

    isScrollLocked.value = true
  }

  const unlockScroll = () => {
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    document.documentElement.classList.remove('lock')

    window.scrollTo(0, scrollPosition)

    isScrollLocked.value = false
  }

  return {
    lockScroll,
    unlockScroll,
    isScrollLocked,
  }
}
