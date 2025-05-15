declare module 'laravel-vue-pagination' {
    import type { DefineComponent } from 'vue'

    export const Bootstrap5Pagination: DefineComponent<{
        data: any
        limit?: number
        showDisabled?: boolean
        size?: string
        align?: string
    }, object, any>
}
