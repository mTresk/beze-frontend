<template>
    <button
        type="button"
        class="slider-button"
    >
        <UiIcon name="arrow-right" size="40" />
    </button>
</template>

<style lang="scss">
.slider-button {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $whiteColor;
    background-color: $extraColor;
    border-radius: rem(4);
    transition: all 0.3s ease-in-out;

    @include adaptive-value('width', 60, 40);
    @include adaptive-value('height', 60, 40);

    svg {
        height: auto;

        @include adaptive-value('max-width', 40, 20);
    }

    @media (any-hover: hover) {
        &:hover {
            background-color: $accentColor;
        }
    }

    &.swiper-button-disabled {
        visibility: hidden;
        opacity: 0;
    }
}
</style>
