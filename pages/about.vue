<template>
  <main>
    <!-- Hero section -->
    <header class="relative py-24 bg-cover bg-center"
    style="background-image: url('https://raw.githubusercontent.com/ProGestionSoft/Files/main/SuitOps_Landing/Hero/about.png')">
    <div class="absolute inset-0 bg-gradient-to-r from-ash to-ashAct opacity-80"></div>
    <div class="absolute inset-0 backdrop-blur-sm"></div>

    <div class="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center text-BtW">
      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6" v-motion :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0 }">
        {{ $t('legalsPage.aboutHeroTitle') }}
      </h1>
      <p class="text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
        {{ $t('legalsPage.aboutHeroSubtitle') }}
      </p>
    </div>
  </header>

    <!-- Contenu principal -->
    <section class="py-6 sm:py-8 md:py-12 px-8 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <!-- Indicateur de chargement et gestion d'erreur -->
        <Loader v-if="loading" />

        <div v-if="error" class="text-center p-4 sm:p-6 md:p-8">
          <div class="mb-3 sm:mb-4">
            <IconMoodCry class="w-10 h-10 sm:w-12 sm:h-12 mx-auto" />
            <p class="text-danger text-sm sm:text-base">{{ error }}</p>
          </div>

          <button @click="fetchAbout"
            class="bg-primary text-WtB px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-secondary transition-colors text-sm sm:text-base">
            {{ t('common.retryButton') }}
          </button>
        </div>

        <!-- Affichage du contenu de la page -->
        <div v-if="Content"
          class="prose prose-sm sm:prose-base lg:prose-lg max-w-none bg-WtBAct text-BtW rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 md:p-8 lg:p-12 border leading-snug"
          v-html="Content.content"></div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { SuitOpsServices } from '~/services/SuitOpsServices.js'
import { IconMoodCry } from '@tabler/icons-vue'
import Loader from '~/components/Load/LAbout.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: t('legalsPage.aboutHeroTitle')
})

const loading = ref(true)
const error = ref(null)
const Content = ref(null)

const fetchAbout = async () => {
  error.value = null
  loading.value = true
  let attempts = 0
  const maxAttempts = 2

  while (attempts < maxAttempts) {
    try {
      const response = await SuitOpsServices.getLegal('about');
      Content.value = response.data?.data || response.data || [];
      loading.value = false
      return
    } catch (err) {
      attempts++
      console.error(`Erreur lors du chargement du contenu de la page, tentative ${attempts}:`, err)
      if (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 500))
      } else {
        error.value = t('common.loadError', { object: t('navbar.about') });
        loading.value = false
      }
    }
  }
}

onMounted(fetchAbout)
</script>

<style scoped>
.dark .prose {
  color: inherit !important;
}

.dark .prose :deep(*) {
  color: inherit !important;
}

.dark .prose :deep(a) {
  color: var(--color-primary) !important;
}

.dark .prose :deep(em), 
.dark .prose :deep(strong) {
  color: inherit !important;
  font-weight: bold;
}
</style>