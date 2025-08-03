<template>
  <div class="p-6 mt-16">
    <div class="max-w-2xl mx-auto bg-white shadow rounded-2xl border p-6 space-y-4">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-bold text-gray-800">
          Détails de l'inscription
        </h1>
        <NuxtLink
          to="/beta/r"
          class="text-blue-600 text-sm hover:underline"
        >
          ← Retour
        </NuxtLink>
      </div>

      <!-- User Info -->
      <div class="divide-y divide-gray-100">
        <div class="py-3">
          <span class="font-medium text-gray-700">Nom complet:</span>
          <p class="text-gray-600">
            {{ registration.firstName }} {{ registration.lastName }}
          </p>
        </div>
        <div class="py-3">
          <span class="font-medium text-gray-700">Email:</span>
          <p class="text-gray-600">{{ registration.email }}</p>
        </div>
        <div class="py-3">
          <span class="font-medium text-gray-700">Entreprise:</span>
          <p class="text-gray-600">
            {{ registration.company || 'Non spécifié' }}
          </p>
        </div>
        <div class="py-3">
          <span class="font-medium text-gray-700">Source:</span>
          <p class="text-gray-600 capitalize">{{ registration.source }}</p>
        </div>
        <div class="py-3">
          <span class="font-medium text-gray-700">Newsletter:</span>
          <p>
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
          </p>
        </div>
        <div class="py-3">
          <span class="font-medium text-gray-700">Inscrit le:</span>
          <p class="text-gray-600">
            {{ new Date(registration.createdAt).toLocaleString() }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PGSServices } from '~/stores/PGSServices.js'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const registration = ref({})

const fetchRegistration = async () => {
  try {
    const res = await PGSServices.getBetaRegistrationById?.(route.params.id)
    registration.value = res.data
  } catch (err) {
    console.error('Erreur:', err)
  }
}

onMounted(() => fetchRegistration())
</script>
