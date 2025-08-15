<script setup lang="ts">
import { Reviews2GIS, ReviewsSocials } from '#components'

type TabType = 'socials' | '2gis'

const activeTab = ref<TabType>('2gis')

const components = {
  'socials': ReviewsSocials,
  '2gis': Reviews2GIS,
} as const

const currentComponent = computed(() => components[activeTab.value])

function handleTabClick(tabName: TabType) {
  activeTab.value = tabName
}
</script>

<template>
  <section class="reviews spacer">
    <div class="reviews__container">
      <div class="reviews__header">
        <UiTitle class="reviews__title">
          Отзывы клиентов
        </UiTitle>
        <div class="reviews__tabs">
          <UiButton
            class="reviews__tab"
            :class="{ 'reviews__tab--active': activeTab === '2gis' }"
            small
            :outline="activeTab !== '2gis' ? true : undefined"
            tabindex="0"
            @click="handleTabClick('2gis')"
          >
            2ГИС
          </UiButton>
          <UiButton
            class="reviews__tab"
            :class="{ 'reviews__tab--active': activeTab === 'socials' }"
            small
            :outline="activeTab !== 'socials' ? true : undefined"
            tabindex="0"
            @click="handleTabClick('socials')"
          >
            Соцсети
          </UiButton>
        </div>
      </div>
    </div>
    <component :is="currentComponent" />
  </section>
</template>

<style lang="scss">
.reviews {
  &__header {
    display: grid;
    gap: rem(20);

    @include adaptive-value('margin-bottom', 40, 20);
  }

  &__tabs {
    display: flex;
    gap: rem(10);
    align-items: center;
  }

  &__tab {
    &--active {
      pointer-events: none;
    }
  }

  &__body {
    position: relative;
  }

  &__navigation {
    @media (max-width: $tablet) {
      display: none;
    }
  }

  &__button {
    position: absolute;
    top: 50%;
    z-index: 10;
    transform: translateY(-50%);

    &--prev {
      left: rem(-30);
    }

    &--next {
      right: rem(-30);
    }
  }
}

.ps__rail-y {
  width: rem(4) !important;
  background-color: transparent !important;
}

.ps__thumb-y {
  width: rem(4) !important;
  background-color: $accentColor !important;
}
</style>
