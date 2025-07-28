<template> 
  <div class="min-h-screen flex flex-col items-center justify-center bg-WtBAct text-textClr p-4">
    <!-- Préférences -->
    <div class="mb-6">
      <prefSettings />
    </div>

    <!-- Conteneur principal -->
    <div
      class="bg-WtB rounded-xl shadow-lg p-8 sm:p-10 md:p-12 max-w-5xl w-full flex flex-col md:flex-row gap-8 items-center">
      <!-- Colonne texte -->
      <div class="md:w-1/2 text-center md:text-left space-y-6">
        <!-- Logos Desktop -->
        <div class="flex-shrink-0 items-center justify-center mx-4 hidden lg:block">
          <img src="/img/logoDeskCol.png" alt="SuitOps" class="h-14 mx-auto md:mx-0 dark:hidden" />
          <img src="/img/logoDeskWhite.png" alt="SuitOps" class="h-14 mx-auto md:mx-0 hidden dark:block" />
        </div>

        <!-- Logos Mobiles -->
        <div class="sm:hidden flex-shrink-0 flex items-center mx-4 justify-center">
          <img src="/img/logoMobCol.png" alt="Logo" class="h-12 w-auto dark:hidden" />
          <img src="/img/logoMobWhite.png" alt="Logo" class="h-12 w-auto hidden dark:block" />
        </div>

        <!-- Titre -->
        <h1 class="text-7xl font-extrabold text-primary">404</h1>
        <h2 class="text-2xl sm:text-3xl font-semibold">
          {{ t('errorPage.subtitle') }}
        </h2>
        <p class="text-base sm:text-lg leading-relaxed">
          {{ t('errorPage.message') }}
        </p>

        <!-- Boutons -->
        <div class="flex flex-col sm:flex-row gap-4">
          <NuxtLink :to="localePath('/')"
            class="flex items-center justify-center px-6 py-3 bg-primary text-WtB rounded-full shadow-md hover:bg-secondary hover:scale-105 transition-transform duration-300">
            <IconHome class="w-5 h-5 mr-2" />
            {{ t('errorPage.homeButton') }}
          </NuxtLink>
          <button @click="router.go(-1)"
            class="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-full hover:bg-WtBAct hover:scale-105 transition-transform duration-300">
            <IconArrowLeft class="w-5 h-5 mr-2" />
            {{ t('errorPage.backButton') }}
          </button>
        </div>

        <!-- Suggestions -->
        <div class="mt-6">
          <h3 class="text-lg font-semibold mb-3">
            {{ t('errorPage.suggestionsTitle') }}
          </h3>
          <ul class="space-y-2 text-base">
            <li class="flex items-start">
              <IconArrowRight class="text-primary w-5 h-5 mr-2 mt-1" />
              <span>
                {{ t('errorPage.visit') }}
                <NuxtLink :to="localePath('/')" class="text-primary hover:underline">
                  {{ t('errorPage.homeLink') }}
                </NuxtLink>
              </span>
            </li>
            <li class="flex items-start">
              <IconArrowRight class="text-primary w-5 h-5 mr-2 mt-1" />
              {{ t('errorPage.checkUrl') }}
            </li>
            <li class="flex items-start">
              <IconArrowRight class="text-primary w-5 h-5 mr-2 mt-1" />
              <span>
                <NuxtLink :to="localePath('/contact')" class="text-primary hover:underline">
                  {{ t('errorPage.contactLink') }}
                </NuxtLink>
                {{ t('errorPage.contactSuffix') }}
              </span>
            </li>
            <li class="flex items-start">
              <IconArrowRight class="text-primary w-5 h-5 mr-2 mt-1" />
              <span>
                <NuxtLink :to="localePath('/faq')" class="text-primary hover:underline">
                  {{ t('errorPage.faqLink') }}
                </NuxtLink>
                {{ t('errorPage.faqSuffix') }}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Colonne image -->
      <div class="md:w-1/2 flex justify-center">
        <img src="https://www.disneyclips.com/images5/images/sadness5.png" alt="Illustration erreur"
          class="w-full max-w-sm h-auto object-contain" />
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer class="py-4 border-t bg-WtBAct">
    <div class="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto w-full gap-4 px-4">
      <!-- Logos Desktop -->
      <div class="flex-shrink-0 items-center justify-center mx-4 hidden lg:block">
        <img src="/img/logoDeskCol.png" alt="Logo" class="h-12 w-auto dark:hidden" />
        <img src="/img/logoDeskWhite.png" alt="Logo" class="h-12 w-auto hidden dark:block" />
      </div>

      <!-- Logos Mobiles -->
      <div class="sm:hidden flex-shrink-0 flex items-center mx-4">
        <img src="/img/logoMobCol.png" alt="Logo" class="h-12 w-auto dark:hidden" />
        <img src="/img/logoMobWhite.png" alt="Logo" class="h-12 w-auto hidden dark:block" />
      </div>

      <div>
        <p>{{ t('footer.copyright', { year: new Date().getFullYear() }) }}</p>
      </div>

      <div class="flex space-x-6">
        <ul role="list" class="space-x-4 flex">
          <SocialLink />
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { IconHome, IconArrowLeft, IconArrowRight } from '@tabler/icons-vue'

const router = useRouter()
const { t } = useI18n()
const localePath = useLocalePath()

// SEO
useHead({
  title: t('errorPage.title'),
  meta: [{ name: 'description', content: t('errorPage.message') }]
})

definePageMeta({
  layout: false
})
</script>
