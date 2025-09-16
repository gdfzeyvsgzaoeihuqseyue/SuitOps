<template>
  <!-- Hero section -->
  <header class="relative py-24 bg-cover bg-center"
    :style="{ backgroundImage: `url('${sharedFiles.paths.hero.blog}')` }">
    <div class="absolute inset-0 bg-gradient-to-r from-ash to-ashAct opacity-80"></div>
    <div class="absolute inset-0 backdrop-blur-sm"></div>

    <div class="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center text-BtW">
      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6" v-motion
        :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }">
        {{ $t('blogPage.heroTitle') }}
      </h1>
      <p class="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto px-2">
        {{ $t('blogPage.heroSubtitle') }}
      </p>
    </div>
  </header>

  <!-- Contenu principal -->
  <section class="py-8 px-4 sm:py-12 md:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Contrôles de filtre et tri -->
      <div class="mb-6 sm:mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <!-- Recherche -->
        <div class="relative flex-1 w-full">
          <IconSearch
            class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 peer-focus:text-primary transition-colors" />
          <input v-model="searchQuery" type="search" id="jobSearch" placeholder=" " class="input-floating px-10 peer" />
          <label for="jobSearch" class="label-floating left-6 sm:left-8">
            {{ $t('blogPage.searchPlaceholder') }}
          </label>
        </div>

        <!-- Filtres par date -->
        <div class="flex gap-3 w-full sm:w-auto">
          <div class="relative flex-1">
            <input id="startDate" type="date" v-model="startDate" placeholder=" " class="input-floating px-2 peer" />
            <label for="startDate" class="label-floating left-3">
              {{ $t('common.from') }}
            </label>
          </div>

          <div class="relative flex-1">
            <input id="endDate" type="date" v-model="endDate" placeholder=" " class="input-floating px-2 peer" />
            <label for="endDate" class="label-floating left-3">
              {{ $t('common.to') }}
            </label>
          </div>
        </div>

        <!-- Filtres de selection -->
        <div class="flex gap-3 w-full sm:w-auto">
          <div class="relative flex-1 sm:w-[180px] md:w-[200px]">
            <select v-model="sortOption" placeholder=" " class="input-floating px-2 peer">
              <option disabled hidden value="">{{ $t('common.sortBy') }}</option>
              <option value="date_desc">{{ $t('blogPage.sortNewest') }}</option>
              <option value="date_asc">{{ $t('blogPage.sortOldest') }}</option>
              <option value="alpha_asc">{{ $t('blogPage.sortAlphaAsc') }}</option>
              <option value="alpha_desc">{{ $t('blogPage.sortAlphaDesc') }}</option>
            </select>
            <label class="label-floating left-3">
              {{ $t('common.sortBy') }}
            </label>
          </div>

          <!-- Bouton rafraîchir -->
          <button @click="fetchBlogPosts"
            class="group flex items-center justify-center gap-1 sm:gap-2 hover:text-primary bg-ash hover:bg-WtB border transition-colors px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium flex-none">
            <IconRefresh class="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300" :class="{
              'animate-spin': loading,
              'group-hover:rotate-180': !loading
            }" />
            <span class="hidden sm:inline">{{ $t('common.refreshButton') }}</span>
          </button>
        </div>
      </div>

      <!-- Indicateur de chargement -->
      <Loader v-if="loading" />

      <!-- Message d'erreur -->
      <div v-else-if="error" class="text-center p-4 sm:p-6 md:p-8">
        <div class="mb-3 sm:mb-4">
          <IconMoodCry class="w-10 h-10 sm:w-12 sm:h-12 mx-auto" />
          <p class="text-danger text-sm sm:text-base">{{ error }}</p>
        </div>

        <button @click="fetchBlogPosts"
          class="bg-primary text-WtB px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-secondary transition-colors text-sm sm:text-base">
          {{ $t('common.retryButton') }}
        </button>
      </div>

      <!-- Affichage des articles de blog -->
      <section v-else class="grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <article v-for="post in paginatedJobs" :key="post.id"
          class="bg-ash shadow rounded overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
          <div class="relative">
            <img
              :src="post.imageUrl ? post.imageUrl : 'https://placehold.co/600x400/0284c7/FFFFFF/png?text=' + $t('blogPage.loadingImage')"
              :alt="$t('blogPage.imageAlt')" class="w-full h-40 sm:h-48 object-cover" />

            <div class="absolute top-0 left-0 bg-BtW bg-opacity-50 text-WtB px-2 py-1 text-xs">
              {{ post.category.name }}
            </div>

            <div class="absolute top-0 right-0 bg-primary bg-opacity-50 text-WtB px-2 py-1 text-xs">
              <span class="flex items-center gap-1 sm:gap-2">
                <IconEye class="w-3 h-3 sm:w-4 sm:h-4" />
                {{ post?.views }}
              </span>
            </div>
          </div>
          <div class="p-3 sm:p-4 flex flex-col flex-grow">
            <h2 class="text-lg sm:text-xl text-primary font-medium border-b border-primary mb-2 sm:mb-4">
              {{ post.title }}
            </h2>

            <div
              class="flex flex-col sm:flex-row sm:items-center sm:space-x-4 justify-center text-xs sm:text-sm mb-3 sm:mb-4 gap-1 sm:gap-0">
              <span class="flex items-center gap-1 sm:gap-2">
                <IconUserEdit class="w-3 h-3 sm:w-4 sm:h-4" />
                <NuxtLink :to="`https://progestionsoft.netlify.app/blogs/author/${post.author.slug}`" target="_blank"
                  class="hover:underline">
                  {{ post.author.name }}
                </NuxtLink>
              </span>
              <span class="hidden sm:block">•</span>
              <span class="flex items-center gap-1 sm:gap-2">
                <IconCalendarFilled class="w-3 h-3 sm:w-4 sm:h-4" />
                {{ formatShortDate(post.createdAt, locale) }}
              </span>
            </div>

            <div class="line-clamp-3 text-xs sm:text-sm mb-3 sm:mb-4" v-html="post.excerpt"></div>

            <NuxtLink :to="localePath(`/blog/${post.slug}`)"
              class="inline-block text-primary hover:text-secondary transition-colors flex items-center gap-1 sm:gap-2 justify-end text-xs sm:text-sm">
              {{ $t('blogPage.readMore') }}
              <IconArrowRight class="w-3 h-3 sm:w-4 sm:h-4" />
            </NuxtLink>
          </div>
        </article>

        <!-- Absence d'articles après filtrage -->
        <div v-if="filteredPosts.length === 0" class="text-center col-span-full py-8 sm:py-12">
          <div>
            <IconArticleOff class="w-10 h-10 sm:w-12 sm:h-12 mx-auto" />
          </div>
          <p class="text-sm sm:text-base">{{ $t('blogPage.noArticlesFound') }}<span class="font-bold">{{ searchQuery
          }}</span> </p>
        </div>
      </section>

      <!-- Pagination -->
      <usePagination :totalItems="filteredPosts.length" :itemsPerPage="itemsPerPage" :currentPage="currentPage"
        :itemLabel="$t('blogPage.itemLabel')" :perPageOptions="[3, 6, 12, 24]"
        @update:currentPage="currentPage = $event" @update:itemsPerPage="itemsPerPage = $event" />
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { PGSServices } from '~/stores/PGSServices'
import { IconMoodCry, IconUserEdit, IconCalendarFilled, IconEye, IconArrowRight, IconArticleOff, IconSearch, IconRefresh } from '@tabler/icons-vue'
import Loader from '~/components/Load/LBlog.vue'
import { useI18n } from 'vue-i18n'
import { formatShortDate } from '@/utils/date.js';
import { useSharedFiles } from '~/stores/sharedFiles';

