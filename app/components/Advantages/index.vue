<script setup>
const advantages = useTemplateRef('advantages')
const scrollProgress = ref(0)
const isDesktop = ref(false)

onMounted(() => {
  const updateDesktop = () => {
    isDesktop.value = window.innerWidth >= 992
  }

  const handleScroll = () => {
    if (!isDesktop.value) {
      return
    }

    if (!advantages.value) {
      return
    }

    const rect = advantages.value.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const startPoint = windowHeight
    const endPoint = windowHeight * 0.3
    const progress = Math.max(0, Math.min(1, (startPoint - rect.top) / (startPoint - endPoint)))

    scrollProgress.value = progress
  }

  let ticking = false

  const throttledScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll()
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener('scroll', throttledScroll, { passive: true })
  window.addEventListener('resize', () => {
    updateDesktop()
    handleScroll()
  }, { passive: true })

  updateDesktop()
  handleScroll()

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', throttledScroll)
    window.removeEventListener('resize', updateDesktop)
  })
})
</script>

<template>
  <div
    ref="advantages"
    class="advantages"
  >
    <div class="advantages__container">
      <div class="advantages__body">
        <div
          class="advantages__item"
          :style="{
            transform: isDesktop ? `translateY(${140 * (1 - scrollProgress)}px)` : undefined,
          }"
        >
          <div class="advantages__icon">
            <svg
              width="80"
              height="80"
            >
              <use href="/images/icons.svg#advantage-1" />
            </svg>
          </div>
          <p class="advantages__text">
            Собственное <br>производство
          </p>
        </div>
        <div
          class="advantages__item"
          :style="{
            transform: isDesktop ? `translateY(${200 * (1 - scrollProgress)}px)` : undefined,
          }"
        >
          <div class="advantages__icon">
            <svg
              width="80"
              height="80"
            >
              <use href="/images/icons.svg#advantage-2" />
            </svg>
          </div>
          <p class="advantages__text">
            Размерный ряд <br>от 40 до 60 размера
          </p>
        </div>
        <div
          class="advantages__item"
          :style="{
            transform: isDesktop ? `translateY(${260 * (1 - scrollProgress)}px)` : undefined,
          }"
        >
          <div class="advantages__icon">
            <svg
              width="80"
              height="80"
            >
              <use href="/images/icons.svg#advantage-3" />
            </svg>
          </div>
          <p class="advantages__text">
            Идеальная <br>посадка
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.advantages {
  position: relative;
  z-index: 10;
  transform: translateY(rem(-70));

  @include adaptive-value('margin-bottom', 120, 80);

  @media (max-width: $tablet) {
    margin-top: rem(60);
    transform: none;
  }

  &__body {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: rem(54);

    @include adaptive-value('gap', 54, 10);

    @media (max-width: $tablet) {
      grid-template-columns: 1fr;
    }
  }

  &__item {
    position: relative;
    display: flex;
    align-items: center;
    background: rgb(255 255 255 / 40%);
    border: rem(1) solid rgb(222 206 190 / 25%);
    backdrop-filter: blur(rem(6));

    @include adaptive-value('padding-block', 28, 18);
    @include adaptive-value('padding-inline', 16, 10);
    @include adaptive-value('gap', 30, 20);

    @media (width >= 62rem) {
      transform: translateY(rem(140));
    }

    &::before {
      position: absolute;
      bottom: rem(-30);
      left: 50%;
      z-index: -1;
      width: 80%;
      height: 50%;
      content: '';
      background: rgb(46 46 46 / 16%);
      border-radius: rem(10);
      filter: blur(rem(50));
      transform: translateX(-50%) translateZ(0);
    }

    @media (max-width: $tablet) {
      background-color: var(--color-light);
    }
  }

  &__icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    color: var(--color-accent);

    @include adaptive-value('width', 80, 40);
    @include adaptive-value('height', 80, 40);
  }

  &__text {
    line-height: 125%;

    @include adaptive-value('font-size', 22, 18);

    @media (max-width: $tablet) {
      br {
        display: none;
      }
    }
  }
}
</style>
