<template>
  <main :class="{ 'mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 mt-4 md:mt-8': !isIframeMode, 'embed-container': isIframeMode }">
    <!-- Breadcrumb -->
    <useBreadcrumb :items="breadcrumbItems" v-if="!isIframeMode" class="no-print" />

    <!-- État de chargement -->
    <Loader v-if="loading" />

    <!-- Gestion des erreurs -->
    <div v-else-if="pageError && !isIframeMode" class="text-center p-6 md:p-8">
      <div class="mb-4">
        <IconMoodCry class="w-10 h-10 md:w-12 md:h-12 mx-auto" />
        <p class="text-danger mt-2">{{ pageError }}</p>
      </div>
      <button @click="fetchJob"
        class="bg-primary text-WtB px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-secondary transition-colors text-sm sm:text-base">
        {{ $t('common.retryButton') }}
      </button>
    </div>

    <!-- Contenu principal -->
    <div v-else>
      <!-- Contenu principal de la page -->
      <section class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <!-- Détails de l'offre -->
        <div class="lg:col-span-2 space-y-6 md:space-y-8">
          <!-- En-tête de l'offre -->
          <div class="bg-ash rounded-lg shadow-sm p-4 md:p-6 relative">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2 sm:gap-4">
              <div class="flex items-center gap-2 sm:gap-4 flex-wrap">
                <h1 class="text-2xl sm:text-3xl font-bold text-primary">{{ job.post }}</h1>
                <span v-if="job.status === 'opened'"
                  :class="['inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium', statusClass]">
                  {{ displayStatus }}
                </span>
              </div>

              <div>
                <!-- Badge modifié -->
                <span v-if="job.createdAt !== job.updatedAt"
                  class="inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium bg-yellow-100 text-yellow-800"
                  :title="$t('offersPage.modifiedBadgeText')">
                  {{ $t('offersPage.modifiedBadge') }}
                </span>
              </div>
            </div>
            <div class="flex flex-wrap gap-x-4 gap-y-2 mb-4 md:mb-6 text-sm sm:text-base">
              <div class="flex items-center">
                <IconBriefcase class="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
                {{ formatContract(job.contract) }}
              </div>
              <span class="hidden sm:inline">•</span>
              <div class="flex items-center">
                <IconLocation class="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
                {{ job.location }}
              </div>
              <span class="hidden sm:inline">•</span>
              <div class="flex items-center">
                <IconUsers class="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
                {{ $t('offersPage.placesAvailable', job.placeNumber) }}
              </div>
              <span class="hidden sm:inline">•</span>
              <div class="flex items-center">
                <IconUserScan class="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
                {{ job.profile }}
              </div>
              <div class="flex flex-wrap gap-x-4 gap-y-2 mt-2 sm:mt-0 w-full sm:w-auto">
                <div class="flex items-center">
                  <IconCalendar class="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
                  {{ $t('offerID.jobDetails.publishedOn') }} {{ formatDate(job.createdAt) }}
                </div>
                <span class="hidden sm:inline">•</span>
                <div class="flex items-center">
                  <IconCalendarX class="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
                  {{ $t('offerID.jobDetails.closesOn') }} {{ formatDate(job.closingDate) }}
                </div>
              </div>
            </div>
          </div>

          <!-- Sections dynamiques -->
          <div v-if="hasContent" class="bg-ash rounded-lg shadow-sm p-4 md:p-6 relative">
            <!-- Résumé / Description -->
            <SectionBlock v-if="job.summary && job.summary.trim() !== '<p> </p>'" class="mb-4 md:mb-6"
              :title="$t('offerID.sections.jobPresentation')">
              <h2 class="text-xl sm:text-2xl font-semibold mb-2">{{ $t('offerID.sections.description') }}</h2>
              <div class="prose max-w-none text-sm sm:text-base" v-html="job.summary" />
            </SectionBlock>
            <!-- Tâches -->
            <SectionBlock v-if="job.tasks && job.tasks.trim() !== '<p> </p>'" class="mb-4 md:mb-6"
              :title="$t('offerID.sections.mainMissions')">
              <h2 class="text-xl sm:text-2xl font-semibold mb-2">{{ $t('offerID.sections.tasks') }}</h2>
              <div class="prose max-w-none text-sm sm:text-base" v-html="job.tasks" />
            </SectionBlock>
            <!-- Compétences -->
            <SectionBlock v-if="job.skills && job.skills.trim() !== '<p> </p>'" class="mb-4 md:mb-6"
              :title="$t('offerID.sections.requiredSkills')">
              <h2 class="text-xl sm:text-2xl font-semibold mb-2">{{ $t('offerID.sections.skills') }}</h2>
              <div class="prose max-w-none text-sm sm:text-base" v-html="job.skills" />
            </SectionBlock>
            <!-- Aptitudes -->
            <SectionBlock v-if="job.aptitudes && job.aptitudes.trim() !== '<p> </p>'" class="mb-4 md:mb-6"
              :title="$t('offerID.sections.qualitiesSought')">
              <h2 class="text-xl sm:text-2xl font-semibold mb-2">{{ $t('offerID.sections.aptitudes') }}</h2>
              <div class="prose max-w-none text-sm sm:text-base" v-html="job.aptitudes" />
            </SectionBlock>
            <!-- Documents requis -->
            <SectionBlock v-if="job.requiredDocument && job.requiredDocument.trim() !== '<p> </p>'" class="mb-4 md:mb-6"
              :title="$t('offerID.sections.documentsToProvide')">
              <h2 class="text-xl sm:text-2xl font-semibold mb-2">{{ $t('offerID.sections.requiredDocuments') }}</h2>
              <div class="prose max-w-none text-sm sm:text-base" v-html="job.requiredDocument" />
            </SectionBlock>
          </div>

          <!-- Si contenu non disponible -->
          <div v-else class="text-center p-4">
            <p class="text-lg">
              {{ $t('offerID.sections.noDetailsAvailable') }}
            </p>
            <p class="mt-2 text-sm text-danger">
              {{ $t('offerID.sections.applyInstructions') }}
            </p>
          </div>
        </div>

        <!-- Entreprise et Postuler et Actions -->
        <div class="space-y-6 md:space-y-6">
          <!-- Carte entreprise -->
          <div class="bg-ash rounded-lg shadow-sm p-4 md:p-6">
            <div class="flex items-center mb-4">
              <img :src="`${suitOpsBaseAPI}/files/${job.company?.logo}`"
                :alt="job.company?.name || $t('offerID.companyLogoAlt')"
                class="h-14 w-14 sm:h-16 sm:w-16 rounded-full object-cover border" loading="lazy"
                @error="handleImageError" />
              <div class="ml-3 sm:ml-4">
                <NuxtLink :to="localePath(`/company/${job.company.id}/${job.company.name}`)"
                  class="text-lg sm:text-xl font-semibold hover:text-secondary transition-colors"
                  :title="t('offersPage.viewCompanyProfile', { companyName: job.company.name })">
                  {{ job.company.name }}
                </NuxtLink>
                <p class="text-xs sm:text-sm">{{ sanitizeText(job.company.mainActivity) }}</p>
              </div>
            </div>
            <div class="space-y-2 text-sm">
              <p v-if="job.company.secondaryActivity" class="flex items-center">
                <IconBriefcase class="h-4 w-4 mr-1.5" />
                {{ sanitizeText(job.company.secondaryActivity) }}
              </p>
              <p v-if="job.company.centerOfInterest" class="flex items-center">
                <IconStar class="h-4 w-4 mr-1.5" />
                {{ job.company.centerOfInterest }} {{ sanitizeText(job.centerOfInterest) }}
              </p>
              <p class="flex items-center">
                <IconBuilding class="h-4 w-4 mr-1.5" />
                {{ job.company.address }}
              </p>
            </div>
          </div>

          <!-- Carte contact et postuler -->
          <div class="bg-ash rounded-lg shadow-sm p-4 md:p-6 space-y-3 md:space-y-4">
            <h3 class="text-base sm:text-lg font-semibold">{{ $t('offerID.applicationCard.applyTitle') }}</h3>
            <div class="mt-3 flex items-center">
              <!-- Badge questionnaire -->
              <div>
                <div v-if="job.quizzes && job.quizzes.length > 0" class="flex items-center">
                  <IconHelpOctagon class="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 text-green-600" />
                  <span
                    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs sm:text-sm font-medium bg-green-100 text-green-600">
                    {{ $t('offerID.applicationCard.quizRequired') }}
                  </span>
                </div>
                <div v-else class="flex items-center">
                  <IconProgressHelp class="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 text-red-600" />
                  <span
                    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs sm:text-sm font-medium bg-red-100 text-red-600">
                    {{ $t('offerID.applicationCard.noQuiz') }}
                  </span>
                </div>
              </div>
            </div>
            <div class="space-y-2 text-sm">
              <a :href="`mailto:${job.email}`" class="flex items-center text-primary hover:underline">
                <IconMail class="h-4 w-4 mr-1.5" />
                {{ job.email }}
              </a>
              <a :href="`tel:${job.contact}`" class="flex items-center text-primary hover:underline">
                <IconPhone class="h-4 w-4 mr-1.5" />
                {{ job.contact }}
              </a>
            </div>
            <p class="text-xs sm:text-sm mt-3">
              {{ $t('offerID.applicationCard.applicationDeadline') }} {{ formatCloseDate(job.closingDate) }}
            </p>
            <div class="flex flex-col sm:flex-row justify-around gap-2 mt-4 no-print">
              <button @click="startApplication"
                class="flex items-center justify-center py-2 px-3 sm:px-4 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base">
                <IconSend class="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
                {{ $t('offerID.applicationCard.applyButton') }}
              </button>
              <button @click="openReportModal"
                class="flex items-center justify-center py-2 px-3 sm:px-4 bg-red-600 text-white rounded hover:bg-red-700 text-sm sm:text-base">
                <IconInfoTriangle class="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
                {{ $t('offerID.applicationCard.reportOfferButton') }}
              </button>
            </div>
          </div>

          <!-- Carte Actions -->
          <div v-if="!isIframeMode" class="bg-ash rounded-lg shadow-sm p-4 md:p-6 space-y-3 md:space-y-4 no-print">
            <h3 class="text-base sm:text-lg font-semibold">{{ $t('offerID.actionsCard.actionsTitle') }}</h3>
            <div class="flex justify-around gap-2 mt-4 grid grid-cols-3">
              <button @click="generatePDF"
                class="flex items-center justify-center py-2 px-3 sm:px-4 bg-transparent text-textClr rounded-full hover:bg-textClr hover:text-WtB text-sm sm:text-base">
                <IconPrinter class="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
                {{ $t('offerID.actionsCard.printButton') }}
              </button>
              <button @click="shareJob"
                class="flex items-center justify-center py-2 px-3 sm:px-4 bg-transparent text-primary rounded-full hover:bg-primary hover:text-WtB text-sm sm:text-base">
                <IconShare class="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
                {{ $t('common.shareButton') }}
              </button>
              <button @click="copyIframe"
                class="flex items-center justify-center py-2 px-3 sm:px-4 bg-transparent text-secondary rounded-full hover:bg-secondary hover:text-WtB text-sm sm:text-base">
                <IconCode class="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
                {{ $t('common.iframeButton') }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Modal de vérification de mail -->
      <div v-if="emailModal"
        class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div class="bg-WtB rounded-lg p-6 w-11/12 sm:w-96 relative border">
          <button @click="emailModal = false" class="absolute top-3 right-3 p-1 hover:bg-WtBAct rounded-full">
            <IconX class="h-6 w-6 transform transition duration-300 ease-in-out hover:rotate-90 hover:text-danger" />
          </button>
          <h3 class="text-xl font-bold mb-4">{{ $t('offerID.emailModal.title') }}</h3>
          <div class="relative mb-4">
            <IconMail
              class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 peer-focus:text-primary transition-colors" />
            <input v-model="candidateEmail" type="email" id="email" placeholder=" " required
              class="input-floating peer" />
            <label for="email" class="label-floating left-8">
              {{ $t('common.emailLabel') }}
            </label>
          </div>

          <button @click="checkEligibility" :disabled="eligibilityLoading"
            class="flex items-center mx-auto px-4 py-2 bg-primary text-WtB rounded hover:bg-secondary disabled:bg-textClr disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            <div v-if="eligibilityLoading" class="flex items-center">
              <IconLoader class="h-5 w-5 mr-2 animate-spin" />
              {{ $t('offerID.emailModal.verifyingButton') }}
            </div>
            <div v-else class="flex items-center">
              <IconSend2 class="h-5 w-5 mr-2" />
              {{ $t('offerID.emailModal.verifyButton') }}
            </div>
          </button>
          <!-- Message -->
          <p v-if="apiMessage"
            class="bg-green-100 text-green-800 fixed bottom-4 right-4 z-50 p-3 text-sm rounded-lg shadow-lg transition-opacity">
            {{ apiMessage }}</p>
          <p v-if="eligibilityError"
            class="bg-danger text-white fixed bottom-4 right-4 z-50 p-3 text-sm rounded-lg shadow-lg transition-opacity">
            {{ eligibilityError }}</p>
        </div>
      </div>

      <!-- Modal de signalement -->
      <div v-if="showReportModal"
        class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div class="bg-WtB rounded-lg p-6 w-11/12 sm:w-1/2 relative">
          <button @click="closeReportModal" class="absolute top-3 right-3 p-1 hover:bg-WtBAct rounded-full">
            <IconX class="h-6 w-6 transform transition duration-300 ease-in-out hover:rotate-90 hover:text-danger" />
          </button>
          <h3 class="text-xl font-bold mb-4">{{ $t('offerID.reportModal.title', { jobPost: job.post }) }}</h3>
          <!-- Champs de vérification -->
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">{{ $t('offerID.reportModal.offerCompanyLabel') }}</label>
            <input type="text" :value="job && job.company ? `${job.post} | ${job.company.name}` : ''" disabled
              class="w-full border rounded-md p-2 bg-ash cursor-not-allowed" />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">{{ $t('offerID.reportModal.pageLinkLabel') }}</label>
            <input type="text" :value="pageLink" disabled
              class="w-full border rounded-md p-2 bg-ash cursor-not-allowed" />
          </div>

          <p class="mb-4">{{ $t('offerID.reportModal.reasonRequired') }}</p>
          <div class="relative">
            <IconBubbleText
              class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 peer-focus:text-primary transition-colors" />
            <textarea id="message" v-model="reportReason" rows="4" placeholder=" " class="input-floating peer"
              required></textarea>
            <label for="message" class="label-floating left-8">
              {{ $t('offerID.reportModal.reasonLabel') }}
            </label>
          </div>

          <!-- Case à cocher de certification -->
          <div class="mt-6">
            <label class="flex items-center text-sm sm:text-base">
              <input type="checkbox" v-model="reportCertified" class="w-4 h-4 accent-primary rounded border bg-WtB mr-2"
                required />
              {{ t('common.certificationCheckbox') }}
            </label>
          </div>

          <div class="mt-4 flex justify-end gap-4">
            <button @click="closeReportModal" class="px-4 py-2 bg-ash hover:bg-WtBAct hover:text-BtW rounded"
              :disabled="reportLoading">{{ $t('common.cancelButton') }}</button>
            <button @click="submitReport" :disabled="reportLoading"
              class="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <div v-if="reportLoading" class="flex items-center">
                <IconLoader class="h-5 w-5 mr-2 animate-spin" />
                {{ $t('offerID.reportModal.submittingButton') }}
              </div>
              <div v-else class="flex items-center">
                <IconAlertCircle class="h-5 w-5 mr-2" />
                {{ $t('offerID.reportModal.submitButton') }}
              </div>
            </button>
          </div>

          <!-- Messages d'erreur ou de succès -->
          <p v-if="reportError"
            class="bg-danger text-white fixed bottom-4 right-4 z-50 p-3 text-sm rounded-lg shadow-lg transition-opacity">
            {{ reportError }}</p>
          <p v-if="reportSuccess"
            class="bg-green-100 text-green-800 fixed bottom-4 right-4 z-50 p-3 text-sm rounded-lg shadow-lg transition-opacity">
            {{ reportSuccess }}</p>
        </div>
      </div>
    </div>

    <!-- Notification -->
    <div v-if="showNotification"
      class="fixed bottom-4 right-4 z-50 bg-BtW text-WtB px-4 py-2 rounded shadow-lg transition-all">
      {{ notificationMessage }}
    </div>

    <IframeFooter v-if="isIframeMode" :original-path="`offer/${route.params.id}/${route.params.slug}`" />
  </main>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watchEffect } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'
