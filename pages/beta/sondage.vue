<template>
  <header class="bg-white border-b border-gray-200 shadow-sm">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <!-- Logos -->
      <div class="flex items-center space-x-4">
        <img :src="sharedFiles.paths.logo.dc" alt="SuitOps" class="h-10 w-auto hidden sm:block" />
        <img :src="sharedFiles.paths.logo.mc" alt="SuitOps" class="h-10 w-auto sm:hidden" />
      </div>

      <!-- Navigation -->
      <nav>
        <ul class="flex items-center space-x-6 text-sm font-medium text-gray-600">
          <li>
            <NuxtLink href="/beta/soon/#features" class="hover:text-blue-600 transition-colors smooth-scroll">
              Fonctionnalités
            </NuxtLink>
          </li>
          <li>
            <NuxtLink href="/beta/soon/#register" class="hover:text-blue-600 transition-colors smooth-scroll">S'inscrire
            </NuxtLink>
          </li>
          <li>
            <NuxtLink href="/beta/soon/#about" class="hover:text-blue-600 transition-colors smooth-scroll">À propos
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
      <h1 class="text-3xl sm:text-4xl font-bold text-center mb-6 text-primary">
        Sondage de Feedback Bêta
      </h1>

      <div v-if="!userId"
        class="text-center p-6 bg-gray-50 border border-red-200 text-gray-700 rounded-lg shadow-md">
        <p class="text-lg font-semibold mb-2">Impossible de charger le sondage.</p>
        <p class="text-base">
          Nous n'avons pas pu récupérer vos informations pour afficher le sondage.
          Cela peut arriver si vous avez rechargé la page ou si le lien utilisé n'est pas correct.
        </p>
        <p class="text-sm mt-4">
          Veuillez retourner au mail et cliquer à nouveau sur le lien.
        </p>
      </div>

      <form v-else @submit.prevent="handleSubmit" class="space-y-6">
        <p class="text-center text-gray-600 mb-8">
          Votre avis est précieux pour améliorer SuitOps. <br>
          Merci de prendre 30 secondes pour répondre à ce sondage.
        </p>

        <!-- Champ Email (readonly) -->
        <div class="relative">
          <label for="user-email" class="block text-sm font-medium text-gray-700 mb-1">
            Votre adresse e-mail
          </label>
          <input type="email" id="user-email" v-model="userEmail" readonly
            class="input-floating w-full bg-gray-100 cursor-not-allowed" />
        </div>

        <!-- Section: Raisons de non-utilisation -->
        <section class="bg-gray-50 p-4 rounded-lg">
          <h2 class="text-xl font-semibold mb-4 border-b pb-2">
            Quelles sont les principales raisons pour lesquelles vous n'avez pas utilisé SuitOps plus fréquemment ? *
          </h2>
          <div class="space-y-2">
            <div v-for="option in reasonNotUsedOptions" :key="option.value" class="flex items-center">
              <input type="checkbox" :id="`reason-${option.value}`" :value="option.value"
                v-model="formData.reasonNotUsed"
                class="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary" />
              <label :for="`reason-${option.value}`" class="ml-2 text-sm text-gray-700">
                {{ getReasonNotUsedLabel(option.value) }}
              </label>
            </div>
            <div v-if="formData.reasonNotUsed.includes('other')" class="mt-2">
              <label for="reason-other-text" class="sr-only">Veuillez préciser la raison</label>
              <input type="text" id="reason-other-text" v-model="formData.reasonNotUsedOther"
                placeholder="Veuillez préciser la raison" class="input-floating w-full" />
            </div>
          </div>
        </section>

        <!-- Section: Fonctionnalités manquantes -->
        <section class="bg-gray-50 p-4 rounded-lg">
          <h2 class="text-xl font-semibold mb-4 border-b pb-2">
            Quelles fonctionnalités manquantes vous empêchent d'utiliser SuitOps pleinement ?
          </h2>
          <textarea id="missing-features" v-model="formData.missingFeatures"
            placeholder="Décrivez les fonctionnalités que vous aimeriez voir ajoutées..." rows="4"
            class="input-floating w-full"></textarea>
        </section>

        <!-- Section: Incitation à l'utilisation -->
        <section class="bg-gray-50 p-4 rounded-lg">
          <h2 class="text-xl font-semibold mb-4 border-b pb-2">
            Qu'est-ce qui vous inciterait à utiliser SuitOps plus fréquemment à l'avenir ? *
          </h2>
          <div class="space-y-2">
            <div v-for="option in incentiveToUseOptions" :key="option.value" class="flex items-center">
              <input type="checkbox" :id="`incentive-${option.value}`" :value="option.value"
                v-model="formData.incentiveToUse"
                class="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary" />
              <label :for="`incentive-${option.value}`" class="ml-2 text-sm text-gray-700">
                {{ getIncentiveToUseLabel(option.value) }}
              </label>
            </div>
            <div v-if="formData.incentiveToUse.includes('other')" class="mt-2">
              <label for="incentive-other-text" class="sr-only">Veuillez préciser l'incitation</label>
              <input type="text" id="incentive-other-text" v-model="formData.incentiveToUseOther"
                placeholder="Veuillez préciser l'incitation" class="input-floating w-full" />
            </div>
          </div>
        </section>

        <!-- Section: Challenges -->
        <section class="bg-gray-50 p-4 rounded-lg">
          <h2 class="text-xl font-semibold mb-4 border-b pb-2">
            Quels ont été vos principaux challenges ou frustrations lors de l'utilisation de SuitOps ?
          </h2>
          <textarea id="challenges" v-model="formData.challenges" placeholder="Décrivez les difficultés rencontrées..."
            rows="4" class="input-floating w-full"></textarea>
        </section>

        <!-- Section: Rejoindre le groupe bêta -->
        <section class="bg-gray-50 p-4 rounded-lg">
          <h2 class="text-xl font-semibold mb-4 border-b pb-2">
            Souhaitez-vous rejoindre un groupe de discussion bêta pour partager vos retours plus en détail ?
          </h2>
          <div class="flex items-center">
            <input type="checkbox" id="join-beta-group" v-model="formData.joinBetaGroup"
              class="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary" />
            <label for="join-beta-group" class="ml-2 text-sm text-gray-700">
              Oui, j'accepte de rejoindre un groupe de discussion bêta (WhatsApp, Telegram)
            </label>
          </div>
        </section>

        <!-- Section: Suggestions -->
        <section class="bg-gray-50 p-4 rounded-lg">
          <h2 class="text-xl font-semibold mb-4 border-b pb-2">
            Avez-vous d'autres commentaires ou suggestions pour l'équipe SuitOps ?
          </h2>
          <textarea id="suggestions" v-model="formData.suggestions" placeholder="Vos suggestions libres..." rows="4"
            class="input-floating w-full"></textarea>
        </section>

        <!-- Submit Button -->
        <div class="mt-8">
          <button type="submit" :disabled="betaFeedbackStore.loading || !isFormValid"
            class="w-full py-3 px-6 rounded-lg text-white transition-colors" :class="[
              betaFeedbackStore.loading || !isFormValid
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary hover:bg-secondary'
            ]">
            <span v-if="betaFeedbackStore.loading" class="flex items-center justify-center">
              <IconLoader class="w-5 h-5 mr-2 animate-spin" />
              Envoi en cours...
            </span>
            <span v-else>
              Envoyer mon feedback
            </span>
          </button>
        </div>
      </form>

      <!-- Messages -->
      <div v-if="betaFeedbackStore.error" class="mt-4 p-3 text-sm bg-red-100 text-red-700 rounded-lg">
        {{ betaFeedbackStore.error }}
      </div>
      <div v-if="betaFeedbackStore.successMessage" class="mt-4 p-3 text-sm bg-green-100 text-green-700 rounded-lg">
        {{ betaFeedbackStore.successMessage }}
      </div>
    </div>
  </main>

  <footer class="bg-gray-800 py-8 mt-12 text-white">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <span class="ml-2 text-lg font-bold">SuitOps</span>
        <NuxtLink to="/beta/learn" class="text-sm hover:text-gray-300 hover:underline">
          Instructions
        </NuxtLink>
        <p class="text-sm text-gray-400 mt-2">
          {{ new Date().getFullYear() }} SuitOps. Tous droits réservés.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useBetaFeedbackStore } from '~/stores/BetaFeedback';
