<script setup lang="ts">
interface Props {
    meta: {
        current_page: number
        last_page: number
    }
    isLoading?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
    pageClick: [page: number]
}>()

const pages = computed(() => {
    if (!props.meta)
        return []

    const current = props.meta.current_page
    const last = props.meta.last_page
    const delta = 2

    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, current - delta); i <= Math.min(last - 1, current + delta); i++) {
        range.push(i)
    }

    if (current - delta > 2) {
        rangeWithDots.push(1, '...')
    }
    else {
        rangeWithDots.push(1)
    }

    range.forEach(i => rangeWithDots.push(i))

    if (current + delta < last - 1) {
        rangeWithDots.push('...', last)
    }
    else if (last !== 1) {
        rangeWithDots.push(last)
    }

    return rangeWithDots
})

function handlePageClick(page: number | string) {
    if (typeof page === 'string' || page === props.meta?.current_page || props.isLoading)
        return

    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })

    emit('pageClick', page)
}
</script>

<template>
    <div v-if="meta && meta.last_page > 1" class="pagination">
        <UiButton
            v-if="meta.current_page > 1"
            square
            outline
            :disabled="isLoading"
            @click="handlePageClick(meta.current_page - 1)"
        >
            <UiIcon name="arrow-left" size="30" />
        </UiButton>
        <div class="pagination__pages">
            <span
                v-for="page in pages"
                :key="page"
                :class="{
                    active: page === meta.current_page,
                    dots: page === '...',
                }"
                @click="handlePageClick(page)"
            >
                {{ page }}
            </span>
        </div>
        <UiButton
            v-if="meta.current_page < meta.last_page"
            square
            outline
            :disabled="isLoading"
            @click="handlePageClick(meta.current_page + 1)"
        >
            <UiIcon name="arrow-right" size="30" />
        </UiButton>
    </div>
</template>

<style lang="scss" scoped>
.pagination {
    display: flex;
    gap: rem(10);
    align-items: center;
    justify-content: center;

    &__pages {
        display: flex;
        gap: rem(10);
        align-items: center;

        span {
            display: flex;
            align-items: center;
            justify-content: center;
            width: rem(40);
            height: rem(40);
            font-size: rem(16);
            line-height: 125%;
            cursor: pointer;
            border-radius: rem(4);
            transition: all 0.3s ease-in-out;

            &:not(.dots):hover {
                color: $whiteColor;
                background-color: $extraColor;
            }

            &.active {
                color: $whiteColor;
                pointer-events: none;
                background-color: $extraColor;
            }

            &.dots {
                cursor: default;
            }
        }
    }
}
</style>