import { useRoute } from 'vue-router'
import { SuitOpsServices } from '~/services/SuitOpsServices.js'
import { PGSServices } from '~/services/PGSServices.js'
import { IconX, IconMoodCry, IconBriefcase, IconLocation, IconUsers, IconUserScan, IconCalendar, IconCalendarX, IconBuilding, IconHelpOctagon, IconProgressHelp, IconMail, IconPhone, IconSend, IconSend2, IconInfoTriangle, IconAlertCircle, IconStar, IconLoader, IconPrinter, IconShare, IconBubbleText, IconCode } from '@tabler/icons-vue'
import Loader from '~/components/Load/LOfferId.vue'
import { useI18n } from 'vue-i18n'
import { useIframeMode } from '~/composables/useIframeMode.js'

const { t, locale } = useI18n()
const config = useRuntimeConfig()
const suitOpsBaseAPI = config.public.suitOpsBaseAPI
const route = useRoute()
const job = ref(null)
const loading = ref(true)
const pageError = ref(null)
const now = ref(new Date())
const apiMessage = ref('')
const redirecting = ref(false)
const emailModal = ref(false)
const candidateEmail = ref('')
const eligibilityError = ref('')
const eligibilityLoading = ref(false)
const showReportModal = ref(false)
const reportReason = ref('')
const reportCertified = ref(false)
const reportLoading = ref(false)
const reportError = ref(null)
const reportSuccess = ref(null)
const notificationMessage = ref('')
const showNotification = ref(false)

