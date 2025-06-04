<script setup>
const ctx = ref()

onMounted(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 991px)', () => {
        ctx.value = gsap.context(() => {
            gsap.from('.advantages__item', {
                duration: 2,
                y: 140,
                ease: 'cubic-bezier(0.25, 0.45, 0.45, 0.95)',
                stagger: 1,
                scrollTrigger: {
                    trigger: '.advantages',
                    scrub: true,
                    end: 'bottom 30%',
                },
            })
        })
    })
})

onBeforeUnmount(() => {
    if (ctx.value) {
        ctx.value.revert()
    }
})
</script>

<template>
    <div class="advantages">
        <div class="advantages__container">
            <div class="advantages__body">
                <div class="advantages__item">
                    <div class="advantages__icon">
                        <svg width="80" height="80">
                            <use href="/images/icons.svg#advantage-1" />
                        </svg>
                    </div>
                    <p class="advantages__text">
                        Собственное <br>производство
                    </p>
                </div>
                <div class="advantages__item">
                    <div class="advantages__icon">
                        <svg width="80" height="80">
                            <use href="/images/icons.svg#advantage-2" />
                        </svg>
                    </div>
                    <p class="advantages__text">
                        Размерный ряд <br>от 40 до 60 размера
                    </p>
                </div>
                <div class="advantages__item">
                    <div class="advantages__icon">
                        <svg width="80" height="80">
                            <use href="/images/icons.svg#advantage-3" />
                        </svg>
                    </div>
                    <p class="advantages__text">
                        Идеальная <br>посадка
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
// ========================================================================================================================================================
.advantages {
    position: relative;
    z-index: 10;
    transform: translateY(-70px);

    @include adaptive-value('margin-bottom', 120, 80);

    @media (max-width: $tablet) {
        margin-top: rem(60);
        transform: none;
    }

    &__body {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: rem(54);

        @include adaptive-value('gap', 54, 10);

        @media (max-width: $tablet) {
            grid-template-columns: 1fr;
        }
    }

    &__item {
        position: relative;
        display: flex;
        align-items: center;
        background: rgb(255 255 255 / 40%);
        border: 1px solid rgb(222 206 190 / 25%);
        backdrop-filter: blur(6px);

        @include adaptive-value('padding-block', 28, 18);
        @include adaptive-value('padding-inline', 16, 10);
        @include adaptive-value('gap', 30, 20);

        &::before {
            position: absolute;
            bottom: -30px;
            left: 50%;
            z-index: -1;
            width: 80%;
            height: 50%;
            content: '';
            background: rgb(46 46 46 / 16%);
            border-radius: rem(10);
            filter: blur(50px);
            transform: translateX(-50%) translateZ(0);
        }

        @media (max-width: $tablet) {
            background-color: $lightColor;
        }
    }

    &__icon {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        color: $accentColor;

        @include adaptive-value('width', 80, 40);
        @include adaptive-value('height', 80, 40);
    }

    &__text {
        line-height: 125%;

        @include adaptive-value('font-size', 22, 18);

        @media (max-width: $tablet) {
            br {
                display: none;
            }
        }
    }
}
</style>
