<template>
  <!-- Préférences -->
  <div class="mb-6">
    <prefSettings />
  </div>

  <div
    class="bg-WtB rounded-xl shadow-lg p-8 sm:p-10 md:p-12 max-w-5xl w-full flex flex-col-reverse md:flex-row gap-8 items-center">
    <!-- Colonne texte -->
    <div class="md:w-1/2 text-center md:text-left space-y-6">
      <!-- Logos Desktop -->
      <div class="flex-shrink-0 items-center justify-center mx-4 hidden lg:block">
        <img :src="sharedFiles.paths.logo.dc" alt="SuitOps" class="h-14 mx-auto md:mx-0 dark:hidden" />
        <img :src="sharedFiles.paths.logo.dw" alt="SuitOps" class="h-14 mx-auto md:mx-0 hidden dark:block" />
      </div>

      <!-- Titre -->
      <h1 :class="['text-7xl font-extrabold hidden sm:block', statusColor]">
        {{ error.statusCode }}
      </h1>
      <h2 class="text-2xl sm:text-3xl font-semibold">
        {{ error.title }}
      </h2>
      <p class="text-base sm:text-lg leading-relaxed">
        {{ error.message }}
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
    <div class="md:w-1/2 justify-center">
      <!-- Logos Mobiles -->
      <div class="sm:hidden flex-shrink-0 flex items-center mx-4 justify-center">
        <img :src="sharedFiles.paths.logo.mc" alt="Logo" class="h-12 w-auto dark:hidden" />
        <img :src="sharedFiles.paths.logo.mw" alt="Logo" class="h-12 w-auto hidden dark:block" />
      </div>
      <img :src="error.image" :alt="`Erreur ${error.statusCode}`" class="w-full max-w-sm h-auto object-contain" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { IconHome, IconArrowLeft, IconArrowRight } from '@tabler/icons-vue'
import { useSharedFiles } from '~/stores/sharedFiles'

const sharedFiles = useSharedFiles()
const router = useRouter()
const { t } = useI18n()
const localePath = useLocalePath()

const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
})

/**
 * Détermine la couleur du code en fonction du type d'erreur
 */
const statusColor = computed(() => {
  switch (props.error.statusCode) {
    case 404:
      return 'text-primary'
    case 403:
      return 'text-red-600'
    case 500:
      return 'text-yellow-600'
    default:
      return 'text-gray-600'
  }
})
</script>
