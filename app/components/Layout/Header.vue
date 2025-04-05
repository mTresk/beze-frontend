<script setup lang="ts">
import type { Menu } from '@/types/api'

const route = useRoute()

const isInnerPage = computed(() => route.path !== '/')

const { favorites } = useFavorites()

const { cartItems } = useCart()

const favoritesCount = computed(() => favorites.value.length)

const cartCount = computed(() => cartItems.value.length)

const menu = useState<Menu>('menu')

const isMenuBlocked = ref(false)

function handleLinkClick() {
    isMenuBlocked.value = true
    setTimeout(() => {
        isMenuBlocked.value = false
    }, 100)
}
</script>

<template>
    <header class="header" :class="{ 'header--inner': isInnerPage }">
        <div class="header__inner">
            <div class="header__body">
                <NuxtLink to="/" class="header__logo">
                    <img src="/images/logo.svg" alt="Beze Exclusive Studio" loading="lazy">
                </NuxtLink>
                <div class="header__menu menu" :class="{ 'menu--blocked': isMenuBlocked }">
                    <nav class="menu__body">
                        <ul class="menu__list">
                            <!-- Категории -->
                            <li
                                v-for="category in menu?.categories"
                                :key="category.slug"
                                class="menu__item"
                            >
                                <NuxtLink
                                    :to="`/catalog/${category.slug}`"
                                    class="menu__link"
                                    @click="handleLinkClick"
                                >
                                    <span>{{ category.name }}</span>
                                    <UiIcon v-if="category.subcategories?.length" name="arrow-down" size="10" />
                                </NuxtLink>
                                <ul v-if="category.subcategories?.length" class="menu__sublist">
                                    <li
                                        v-for="subcategory in category.subcategories"
                                        :key="subcategory.slug"
                                        class="menu__subitem"
                                    >
                                        <NuxtLink
                                            :to="`/catalog/${category.slug}/${subcategory.slug}`"
                                            class="menu__sublink"
                                            @click="handleLinkClick"
                                        >
                                            {{ subcategory.name }}
                                        </NuxtLink>
                                    </li>
                                </ul>
                            </li>
                            <!-- Меню хедера -->
                            <li
                                v-for="item in menu?.header_menu"
                                :key="item.name"
                                class="menu__item"
                            >
                                <template v-if="item.items">
                                    <div class="menu__link">
                                        <span>{{ item.name }}</span>
                                        <UiIcon name="arrow-down" size="10" />
                                    </div>
                                    <ul class="menu__sublist">
                                        <li
                                            v-for="subitem in item.items"
                                            :key="subitem.slug"
                                            class="menu__subitem"
                                        >
                                            <NuxtLink
                                                :to="`/${subitem.slug}`"
                                                class="menu__sublink"
                                                @click="handleLinkClick"
                                            >
                                                {{ subitem.name }}
                                            </NuxtLink>
                                        </li>
                                    </ul>
                                </template>
                                <NuxtLink
                                    v-else
                                    :to="`/${item.slug}`"
                                    class="menu__link"
                                    @click="handleLinkClick"
                                >
                                    {{ item.name }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="header__actions">
                    <button title="Поиск" aria-label="Поиск" type="button" class="header__action">
                        <UiIcon name="search" size="30" />
                    </button>
                    <NuxtLink
                        to="/favorites"
                        class="header__action"
                        title="Избранное"
                    >
                        <UiIcon name="favorite" size="30" />
                        <Transition>
                            <span v-if="favoritesCount">{{ favoritesCount }}</span>
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
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss">
.header {
    position: fixed;
    left: 0;
    z-index: 100;
    width: 100%;
    transition: all 0.5s ease-in-out;

    .scroll-up & {
        background-color: $extraColor;
    }

    .scroll-down & {
        transform: translateY(-100%);
    }

    &--inner {
        background-color: $extraColor;
    }

    // .header__body
    &__body {
        display: grid;
        grid-template-columns: repeat(3, auto);
        align-items: center;
        justify-content: space-between;
        padding-block: rem(20);
    }

    // .header__logo
    &__logo {
        img {
            max-width: rem(135);
            height: auto;
        }
    }

    // .header__actions
    &__actions {
        display: flex;
        gap: rem(30);
        align-items: center;
    }

    // .header__action
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
}

.menu {
    // .menu__list
    &__list {
        display: flex;
        gap: rem(40);
        align-items: center;
    }

    // .menu__item
    &__item {
        position: relative;

        .menu:not(.menu--blocked) &:hover {
            & > .menu__link {
                color: $accentColor;

                svg {
                    transform: rotate(-180deg);
                }
            }

            & > .menu__sublist {
                visibility: visible;
                pointer-events: auto;
                opacity: 1;
                transform: translateY(0);
            }
        }
    }

    // .menu__link
    &__link {
        display: flex;
        gap: rem(8);
        align-items: center;
        font-size: 18px;
        line-height: 125%;
        color: $whiteColor;
        cursor: pointer;
        transition: color 0.3s ease-in-out;

        svg {
            transition: transform 0.3s ease-in-out;
        }
    }

    // .menu__sublist
    &__sublist {
        position: absolute;
        top: calc(100% + rem(10));
        left: 0;
        display: grid;
        visibility: hidden;
        gap: rem(12);
        min-width: rem(220);
        padding: rem(20);
        pointer-events: none;
        background-color: $extraColor;
        border-radius: rem(4);
        box-shadow: 0 0 14px 0 rgb(0 0 0 / 10%);
        opacity: 0;
        transform: translateY(rem(10));
        transition: all 0.3s ease-in-out;

        &::before {
            position: absolute;
            top: rem(-10);
            left: 0;
            width: 100%;
            height: rem(10);
            content: '';
        }
    }

    // .menu__sublink
    &__sublink {
        font-size: 18px;
        line-height: 125%;
        color: $whiteColor;
        transition: color 0.3s ease-in-out;

        @media (any-hover: hover) {
            &:hover {
                color: $accentColor;
            }
        }
    }
}

/*
.menu-icon {
    position: relative;
    z-index: 5;
    display: none;
    display: block;
    width: rem(30);
    height: rem(18);

    @media (any-hover: none) {
        cursor: default;
    }

    span,
    &::before,
    &::after {
        position: absolute;
        right: 0;
        width: 100%;
        height: rem(2);
        content: '';
        background-color: #000;
        border-radius: rem(4);
        transition: all 0.3s ease 0s;
    }

    &::before {
        top: 0;
    }

    &::after {
        bottom: 0;
    }

    span {
        top: calc(50% - rem(1));
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
            transform: rotate(45deg);
        }
    }
}
*/

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
