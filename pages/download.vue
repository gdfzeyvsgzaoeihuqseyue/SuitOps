<template>
  <main>
    <!-- Hero section -->
    <header class="relative py-24 bg-cover bg-center"
      style="background-image: url('https://raw.githubusercontent.com/ProGestionSoft/Files/main/SuitOps_Landing/Hero/download.png')">
      <div class="absolute inset-0 bg-gradient-to-r from-ash to-ashAct opacity-80"></div>
      <div class="absolute inset-0 backdrop-blur-sm"></div>

      <div class="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center text-BtW">
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6" v-motion
          :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }">
          {{ t('downloadPage.heroTitle') }}
        </h1>
        <p class="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto px-2">
          {{ t('downloadPage.heroSubtitle') }}
        </p>
      </div>
    </header>

    <!-- Download section -->
    <section class="py-12 sm:py-16 bg-WtB">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <!-- Sélecteur d'OS -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-10 sm:mb-14" v-motion
          :initial="{ opacity: 0, y: -50 }" :visibleOnce="{ opacity: 1, y: 0 }">
          <div v-for="os in osOptions" :key="os.name" @click="handleOSSelection(os)"
            class="cursor-pointer bg-WtBAct p-5 sm:p-6 rounded-xl border transition-all flex flex-col items-center justify-center text-center"
            :class="{
              'border-primary shadow-lg': selectedOS?.name === os.name,
              'border-gray-200 hover:border-primary/50': true,
              'opacity-50 cursor-not-allowed': !os.available
            }">
            <img :src="os.logo" :alt="os.name + ' Logo'" class="h-14 sm:h-16 md:h-18 mx-auto mb-3 sm:mb-4" />
            <h3 class="text-lg sm:text-xl font-semibold">{{ os.name }}</h3>

            <p v-if="os.downloadCount >= 0" class="text-xs sm:text-sm mt-1">
              {{ formatDownloadCount(os.downloadCount) }} {{ t('downloadPage.downloads', os.downloadCount) }}
            </p>

            <p v-if="!os.available" class="text-xs sm:text-sm text-center text-danger mt-1 sm:mt-2">
              {{ t('downloadPage.versionUnavailable') }}
            </p>
          </div>
        </div>

        <!-- Carte de téléchargement et Configuration requise -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <!-- Carte de téléchargement -->
          <div v-if="selectedOS?.available" ref="downloadCard" class="bg-WtBAct rounded-2xl shadow-2xl p-7 sm:p-9"
            v-motion :initial="{ opacity: 0, x: -50 }" :visibleOnce="{ opacity: 1, x: 0 }">
            <div class="text-center mb-7 sm:mb-9">
              <img :src="selectedOS.logo" :alt="selectedOS.name + ' Logo'"
                class="h-16 sm:h-20 md:h-24 mx-auto mb-4 sm:mb-6 drop-shadow-xl" />
              <h2 class="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
                {{ t('downloadPage.desktopFor', { osName: selectedOS.name }) }}
              </h2>
              <p class="text-sm sm:text-base">
                {{ selectedOS.version }}
                <span class="text-textClr/80 text-xs sm:text-sm">{{ t('downloadPage.status', {
                  status: selectedOS.status
                }) }}</span>
              </p>
            </div>
            <div class="space-y-4 sm:space-y-5">
              <div v-for="(text, index) in selectedOS.details" :key="index" class="flex items-center">
                <component :is="defaultDetailsIcons[index]"
                  class="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-primary flex-shrink-0" />
                <span class="text-sm sm:text-base">{{ text }}</span>
              </div>
            </div>
            <div class="mt-7 sm:mt-9">
              <a :href="selectedOS.downloadLink" @click="handleDownloadClick(selectedOS.name)"
                class="block w-full bg-primary text-WtB text-center py-4 sm:py-5 rounded-lg hover:bg-secondary transition-colors text-base sm:text-lg">
                <IconDownload class="inline-block w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                {{ t('downloadPage.downloadFor', { osName: selectedOS.name }) }}
              </a>
              <p class="text-xs sm:text-sm text-center mt-3 sm:mt-4">
                {{ t('downloadPage.termsAcceptance') }}
                <NuxtLink :to="localePath('/terms')" class="text-primary hover:underline">{{
                  t('downloadPage.termsOfUse') }}</NuxtLink>
              </p>
            </div>
          </div>

          <!-- Message d'indisponibilité -->
          <div v-else-if="selectedOS" class="col-span-full flex justify-center">
            <div class="relative max-w-xl w-full p-7 sm:p-9 rounded-3xl text-center" v-motion
              :initial="{ opacity: 0, x: -50 }" :visibleOnce="{ opacity: 1, x: 0 }">
              <span class="absolute inset-0 bg-danger opacity-10 dark:opacity-30 rounded-3xl"></span>
              <div class="relative inline-block w-fit mx-auto mb-4 sm:mb-6">
                <img :src="selectedOS.logo" :alt="selectedOS.name + ' Logo'"
                  class="h-16 sm:h-20 md:h-24 mx-auto drop-shadow-xl" />
                <IconAlertTriangle
                  class="absolute -bottom-2 -right-2 h-6 w-6 sm:h-7 sm:w-7 md:h-9 md:w-9 text-danger bg-WtB p-1 rounded-full border-2 border-danger" />
              </div>

              <h3 class="text-xl sm:text-2xl font-bold mb-2">
                {{ t('downloadPage.osUnavailableTitle', { osName: selectedOS.name }) }}
              </h3>
              <p class="text-sm sm:text-base mb-4 sm:mb-6"
                v-html="t('downloadPage.osUnavailableText', { osName: selectedOS.name })"></p>
              <NuxtLink
                class="mt-4 sm:mt-6 px-6 py-2.5 sm:px-7 sm:py-3 bg-primary relative z-10 text-WtB rounded-lg hover:bg-secondary transition-colors text-sm sm:text-base"
                :to="localePath('/#newsletter')">
                {{ t('downloadPage.notifyMe') }}
              </NuxtLink>
            </div>
          </div>

          <!-- Exigence système affichée -->
          <div v-if="selectedOS && selectedOS?.available" class="space-y-6 sm:space-y-8" v-motion
            :initial="{ opacity: 0, x: -50 }" :visibleOnce="{ opacity: 1, x: 0, transition: { delay: 200 } }">
            <h3 class="text-xl sm:text-2xl font-bold text-center md:text-left">{{
              t('downloadPage.systemRequirementsTitle') }}</h3>
            <div class="space-y-4 sm:space-y-6">
              <div v-for="(req, index) in systemRequirementsConfig" :key="index"
                class="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
                <div class="flex-shrink-0 mb-3 sm:mb-0 sm:mr-4">
                  <div
                    class="relative flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 text-primary">
                    <span class="absolute inset-0 bg-primary opacity-10 dark:opacity-20 rounded-full"></span>
                    <component :is="req.icon" class="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                  </div>
                </div>
                <div class="sm:ml-4 sm:border-l sm:border-primary sm:pl-4">
                  <h4 class="text-base sm:text-lg font-medium mb-1">{{ t(`downloadPage.${req.translationKey}`) }}</h4>
                  <div v-for="detail in currentSystemRequirements[index]" :key="detail"
                    class="text-sm sm:text-base mb-0.5 sm:mb-1">
                    {{ detail }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="bg-WtBAct">
      <!-- Pourquoi choisir la version bureautique ? -->
      <section class="py-12 sm:py-16">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12" v-motion :initial="{ opacity: 0, x: -50 }"
          :visibleOnce="{ opacity: 1, x: 0, transition: { delay: 200 } }">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 text-center">{{ t('downloadPage.whyDesktopTitle')
          }}</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            <div v-for="item in pourquoiBureautique" :key="item.title"
              class="bg-WtB rounded-xl p-6 sm:p-7 shadow-lg text-center">
              <div class="flex items-center justify-center mb-4">
                <component :is="item.icon" class="h-6 w-6 sm:h-7 sm:w-7 text-primary mr-2 flex-shrink-0" />
                <h3 class="text-lg sm:text-xl font-semibold">{{ t(`downloadPage.${item.titleKey}`) }}</h3>
              </div>

              <p class="text-sm sm:text-base px-2">{{ t(`downloadPage.${item.descriptionKey}`) }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Guide d'installation -->
      <section class="py-12 sm:py-16" v-motion :initial="{ opacity: 0, y: 50 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 200 } }">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 text-center">{{
            t('downloadPage.installationGuideTitle') }}
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            <div v-for="step in guideInstallation" :key="step.step" class="relative text-center">
              <div
                class="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-primary text-WtB font-bold text-lg sm:text-xl mb-4 mx-auto">
                {{ step.step }}
              </div>
              <h3 class="text-lg sm:text-xl font-semibold mb-3">{{ t(`downloadPage.${step.titleKey}`) }}</h3>
              <p class="text-sm sm:text-base px-2">{{ t(`downloadPage.${step.descriptionKey}`) }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- FAQ Section -->
    <section class="py-12 sm:py-16" v-motion :initial="{ opacity: 0, x: -50 }"
      :visibleOnce="{ opacity: 1, x: 0, transition: { delay: 200 } }">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 text-center">{{ t('faqPage.heroTitle') }}</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <!-- Chargement des FAQs -->
          <Loader v-if="faqLoading" class="sm:col-span-2" />

          <!-- Etat d'erreur -->
          <div v-else-if="faqError" class="text-center p-8 sm:col-span-2">
            <div class="mb-4">
              <IconMoodCry class="w-12 h-12 mx-auto" />
              <p class="text-danger">{{ t('common.loadError', { object: t('faqPage.heroTitle') }) }}</p>
            </div>

            <button @click="fetchFaqs"
              class="bg-primary text-WtB px-4 py-2 rounded-md hover:bg-secondary transition-colors">
              {{ t('common.retryButton') }}
            </button>
          </div>

          <!-- Affichage des FAQs -->
          <div v-else-if="pageTopic" class="sm:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div v-for="(faq, index) in pageTopic.faqs" :key="faq.id">
              <Disclosure v-slot="{ open }">
                <DisclosureButton
                  class="flex w-full justify-between items-center rounded-lg bg-WtB px-3 py-3 sm:px-4 sm:py-4 text-left text-base sm:text-lg font-medium border hover:border-primary focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75"
                  :aria-expanded="open" :aria-controls="`faq-content-${index}`">
                  <span>{{ faq.title }}</span>
                  <IconChevronDown
                    :class="[open ? 'rotate-180 transform' : '', 'h-5 w-5 text-primary flex-shrink-0']" />
                </DisclosureButton>
                <DisclosurePanel :id="`faq-content-${index}`" class="px-5 pt-3 pb-2 text-sm sm:text-base" v-motion
                  :initial="{ opacity: 0, x: -50 }" :visible="{ opacity: 1, x: 0 }">
                  <useExpText :text="linkStyle(faq.content)" :maxLength="300" />
                </DisclosurePanel>
              </Disclosure>
            </div>
          </div>

          <!-- Message si aucun topic spécifique n'est trouvé -->
          <div v-else class="text-center sm:col-span-2">
            <p>{{ t('downloadPage.noSpecificFaq') }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Bouton fixe de téléchargement -->
  <div v-if="showFixedDownloadButton && selectedOS?.available" class="fixed bottom-4 right-4 z-50">
    <a :href="selectedOS.downloadLink" @click="handleDownloadClick(selectedOS.name)"
      class="flex items-center bg-primary text-WtB px-5 py-3.5 rounded-lg shadow-lg hover:bg-secondary transition-colors text-sm sm:text-base">
      <IconDownload class="inline-block w-4 h-4 sm:w-5 sm:h-5 mr-2" />
      {{ t('downloadPage.downloadFor', { osName: selectedOS.name }) }}
    </a>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { IconDownload, IconDeviceDesktop, IconWeight, IconLicense, IconCpu, IconDeviceDesktopAnalytics, IconAlertTriangle, IconRocket, IconWifi, IconDeviceLaptop, IconChevronDown, IconMoodCry } from '@tabler/icons-vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { useFaqs } from '~/composables/useFaqs'
import Loader from '~/components/Load/LFaqPage.vue'
import { useI18n } from 'vue-i18n'
import { PGSServices } from '~/services/PGSServices.js'

const { t, locale } = useI18n()
const localePath = useLocalePath()


// Interface OSOption
interface OSOption {
  name: string
  logo: string
  available: boolean
  version: string
  status: string
  downloadLink: string
  details: string[]
  systemRequirements: string[][]
  downloadCount: number
}

const downloadStatsLoading = ref(true)
const downloadStatsError = ref(false)

const selectedOS = ref<OSOption | null>(null)

// Icônes par défaut pour les détails
const defaultDetailsIcons = [IconDeviceDesktop, IconWeight, IconLicense]

// Configuration des exigences système
const systemRequirementsConfig = [
  { icon: IconCpu, title: 'Processeur', translationKey: 'processor' },
  { icon: IconDeviceDesktop, title: 'Système', translationKey: 'system' },
  { icon: IconDeviceDesktopAnalytics, title: 'Mémoire', translationKey: 'memory' }
]

// Initialisez downloadCount à 0. Ces données seront mises à jour par l'API au chargement.
const osOptions = ref<OSOption[]>([
  {
    name: 'Windows',
    logo: 'https://raw.githubusercontent.com/ProGestionSoft/Files/main/SuitOps_Landing/Logos/Windows.png',
    available: true,
    version: '0.1.0.0',
    status: t('downloadPage.windowsState'),
    downloadLink: '#',
    details: [
      'Windows 8/10/11 (32-bit / 64-bit)',
      '59 MB',
      t('downloadPage.commercialLicense')
    ],
    systemRequirements: [
      [t('downloadPage.intelCoreI3OrHigher'), t('downloadPage.amdRyzen3OrHigher')],
      ['Windows 8/10/11', '32-bit / 64-bit'],
      [`4 GB RAM ${t('downloadPage.minimum')}`, `8 GB RAM ${t('downloadPage.recommended')}`]
    ],
    downloadCount: 0
  },
  {
    name: 'macOS',
    logo: 'https://raw.githubusercontent.com/ProGestionSoft/Files/main/SuitOps_Landing/Logos/MacOs.png',
    available: false,
    version: '#',
    status: t('downloadPage.macOsState'),
    downloadLink: '#',
    details: [
      t('downloadPage.macOS12Plus'),
      t('downloadPage.estimatedSize', { size: '65 MB' }),
      t('downloadPage.commercialLicense')
    ],
    systemRequirements: [
      [t('downloadPage.appleM1M2'), t('downloadPage.intelCoreI5')],
      [t('downloadPage.macOSMonterey126Plus')],
      [`8 GB RAM ${t('downloadPage.minimum')}`]
    ],
    downloadCount: 0
  },
  {
    name: 'Linux',
    logo: 'https://raw.githubusercontent.com/ProGestionSoft/Files/main/SuitOps_Landing/Logos/Ubuntu.png',
    available: false,
    version: '#',
    status: t('downloadPage.linuxState'),
    downloadLink: '#',
    details: [
      t('downloadPage.debianUbuntu64bit'),
      t('downloadPage.estimatedSize', { size: '55 MB' }),
      t('downloadPage.openSourceLicense')
    ],
    systemRequirements: [
      [t('downloadPage.intelCoreI3'), t('downloadPage.amdFX6300OrEquivalent')],
      [t('downloadPage.debian11Plus'), t('downloadPage.ubuntu2004Plus'), t('downloadPage.fedora34Plus')],
      [`4 GB RAM ${t('downloadPage.minimum')}`, `8 GB RAM ${t('downloadPage.recommended')}`]
    ],
    downloadCount: 0
  }
])

// Exigences système en fonction de l'OS sélectionné
const currentSystemRequirements = computed(() =>
  selectedOS.value?.systemRequirements || []
)

// Gestion de la sélection/désélection d'un OS
const handleOSSelection = (os: OSOption) => {
  selectedOS.value = selectedOS.value?.name === os.name ? null : os
}

// Fonction pour formater le nombre de téléchargements
const formatDownloadCount = (count: number): string => {
  return new Intl.NumberFormat(locale.value).format(count);
};

// Initialisation de l'OS sélectionné par défaut et récupération des données
onMounted(async () => {
  await fetchOsDownloadCounts();
  const defaultOS = osOptions.value.find(os => os.name === 'Windows');
  if (defaultOS) {
    selectedOS.value = defaultOS;
  }
  await fetchFaqs();
  pageTopic.value = topics.value.find((topic) => topic.name === 'LA PLATEFORME') || null;
});


// Mise à jour des meta données : titre par défaut si aucun OS n'est sélectionné
watch(
  selectedOS,
  (newOS) => {
    if (newOS) {
      useHead({
        title: t('downloadPage.desktopFor', { osName: newOS.name }),
      })
    } else {
      useHead({
        title: t('downloadPage.heroTitle'),
      })
    }
  },
  { immediate: true }
)

// Gestion du bouton fixe de téléchargement
const downloadCard = ref<HTMLElement | null>(null)
const showFixedDownloadButton = ref(false)
let observer: IntersectionObserver | null = null

watch(
  selectedOS,
  async (newOS) => {
    await nextTick()
    if (observer && downloadCard.value) {
      observer.disconnect()
    }
    if (newOS?.available && downloadCard.value) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            showFixedDownloadButton.value = !entry.isIntersecting
          })
        },
        { threshold: 0 }
      )
      observer.observe(downloadCard.value)
    } else {
      showFixedDownloadButton.value = false
    }
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  if (observer && downloadCard.value) {
    observer.disconnect()
  }
})

