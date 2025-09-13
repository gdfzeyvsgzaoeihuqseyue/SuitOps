<template>
    <footer v-if="!isIframeMode" class="py-6 sm:py-8 mt-8 bg-WtBAct mt-auto border-t">
      <div class="container mx-auto px-4 sm:px-6">
        <div class="flex flex-col lg:flex-row justify-between items-start">
          <!-- Gauche : Info -->
          <div class="w-full mb-6 sm:mb-8 text-center sm:text-left border-b sm:border-none pb-6 sm:pb-0 px-0 sm:px-8">
            <div class="flex justify-center sm:justify-start items-center">
              <span class="font-bold text-lg">SUITOPS</span>
            </div>
            <p class="mt-2 text-sm sm:text-base" v-html="t('footer.tagline')"></p>

            <!-- Liens sociaux -->
            <ul role="list" class="mt-4 flex justify-center sm:justify-start space-x-4">
              <SocialCustomLink />
            </ul>
            <p class="text-xs sm:text-sm mt-3 sm:mt-2">
              {{ t('footer.copyright', { year: new Date().getFullYear() }) }}
            </p>
          </div>

          <!-- Droit : Navigation -->
          <div class="w-full mt-4 sm:mt-0">
            <div class="grid grid-cols-2 gap-6 sm:gap-8 sm:grid-cols-4 px-6">
              <div v-for="section in navSections" :key="section.title" class="mb-4 sm:mb-0">
                <h3 class="text-xs sm:text-sm font-semibold mb-2 uppercase">{{ section.title }}</h3>
                <ul class="space-y-1 text-xs sm:text-sm">
                  <li v-for="link in section.links" :key="link.name">
                    <component :is="link.disabled ? 'span' : link.external ? 'a' : NuxtLink"
                      :href="!link.disabled && link.external ? link.to : undefined"
                      :to="!link.disabled && !link.external ? localePath(link.to) : undefined"
                      :target="!link.disabled && link.external ? '_blank' : undefined"
                      :class="[link.disabled ? 'not-link' : 'hover:text-primary', 'py-1 block']"
                      :title="link.disabled ? t('footer.unavailableTooltip', { name: t(`footer.${link.translationKey}`) }) : undefined">
                      {{ t(`footer.${link.translationKey}`) }}
                    </component>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Copyright -->
            <div
              class="flex flex-col sm:flex-row items-center border-t mt-4 pt-4 justify-center md:justify-end sm:justify-around text-center">
              <p class="font-mono text-xs sm:text-sm flex items-center">
                {{ t('footer.madeBy') }}
                <span
                  class="mx-1 sm:mx-2 inline-flex items-center gap-2 px-2 py-1 rounded-full bg-transparent text-xs font-bold p-1 inline-block border border-textClr hover:bg-blue-100 hover:text-primary transition-all">
                  <!-- Logo PGS -->
                  <div
                    class="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-100 overflow-hidden border border-gray-300">
                    <img :src="sharedFiles.paths.logo.pgs" alt="PGS" class="w-4 h-4 object-contain" />
                  </div>

                  <!-- Marque -->
                  <a :href="footerData?.brandUrl" target="_blank">{{ footerData?.brand }}</a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'
import { useI18n } from 'vue-i18n'
import { useIframeMode } from '~/composables/useIframeMode.js'
import { useSharedFiles } from '~/stores/sharedFiles';

const sharedFiles = useSharedFiles();
const { t } = useI18n()
const localePath = useLocalePath()
const { isIframeMode } = useIframeMode()

// Récupérer les données du footer depuis le store
type FooterData = { brand: string; brandUrl: string }
const { data: footerData, pending, error } = await useAsyncData<FooterData>(
  'footerData',
  () => sharedFiles.getFooterData()
)


// Sections de navigation 
const navSections: any[] = [
  {
    title: t('footer.brandSectionTitle'),
    links: [
      { name: 'A propos', to: '/about', translationKey: 'aboutLink' },
      { name: 'Roadmap', to: '', disabled: true, translationKey: 'roadmapLink' },
      { name: 'Next Summit', to: '', disabled: true, translationKey: 'nextSummitLink' },
      { name: 'Nous soutenir', to: '/support', translationKey: 'supportUsLink' }
    ]
  },
  {
    title: t('footer.legalSectionTitle'),
    links: [
      { name: 'FAQ', to: '/faq', translationKey: 'faqLink' },
      { name: 'Mentions légales', to: '/legal', translationKey: 'legalNoticeLink' },
      { name: 'CGU', to: '/terms', translationKey: 'termsOfUseLink' },
      { name: 'RGPD', to: '/privacy', translationKey: 'gdprLink' }
    ]
  },
  {
    title: t('footer.resourcesSectionTitle'),
    links: [
      { name: 'Blog', to: '/blog', translationKey: 'blogLink' },
      { name: 'Forum', to: '/forum', translationKey: 'forumLink' },
      { name: 'Documentation', to: '', disabled: true, translationKey: 'documentationLink' },
      { name: 'Formation', to: '', disabled: true, translationKey: 'trainingLink' }
    ]
  },
  {
    title: t('footer.devHubSectionTitle'),
    links: [
      { name: 'API référence', to: '', disabled: true, external: true, translationKey: 'apiReferenceLink' },
      { name: 'Studio', to: '/forum', disabled: true, translationKey: 'studioLink' },
      { name: 'CodeSphère', to: '', disabled: true, translationKey: 'codeSphereLink' },
      { name: 'Template', to: '', disabled: true, translationKey: 'templateLink' }
    ]
  }
]
</script>

<style scoped>
.not-link {
  @apply text-gray-400/40 cursor-not-allowed opacity-40;
}
</style>