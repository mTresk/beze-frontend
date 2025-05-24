<script setup lang="ts">
import type { IMenu, ISettings } from '@/types/api'
import { NuxtImg } from '#components'

defineProps<{
    menu: IMenu
    settings: ISettings
    isMenuBlocked: boolean
    formattedPhone: string
}>()

const emit = defineEmits(['blockMenu', 'toggleMenu'])

const openSpoilers = ref<Record<string, boolean>>({})

function toggleSpoiler(key: string) {
    openSpoilers.value[key] = !openSpoilers.value[key]
}

function handleLinkClick() {
    emit('blockMenu')

    if (window.innerWidth < 992) {
        emit('toggleMenu')
    }
}
</script>

<template>
    <div class="menu" :class="{ 'menu--blocked': isMenuBlocked }">
        <nav class="menu__body">
            <ul class="menu__list">
                <li class="menu__item">
                    <NuxtLink
                        to="/catalog"
                        class="menu__link"
                        @click="handleLinkClick"
                    >
                        Каталог
                    </NuxtLink>
                </li>
                <li
                    v-for="category in menu?.categories"
                    :key="category.slug"
                    class="menu__item"
                >
                    <div
                        class="menu__link"
                        :class="{ 'menu__link--opened': openSpoilers[category.slug] }"
                        @click="() => toggleSpoiler(category.slug)"
                    >
                        <span>{{ category.name }}</span>
                        <UiIcon v-if="category.subcategories?.length" name="arrow-down" size="10" />
                    </div>
                    <ul
                        v-if="category.subcategories?.length"
                        class="menu__sublist"
                        :class="{ 'menu__sublist--mobile-open': openSpoilers[category.slug] }"
                    >
                        <li
                            v-for="subcategory in category.subcategories"
                            :key="subcategory.slug"
                            class="menu__subitem"
                        >
                            <NuxtLink
                                :to="`/catalog/category/${category.slug}/${subcategory.slug}`"
                                class="menu__sublink"
                                @click="handleLinkClick"
                            >
                                {{ subcategory.name }}
                            </NuxtLink>
                        </li>
                    </ul>
                </li>
                <li
                    v-for="item in menu?.header_menu"
                    :key="item.name"
                    class="menu__item"
                >
                    <template v-if="item.items">
                        <div
                            class="menu__link"
                            :class="{ 'menu__link--opened': openSpoilers[item.name] }"
                            @click="() => toggleSpoiler(item.name)"
                        >
                            <span>{{ item.name }}</span>
                            <UiIcon name="arrow-down" size="10" />
                        </div>
                        <ul
                            class="menu__sublist"
                            :class="{ 'menu__sublist--mobile-open': openSpoilers[item.name] }"
                        >
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
        <div class="menu__contacts">
            <p class="menu__address">
                {{ settings.address }}
            </p>
            <a :href="`mailto:${settings.email}`" class="menu__email">{{ settings.email }}</a>
            <a :href="`tel:${formattedPhone}`" class="menu__phone">{{ settings.phone }}</a>
            <div class="menu__socials">
                <a v-if="settings.vk" target="_blank" title="Vk" :href="settings.vk" class="menu__social">
                    <NuxtImg width="30" height="30" src="/images/icons/vk.svg" alt="" loading="lazy" />
                </a>
                <a v-if="settings.telegram" target="_blank" title="Telegram" :href="settings.telegram" class="menu__social">
                    <NuxtImg width="30" height="30" src="/images/icons/tg.svg" alt="" loading="lazy" />
                </a>
                <a v-if="settings.whatsapp" target="_blank" title="Whatsapp" :href="settings.whatsapp" class="menu__social">
                    <NuxtImg width="30" height="30" src="/images/icons/wa.svg" alt="" loading="lazy" />
                </a>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.menu {
    @media (max-width: $tablet) {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        max-width: rem(500);
        height: 100dvh;
        padding-inline: rem(20);
        padding-top: rem(80);
        padding-bottom: rem(30);
        overflow-y: auto;
        background-color: $extraColor;
        transform: translateX(-100%);
        transition: transform 0.3s ease-in-out;

        .menu-open & {
            transform: translateX(0);
        }
    }

    // .menu__list
    &__list {
        display: flex;
        gap: rem(40);
        align-items: center;

        @include adaptive-value('gap', 40, 20, 0, 1920, 992);

        @media (max-width: $tablet) {
            flex-direction: column;
            align-items: flex-start;
        }
    }

    // .menu__item
    &__item {
        position: relative;

        @media (any-hover: hover) {
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

        @media (max-width: $tablet) {
            width: 100%;
        }
    }

    // .menu__link
    &__link {
        display: flex;
        gap: rem(8);
        align-items: center;
        line-height: 125%;
        color: $whiteColor;
        cursor: pointer;
        transition: color 0.3s ease-in-out;

        @include adaptive-value('font-size', 18, 16);

        svg {
            transition: transform 0.3s ease-in-out;
        }

        @media (max-width: $tablet) {
            justify-content: space-between;
            font-size: rem(22);
            color: $mainColor;

            svg {
                width: rem(16);
                height: rem(16);
            }
        }

        &--opened {
            svg {
                transform: rotate(-180deg);
            }
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

            @media (max-width: $tablet) {
                display: none;
            }
        }

        @media (max-width: $tablet) {
            position: static;
            display: none;
            visibility: visible;
            padding: 0;
            padding-block: rem(10);
            pointer-events: auto;
            background-color: transparent;
            box-shadow: none;
            opacity: 1;
            transform: none;
            transition: none;

            &--mobile-open {
                display: grid;
            }
        }
    }

    // .menu__sublink
    &__sublink {
        font-size: rem(18);
        line-height: 125%;
        color: $whiteColor;
        transition: color 0.3s ease-in-out;

        @media (any-hover: hover) {
            &:hover {
                color: $accentColor;
            }
        }

        @media (max-width: $tablet) {
            color: $mainColor;
        }
    }

    // .menu__contacts
    &__contacts {
        display: none;

        @media (max-width: $tablet) {
            display: grid;
            gap: rem(16);
            padding-top: rem(30);
            margin-top: rem(30);
            border-top: 1px solid rgb(54 54 54 / 10%);
        }
    }

    // .menu__address
    &__address {
        font-size: rem(18);
        line-height: 140%;
    }

    // .menu__email
    &__email {
        font-size: rem(18);
        line-height: 140%;
        text-decoration: underline;
        text-decoration-thickness: 10%;
        text-decoration-style: dotted;
        text-underline-offset: rem(3);
        text-decoration-skip-ink: none;
    }

    // .menu__phone
    &__phone {
        font-size: rem(18);
        line-height: 140%;
        text-decoration: underline;
        text-decoration-thickness: 10%;
        text-decoration-style: dotted;
        text-underline-offset: rem(3);
        text-decoration-skip-ink: none;
    }

    // .menu__socials
    &__socials {
        display: flex;
        gap: rem(8);
        align-items: center;
    }

    // .menu__social
    &__social {
        width: rem(40);
        height: rem(40);

        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
