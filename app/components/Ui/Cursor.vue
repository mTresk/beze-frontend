<script setup lang="ts">
const cursor = ref<HTMLElement | null>(null)

onMounted(() => {
    const cursorElements = document.querySelectorAll<HTMLElement>('[data-js-cursor]')
    if (!cursorElements.length)
        return

    cursorElements.forEach((element) => {
        element.addEventListener('mouseenter', () => {
            cursor.value?.classList.add('cursor--visible')
        })

        element.addEventListener('mouseleave', () => {
            cursor.value?.classList.remove('cursor--visible')
        })

        element.addEventListener('mousemove', (e: MouseEvent) => {
            if (cursor.value) {
                cursor.value.style.left = `${e.clientX}px`
                cursor.value.style.top = `${e.clientY}px`
            }
        })
    })
})
</script>

<template>
    <div ref="cursor" class="cursor">
        <span>Смотреть</span>
        <svg width="10" height="10">
            <use href="/images/icons.svg#arrow-down" />
        </svg>
    </div>
</template>

<style lang="scss">
.cursor {
    position: fixed;
    z-index: 9999;
    display: flex;
    gap: rem(4);
    align-items: center;
    padding: rem(8) rem(16);
    font-size: rem(14);
    color: $whiteColor;
    pointer-events: none;
    background-color: $extraColor;
    border-radius: rem(20);
    opacity: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.1s ease-in-out;

    svg {
        transform: rotate(-90deg);
    }

    &--visible {
        opacity: 1;
    }
}

[data-js-cursor] {
    cursor: none !important;
}
</style>
