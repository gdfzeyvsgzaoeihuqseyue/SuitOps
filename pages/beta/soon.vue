<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 font-body">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 shadow-sm">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <!-- Logos -->
        <div class="flex items-center space-x-4">
          <img src="/img/logoDeskCol.png" alt="SuitOps" class="h-10 w-auto hidden sm:block" />
          <img src="/img/logoMobCol.png" alt="SuitOps" class="h-10 w-auto sm:hidden" />
        </div>

        <!-- Navigation -->
        <nav>
          <ul class="flex items-center space-x-6 text-sm font-medium text-gray-600">
            <li>
              <NuxtLink href="#features" class="hover:text-blue-600 transition-colors smooth-scroll">Fonctionnalités
              </NuxtLink>
            </li>
            <li>
              <NuxtLink href="/beta/soon/#register" class="hover:text-blue-600 transition-colors smooth-scroll">
                S'inscrire</NuxtLink>
            </li>
            <li>
              <NuxtLink href="#about" class="hover:text-blue-600 transition-colors smooth-scroll">À propos</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Hero -->
    <section class="hero-section text-center py-20 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-white to-blue-800 opacity-90 z-0"></div>

      <div class="container mx-auto px-4 relative z-10">
        <h1 class="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
          <span class="text-blue-800">SuitOps</span> arrive bientôt
        </h1>
        <p class="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Une nouvelle ère pour la gestion des PME africaines. <br class="hidden sm:block" />
          Productivité, collaboration, et automatisation réunies.
        </p>

        <!-- Compteur -->
        <div class="mb-10">
          <h3 class="text-base text-gray-500 mb-2">Inscrivez-vous avant le 15 septembre 2025</h3>
          <div class="flex justify-center gap-4 font-mono">
            <div v-for="(unit, index) in countdown" :key="index"
              class="bg-white border border-gray-200 rounded-lg p-4 w-24 text-center shadow-sm">
              <div class="text-2xl font-bold text-blue-800">{{ unit.value }}</div>
              <div class="text-xs text-gray-500">{{ unit.label }}</div>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div>
          <NuxtLink href="#beta"
            class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-800 text-white font-semibold rounded-full shadow-md transition-all duration-300 smooth-scroll">
            Rejoindre la bêta
            <IconArrowRight class="h-5 w-5 ml-2" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="container mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold text-center mb-12">Découvrez nos fonctionnalités innovantes</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(feature, index) in features" :key="index"
          class="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center h-full transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div class="text-blue-600 mb-4">
            <component :is="feature.icon" class="w-12 h-12" />
          </div>
          <h3 class="text-xl font-bold mb-2">{{ feature.title }}</h3>
          <p class="text-gray-700 text-center mb-4">{{ feature.description }}</p>
          <ul class="text-gray-700 space-y-2 text-left w-full">
            <li v-for="(point, i) in feature.points" :key="i" class="flex items-start">
              <IconCheck class="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>{{ point }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Inscription -->
    <section id="register" class="container mx-auto px-4 py-16">
      <div class="bg-white border border-gray-200 rounded-xl p-8 max-w-2xl mx-auto shadow-lg">
        <h2 class="text-3xl font-bold mb-6 text-center">Rejoignez notre bêta privée</h2>
        <p class="text-gray-700 mb-8 text-center">
          Soyez parmi les premiers à tester SuitOps et bénéficiez d'avantages exclusifs
        </p>

        <!-- Notification -->
        <div v-if="notification.show" :class="`p-4 mb-6 rounded-lg flex items-center ${notification.type === 'success'
          ? 'bg-green-500/20 text-green-700' : 'bg-red-500/20 text-red-700'
          }`">
          <component :is="notification.type === 'success' ? IconCheck : IconAlertCircle" class="h-5 w-5 mr-2" />
          <span>{{ notification.message }}</span>
          <button @click="notification.show = false" class="ml-auto">
            <IconX class="h-4 w-4" />
          </button>
        </div>

        <!-- Formulaire -->
        <div v-if="!formSubmitted">
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="firstName" class="block text-sm font-medium mb-1">
                  Prénoms <span class="text-red-600">*</span>
                </label>
                <input type="text" id="firstName" v-model="form.firstName"
                  class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  required />
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium mb-1">
                  Nom <span class="text-red-600">*</span>
                </label>
                <input type="text" id="lastName" v-model="form.lastName"
                  class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  required />
              </div>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium mb-1">
                Email <span class="text-red-600">*</span>
              </label>
              <input type="email" id="email" v-model="form.email"
                class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                required />
              <p v-if="emailError" class="text-red-600 text-sm mt-1">{{ emailError }}</p>
            </div>

            <div>
              <label for="company" class="block text-sm font-medium mb-1">Entreprise (optionnel)</label>
              <input type="text" id="company" v-model="form.company"
                class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">
                Comment avez-vous entendu parler de nous ? <span class="text-red-600">*</span>
              </label>
              <select v-model="form.source"
                class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                required>
                <option value="social">Réseaux sociaux</option>
                <option value="search">Moteur de recherche</option>
                <option value="friend">Recommandation</option>
                <option value="other">Autre</option>
              </select>
            </div>

            <div class="flex items-start">
              <input type="checkbox" id="newsletter" v-model="form.newsletter"
                class="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 rounded-full" />
              <label for="newsletter" class="ml-2 block text-sm text-gray-700">
                Je souhaite recevoir des mises à jour sur SuitOps et les offres spéciales
              </label>
            </div>

            <div>
              <button type="submit"
                class="w-full font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center transform hover:translate-y-[-2px]"
                :disabled="isSubmitting || !isFormValid" :class="(isSubmitting || !isFormValid)
                  ? 'bg-gray-300 cursor-not-allowed text-white'
                  : 'bg-blue-600 hover:bg-blue-800 text-white'">
                <span v-if="isSubmitting" class="flex items-center">
                  <IconLoader class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Traitement en cours...
                </span>
                <span v-else>S'inscrire à la bêta</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Message de confirmation -->
        <div v-else class="text-center py-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-6">
            <IconCheck class="h-8 w-8 text-white" />
          </div>
          <h3 class="text-2xl font-bold mb-2">Merci {{ form.firstName }} de vous être inscrit(e) !</h3>
          <p class="text-gray-700 mb-6">
            Votre inscription à la bêta a été enregistrée. Vous recevrez les instructions nécessaires par e-mail à <span
              class="font-bold">{{ form.email }}</span>. <br>
            Consultez <NuxtLink to="/beta/learn" class="text-blue-600 hover:underline">plus de détails ici</NuxtLink>.
          </p>
          <button @click="resetForm" class="text-blue-600 hover:text-blue-700 flex items-center mx-auto">
            <IconRefresh class="h-4 w-4 mr-1" />
            <span>Inscrire une autre personne</span>
          </button>
        </div>
      </div>
    </section>

    <!-- A propos -->
    <section id="about" class="container mx-auto px-4 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold mb-6">À propos de SuitOps</h2>
          <p class="text-gray-700 mb-4">
            SuitOps est né d'une vision simple : créer un outil de productivité qui s'adapte à votre façon de
            travailler, et
            non l'inverse. Notre équipe d'experts en technologie et en design d'expérience utilisateur a travaillé sans
            relâche pour développer une solution qui redéfinit les standards de la gestion de productivité.
          </p>
          <p class="text-gray-700 mb-4">
            Avec SuitOps, nous voulons vous aider à :
          </p>
          <ul class="text-gray-700 space-y-2 mb-6">
            <li class="flex items-start">
              <IconCheck class="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>Optimiser votre temps et vos ressources</span>
            </li>
            <li class="flex items-start">
              <IconCheck class="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>Simplifier la collaboration entre équipes</span>
            </li>
            <li class="flex items-start">
              <IconCheck class="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>Prendre des décisions basées sur des données concrètes</span>
            </li>
          </ul>
          <div class="flex space-x-4">
            <a href="https://twitter.com/ProGestionSoft" target="_blank"
              class="group bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-3 transition-colors">
              <IconBrandTwitter class="h-5 w-5 group-hover:text-blue-600" />
            </a>
            <a href="https://facebook.com/ProGestionSoft" target="_blank"
              class="group bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-3 transition-colors">
              <IconBrandFacebook class="h-5 w-5 group-hover:text-blue-600" />
            </a>
            <a href="https://linkedIn.com/company/ProGestionSoft" target="_blank"
              class="group bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-3 transition-colors">
              <IconBrandLinkedin class="h-5 w-5 group-hover:text-blue-600" />
            </a>
          </div>
        </div>
        <div class="relative">
          <div class="aspect-video bg-gray-200 rounded-xl shadow-2xl overflow-hidden">
            <iframe class="w-full h-full"
              src="https://www.youtube.com/embed/KAKnJ42iaKg?autoplay=0&mute=0&controls=1&rel=0" title="SuitOps Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
          </div>
          <div
            class="absolute -bottom-4 -right-4 bg-white border border-gray-200 rounded-lg p-4 shadow-xl text-gray-800">
            <p class="text-sm font-medium">Fin des inscriptions</p>
            <p class="text-xl font-bold">15 septembre 2025</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
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
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue';
import { PGSServices } from '~/services/PGSServices'
import { IconCheck, IconArrowRight, IconLoader, IconRefresh, IconBrandTwitter, IconBrandFacebook, IconBrandLinkedin, IconAlertCircle, IconChartPie, IconUsers, IconCalendar, IconClockBolt, IconFiles, IconBriefcase, IconX } from '@tabler/icons-vue';


// Notification
const notification = reactive({
  show: false,
  type: 'success',
  message: ''
});

const showNotification = (type, message) => {
  notification.type = type;
  notification.message = message;
  notification.show = true;

  setTimeout(() => {
    notification.show = false;
  }, 5000);
};

// Fonctionnalités
const features = [
  {
    title: 'Rapports d’affaires',
    icon: IconChartPie,
    description: 'Grâce à des outils d’analyses détaillés et un tableau de bord réactif, suivez vos progressions en temps réel',
    points: [
      'Suivi des progressions en temps réel',
      'Analyses détaillées et tableau de bord réactif',
      'Identification des points forts et des points à améliorer',
      'Réajustement stratégique facile'
    ]
  },
  {
    title: 'Gestion des relations client',
    icon: IconUsers,
    description:
      'Rassemblez tous vos contacts, courriels et échanges avec vos clients dans un espace unifié.',
    points: [
      'Historique complet des échanges',
      'Messagerie interne centralisée',
      'Suivi des opportunités commerciales',
      'Meilleure fidélisation client'
    ]
  },
  {
    title: 'Collaboration en temps réel',
    icon: IconClockBolt,
    description:
      'Travaillez efficacement avec votre équipe à distance ou au bureau grâce à des outils fluides et synchronisés.',
    points: [
      'Édition de documents partagés',
      'Attribution de tâches et suivi d’avancement',
      'Partage sécurisé et permissions avancées',
      'Réunions et agendas partagés'
    ]
  },
  {
    title: 'Gestion des documents',
    icon: IconFiles,
    description:
      'Importez, organisez et accédez à vos fichiers n’importe où grâce à notre bibliothèque de documents en ligne.',
    points: [
      'Stockage cloud sécurisé',
      'Compatibilité avec images, PDF et autres formats',
      'Recherche rapide par mots-clés ou tags',
      'Zéro perte de documents'
    ]
  },
  {
    title: 'Super agenda',
    icon: IconCalendar,
    description: 'Planifiez vos réunions et autres événements importants pour le fonctionnement de votre structure.',
    points: [
      'Accès centralisé à toutes les tâches',
      'Planification des réunions et événements',
      'Historique des tâches passées',
      'Optimisation de l’organisation structurelle'
    ]
  },
  {
    title: 'Recrutement',
    icon: IconBriefcase,
    description: 'Emettez des offres et obtenez plus facilement des candidatures. Choisissez le profil qui correspond le mieux à votre offre.',
    points: [
      'Publication simplifiée des offres d’emploi',
      'Réception et gestion facile des candidatures',
      'Aide au choix du profil idéal',
      'Processus de recrutement accéléré'
    ]
  }
];


// Etats du formulaire
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  source: 'social',
  newsletter: true
});

const isSubmitting = ref(false);
const formSubmitted = ref(false);
const emailError = ref('');

// Validité du formulaire
const isFormValid = computed(() => {
  return form.firstName.trim() !== '' &&
    form.lastName.trim() !== '' &&
    form.email.trim() !== '' &&
    form.source.trim() !== '' &&
    validateEmail(form.email);
});

// Compteur à rebours
const countdown = reactive([
  { label: 'Jours', value: 0 },
  { label: 'Heures', value: 0 },
  { label: 'Minutes', value: 0 },
  { label: 'Secondes', value: 0 }
]);

let countdownInterval = null;

const updateCountdown = () => {
  const launchDate = new Date('September 15, 2025 00:00:00').getTime();
  const now = new Date().getTime();
  const distance = launchDate - now;

  // Jours, heures, minutes et secondes
  countdown[0].value = Math.floor(distance / (1000 * 60 * 60 * 24));
  countdown[1].value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  countdown[2].value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  countdown[3].value = Math.floor((distance % (1000 * 60)) / 1000);

  // Si le delai passe
  if (distance < 0) {
    clearInterval(countdownInterval);
    countdown.forEach(unit => unit.value = 0);
  }
};

// Validateur de mail
const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// Envoie du formulaire
const submitForm = async () => {
  emailError.value = '';

  if (!isFormValid.value) {
    if (!validateEmail(form.email)) {
      emailError.value = 'Veuillez entrer une adresse email valide';
      showNotification('error', 'Veuillez corriger les erreurs dans le formulaire');
    } else {
      showNotification('error', 'Veuillez remplir tous les champs obligatoires');
    }
    return;
  }

  isSubmitting.value = true;

  try {
    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      company: form.company,
      source: form.source,
      newsletter: form.newsletter
    };

    await PGSServices.betaRegistration(payload);

    formSubmitted.value = true;
    showNotification('success', 'Inscription réussie !');
  } catch (error) {
    console.error('Erreur lors de l’inscription :', error);
    showNotification('error', 'Une erreur est survenue. Veuillez réessayer plus tard.');
  } finally {
    isSubmitting.value = false;
  }
};


// Restaurer le formulaire après soummission
const resetForm = () => {
  formSubmitted.value = false;
  form.firstName = '';
  form.lastName = '';
  form.email = '';
  form.company = '';
  form.source = 'social';
  emailError.value = '';
};

// Scrolle sur les liens encrés
const setupSmoothScroll = () => {
  document.querySelectorAll('.smooth-scroll').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
};

// Initialiser le compte à rebours au montage
onMounted(() => {
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
  setupSmoothScroll();
});

// Nétoyyer le compte à rebours après le montage
onBeforeUnmount(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});

definePageMeta({
  layout: false
});

useHead({
  title: 'Inscription Bêta',
})
</script>

<style scoped>
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradientAnimation 6s ease infinite;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}
</style>
