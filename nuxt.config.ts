export default defineNuxtConfig({
    future: {
        compatibilityVersion: 4,
    },
    devtools: { enabled: false },
    modules: [
        'nuxt-swiper',
        'nuxt-toastify',
        'nuxt-auth-sanctum',
        '@nuxt/image',
        '@nuxtjs/sitemap',
    ],
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
    image: {
        quality: 95,
        format: ['webp'],
        screens: {
            'xs': 320,
            'sm': 640,
            'md': 768,
            'lg': 1024,
            'xl': 1280,
            'xxl': 1536,
            '2xl': 1536,
        },
        densities: [1, 2],
        ipx: {
            maxAge: 60 * 60 * 24 * 365,
        },
    },
    sitemap: {
        sources: ['/api/sitemap/urls'],
        exclude: ['/auth/**'],
    },
    compatibilityDate: '2025-03-30',
})
