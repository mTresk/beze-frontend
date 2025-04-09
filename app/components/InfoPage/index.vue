<script setup lang="ts">
interface SidebarLink {
    to: string
    title: string
}

interface Props {
    title: string
    breadcrumbItems: Array<{
        title: string
        to?: string
    }>
    sidebarLinks?: SidebarLink[]
}

defineProps<Props>()
</script>

<template>
    <section class="info spacer">
        <div class="info__container">
            <LayoutBreadcrumb
                :items="breadcrumbItems"
            />
            <UiPageTitle class="info__title">
                {{ title }}
            </UiPageTitle>
            <div class="info__body">
                <div class="info__content content">
                    <slot />
                </div>
                <aside
                    v-if="sidebarLinks?.length"
                    class="info__sidebar sidebar"
                >
                    <p class="sidebar__label">
                        Другие материалы
                    </p>
                    <ul class="sidebar__list">
                        <li
                            v-for="link in sidebarLinks"
                            :key="link.to"
                            class="sidebar__item"
                        >
                            <NuxtLink
                                :to="link.to"
                                class="sidebar__link"
                            >
                                {{ link.title }}
                            </NuxtLink>
                        </li>
                    </ul>
                </aside>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.info {
    // .info__body
    &__body {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;

        @include adaptive-value('gap', 60, 30);

        @media (max-width: $mobile) {
            display: block;
        }
    }

    // .info__content
    &__content {
        flex: 0 1 rem(880);
    }

    // .info__sidebar
    &__sidebar {
        position: sticky;
        top: rem(100);
        flex: 0 0 rem(200);
    }
}

.sidebar {
    display: grid;
    gap: rem(10);

    @media (max-width: $tablet) {
        display: none;
    }

    // .sidebar__label
    &__label {
        line-height: 140%;
        color: rgb(54 54 54 / 60%);
        text-transform: uppercase;

        @include adaptive-value('font-size', 14, 12);
    }

    // .sidebar__list
    &__list {
        display: grid;
        gap: rem(10);
    }

    // .sidebar__link
    &__link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        line-height: 140%;
        text-align: center;
        white-space: nowrap;
        text-decoration: underline;
        text-decoration-thickness: 10%;
        text-decoration-style: dotted;
        text-underline-offset: rem(3);
        background-color: $lightColor;
        border-radius: rem(4);
        transition: all 0.3s ease-in-out;
        text-decoration-skip-ink: none;

        @include adaptive-value('font-size', 16, 14);
        @include adaptive-value('padding-inline', 20, 16);
        @include adaptive-value('padding-block', 16, 8);

        @media (any-hover: hover) {
            &:hover {
                color: $whiteColor;
                background-color: $extraColor;
            }
        }
    }
}
</style>