const sharedFiles = useSharedFiles();
const { t, locale } = useI18n();
const localePath = useLocalePath()

useHead({
  title: t('blogPage.heroTitle')
})

const blogPosts = ref([])
const loading = ref(true)
const error = ref(null)

// Variables de filtre, tri et page
const searchQuery = ref('')
const startDate = ref('')
const endDate = ref('')
const sortOption = ref('date_desc')

const currentPage = ref(1)
const itemsPerPage = ref(6)

// Récupération
const fetchBlogPosts = async () => {
  error.value = null
  loading.value = true
  let attempts = 0
  const maxAttempts = 2

  while (attempts < maxAttempts) {
    try {
      const response = await PGSServices.getAllBlogPosts();
      const filtered = response.data.filter(post => ['SuitOps', 'PGS', 'Général'].includes(post.category.name));
      blogPosts.value = filtered || [];
      loading.value = false
      return
    } catch (err) {
      attempts++
      console.error(`Erreur lors de la récupération des articles, tentative ${attempts}:`, err)
      if (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 500))
      } else {
        error.value = t('common.loadError', { object: t('blogPage.heroTitle') });
        loading.value = false
      }
    }
  }
}

fetchBlogPosts()

// Aplication des filtres et tri
const filteredPosts = computed(() => {
  let posts = [...blogPosts.value]

  // Filtre par recherche (titre)
  if (searchQuery.value) {
    posts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Filtre par date
  if (startDate.value) {
    posts = posts.filter(
      (post) => new Date(post.createdAt) >= new Date(startDate.value)
    )
  }
  if (endDate.value) {
    posts = posts.filter(
      (post) => new Date(post.createdAt) <= new Date(endDate.value)
    )
  }

  // Tri selon l'option choisie
  if (sortOption.value === 'alpha_asc') {
    posts.sort((a, b) => a.title.localeCompare(b.title))
  } else if (sortOption.value === 'alpha_desc') {
    posts.sort((a, b) => b.title.localeCompare(a.title))
  } else if (sortOption.value === 'date_asc') {
    posts.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    )
  } else {
    // Par défaut, du plus récent au plus ancien
    posts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
  }

  return posts
})

// Pagination
const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredPosts.value.slice(start, start + itemsPerPage.value);
});
</script>


<style scoped>
.input-floating {
  @apply block px-10 pb-2 pt-3 w-full text-sm bg-WtB rounded-lg border appearance-none focus:outline-none focus:ring-0 focus:border-primary;
}

.label-floating {
  @apply absolute text-xs sm:text-sm duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] bg-WtB px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-4;
}

input[type="date"],
select {
  @apply px-2 !important;
}
</style>
