export default defineNuxtConfig({
    future: {
        compatibilityVersion: 4,
    },
    devtools: { enabled: false },
    modules: ['nuxt-swiper', 'nuxt-toastify'],
    runtimeConfig: {
        public: {
            backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL,
        },
    },
    nitro: {
        compressPublicAssets: true,
    },
    build: {
        transpile: ['gsap'],
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
