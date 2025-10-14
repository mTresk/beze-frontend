<script setup lang="ts">
import type { IUser } from '@/types/api'

const { wishlistProductIds } = useWishlist()
const { cartItems } = useCart()
const { isAuthenticated } = useSanctumAuth()
const user = useSanctumUser<IUser>()

const wishlistCount = computed(() => wishlistProductIds.value?.length || 0)
const cartCount = computed(() => cartItems.value?.length || 0)
</script>

<template>
  <nav class="navigation">
    <ul class="navigation__list">
      <li class="navigation__item">
        <NuxtLink
          class="navigation__link"
          to="/"
          title="Главная"
        >
          <UiIcon
            name="home"
            size="24"
          />
          <span>Главная</span>
        </NuxtLink>
      </li>
      <li class="navigation__item">
        <NuxtLink
          class="navigation__link"
          to="/cart"
          title="Корзина"
        >
          <UiIcon
            name="cart"
            size="24"
          />
          <Transition>
            <span
              v-if="cartCount"
              class="navigation__link-count"
            >{{ cartCount }}</span>
          </Transition>
          <span>Корзина</span>
        </NuxtLink>
      </li>
      <li class="navigation__item">
        <NuxtLink
          class="navigation__link"
          to="/catalog"
          title="Каталог"
        >
          <UiIcon
            name="catalog"
            size="24"
          />
          <span>Каталог</span>
        </NuxtLink>
      </li>
      <li class="navigation__item">
        <NuxtLink
          class="navigation__link"
          to="/favorites"
          title="Вишлист"
        >
          <UiIcon
            name="favorite"
            size="24"
          />
          <Transition>
            <span
              v-if="wishlistCount"
              class="navigation__link-count"
            >{{ wishlistCount }}</span>
          </Transition>
          <span>Вишлист</span>
        </NuxtLink>
      </li>
      <li
        v-if="isAuthenticated"
        class="navigation__item"
      >
        <NuxtLink
          class="navigation__link"
          to="/personal"
          title="Личный кабинет"
        >
          <UiIcon
            name="user"
            size="24"
          />
          <Transition>
            <span
              v-if="user?.name"
              class="navigation__link-count"
            >{{ user?.name.charAt(0) }}</span>
          </Transition>
          <span>Кабинет</span>
        </NuxtLink>
      </li>
      <li
        v-else
        class="navigation__item"
      >
        <NuxtLink
          class="navigation__link"
          to="/auth/login"
          title="Войти"
        >
          <UiIcon
            name="user"
            size="24"
          />
          <span>Кабинет</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.navigation {
  position: sticky;
  bottom: 0;
  z-index: 100;
  display: none;
  align-items: center;
  justify-content: center;
  height: rem(65);
  padding-inline: rem(20);
  background-color: var(--color-white);
  box-shadow: 0 rem(1) rem(12) 0 rgb(38 27 15 / 15%);

  @media (max-width: $tablet) {
    display: flex;
  }

  &__list {
    display: flex;
    gap: rem(20);
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
  }

  &__link {
    position: relative;
    display: grid;
    justify-items: center;
    font-size: rem(14);
    line-height: 140%;

    &-count {
      position: absolute;
      top: rem(-4);
      right: rem(6);
      display: flex;
      align-items: center;
      justify-content: center;
      width: rem(16);
      height: rem(16);
      font-size: rem(12);
      color: var(--color-white);
      background-color: var(--color-accent);
      border-radius: 50%;
    }

    &.router-link-active {
      color: var(--color-accent);
    }
  }
}
</style>
