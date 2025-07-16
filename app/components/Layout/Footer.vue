<script setup lang="ts">
import type { IMenu, ISettings } from '@/types/api'
import { NuxtImg } from '#components'
import { formatPhone } from '@/helpers'

const currentYear = new Date().getFullYear()

const menu = useState<IMenu>('menu')

const settings = useState<ISettings>('settings')

const formattedPhone = computed(() => formatPhone(settings?.value?.phone))
</script>

<template>
    <div class="footer">
        <div class="footer__container">
            <div class="footer__body">
                <div class="footer__info">
                    <NuxtLink to="/" class="footer__logo">
                        <NuxtImg width="320" height="90" src="/images/logo-footer.svg" alt="Beze Studio" />
                    </NuxtLink>
                    <div class="footer__copyright">
                        © {{ currentYear }} Все права защищены
                    </div>
                </div>
                <div class="footer__blocks">
                    <div class="footer__block">
                        <p class="footer__label">
                            Магазин
                        </p>
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
                                            :to="`/catalog/category/${category.slug}`"
                                            class="footer-menu__link"
                                        >
                                            {{ category.name }}
                                        </NuxtLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div class="footer__block">
                        <p class="footer__label">
                            Покупателям
                        </p>
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
                    <div class="footer__block">
                        <p class="footer__label">
                            Контакты
                        </p>
                        <div class="footer__contacts">
                            <p class="footer__address">
                                {{ settings.address }}
                            </p>
                            <a :href="`mailto:${settings.email}`" class="footer__email">{{ settings.email }}</a>
                            <a :href="`tel:${formattedPhone}`" class="footer__phone">{{ settings.phone }}</a>
                            <div class="footer__socials">
                                <a v-if="settings.vk" target="_blank" title="Vk" :href="settings.vk" class="footer__soicial">
                                    <NuxtImg width="30" height="30" src="/images/icons/vk.svg" alt="" />
                                </a>
                                <a v-if="settings.telegram" target="_blank" title="Telegram" :href="settings.telegram" class="footer__soicial">
                                    <NuxtImg width="30" height="30" src="/images/icons/tg.svg" alt="" />
                                </a>
                                <a v-if="settings.whatsapp" target="_blank" title="Whatsapp" :href="settings.whatsapp" class="footer__soicial">
                                    <NuxtImg width="30" height="30" src="/images/icons/wa.svg" alt="" />
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
                    <UiLink class="footer__link" href="/info/processing">
                        Согласие на обработку ПД
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
    padding-bottom: rem(25);
    background-color: $extraColor;

    @include adaptive-value('padding-top', 60, 35);

    @media (max-width: $tablet) {
        margin-bottom: rem(65);
    }

    &__body {
        display: grid;
        grid-template-columns: auto auto;
        align-items: start;
        justify-content: space-between;

        @include adaptive-value('margin-bottom', 50, 20);
        @include adaptive-value('gap', 60, 20);

        @media (max-width: $mobile) {
            grid-template-columns: 1fr;
            justify-items: center;
            text-align: center;
        }
    }

    &__info {
        display: grid;
        gap: rem(20);
    }

    &__logo {
        img {
            @include adaptive-value('max-width', 320, 200);
        }
    }

    &__copyright {
        font-size: rem(16);
        line-height: 140%;
        text-align: center;
    }

    &__blocks {
        display: grid;
        grid-template-columns: repeat(3, minmax(auto, rem(220)));
        align-items: start;

        @include adaptive-value('gap', 40, 20);

        @media (max-width: $mobile) {
            display: block;
        }
    }

    &__block {
        display: grid;
        gap: rem(10);

        @media (max-width: $mobile) {
            &:nth-child(1),
            &:nth-child(2) {
                display: none;
            }
        }
    }

    &__label {
        font-size: rem(11);
        font-weight: 500;
        line-height: 140%;
        color: rgb(54 54 54 / 60%);
        text-transform: uppercase;
    }

    &__contacts {
        display: grid;
        gap: rem(10);
    }

    &__address {
        font-size: rem(16);
        line-height: 140%;
    }

    &__email {
        font-size: rem(16);
        line-height: 140%;
        transition: color 0.3s ease-in-out;

        @media (any-hover: hover) {
            &:hover {
                color: $accentColor;
            }
        }
    }

    &__phone {
        font-size: rem(18);
        font-weight: 500;
        line-height: 140%;
        transition: color 0.3s ease-in-out;

        @media (any-hover: hover) {
            &:hover {
                color: $accentColor;
            }
        }
    }

    &__socials {
        display: flex;
        gap: rem(6);
        align-items: center;

        @media (max-width: $mobile) {
            justify-content: center;
        }
    }

    &__soicial {
        transition: transform 0.3s ease-in-out;

        @media (any-hover: hover) {
            &:hover {
                transform: scale(1.05);
            }
        }
    }

    &__bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;

        @include adaptive-value('gap', 40, 10);

        @media (max-width: $mobile) {
            display: grid;
            grid-template-columns: 1fr;
            justify-items: center;
            text-align: center;
        }
    }

    &__links {
        display: flex;
        align-items: center;

        @include adaptive-value('gap', 30, 10);

        @media (max-width: $mobile) {
            display: grid;
        }
    }

    &__link {
        font-size: rem(14);
        line-height: 140%;
    }

    &__developer {
        display: flex;
        gap: rem(4);
        align-items: center;

        span {
            font-size: rem(14);
            font-weight: 400;
            line-height: 140%;
        }

        a {
            font-size: rem(16);
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
    &__list {
        display: grid;
        gap: rem(10);
    }

    &__link {
        line-height: 140%;
        transition: color 0.3s ease-in-out;

        @include adaptive-value('font-size', 18, 14);

        @media (any-hover: hover) {
            &:hover {
                color: $accentColor;
            }
        }
    }
}
</style>
