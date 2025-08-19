<template>
  <main>
    <!-- Hero section -->
    <header class="relative py-24 bg-cover bg-center"
      :style="{ backgroundImage: `url('${sharedFiles.paths.hero.offer}')` }">
      <div class="absolute inset-0 bg-gradient-to-r from-ash to-ashAct opacity-80"></div>
      <div class="absolute inset-0 backdrop-blur-sm"></div>

      <div class="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center text-BtW">
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6" v-motion
          :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }">
          {{ $t('offersPage.heroTitle') }}
        </h1>
        <p class="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto px-2">
          {{ $t('offersPage.heroSubtitle') }}
        </p>
      </div>
    </header>

    <!-- Filtres -->
    <section class="container mx-auto p-4 sm:p-8">
      <div class="my-6 sm:my-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
        <!-- Barre de recherche -->
        <div class="relative flex-1">
          <IconSearch
            class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 peer-focus:text-primary transition-colors" />
          <input v-model="searchQuery" type="search" id="jobSearch" placeholder=" " class="input-floating peer" />
          <label for="jobSearch" class="label-floating left-8">
            {{ $t('offersPage.searchPlaceholder') }}
          </label>
        </div>

        <!-- Filtres -->
        <div class="flex flex-wrap gap-2 sm:gap-4 items-center justify-between">
          <div class="relative">
            <select v-model="sortBy" placeholder=" " class="input-floating peer">
              <option value="default">{{ $t('offersPage.sortByDefault') }}</option>
              <option value="az">{{ $t('offersPage.sortByAZ') }}</option>
              <option value="za">{{ $t('offersPage.sortByZA') }}</option>
              <option value="closingDate_desc">{{ $t('offersPage.sortByClosingSoon') }}</option>
              <option value="closingDate_asc">{{ $t('offersPage.sortByClosingLater') }}</option>
              <option value="createdAt_desc">{{ $t('offersPage.sortByPublicationNewest') }}</option>
              <option value="createdAt_asc">{{ $t('offersPage.sortByPublicationOldest') }}</option>
              <option value="postNumber_desc">{{ $t('offersPage.sortByPostNumberHigh') }}</option>
              <option value="postNumber_asc">{{ $t('offersPage.sortByPostNumberLow') }}</option>
            </select>
            <label class="label-floating left-3">{{ $t('common.sortBy') }}</label>
          </div>

          <div class="relative">
            <select v-model="selectedContract" placeholder=" " class="input-floating peer">
              <option value="TOUT">{{ $t('offersPage.contractAll') }}</option>
              <option v-for="contract in contractTypes" :key="contract" :value="contract">
                {{ $t(`offersPage.${contract}`) }}
              </option>
            </select>
            <label class="label-floating left-3">{{ $t('common.contractTypes') }}</label>
          </div>

          <button @click="fetchJobs"
            class="group flex items-center gap-1 sm:gap-2 hover:text-primary bg-ash hover:bg-WtB border transition-colors px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium">
            <IconRefresh class="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300" :class="{
              'animate-spin': loading,
              'group-hover:rotate-180': !loading
            }" />
            <span class="hidden sm:inline">{{ $t('common.refreshButton') }}</span>
          </button>
        </div>
      </div>

      <!-- Statistiques -->
      <div v-if="!loading" class="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
        <div class="p-3 sm:p-4 bg-blue-100 text-blue-800 rounded-md text-center">
          <p class="text-xl sm:text-2xl font-bold">{{ totalOffers }}</p>
          <p class="text-xs sm:text-sm">{{ $t('offersPage.offersFound', totalOffers) }}</p>
        </div>
        <div class="p-3 sm:p-4 bg-green-100 text-green-800 rounded-md text-center">
          <p class="text-xl sm:text-2xl font-bold">{{ countCDI }}</p>
          <p class="text-xs sm:text-sm">{{ $t('offersPage.CDI') }}</p>
        </div>
        <div class="p-3 sm:p-4 bg-yellow-100 text-yellow-800 rounded-md text-center">
          <p class="text-xl sm:text-2xl font-bold">{{ countCDD }}</p>
          <p class="text-xs sm:text-sm">{{ $t('offersPage.CDD') }}</p>
        </div>
        <div class="p-3 sm:p-4 bg-orange-100 text-orange-800 rounded-md text-center">
          <p class="text-xl sm:text-2xl font-bold">{{ countSTAGE }}</p>
          <p class="text-xs sm:text-sm">{{ $t('offersPage.STAGE', countSTAGE) }}</p>
        </div>
      </div>

      <!-- État de chargement -->
      <Loader v-if="loading" />

      <!-- Gestion des erreurs -->
      <div v-else-if="error" class="text-center p-8">
        <div class="mb-4">
          <IconMoodCry class="w-10 h-10 sm:w-12 sm:h-12 mx-auto" />
          <p class="text-danger text-sm sm:text-base">{{ error }}</p>
        </div>

        <button @click="fetchJobs"
          class="bg-primary text-WtB px-4 py-2 rounded-md hover:bg-secondary transition-colors text-sm sm:text-base">
          {{ t('common.retryButton') }}
        </button>
      </div>

      <!-- Affichage des résultats -->
      <div v-else>
        <div v-if="filteredJobs.length === 0" class="text-center col-span-full py-12 text-sm sm:text-base">
          <div>
            <IconBriefcaseOff class="w-10 h-10 sm:w-12 sm:h-12 mx-auto" />
          </div>
          {{ $t('offersPage.noOffersFound') }}
        </div>

        <div class="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 my-8">
          <div v-for="job in paginatedJobs" :key="job.id"
            class="border rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow relative bg-WtBAct">
            <!-- Badge -->
            <div v-if="job.createdAt !== job.updatedAt"
              class="absolute top-2 right-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs"
              :title="$t('offersPage.modifiedBadgeText')">
              {{ $t('offersPage.modifiedBadge') }}
            </div>

            <h2 class="text-lg sm:text-xl font-semibold mb-2">{{ job.post }}</h2>

            <div class="mb-2 flex flex-wrap gap-2">
              <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs sm:text-sm">
                {{ job.contract }}
              </span>
              <span class="px-2 py-1 rounded text-xs sm:text-sm" :class="isClosingSoon(job.closingDate)
                ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'">
                ⏳ {{ formatDateTime(job.closingDate, locale, t) }}
              </span>
            </div>

            <NuxtLink :to="localePath(`/company/${job.company.id}/${job.company.name}`)"
              class="hover:text-secondary hover:underline transition-colors text-sm"
              :title="t('offersPage.viewCompanyProfile', { companyName: job.company.name })">
              {{ job.company.name }}
            </NuxtLink>

            <div class="text-xs sm:text-sm mb-4 space-y-1">
              <p>📍 {{ job.location }}</p>
              <p>📌 {{ $t('offersPage.placesAvailable', job.placeNumber) }}</p>
              <p>💼 {{ job.profile }}</p>
            </div>

            <NuxtLink :to="localePath(`/offer/${job.id}/${job.slug}`)"
              class="group inline-flex items-center justify-center w-full px-4 py-2 bg-primary text-WtB rounded hover:bg-secondary transition-colors text-sm sm:text-base">
              {{ $t('offersPage.viewOfferButton') }}
              <IconArrowRight class="hidden group-hover:block ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <usePagination :totalItems="filteredJobs.length" :itemsPerPage="itemsPerPage" :currentPage="currentPage"
        :itemLabel="$t('offersPage.itemLabel')" :perPageOptions="[3, 6, 12, 24]"
        @update:currentPage="currentPage = $event" @update:itemsPerPage="itemsPerPage = $event" />
    </section>

    <!-- Section complémentaire -->
    <section class="px-4 my-8 sm:my-12 text-center text-sm sm:text-base">
      <p>{{ $t('offersPage.dedicatedSiteText') }} <a :href="externalLinks.hire" class="text-primary hover:underline">{{
        $t('offersPage.dedicatedSiteLink') }}</a>.</p>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { IconMoodCry } from '@tabler/icons-vue'