import { IconLoader } from '@tabler/icons-vue';
import { useSharedFiles } from '~/stores/sharedFiles';

const route = useRoute();
const betaFeedbackStore = useBetaFeedbackStore();
const sharedFiles = useSharedFiles();

definePageMeta({
  layout: false
});

// State
const userId = ref<string | null>(null);
const userEmail = ref<string>('');
const userDataLoaded = ref<boolean>(false);

const formData = reactive({
  userId: '',
  reasonNotUsed: [] as string[],
  reasonNotUsedOther: '',
  missingFeatures: '',
  incentiveToUse: [] as string[],
  incentiveToUseOther: '',
  challenges: '',
  joinBetaGroup: true,
  suggestions: '',
});

// Checkbox options
const reasonNotUsedOptions = [
  { value: 'complexity', label: 'Complexité de l\'interface / Difficile à prendre en main' },
  { value: 'lackOfTime', label: 'Manque de temps / Pas une priorité actuelle' },
  { value: 'missingFeatures', label: 'Fonctionnalités clés manquantes' },
  { value: 'bugs', label: 'Bugs ou problèmes techniques' },
  { value: 'notRelevant', label: 'Non pertinent pour mes besoins actuels' },
  { value: 'other', label: 'Autre (veuillez préciser)' },
];