// fil d’Ariane
const breadcrumbItems = computed(() => [
  { label: t('offerID.breadcrumbOffers'), href: '/offer' },
  { label: job.value?.post || t('offerID.thisOffer') }
])

const startApplication = () => {
  emailModal.value = true
}

// Gestion des erreurs d'image
const handleImageError = (event) => {
  const target = event.target
  const name = target.alt || t('offerID.companyLogoAlt')
  target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`
  target.onerror = null
}

//Fonction pour nettoyer le contenu HTML
const cleanHtmlContent = (htmlString) => {
  if (!htmlString) return '';
  let cleaned = htmlString.replace(/<p>\s*<\/p>/g, '');
  cleaned = cleaned.replace(/<[^>]*>/g, '').trim();
  return cleaned;
};

const hasContent = computed(() => {
  const s = cleanHtmlContent(job.value?.summary);
  const ta = cleanHtmlContent(job.value?.tasks);
  const sk = cleanHtmlContent(job.value?.skills);
  const ap = cleanHtmlContent(job.value?.aptitudes);
  const rd = cleanHtmlContent(job.value?.requiredDocument);

  return s !== '' || ta !== '' || sk !== '' || ap !== '' || rd !== '';
});

// Sanitisation
const sanitizeText = (text) => {
  return text
    ?.replace(/&#39;/g, "'")
    ?.replace(/&amp;/g, "&")
    ?.replace(/&quot;/g, '"')
    || ''
}

const checkEligibility = async () => {
  eligibilityError.value = ''
  apiMessage.value = ''
  eligibilityLoading.value = true
  try {
    const response = await SuitOpsServices.checkEligibility(
      route.params.id,
      candidateEmail.value
    )
    if (response.nextStep === 2 && (!response.data || response.data.length === 0)) {
      eligibilityError.value = response.message || t('offerID.emailModal.emailAlreadyUsed')
      return
    }
    // Message de l'API avant redirection
    apiMessage.value = response.message
    redirecting.value = true
    setTimeout(() => {
      const url = response.nextStep === 1
        ? `/offer/${route.params.id}/apply/?email=${encodeURIComponent(candidateEmail.value)}`
        : `/offer/${route.params.id}/test?email=${encodeURIComponent(candidateEmail.value)}`
      window.open(url, '_blank')
    }, 1000)
  } catch (error) {
    const errData = error.response?.data || {}
    if (errData.problems && errData.problems.length > 0) {
      eligibilityError.value = errData.problems[0].id
    } else if (errData.id) {
      eligibilityError.value = errData.id
    } else {
      eligibilityError.value = errData.message || t('offerID.emailModal.verificationError')
    }
  } finally {
    eligibilityLoading.value = false
  }
}

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString(locale.value, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const formatCloseDate = (timestamp) => {
  if (!timestamp) return 'N/A'
  const date = new Date(timestamp)
  return `${date.toLocaleDateString(locale.value,
    { day: '2-digit', month: 'long', year: 'numeric' })} ${t('common.at')} ${date.toLocaleTimeString(locale.value, { hour: '2-digit', minute: '2-digit' })}`
}

// Calcul du temps restant
const closingTime = computed(() => {
  if (!job.value?.closingDate) return null
  return new Date(job.value.closingDate)
})

const timeDiff = computed(() => {
  if (!closingTime.value) return 0
  return closingTime.value - now.value
})

// Si l'offre se termine dans moins de 7 jours
const closingSoon = computed(() => {
  return timeDiff.value > 0 && timeDiff.value < 7 * 24 * 60 * 60 * 1000
})

//Libellé du badge
const displayStatus = computed(() => {
  if (job.value?.status !== 'opened') return t('offerID.statusClosed')
  if (timeDiff.value <= 0) return t('offerID.statusClosed')
  if (closingSoon.value) return timeRemaining.value
  return t('offerID.statusOpen')
})

// Style à appliquer au badge
const statusClass = computed(() => {
  if (job.value?.status !== 'opened') return ''
  if (timeDiff.value <= 0) return 'bg-red-100 text-red-800'
  if (closingSoon.value) return 'bg-orange-100 text-orange-800'
  return 'bg-green-100 text-green-800'
})

// Calcule le temps restant
const timeRemaining = computed(() => {
  if (timeDiff.value <= 0) return ''
  const seconds = Math.floor(timeDiff.value / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return t('offerID.closesInDays', days)
  if (hours > 0) return t('offerID.closesInHours', hours)
  if (minutes > 0) return t('offerID.closesInMinutes', minutes)
  return t('offerID.closesInSeconds', seconds)
})

// Mise à jour temps réel
let interval
onMounted(() => {
  interval = setInterval(() => {
    now.value = new Date()
  }, 1000)
  fetchJob()
})
onBeforeUnmount(() => {
  clearInterval(interval)
})

const formatContract = (contract) => {
  const contracts = {
    'STAGE': t('offersPage.STAGE'),
    'CDI': 'CDI',
    'CDD': 'CDD'
  }
  return contracts[contract] || contract
}

const openReportModal = () => {
  showReportModal.value = true
  reportError.value = null
  reportSuccess.value = null
}

const closeReportModal = () => {
  showReportModal.value = false
  reportLoading.value = false
  reportError.value = null
  reportSuccess.value = null
  reportReason.value = ''
  reportCertified.value = false
}

// Ensoie de signalement
const submitReport = async () => {
  if (!reportReason.value.trim()) {
    reportError.value = t('offerID.reportModal.reasonPlaceholder');
    return;
  }

  if (!reportCertified.value) {
    reportError.value = t('common.certifiedRequired');
    return;
  }

  reportError.value = null;
  reportLoading.value = true;

  try {
    await PGSServices.reportOffer({
      offerPost: job.value?.post,
      companyName: job.value?.company?.name,
      pageLink: pageLink.value,
      reason: reportReason.value,
      certified: reportCertified.value
    });

    reportSuccess.value = t('offerID.reportModal.reportSuccess');

    setTimeout(() => {
      closeReportModal();
    }, 1500);
  } catch (error) {
    reportError.value = error?.data?.message || t('offerID.reportModal.reportError');
  } finally {
    reportLoading.value = false;
  }
};

// Récupération
const fetchJob = async () => {
  pageError.value = null
  loading.value = true
  let attempts = 0
  const maxAttempts = 2
  while (attempts < maxAttempts) {
    try {
      const id = route.params.id
      const response = await SuitOpsServices.getOneJobOffer(id)
      job.value = response.data?.data || response.data || null
      loading.value = false
      return
    } catch (err) {
      attempts++
      console.error(`Erreur lors de la récupération de l'offre, tentative ${attempts}:`, err)
      if (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 500))
      } else {
        const errData = err.response?.data || {}
        if (errData.problems && errData.problems.length > 0) {
          pageError.value = errData.problems[0].id
        } else if (errData.id) {
          pageError.value = errData.id
        } else {
          pageError.value = errData.message || t('common.loadError', { object: t('offerID.thisOffer') });
        }
        loading.value = false
      }
    }
  }
}

