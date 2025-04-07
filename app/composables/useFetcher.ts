import type { NitroFetchOptions } from 'nitropack'

export async function useFetcher<T>(url: string, options?: NitroFetchOptions<any>) {
    return await useNuxtApp().$apiClient<T>(url, options)
}
