<template>
    <h2 class="title">
        <slot />
    </h2>
</template>

<style lang="scss" scoped>
.title {
    font-family: 'Quincy CF', sans-serif;
    line-height: 120%;
    letter-spacing: 0.01em;

    @include adaptive-value('font-size', 40, 24);
}
</style>
