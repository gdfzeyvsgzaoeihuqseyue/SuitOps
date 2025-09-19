<template>
  <div class="min-h-screen bg-WtB text-textClr font-body">
    <NuxtLayout>
      <NuxtPage />
      <BetaPasswordModal />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const sharedFilesUrl = runtimeConfig.public.pgsSharedFiles;

const heroImagePath = `${sharedFilesUrl}/SuitOps_Landing/Hero/index.png`;
const baseUrl = "https://suitops.netlify.app";

useHead({
  titleTemplate: '%s | SUITOPS',
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
    { property: 'og:image', content: heroImagePath },
    { property: 'og:url', content: baseUrl },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'fr_FR' },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'SuitOps - Solution de gestion d\'entreprise' },
    { name: 'twitter:description', content: 'Simplifiez votre gestion d\'entreprise avec une solution tout-en-un.' },
    { name: 'twitter:image', content: heroImagePath },
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
    { rel: 'canonical', href: baseUrl }
  ]
});
</script>
