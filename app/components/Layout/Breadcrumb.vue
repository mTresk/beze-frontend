<script setup lang="ts">
import { computed } from 'vue'

interface IBreadcrumbItem {
    title: string
    link?: string
}

const props = defineProps<{
    items: IBreadcrumbItem[]
}>()

const HOME_CRUMB: IBreadcrumbItem = {
    title: 'Главная',
    link: '/',
}

const breadcrumbs = computed<IBreadcrumbItem[]>(() => [HOME_CRUMB, ...props.items])
</script>

<template>
    <ul class="breadcrumb">
        <li v-for="(item, index) in breadcrumbs" :key="index" class="breadcrumb__item">
            <template v-if="item.link">
                <NuxtLink :to="item.link" class="breadcrumb__link">
                    {{ item.title }}
                </NuxtLink>
            </template>
            <template v-else>
                <span class="breadcrumb__text">{{ item.title }}</span>
            </template>
        </li>
    </ul>
</template>

<style lang="scss">
.breadcrumb {
    display: flex;
    flex-wrap: wrap;
    gap: rem(4) rem(17);
    align-items: center;

    @include adaptive-value('margin-bottom', 30, 16);
    @include adaptive-value('margin-top', 130, 80);

    // .breadcrumb__item
    &__item {
        position: relative;
        line-height: 140%;
        transition: color 0.3s ease-in-out;

        @include adaptive-value('font-size', 16, 14);

        &:not(:last-child) {
            &::before {
                position: absolute;
                right: -10px;
                font-size: 14px;
                line-height: 140%;
                color: rgb(54 54 54 / 50%);
                content: '/';
            }
        }

        &:last-child {
            color: rgb(54 54 54 / 50%);
            pointer-events: none;
        }
    }

    // .breadcrumb__link
    &__link {
        transition: color 0.3s ease;

        @media (hover: hover) {
            &:hover {
                color: $accentColor;
            }
        }
    }
}
</style>
