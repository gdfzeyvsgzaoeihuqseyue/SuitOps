<template>
  <section class="overflow-hidden">
    <div class="container mx-auto px-4">
      <!-- Gestion de l'erreur -->
      <div v-if="error" class="text-center p-4 sm:p-8">
        <div class="mb-3 sm:mb-4">
          <IconMoodCry class="w-10 h-10 sm:w-12 sm:h-12 mx-auto" />
          <p class="text-danger text-sm sm:text-base">{{ error }}</p>
        </div>

        <button @click="fetchPartners"
          class="bg-primary text-WtB px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-secondary transition-colors text-sm sm:text-base">
          {{ t('common.retryButton') }}
        </button>
      </div>

      <!-- Indicateur de chargement -->
      <Loader v-else-if="loading" class="relative" />

      <!-- Contenu principal -->
      <div v-else class="relative">
        <!-- Masques dégradés pour l'effet de scroll -->
        <div class="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-bgClr to-transparent z-10"></div>
        <div class="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-bgClr to-transparent z-10"></div>

        <!-- Slider des partenaires -->
        <div class="partner-scroll" :class="{ 'partner-scroll-pause': isPaused }" @touchstart="isPaused = true"
          @touchend="isPaused = false" @mouseenter="isPaused = true" @mouseleave="isPaused = false">
          <div class="scroll-track flex space-x-6 sm:space-x-12">
            <template v-for="n in 2">
              <div v-for="partner in filteredPartners" :key="n + '-' + partner.id" class="flex-none relative"
                :title="partner.name" @mouseenter="activePartner = partner" @mouseleave="activePartner = null">
                <a :href="partner.website" target="_blank" rel="noopener noreferrer"
                  class="block w-32 h-16 sm:w-48 sm:h-24 p-3 sm:p-4 m-2 sm:m-4 rounded-lg bg-ash transition-all duration-300 hover:shadow-xl">
                  <img :src="partner.logo || 'https://via.placeholder.com/150?text=Logo'" :alt="partner.name || 'Logo'"
                    class="w-full h-full object-contain transition-opacity duration-300 filter grayscale hover:grayscale-0"
                    @error="handleImageError">
                </a>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { PGSServices } from '~/stores/PGSServices'
import { IconMoodCry } from '@tabler/icons-vue'
import Loader from '~/components/Load/LPartners.vue'
import { useI18n } from 'vue-i18n'
import type { PartnerData } from '@/types';

const { t } = useI18n()
const allPartners = ref<PartnerData[]>([])
const error = ref<string | null>(null)
const loading = ref(true)
const isPaused = ref(false)
const activePartner = ref<PartnerData | null>(null)
const scrollContainer = ref<HTMLElement | null>(null)

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  const name = target.alt || 'Logo'
  target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${name}`
}

const scroll = (direction: 'left' | 'right') => {
  if (!scrollContainer.value) return

  const containerWidth = scrollContainer.value.offsetWidth
  const scrollAmount = containerWidth * 0.8
  const currentScroll = scrollContainer.value.scrollLeft
  const newScroll = direction === 'left'
    ? Math.max(0, currentScroll - scrollAmount)
    : currentScroll + scrollAmount

  scrollContainer.value.scrollTo({
    left: newScroll,
    behavior: 'smooth'
  })
}

const fetchPartners = async () => {
  error.value = null
  loading.value = true
  let attempts = 0
  const maxAttempts = 2

  while (attempts < maxAttempts) {
    try {
      const response = await PGSServices.getAllSolutionPartners();
      allPartners.value = response.data || [];
      loading.value = false
      return
    } catch (err) {
      attempts++
      console.error(`Erreur lors de la récupération des partenaires, tentative ${attempts}:`, err)
      if (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 500))
      } else {
        error.value = t('common.loadError', { object: t('common.partners') });
        loading.value = false
      }
    }
  }
}

const filteredPartners = computed(() => {
  return allPartners.value.filter(partner =>
    partner.platforms && partner.platforms.some((platform: { slug: string }) => platform.slug === 'easyquicktrack')
  );
});

onMounted(() => {
  fetchPartners()
})
</script>

<style scoped>
@keyframes scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

.partner-scroll {
  overflow: hidden;
  padding: 0.5rem 0;
}

.scroll-track {
  display: flex;
  animation: scroll 25s linear infinite;
  will-change: transform;
}

.partner-scroll-pause .scroll-track {
  animation-play-state: paused;
}

.testimonials-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-padding: 0 1rem;
}

.testimonials-container::-webkit-scrollbar {
  display: none;
}
</style>
