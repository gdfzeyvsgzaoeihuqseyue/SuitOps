<template>
  <main>
    <!-- Header -->
    <header class="relative py-24 bg-cover bg-center"
      style="background-image: url('https://raw.githubusercontent.com/ProGestionSoft/Files/main/SuitOps_Landing/Hero/features.png')">
      <div class="absolute inset-0 bg-gradient-to-r from-ash to-ashAct opacity-80"></div>
      <div class="absolute inset-0 backdrop-blur-sm"></div>

      <div class="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center text-BtW">
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6" v-motion
          :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }">
          {{ t('featuresPage.heroTitle') }}
        </h1>
        <p class="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto px-2">
          {{ t('featuresPage.heroSubtitle') }}
        </p>
      </div>
    </header>

    <!-- Fonctionnalité princiale -->
    <section class="p-6 sm:p-8 md:p-16 flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 bg-WtBAct">
      <img src="https://raw.githubusercontent.com/ProGestionSoft/Files/main/SuitOps_Landing/Others/HeroImg.png"
        :alt="t('featuresPage.alt')" class="w-full md:w-1/3 rounded-xl drop-shadow-xl max-w-md mx-auto" />

      <div
        class="w-full md:w-1/2 p-4 sm:p-6 rounded-xl shadow-lg sm:shadow-xl transition-transform duration-300 border border-textClr hover:border-primary"
        :class="currentFeature.bgClass" v-motion :initial="{ opacity: 0, scale: 0.8 }" :enter="{ opacity: 1, scale: 1 }"
        :leave="{ opacity: 0, scale: 1.2 }" :key="currentFeature.title">

        <div class="relative rounded-lg overflow-hidden">
          <div class="absolute inset-0">
            <component :is="currentFeature.icon" class="w-full h-full object-cover opacity-5" aria-hidden="true" />
            <div class="absolute inset-0"></div>
          </div>

          <div class="flex items-center text-primary gap-3 sm:gap-4 mb-3 sm:mb-4">
            <component :is="currentFeature.icon" class="h-8 w-8 sm:h-10 sm:w-10" aria-hidden="true" />
            <h2 class="text-xl sm:text-2xl font-bold">{{ currentFeature.title }}</h2>
          </div>
          <p class="text-sm sm:text-base">{{ currentFeature.description }}</p>
        </div>
      </div>
    </section>

    <!-- Toutes les fonctionnalités -->
    <section class="p-6 sm:p-8 md:p-16">
      <div class="max-w-3xl mx-auto text-center mb-6 sm:mb-8">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold">{{ t('featuresPage.allFeaturesTitle') }}</h2>
      </div>

      <div class="container mx-auto px-4">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-16">
          <div v-for="(feature, index) in displayedFeatures" :key="index"
            class="group relative p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md hover:scale-[1.03] sm:hover:scale-105 transition-transform duration-300 border border-textClr hover:border-primary"
            :class="feature.bgClass" v-motion :initial="{ opacity: 0, y: 50 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 50 * index } }">
            <div
              class="absolute inset-0 bg-gradient-to-br from-primary to-primary rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-10 transition-opacity">
            </div>
            <div class="relative rounded-lg overflow-hidden">
              <div class="absolute inset-0 -right-[100%]">
                <component :is="feature.icon" class="w-full h-full object-cover opacity-5" />
                <div class="absolute inset-0"></div>
              </div>

              <div class="flex items-center gap-2 sm:gap-3 mb-2">
                <div
                  class="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-primary text-xl sm:text-2xl">
                  <span class="absolute inset-0 bg-primary opacity-10 dark:opacity-20 rounded-full"></span>
                  <component :is="feature.icon" class="h-5 w-5 sm:h-6 sm:h-6" aria-hidden="true" />
                </div>

                <h3 class="text-lg sm:text-xl font-semibold"> {{ feature.title }} </h3>
              </div>

              <p class="text-xs sm:text-sm"> {{ feature.description }} </p>
            </div>
          </div>
        </div>

        
        <div class="sm:hidden flex flex-col items-center gap-4 mt-4">
          <!-- Pagination Mobile -->
          <usePagination v-show="showFullMobileView" 
            :totalItems="features.length" 
            :itemsPerPage="mobileItemsPerPage"
            :currentPage="currentPage"
            :itemLabel="t('featuresPage.alt')"
            :perPageOptions="[3, 6, 9, 15]" 
            @update:currentPage="currentPage = $event"
            @update:itemsPerPage="mobileItemsPerPage = $event" />

          <!-- Bouton Plus/Moins de fonctionnalités -->
          <button @click="toggleMobileView"
            class="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-primary text-WtB hover:bg-secondary transition-colors duration-300">
            {{ showFullMobileView ? t('common.showLess') : t('common.showMore') }}
            <IconChevronDown :class="{ 'rotate-180': showFullMobileView }"
              class="w-5 h-5 transition-transform duration-300" />
          </button>
        </div>

        <!-- Pagination Desktop -->
        <usePagination v-if="!isMobileView" 
          :totalItems="features.length" 
          :itemsPerPage="desktopItemsPerPage"
          :currentPage="currentPage" 
          :itemLabel="t('featuresPage.alt')"
          :perPageOptions="[4, 8, 12, 16]" 
          @update:currentPage="currentPage = $event"
          @update:itemsPerPage="desktopItemsPerPage = $event" />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import { useFeatures } from '~/composables/useFeatures'
