<template>
  <div class="min-h-screen bg-WtB text-textClr font-body">
    <NuxtLayout>
      <NuxtPage />
      <BetaPasswordModal />
    </NuxtLayout>
    <NOAHChatModal />
  </div>
</template>

<script setup lang="ts">
import { NOAHChatModal } from '@/components/noahBot'
import { useSharedFiles } from '~/stores/sharedFiles';

const { t } = useI18n();
const runtimeConfig = useRuntimeConfig();
const sharedFilesUrl = runtimeConfig.public.pgsSharedFiles;
const sharedFiles = useSharedFiles();
const { data: customData } = await useAsyncData('customData', () => sharedFiles.getCustomData());

onMounted(async () => {
  if (!customData.value) {
    await refreshNuxtData('customData');
  }
});

const heroImagePath = `${sharedFilesUrl}/SuitOps_Landing/Hero/index.png`;
const baseUrl = computed(() => customData.value?.suitops?.url);

useHead({
  titleTemplate: '%s | SUITOPS',
  meta: [
    {
      key: 'description',
      name: 'description',
      content: computed(() => t('meta.indexPage.description'))
    },

    // Open Graph (Facebook, LinkedIn)
    { property: 'og:title', content: 'SuitOps - Solution de gestion d\'entreprise' },
    { property: 'og:description', content: computed(() => t('meta.indexPage.description')) },
    { property: 'og:image', content: heroImagePath },
    { property: 'og:url', content: baseUrl },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'fr_FR' },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'SuitOps - Solution de gestion d\'entreprise' },
    { name: 'twitter:description', content: computed(() => t('meta.indexPage.description')) },
    { name: 'twitter:image', content: heroImagePath },
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
    { rel: 'canonical', href: baseUrl }
  ]
});
</script>
