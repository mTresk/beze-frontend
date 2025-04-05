<script setup lang="ts">
import type { IMenu, ISettings } from '@/types/api'

const currentYear = new Date().getFullYear()

const menu = useState<IMenu>('menu')

const settings = useState<ISettings>('settings')

const formattedPhone = computed(() => settings?.value?.phone?.replace(/\s+/g, ''))
</script>

<template>
    <div class="footer">
        <div class="footer__container">
            <div class="footer__body">
                <div class="footer__info">
                    <NuxtLink to="/" class="footer__logo">
                        <img src="/images/logo.svg" alt="Beze Exclusive Studio" loading="lazy">
                    </NuxtLink>
                    <div class="footer__copyright">
                        © {{ currentYear }} Beze exclusive studio <br>
                        Все права защищены
                    </div>
                </div>
                <div class="footer__blocks">
                    <!-- Блок "Магазин" -->
                    <div class="footer__block">
                        <h4 class="footer__label">
                            Магазин
                        </h4>
                        <div class="footer__menu footer-menu">
                            <nav class="footer-menu__body">
                                <ul class="footer-menu__list">
                                    <li class="footer-menu__item">
                                        <NuxtLink to="/catalog" class="footer-menu__link">
                                            Каталог
                                        </NuxtLink>
                                    </li>
                                    <li
                                        v-for="category in menu?.categories"
                                        :key="category.slug"
                                        class="footer-menu__item"
                                    >
                                        <NuxtLink
                                            :to="`/catalog/${category.slug}`"
                                            class="footer-menu__link"
                                        >
                                            {{ category.name }}
                                        </NuxtLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <!-- Блок "Покупателям" -->
                    <div class="footer__block">
                        <h4 class="footer__label">
                            Покупателям
                        </h4>
                        <div class="footer__menu footer-menu">
                            <nav class="footer-menu__body">
                                <ul class="footer-menu__list">
                                    <li
                                        v-for="item in menu?.footer_menu?.find(item => item.name === 'Покупателям')?.items"
                                        :key="item?.slug"
                                        class="footer-menu__item"
                                    >
                                        <NuxtLink
                                            :to="`/${item.slug}`"
                                            class="footer-menu__link"
                                        >
                                            {{ item.name }}
                                        </NuxtLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <!-- Блок "Контакты" -->
                    <div class="footer__block">
                        <h4 class="footer__label">
                            Контакты
                        </h4>
                        <div class="footer__contacts">
                            <p class="footer__address">
                                {{ settings.address }}
                            </p>
                            <a :href="`mailto:${settings.email}`" class="footer__email">{{ settings.email }}</a>
                            <a :href="`tel:${formattedPhone}`" class="footer__phone">{{ settings.phone }}</a>
                            <div class="footer__socials">
                                <a v-if="settings.vk" target="_blank" title="Vk" :href="settings.vk" class="footer__soicial">
                                    <img src="/images/icons/vk.svg" alt="" loading="lazy">
                                </a>
                                <a v-if="settings.telegram" target="_blank" title="Telegram" :href="settings.telegram" class="footer__soicial">
                                    <img src="/images/icons/tg.svg" alt="" loading="lazy">
                                </a>
                                <a v-if="settings.whatsapp" target="_blank" title="Whatsapp" :href="settings.whatsapp" class="footer__soicial">
                                    <img src="/images/icons/wa.svg" alt="" loading="lazy">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer__bottom">
                <div class="footer__links">
                    <UiLink class="footer__link" href="/info/privacy">
                        Политика конфиденциальности
                    </UiLink>
                    <UiLink class="footer__link" href="/info/offer">
                        Договор оферты
                    </UiLink>
                </div>
                <div class="footer__developer">
                    <span>Разработка:</span>
                    <UiLink target="_blank" href="https://tresksites.ru">
                        Tresk
                    </UiLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.footer {
    padding-top: rem(60);
    padding-bottom: rem(25);
    background-color: $extraColor;

    // .footer__body
    &__body {
        display: grid;
        grid-template-columns: auto auto;
        align-items: start;
        justify-content: space-between;
        margin-bottom: rem(50);
    }

    // .footer__info
    &__info {
        display: grid;
        gap: rem(20);
    }

    // .footer__logo
    &__logo {
        img {
            max-width: 100%;
        }
    }

    // .footer__copyright
    &__copyright {
        font-size: 16px;
        line-height: 140%;
    }

    // .footer__blocks
    &__blocks {
        display: grid;
        grid-template-columns: repeat(3, minmax(auto, rem(220)));
        align-items: start;
    }

    // .footer__block
    &__block {
        display: grid;
        gap: rem(10);
    }

    // .footer__label
    &__label {
        font-size: 11px;
        font-weight: 500;
        line-height: 140%;
        color: rgb(54 54 54 / 60%);
        text-transform: uppercase;
    }

    // .footer__contacts
    &__contacts {
        display: grid;
        gap: rem(10);
    }

    // .footer__address
    &__address {
        font-size: 16px;
        line-height: 140%;
    }

    // .footer__email
    &__email {
        font-size: 16px;
        line-height: 140%;
        transition: color 0.3s ease-in-out;

        @media (any-hover: hover) {
            &:hover {
                color: $accentColor;
            }
        }
    }

    // .footer__phone
    &__phone {
        font-size: 18px;
        font-weight: 500;
        line-height: 140%;
        transition: color 0.3s ease-in-out;

        @media (any-hover: hover) {
            &:hover {
                color: $accentColor;
            }
        }
    }

    // .footer__socials
    &__socials {
        display: flex;
        gap: rem(6);
        align-items: center;
    }

    // .footer__soicial
    &__soicial {
        transition: transform 0.3s ease-in-out;

        @media (any-hover: hover) {
            &:hover {
                transform: scale(1.05);
            }
        }
    }

    // .footer__bottom
    &__bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;

        @include adaptive-value('gap', 40, 20);
    }

    // .footer__links
    &__links {
        display: flex;
        gap: rem(30);
        align-items: center;
    }

    // .footer__link
    &__link {
        font-size: 14px;
        line-height: 140%;
    }

    // .footer__developer
    &__developer {
        display: flex;
        gap: rem(4);
        align-items: center;

        span {
            font-size: 14px;
            font-weight: 400;
            line-height: 140%;
        }

        a {
            font-size: 16px;
            font-weight: 500;
            line-height: 140%;
            text-decoration: underline;
            text-decoration-thickness: 10%;
            text-decoration-style: dotted;
            transition: color 0.3s ease-in-out;

            @media (any-hover: hover) {
                &:hover {
                    color: $accentColor;
                }
            }
        }
    }
}

.footer-menu {
    // .footer-menu__list
    &__list {
        display: grid;
        gap: rem(10);
    }

    // .footer-menu__link
    &__link {
        font-size: 18px;
        line-height: 140%;
        transition: color 0.3s ease-in-out;

        @media (any-hover: hover) {
            &:hover {
                color: $accentColor;
            }
        }
    }
}
</style>
