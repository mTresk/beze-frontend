<script setup lang="ts">
import type { ApiPaginationMeta } from '@/types/api'
import { Bootstrap5Pagination } from 'laravel-vue-pagination/dist/laravel-vue-pagination.es.js'

const props = defineProps<{
    meta: ApiPaginationMeta
    isLoading?: boolean
}>()

const emit = defineEmits<{
    pageClick: [page: number]
}>()

function handlePageClick(page: number) {
    if (page === props.meta?.current_page || props.isLoading)
        return

    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })

    emit('pageClick', page)
}
</script>

<template>
    <template v-if="meta && meta.last_page > 1">
        <Bootstrap5Pagination
            :limit="3"
            :data="meta"
            @pagination-change-page="handlePageClick"
        />
    </template>
</template>

<style lang="scss">
.pagination {
    display: flex;
    gap: rem(10);
    align-items: center;
    justify-content: center;

    @include adaptive-value('gap', 10, 5);
}

.page-link {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 125%;
    cursor: pointer;
    border-radius: rem(4);
    transition: all 0.3s ease-in-out;

    @include adaptive-value('width', 40, 35);
    @include adaptive-value('height', 40, 35);
    @include adaptive-value('font-size', 16, 14);

    &.disabled {
        pointer-events: none !important;
        opacity: 0.5;
    }

    @media (any-hover: hover) {
        &:hover {
            color: $whiteColor;
            background-color: $extraColor;
        }
    }
}

.page-item {
    &.active {
        .page-link {
            color: $whiteColor;
            pointer-events: none;
            background-color: $extraColor;
        }
    }
}
</style>
