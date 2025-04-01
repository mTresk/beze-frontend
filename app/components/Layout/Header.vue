<script setup lang="ts">
import { scrollDirection } from '@/helpers'

onMounted(() => {
    scrollDirection()
})
</script>

<template>
    <header class="header">
        <div class="header__inner">
            <div class="header__body">
                <a href="/" class="header__logo">
                    <img src="/images/logo.svg" alt="Beze exclusive studio" loading="lazy">
                </a>
                <div class="header__menu menu">
                    <nav class="menu__body">
                        <ul class="menu__list">
                            <li class="menu__item">
                                <div class="menu__link">
                                    <span>Для невест</span>
                                    <svg width="10" height="10">
                                        <use href="/images/icons.svg#arrow-down" />
                                    </svg>
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
                                    <svg width="10" height="10">
                                        <use href="/images/icons.svg#arrow-down" />
                                    </svg>
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
                                    <svg width="10" height="10">
                                        <use href="/images/icons.svg#arrow-down" />
                                    </svg>
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
                                    <svg width="10" height="10">
                                        <use href="/images/icons.svg#arrow-down" />
                                    </svg>
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
                        <svg width="30" height="30">
                            <use href="/images/icons.svg#search" />
                        </svg>
                    </button>
                    <a title="Избранное" href="#" class="header__action">
                        <svg width="30" height="30">
                            <use href="/images/icons.svg#favorite" />
                        </svg>
                        <span>3</span>
                    </a>
                    <a title="Корзина" href="#" class="header__action">
                        <svg width="30" height="30">
                            <use href="/images/icons.svg#cart" />
                        </svg>
                        <span>12</span>
                    </a>
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
    // .menu__body
    &__body {
    }

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
        min-width: rem(200);
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
</style>
