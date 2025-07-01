<template>
  <section class="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative mt-16 container mx-auto">
    <!-- Bouton retour -->
    <button @click="router.go(-1)" class="mb-6 text-primary hover:text-secondary flex items-center gap-2">
      <IconArrowLeft class="w-5 h-5" />
      Retour
    </button>

    <!-- Chargement -->
    <div v-if="loading" class="flex flex-col items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
      <div>Chargement des posts de l'entreprise...</div>
    </div>

    <!-- Message d'erreur -->
    <div v-else-if="error" class="text-center">
      <div class="mb-4">
        <IconMoodCry class="w-12 h-12 mx-auto" />
        <p class="text-danger">{{ error }}</p>
      </div>

      <button @click="fetchCompanyPosts" class="mt-4 bg-primary text-white px-4 py-2 rounded">
        Réessayer
      </button>
    </div>

    <!-- Affichage des posts -->
    <div v-else>
      <!-- Titre de la catégorie modifié -->
      <h1 class="text-3xl mb-6 text-center flex items-center justify-center gap-2">
        <span>Postes de</span>

        <NuxtLink :to="`/company/${companyId}/${companyName}`"
          class="text-primary font-bold uppercase hover:text-secondary transition-colors flex items-center gap-2"
          :title="`Consulter le profil de ${companyName}`">
          {{ companyName || "Entreprise inconnue" }}
        </NuxtLink>
      </h1>


      <!-- Nouvelle section: Statistiques de l'entreprise -->
      <div class="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div class="flex justify-between">
          <div class="text-center">
            <p class="text-2xl font-bold text-primary">{{ companyStats.totalPosts || 0 }}</p>
            <p>Sujet{{ companyStats.totalPosts > 1 ? 's' : '' }}</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-primary">{{ companyStats.totalResponses || 0 }}</p>
            <p>Réponse{{ companyStats.totalResponses > 1 ? 's' : '' }}</p>
          </div>
          <div class="text-center" v-if="companyStats.lastPost">
            <p class="text-sm">Dernier post</p>
            <p class="font-medium">{{ formatDate(companyStats.lastPost.createdAt) }}</p>
          </div>
        </div>
      </div>

      <!-- Barre de recherche et filtres -->
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
              <IconCategory2 />
              <NuxtLink :to="`/forum/${post.category}`"
                class="bg-gray-100 px-2 py-1 rounded text-primary hover:text-secondary cursor-pointer relative z-20">
                {{ post.category || '' }}
              </NuxtLink>
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
          Aucun poste ne correspond à <span class="font-bold"> {{ searchQuery }} </span> chez <span class="font-bold">{{
            companyName }}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { SuitOpsServices } from '~/services/SuitOpsServices.js'
import { IconMoodCry, IconArrowLeft, IconCalendar, IconCategory2, IconEditOff } from '@tabler/icons-vue'

const router = useRouter()
const route = useRoute()
const companyId = route.params.company

const loading = ref(true)
const error = ref(null)
const posts = ref([])
const companyName = ref('')
const searchQuery = ref('')
const dateRange = ref({ start: null, end: null })

// Computed pour les statistiques
const companyStats = computed(() => {
  return {
    totalPosts: posts.value.length,
    totalResponses: posts.value.reduce((acc, post) => acc + (post.responses?.length || 0), 0),
    lastPost: posts.value.length > 0
      ? [...posts.value].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]
      : null
  }
})

//Dynamique du titre
const pageTitle = computed(() =>
  companyName.value
    ? `${companyName.value} - Postes`
    : "Posts de l'entreprise"
)

useHead({
  title: pageTitle
})

const fetchCompanyPosts = async () => {
  error.value = null
  loading.value = true
  let attempts = 0
  const maxAttempts = 2

  while (attempts < maxAttempts) {
    try {
      const response = await SuitOpsServices.getAllPostAll()
      const allPosts = response.data || []
      posts.value = allPosts.filter(post => String(post.company?.id) === String(companyId))
      if (posts.value.length > 0) {
        companyName.value = posts.value[0].company?.name || ''
      }
      loading.value = false
      return
    } catch (err) {
      attempts++
      console.error(`Erreur lors du chargement des posts de l'entreprise, tentative ${attempts}:`, err)
      if (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 500))
      } else {
        error.value = "Impossible de charger les posts de l'entreprise."
        loading.value = false
      }
    }
  }
}

const filteredPosts = computed(() => {
  return posts.value.filter(post => {
    const searchMatch = (
      post.content?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.topic?.toLowerCase().includes(searchQuery.value.toLowerCase())
    )

    const postDate = new Date(post.createdAt)
    const startDate = dateRange.value.start ? new Date(dateRange.value.start) : null
    const endDate = dateRange.value.end ? new Date(dateRange.value.end + 'T23:59:59') : null

    return searchMatch &&
      (!startDate || postDate >= startDate) &&
      (!endDate || postDate <= endDate)
  })
})

const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  const today = new Date()

  const isToday = date.toDateString() === today.toDateString()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  const isYesterday = date.toDateString() === yesterday.toDateString()

  const timeString = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })

  if (isToday) return `Aujourd'hui à ${timeString}`
  if (isYesterday) return `Hier à ${timeString}`
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }) + ` à ${timeString}`
}

fetchCompanyPosts()
</script>