import { SuitOpsServices } from '~/stores/SuitOpsServices.js'
import Loader from '~/components/Load/LOffer.vue'
import { IconSearch, IconBriefcaseOff, IconArrowRight, IconRefresh } from '@tabler/icons-vue'
import { useI18n } from 'vue-i18n'
import { internalLinks, externalLinks } from '@/utils/links.js';
import { isClosingSoon, formatDateTime } from '@/utils/date.js';
import { useSharedFiles } from '~/stores/sharedFiles';

const sharedFiles = useSharedFiles();

const { t, locale } = useI18n();
const localePath = useLocalePath()

// Variables réactives
const jobOffers = ref([])
const error = ref(null)
const loading = ref(true)

const searchQuery = ref('')
const sortBy = ref('default')
const selectedContract = ref('TOUT')

const currentPage = ref(1)
const itemsPerPage = ref(6)

// Récupération des offres
const fetchJobs = async () => {
  error.value = null
  loading.value = true
  let attempts = 0
  const maxAttempts = 2

  while (attempts < maxAttempts) {
    try {
      const response = await SuitOpsServices.getAllJobOffers()
      jobOffers.value = response.data?.data || response.data || []
      loading.value = false
      return
    } catch (err) {
      attempts++
      console.error(`Erreur lors de la récupération des offres, tentative ${attempts}:`, err)
      if (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 500))
      } else {
        error.value = t('offersPage.loadingError')
        loading.value = false
      }
    }
  }
}

