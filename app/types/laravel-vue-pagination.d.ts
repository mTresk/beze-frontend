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

declare module 'laravel-vue-pagination/dist/laravel-vue-pagination.es.js' {
  export const Bootstrap5Pagination: any
  export const Bootstrap4Pagination: any
  export const TailwindPagination: any
  export const RenderlessPagination: any
}
