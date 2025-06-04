<script setup lang="ts">
import type Lenis from 'lenis'
import type { IMenu, ISettings, IUser } from '@/types/api'

const route = useRoute()

const { wishlistProductIds } = useWishlist()

const { cartItems } = useCart()

const { openSearch } = useSearch()

const { isAuthenticated } = useSanctumAuth()

const user = useSanctumUser<IUser>()

const lenis = useState<Lenis | null>('lenisVS')

const menu = useState<IMenu>('menu')

const settings = useState<ISettings>('settings')

const isInnerPage = computed(() => route.path !== '/' && route.path !== '/about')

const wishlistCount = computed(() => wishlistProductIds.value?.length || 0)

const cartCount = computed(() => cartItems.value?.length || 0)

const formattedPhone = computed(() => settings?.value?.phone?.replace(/\s+/g, ''))

const isMenuBlocked = ref(false)

const isMenuOpen = ref(false)

function handleBlockMenu() {
    isMenuBlocked.value = true
    setTimeout(() => {
        isMenuBlocked.value = false
    }, 100)
}

function handleSearchClick() {
    openSearch()

    if (lenis.value) {
        lenis.value.destroy()
    }

    document.documentElement.classList.add('lock')
}

function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value

    if (lenis.value) {
        lenis.value.destroy()
    }

    if (isMenuOpen.value) {
        document.documentElement.classList.add('menu-open')
        document.documentElement.classList.add('lock')
    }
    else {
        document.documentElement.classList.remove('menu-open')
        document.documentElement.classList.remove('lock')
    }
}
</script>

<template>
    <header class="header" :class="{ 'header--inner': isInnerPage }">
        <div class="header__inner">
            <div class="header__body">
                <NuxtLink to="/" class="header__logo">
                    <NuxtImg width="135" height="38" src="/images/logo.svg" alt="Beze Studio" loading="lazy" />
                </NuxtLink>
                <LayoutMenu
                    :menu="menu"
                    :settings="settings"
                    :is-menu-blocked="isMenuBlocked"
                    :formatted-phone="formattedPhone"
                    @block-menu="handleBlockMenu"
                    @toggle-menu="toggleMenu"
                />
                <div class="header__actions">
                    <button
                        title="Поиск"
                        aria-label="Поиск"
                        type="button"
                        class="header__action"
                        @click="handleSearchClick"
                    >
                        <UiIcon name="search" size="30" />
                    </button>
                    <NuxtLink
                        to="/favorites"
                        class="header__action"
                        title="Вишлист"
                    >
                        <UiIcon name="favorite" size="30" />
                        <Transition>
                            <span v-if="wishlistCount">{{ wishlistCount }}</span>
                        </Transition>
                    </NuxtLink>

                    <NuxtLink
                        to="/cart"
                        class="header__action"
                        title="Корзина"
                    >
                        <UiIcon name="cart" size="30" />
                        <Transition>
                            <span v-if="cartCount">{{ cartCount }}</span>
                        </Transition>
                    </NuxtLink>
                    <NuxtLink
                        v-if="!isAuthenticated"
                        to="/auth/login"
                        class="header__action"
                        title="Войти"
                    >
                        <UiIcon name="user" size="30" />
                    </NuxtLink>
                    <NuxtLink
                        v-else
                        to="/personal"
                        class="header__action"
                        title="Личный кабинет"
                    >
                        <UiIcon name="user" size="30" />
                        <Transition>
                            <span v-if="user?.name">{{ user?.name.charAt(0).toUpperCase() }}</span>
                        </Transition>
                    </NuxtLink>
                </div>
                <div class="header__mobile-actions">
                    <div class="header__search">
                        <button
                            title="Поиск"
                            aria-label="Поиск"
                            type="button"
                            class="header__action"
                            @click="handleSearchClick"
                        >
                            <UiIcon name="search" size="30" />
                        </button>
                    </div>
                    <button
                        aria-label="Меню"
                        type="button"
                        class="header__button"
                        @click="toggleMenu"
                    >
                        <span class="menu-icon"><span /></span>
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss">
.header {
    position: fixed;
    left: 0;
    z-index: 200;
    width: 100%;
    transition: all 0.5s ease-in-out;

    .scroll-up & {
        background-color: $extraColor;
    }

    .scroll-down & {
        transform: translateY(-100%);
    }

    &::before {
        position: absolute;
        z-index: 5;
        visibility: hidden;
        width: 100%;
        height: 100%;
        content: '';
        background-color: $extraColor;
        opacity: 0;

        .menu-open & {
            visibility: visible;
            opacity: 1;
        }
    }

    &--inner {
        background-color: $extraColor;
    }

    &__body {
        display: grid;
        grid-template-columns: repeat(3, auto);
        gap: rem(30);
        align-items: center;
        justify-content: space-between;

        @include adaptive-value('padding-block', 20, 15);

        @media (max-width: $tablet) {
            display: flex;
        }
    }

    &__logo {
        position: relative;
        z-index: 10;

        img {
            height: auto;

            @include adaptive-value('max-width', 135, 100);
        }
    }

    &__actions {
        display: flex;
        align-items: center;

        @include adaptive-value('gap', 25, 15, 0, 1920, 992);

        @media (max-width: $tablet) {
            display: none;
        }
    }

    &__search {
        display: none;

        @media (max-width: $tablet) {
            display: flex;
        }
    }

    &__action {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $whiteColor;
        transition: color 0.3s ease-in-out;

        @media (any-hover: hover) {
            &:hover {
                color: $accentColor;
            }
        }

        span {
            position: absolute;
            top: -5px;
            right: -5px;
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

    &__mobile-actions {
        display: none;

        @media (max-width: $tablet) {
            display: flex;
            gap: rem(16);
            align-items: center;
        }
    }

    &__button {
        display: none;

        @media (max-width: $tablet) {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}

.menu-icon {
    position: relative;
    z-index: 5;
    display: none;
    display: block;
    width: rem(24);
    height: rem(16);

    @media (any-hover: none) {
        cursor: default;
    }

    span,
    &::before,
    &::after {
        position: absolute;
        right: 0;
        width: 100%;
        height: rem(1);
        content: '';
        background-color: $whiteColor;
        border-radius: rem(4);
        transition: all 0.3s ease 0s;
    }

    &::before {
        top: 0;
    }

    &::after {
        bottom: 0;
        width: 50%;
    }

    span {
        top: calc(50% - rem(1));
        width: 75%;
    }

    .menu-open & {
        span {
            width: 0;
        }

        &::before {
            top: calc(50% - rem(1));
            transform: rotate(-45deg);
        }

        &::after {
            bottom: calc(50% - rem(1));
            width: 100%;
            transform: rotate(45deg);
        }
    }
}

.v-enter-active {
    transition: transform 0.2s ease;
    animation: bounce-in 0.5s;
}

.v-leave-to {
    animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    40% {
        transform: scale(1.3);
    }

    60% {
        transform: scale(1);
    }
}
</style>
