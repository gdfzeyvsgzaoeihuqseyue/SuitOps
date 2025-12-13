<template>
  <main>
    <!-- Hero section -->
    <header class="relative py-24 bg-cover bg-center"
      :style="{ backgroundImage: `url('${sharedFiles.paths.hero.faq}')` }">
      <div class="absolute inset-0 bg-gradient-to-r from-ash to-ashAct opacity-80"></div>
      <div class="absolute inset-0 backdrop-blur-sm"></div>

      <div class="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center text-BtW">
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6" v-motion
          :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }">
          {{ t('faqPage.heroTitle') }}
        </h1>
        <p class="text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
          {{ t('faqPage.heroSubtitle') }}
        </p>
      </div>
    </header>

    <!-- Filtres -->
    <div
      class="flex flex-col sm:flex-row items-center mt-4 sm:mt-6 md:mt-8 w-full max-w-6xl mx-auto px-8 gap-3 sm:gap-4">
      <!-- Champ de recherche -->
      <div class="relative flex-1 w-full">
        <IconSearch
          class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 peer-focus:text-primary transition-colors" />
        <input v-model="searchQuery" type="search" id="jobSearch" placeholder=" "
          class="block px-9 sm:px-10 pb-2 pt-3 w-full text-sm bg-WtB rounded-lg border appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" />
        <label for="jobSearch"
          class="absolute text-xs sm:text-sm duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] bg-WtB px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-4 left-6 sm:left-8">
          {{ t('faqPage.searchPlaceholder') }}
        </label>
      </div>

      <div class="flex flex-row items-center gap-3 w-full sm:w-auto">
        <!-- Sélection de catégorie -->
        <div class="relative flex-1 sm:flex-none w-full">
          <select v-model="selectedTopic" placeholder=" "
            class="block px-3 pb-2 pt-3 w-full text-sm bg-WtB rounded-lg border appearance-none focus:outline-none focus:ring-0 focus:border-primary peer">
            <option value="all">{{ t('faqPage.all') }}</option>
            <option v-for="topic in suitopsTopics" :key="topic.id" :value="topic.id">{{ topic.name }}</option>
          </select>
          <label
            class="absolute text-xs sm:text-sm duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] bg-WtB px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-4 left-3">
            {{ t('faqPage.allCategories') }}
          </label>
        </div>

        <!-- Bouton rafraîchir -->
        <button @click="fetchFaqs"
          class="group flex flex-1 items-center justify-center gap-1 sm:gap-2 hover:text-primary bg-ash hover:bg-WtB border transition-colors px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium w-full sm:w-auto">
          <IconRefresh class="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300" :class="{
            'animate-spin': faqLoading,
            'group-hover:rotate-180': !faqLoading
          }" />
          <span>{{ t('common.refreshButton') }}</span>
        </button>
      </div>
    </div>

    <!-- FAQ section -->
    <section>
      <div class="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <!-- État de chargement -->
        <Loader v-if="faqLoading" />

        <!-- État d'erreur -->
        <div v-else-if="faqError" class="text-center p-4 sm:p-6 md:p-8">
          <div class="mb-3 sm:mb-4">
            <IconMoodCry class="w-10 h-10 sm:w-12 sm:h-12 mx-auto" />
            <p class="text-danger text-sm sm:text-base">{{ t('common.loadError', { object: t('faqPage.heroTitle') }) }}
            </p>
          </div>

          <button @click="fetchFaqs"
            class="bg-primary text-WtB px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-secondary transition-colors text-sm sm:text-base">
            {{ t('common.retryButton') }}
          </button>
        </div>

        <!-- Contenu -->
        <div v-else class="space-y-4 sm:space-y-6">
          <Disclosure v-for="(topic, index) in filteredTopics" :key="topic.id" v-slot="{ open: topicOpen }" as="div"
            :default-open="index === 0" class="space-y-3 sm:space-y-4">
            <DisclosureButton class="w-full focus:outline-none">
              <div
                class="flex justify-between items-center border-b-2 p-2 pb-1 mb-1 sm:mb-2 cursor-pointer bg-bgClr rounded-xl sm:rounded-2xl"
                :class="{ 'border-primary': topicOpen, 'border-gray-200 dark:border-gray-700': !topicOpen }">
                <h2 class="text-lg sm:text-xl md:text-2xl font-bold"
                  :class="{ 'text-primary': topicOpen, 'text-textClr': !topicOpen }">
                  {{ topic.name }}
                </h2>
                <span class="toggle-icon">
                  <IconLibraryMinus v-if="topicOpen" class="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  <IconLibraryPlus v-else class="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </span>
              </div>
            </DisclosureButton>

            <DisclosurePanel v-motion :initial="{ opacity: 0, y: 50 }" :visible="{ opacity: 1, y: 0 }">
              <div class="space-y-1 sm:space-y-2 pl-3 sm:pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                <Disclosure v-for="faq in filterFaqs(topic.faqs)" :key="faq.id" v-slot="{ open }">
                  <DisclosureButton
                    class="flex w-full justify-between rounded-lg bg-gray-50 dark:bg-gray-800 px-2 sm:px-3 py-1 sm:py-2 text-left text-sm sm:text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
                    :class="{ 'text-primary': open, 'text-textClr': !open }">
                    <span class="pr-2">{{ faq.question }}</span>
                    <IconChevronDown
                      :class="[open ? 'rotate-180 transform' : '', 'h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0']" />
                  </DisclosureButton>

                  <DisclosurePanel
                    class="px-2 sm:px-3 pt-1 pb-2 sm:pt-2 sm:pb-2 border-l-2 border-gray-200 dark:border-gray-700"
                    v-motion :initial="{ opacity: 0, y: -50 }" :visible="{ opacity: 1, y: 0 }">
                    <useExpText :text="linkStyle(faq.answer)" :maxLength="1000" class="text-xs sm:text-sm" />

                    <div class="mt-1 sm:mt-2 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                      <button @click="handleVoteUseful(faq.id)"
                        class="flex items-center gap-1 hover:text-green-500 transition-colors">
                        <IconThumbUp class="w-3 h-3 sm:w-4 sm:h-4" />
                        {{ t('faqPage.useful', { count: faq.isUseful }) }}
                      </button>
                      <button @click="handleVoteUseless(faq.id)"
                        class="flex items-center gap-1 hover:text-danger transition-colors">
                        <IconThumbDown class="w-3 h-3 sm:w-4 sm:h-4" />
                        {{ t('faqPage.notUseful', { count: faq.isUseless }) }}
                      </button>
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              </div>
            </DisclosurePanel>
          </Disclosure>
        </div>
      </div>
    </section>

    <!-- Section complémentaire -->
    <section class="my-6 sm:my-8 md:my-12 text-center px-4">
      <p class="text-sm sm:text-base">{{ t('faqPage.noMatch') }} <NuxtLink :to="localePath('/forum')"
          class="text-primary hover:text-secondary">{{ t('faqPage.communityLink') }}</NuxtLink>.</p>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { IconMoodCry, IconLibraryMinus, IconLibraryPlus, IconChevronDown, IconThumbUp, IconThumbDown, IconSearch, IconRefresh } from '@tabler/icons-vue'
