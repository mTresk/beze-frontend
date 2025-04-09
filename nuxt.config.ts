export default defineNuxtConfig({
    future: {
        compatibilityVersion: 4,
    },
    devtools: { enabled: false },
    modules: ['nuxt-swiper', 'nuxt-toastify'],
    app: {
        pageTransition: { name: 'layout', mode: 'out-in' },
    },
    runtimeConfig: {
        public: {
            backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL,
            yandexMapsApiKey: process.env.VITE_YANDEX_MAPS_API_KEY,
        },
    },
    nitro: {
        compressPublicAssets: true,
    },
    build: {
        transpile: ['gsap'],
    },
    devServer: {
        port: 3000,
        host: '0.0.0.0',
    },
    postcss: {
        plugins: {
            autoprefixer: {},
        },
    },
    css: ['@/assets/scss/fonts.scss', '@/assets/scss/null.scss'],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/scss/globals.scss" as *;',
                    silenceDeprecations: ['import'],
                },
            },
        },
    },
    toastify: {
        autoClose: 2000,
        position: 'bottom-right',
        theme: 'light',
        hideProgressBar: true,
        closeButton: false,
        toastClassName: 'toastify-toast',
    },
    compatibilityDate: '2025-03-30',
})
