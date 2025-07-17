<script setup lang="ts">
defineProps<{
    light?: boolean
}>()
</script>

<template>
    <div
        class="spinner"
        :class="{ 'spinner--light': light }"
    />
</template>

<style lang="scss" scoped>
.spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 10;
    width: 1em;
    height: 1em;
    font-size: rem(20);
    color: $accentColor;
    text-indent: -9999em;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: load 1.3s infinite linear 0.1s;

    &--light {
        color: $whiteColor;
    }
}

@keyframes load {
    0%,
    100% {
        box-shadow:
            0 -3em 0 0.2em,
            2em -2em 0 0,
            3em 0 0 -1em,
            2em 2em 0 -1em,
            0 3em 0 -1em,
            -2em 2em 0 -1em,
            -3em 0 0 -1em,
            -2em -2em 0 0;
    }

    12.5% {
        box-shadow:
            0 -3em 0 0,
            2em -2em 0 0.2em,
            3em 0 0 0,
            2em 2em 0 -1em,
            0 3em 0 -1em,
            -2em 2em 0 -1em,
            -3em 0 0 -1em,
            -2em -2em 0 -1em;
    }

    25% {
        box-shadow:
            0 -3em 0 -0.5em,
            2em -2em 0 0,
            3em 0 0 0.2em,
            2em 2em 0 0,
            0 3em 0 -1em,
            -2em 2em 0 -1em,
            -3em 0 0 -1em,
            -2em -2em 0 -1em;
    }

    37.5% {
        box-shadow:
            0 -3em 0 -1em,
            2em -2em 0 -1em,
            3em 0 0 0,
            2em 2em 0 0.2em,
            0 3em 0 0,
            -2em 2em 0 -1em,
            -3em 0 0 -1em,
            -2em -2em 0 -1em;
    }

    50% {
        box-shadow:
            0 -3em 0 -1em,
            2em -2em 0 -1em,
            3em 0 0 -1em,
            2em 2em 0 0,
            0 3em 0 0.2em,
            -2em 2em 0 0,
            -3em 0 0 -1em,
            -2em -2em 0 -1em;
    }

    62.5% {
        box-shadow:
            0 -3em 0 -1em,
            2em -2em 0 -1em,
            3em 0 0 -1em,
            2em 2em 0 -1em,
            0 3em 0 0,
            -2em 2em 0 0.2em,
            -3em 0 0 0,
            -2em -2em 0 -1em;
    }

    75% {
        box-shadow:
            0 -3em 0 -1em,
            2em -2em 0 -1em,
            3em 0 0 -1em,
            2em 2em 0 -1em,
            0 3em 0 -1em,
            -2em 2em 0 0,
            -3em 0 0 0.2em,
            -2em -2em 0 0;
    }

    87.5% {
        box-shadow:
            0 -3em 0 0,
            2em -2em 0 -1em,
            3em 0 0 -1em,
            2em 2em 0 -1em,
            0 3em 0 -1em,
            -2em 2em 0 0,
            -3em 0 0 0,
            -2em -2em 0 0.2em;
    }
}

@keyframes load4 {
    0%,
    100% {
        box-shadow:
            0 -3em 0 0.2em,
            2em -2em 0 0,
            3em 0 0 -1em,
            2em 2em 0 -1em,
            0 3em 0 -1em,
            -2em 2em 0 -1em,
            -3em 0 0 -1em,
            -2em -2em 0 0;
    }

    12.5% {
        box-shadow:
            0 -3em 0 0,
            2em -2em 0 0.2em,
            3em 0 0 0,
            2em 2em 0 -1em,
            0 3em 0 -1em,
            -2em 2em 0 -1em,
            -3em 0 0 -1em,
            -2em -2em 0 -1em;
    }

    25% {
        box-shadow:
            0 -3em 0 -0.5em,
            2em -2em 0 0,
            3em 0 0 0.2em,
            2em 2em 0 0,
            0 3em 0 -1em,
            -2em 2em 0 -1em,
            -3em 0 0 -1em,
            -2em -2em 0 -1em;
    }

    37.5% {
        box-shadow:
            0 -3em 0 -1em,
            2em -2em 0 -1em,
            3em 0 0 0,
            2em 2em 0 0.2em,
            0 3em 0 0,
            -2em 2em 0 -1em,
            -3em 0 0 -1em,
            -2em -2em 0 -1em;
    }

    50% {
        box-shadow:
            0 -3em 0 -1em,
            2em -2em 0 -1em,
            3em 0 0 -1em,
            2em 2em 0 0,
            0 3em 0 0.2em,
            -2em 2em 0 0,
            -3em 0 0 -1em,
            -2em -2em 0 -1em;
    }

    62.5% {
        box-shadow:
            0 -3em 0 -1em,
            2em -2em 0 -1em,
            3em 0 0 -1em,
            2em 2em 0 -1em,
            0 3em 0 0,
            -2em 2em 0 0.2em,
            -3em 0 0 0,
            -2em -2em 0 -1em;
    }

    75% {
        box-shadow:
            0 -3em 0 -1em,
            2em -2em 0 -1em,
            3em 0 0 -1em,
            2em 2em 0 -1em,
            0 3em 0 -1em,
            -2em 2em 0 0,
            -3em 0 0 0.2em,
            -2em -2em 0 0;
    }

    87.5% {
        box-shadow:
            0 -3em 0 0,
            2em -2em 0 -1em,
            3em 0 0 -1em,
            2em 2em 0 -1em,
            0 3em 0 -1em,
            -2em 2em 0 0,
            -3em 0 0 0,
            -2em -2em 0 0.2em;
    }
}
</style>
