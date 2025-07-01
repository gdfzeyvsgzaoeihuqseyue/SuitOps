<template>
  <div v-if="randomFeatures" class="container mx-auto px-4">
    <div class="grid grid-cols-1 sm:grid-cols-2        gap-6 sm:gap-8 mb-12 sm:mb-16 justify-items-center">
      <div v-for="(feature, index) in displayedFeatures" :key="index"
        class="relative p-5 sm:p-6 rounded-xl shadow-lg group hover:scale-[1.03] sm:hover:scale-105 transition-transform duration-300 border border-textClr hover:border-primary w-full"
        :class="feature.bgClass" v-motion :initial="{ opacity: 0, y: 50 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 200 * index } }">

        <div
          class="absolute inset-0 bg-gradient-to-br from-primary to-primary rounded-xl opacity-0 group-hover:opacity-10 transition-opacity">
        </div>

        <div class="relative rounded-lg overflow-hidden">
          <div class="absolute inset-0 -right-[100%]">
            <component :is="feature.icon" class="w-full h-full object-cover opacity-5 dark:opacity-10" />
            <div class="absolute inset-0"></div>
          </div>

          <div class="relative flex flex-col items-center mb-2">
            <div class="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-2xl text-primary">
              <span class="absolute inset-0 bg-primary opacity-10 dark:opacity-20 rounded-full"></span>
              <component :is="feature.icon" class="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <h3 class="text-lg sm:text-xl font-semibold text-center"> {{ feature.title }} </h3>
          </div>

          <p class="text-sm sm:text-base text-center"> {{ feature.description }} </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  props: {
    randomFeatures: {
      type: Array,
      default: null
    }
  },
  setup(props) {
    // Affiche 3 éléments sur mobile
    const displayedFeatures = computed(() => {
      if (!props.randomFeatures) return []
      return window.innerWidth < 640
        ? props.randomFeatures.slice(0, 3)
        : props.randomFeatures
    })

    return {
      displayedFeatures
    }
  }
}
</script>
