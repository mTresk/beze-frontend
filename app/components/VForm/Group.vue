<template>
    <div class="form-group">
        <div class="form-group__label">
            <slot name="label" />
        </div>
        <div class="form-group__body">
            <slot name="body" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.form-group {
    &:first-child {
        border-bottom: rem(1) solid rgb(54 54 54 / 10%);

        @include adaptive-value('padding-bottom', 40, 30);
        @include adaptive-value('margin-bottom', 20, 15);
    }

    &[block] {
        .form-group__body {
            display: block;
            max-width: rem(490);
        }
    }

    &__label {
        margin-bottom: rem(16);

        @include adaptive-value('font-size', 20, 18);
    }

    &__body {
        display: grid;
        grid-template-columns: 1fr 1fr;

        @media (max-width: $mobile) {
            grid-template-columns: 1fr;
        }

        @include adaptive-value('gap', 20, 15);
    }
}
</style>
