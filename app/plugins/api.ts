export default defineNuxtPlugin(() => {
    const $apiClient = $fetch.create({
        baseURL: useRuntimeConfig().public.backendUrl,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        async onResponseError({ response }) {
            if (response.status !== 422) {
                throw showError({
                    statusCode: response.status,
                    statusMessage: response.statusText,
                })
            }
        },
    })

    return {
        provide: {
            apiClient: $apiClient,
        },
    }
})
