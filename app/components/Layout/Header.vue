<script setup lang="ts">
const route = useRoute()
const isInnerPage = computed(() => route.path !== '/')

const { favorites } = useFavorites()
const { cartItems } = useCart()

const favoritesCount = computed(() => favorites.value.length)
const cartCount = computed(() => cartItems.value.length)
</script>

<template>
    <header class="header" :class="{ 'header--inner': isInnerPage }">
        <div class="header__inner">
            <div class="header__body">
                <NuxtLink to="/" class="header__logo">
                    <img src="/images/logo.svg" alt="Beze Exclusive Studio" loading="lazy">
                </NuxtLink>
                <div class="header__menu menu">
                    <nav class="menu__body">
                        <ul class="menu__list">
                            <li class="menu__item">
                                <div class="menu__link">
                                    <span>Для невест</span>
                                    <UiIcon name="arrow-down" size="10" />
                                </div>
                                <ul class="menu__sublist">
                                    <li class="menu__subitem">
                                        <a href="#" class="menu__sublink">Халаты и пеньюары</a>
                                    </li>
                                    <li class="menu__subitem">
                                        <a href="#" class="menu__sublink">Пижамы</a>
                                    </li>
                                    <li class="menu__subitem">
                                        <a href="#" class="menu__sublink">Все товары раздела</a>
                                    </li>
                                </ul>
                            </li>
                            <li class="menu__item">
                                <div class="menu__link">
                                    <span>Для дома</span>
                                    <UiIcon name="arrow-down" size="10" />
                                </div>
                                <ul class="menu__sublist">
                                    <li class="menu__subitem">
                                        <a href="#" class="menu__sublink">Костюмы</a>
                                    </li>
                                    <li class="menu__subitem">
                                        <a href="#" class="menu__sublink">Халаты и пеньюары</a>
                                    </li>
                                    <li class="menu__subitem">
                                        <a href="#" class="menu__sublink">Топы, майки, футболки</a>
                                    </li>
                                    <li class="menu__subitem">
                                        <a href="#" class="menu__sublink">Брюки, шорты</a>
                                    </li>
                                    <li class="menu__subitem">
                                        <a href="#" class="menu__sublink">Рубашки</a>
                                    </li>
                                    <li class="menu__subitem">
                                        <a href="#" class="menu__sublink">Все товары раздела</a>
                                    </li>
                                </ul>
                            </li>
                            <li class="menu__item">
                                <div class="menu__link">
                                    <span>Коллекции</span>
                                    <UiIcon name="arrow-down" size="10" />
                                </div>
                                <ul class="menu__sublist">
                                    <li class="menu__subitem">
                                        <a href="#" class="menu__sublink">Утро невесты</a>
                                    </li>
                                    <li class="menu__subitem">
                                        <a href="#" class="menu__sublink">Соблазн</a>
                                    </li>
                                    <li class="menu__subitem">
                                        <a href="#" class="menu__sublink">Для дома</a>
                                    </li>
                                    <li class="menu__subitem">
                                        <a href="#" class="menu__sublink">Отпуск</a>
                                    </li>
                                    <li class="menu__subitem">
                                        <a href="#" class="menu__sublink">Gold</a>
                                    </li>
                                    <li class="menu__subitem">
                                        <a href="#" class="menu__sublink">Cotton</a>
                                    </li>
                                </ul>
                            </li>
                            <li class="menu__item">
                                <div class="menu__link">
                                    <span>Покупателям</span>
                                    <UiIcon name="arrow-down" size="10" />
                                </div>
                                <ul class="menu__sublist">
                                    <li class="menu__subitem">
                                        <a href="#" class="menu__sublink">Оплата и доставка</a>
                                    </li>
                                    <li class="menu__subitem">
                                        <a href="#" class="menu__sublink">Возврат</a>
                                    </li>
                                    <li class="menu__subitem">
                                        <a href="#" class="menu__sublink">Размерная сетка</a>
                                    </li>
                                    <li class="menu__subitem">
                                        <a href="#" class="menu__sublink">Контакты</a>
                                    </li>
                                </ul>
                            </li>
                            <li class="menu__item">
                                <a href="#" class="menu__link">О нас</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="header__actions">
                    <button aria-label="Поиск" type="button" class="header__action">
                        <UiIcon name="search" size="30" />
                    </button>
                    <NuxtLink
                        to="/favorites"
                        class="header__action"
                        :title="`Избранное${favoritesCount ? `: ${favoritesCount} товаров` : ''}`"
                    >
                        <UiIcon name="favorite" size="30" />
                        <Transition>
                            <span v-if="favoritesCount">{{ favoritesCount }}</span>
                        </Transition>
                    </NuxtLink>

                    <NuxtLink
                        to="/cart"
                        class="header__action"
                        :title="`Корзина${cartCount ? `: ${cartCount} товаров` : ''}`"
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

        &:hover {
            .menu__link {
                color: $accentColor;

                svg {
                    transform: rotate(-180deg);
                }
            }

            .menu__sublist {
                visibility: visible;
                pointer-events: auto;
                opacity: 1;
                transform: translateX(0);
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
