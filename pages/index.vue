<template>
  <main>
    <!-- Hero Section -->
    <header
      class="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden py-16 sm:py-24 md:py-32">
      <!-- Arriere plan -->
      <div class="absolute inset-0">
        <img :src="sharedFiles.paths.hero.index" alt="Background" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-bgClr opacity-80"></div>
        <div class="absolute inset-0 backdrop-blur-sm"></div>
      </div>

      <!-- Content -->
      <div class="container mx-auto px-6 py-12 relative z-10">
        <div class="max-w-6xl mx-auto">
          <div class="flex flex-col-reverse lg:grid lg:grid-cols-[65%_35%] gap-8 md:gap-12 items-center">
            <!-- Texte -->
            <div class="text-center lg:text-left" v-motion :initial="{ opacity: 0, y: 50 }"
              :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 100 } }">
              <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6 font-heading">
                {{ t('indexPage.heroTitle') }}
                <span class="dynamic-text text-primary block">
                  {{ typingText }}<span class="typing-cursor">|</span>
                </span>
              </h1>
              <p class="text-lg md:text-xl lg:text-2xl mb-6 lg:mb-8">
                {{ t('indexPage.heroSubtitle') }}
              </p>

              <!-- CTA -->
              <div class="flex flex-col items-center lg:items-start gap-4 sm:gap-6">
                <button @click="openDemo"
                  class="inline-flex items-center px-6 py-2 sm:px-8 sm:py-3 rounded-lg border-2 border-textClr hover:bg-WtB hover:text-primary transition-colors w-fit text-base sm:text-lg">
                  <IconBrandParsinta class="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  {{ t('indexPage.demoButton') }}
                </button>

                <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center lg:justify-start">
                  <a :href="`${webUrl}`" target="_blank"
                    class="inline-flex items-center justify-center text-center px-6 py-2 sm:px-8 sm:py-3 rounded-lg bg-primary text-WtB hover:bg-secondary transition-colors text-base sm:text-lg">
                    {{ t('indexPage.startFreeButton') }}
                    <IconArrowRight class="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </a>

                  <NuxtLink :to="localePath('/download')"
                    class="inline-flex items-center justify-center text-center px-6 py-2 sm:px-8 sm:py-3 rounded-lg bg-WtB text-primary hover:bg-WtBAct hover:text-secondary transition-colors text-base sm:text-lg">
                    {{ t('indexPage.desktopVersionButton') }}
                    <IconDownload class="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </NuxtLink>
                </div>
              </div>
            </div>

            <!-- Image gauche -->
            <div class="relative mt-8 lg:mt-0" v-motion :initial="{ opacity: 0, x: -50 }"
              :visibleOnce="{ opacity: 1, x: 0, transition: { delay: 200 } }">
              <img :src="sharedFiles.paths.general.heroImg" :alt="t('indexPage.dashboardStatus')" class="rounded-lg">
              <div class="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-WtB p-3 sm:p-4 rounded-lg shadow-lg">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full animate-pulse"></div>
                  <span class="text-xs sm:text-sm font-medium">{{ t('indexPage.dashboardStatus') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Modal Demo Video -->
    <div v-if="showDemo" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm p-4">
      <button @click="closeDemo"
        class="group hover:bg-WtBAct rounded-full p-2 absolute top-4 right-4 text-white text-3xl z-50">
        <IconX
          class="w-6 h-6 md:w-8 md:h-8 transform transition duration-300 ease-in-out group-hover:rotate-90 group-hover:text-danger" />
      </button>

      <div class="relative w-full h-[60vh] md:w-[80%] md:h-[80%]">
        <iframe :src="selectedVideo" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen
          class="w-full h-full rounded-md"></iframe>
      </div>
    </div>

    <!-- Features Section -->
    <section class="py-8 md:py-24 bg-WtBAct">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center mb-8" v-motion :initial="{ opacity: 0, y: 50 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 200 } }">
          <h2 class="text-2xl md:text-4xl font-bold">{{ t('indexPage.featuresTitle') }}</h2>
          <p class="text-base md:text-lg">{{ t('indexPage.featuresSubtitle') }}</p>
        </div>

        <FeaturesRandom :random-features="randomFeatures" />

        <div class="text-center mt-6" v-motion :initial="{ opacity: 0, x: -100 }"
          :visibleOnce="{ opacity: 1, x: 0, transition: { delay: 300 } }">
          <NuxtLink :to="localePath('/features')"
            class="group inline-flex items-center px-4 py-2 rounded-lg bg-primary text-WtB hover:bg-secondary transition-colors text-base md:text-lg font-medium">
            {{ t('indexPage.allFeaturesButton') }}
            <IconArrowRight class="hidden group-hover:block ml-2" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Video Section -->
    <section class="p-8 md:p-24 overflow-hidden">
      <div class="container mx-auto py-4">
        <youtubeFrame />
      </div>
    </section>

    <!-- Partenaires Section -->
    <section class="py-8 md:py-24 bg-bgClr">
      <div class="max-w-3xl mx-auto text-center mb-8 px-4" v-motion :initial="{ opacity: 0, y: 50 }"
        :visibleOnce="{ opacity: 1, y: 0 }">
        <h2 class="text-2xl md:text-4xl font-bold text-primary">{{ t('indexPage.partnersTitle') }}</h2>
        <p class="text-base md:text-lg">{{ t('indexPage.partnersSubtitle') }}</p>
      </div>

      <Partners />
    </section>

    <!-- Module Section -->
    <section class="py-8 md:py-24 bg-WtBAct">
      <div class="container mx-auto px-8">
        <ModuleSection />
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-8 md:py-24 bg-bgClr">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div class="max-w-3xl mx-0 md:ml-auto text-center lg:text-right mb-8" v-motion :initial="{ opacity: 0, y: 50 }"
          :visibleOnce="{ opacity: 1, y: 0 }">
          <h2 class="text-2xl md:text-4xl font-bold"> {{ t('indexPage.testimonialsTitle') }}</h2>
          <p class="text-base md:text-lg">{{ t('indexPage.testimonialsSubtitle') }}</p>
        </div>

        <Testimonies />
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-8 md:py-24 bg-WtBAct">
      <div class="container mx-auto px-6">
        <div class="max-w-7xl mx-auto">
          <div class="max-w-3xl text-center lg:text-left mb-8" v-motion :initial="{ opacity: 0, y: 50 }"
            :visibleOnce="{ opacity: 1, y: 0 }">
            <h2 class="text-2xl md:text-4xl font-bold text-primary">{{ t('faqPage.heroTitle') }}</h2>
            <p class="text-base md:text-lg">{{ t('indexPage.faqSubtitle') }}</p>
          </div>

          <div class="flex flex-col lg:grid lg:grid-cols-3 gap-8 md:gap-12 items-center">
            <FaqRandom />

            <div class="relative hidden lg:block" v-motion :initial="{ opacity: 0, x: -50 }"
              :visibleOnce="{ opacity: 1, x: 0, transition: { delay: 200 } }">
              <img :src="sharedFiles.paths.general.faq" :alt="t('faqPage.heroTitle')" class="rounded-lg">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-8 md:py-24 text-center" id="newsletter">
      <div class="container mx-auto px-6">
        <div class="max-w-3xl mx-auto">
          <div class="max-w-3xl mx-auto text-center mb-8">
            <h2 class="text-2xl md:text-4xl font-bold">{{ t('indexPage.newsletterTitle') }}</h2>
            <p class="text-base md:text-lg">{{ t('indexPage.newsletterSubtitle') }}
            </p>

            <p class="mt-2 text-xs">{{ t('indexPage.newsletterConsent') }}</p>
          </div>

          <Newsletter />
        </div>
      </div>
    </section>

    <!-- CTA Section-->
    <section class="py-8 md:py-24 bg-primary relative overflow-hidden">
      <div class="absolute inset-0">
        <!-- Mode clair -->
        <div class="absolute inset-0 block dark:hidden"
          style="background-image: url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.4%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');">
        </div>

        <!-- Mode dark -->
        <div class="absolute inset-0 hidden dark:block"
          style="background-image: url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23000000%22 fill-opacity=%220.4%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');">
        </div>

        <div class="absolute inset-0 bg-primary opacity-80"></div>
      </div>

      <div class="container mx-auto px-6 relative">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-WtB mb-4 md:mb-6">{{ t('indexPage.ctaTitle') }}
          </h2>
          <p class="text-base md:text-xl text-WtBAct mb-8 md:mb-12 max-w-2xl mx-auto"> {{ t('indexPage.ctaSubtitle') }}
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a :href="`${webUrl}`" target="_blank"
              class="inline-flex items-center justify-center text-center px-6 py-3 sm:px-8 sm:py-4 rounded-lg bg-WtB text-primary hover:bg-WtBAct transition-colors text-base sm:text-lg font-medium">
              <span>{{ t('indexPage.ctaStartNow') }}</span>
              <IconArrowRight class="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </a>

            <NuxtLink :to="localePath('/contact')"
              class="inline-flex items-center justify-center text-center px-6 py-3 sm:px-8 sm:py-4 rounded-lg border-2 border-WtB text-WtB hover:bg-WtB hover:text-primary transition-colors text-base sm:text-lg font-medium">
              {{ t('indexPage.ctaContactUs') }}
              <IconMessage class="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { IconArrowRight, IconDownload, IconBrandParsinta, IconX, IconMessage } from '@tabler/icons-vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useFeatures } from '~/composables/useFeatures'
import { useSharedFiles } from '~/stores/sharedFiles';

const sharedFiles = useSharedFiles();
const { t } = useI18n()
const localePath = useLocalePath()
const { data: customData } = await useAsyncData('customData', () => sharedFiles.getCustomData());
const webUrl = computed(() => customData.value?.web?.url);

// Tableau des textes dynamiques
const dynamicWordKeys = [
  "indexPage.heroDynamicWords.word1",
  "indexPage.heroDynamicWords.word2",
  "indexPage.heroDynamicWords.word3",
  "indexPage.heroDynamicWords.word4"
]

const words = ref<string[]>([])
const typingText = ref('')
const currentWordIndex = ref(0)
const isDeleting = ref(false)
const typingSpeed = 100
const deletingSpeed = 50

const typeEffect = () => {
  if (words.value.length === 0) return;

  const currentWord = words.value[currentWordIndex.value]

  if (isDeleting.value) {
    // Phase d'effacement
    typingText.value = currentWord.substring(0, typingText.value.length - 1)
    if (typingText.value === '') {
      isDeleting.value = false
      currentWordIndex.value = (currentWordIndex.value + 1) % words.value.length
      setTimeout(typeEffect, 500)
    } else {
      setTimeout(typeEffect, deletingSpeed)
    }
  } else {
    // Phase de frappe
    typingText.value = currentWord.substring(0, typingText.value.length + 1)
    if (typingText.value === currentWord) {
      setTimeout(() => { isDeleting.value = true; typeEffect(); }, 2000)
    } else {
      setTimeout(typeEffect, typingSpeed)
    }
  }
}

onMounted(() => {
  words.value = dynamicWordKeys.map(key => t(key));
  if (words.value.length > 0) {
    typeEffect();
  }
})

const { getRandomFeatures } = useFeatures()
const randomFeatures = ref(getRandomFeatures(4))

const showDemo = ref(false)
const selectedVideo = ref('')

// Liens de vidéos démo
const videoLinks = [
  'https://www.youtube.com/embed/76Fy3K-vwbI?autoplay=1',
  'https://www.youtube.com/embed/URURUf28HnA?autoplay=1'
]

// Fonction pour ouvrir la démo en sélectionnant une vidéo aléatoire
const openDemo = () => {
  selectedVideo.value = videoLinks[Math.floor(Math.random() * videoLinks.length)]
  showDemo.value = true
}

// Fonction pour fermer la démo
const closeDemo = () => {
  showDemo.value = false
  selectedVideo.value = ''
}

// SEO
useHead({
  title: t('meta.indexPage'),
  meta: [{ name: 'description', content: t('indexPage.heroSubtitle') }]
})
</script>

<style>
/* Texte dynamique */
.typing-cursor {
  font-weight: 300;
  animation: blink 1s step-end infinite;
  display: inline-block;
  vertical-align: middle;
}

@keyframes blink {

  from,
  to {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}

/* Votre style existant pour les swipers, animations, etc. */
.swiper {
  padding-bottom: 2rem !important;
}

.swiper-pagination-bullet {
  background: theme('colors.primary/80') !important;
  width: 8px !important;
  height: 8px !important;
}

.swiper-button-next,
.swiper-button-prev {
  color: theme('colors.primary/80') !important;
  --swiper-navigation-size: 24px;
}

/* Animation de pulse pour le compteur en temps réel */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.5;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.5;
  }
}

/* Animation de défilement pour les partenaires */
.animate-scroll {
  animation: scroll 30s linear infinite;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}
</style>