<template>
  <div class="max-w-6xl mx-auto">
    <transition :name="animationClass" mode="out-in">
      <div :key="currentModule.id" class="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
        <!-- Texte -->
        <div class="order-2 lg:order-1">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-heading">
            {{ currentModule.title }}
          </h2>
          <p class="text-lg sm:text-xl mb-4 sm:mb-6">
            {{ currentModule.description }}
          </p>

          <ul class="space-y-3 sm:space-y-4">
            <li v-for="feature in currentModule.features" :key="feature" class="flex items-start">
              <IconChecks class="w-5 h-5 sm:w-6 sm:h-6 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span class="text-base sm:text-lg">{{ feature }}</span>
            </li>
          </ul>
        </div>

        <!-- Image -->
        <div class="relative order-1 lg:order-2 w-full">
          <img :src="currentModule.image" :alt="currentModule.title" class="rounded-lg drop-shadow-xl"
            @error="e => e.target.src = `https://placehold.co/600x300/E0F2FE/0284C7?text=${encodeURIComponent(currentModule.title)}`" />

          <!-- Badge -->
          <div v-if="currentModule.badge"
            class="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 p-2 sm:p-4 rounded-full shadow-lg"
            :class="currentModule.badge.bgColor">
            <span class="text-xs sm:text-sm font-medium" :class="currentModule.badge.textColor">
              {{ currentModule.badge.label }}
            </span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useModules } from '@/composables/useModules'
import { IconChecks } from '@tabler/icons-vue'

const { demoModules } = useModules()
const currentModule = ref(demoModules.value[Math.floor(Math.random() * demoModules.value.length)])

// Animation aléatoire
const animationClass = ref('')
const animations = ['slide-in-left', 'slide-in-right', 'fade-in', 'zoom-in']

function getRandomAnimation() {
  const randomIndex = Math.floor(Math.random() * animations.length)
  return animations[randomIndex]
}

let intervalId = null

onMounted(() => {
  intervalId = setInterval(() => {
    let newModule
    do {
      newModule = demoModules.value[Math.floor(Math.random() * demoModules.value.length)]
    } while (newModule.id === currentModule.value.id && demoModules.value.length > 1)

    animationClass.value = getRandomAnimation()
    currentModule.value = newModule
  }, 10000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
/* Animations optimisées pour mobile */
.slide-in-left-enter-active,
.slide-in-right-enter-active,
.fade-in-enter-active,
.zoom-in-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-in-left-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-in-right-enter-from {
  transform: translateY(10px);
  opacity: 0;
}

.fade-in-enter-from {
  opacity: 0;
}

.zoom-in-enter-from {
  transform: scale(0.95);
  opacity: 0;
}

/* Animations de sortie plus rapides */
.slide-in-left-leave-active,
.slide-in-right-leave-active,
.fade-in-leave-active,
.zoom-in-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-in-left-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.slide-in-right-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.fade-in-leave-to {
  opacity: 0;
}

.zoom-in-leave-to {
  transform: scale(0.95);
  opacity: 0;
}
</style>