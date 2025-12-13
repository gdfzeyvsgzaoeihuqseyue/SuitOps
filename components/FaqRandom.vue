<template>
  <div class="lg:col-span-2 space-y-6 sm:space-y-8">
    <!-- Etat de chargement -->
    <Loader v-if="faqLoading" class="text-center p-4 sm:p-8" />

    <!-- Etat d'erreur -->
    <div v-else-if="faqError" class="text-center p-4 sm:p-8">
      <div class="mb-4">
        <IconMoodCry class="w-10 h-10 sm:w-12 sm:h-12 mx-auto" />
        <p class="text-danger text-sm sm:text-base">{{ t('common.loadError', { object: t('faqPage.heroTitle') }) }}</p>
      </div>

      <button @click="fetchtRandomFaqs"
        class="bg-primary text-WtB px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-secondary transition-colors text-sm sm:text-base">
        {{ t('common.retryButton') }}
      </button>
    </div>

    <!-- Contenu FAQ -->
    <div v-else-if="randomTopic" class="space-y-3 sm:space-y-4">
      <div class="mb-4 sm:mb-8 text-center lg:text-left">
        <span class="relative text-primary px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm">
          <span class="absolute inset-0 bg-primary opacity-10 dark:opacity-20 rounded-full"></span>
          {{ randomTopic.topic.name }}
        </span>
      </div>

      <div v-for="(faq, index) in randomTopic.faqs" :key="index">
        <Disclosure v-slot="{ open }">
          <DisclosureButton
            class="flex w-full justify-between items-center rounded-lg bg-WtB px-3 py-3 sm:px-4 sm:py-4 text-left text-base sm:text-lg font-medium border hover:border-primary focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75"
            :aria-expanded="open" :aria-controls="`faq-content-${index}`">
            <span>{{ faq.title }}</span>
            <IconChevronDown
              :class="[open ? 'rotate-180 transform' : '', 'h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0']" />
          </DisclosureButton>
          <DisclosurePanel :id="`faq-content-${index}`"
            class="px-3 pt-3 pb-2 sm:px-4 sm:pt-4 sm:pb-2 text-sm sm:text-base" v-motion
            :initial="{ opacity: 0, x: 50 }" :visible="{ opacity: 1, x: 0 }">
            <useExpText :text="linkStyle(faq.content)" :maxLength="500" />
          </DisclosurePanel>
        </Disclosure>
      </div>

      <div class="text-center lg:text-left mt-6 sm:mt-8">
        <NuxtLink :to="localePath('/faq')"
          class="group inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 rounded-lg bg-primary text-WtB hover:bg-secondary transition-colors text-sm sm:text-base">
          {{ t('faqPage.allQuestionsButton') }}
          <IconArrowRight class="hidden group-hover:block w-4 h-4 sm:w-5 sm:h-5 ml-2" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { IconMoodCry, IconChevronDown, IconArrowRight } from '@tabler/icons-vue'
import { useFaqStore } from '~/stores/faq'
import { storeToRefs } from 'pinia'
import Loader from '~/components/Load/LFaqRandom.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const localePath = useLocalePath()

const faqStore = useFaqStore()
const { error: faqError, loading: faqLoading } = storeToRefs(faqStore)
const { getRandomTopic } = faqStore
const randomTopic = ref<{ topic: any; faqs: any[] } | null>(null)

const linkStyle = (content: string) => {
  return content
    .replace(/style="[^"]*"/g, '')
    .replace(/<a /g, '<a class="text-primary hover:underline" ');
};

const fetchtRandomFaqs = async () => {
  await faqStore.fetchFaqTopics()
  randomTopic.value = getRandomTopic(4)
}

onMounted(fetchtRandomFaqs)
</script>