onMounted(() => {
  fetchJobs()
})

// Liste des types de contrat
const contractTypes = ['CDI', 'CDD', 'STAGE']

// Filtrage et de tri des offres d'emploi
const filteredJobs = computed(() => {
  let jobs = jobOffers.value || []

  // Filtrer uniquement les offres de 'Kaarò Group'
  jobs = jobs.filter(job => job.company.name === 'Kaarò Group')

  // Filtre de recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    jobs = jobs.filter(job =>
      job.post.toLowerCase().includes(query) ||
      job.company.name.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query)
    )
  }

  // Filtre par type de contrat
  if (selectedContract.value !== 'TOUT') {
    jobs = jobs.filter(job => job.contract === selectedContract.value)
  }

  // Tri des offres
  switch (sortBy.value) {
    case 'az':
      jobs = [...jobs].sort((a, b) => a.post.localeCompare(b.post));
      break;
    case 'za':
      jobs = [...jobs].sort((a, b) => b.post.localeCompare(a.post));
      break;
    case 'closingDate_desc':
      jobs = [...jobs].sort((a, b) => new Date(a.closingDate) - new Date(b.closingDate));
      break;
    case 'closingDate_asc':
      jobs = [...jobs].sort((a, b) => new Date(b.closingDate) - new Date(a.closingDate));
      break;
    case 'createdAt_desc':
      jobs = [...jobs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case 'createdAt_asc':
      jobs = [...jobs].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    case 'postNumber_desc':
      jobs = [...jobs].sort((a, b) => (b.placeNumber || 0) - (a.placeNumber || 0));
      break;
    case 'postNumber_asc':
      jobs = [...jobs].sort((a, b) => (a.placeNumber || 0) - (b.placeNumber || 0));
      break;
    case 'default':
    default:
      jobs = [...jobs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
  }

  return jobs
})

// Statistiques sur les offres filtrées
const totalOffers = computed(() => filteredJobs.value.length)
const countCDI = computed(() => filteredJobs.value.filter(job => job.contract === 'CDI').length)
const countCDD = computed(() => filteredJobs.value.filter(job => job.contract === 'CDD').length)
const countSTAGE = computed(() => filteredJobs.value.filter(job => job.contract === 'STAGE').length)

// Pagination
const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredJobs.value.slice(start, start + itemsPerPage.value);
});


// Réinitialiser la page courante à 1 lorsque les filtres changent
watch([searchQuery, sortBy, selectedContract, filteredJobs], () => {
  currentPage.value = 1
})

// SEO
useHead({
  title: t('offersPage.heroTitle'),
  meta: [{
    name: 'description', content: t('offersPage.heroSubtitle'),
  }]
})
</script>

<style scoped>
.input-floating {
  @apply block px-10 pb-2 pt-3 w-full text-sm bg-WtB rounded-lg border appearance-none focus:outline-none focus:ring-0 focus:border-primary;
}

.label-floating {
  @apply absolute text-xs sm:text-sm duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] bg-WtB px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-4;
}

select {
  @apply px-2 !important;
}
</style>
