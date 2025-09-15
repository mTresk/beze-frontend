export function useScrollDirection() {
  const route = useRoute()
  const { isScrollLocked } = useScrollLock()

  const direction = ref<'up' | 'down' | null>(null)

  let lastScroll = 0

  const handleScroll = () => {
    if (isScrollLocked.value) {
      return
    }

    const currentScroll = window.scrollY

    if (currentScroll <= 0) {
      direction.value = null

      return
    }

    if (currentScroll > lastScroll) {
      direction.value = 'down'
    }
    else if (currentScroll < lastScroll) {
      direction.value = 'up'
    }

    lastScroll = currentScroll
  }

  onMounted(() => {
    lastScroll = window.scrollY

    if (lastScroll > 0) {
      direction.value = 'up'
    }

    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  watch(() => route.fullPath, () => {
    lastScroll = 0

    if (!isScrollLocked.value) {
      direction.value = null
    }
  })

  return { direction }
}
