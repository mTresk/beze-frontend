<template>
    <h1 class="title">
        <slot />
    </h1>
</template>

<style lang="scss" scoped>
.title {
    line-height: 140%;

    @include adaptive-value('font-size', 28, 22);
    @include adaptive-value('margin-bottom', 30, 20);
}
</style>