import { useFaqStore } from '~/stores/faq'
import { storeToRefs } from 'pinia'
import Loader from '~/components/Load/LFaq.vue'
import { useI18n } from 'vue-i18n'
import { useSharedFiles } from '~/stores/sharedFiles';
import { useLocalePath } from '#imports';

const sharedFiles = useSharedFiles();
const { t } = useI18n()
const localePath = useLocalePath();

useHead({
  title: t('faqPage.heroTitle')
})

const faqStore = useFaqStore()
const { error: faqError, loading: faqLoading, suitopsTopics } = storeToRefs(faqStore)

const searchQuery = ref('')
const selectedTopic = ref('all')

const linkStyle = (content: string) => {
  return content
    .replace(/style="[^"]*"/g, '') // Supprime tous les styles inline
    .replace(/<a /g, '<a class="text-primary hover:underline" '); // Applique une classe aux liens
};

const fetchFaqs = async () => {
  await faqStore.fetchFaqTopics()
}

onMounted(fetchFaqs)

const filterFaqs = (faqs?: any[]) => {
  if (!faqs) return []
  return faqs.filter(faq => faq.question.toLowerCase().includes(searchQuery.value.toLowerCase()))
}

const filteredTopics = computed(() => {
  const topicsToShow = selectedTopic.value === 'all'
    ? suitopsTopics.value
    : suitopsTopics.value.filter(topic => topic.id === selectedTopic.value)

  // Filter topics that have at least one FAQ matching the search
  if (searchQuery.value) {
    return topicsToShow.filter(topic =>
      topic.faqs && filterFaqs(topic.faqs).length > 0
    )
  }

  return topicsToShow
})

// Vote handlers
const handleVoteUseful = async (faqId: string) => {
  try {
    await faqStore.voteUseful(faqId)
    // Optionally show a success toast notification here
  } catch (error) {
    console.error('Failed to vote useful:', error)
    // Optionally show an error toast notification here
  }
}

const handleVoteUseless = async (faqId: string) => {
  try {
    await faqStore.voteUseless(faqId)
    // Optionally show a success toast notification here
  } catch (error) {
    console.error('Failed to vote useless:', error)
    // Optionally show an error toast notification here
  }
}
</script>
