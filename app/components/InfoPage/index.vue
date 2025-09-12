<script setup lang="ts">
import type { IBreadcrumbItem } from '@/types/api'

interface ISidebarLink {
  to: string
  title: string
}

interface IProps {
  title: string
  breadcrumbItems: IBreadcrumbItem[]
  sidebarLinks?: ISidebarLink[]
}

defineProps<IProps>()
</script>

<template>
  <section class="info spacer">
    <div class="info__container">
      <LayoutBreadcrumb
        :items="breadcrumbItems"
      />
      <UiPageTitle class="info__title">
        {{ title }}
      </UiPageTitle>
      <div class="info__body">
        <div class="info__content content">
          <slot />
        </div>
        <aside
          v-if="sidebarLinks?.length"
          class="info__sidebar sidebar"
        >
          <p class="sidebar__label">
            Другие материалы
          </p>
          <ul class="sidebar__list">
            <li
              v-for="link in sidebarLinks"
              :key="link.to"
              class="sidebar__item"
            >
              <NuxtLink
                :to="link.to"
                class="sidebar__link"
              >
                {{ link.title }}
              </NuxtLink>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.info {
  &__body {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    @include adaptive-value('gap', 60, 30);

    @media (max-width: $mobile) {
      display: block;
    }
  }

  &__content {
    flex: 0 1 rem(880);
  }

  &__sidebar {
    position: sticky;
    top: rem(100);
    flex: 0 1 rem(300);
  }
}

.sidebar {
  display: grid;
  gap: rem(10);

  @media (max-width: $tablet) {
    display: none;
  }

  &__label {
    line-height: 140%;
    color: rgb(54 54 54 / 60%);
    text-transform: uppercase;

    @include adaptive-value('font-size', 14, 12);
  }

  &__list {
    display: grid;
    gap: rem(10);
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    line-height: 140%;
    text-align: center;
    white-space: nowrap;
    text-decoration: underline;
    text-decoration-thickness: 10%;
    text-decoration-style: dotted;
    text-decoration-skip-ink: none;
    text-underline-offset: rem(3);
    background-color: var(--color-light);
    border-radius: rem(4);
    transition: all 0.3s ease-in-out;

    @include adaptive-value('font-size', 16, 14);
    @include adaptive-value('padding-inline', 20, 16);
    @include adaptive-value('padding-block', 16, 8);

    @media (any-hover: hover) {
      &:hover {
        color: var(--color-white);
        background-color: var(--color-extra);
      }
    }
  }
}
</style>
