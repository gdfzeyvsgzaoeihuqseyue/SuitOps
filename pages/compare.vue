<template>
  <main>
    <!-- Hero section -->
    <header class="relative py-24 bg-cover bg-center"
      :style="{ backgroundImage: `url('${sharedFiles.paths.hero.compare}')` }">
      <div class="absolute inset-0 bg-gradient-to-r from-ash to-ashAct opacity-80"></div>
      <div class="absolute inset-0 backdrop-blur-sm"></div>

      <div class="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center text-BtW">
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6" v-motion
          :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }">
          {{ t('comparePage.heroTitle') }}
        </h1>
        <p class="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto px-2">
          {{ t('comparePage.heroSubtitle') }}
        </p>
      </div>
    </header>

    <!-- Contenu principal -->
    <section class="flex flex-col items-center pt-8 sm:pt-16 px-4 sm:px-5 py-12 sm:py-24">
      <h2 class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">{{ t('comparePage.comparisonTitle') }}</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full max-w-5xl">
        <div v-for="(version, i) in versions" :key="version.type"
          class="relative shadow-md sm:shadow-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col items-center text-center"
          v-motion :initial="{ opacity: 0, x: i === 0 ? -50 : 50 }" :enter="{ opacity: 1, x: 0 }">
          <span class="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none"
            :class="[version.bgOverlay, 'opacity-10 dark:opacity-20']"></span>

          <h2 :class="`text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-${version.color}`">
            {{ t(`comparePage.${version.translationKey}.title`) }}
          </h2>
          <p class="mb-3 sm:mb-4 text-sm sm:text-base">{{ t(`comparePage.${version.translationKey}.description`) }}</p>

          <ul class="text-left space-y-1 sm:space-y-2 w-full">
            <li v-for="(feature, index) in version.features" :key="index" class="flex items-start">
              <span :class="[
                'text-lg sm:text-xl mr-2 mt-0.5',
                feature.ok ? 'text-green-500' : 'text-danger'
              ]">
                {{ feature.ok ? '✔' : '✘' }}
              </span>
              <span class="text-sm sm:text-base">{{
                t(`comparePage.${version.translationKey}.features.${feature.translationKey}`) }}</span>
            </li>
          </ul>

          <!-- CTA bouton -->
          <a v-if="version.cta.external" :href="version.cta.href" target="_blank"
            class="mt-4 sm:mt-5 px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition text-sm sm:text-base"
            :class="version.cta.style">
            {{ t(`comparePage.${version.translationKey}.ctaText`) }}
          </a>

          <NuxtLink v-else :to="localePath(version.cta.to as string)"
            class="mt-4 sm:mt-5 px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition text-sm sm:text-base"
            :class="version.cta.style">
            {{ t(`comparePage.${version.translationKey}.ctaText`) }}
          </NuxtLink>
        </div>
      </div>

      <!-- Tableau comparatif -->
      <div class="mt-12 sm:mt-16 w-full max-w-5xl">
        <h2 class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">{{ t('comparePage.summaryTitle') }}</h2>

        <div class="overflow-x-auto">
          <table class="w-full bg-WtBAct shadow-md sm:shadow-lg rounded-xl sm:rounded-2xl overflow-hidden">
            <thead>
              <tr class="bg-textClr text-WtB">
                <th class="py-2 sm:py-3 px-3 sm:px-6 text-left text-sm sm:text-base">{{ t('comparePage.table.feature')
                  }}</th>
                <th class="py-2 sm:py-3 px-3 sm:px-6 text-center text-sm sm:text-base">{{
                  t('comparePage.table.webVersionColumn') }}</th>
                <th class="py-2 sm:py-3 px-3 sm:px-6 text-center text-sm sm:text-base">{{
                  t('comparePage.table.desktopVersionColumn') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in comparisonTable" :key="index"
                :class="index !== comparisonTable.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''">
                <td class="py-2 sm:py-3 px-3 sm:px-6 text-sm sm:text-base">{{
                  t(`comparePage.table.${row.translationKey}.feature`) }}</td>
                <td class="text-center text-sm sm:text-base py-2 sm:py-3 px-3 sm:px-6">{{
                  t(`comparePage.table.${row.translationKey}.web`) }}</td>
                <td class="text-center text-sm sm:text-base py-2 sm:py-3 px-3 sm:px-6">{{
                  t(`comparePage.table.${row.translationKey}.desktop`) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useSharedFiles } from '~/stores/sharedFiles';

const sharedFiles = useSharedFiles();
const { t } = useI18n()
const localePath = useLocalePath()

const { data: customData } = await useAsyncData('customData', () => sharedFiles.getCustomData());
const webUrl = computed(() => customData.value?.web?.url);

const versions = computed(() => [
  {
    type: 'web',
    translationKey: 'webVersion',
    color: 'primary',
    bgOverlay: 'bg-primary',
    description: '',
    features: [
      { ok: true, translationKey: 'accessibleEverywhere' },
      { ok: true, translationKey: 'automaticUpdates' },
      { ok: true, translationKey: 'multipleOS' },
      { ok: true, translationKey: 'worksOnAllDevices' },
      { ok: false, translationKey: 'internetRequired' },
      { ok: false, translationKey: 'slowerPerformance' }
    ],
    cta: {
      href: `${webUrl.value}`,
      external: true,
      style: 'bg-primary text-WtB hover:bg-secondary'
    }
  },
  {
    type: 'desktop',
    translationKey: 'desktopVersion',
    color: 'secondary',
    bgOverlay: 'bg-bgClr',
    description: '',
    features: [
      { ok: true, translationKey: 'offlineMode' },
      { ok: true, translationKey: 'betterPerformance' },
      { ok: true, translationKey: 'windowsCompatible' },
      { ok: true, translationKey: 'advancedIntegration' },
      { ok: false, translationKey: 'installationRequired' },
      { ok: false, translationKey: 'compatibilityIssues' }
    ],
    cta: {
      to: '/download',
      external: false,
      style: 'bg-secondary text-WtB hover:bg-primary'
    }
  }
])

const comparisonTable = [
  {
    translationKey: 'accessibility',
    web: '',
    desktop: '',
  },
  {
    translationKey: 'updates',
    web: '',
    desktop: '',
  },
  {
    translationKey: 'performance',
    web: '',
    desktop: '',
  },
  {
    translationKey: 'internetRequired',
    web: '',
    desktop: '',
  },
  {
    translationKey: 'compatibility',
    web: '',
    desktop: '',
  },
]

useHead({
  title: t('comparePage.heroTitle'),
})
</script>

<style scoped>
tbody tr:nth-child(even) {
  background-color: #e1e1e1;
}

.dark tbody tr:nth-child(even) {
  background-color: #363636;
}

/* Mobile */
@media (max-width: 640px) {
  table {
    min-width: 600px;
    /* Défilement horizontal sur petits écrans */
  }
}
</style>