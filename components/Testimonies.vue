<template>
  <section>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Etat d'erreur -->
      <div v-if="testimoniesStore.error" class="text-center p-4 sm:p-8">
        <div class="mb-3 sm:mb-4">
          <IconMoodCry class="w-10 h-10 sm:w-12 sm:h-12 mx-auto" />
          <p class="text-danger text-sm sm:text-base">{{ t('common.loadError', { object: t('common.testimonies') }) }}</p>
        </div>

        <button @click="testimoniesStore.fetchTestimonies"
          class="bg-primary text-WtB px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-secondary transition-colors text-sm sm:text-base">
          {{ t('common.retryButton') }}
        </button>
      </div>

      <!-- Etat de chargement -->
      <Loader v-else-if="testimoniesStore.loading" class="relative" />

      <!-- Card témoignage -->
      <div v-else-if="testimoniesStore.suitopsTestimonies.length > 0" class="relative">
        <!-- Masques dégradés -->
        <div class="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-bgClr to-transparent z-10"></div>
        <div class="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-bgClr to-transparent z-10"></div>

        <div
          class="flex gap-4 sm:gap-8 overflow-x-auto pb-6 sm:pb-8 scroll-smooth testimonials-container snap-x snap-mandatory"
          ref="scrollContainer">
          <div v-for="testimony in testimoniesStore.suitopsTestimonies" :key="testimony.id"
            class="flex-none w-[calc(100vw-3rem)] sm:w-[400px] rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300 snap-start"
            :class="{
              'bg-ashAct border-2 border-primary': testimony.isFeatured,
              'bg-ash border border-ashAct': !testimony.isFeatured
            }" v-motion :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }">
            <div class="flex items-center mb-4 sm:mb-6">
              <img :src="testimony.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${testimony.author}`"
                :alt="testimony.author"
                class="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 sm:border-4 border-primary"
                @error="handleImageError">
              <div class="ml-3 sm:ml-4">
                <h3 class="text-base sm:text-lg font-semibold">
                  {{ testimony.author }}
                </h3>
                <p v-if="testimony.role || testimony.company" class="text-xs sm:text-sm">
                  {{ testimony.role }} <span v-if="testimony.role && testimony.company"> | </span> <strong>{{
                    testimony.company }}</strong>
                </p>
                <div v-if="testimony.note" class="flex items-center mt-1">
                  <IconStarFilled v-for="n in getFullStars(testimony.note)" :key="n" class="w-4 h-4 text-yellow-400" />
                  <IconStarHalfFilled v-if="hasHalfStar(testimony.note)" :key="'half'"
                    class="w-4 h-4 text-yellow-400" />
                  <IconStar v-for="n in getEmptyStars(testimony.note)" :key="n + 'empty'"
                    class="w-4 h-4 text-yellow-400" />
                </div>
              </div>
            </div>

            <blockquote class="italic text-sm sm:text-base leading-relaxed">
              "{{ testimony.content }}"
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
      <div v-else class="text-center p-4 sm:p-8">
        <p class="text-gray-500">{{ t('common.loadError', { object: t('common.testimonies') }) }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { IconMoodCry, IconChevronLeft, IconChevronRight, IconStarFilled, IconStar, IconStarHalfFilled } from '@tabler/icons-vue'
import Loader from '~/components/Load/LTestimonies.vue'
import { useI18n } from 'vue-i18n'
import { useTestimoniesStore } from '~/stores/testimonies';

const { t } = useI18n()
const testimoniesStore = useTestimoniesStore();

// Logique pour le calcul des étoiles
const getFullStars = (note: number) => Math.floor(note);
const hasHalfStar = (note: number) => note % 1 !== 0;
const getEmptyStars = (note: number) => Math.floor(5 - note);

const scrollContainer = ref<HTMLElement | null>(null)

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  const name = target.alt || 'Avatar'
  target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
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

onMounted(() => {
  testimoniesStore.fetchTestimonies();
})
</script>

<style scoped>
.testimonials-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-padding: 0 1rem;
}

.testimonials-container::-webkit-scrollbar {
  display: none;
}
</style>
