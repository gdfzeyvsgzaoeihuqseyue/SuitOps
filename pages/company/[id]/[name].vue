<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-8">
    <!-- Boutons -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <button @click="router.go(-1)" class="hover:text-BtW flex items-center gap-2 text-sm sm:text-base">
        <IconArrowLeft class="w-4 h-4 sm:w-5 sm:h-5" />
        {{ t('common.backButton') }}
      </button>

      <div class="flex gap-4 sm:gap-4 mx-auto sm:mx-0" v-if="!loading && company">
        <button @click="openContact"
          class="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary text-WtB rounded-3xl hover:bg-secondary flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
          <IconMail class="w-4 h-4 sm:w-5 sm:h-5" />
          {{ t('companyPage.contactCompanyButton') }}
        </button>
        <button @click="showReportModal = true"
          class="px-3 py-1.5 sm:px-4 sm:py-2 bg-danger text-white rounded-3xl hover:bg-dangerAct flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
          <IconAlertTriangle class="w-4 h-4 sm:w-5 sm:h-5" />
          {{ t('companyPage.reportCompanyButton') }}
        </button>
      </div>
    </div>

    <!-- Chargement -->
    <Loader v-if="loading" />

    <!-- Erreur -->
    <div v-else-if="error" class="text-center text-red-600 py-12">
      <p class="mb-4 text-sm sm:text-base">{{ error }}</p>
      <button @click="fetchCompany"
        class="bg-primary text-WtB px-4 py-2 rounded-md hover:bg-secondary transition-colors text-sm sm:text-base">
        {{ t('common.retryButton') }}
      </button>
    </div>

    <!-- Contenu principal -->
    <div v-else-if="company" class="bg-ash rounded-lg shadow-lg p-6 md:p-8">
      <!-- En-tête -->
      <div class="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start mb-6 md:mb-8">
        <img :src="company.logo?.url || `https://api.dicebear.com/7.x/initials/svg?seed=${company.name}`"
          :alt="t('companyPage.logoAlt', { companyName: company.name })"
          class="w-24 h-24 sm:w-32 sm:h-32 object-contain rounded-lg border" loading="lazy" @error="handleImageError" />
        <div class="text-center md:text-left">
          <h1 class="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
            {{ company.name }}
          </h1>
          <p class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm sm:text-base inline-block">
            {{ company.juridicStatus?.description }}
          </p>
        </div>
      </div>

      <!-- Informations principales -->
      <div class="grid md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
        <div>
          <div class="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4 text-primary">
            <IconAddressBook class="w-5 h-5 sm:w-6 sm:h-6" />
            <h2 class="text-lg sm:text-xl font-semibold">{{ t('companyPage.coordinatesTitle') }}</h2>
          </div>
          <dl class="space-y-2 border-l-2 pl-4 text-sm sm:text-base">
            <div class="flex flex-wrap items-center gap-x-2">
              <dt class="font-medium">{{ t('common.emailLabel') }}</dt>
              <dd class="font-bold">{{ company.emailAddress }}</dd>
            </div>
            <div class="flex flex-wrap items-center gap-x-2 relative group">
              <dt class="font-medium">{{ t('common.phoneLabel') }}:</dt>
              <dd class="font-bold blur-sm hover:blur-none transition-all">{{ company.phoneNumber }}</dd>
              <div class="info-tooltip opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {{ t('companyPage.restrictionMessage', {
                  objectType: t('common.phoneLabel'), companyName: company.name
                }) }}
              </div>
            </div>
            <div class="flex flex-wrap items-center gap-x-2" v-if="company.address">
              <dt class="font-medium">{{ t('common.addressLabel') }}</dt>
              <dd class="font-bold">{{ company.address }}</dd>
            </div>
          </dl>
        </div>

        <div>
          <div class="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4 text-primary">
            <IconGavel class="w-5 h-5 sm:w-6 sm:h-6" />
            <h2 class="text-lg sm:text-xl font-semibold">{{ t('companyPage.legalInfoTitle') }}</h2>
          </div>
          <dl class="space-y-2 border-l-2 pl-4 text-sm sm:text-base">
            <div class="flex flex-wrap items-center gap-x-2 relative group">
              <dt class="font-medium">{{ t('companyPage.ifuLabel') }}:</dt>
              <dd class="font-bold blur-sm hover:blur-none transition-all">{{ company.ifu }}</dd>
              <div class="info-tooltip opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {{ t('companyPage.restrictionMessage', {
                  objectType: t('companyPage.ifuLabel'), companyName:
                    company.name
                }) }}
              </div>
            </div>
            <div class="flex flex-wrap items-center gap-x-2 relative group">
              <dt class="font-medium">{{ t('companyPage.rccmLabel') }}:</dt>
              <dd class="font-bold blur-sm hover:blur-none transition-all">{{ company.rccm }}</dd>
              <div class="info-tooltip opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {{ t('companyPage.restrictionMessage', {
                  objectType: t('companyPage.rccmLabel'), companyName:
                    company.name
                }) }}
              </div>
            </div>
            <div class="flex flex-wrap items-center gap-x-2">
              <dt class="font-medium">{{ t('companyPage.juridicStatusLabel') }}</dt>
              <dd class="font-bold">{{ company.juridicStatus?.code }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <!-- Activités et centres d'intérêt -->
      <div class="border-t pt-6 md:pt-8">
        <div class="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4 text-primary">
          <IconBriefcase class="w-5 h-5 sm:w-6 sm:h-6" />
          <h2 class="text-lg sm:text-xl font-semibold">{{ t('companyPage.activitiesTitle') }}</h2>
        </div>
        <div class="grid md:grid-cols-3 gap-4 text-sm sm:text-base">
          <div v-if="company.mainActivity" class="bg-WtB p-4 rounded-lg">
            <h3 class="font-bold mb-1">{{ t('companyPage.mainActivity') }}</h3>
            <p>{{ sanitizeText(company.mainActivity) }}</p>
          </div>
          <div v-if="company.secondaryActivity" class="bg-WtB p-4 rounded-lg">
            <h3 class="font-bold mb-1">{{ t('companyPage.secondaryActivity') }}</h3>
            <p>{{ sanitizeText(company.secondaryActivity) }}</p>
          </div>
          <div v-if="company.centerOfInterest" class="bg-WtB p-4 rounded-lg">
            <h3 class="font-bold mb-1">{{ t('companyPage.interests') }}</h3>
            <p>{{ sanitizeText(company.centerOfInterest) }}</p>
          </div>
        </div>
      </div>

      <!-- Métadonnées -->
      <div class="border-t pt-6 mt-6 text-xs sm:text-sm">
        <p>
          {{ t('companyPage.joinedOn') }}
          <span class="font-bold"> {{ formatDate(company.createdAt) }} </span>
        </p>
        <p class="mt-2">
          {{ t('companyPage.lastUpdated') }}
          <span class="font-bold"> {{ formatDate(company.updatedAt) }}</span>
        </p>
      </div>
    </div>

    <!-- Modal de signalement -->
    <div v-if="showReportModal"
      class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div class="relative bg-WtB rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <button @click="showReportModal = false" class="absolute top-3 right-3 p-1 hover:bg-WtBAct rounded-full">
          <IconX
            class="h-5 w-5 sm:h-6 sm:w-6 transform transition duration-300 ease-in-out hover:rotate-90 hover:text-danger" />
        </button>
        <h3 class="text-xl sm:text-2xl font-bold mb-4">{{ t('companyPage.reportModal.title', {
          companyName: company.name
        }) }}</h3>

        <!-- Champs de vérification -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">{{ t('companyPage.reportModal.companyLabel') }}</label>
          <input type="text" :value="company.name" disabled
            class="w-full border rounded-md p-2 bg-ash cursor-not-allowed text-sm" />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">{{ t('companyPage.reportModal.pageLinkLabel') }}</label>
          <input type="text" :value="pageLink" disabled
            class="w-full border rounded-md p-2 bg-ash cursor-not-allowed text-sm" />
        </div>

        <form @submit.prevent="submitReport">
          <!-- Identification -->
          <div class="mb-4 pb-4 border-b-2">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2 sm:gap-0">
              <label class="block font-medium text-sm sm:text-base">{{ t('companyPage.reportModal.identificationTitle')
              }}</label>
              <!-- Interrupteur anonymat -->
              <div class="flex items-center gap-2 sm:gap-3">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="reportData.isAnonymous" type="checkbox" class="sr-only">
                  <div class="w-11 h-6 bg-gray-200 rounded-full transition-colors"
                    :class="{ 'bg-primary': reportData.isAnonymous }">
                    <div class="absolute top-[2px] left-[2px] bg-WtB rounded-full h-5 w-5 transition-all"
                      :class="{ 'translate-x-full': reportData.isAnonymous }"></div>
                  </div>
                </label>
                <span class="text-sm font-medium">{{ t('companyPage.reportModal.reportAnonymously') }}</span>
              </div>
            </div>
            <div v-if="!reportData.isAnonymous" class="space-y-2">
              <div class="relative">
                <IconUser
                  class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 peer-focus:text-primary transition-colors" />
                <input v-model="reportData.fullname" type="text" id="fullname" placeholder=" " required
                  class="input-floating peer" />
                <label for="fullname" class="label-floating left-8">
                  {{ t('common.fullnameLabel') }} *
                </label>
              </div>

              <div class="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 w-full">
                <div class="relative w-full sm:w-1/2">
                  <IconMail
                    class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 peer-focus:text-primary transition-colors" />
                  <input v-model="reportData.email" type="email" id="email" placeholder=" " required
                    class="input-floating peer" />
                  <label for="email" class="label-floating left-8">
                    {{ t('common.emailLabel') }} *
                  </label>
                </div>

                <div class="relative w-full sm:w-1/2">
                  <IconPhone
                    class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 peer-focus:text-primary transition-colors" />
                  <input v-model="reportData.phone" type="tel" id="phone" placeholder=" " class="input-floating peer" />
                  <label for="phone" class="label-floating left-8">
                    {{ t('common.phoneLabel') }} ({{ t('common.optional') }})
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Motif du signalement -->
          <div class="mb-4">
            <label class="block mb-2 font-medium text-sm sm:text-base">{{ t('companyPage.reportModal.reasonTitle')
            }}</label>
            <select v-model="reportData.reason" class="w-full p-2 border rounded bg-WtB text-sm"
              @change="reportData.description = ''" required>
              <option value="" disabled selected>{{ t('companyPage.reportModal.selectReasonPlaceholder') }}</option>
              <option v-for="option in reasonOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>

          </div>

          <!-- Description détaillée -->
          <div class="mb-4">
            <label class="block mb-2 font-medium text-sm sm:text-base">{{ t('companyPage.reportModal.descriptionTitle')
            }}</label>

            <div class="relative">
              <IconBubbleText
                class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 peer-focus:text-primary transition-colors" />
              <textarea id="description" v-model="reportData.description" rows="4" placeholder=" "
                :disabled="!reportData.reason" class="input-floating peer" required></textarea>
              <label for="description" class="label-floating left-8"
                :class="reportData.reason ? 'label-floating--active' : 'label-floating--disabled'">
                {{ descriptionPlaceholder }}
              </label>
            </div>
          </div>

          <!-- Case à cocher de certification -->
          <div class="mb-6">
            <label class="flex items-center text-sm sm:text-base">
              <input type="checkbox" v-model="reportData.certified"
                class="w-4 h-4 accent-primary rounded border bg-WtB mr-2" required />
              {{ t('common.certificationCheckbox') }}
            </label>
          </div>

          <!-- Boutons -->
          <div class="flex justify-end gap-3 sm:gap-4">
            <button type="button" @click="showReportModal = false"
              class="px-4 py-2 bg-ash hover:bg-WtBAct hover:text-BtW rounded-lg text-sm">
              {{ t('common.cancelButton') }}
            </button>
            <button type="submit" :disabled="isSubmitting"
              class="px-4 py-2 bg-danger text-white rounded-lg hover:bg-dangerAct flex items-center gap-2 disabled:opacity-70 text-sm">
              <div v-if="isSubmitting" class="flex items-center">
                <IconLoader class="h-5 w-5 mr-2 animate-spin" />
                {{ t('companyPage.reportModal.submittingButton') }}
              </div>
              <div v-else class="flex items-center">
                <IconAlertCircle class="h-5 w-5 mr-2" />
                {{ t('companyPage.reportModal.submitButton') }}
              </div>
            </button>
          </div>

          <!-- Message -->
          <div v-if="submitResult"
            class="fixed bottom-4 right-4 z-50 p-3 text-sm rounded-lg shadow-lg transition-opacity"
            :class="{ 'bg-green-100 text-green-800 ': submitResult.success, 'bg-danger text-white': !submitResult.success }">
            {{ submitResult.message }}
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watchEffect } from 'vue'
import { SuitOpsServices } from '~/services/SuitOpsServices'
import { PGSServices } from '~/services/PGSServices'
import { useRoute, useRouter } from 'vue-router'
import { IconArrowLeft, IconAddressBook, IconGavel, IconBriefcase, IconMail, IconAlertTriangle, IconX, IconUser, IconPhone, IconBubbleText, IconLoader, IconAlertCircle } from '@tabler/icons-vue'
import Loader from '~/components/Load/LCompany.vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const route = useRoute()
const router = useRouter()
const id = route.params.id

