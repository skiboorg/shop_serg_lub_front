import Aura from '@primeuix/themes/lara';

export default defineNuxtConfig({
  devtools: { enabled: true },
  site: { indexable: false },

  future: {
    compatibilityVersion: 4
  },

  modules: [
    '@pinia/nuxt',
    "@nuxtjs/tailwindcss",
    "@primevue/nuxt-module",
    'nuxt3-notifications',
    'vue3-carousel-nuxt',
    '@nuxtjs/robots',
    'nuxt-marquee',
  ],

  css: [
    '~/assets/styles/tailwind.css',
    '~/assets/styles/sass/style.sass',
    'primeicons/primeicons.css',
    '~/assets/styles/vars.css',
  ],

  ssr: false,

  primevue: {

    autoImport: true,
    components: {
      exclude: ['form','chart']
    },
    options: {

      theme: {
        preset: Aura
      }
    },
    importTheme: { from: '~/themes/theme.js' },
  },

  runtimeConfig: {
    public:{
      apiUrl: 'http://127.0.0.1:8000',
      //apiUrl: 'https://notcatart.com',

    }
  },
  compatibilityDate: '2025-04-07',
})