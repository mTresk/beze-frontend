export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    'nuxt-toastify',
    'nuxt-auth-sanctum',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@vite-pwa/nuxt',
    'nuxt-schema-org',
    'vue3-perfect-scrollbar/nuxt',
    '@nuxtjs/robots',
    'nuxt-yandex-metrika',
  ],
  vue: {
    compilerOptions: {
      isCustomElement: tag => ['swiper-container', 'swiper-slide'].includes(tag),
    },
  },
  app: {
    pageTransition: { name: 'layout', mode: 'out-in' },
  },
  runtimeConfig: {
    public: {
      backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL,
      appUrl: process.env.NUXT_PUBLIC_APP_URL,
      yandexMapsApiKey: process.env.NUXT_PUBLIC_YANDEX_MAPS_API_KEY,
      dadataApiKey: process.env.NUXT_PUBLIC_DADATA_API_KEY,
      REVERB_APP_ID: process.env.NUXT_PUBLIC_REVERB_APP_ID,
      REVERB_APP_KEY: process.env.NUXT_PUBLIC_REVERB_APP_KEY,
      REVERB_APP_SECRET: process.env.NUXT_PUBLIC_REVERB_APP_SECRET,
      REVERB_HOST: process.env.NUXT_PUBLIC_REVERB_HOST,
      REVERB_PORT: process.env.NUXT_PUBLIC_REVERB_PORT,
      REVERB_SCHEME: process.env.NUXT_PUBLIC_REVERB_SCHEME,
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
  devServer: {
    port: 3000,
    host: 'localhost',
  },
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
  css: ['@/assets/styles'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use '@/assets/styles/helpers' as *;`,
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
    quality: 100,
    format: ['webp'],
    densities: [1, 2],
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      'xxl': 1536,
      '2xl': 1536,
    },
    ipx: {
      maxAge: 60 * 60 * 24 * 365,
    },
  },
  sitemap: {
    sources: ['/api/sitemap/urls'],
    exclude: ['/auth/**', '/personal', '/cart', '/favorites', '/success', '/catalog/search', '/?feed=rss2', '/order/**'],
  },
  robots: {
    disallow: ['/auth/**', '/personal', '/cart', '/favorites', '/success', '/catalog/search', '/?feed=rss2', '/order/**'],
  },
  pwa: {
    registerType: 'autoUpdate',
    workbox: { navigateFallback: null, globPatterns: ['**/*.{js,css,svg,ico}'] },
    manifest: {
      name: 'Beze Studio',
      short_name: 'Beze',
      description: 'Одежда на утро невесты и для дома',
      theme_color: '#ffffff',
      lang: 'ru',
      icons: [
        {
          src: '/web-app-manifest-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/web-app-manifest-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/maskable-icon.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
      screenshots: [
        {
          src: 'screenshot.png',
          sizes: '3840x2160',
          type: 'image/png',
          form_factor: 'wide',
          label: 'Beze Studio',
        },
        {
          src: 'screenshot-mobile.png',
          sizes: '1290x2796',
          type: 'image/png',
          label: 'Beze Studio Mobile',
        },
      ],
    },
  },
  schemaOrg: {
    defaults: false,
  },
  yandexMetrika: {
    id: '103546868',
    debug: false,
    delay: 0,
    options: {
      webvisor: true,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      ecommerce: true,
    },
  },
  compatibilityDate: '2025-03-30',
})