// Mise à jour du titre de la page
watchEffect(() => {
  if (job.value) {
    useHead({
      title: job.value.post
    })
  }
})

// URL de la page
const pageLink = computed(() => {
  return typeof window !== 'undefined' ? window.location.href : ''
})

// Génération en pdf
const generatePDF = () => {
  const wasEmailModalOpen = emailModal.value
  const wasReportModalOpen = showReportModal.value
  emailModal.value = false
  showReportModal.value = false

  setTimeout(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      @media print {
        .no-print, header, footer, nav, .breadcrumb, .print-hide {
          display: none !important;
        }
        body {
          padding: 20px;
        }
        .prose {
          max-width: 100% !important;
        }
      }
    `
    document.head.appendChild(style)
    window.print()
    setTimeout(() => {
      document.head.removeChild(style)
    }, 1000)

    emailModal.value = wasEmailModalOpen
    showReportModal.value = wasReportModalOpen
  }, 100)
}

// Notification
const triggerNotification = (message) => {
  notificationMessage.value = message
  showNotification.value = true

  // Masquer la notification après 3 secondes
  setTimeout(() => {
    showNotification.value = false
    notificationMessage.value = ''
  }, 3000)
}

// fonction de partage
const shareJob = async () => {
  try {
    await navigator.share({
      title: job.value.post,
      text: t('offerID.shareTitle', { companyName: job.value.company?.name }),
      url: window.location.href
    })
  } catch (err) {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href)
      triggerNotification(t('common.linkCopied'))
    } else {
      console.error('Le partage a échoué', err)
      triggerNotification(t('common.copyError'))
    }
  }
}

// Gestion de l'Iframe
const { isIframeMode, generateIframeCode } = useIframeMode('offerID.offerTitle', 'Offre d\'emploi SuitOps');

// Fonction pour copier le code de l'iframe
const copyIframe = async () => {
  const iframeCode = generateIframeCode(
    job.value?.post,
    route.path
  );

  try {
    await navigator.clipboard.writeText(iframeCode);
    triggerNotification(t('common.iframeCopied'));
  } catch (err) {
    console.error('Erreur lors de la copie du code iframe de l\'offre :', err);
    triggerNotification(t('common.iframeCopyError'));
  }
};
</script>

<style>
.input-floating {
  @apply block px-10 pb-2 pt-3 w-full text-sm bg-WtB rounded-lg border appearance-none focus:outline-none focus:ring-0 focus:border-primary;
}

.label-floating {
  @apply absolute text-xs sm:text-sm duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] bg-WtB px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-4;
}

.prose ul {
  @apply list-disc pl-5 sm:pl-6 space-y-1.5 sm:space-y-2;
}

.prose p {
  @apply mb-3 sm:mb-4;
}

.prose strong {
  color: inherit !important;
}

.dark .prose {
  color: inherit !important;
}

.dark .prose :deep(*) {
  color: inherit !important;
}

.dark .prose :deep(a) {
  color: var(--color-primary) !important;
}

.dark .prose :deep(em),
.dark .prose :deep(strong) {
  color: inherit !important;
  font-weight: bold;
}

/* Conteneur principal de la page en mode iframe */
.embed-container {
  display: flex;
  flex-direction: column;
  height: 100vh; 
  padding: 0;
  margin: 0;
}

/* Le contenu principal à l'intérieur de l'iframe */
.embed-container > div:first-of-type { 
  flex-grow: 1; 
  overflow-y: auto; 
  padding-bottom: 70px !important; 
}
</style>