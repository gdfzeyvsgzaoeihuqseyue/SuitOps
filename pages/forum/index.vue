<template>
  <!-- Hero section -->
  <header class="relative py-24 bg-cover bg-center"
    style="background-image: url('https://raw.githubusercontent.com/ProGestionSoft/Files/main/SuitOps_Landing/Hero/forum.png');">
    <div class="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90"></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
      <h1 class="text-5xl md:text-6xl font-bold mb-6" v-motion :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0 }">
        Forum d'entraide
      </h1>
      <p class="text-xl max-w-2xl md:text-2xl mx-auto">
        Espace communautaire d'échange et d'entraide professionnelle.
      </p>
    </div>
  </header>

  <section class="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
    <Loader v-if="loading" />

    <!-- Message d'erreur -->
    <div v-else-if="error" class="text-center">
      <div class="mb-4">
        <IconMoodCry class="w-12 h-12 mx-auto" />
        <p class="text-danger">{{ error }}</p>
      </div>

      <button @click="fetchForumPosts"
        class="bg-primary text-WtB px-4 py-2 rounded-md hover:bg-secondary transition-colors">
        Réessayer
      </button>
    </div>

    <!-- Contenu principal -->
    <div v-else>
      <!-- Section Toutes les catégories -->
      <h2 class="text-3xl font-bold mb-6 text-center">Toutes les catégories</h2>

      <div class="flex flex-col md:flex-row gap-4 mb-8">
        <input v-model="categorySearch" type="text" placeholder="Rechercher par catégorie..."
          class="p-2 border rounded-lg flex-grow">
        <select v-model="sortBy" class="p-2 border rounded-lg">
          <option value="default">Défaut</option>
          <option value="name">Ordre alphabétique</option>
          <option value="posts">Nombre de posts</option>
        </select>
      </div>

      <!-- Nombre de catégories -->
      <p class="text-center my-4">
        <span class="font-bold text-primary">{{ forumStats.length }}</span>
        catégories disponibles
      </p>

      <div v-if="filteredCategories.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div v-for="category in filteredCategories" :key="category.category"
          class="bg-white p-6 border border-2 hover:border-primary rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <NuxtLink :to="`/forum/${category.category}`" class="block">
            <h2 class="text-xl font-semibold mb-2">{{ category.category }}</h2>
            <div class="flex justify-between mb-4">
              <span>{{ category.posts }} sujet{{ category.posts > 1 ? 's' : '' }}</span>
              <span>{{ category.responses }} réponse{{ category.responses > 1 ? 's' : '' }}</span>
            </div>


            <div v-if="category.lastPost" class="border-t pt-4">
              <p class="text-xs text-center mt-1">
                Dernier sujet posté le
                <span class="font-semibold"> {{ formatDate(category.lastPost.createdAt) }} </span>
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Message d'absence de catégorie -->
      <div v-else class="text-center col-span-full py-12">
        <div class="mb-4">
          <IconAppsOff class="w-12 h-12 mx-auto" />
        </div>
        <p>
          Aucune catégorie ne correspond à <span class="font-bold">{{ categorySearch }}</span>
        </p>
      </div>

      <!-- Section derniers sujets -->
      <div>
        <h2 class="text-3xl font-bold mb-6 text-center">Derniers sujets</h2>

        <div class="flex flex-col md:flex-row gap-4 mb-6">
          <input v-model="postSearch" type="text" placeholder="Rechercher dans les posts..."
            class="p-2 border rounded-lg flex-grow">
          <select v-model="selectedCategory" class="p-2 border rounded-lg">
            <option value="">Toutes les catégories</option>
            <option v-for="cat in categoriesList" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
        </div>

        <div v-if="filteredPosts.length" class="space-y-4">
          <div v-for="post in filteredPosts" :key="post.id" class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center justify-between mb-4">
              <NuxtLink :to="`/forum/post/${post.id}`" class="hover:text-secondary line-clamp-1">
                {{ post.content }}
              </NuxtLink>
              <span class="text-sm shrink-0">
                {{ formatDate(post.createdAt) }}
              </span>
            </div>

            <div class="flex items-center text-sm gap-2 flex-wrap">
              Publié par
              <div class="relative inline-block">
                <!-- Nom de l'entreprise -->
                <span class="text-primary cursor-pointer" @mouseenter="showTooltip(post.id)" @mouseleave="hideTooltip">
                  {{ post.company.name }}
                </span>

                <!-- Bulle avec tooltip -->
                <div v-if="visibleTooltip === post.id"
                  class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 z-30"
                  @mouseenter="showTooltip(post.id)" @mouseleave="hideTooltip">
                  <div
                    class="bg-green-50 p-3 rounded-lg shadow-md border border-green-100 whitespace-nowrap space-y-2 min-w-[180px] text-center relative">
                    <!-- Bouton fermer -->
                    <button
                      class="absolute top-2 right-2 text-xs transform transition duration-300 ease-in-out hover:rotate-90 hover:text-danger"
                      @click="visibleTooltip = null">
                      X
                    </button>
                    <p>
                      Pour <span class="font-semibold">{{ post.company.name }}</span>, vous souhaitez voir :
                    </p>
                    <div class="flex gap-3 justify-center">
                      <NuxtLink :to="`/forum/company/${post.company.id}`"
                        class="text-green-600 hover:text-green-800 transition-colors text-sm px-2 py-1 bg-green-100 rounded hover:bg-green-200"
                        @click.prevent.stop>
                        Les postes
                      </NuxtLink>
                      <NuxtLink :to="`/company/${post.company.id}/${post.company.name}`"
                        class="text-green-600 hover:text-green-800 transition-colors text-sm px-2 py-1 bg-green-100 rounded hover:bg-green-200"
                        @click.prevent.stop>
                        Le profil
                      </NuxtLink>
                    </div>
                  </div>
                  <!-- Triangle décoratif -->
                  <div
                    class="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-green-50 rotate-45 transform origin-top shadow-[1px_1px_2px_0_rgba(0,0,0,0.1)]">
                  </div>
                </div>
              </div>
              <span>•</span>
              <div>
                Dans
                <NuxtLink :to="`/forum/${post.category}`"
                  class="bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 hover:text-secondary transition-colors">
                  {{ post.category }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Message d'absence de sujet -->
        <div v-else class="text-center col-span-full py-12">
          <div class="mb-4">
            <IconEditOff class="w-12 h-12 mx-auto" />
          </div>
          <p>
            Aucun post ne correspond à <span class="font-bold">{{ postSearch }}</span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { SuitOpsServices } from '~/services/SuitOpsServices.js'
import { IconMoodCry, IconAppsOff, IconEditOff } from '@tabler/icons-vue'
import Loader from '~/components/Load/LForum.vue'

useHead({
  title: 'Forum'
})

const categorySearch = ref('')
const postSearch = ref('')
const sortBy = ref('default')
const selectedCategory = ref('')
const loading = ref(true)
const error = ref(null)
const forumStats = ref([])
const forumPosts = ref([])

// Id du post pour le tooltip
const visibleTooltip = ref(null)
let tooltipTimeout = null

const showTooltip = (postId) => {
  clearTimeout(tooltipTimeout)
  visibleTooltip.value = postId
}

const hideTooltip = () => {
  tooltipTimeout = setTimeout(() => {
    visibleTooltip.value = null
  }, 300)
}

const categoriesList = computed(() => {
  return [...new Set(forumStats.value.map(c => c.category))].sort()
})

const fetchForumPosts = async () => {
  error.value = null
  loading.value = true
  let attempts = 0
  const maxAttempts = 2

  const loadData = async () => {
    while (attempts < maxAttempts) {
      try {
        const [statsResponse, postsResponse] = await Promise.all([
          SuitOpsServices.getAllPostStats(),
          SuitOpsServices.getAllPostAll()
        ])
        forumStats.value = statsResponse.data?.data || statsResponse.data || []
        forumPosts.value = postsResponse.data?.data || postsResponse.data || []
        return
      } catch (err) {
        attempts++
        console.error(`Erreur lors de la récupération des postes du forum, tentative ${attempts}:`, err)
        if (attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 500))
        } else {
          error.value = "Une erreur est survenue lors de la récupération des postes du forum."
          return false
        }
      }
    }
  }

  await loadData()
  loading.value = false
}

