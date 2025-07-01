<template>
  <section class="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative mt-16 container mx-auto">
    <!-- Bouton retour -->
    <button @click="router.go(-1)" class="mb-6 text-primary hover:text-secondary flex items-center gap-2">
      <IconArrowLeft class="w-5 h-5" />
      Retour
    </button>

    <!-- Chargement -->
    <Loader v-if="loading" />

    <!-- Message d'erreur -->
    <div v-else-if="error" class="text-center">
      <div class="mb-4">
        <IconMoodCry class="w-12 h-12 mx-auto" />
        <p class="text-danger">{{ error }}</p>
      </div>

      <button @click="fetchCategoryData"
        class="bg-primary text-WtB px-4 py-2 rounded-md hover:bg-secondary transition-colors">
        Réessayer
      </button>
    </div>

    <!-- Contenu principal -->
    <div v-else>
      <!-- Titre de la catégorie -->
      <h1 class="text-primary text-3xl font-bold mb-6 text-center uppercase">
        {{ categoryData.category || 'Catégorie inconnue' }}
      </h1>

      <!-- Statistiques de la catégorie -->
      <div class="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div class="flex justify-between">
          <div class="text-center">
            <p class="text-2xl font-bold text-primary">{{ categoryData.posts || 0 }}</p>
            <p>Sujet{{ categoryData.posts > 1 ? 's' : '' }}</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-primary">{{ categoryData.responses || 0 }}</p>
            <p>Réponse{{ categoryData.responses > 1 ? 's' : '' }}</p>
          </div>
          <div class="text-center" v-if="categoryData.lastPost">
            <p class="text-sm">Dernier post</p>
            <p class="font-medium">{{ formatDate(categoryData.lastPost.createdAt) }}</p>
          </div>
        </div>
      </div>

      <!-- Filtres de recherche -->
      <div class="flex flex-col md:flex-row gap-4 mb-8">
        <input v-model="searchQuery" type="text" placeholder="Rechercher dans les posts..."
          class="p-2 border rounded-lg flex-grow">
        <div class="flex items-center gap-2">
          <label for="startDate" class="font-medium">de:</label>
          <input id="startDate" v-model="dateRange.start" type="date" class="p-2 border rounded-lg">
          <label for="endDate" class="font-medium">à:</label>
          <input id="endDate" v-model="dateRange.end" type="date" class="p-2 border rounded-lg">
        </div>
      </div>

      <!-- Liste des posts -->
      <div v-if="filteredPosts.length" class="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
        <div v-for="post in filteredPosts" :key="post.id"
          class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <NuxtLink :to="`/forum/post/${post.id}`" class="block">
            <p class="text-xl hover:text-primary mb-2 line-clamp-1">{{ post.content || '' }}</p>
          </NuxtLink>

          <div class="flex items-center justify-between text-sm">
            <div class="flex items-center gap-2">
              <IconCalendar />
              <span>{{ formatDate(post.createdAt) }}</span>
            </div>

            <div class="flex items-center gap-2">
              <div class="flex items-center gap-2">
                <IconBuildingSkyscraper />
                <div class="relative inline-block group">
                  <!-- Nom de l'entreprise -->
                  <span class="text-primary cursor-pointer" 
                        @mouseenter="showTooltip(post.id)" 
                        @mouseleave="hideTooltip">
                    {{ post.company.name }}
                  </span>

                  <!-- Bulle avec tooltip contrôlé -->
                  <div v-if="visibleTooltip === post.id"
                      class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 z-30"
                      @mouseenter="showTooltip(post.id)" 
                      @mouseleave="hideTooltip">
                    <div class="bg-green-50 p-3 rounded-lg shadow-md border border-green-100 whitespace-nowrap space-y-2 min-w-[180px] text-center relative">
                      <!-- Bouton fermer -->
                      <button class="absolute top-2 right-2 text-xs transform transition duration-300 ease-in-out hover:rotate-90 hover:text-danger"
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
                    <div class="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-green-50 rotate-45 transform origin-top shadow-[1px_1px_2px_0_rgba(0,0,0,0.1)]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Message d'absence de catégorie -->
      <div v-else class="text-center col-span-full py-12">
        <div class="mb-4">
          <IconEditOff class="w-12 h-12 mx-auto" />
        </div>
        <p>
          Aucun poste ne correspond à <span class="font-bold"> {{ searchQuery }} </span> dans <span class="font-bold">{{
            categoryData.category }}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { SuitOpsServices } from '~/services/SuitOpsServices.js'
import { IconMoodCry, IconArrowLeft, IconCalendar, IconBuildingSkyscraper, IconEditOff } from '@tabler/icons-vue'
import Loader from '~/components/Load/LForumCat.vue'

const router = useRouter()
const route = useRoute()
const categoryName = decodeURIComponent(route.params.categorie || '')

const loading = ref(true)
const error = ref(null)
const categoryData = ref({})
const posts = ref([])
const searchQuery = ref('')
const dateRange = ref({ start: null, end: null })

// Titre dynamique de la page
const categoryTitle = computed(() => {
  return categoryData.value.category ? `${categoryData.value.category}` : 'Catégorie'
})

useHead({
  title: categoryTitle
})

// Contrôle du tooltip
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

// Fonction de récupération des données de la catégorie
const fetchCategoryData = async () => {
  error.value = null
  loading.value = true
  let attempts = 0
  const maxAttempts = 2

  while (attempts < maxAttempts) {
    try {
      // Encodage du nom de catégorie pour l'API
      const encodedCategory = encodeURIComponent(categoryName)

      // Récupération des stats et des posts pour la catégorie
      const [statsResponse, postsResponse] = await Promise.all([
        SuitOpsServices.getAllPostStats(),
        SuitOpsServices.getPostsByCategory(encodedCategory)
      ])

      // Recherche dans les statistiques de la catégorie concernée
      const allStats = statsResponse.data || []
      categoryData.value = allStats.find(c => c.category === categoryName) || {}

      // Récupération des posts
      posts.value = postsResponse.data || []
      break
    } catch (err) {
      attempts++
      console.error(`Erreur de chargement (tentative ${attempts}):`, err)
      if (attempts >= maxAttempts) {
        error.value = "Impossible de charger les données de la catégorie"
      } else {
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    }
  }
  loading.value = false
}

// Filtrage des posts en fonction du texte et de la plage de dates
const filteredPosts = computed(() => {
  return posts.value.filter(post => {
    const contentText = (post.content || '').toLowerCase()
    const topicText = (post.topic || '').toLowerCase()
    const queryText = searchQuery.value.toLowerCase()
    const textMatch = contentText.includes(queryText) || topicText.includes(queryText)

    // Filtrage par date
    const postDate = new Date(post.createdAt)
    const startDate = dateRange.value.start ? new Date(dateRange.value.start) : null
    const endDate = dateRange.value.end ? new Date(dateRange.value.end + 'T23:59:59') : null
    const dateMatch = (!startDate || postDate >= startDate) && (!endDate || postDate <= endDate)

    return textMatch && dateMatch
  })
})

// Formatage de la date
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

// Chargement initial
fetchCategoryData()
</script>
