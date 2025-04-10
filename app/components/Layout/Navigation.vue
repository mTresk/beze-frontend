<script setup lang="ts">
import type { IUser } from '@/types/api'

const { favorites } = useFavorites()

const { cartItems } = useCart()

const { isAuthenticated } = useSanctumAuth()

const user = useSanctumUser<IUser>()

const favoritesCount = computed(() => favorites.value.length)

const cartCount = computed(() => cartItems.value.length)
</script>

<template>
    <nav class="navigation">
        <ul class="navigation__list">
            <li class="navigation__item">
                <NuxtLink
                    class="navigation__link"
                    to="/catalog"
                    title="Каталог"
                >
                    <UiIcon name="catalog" size="24" />
                    <span>Каталог</span>
                </NuxtLink>
            </li>
            <li class="navigation__item">
                <NuxtLink
                    class="navigation__link"
                    to="/favorites"
                    title="Вишлист"
                >
                    <UiIcon name="favorite" size="24" />
                    <Transition>
                        <span v-if="favoritesCount" class="navigation__link-count">{{ favoritesCount }}</span>
                    </Transition>
                    <span>Вишлист</span>
                </NuxtLink>
            </li>
            <li class="navigation__item">
                <NuxtLink
                    class="navigation__link"
                    to="/"
                    title="Главная"
                >
                    <UiIcon name="home" size="24" />
                    <span>Главная</span>
                </NuxtLink>
            </li>
            <li class="navigation__item">
                <NuxtLink
                    class="navigation__link"
                    to="/cart"
                    title="Корзина"
                >
                    <UiIcon name="cart" size="24" />
                    <Transition>
                        <span v-if="cartCount" class="navigation__link-count">{{ cartCount }}</span>
                    </Transition>
                    <span>Корзина</span>
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
                    <UiIcon name="user" size="24" />
                    <Transition>
                        <span v-if="user?.name" class="navigation__link-count">{{ user?.name.charAt(0) }}</span>
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
                    <UiIcon name="user" size="24" />
                    <span>Кабинет</span>
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss" scoped>
.navigation {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    display: none;
    align-items: center;
    justify-content: center;
    height: rem(65);
    padding-inline: rem(20);
    background-color: $whiteColor;
    box-shadow: 0 1px 12px 0 rgb(38 27 15 / 15%);

    @media (max-width: $tablet) {
        display: flex;
    }

    // .navigation__list
    &__list {
        display: flex;
        gap: rem(20);
        align-items: center;
        justify-content: space-evenly;
        width: 100%;
    }

    // .navigation__link
    &__link {
        position: relative;
        display: grid;
        justify-items: center;
        font-size: rem(14);
        line-height: 140%;

        // .navigation__link-count
        &-count {
            position: absolute;
            top: -4px;
            right: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: rem(16);
            height: rem(16);
            font-size: rem(12);
            color: $whiteColor;
            background-color: $accentColor;
            border-radius: 50%;
        }
    }
}
</style>
