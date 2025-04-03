<script setup>
const ctx = ref()

onMounted(() => {
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

onBeforeUnmount(() => {
    ctx.value.revert()
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
    margin-bottom: rem(120);
    transform: translateY(-70px);

    // .advantages__body
    &__body {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: rem(54);
    }

    // .advantages__item
    &__item {
        position: relative;
        display: flex;
        gap: rem(30);
        align-items: center;
        padding: rem(28) rem(16);
        background: rgb(255 255 255 / 40%);
        border: 1px solid rgb(222 206 190 / 25%);
        backdrop-filter: blur(6px);

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
            transform: translateX(-50%);
        }
    }

    // .advantages__icon
    &__icon {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        width: rem(80);
        height: rem(80);
        color: $accentColor;
    }

    // .advantages__text
    &__text {
        font-size: 22px;
        line-height: 125%;
    }
}
</style>
