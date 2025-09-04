<template>
  <div class="p-6 space-y-6 mt-16 max-w-6xl mx-auto">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-800">
        Liste des Inscriptions ({{ filteredRegistrations.length }})
      </h1>
    </div>

    <!-- Recherche & Filtres -->
    <div class="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-3 md:space-y-0 mb-4">
      <input v-model="searchQuery" type="search" placeholder="Recherche par nom ou email..."
        class="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />

      <!-- Filtres avec responsive : 2 colonnes sur mobile, 5 sur desktop -->
      <div class="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
        <!-- Filtre entreprise vide/non vide -->
        <select v-model="filters.company" class="border border-gray-300 rounded-lg px-3 py-2 w-full">
          <option value="">Toutes les entreprises</option>
          <option value="non-vide">Avec entreprise</option>
          <option value="vide">Sans entreprise</option>
        </select>

        <select v-model="filters.source" class="border border-gray-300 rounded-lg px-3 py-2 w-full">
          <option value="">Toutes les sources</option>
          <option v-for="s in uniqueSources" :key="s" :value="s">{{ s }}</option>
        </select>

        <select v-model="filters.newsletter" class="border border-gray-300 rounded-lg px-3 py-2 w-full">
          <option value="">Newsletter (tous)</option>
          <option :value="true">Oui</option>
          <option :value="false">Non</option>
        </select>

        <select v-model="sortKey" class="border border-gray-300 rounded-lg px-3 py-2 w-full">
          <option value="">Tri (aucun)</option>
          <option value="firstName">Nom (A-Z)</option>
          <option value="-firstName">Nom (Z-A)</option>
          <option value="email">Email (A-Z)</option>
          <option value="-email">Email (Z-A)</option>
          <option value="company">Entreprise (A-Z)</option>
          <option value="-company">Entreprise (Z-A)</option>
        </select>
      </div>

    </div>

    <div v-if="isLoading" class="text-center p-8">
      <p class="text-gray-500">Chargement des inscriptions...</p>
    </div>

    <div v-else-if="error" class="text-center p-8">
      <p class="text-red-500 font-medium">
        Erreur : {{ error }}
      </p>
      <button @click="fetchRegistrations(currentPage)"
        class="mt-4 px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700">
        Réessayer
      </button>
    </div>

    <div v-else-if="filteredRegistrations.length === 0" class="text-center p-8">
      <p class="text-gray-500">
        Aucune inscription trouvée avec les critères sélectionnés.
      </p>
    </div>

    <div v-else class="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
      <div class="overflow-x-auto">
        <table class="w-full table-auto text-sm text-left text-gray-600">
          <thead class="bg-gray-50 text-gray-700 uppercase text-xs">
            <tr>
              <th class="px-6 py-4">Nom</th>
              <th class="px-6 py-4">Email</th>
              <th class="px-6 py-4">Entreprise</th>
              <th class="px-6 py-4">Source</th>
              <th class="px-6 py-4">Newsletter</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="registration in paginatedRegistrations" :key="registration.id"
              class="border-t hover:bg-gray-50 transition">
              <td class="px-6 py-4 font-medium">
                {{ registration.firstName }} {{ registration.lastName }}
              </td>
              <td class="px-6 py-4">{{ registration.email }}</td>
              <td class="px-6 py-4">{{ registration.company || '-' }}</td>
              <td class="px-6 py-4 capitalize">{{ registration.source }}</td>
              <td class="px-6 py-4">
                <span :class="[
                  registration.newsletter
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700',
                  'px-2 py-1 rounded-full text-xs font-medium',
                ]">
                  {{ registration.newsletter ? 'Oui' : 'Non' }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <NuxtLink :to="`/beta/r/${registration.id}`" class="text-blue-600 hover:underline font-medium">
                  Voir
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="totalPages > 1" class="flex items-center justify-between px-6 py-4 bg-gray-50 border-t">
        <button class="px-4 py-2 rounded-lg text-sm font-medium border bg-white hover:bg-gray-100 disabled:opacity-50"
          :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
          Précédent
        </button>

        <div class="text-sm text-gray-600">
          Page {{ currentPage }} sur {{ totalPages }}
        </div>

        <button class="px-4 py-2 rounded-lg text-sm font-medium border bg-white hover:bg-gray-100 disabled:opacity-50"
          :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">
          Suivant
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PGSServices } from '~/stores/PGSServices'
import { ref, computed, onMounted, watch } from 'vue'

const registrations = ref([])
const totalCount = ref(0)
const itemsPerPage = ref(10)
const currentPage = ref(1)
const totalPages = ref(1)
const isLoading = ref(true)
const error = ref(null)

const searchQuery = ref('')
const filters = ref({
  company: '', // now '' | 'vide' | 'non-vide'
  source: '',
  newsletter: '',
})

const sortKey = ref('') // ex: "firstName", "-firstName"

const fetchRegistrations = async (page) => {
  isLoading.value = true
  error.value = null
  try {
    const res = await PGSServices.getAllBetaRegistrations(page, itemsPerPage.value)

    if (!res || !res.success) {
      throw new Error('La réponse du serveur est vide ou mal formatée.')
    }

    registrations.value = res.data
    totalCount.value = res.nb
    currentPage.value = res.currentPage
    totalPages.value = res.totalPages
  } catch (err) {
    console.error('Erreur lors de la récupération des inscriptions:', err)
    error.value = err.message || 'Une erreur inconnue est survenue.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  setTimeout(() => {
    fetchRegistrations(currentPage.value)
  }, 0)
})

// Pagination + filtres + recherche + tri côté client
const filteredRegistrations = computed(() => {
  let filtered = registrations.value

  // Recherche par nom ou email
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.trim().toLowerCase()
    filtered = filtered.filter((r) =>
      `${r.firstName} ${r.lastName}`.toLowerCase().includes(query) ||
      r.email.toLowerCase().includes(query)
    )
  }

  // Filtre entreprise vide / non vide
  if (filters.value.company === 'vide') {
    filtered = filtered.filter((r) => !r.company || r.company.trim() === '')
  } else if (filters.value.company === 'non-vide') {
    filtered = filtered.filter((r) => r.company && r.company.trim() !== '')
  }

  // Filtre source
  if (filters.value.source) {
    filtered = filtered.filter((r) => r.source === filters.value.source)
  }

  // Filtre newsletter
  if (filters.value.newsletter !== '') {
    const nlBool = filters.value.newsletter === true || filters.value.newsletter === 'true'
    filtered = filtered.filter((r) => r.newsletter === nlBool)
  }

  // Tri simple
  if (sortKey.value) {
    const key = sortKey.value.startsWith('-') ? sortKey.value.slice(1) : sortKey.value
    const ascending = !sortKey.value.startsWith('-')

    filtered = filtered.slice().sort((a, b) => {
      const aVal = (a[key] || '').toString().toLowerCase()
      const bVal = (b[key] || '').toString().toLowerCase()
      if (aVal < bVal) return ascending ? -1 : 1
      if (aVal > bVal) return ascending ? 1 : -1
      return 0
    })
  }

  return filtered
})

// Pagination côté client sur les résultats filtrés
const paginatedRegistrations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredRegistrations.value.slice(start, start + itemsPerPage.value)
})

const uniqueSources = computed(() => {
  const sources = new Set()
  registrations.value.forEach((r) => {
    if (r.source) sources.add(r.source)
  })
  return Array.from(sources).sort()
})

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Reset page quand filtre, recherche ou tri change
watch([searchQuery, filters, sortKey], () => {
  currentPage.value = 1
})
</script>
