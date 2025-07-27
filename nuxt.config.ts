// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },

  modules: [
    ['nuxt-gtag', {
      id: process.env.GTAG_ID || 'G-PZGPXME136', 
      enabled: process.env.NODE_ENV === 'production'
    }],
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts',
    '@vueuse/motion/nuxt',
    '@nuxtjs/color-mode'
  ],

  runtimeConfig: {
    public: {
      suitOpsBaseAPI: process.env.SUITOPS_API_URL,
      pgsBaseAPI: process.env.PGS_API_URL,
      betaMode: process.env.NUXT_BETA_MODE === 'true',
      betaRegisterPass: process.env.BETA_REGISTER_PASS
    }
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    storageKey: 'nuxt-color-mode'
  },
  
  i18n: {
    locales: [
      { code: 'fr', lang: 'fr-FR', name: 'Français', file: 'fr.json' },
      { code: 'en', lang: 'en-US', name: 'English', file: 'en.json' }
    ],
    langDir: 'locales/',
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'system'
    },
    compilation: {
      strictMessage: false
    }
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: '~/tailwind.config.ts'
  },

  googleFonts: {
    display: 'swap',
    families: {
      'Nunito+Sans': [400, 500, 600, 700],
      'Inter': [400, 500, 600, 700],
      'Poppins': [600, 700],
      'Offside': [400],
    }
  },

  app: {
    head: {
      title: 'SuitOps - Solution complète de gestion d\'entreprise',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          key: 'description',
          name: 'description',
          content: 'Plateforme complète de gestion d\'entreprise.'
        },
        { name: 'author', content: 'Pro Gestion Soft' },
        { name: 'keywords', content: 'gestion entreprise, PME, Afrique, Bénin, SaaS, SuitOps, PGS, Pro Gestion Soft' },

        // Open Graph (Facebook, LinkedIn)
        { property: 'og:title', content: 'SuitOps - Solution de gestion d\'entreprise' },
        { property: 'og:description', content: 'Simplifiez votre gestion d\'entreprise avec une solution tout-en-un.' },
        { property: 'og:image', content: 'https://raw.githubusercontent.com/ProGestionSoft/Files/main/SuitOps_Landing/Hero/index.png' },
        { property: 'og:url', content: 'https://suitops.com' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'fr_FR' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'SuitOps - Solution de gestion d\'entreprise' },
        { name: 'twitter:description', content: 'Simplifiez votre gestion d\'entreprise avec une solution tout-en-un.' },
        { name: 'twitter:image', content: 'https://raw.githubusercontent.com/ProGestionSoft/Files/main/SuitOps_Landing/Hero/index.png' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://suitops.com' }
      ]
    }
  },
})