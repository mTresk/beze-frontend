<script setup lang="ts">
const cursor = useTemplateRef('cursor')
const isVisible = ref(false)

let animationFrame: number | null = null
let lastEvent: MouseEvent | null = null
let targetElements: HTMLElement[] = []

function handleMouseEnter() {
  isVisible.value = true
}

function handleMouseLeave() {
  isVisible.value = false
}

function handleMouseMove(event: MouseEvent) {
  lastEvent = event

  if (animationFrame) {
    return
  }

  animationFrame = requestAnimationFrame(() => {
    if (cursor.value && lastEvent) {
      cursor.value.style.left = `${lastEvent.clientX}px`
      cursor.value.style.top = `${lastEvent.clientY}px`
    }

    animationFrame = null
  })
}

onMounted(() => {
  const elements = document.querySelectorAll<HTMLElement>('[data-js-cursor]')

  if (!elements.length) {
    return
  }

  targetElements = Array.from(elements)

  targetElements.forEach((element) => {
    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)
  })

  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }

  targetElements.forEach((element) => {
    element.removeEventListener('mouseenter', handleMouseEnter)
    element.removeEventListener('mouseleave', handleMouseLeave)
  })

  window.removeEventListener('mousemove', handleMouseMove)

  targetElements = []
})
</script>

<template>
  <div
    ref="cursor"
    class="cursor"
    :class="{ 'cursor--visible': isVisible }"
  >
    <span>Смотреть</span>
    <UiIcon
      name="arrow-down"
      size="10"
    />
  </div>
</template>

<style lang="scss" scoped>
.cursor {
  position: fixed;
  z-index: 9999;
  display: flex;
  visibility: hidden;
  gap: rem(4);
  align-items: center;
  padding: rem(8) rem(16);
  font-size: rem(14);
  color: var(--color-white);
  pointer-events: none;
  background-color: var(--color-extra);
  border-radius: rem(20);
  opacity: 0;
  transform: translate(-50%, -50%);

  svg {
    transform: rotate(-90deg);
  }

  &--visible {
    visibility: visible;
    opacity: 1;
  }
}
</style>