const incentiveToUseOptions = [
  { value: 'newFeatures', label: 'Ajout de nouvelles fonctionnalités' },
  { value: 'betterPerformance', label: 'Amélioration des performances / rapidité' },
  { value: 'simplerUI', label: 'Interface utilisateur plus simple / intuitive' },
  { value: 'moreIntegrations', label: 'Plus d\'intégrations avec d\'autres outils' },
  { value: 'training', label: 'Plus de formations / tutoriels' },
  { value: 'community', label: 'Une communauté d\'utilisateurs plus active' },
  { value: 'other', label: 'Autre (veuillez préciser)' },
];

// Helper fonctions pour labels
const getReasonNotUsedLabel = (value: string) => {
  return reasonNotUsedOptions.find(opt => opt.value === value)?.label || value;
};

const getIncentiveToUseLabel = (value: string) => {
  return incentiveToUseOptions.find(opt => opt.value === value)?.label || value;
};

// Validation
const isFormValid = computed(() => {
  const reasonsSelected = formData.reasonNotUsed.length > 0;
  const incentivesSelected = formData.incentiveToUse.length > 0;

  const reasonOtherTextValid = !formData.reasonNotUsed.includes('other') || formData.reasonNotUsedOther.trim() !== '';
  const incentiveOtherTextValid = !formData.incentiveToUse.includes('other') || formData.incentiveToUseOther.trim() !== '';

  return reasonsSelected && incentivesSelected && reasonOtherTextValid && incentiveOtherTextValid;
});

// Summission
const handleSubmit = async () => {
  if (!isFormValid.value) {
    betaFeedbackStore.error = "Veuillez remplir tous les champs obligatoires et corriger les erreurs.";
    return;
  }

  formData.userId = userId.value as string;

  // Convertir les valeurs en labels avant l'envoi
  const reasonNotUsedLabels = formData.reasonNotUsed.map(value => getReasonNotUsedLabel(value));
  const incentiveToUseLabels = formData.incentiveToUse.map(value => getIncentiveToUseLabel(value));

  const payload = {
    userId: formData.userId,
    // Envoyer les labels au lieu des valeurs brutes
    reasonNotUsed: reasonNotUsedLabels,
    reasonNotUsedOther: formData.reasonNotUsed.includes('other') ? formData.reasonNotUsedOther : null,
    missingFeatures: formData.missingFeatures || null,
    incentiveToUse: incentiveToUseLabels,
    incentiveToUseOther: formData.incentiveToUse.includes('other') ? formData.incentiveToUseOther : null,
    challenges: formData.challenges || null,
    joinBetaGroup: formData.joinBetaGroup,
    suggestions: formData.suggestions || null,
  };

  const result = await betaFeedbackStore.submitFeedback(payload);
  if (result) {
    Object.assign(formData, {
      userId: userId.value,
      reasonNotUsed: [],
      reasonNotUsedOther: '',
      missingFeatures: '',
      incentiveToUse: [],
      incentiveToUseOther: '',
      challenges: '',
      joinBetaGroup: false,
      suggestions: '',
    });
  }
};

// Lifecycle hook
onMounted(async () => {
  userId.value = route.query.userId as string;
  betaFeedbackStore.resetMessages();

  if (userId.value) {
    const userData = await betaFeedbackStore.fetchUserDetails(userId.value);
    if (userData && userData.email) {
      userEmail.value = userData.email;
      userDataLoaded.value = true;
    } else {
      userDataLoaded.value = false;
    }
  } else {
    userDataLoaded.value = false;
  }
});

// SEO
useHead({
  title: 'Sondage de Feedback Bêta',
});
</script>

<style scoped>
.input-floating {
  @apply block px-4 py-3 w-full text-sm bg-gray-100 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary;
}
</style>