// États du composant
const loading = ref(true)
const error = ref<string | null>(null)
const company = ref<any>(null)
const showReportModal = ref(false)
const isSubmitting = ref(false)
const submitResult = ref<{ success: boolean; message: string } | null>(null)

const reportData = ref({
  companyName: '' as string,
  reason: '',
  description: '',
  isAnonymous: false,
  fullname: '',
  email: '',
  phone: '',
  certified: false,
  pageLink: ''
})


// Gestion d'erreur
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  const name = company.value?.name || t('companyPage.logoAlt')
  target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${name}`
}

// Sanitisation
const sanitizeText = (text: string) => {
  return text
    ?.replace(/&#39;/g, "'")
    ?.replace(/&amp;/g, "&")
    ?.replace(/&quot;/g, '"')
    || '';
};

// Logique de récupération
const fetchCompany = async () => {
  error.value = null
  loading.value = true
  let attempts = 0
  const maxAttempts = 2

  while (attempts < maxAttempts) {
    try {
      const response = await SuitOpsServices.getCompanyById(id) as { data: any };
      const maskData = (value: string) => {
        return value?.slice(0, 4) + '*'.repeat(Math.max(value.length - 3, 0));
      };
      company.value = {
        ...response.data,
        phoneNumber: maskData(response.data.phoneNumber),
        ifu: maskData(response.data.ifu),
        rccm: maskData(response.data.rccm)
      };
      loading.value = false
      return
    } catch (err) {
      attempts++
      console.error(`Erreur (tentative ${attempts}/${maxAttempts}):`, err)
      if (attempts >= maxAttempts) {
        error.value = t('companyPage.loadingError')
        loading.value = false
      } else {
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    }
  }
}

onMounted(() => {
  fetchCompany();
  reportData.value.pageLink = typeof window !== 'undefined' ? window.location.href : '';
})

// Titre de la page
watchEffect(() => {
  if (company.value && company.value.name) {
    reportData.value.companyName = company.value.name;
    useHead({
      title: company.value.name
    });
  }
});

// Formatage des dates
const formatDate = (timestamp: string | number): string => {
  if (!timestamp) return 'N/A'
  const date = new Date(timestamp)
  return date.toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Contact par email
const openContact = () => {
  const subject = encodeURIComponent(t('companyPage.contactEmailSubject', { companyName: company.value.name }))
  const body = encodeURIComponent(t('companyPage.contactEmailBody', { companyName: company.value.name }))
  window.location.href = `mailto:${company.value.emailAddress}?subject=${subject}&body=${body}`
}

// Placeholder dynamique pour le textarea selon le motif
const reasonOptions = [
  { label: t('companyPage.reportModal.reasonIncorrectInfo'), value: 'incorrect info' },
  { label: t('companyPage.reportModal.reasonInappropriateContent'), value: 'inappropriate content' },
  { label: t('companyPage.reportModal.reasonSuspiciousActivity'), value: 'suspicious activity' },
  { label: t('companyPage.reportModal.reasonFraudulentRecruitment'), value: 'fraudulent recruitment' },
  { label: t('companyPage.reportModal.reasonMisleadingPublication'), value: 'misleading publication' },
  { label: t('companyPage.reportModal.reasonOther'), value: 'other' }
]

const descriptionPlaceholder = computed(() => {
  switch (reportData.value.reason) {
    case 'incorrect info':
      return t('companyPage.reportModal.descriptionPlaceholderIncorrectInfo')
    case 'inappropriate content':
      return t('companyPage.reportModal.descriptionPlaceholderInappropriateContent')
    case 'suspicious activity':
      return t('companyPage.reportModal.descriptionPlaceholderSuspiciousActivity')
    case 'fraudulent recruitment':
      return t('companyPage.reportModal.descriptionPlaceholderFraudulentRecruitment')
    case 'misleading publication':
      return t('companyPage.reportModal.descriptionPlaceholderMisleadingPublication')
    case 'other':
      return t('companyPage.reportModal.descriptionPlaceholderOther')
    default:
      return t('companyPage.reportModal.selectReasonPlaceholder')
  }
})

// Propriété calculée pour l'URL de la page
const pageLink = computed(() => {
  return typeof window !== 'undefined' ? window.location.href : '';
})

// Soumission du signalement
const submitReport = async () => {
  isSubmitting.value = true
  submitResult.value = null
  try {
    // Prépare les données à envoyer
    const payload = {
      companyName: reportData.value.companyName,
      pageLink: reportData.value.pageLink,
      reason: reportData.value.reason,
      description: reportData.value.description,
      isAnonymous: reportData.value.isAnonymous,
      ...(reportData.value.isAnonymous ? {} : {
        fullname: reportData.value.fullname,
        email: reportData.value.email,
        phone: reportData.value.phone,
      }),
      certified: reportData.value.certified,
    };

    // Appelle le nouveau service PGSServices
    const response = await PGSServices.reportCompany(payload);
    console.log('Signalement envoyé:', response);

    submitResult.value = { success: true, message: t('companyPage.reportModal.successMessage') };
    // Réinitialise le formulaire après envoi réussi
    reportData.value = {
      reason: '',
      description: '',
      isAnonymous: false,
      fullname: '',
      email: '',
      phone: '',
      certified: false,
      companyName: '' as string,
      pageLink: typeof window !== 'undefined' ? window.location.href : '',
    };
  } catch (error) {
    console.error('Erreur lors de l\'envoi du signalement:', error);
    submitResult.value = { success: false, message: t('companyPage.reportModal.errorMessage') };
  } finally {
    isSubmitting.value = false;
    setTimeout(() => {
      if (!submitResult.value?.success) {
        submitResult.value = null;
      } else {
        showReportModal.value = false;
        submitResult.value = null;
      }
    }, submitResult.value?.success ? 2000 : 4000);
  }
}
</script>

<style scoped>
.info-tooltip {
  @apply absolute hidden bg-gray-800 text-white p-2 rounded text-sm -top-8 left-1/2 -translate-x-1/2;
}

.group:hover .info-tooltip {
  @apply block;
}

.input-floating {
  @apply block px-10 pb-2 pt-3 w-full text-sm bg-WtB rounded-lg border appearance-none focus:outline-none focus:ring-0 focus:border-primary disabled:bg-ash disabled:cursor-not-allowed;
}

.label-floating {
  @apply absolute text-xs sm:text-sm duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] bg-WtB px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-4;
}

.label-floating--disabled {
  @apply bg-ash;
}

.label-floating--active {
  @apply bg-WtB;
}

/* Empêcher la copie du texte quand le flou est appliqué */
.blur-sm {
  user-select: none;
  -webkit-user-select: none;
}
</style>