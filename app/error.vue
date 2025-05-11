<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
    error: NuxtError
}>()

const handleError = () => clearError({ redirect: '/catalog' })
</script>

<template>
    <main class="page">
        <div class="error">
            <div class="error__container">
                <div class="error__body">
                    <LayoutEmpty>
                        <template #icon>
                            <UiIcon name="sad" size="48" />
                        </template>
                        <template #title>
                            {{ error.statusCode }}
                        </template>
                        <template #text>
                            {{ error.message }}
                        </template>
                        <template #button>
                            <UiButton outline @click="handleError">
                                Перейти в каталог
                            </UiButton>
                        </template>
                    </LayoutEmpty>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss">
.error {
    min-height: 100vh;
    min-height: 100dvh;

    // .error__body
    &__body {
        position: relative;
        z-index: 10;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        min-height: 100dvh;
        padding-top: rem(120);
        padding-bottom: rem(120);
    }

    // .error__title
    &__title {
        position: relative;
        font-family: Montserrat, sans-serif;
        font-weight: 700;
        animation: shake 0.6s ease-in-out infinite alternate;

        @include adaptive-value('margin-bottom', 50, 20);

        &::before {
            position: absolute;
            left: 50%;
            width: 100%;
            height: 0.1em;
            overflow: hidden;
            line-height: 0.5em;
            content: attr(data-error);
            opacity: 0.7;
            transform: translate(-50%, 0.34em);
            animation:
                scan 0.5s ease-in-out 275ms infinite alternate,
                glitch-anim 0.3s ease-in-out infinite alternate;
        }

        &::after {
            position: absolute;
            top: -8px;
            left: 50%;
            width: 100%;
            height: 0.5em;
            overflow: hidden;
            line-height: 0.1em;
            content: attr(data-t);
            opacity: 0.8;
            transform: translate(-50%, 0.34em);
            animation:
                scan 665ms ease-in-out 0.59s infinite alternate,
                glitch-anim 0.3s ease-in-out infinite alternate;
        }

        @include adaptive-value('font-size', 400, 120);
    }

    &__status {
        max-width: rem(800);
        padding: rem(15) rem(20);
        margin-bottom: rem(30);
        line-height: 140%;
        text-align: center;
        background-color: var(--light-color);
        border-radius: rem(12);

        @include adaptive-value('font-size', 16, 14);
    }

    @keyframes glitch-anim {
        0% {
            clip: rect(32px, 9999px, 28px, 0);
        }

        10% {
            clip: rect(13px, 9999px, 37px, 0);
        }

        20% {
            clip: rect(45px, 9999px, 33px, 0);
        }

        30% {
            clip: rect(31px, 9999px, 94px, 0);
        }

        40% {
            clip: rect(88px, 9999px, 98px, 0);
        }

        50% {
            clip: rect(9px, 9999px, 98px, 0);
        }

        60% {
            clip: rect(37px, 9999px, 17px, 0);
        }

        70% {
            clip: rect(77px, 9999px, 34px, 0);
        }

        80% {
            clip: rect(55px, 9999px, 49px, 0);
        }

        90% {
            clip: rect(10px, 9999px, 2px, 0);
        }

        100% {
            clip: rect(35px, 9999px, 53px, 0);
        }
    }

    @keyframes scan {
        0%,
        20%,
        100% {
            height: 0;
            transform: translate(-50%, 0.44em);
        }

        10%,
        15% {
            height: 1em;
            line-height: 0.2em;
            transform: translate(-55%, 0.09em);
        }
    }

    @keyframes shake {
        0% {
            transform: translate(-1px);
        }

        10% {
            transform: translate(2px, 1px);
        }

        30% {
            transform: translate(-3px, 2px);
        }

        35% {
            filter: blur(4px);
            transform: translate(2px, -3px);
        }

        45% {
            filter: blur(0);
            transform: translate(2px, 2px) skewY(-1deg) scaleX(0.96);
        }

        50% {
            transform: translate(-3px, 1px);
        }
    }
}
</style>
