<template>
  <main>
    <!-- Hero section -->
    <header class="relative py-24 bg-cover bg-center"
      style="background-image: url('https://raw.githubusercontent.com/ProGestionSoft/Files/main/SuitOps_Landing/Hero/privacy.png')">
      <div class="absolute inset-0 bg-gradient-to-r from-ash to-ashAct opacity-80"></div>
      <div class="absolute inset-0 backdrop-blur-sm"></div>

      <div class="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center text-BtW">
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6" v-motion
          :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }">
          {{ $t('legalsPage.privacyHeroTitle') }}
        </h1>
        <p class="text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
          {{ $t('legalsPage.privacyHeroSubtitle') }}
        </p>
      </div>
    </header>

    <!-- Indicateur de chargement -->
    <Loader v-if="loading" />

    <!-- Gestion d'erreur -->
    <div v-if="error" class="text-center p-4 sm:p-6 md:p-8">
      <div class="mb-3 sm:mb-4">
        <IconMoodCry class="w-10 h-10 sm:w-12 sm:h-12 mx-auto" />
        <p class="text-danger text-sm sm:text-base">{{ error }}</p>
      </div>

      <button @click="fetchLegal"
        class="bg-primary text-WtB px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-secondary transition-colors text-sm sm:text-base">
        {{ $t('common.retryButton') }}
      </button>
    </div>

    <!-- Contenu principal -->
    <section class="py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8 relative">
      <div class="mb-6 sm:mb-8 md:mb-12 text-center">
        <p v-if="Content && formattedUpdatedAt" class="text-sm sm:text-base md:text-lg">
          {{ $t('legalsPage.lastUpdate') }}
          <span class="font-bold">{{ formattedUpdatedAt }}</span>
        </p>
      </div>

      <div v-if="!loading && tocItems.length" class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 relative">
        <!-- Table des matières mobile -->
        <div class="lg:hidden bg-ash rounded-lg shadow-md p-4 sticky top-20 z-10 max-h-[calc(50vh)] overflow-y-auto">
          <div class="flex items-center justify-between">
            <h2 class="text-lg sm:text-xl font-bold">{{ $t('legalsPage.tableOfContents') }}</h2>
            <button @click="mobileTocOpen = !mobileTocOpen" class="text-primary">
              <IconChevronDown v-if="!mobileTocOpen" class="w-5 h-5" />
              <IconChevronUp v-else class="w-5 h-5" />
            </button>
          </div>
          <ul v-if="mobileTocOpen" class="list-none pl-0 mt-2 space-y-1">
            <li v-for="item in tocItems" :key="item.id">
              <a href="#" @click.prevent="scrollToSection(item.id)" class="text-textClr hover:text-secondary text-sm">
                {{ item.text }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Table des matières desktop -->
        <div
          class="bg-ash hidden lg:block w-64 xl:w-80 flex-shrink-0 sticky top-24 self-start max-h-[calc(80vh)] overflow-y-auto toc-container rounded-lg">
          <div class="rounded-lg shadow-md mb-4">
            <div class="sticky top-0 bg-hsa text-WtB py-2 px-4 z-10">
              <h2 class="text-lg xl:text-xl font-bold text-center">{{ $t('legalsPage.tableOfContents') }}</h2>
            </div>
            <ul class="list-none pl-0 py-2 space-y-1">
              <li v-for="item in tocItems" :key="item.id"
                :class="{ 'pl-4': item.level === 'h2', 'pl-8': item.level === 'h3' }">
                <a href="#" @click.prevent="scrollToSection(item.id)" class="text-textClr hover:text-secondary text-sm">
                  {{ item.text }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Contenu de la page -->
        <div class="flex-1">
          <div v-if="Content"
            class="prose prose-sm sm:prose-base lg:prose-lg max-w-none bg-WtBAct rounded-lg shadow-sm p-4 sm:p-6 md:p-8 lg:p-10 border border-gray-100 leading-snug"
            v-html="Content.content"></div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import { SuitOpsServices } from '~/stores/SuitOpsServices.js'
import { IconMoodCry, IconChevronDown, IconChevronUp } from '@tabler/icons-vue'
import Loader from '~/components/Load/LLegalPage.vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

// SEO
useHead({
  title: t('legalsPage.privacyHeroTitle')
})

// Variables
const loading = ref(true)
const error = ref(null)
const Content = ref(null)
const mobileTocOpen = ref(false)

const fetchLegal = async () => {
  error.value = null
  loading.value = true
  let attempts = 0
  const maxAttempts = 2

  while (attempts < maxAttempts) {
    try {
      const response = await SuitOpsServices.getLegal('data_protection')
      let data = response.data?.data || response.data || null

      if (data && data.content) {
        data.content = data.content
          .replace(/<span[^>]*background-color: yellow;[^>]*>/g, '')
          .replace(/<\/span>/g, '</strong>')
      }

      Content.value = data

      // Génération du TOC
      await nextTick()
      generateTOC()
      loading.value = false
      return
    } catch (err) {
      attempts++
      console.error(`Erreur lors du chargement des données, tentative ${attempts}:`, err)
      if (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 500))
      } else {
        error.value = t('common.loadError', { object: t('footer.gdprLink') });
        loading.value = false
      }
    }
  }
}

onMounted(fetchLegal)

// Formatage de la date
const formattedUpdatedAt = computed(() => {
  if (Content.value && Content.value.updatedAt) {
    const date = new Date(Number(Content.value.updatedAt))
    return date.toLocaleDateString(locale.value, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }
  return ''
})

// Génération de la table des matières (TOC) à partir des titres h1, h2 et h3
const tocItems = ref([])

const generateTOC = () => {
  if (!Content.value || !Content.value.content) return
  const parser = new DOMParser()
  const doc = parser.parseFromString(Content.value.content, 'text/html')
  const headings = doc.querySelectorAll('h1, h2, h3')
  const items = []
  headings.forEach(heading => {
    const text = heading.textContent.trim()
    // Générer un id en se basant sur le texte (minuscules, tirets)
    let id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '')
    // Affecter l'id à la balise heading pour permettre le lien
    heading.id = id
    items.push({
      id,
      text,
      level: heading.tagName.toLowerCase()
    })
  })
  // Mise à jour du contenu avec les id ajoutés
  Content.value.content = doc.body.innerHTML
  tocItems.value = items
}

// Fonction de scroll fluide vers une section en tenant compte du header fixe
const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    const headerOffset = 80
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - headerOffset
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
    mobileTocOpen.value = false
  }
}
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}

/* Style de la scrollbar pour le TOC */
.toc-container {
  scrollbar-width: thin;
  scrollbar-color: #323c4f #cce3ff;
}

/* Ajustement du scroll-margin-top pour les titres */
.prose h1,
.prose h2,
.prose h3 {
  scroll-margin-top: 80px;
}

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