// Fonction pour récupérer les statistiques de téléchargement des OS
const fetchOsDownloadCounts = async () => {
  try {
    const response = await PGSServices.getAllOsDownloads() as any;
    if (response && response.success && response.data) {
      response.data.forEach((apiOs: { os: string; count: number }) => {
        const matchingOs = osOptions.value.find(os => os.name === apiOs.os);
        if (matchingOs) {
          matchingOs.downloadCount = apiOs.count;
        }
      });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des stats de téléchargement :", error);
    // Gérer l'erreur, par exemple, afficher un message à l'utilisateur
  }
};


// Fonction pour gérer le clic sur le bouton de téléchargement
const handleDownloadClick = async (osName: string) => {
  try {
    await PGSServices.incrementOsDownload(osName);
    await fetchOsDownloadCounts();
  } catch (error) {
    console.error(`Erreur lors de l'incrémentation du téléchargement pour ${osName}:`, error);
  }
  // Optionnel : Si downloadLink pointe vers un '#' pour l'exemple,
  // vous pouvez rediriger l'utilisateur ici vers le vrai fichier
  // if (selectedOS.value?.downloadLink && selectedOS.value.downloadLink !== '#') {
  //   window.location.href = selectedOS.value.downloadLink;
  // }
};


const pourquoiBureautique = [
  {
    icon: IconRocket,
    title: 'Performance optimale',
    titleKey: 'optimalPerformance',
    description: "Profitez d'une expérience plus rapide et plus fluide grâce à l'exécution locale.",
    descriptionKey: 'optimalPerformanceDesc'
  },
  {
    icon: IconWifi,
    title: 'Mode hors ligne',
    titleKey: 'offlineMode',
    description: 'Continuez à travailler même sans connexion Internet.',
    descriptionKey: 'offlineModeDesc'
  },
  {
    icon: IconDeviceLaptop,
    title: 'Intégration système',
    titleKey: 'systemIntegration',
    description: "Accédez rapidement à l'application depuis votre bureau Windows.",
    descriptionKey: 'systemIntegrationDesc'
  }
]

const guideInstallation = [
  {
    step: 1,
    title: 'Téléchargement',
    titleKey: 'step1Title',
    description: "Cliquez sur le bouton de téléchargement et enregistrez le fichier sur votre ordinateur.",
    descriptionKey: 'step1Desc'
  },
  {
    step: 2,
    title: 'Installation',
    titleKey: 'step2Title',
    description: "Ouvrez le fichier téléchargé et suivez les instructions à l'écran.",
    descriptionKey: 'step2Desc'
  },
  {
    step: 3,
    title: 'Lancer SuitOps',
    titleKey: 'step3Title',
    description: "Une fois l'installation terminée, lancez SuitOps depuis votre bureau.",
    descriptionKey: 'step3Desc'
  }
]

const { topics, error: faqError, loading: faqLoading, fetchFaqs } = useFaqs()
const pageTopic = ref<{ topic: any; faqs: any[] } | null>(null)

const linkStyle = (content: string) =>
  content
    .replace(/style="[^"]*"/g, '')
    .replace(/<a /g, '<a class="text-primary hover:underline" ')
</script>