// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },

  modules: [
    ['nuxt-gtag', {
      id: process.env.GTAG_ID || 'G-NHBTYMN3FL',
      enabled: process.env.NODE_ENV === 'production'
    }],
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts',
    '@vueuse/motion/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],

  site: {
    url: 'https://suitops.netlify.app',
    name: 'SuitOps',
  },

   sitemap: {
    xslColumns: [
      { label: 'URL', width: '50%' },
      { label: 'Last Modified', select: 'sitemap:lastmod', width: '25%' },
      { label: 'Priority', select: 'sitemap:priority', width: '12.5%' },
      { label: 'Change Frequency', select: 'sitemap:changefreq', width: '12.5%' },
      { label: 'Hreflangs', select: 'count(xhtml:link)', width: '25%' },
    ],
  },

  runtimeConfig: {
    mistralApiKey: process.env.MISTRAL_API_KEY,
    geminiApiKey: process.env.GEMINI_API_KEY,
    
    public: {
      suitOpsBaseAPI: process.env.SUITOPS_API_URL,
      pgsBaseAPI: process.env.PGS_API_URL,
      pgsSharedFiles: process.env.PGS_SHARED_FILES,
      betaMode: process.env.NUXT_BETA_MODE === 'true',
      betaRegisterPass: process.env.BETA_REGISTER_PASS,
      siteIdentifier: process.env.NUXT_PUBLIC_SITE_IDENTIFIER || 'suitops',
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
      fallbackLocale: 'system' as any,
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
        { name: 'author', content: 'Pro Gestion Soft' },
        { name: 'keywords', content: 'gestion entreprise, PME, Afrique, Bénin, SaaS, SuitOps, PGS, Pro Gestion Soft' },
        { name: 'google-site-verification', content: 'OdKxHpVkBSxk0mj4vD4OTmZPdVi5pWzyCu4QPIMHy9A' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://suitops.netlify.app' }
      ]
    }
  },
})