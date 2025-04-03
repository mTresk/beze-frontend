<template>
    <form class="form">
        <div class="form__body">
            <slot />
        </div>
    </form>
</template>

<style lang="scss" scoped>
.form {
    position: relative;

    // .form__body
    &__body {
        display: grid;
        gap: rem(20);
    }
}
</style>
