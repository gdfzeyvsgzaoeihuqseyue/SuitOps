<template>
  <div v-if="isVisible" class="fixed inset-0 z-50">
    <!-- Overlay avec flou -->
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

    <!-- Contenu du modal -->
    <div class="relative flex items-center justify-center min-h-screen">
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <h2 class="text-xl font-semibold mb-4 text-center">Accès protégé</h2>
        <p class="mb-3 text-gray-600 text-center">Veuillez entrer le mot de passe pour accéder à cette page.</p>
        <input
          v-model="inputPass"
          type="password"
          placeholder="Mot de passe"
          class="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-400"
        />
        <div class="flex justify-center gap-3">
          <button @click="verifyPass" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Valider
          </button>
        </div>
        <p v-if="error" class="text-red-500 text-sm mt-2 text-center">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const inputPass = ref('');
const error = ref('');
const betaAuth = useState('betaAuth', () => ({ required: false }));

const isVisible = computed(() => betaAuth.value.required);

function verifyPass() {
  if (inputPass.value === config.public.betaRegisterPass) {
    localStorage.setItem('beta_pass', inputPass.value);
    localStorage.setItem('beta_pass_expire', (Date.now() + 2 * 60 * 60 * 1000).toString());
    betaAuth.value.required = false;
  } else {
    error.value = 'Mot de passe incorrect.';
  }
}
</script>