fetchForumPosts()

const filteredCategories = computed(() => {
  let categories = forumStats.value.filter(c =>
    c.category.toLowerCase().includes(categorySearch.value.toLowerCase())
  )
  if (sortBy.value === 'name') {
    categories = categories.slice().sort((a, b) => a.category.localeCompare(b.category))
  } else if (sortBy.value === 'posts') {
    categories = categories.slice().sort((a, b) => b.posts - a.posts)
  }
  return categories
})

const filteredPosts = computed(() => {
  return forumPosts.value.filter(post => {
    const searchMatch = (
      post.content?.toLowerCase().includes(postSearch.value.toLowerCase()) ||
      post.company.name?.toLowerCase().includes(postSearch.value.toLowerCase())
    )
    const categoryMatch = selectedCategory.value ?
      post.category === selectedCategory.value :
      true
    return searchMatch && categoryMatch
  })
})

const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  const today = new Date()

  // Vérification si la date est aujourd'hui
  const isToday = date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()

  // Vérification si la date est hier
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  const isYesterday = date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate()

  const formattedTime = date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  const diff = Date.now() - date.getTime()
  let relative = ''
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7))
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30))
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))

  if (seconds < 60) {
    relative = `il y a ${seconds} secondes`
  } else if (minutes < 60) {
    relative = `il y a ${minutes} minutes`
  } else if (hours < 24) {
    relative = `il y a ${hours} heures`
  } else if (days < 7) {
    relative = `il y a ${days} jours`
  } else if (weeks < 5) {
    relative = `il y a ${weeks} semaines`
  } else if (months < 12) {
    relative = `il y a ${months} mois`
  } else {
    relative = `il y a ${years} ans`
  }

  if (isToday) {
    return `Aujourd'hui à ${formattedTime} (${relative})`
  } else if (isYesterday) {
    return `Hier à ${formattedTime} (${relative})`
  } else {
    const formattedDate = date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    return `${formattedDate} à ${formattedTime} (${relative})`
  }
}
</script>
