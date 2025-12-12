<template>
  <section class="relative py-12 bg-gray-50 min-h-screen mt-16 container mx-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Bouton retour -->
      <button @click="router.go(-1)" class="text-primary hover:text-secondary flex items-center my-4 gap-2">
        <IconArrowLeft class="w-5 h-5" /> Retour
      </button>

      <!-- Loader -->
      <div v-if="loading" class="flex flex-col gap-4 justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
        <div>Chargement du post...</div>
      </div>

      <!-- Message d'erreur -->
      <div v-else-if="error" class="text-center py-12">
        <div class="mb-4">
          <IconMoodCry class="w-12 h-12 mx-auto" />
          <p class="text-red-500">{{ error }}</p>
        </div>
        <button @click="fetchPost" class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
          Réessayer
        </button>
      </div>

      <!-- Contenu principal du post et réponses -->
      <div v-else>
        <!-- Carte du post principal (toujours récupéré via l'endpoint public) -->
        <div class="bg-bgClr rounded-lg shadow-sm p-6 mb-8 border-l-8 border-primary">
          <div class="flex flex-wrap justify-between items-start gap-4 mb-4">
            <h1 class="text-3xl flex-1">{{ postData.content }}</h1>
            <span class="text-sm text-gray-500">{{ formatDate(postData.createdAt) }}</span>
          </div>

          <!-- Métadonnées du post -->
          <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div class="flex items-center">
              <IconCategory class="w-4 h-4 mr-1" />
              {{ postData.category }}
            </div>
            <div class="flex items-center">
              <IconBuildingSkyscraper class="w-4 h-4 mr-1" />
              <span class="text-primary cursor-help" @mouseenter="showCompanyTooltip" @mouseleave="hideCompanyTooltip">
                {{ postData.company.name }}
              </span>
            </div>
          </div>

          <!-- Tooltip Entreprise -->
          <div v-if="showCompany" class="relative mt-4 p-4 bg-gray-50 rounded-lg">
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p class="font-semibold">Coordonnées :</p>
                <div class="border-l-2 pl-2">
                  <p>{{ postData.company.emailAddress }}</p>
                  <p>{{ postData.company.address }}</p>
                </div>
              </div>
              <div>
                <p class="font-semibold">Activités :</p>
                <div class="border-l-2 pl-2">
                  <p>{{ decodeHTMLEntities(postData.company.mainActivity) }}</p>
                  <p>{{ decodeHTMLEntities(postData.company.secondaryActivity) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Barre de recherche et tri -->
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <input v-model="searchTerm" type="text" placeholder="Rechercher dans les réponses..."
            class="p-2 border rounded w-full md:w-1/2">
          <select v-model="sortOption" class="p-2 border rounded md:w-1/4">
            <option value="recent">Récent</option>
            <option value="oldest">Ancien</option>
            <option value="alphaAsc">A-Z</option>
            <option value="alphaDesc">Z-A</option>
          </select>
        </div>

        <!-- En-tête des réponses avec trait horizontal -->
        <div class="flex items-center mb-6">
          <h2 class="text-xl font-bold">
            {{ postData.responses.length }} réponse{{ postData.responses.length > 1 ? 's' : '' }}
          </h2>
          <div class="flex-1 border-t border-gray-300 ml-4"></div>
        </div>

        <!-- Liste paginée des réponses -->
        <div v-if="filteredResponses.length" class="space-y-6 pl-4 border-l-2">
          <div v-for="response in paginatedResponses" :key="response.id"
            :class="['p-6 rounded-lg shadow-sm border', response.isSolution ? 'bg-green-50 border-green-500' : 'bg-white']">
            <div class="flex flex-wrap justify-between items-center gap-4 mb-4">
              <div class="flex items-center gap-2">
                <span class="font-semibold">{{ response.company.name }}</span>
                <span class="text-xs text-gray-500">({{ formatDate(response.createdAt) }})</span>
              </div>
              <div class="flex gap-2">
                <!-- Bouton Marquer/Démarquer comme meilleure solution (seul l'auteur du post peut agir) -->
                <button v-if="postData.owner" @click="markAsBest(response.id)" class="px-2 py-1 rounded"
                  :class="response.isSolution ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'">
                  {{ response.isSolution ? 'Démarquer' : 'Marquer comme meilleure solution' }}
                </button>
                <!-- Bouton de suppression (disponible pour tous les utilisateurs connectés) -->
                <button v-if="token" @click="deleteResponse(response.id)"
                  class="px-2 py-1 bg-red-100 text-red-800 rounded">
                  Supprimer
                </button>
              </div>
            </div>
            <p class="whitespace-pre-wrap text-gray-800">{{ response.content }}</p>
            <!-- Fichiers joints -->
            <div v-if="response.files && response.files.length" class="mt-4">
              <p class="text-sm text-gray-600 mb-2">Pièces jointes :</p>
              <div class="flex flex-wrap gap-2">
                <a v-for="file in response.files" :key="file.id" class="file-link" :href="file.url" target="_blank">
                  <IconFile class="w-4 h-4 mr-1" />
                  {{ file.name }}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-12 text-gray-500">
          <IconMessageOff class="w-12 h-12 mx-auto mb-4" />
          Aucune réponse n'a été publiée pour le moment
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center items-center mt-6 gap-2">
          <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
            class="px-3 py-1 border rounded hover:bg-gray-200">
            Précédent
          </button>
          <span>Page {{ currentPage }} / {{ totalPages }}</span>
          <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
            class="px-3 py-1 border rounded hover:bg-gray-200">
            Suivant
          </button>
        </div>

        <!-- Zone d'ajout de réponse -->
        <div class="mt-8 bg-white rounded-lg shadow-sm p-6 border">
          <!-- Si l'utilisateur est connecté -->
          <div v-if="token">
            <div class="flex justify-between items-center mb-4">
              <p class="text-lg font-bold">Connecté en tant que <span class="text-primary">{{ loggedUser }}</span></p>
              <button @click="logout" class="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200">
                Déconnexion
              </button>
            </div>
            <h3 class="text-lg font-bold mb-4">Ajouter une réponse</h3>
            <form @submit.prevent="submitReply">
              <textarea v-model="replyContent" rows="4" placeholder="Votre réponse..."
                class="w-full p-2 border rounded mb-4" required></textarea>
              <button type="submit"
                class="bg-primary text-WtB px-4 py-2 rounded-md hover:bg-secondary transition-colors">
                Envoyer
              </button>
            </form>
          </div>
          <!-- Si l'utilisateur n'est pas connecté -->
          <div v-else class="text-center">
            <p class="mb-4">Vous devez être connecté pour ajouter une réponse.</p>
            <button @click="toggleLoginForm"
              class="bg-primary text-WtB px-4 py-2 rounded-md hover:bg-secondary transition-colors">
              Se connecter
            </button>
            <div v-if="showLoginForm" class="mt-6 max-w-md mx-auto bg-gray-100 p-4 rounded">
              <h2 class="text-xl font-bold mb-4 text-center">Connexion</h2>
              <form @submit.prevent="loginUser">
                <div class="mb-4">
                  <label class="block text-sm font-medium mb-1">Login</label>
                  <input v-model="login" type="text" placeholder="Votre login" class="w-full p-2 border rounded"
                    required>
                </div>
                <div class="mb-4">
                  <label class="block text-sm font-medium mb-1">Mot de passe</label>
                  <input v-model="password" type="password" placeholder="Votre mot de passe"
                    class="w-full p-2 border rounded" required>
                </div>
                <button type="submit"
                  class="w-full px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors">
                  Se connecter
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { IconArrowLeft, IconCategory, IconBuildingSkyscraper, IconFile, IconMessageOff, IconMoodCry } from '@tabler/icons-vue'
import Loader from '~/components/Load/LForum.vue'

const route = useRoute()
const router = useRouter()

// Données du post
const postData = ref(null)
const loading = ref(true)
const error = ref(null)

// Gestion du tooltip entreprise
const showCompany = ref(false)
const showCompanyTooltip = () => (showCompany.value = true)
const hideCompanyTooltip = () => (showCompany.value = false)

// Décodage des entités HTML
const decodeHTMLEntities = (text) => {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}

// Formatage des dates
const formatDate = (timestamp) => {
  const date = new Date(Number(timestamp))
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Variables pour la connexion utilisateur
const login = ref('')
const password = ref('')
const token = ref(null)
const loggedUser = ref('')

// Contrôle de l'affichage du formulaire de connexion dans la zone réponse
const showLoginForm = ref(false)
const toggleLoginForm = () => (showLoginForm.value = !showLoginForm.value)

// Variable pour le contenu de la réponse
const replyContent = ref('')

// Sauvegarde du token dans le localStorage avec expiration 24h
const saveToken = (userToken, userLogin) => {
  const expiry = new Date().getTime() + 24 * 60 * 60 * 1000
  localStorage.setItem('userToken', userToken)
  localStorage.setItem('tokenExpiry', expiry)
  localStorage.setItem('loggedUser', userLogin)
}

// Récupération du token depuis le localStorage s'il est encore valide
const loadToken = () => {
  const storedToken = localStorage.getItem('userToken')
  const expiry = localStorage.getItem('tokenExpiry')
  const storedUser = localStorage.getItem('loggedUser')
  if (storedToken && expiry && new Date().getTime() < Number(expiry)) {
    token.value = storedToken
    loggedUser.value = storedUser || ''
  }
}

// Effacement du token du localStorage
const clearToken = () => {
  localStorage.removeItem('userToken')
  localStorage.removeItem('tokenExpiry')
  localStorage.removeItem('loggedUser')
}

// Confirmation de déconnexion
const logout = () => {
  if (confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
    token.value = null
    loggedUser.value = ''
    clearToken()
    fetchPost() // Recharge en mode public
  }
}

// Fonction de connexion (méthode PUT)
const loginUser = async () => {
  loading.value = true
  error.value = null
  try {
    const loginUrl = `https://api.pgs.ctrlengine.com/api/v1/auth/login?login=${encodeURIComponent(login.value)}&password=${encodeURIComponent(password.value)}`
    const response = await $fetch(loginUrl, { method: 'PUT' })
    if (response.status && response.token) {
      token.value = response.token
      loggedUser.value = login.value
      saveToken(response.token, login.value)
      showLoginForm.value = false
      await fetchPost() // Recharge le post (mode public ou admin si applicable)
    } else {
      throw new Error(response.message || 'Échec de la connexion')
    }
  } catch (err) {
    error.value = err.message || 'Erreur lors de la connexion'
    console.error('[LOGIN ERROR]', err)
  } finally {
    loading.value = false
  }
}

// Fonction de récupération du post (via l'endpoint public ou admin si l'utilisateur est l'auteur)
const fetchPost = async () => {
  loading.value = true
  error.value = null
  try {
    let endpoint;
    // Si connecté et que l'utilisateur est l'auteur du post, tenter l'endpoint admin pour avoir des actions spécifiques
    if (token.value && postData.value && postData.value.owner) {
      endpoint = `https://api.pgs.ctrlengine.com/api/v1/admin/post/${route.params.id}`
    } else {
      endpoint = `https://api.pgs.ctrlengine.com/api/v1/public/post/${route.params.id}`
    }
    const response = await $fetch(endpoint, {
      headers: token.value ? { Authorization: `Bearer ${token.value}` } : {}
    })
    if (!response.status || !response.data) {
      throw new Error('Structure de réponse API invalide')
    }
    postData.value = response.data
  } catch (err) {
    if (err.status === 404) {
      error.value = "Post introuvable ou accès non autorisé"
    } else {
      error.value = err.message || 'Erreur lors du chargement du post'
    }
    console.error('[POST ERROR]', err)
  } finally {
    loading.value = false
  }
}

// --- Pagination et filtres pour les réponses ---
const searchTerm = ref('')
const sortOption = ref('recent') // Options: recent, oldest, alphaAsc, alphaDesc
const responsesPerPage = 3
const currentPage = ref(1)

const filteredResponses = computed(() => {
  let responses = postData.value?.responses || []
  if (searchTerm.value.trim()) {
    responses = responses.filter(response =>
      response.content.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      response.company.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }
  if (sortOption.value === 'recent') {
    responses = responses.slice().sort((a, b) => b.createdAt - a.createdAt)
  } else if (sortOption.value === 'oldest') {
    responses = responses.slice().sort((a, b) => a.createdAt - b.createdAt)
  } else if (sortOption.value === 'alphaAsc') {
    responses = responses.slice().sort((a, b) => a.company.name.localeCompare(b.company.name))
  } else if (sortOption.value === 'alphaDesc') {
    responses = responses.slice().sort((a, b) => b.company.name.localeCompare(a.company.name))
  }
  return responses
})

const totalPages = computed(() => Math.ceil(filteredResponses.value.length / responsesPerPage))
const paginatedResponses = computed(() => {
  const start = (currentPage.value - 1) * responsesPerPage
  return filteredResponses.value.slice(start, start + responsesPerPage)
})

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Computed pour vérifier si l'utilisateur connecté est l'auteur du post (pour marquer une réponse comme meilleure solution)
const canMarkBest = computed(() => {
  return token.value && postData.value && postData.value.owner === true
})

// Fonction pour marquer/démarquer une réponse comme meilleure solution
const markAsBest = async (responseId) => {
  if (!confirm("Confirmez-vous la mise à jour de cette réponse en tant que meilleure solution ?")) return
  loading.value = true
  try {
    const endpoint = `https://api.pgs.ctrlengine.com/api/v1/admin/post/response/mark-as-best/${responseId}`
    const res = await $fetch(endpoint, { method: 'PUT', headers: { Authorization: `Bearer ${token.value}` } })
    if (res.status) {
      const idx = postData.value.responses.findIndex(r => r.id === responseId)
      if (idx !== -1) {
        postData.value.responses[idx].isSolution = !postData.value.responses[idx].isSolution
        alert(res.message)
      }
    }
  } catch (e) {
    alert("Erreur lors de la mise à jour de la meilleure solution")
    console.error(e)
  } finally {
    loading.value = false
  }
}

// Fonction pour supprimer une réponse (disponible pour tous les utilisateurs connectés)
const deleteResponse = async (responseId) => {
  if (!confirm("Êtes-vous sûr de vouloir supprimer cette réponse ?")) return
  loading.value = true
  try {
    const endpoint = `https://api.pgs.ctrlengine.com/api/v1/admin/post/response/delete/${responseId}`
    const res = await $fetch(endpoint, { method: 'DELETE', headers: { Authorization: `Bearer ${token.value}` } })
    if (res.status) {
      postData.value.responses = postData.value.responses.filter(r => r.id !== responseId)
      alert(res.message)
    }
  } catch (e) {
    alert("Erreur lors de la suppression de la réponse")
    console.error(e)
  } finally {
    loading.value = false
  }
}

// Fonction pour envoyer une réponse via l'endpoint admin
const submitReply = async () => {
  if (!replyContent.value.trim()) return
  loading.value = true
  error.value = null
  try {
    const replyUrl = `https://api.pgs.ctrlengine.com/api/v1/admin/post/reply?id=${route.params.id}&content=${encodeURIComponent(replyContent.value)}`
    const fetchOptions = { method: 'POST', headers: { Authorization: `Bearer ${token.value}` } }
    const response = await $fetch(replyUrl, fetchOptions)
    if (!response.status || !response.data) {
      throw new Error("Erreur lors de l'envoi de la réponse")
    }
    postData.value.responses.push(response.data)
    replyContent.value = ''
    currentPage.value = 1
  } catch (err) {
    error.value = err.message || "Erreur lors de l'envoi de la réponse"
    console.error("[REPLY ERROR]", err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadToken()
  fetchPost()
})
</script>

<style scoped>
.badge-success {
  @apply px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm;
}

.file-link {
  @apply flex items-center px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors text-sm;
}
</style>
