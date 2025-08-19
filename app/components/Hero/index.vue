<script setup lang="ts">
const containerRef = ref(null)

const isDesktop = ref(false)

function checkScreenSize() {
  isDesktop.value = window.innerWidth >= 768
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})

useSwiper(containerRef, {
  loop: true,
  speed: 1500,
  autoplay: {
    delay: 5000,
  },
  slidesPerView: 1,
})
</script>

<template>
  <section class="hero">
    <swiper-container
      ref="containerRef"
      class="hero__slider"
      :init="false"
    >
      <swiper-slide class="hero__slide">
        <NuxtImg
          v-if="isDesktop"
          sizes="md:100vw lg:100vw xl:100vw 2xl:100vw"
          quality="95"
          class="hero__image"
          width="1920"
          height="1080"
          src="/images/hero/1.webp"
          alt="Beze Studio"
          fetchpriority="high"
        />
        <NuxtImg
          v-else
          sizes="xs:260px sm:480px md:780px"
          quality="90"
          class="hero__image"
          width="768"
          height="1152"
          src="/images/hero/1-mob.webp"
          alt="Beze Studio"
          fetchpriority="high"
        />
      </swiper-slide>
      <swiper-slide class="hero__slide">
        <NuxtImg
          v-if="isDesktop"
          sizes="md:100vw lg:100vw xl:100vw 2xl:100vw"
          quality="95"
          class="hero__image"
          width="1920"
          height="1080"
          src="/images/hero/2.webp"
          alt="Beze Studio"
          fetchpriority="low"
        />
        <NuxtImg
          v-else
          sizes="xs:260px sm:480px md:780px"
          quality="90"
          class="hero__image"
          width="768"
          height="1152"
          src="/images/hero/2-mob.webp"
          alt="Beze Studio"
          fetchpriority="low"
        />
      </swiper-slide>
      <swiper-slide class="hero__slide">
        <NuxtImg
          v-if="isDesktop"
          sizes="md:100vw lg:100vw xl:100vw 2xl:100vw"
          quality="90"
          class="hero__image"
          width="1920"
          height="1080"
          src="/images/hero/3.webp"
          alt="Beze Studio"
          fetchpriority="low"
        />
        <NuxtImg
          v-else
          sizes="xs:260px sm:480px md:780px"
          quality="90"
          class="hero__image"
          width="768"
          height="1152"
          src="/images/hero/3-mob.webp"
          alt="Beze Studio"
          fetchpriority="low"
        />
      </swiper-slide>
      <swiper-slide class="hero__slide">
        <NuxtImg
          v-if="isDesktop"
          sizes="md:100vw lg:100vw xl:100vw 2xl:100vw"
          quality="95"
          class="hero__image"
          width="1920"
          height="1080"
          src="/images/hero/4.webp"
          alt="Beze Studio"
          fetchpriority="low"
        />
        <NuxtImg
          v-else
          sizes="xs:260px sm:480px md:780px"
          quality="90"
          class="hero__image"
          width="768"
          height="1152"
          src="/images/hero/4-mob.webp"
          alt="Beze Studio"
          fetchpriority="low"
        />
      </swiper-slide>
    </swiper-container>
    <div class="hero__content">
      <div class="hero__container">
        <div class="hero__body">
          <h1 class="hero__title">
            <span>BEZE Studio</span> – <br>ОДЕЖДА, СОЗДАЮЩАЯ <span>ОСОБОЕ</span> НАСТРОЕНИЕ
          </h1>
          <UiButton
            href="/catalog"
            outline
            white
          >
            В каталог
          </UiButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-height: 100svh;
  background-color: var(--color-extra);

  @include adaptive-value('margin-top', -78, -60);

  @media (max-width: $tablet) {
    min-height: calc(100vh - rem(65));
    min-height: calc(100svh - rem(65));
  }

  &__slider {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  &__slide {
    position: relative;
    display: block;
    height: 100%;

    &::before {
      position: absolute;
      inset: 0;
      z-index: 4;
      pointer-events: none;
      content: '';
      background-color: rgb(0 0 0 / 30%);
    }

    &::after {
      position: absolute;
      inset: 0;
      z-index: 5;
      height: rem(200);
      pointer-events: none;
      content: '';
      background: linear-gradient(
        0deg,
        rgb(28 27 26 / 0%),
        rgb(28 27 26 / 0%) 4%,
        rgb(28 27 26 / 1.2%) 12%,
        rgb(28 27 26 / 3.6%) 24%,
        rgb(28 27 26 / 9%) 40%,
        rgb(28 27 26 / 18%) 56%,
        rgb(28 27 26 / 30.6%) 72%,
        rgb(28 27 26 / 60%)
      );
    }
  }

  &__image {
    @include image;
  }

  &__content {
    position: relative;
    z-index: 10;
    padding-block: rem(300);

    @include adaptive-value('padding-block', 300, 100);
  }

  &__body {
    display: grid;
    justify-items: center;

    @include adaptive-value('gap', 50, 26);
  }

  &__title {
    font-family: 'Quincy CF', sans-serif;
    line-height: 150%;
    color: var(--color-white);
    text-align: center;
    letter-spacing: 0.01em;

    @include adaptive-value('font-size', 50, 30);

    span {
      color: var(--color-extra);
    }
  }
}
</style>
