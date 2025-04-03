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
    gap: rem(25);
    justify-items: center;

    // .page-empty__icon
    &__icon {
        color: $extraColor;
    }

    // .page-empty__title
    &__title {
        text-align: center;
    }

    // .page-empty__text
    &__text {
        max-width: rem(300);
        font-size: rem(16);
        line-height: 140%;
        text-align: center;
    }
}
</style>
