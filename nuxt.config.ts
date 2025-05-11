export default defineNuxtConfig({
    future: {
        compatibilityVersion: 4,
    },
    devtools: { enabled: false },
    modules: ['nuxt-swiper', 'nuxt-toastify', 'nuxt-auth-sanctum', '@nuxt/image'],
    app: {
        pageTransition: { name: 'layout', mode: 'out-in' },
    },
    runtimeConfig: {
        public: {
            backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL,
            yandexMapsApiKey: process.env.NUXT_PUBLIC_YANDEX_MAPS_API_KEY,
            dadataApiKey: process.env.NUXT_PUBLIC_DADATA_API_KEY,
        },
    },
    sanctum: {
        baseUrl: process.env.NUXT_PUBLIC_BACKEND_URL,
        redirect: {
            onAuthOnly: '/auth/login',
            onLogin: '/personal',
        },
    },
    nitro: {
        compressPublicAssets: true,
        routeRules: {
            '/api/cdek/**': {
                proxy: { to: `${process.env.NUXT_PUBLIC_BACKEND_URL}/api/cdek/**` },
            },
        },
    },
    build: {
        transpile: ['gsap'],
    },
    devServer: {
        port: 3000,
        host: 'localhost',
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
