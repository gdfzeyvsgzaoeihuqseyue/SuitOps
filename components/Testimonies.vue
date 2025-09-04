<template>
  <section>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Etat d'erreur -->
      <div v-if="error" class="text-center p-4 sm:p-8">
        <div class="mb-3 sm:mb-4">
          <IconMoodCry class="w-10 h-10 sm:w-12 sm:h-12 mx-auto" />
          <p class="text-danger text-sm sm:text-base">{{ error }}</p>
        </div>

        <button @click="fetchTestimonials"
          class="bg-primary text-WtB px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-secondary transition-colors text-sm sm:text-base">
          {{ t('common.retryButton') }}
        </button>
      </div>

      <!-- Etat de chargement -->
      <Loader v-if="loading" class="relative" />

      <!-- Card partenaire -->
      <div v-if="!error" class="relative">
        <!-- Masques dégradés -->
        <div class="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-bgClr to-transparent z-10"></div>
        <div class="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-bgClr to-transparent z-10"></div>

        <!-- Testimonials slider -->
        <div class="flex gap-4 sm:gap-8 overflow-x-auto pb-6 sm:pb-8 scroll-smooth testimonials-container snap-x snap-mandatory"
          ref="scrollContainer">
          <div v-for="testimony in testimonials" :key="testimony.id"
            class="flex-none w-[calc(100vw-3rem)] sm:w-[400px] bg-ash rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300 snap-start"
            v-motion :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }">
            <div class="flex items-center mb-4 sm:mb-6">
              <img
                :src="testimony.photo?.url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + testimony.lastname"
                :alt="testimony.lastname" class="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 sm:border-4 border-primary"
                @error="handleImageError">
              <div class="ml-3 sm:ml-4">
                <h3 class="text-base sm:text-lg font-semibold">
                  {{ testimony.lastname }}
                </h3>
                <p class="text-xs sm:text-sm text-primary">
                  {{ testimony.firstname }}
                </p>
              </div>
            </div>

            <blockquote class="italic text-sm sm:text-base leading-relaxed">
              "{{ testimony.message }}"
            </blockquote>
          </div>
        </div>

        <!-- Navigation buttons -->
        <div class="flex justify-center mt-4 sm:mt-6 gap-3 sm:gap-4">
          <button @click="scroll('left')"
            class="p-1.5 sm:p-2 rounded-full bg-ash shadow-lg hover:bg-ashAct transition-colors"
            aria-label="Scroll left">
            <IconChevronLeft class="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button @click="scroll('right')"
            class="p-1.5 sm:p-2 rounded-full bg-ash shadow-lg hover:bg-ashAct transition-colors"
            aria-label="Scroll right">
            <IconChevronRight class="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { IconMoodCry, IconChevronLeft, IconChevronRight } from '@tabler/icons-vue'
import { SuitOpsServices } from '~/stores/SuitOpsServices'
import Loader from '~/components/Load/LTestimonies.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const testimonials = ref<any[]>([])
const error = ref<string | null>(null)
const loading = ref(true)
const scrollContainer = ref<HTMLElement | null>(null)

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  const name = target.alt || 'Logo'
  target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
}

const scroll = (direction: 'left' | 'right') => {
  if (!scrollContainer.value) return

  const containerWidth = scrollContainer.value.offsetWidth
  const scrollAmount = containerWidth * 0.8 // Scroll de 80% de la largeur visible
  const currentScroll = scrollContainer.value.scrollLeft
  const newScroll = direction === 'left'
    ? Math.max(0, currentScroll - scrollAmount)
    : currentScroll + scrollAmount

  scrollContainer.value.scrollTo({
    left: newScroll,
    behavior: 'smooth'
  })
}

const fetchTestimonials = async () => {
  error.value = null
  loading.value = true
  let attempts = 0
  const maxAttempts = 2

  while (attempts < maxAttempts) {
    try {
      const response = await SuitOpsServices.getAllTestimonies() as { data: any };
      testimonials.value = response.data?.data || response.data || [];
      loading.value = false
      return
    } catch (err) {
      attempts++
      console.error(`Erreur lors de la récupération des témoignages, tentative ${attempts}:`, err)
      if (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 500))
      } else {
        error.value = t('common.loadError', { object: t('common.testimonies') });
        loading.value = false
      }
    }
  }
}

onMounted(() => {
  fetchTestimonials()
})
</script>

<style scoped>
.testimonials-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-padding: 0 1rem; /* Espace pour le snap sur mobile */
}

.testimonials-container::-webkit-scrollbar {
  display: none;
}
</style>