<template>
    <div class="page-empty">
        <div class="page-empty__icon">
            <slot name="icon" />
        </div>
        <UiTitle class="page-empty__title">
            <slot name="title" />
        </UiTitle>
        <p class="page-empty__text">
            <slot name="text" />
        </p>
        <slot name="button" />
    </div>
</template>

<style lang="scss" scoped>
.page-empty {
    display: grid;
    justify-items: center;

    @include adaptive-value('gap', 25, 10);

    &__icon {
        color: $extraColor;
    }

    &__title {
        text-align: center;
    }

    &__text {
        max-width: rem(300);
        line-height: 140%;
        text-align: center;

        @include adaptive-value('font-size', 16, 14);
    }
}
</style>
