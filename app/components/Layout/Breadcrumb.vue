<script setup lang="ts">
import type { IBreadcrumbItem } from '@/types/api'

interface IProps {
  items: IBreadcrumbItem[]
}

const props = defineProps<IProps>()

const HOME_CRUMB: IBreadcrumbItem = {
  title: 'Главная',
  link: '/',
}

const breadcrumbs = computed<IBreadcrumbItem[]>(() => [HOME_CRUMB, ...props.items])
</script>

<template>
  <ul
    class="breadcrumb"
    itemscope
    itemtype="https://schema.org/BreadcrumbList"
  >
    <li
      v-for="(item, index) in breadcrumbs"
      :key="index"
      class="breadcrumb__item"
      itemscope
      itemprop="itemListElement"
      itemtype="https://schema.org/ListItem"
    >
      <template v-if="item.link">
        <NuxtLink
          :to="item.link"
          class="breadcrumb__link"
          itemprop="item"
        >
          <span
            class="breadcrumb__text"
            itemprop="name"
          >{{ item.title }}</span>
        </NuxtLink>
        <meta
          itemprop="position"
          :content="String(index + 1)"
        >
      </template>
      <template v-else>
        <span
          class="breadcrumb__text"
          itemprop="name"
        >{{ item.title }}</span>
        <meta
          itemprop="position"
          :content="String(index + 1)"
        >
      </template>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  gap: rem(4) rem(17);
  align-items: center;

  @include adaptive-value('margin-bottom', 30, 16);
  @include adaptive-value('margin-top', 52, 20);

  &__item {
    position: relative;
    line-height: 140%;
    transition: color 0.3s ease-in-out;

    @include adaptive-value('font-size', 16, 14);

    &:not(:last-child) {
      &::before {
        position: absolute;
        right: rem(-10);
        font-size: rem(14);
        line-height: 140%;
        color: var(--color-gray);
        content: '/';
      }
    }

    &:last-child {
      color: var(--color-gray);
      pointer-events: none;
    }
  }

  &__link {
    transition: color 0.3s ease;

    @media (hover: hover) {
      &:hover {
        color: var(--color-accent);
      }
    }
  }
}
</style>