import { useI18n } from 'vue-i18n'
import usePagination from '~/components/usePagination.vue'
import { IconChevronDown } from '@tabler/icons-vue'

const { t } = useI18n()

useHead({
  title: t('featuresPage.heroTitle'),
})

const { features } = useFeatures()

const currentFeature = ref(features[Math.floor(Math.random() * features.length)])
let featureInterval: number | null = null

// Pagination et Logique sur mobile
const currentPage = ref(1)
const desktopItemsPerPage = ref(8)
const mobileItemsPerPage = ref(6)

const mobileFeatureLimit = 3

const isMobileView = ref(false)
const showFullMobileView = ref(false)

// Dimensionnement
const checkMobileView = () => {
  isMobileView.value = window.innerWidth < 640
}

// Features to actually display in the grid
const displayedFeatures = computed(() => {
  if (isMobileView.value && !showFullMobileView.value) {
    return features.slice(0, mobileFeatureLimit)
  } else {
    const itemsPerPageToUse = isMobileView.value ? mobileItemsPerPage.value : desktopItemsPerPage.value;
    const start = (currentPage.value - 1) * itemsPerPageToUse
    const end = start + itemsPerPageToUse
    return features.slice(start, end)
  }
})

// Fonnction pour masquer sur mobile
const toggleMobileView = () => {
  showFullMobileView.value = !showFullMobileView.value
  currentPage.value = 1
}

// Watchers
watch(desktopItemsPerPage, () => {
  currentPage.value = 1
})
watch(mobileItemsPerPage, () => {
  currentPage.value = 1
})

watch(isMobileView, (newValue, oldValue) => {
  if (newValue && !oldValue) {
    showFullMobileView.value = false;
    currentPage.value = 1; // Restaurer pagination
  }
});

// Fonction pour filtrage aléatoire
const randomizeFeature = () => {
  const randomIndex = Math.floor(Math.random() * features.length)
  currentFeature.value = features[randomIndex]
}

onMounted(() => {
  featureInterval = window.setInterval(randomizeFeature, 30000)
  checkMobileView()
  window.addEventListener('resize', checkMobileView)
})

onBeforeUnmount(() => {
  if (featureInterval) {
    clearInterval(featureInterval)
  }
  window.removeEventListener('resize', checkMobileView)
})
</script>

<style scoped>
/* Optimisations pour mobile */
@media (max-width: 640px) {
  .hover\:scale-\[1\.03\] {
    transform: scale(1.03);
  }
}
</style>