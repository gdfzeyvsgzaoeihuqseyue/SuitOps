<template>
  <div class="p-6 space-y-6 mt-16">
    <!-- Title -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-800">
        Liste des Inscriptions ({{ totalCount }})
      </h1>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
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
          <tr
            v-for="registration in paginatedData"
            :key="registration._id"
            class="border-t hover:bg-gray-50 transition"
          >
            <td class="px-6 py-4 font-medium">
              {{ registration.firstName }} {{ registration.lastName }}
            </td>
            <td class="px-6 py-4">{{ registration.email }}</td>
            <td class="px-6 py-4">{{ registration.company || '-' }}</td>
            <td class="px-6 py-4 capitalize">{{ registration.source }}</td>
            <td class="px-6 py-4">
              <span
                :class="[
                  registration.newsletter
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700',
                  'px-2 py-1 rounded-full text-xs font-medium',
                ]"
              >
                {{ registration.newsletter ? 'Oui' : 'Non' }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <NuxtLink
                :to="`/beta/r/${registration._id}`"
                class="text-blue-600 hover:underline font-medium"
              >
                Voir
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div
        class="flex items-center justify-between px-6 py-4 bg-gray-50 border-t"
      >
        <button
          class="px-4 py-2 rounded-lg text-sm font-medium border bg-white hover:bg-gray-100 disabled:opacity-50"
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          Précédent
        </button>

        <div class="text-sm text-gray-600">
          Page {{ currentPage }} sur {{ totalPages }}
        </div>

        <button
          class="px-4 py-2 rounded-lg text-sm font-medium border bg-white hover:bg-gray-100 disabled:opacity-50"
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          Suivant
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PGSServices } from '~/stores/PGSServices.js'
import { ref, computed, onMounted } from 'vue'

const registrations = ref([])
const totalCount = ref(0)
const itemsPerPage = 5
const currentPage = ref(1)

const fetchRegistrations = async () => {
  try {
    const res = await PGSServices.getAllBetaRegistrations?.()
    if (!res) throw new Error('Aucune donnée reçue.')
    registrations.value = res.data
    totalCount.value = res.count
  } catch (err) {
    console.error('Erreur:', err)
  }
}

onMounted(() => fetchRegistrations())

const totalPages = computed(() =>
  Math.ceil(registrations.value.length / itemsPerPage)
)

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return registrations.value.slice(start, start + itemsPerPage)
})

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>
