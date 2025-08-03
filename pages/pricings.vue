<template>
  <main>
    <!-- Hero section -->
    <header class="relative py-24 bg-cover bg-center"
      style="background-image: url('https://raw.githubusercontent.com/ProGestionSoft/Files/main/SuitOps_Landing/Hero/pricings.png')">
      <div class="absolute inset-0 bg-gradient-to-r from-ash to-ashAct opacity-80"></div>
      <div class="absolute inset-0 backdrop-blur-sm"></div>

      <div class="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center text-BtW">
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6" v-motion
          :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }">
          {{ $t('pricingsPage.heroTitle') }}
        </h1>
        <p class="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto px-2">
          {{ $t('pricingsPage.heroSubtitle') }}
        </p>
      </div>
    </header>

    <section class="container mx-auto p-8 sm:p-16 max-w-7xl">
      <!-- État de chargement -->
      <Loader v-if="loading" />

      <!-- État d'erreur -->
      <div v-else-if="error" class="text-center p-4 sm:p-6 md:p-8">
        <div class="mb-3 sm:mb-4">
          <IconMoodCry class="w-10 h-10 sm:w-12 sm:h-12 mx-auto" />
          <p class="text-danger text-sm sm:text-base">{{ error }}</p>
        </div>

        <button @click="fetchPricing"
          class="bg-primary text-WtB px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-secondary transition-colors text-sm sm:text-base">
          {{ $t('common.retryButton') }}
        </button>
      </div>

      <!-- Contenu principal -->
      <div v-else>
        <!-- En-tête avec sélecteurs -->
        <div class="text-center mb-8 sm:mb-10 md:mb-12">
          <div class="max-w-3xl mx-auto mb-4 sm:mb-6 md:mb-8" v-motion :initial="{ opacity: 0, y: 50 }"
            :visibleOnce="{ opacity: 1, y: 0 }">
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold">{{ $t('pricingsPage.featuresTitle') }}</h2>
          </div>

          <!-- Sélecteur de devise avec indicateur de mise à jour -->
          <div class="flex flex-col items-center gap-4 mb-6">
            <div class="flex items-center justify-center gap-4">
              <span class="text-sm sm:text-base font-medium">{{ $t('pricingsPage.currency') }}</span>
              <div class="flex bg-WtBAct rounded-lg p-2">
                <button v-for="currency in availableCurrencies" :key="currency.code"
                  @click="selectedCurrency = currency.code"
                  class="px-3 py-1 rounded-md text-sm font-medium transition-colors relative" :class="selectedCurrency === currency.code
                    ? 'bg-primary text-WtB'
                    : 'hover:text-primary'" :title="currency.name">
                  {{ currency.symbol }} {{ currency.code }}
                </button>
              </div>
            </div>

            <!-- Indicateur de statut des taux de change -->
            <div class="flex items-center gap-2 text-xs">
              <div class="flex items-center gap-1">
                <div class="w-2 h-2 rounded-full" :class="exchangeRatesLoading ? 'bg-yellow-500' : 'bg-green-500'">
                </div>
                <span v-if="exchangeRatesLoading">{{ $t('pricingsPage.updatingRates') }}</span>
                <span v-else-if="lastRatesUpdate">
                  {{ $t('pricingsPage.ratesUpdated') }} {{ formatLastUpdate(lastRatesUpdate) }}
                </span>
                <span v-else>{{ $t('pricingsPage.defaultRates') }}</span>
              </div>
              <button @click="refreshExchangeRates" class="text-primary hover:text-secondary underline"
                :disabled="exchangeRatesLoading">
                {{ $t('common.retryButton') }}
              </button>
            </div>
          </div>

          <!-- Sélecteur mensuel/annuel -->
          <div class="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 text-sm sm:text-base">
            <span>{{ $t('pricingsPage.monthly') }}</span>
            <button @click="showAnnual = !showAnnual"
              class="relative inline-flex h-5 w-10 sm:h-6 sm:w-11 items-center rounded-full transition-colors"
              :class="showAnnual ? 'bg-primary' : 'bg-textClr'">
              <span class="sr-only">{{ $t('pricingsPage.switch') }}</span>
              <span class="inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-WtB transition-transform"
                :class="showAnnual ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'"></span>
            </button>
            <span class="flex items-center">
              {{ $t('pricingsPage.annual') }}
              <span
                class="bg-green-50 text-green-600 dark:bg-green-100 drak:text-green-900 text-xs p-1 sm:p-2 rounded-3xl ml-2 sm:ml-4">
                {{ $t('pricingsPage.annualSavings') }}
              </span>
            </span>
          </div>
        </div>

        <!-- Cartes de tarification -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div v-for="plan in groupedPlans" :key="plan.id"
            class="relative border-2 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all"
            :class="isPopular(plan) ? 'border-secondary bg-bgClr' : 'border-gray-200 bg-WtB'">
            <!-- Badge Populaire -->
            <div v-if="isPopular(plan)"
              class="absolute -top-3 left-1/2 -translate-x-1/2 badge-popular text-xs sm:text-sm">
              {{ $t('pricingsPage.popularBadge') }}
            </div>

            <!-- Contenu de la carte -->
            <div class="mb-4 sm:mb-6 text-center">
              <h2 class="text-xl sm:text-2xl font-bold" :class="plan.name === 'GRATUIT'
                ? 'textClr'
                : isPopular(plan) ? 'text-secondary' : 'text-primary'">
                {{ plan.name }}
              </h2>

              <p class="text-sm sm:text-base">{{ plan.description }}</p>
            </div>

            <!-- Prix -->
            <div class="mb-6 sm:mb-8">
              <div class="flex items-baseline gap-1 sm:gap-2 justify-center text-xl sm:text-2xl font-bold">
                <span>
                  {{ formatPrice(showAnnual ? plan.priceAnnual : plan.priceMonthly, selectedCurrency) }}
                </span>
                <span class="text-sm font-normal">
                  {{ showAnnual ? $t('pricingsPage.pricePerYear') : $t('pricingsPage.pricePerMonth') }}
                </span>
              </div>
              <!-- Affichage du prix original et Information de conversion si devise différente -->
              <div v-if="selectedCurrency !== 'XOF'" class="text-xs text-center mt-1">
                {{ formatPrice(showAnnual ? plan.priceAnnual : plan.priceMonthly, 'XOF') }}

                <p>
                  1 XOF ≈ {{ formatConversion(1, 'XOF', selectedCurrency) }}
                  ({{ formatConversion(1, selectedCurrency, 'XOF') }})
                </p>
              </div>
            </div>

            <button class="w-full py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base" :class="plan.name === 'GRATUIT'
              ? 'bg-BtW text-WtB hover:bg-ash hover:text-BtW'
              : isPopular(plan)
                ? 'bg-secondary text-WtB hover:bg-primary'
                : 'bg-primary text-WtB hover:bg-secondary'">
              {{ plan.name === 'GRATUIT' ? $t('pricingsPage.freePlanButton') : $t('pricingsPage.choosePlanButton', {
                planName: plan.name
              }) }}
            </button>

            <ul class="mt-6 sm:mt-8 space-y-2 sm:space-y-3">
              <li v-for="feature in plan.features" :key="feature.feature.id" class="flex items-start">
                <template v-if="feature.isBool">
                  <span class="text-sm sm:text-base flex items-center gap-2">
                    <component :is="feature.value ? IconCheck : IconX" class="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                      :class="feature.value ? 'text-green-500' : 'text-danger'" />
                    <span>{{ feature.feature.name }}</span>
                  </span>
                </template>
                <template v-else>
                  <IconCheck class="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-green-500 mr-2" />
                  <span class="text-sm sm:text-base">
                    {{ feature.description }}
                    <span v-if="feature.unit">
                      ({{ feature.maxi }}{{ unitSuffix(feature.unit) }})
                    </span>
                  </span>
                </template>
              </li>
            </ul>
          </div>
        </div>

        <!-- Tableau -->
        <div>
          <div class="max-w-3xl mx-auto text-center mb-4 sm:mb-6 md:mb-8">
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold">{{ $t('pricingsPage.comparisonTitle') }}</h2>
          </div>

          <div class="relative overflow-x-auto pb-2 sm:pb-4">
            <div class="inline-block min-w-full align-middle">
              <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <table class="min-w-full divide-y divide-gray-300">
                  <thead class="bg-ash">
                    <tr>
                      <th
                        class="py-2 sm:py-3 pl-3 pr-2 sm:pl-4 sm:pr-3 text-left text-sm sm:text-base font-semibold sticky left-0 bg-ashAct z-10">
                        {{ $t('pricingsPage.tableFeaturesColumn') }}
                      </th>
                      <th v-for="plan in groupedPlans" :key="plan.id"
                        class="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-sm sm:text-base font-semibold min-w-[120px] sm:min-w-[150px] md:min-w-[200px] relative">
                        <div class="flex flex-col items-center">
                          <span>{{ plan.name }}</span>
                          <span v-if="isPopular(plan)"
                            class="absolute -top-1 transform translate-y-0 badge-popular text-xs">
                            {{ $t('pricingsPage.popularBadge') }}
                          </span>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody class="divide-y divide-gray-200 bg-WtB">
                    <tr v-for="feature in uniqueFeatures" :key="feature.id">
                      <td
                        class="whitespace-nowrap py-2 sm:py-3 pl-3 pr-2 sm:pl-4 sm:pr-3 text-sm sm:text-base sticky left-0 bg-WtB z-10">
                        {{ feature.name }}
                      </td>
                      <td v-for="plan in groupedPlans" :key="plan.id"
                        class="whitespace-nowrap px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-sm sm:text-base text-center">
                        <template v-for="planFeature in plan.features" :key="planFeature.feature.id">
                          <span v-if="planFeature.feature.id === feature.id">
                            <span v-if="planFeature.isBool">
                              <component :is="planFeature.value ? IconSquareRoundedCheck : IconSquareRoundedX"
                                class="w-4 h-4 sm:w-5 sm:h-5 inline-block"
                                :class="planFeature.value ? 'text-green-500' : 'text-danger'" />
                            </span>
                            <span v-else>
                              {{ planFeature.description }}
                              <span v-if="planFeature.unit">
                                ({{ planFeature.maxi }}{{ unitSuffix(planFeature.unit) }})
                              </span>
                            </span>
                          </span>
                        </template>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { IconMoodCry, IconCheck, IconX, IconSquareRoundedCheck, IconSquareRoundedX } from '@tabler/icons-vue'
import { SuitOpsServices } from '~/stores/SuitOpsServices.js'
import Loader from '~/components/Load/LPricings.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const isPopular = (plan) => plan.name === 'START-UP';
const showAnnual = ref(false)
const loading = ref(true)
const error = ref(null)
const pricingData = ref([])
const selectedCurrency = ref('XOF')
const exchangeRatesLoading = ref(false)
const lastRatesUpdate = ref(null)


// Fonction pour formater les informations de conversion
const formatConversion = (amount, fromCurrency, toCurrency) => {
  const fromInfo = availableCurrencies.value.find(c => c.code === fromCurrency)
  const toInfo = availableCurrencies.value.find(c => c.code === toCurrency)

  if (!fromInfo || !toInfo || fromInfo.rate === 0 || toInfo.rate === 0) {
    return 'N/A'
  }

  const convertedValue = (amount * fromInfo.rate) / toInfo.rate
  const locale = (toCurrency === 'USD') ? 'en-US' : 'fr-FR'
  const maximumFractionDigits = (toCurrency === 'EUR' || toCurrency === 'USD') ? 5 : 0

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: toCurrency,
    maximumFractionDigits: maximumFractionDigits,
  }).format(convertedValue)
}

// Configuration des devises avec taux par défaut
const availableCurrencies = ref([
  { code: 'XOF', symbol: 'F', rate: 1, name: t('pricingsPage.XOF') },
  { code: 'EUR', symbol: '€', rate: 656, name: t('pricingsPage.EUR') },
  { code: 'USD', symbol: '$', rate: 605, name: t('pricingsPage.USD') }
])

// Détection automatique de la devise basée sur la localisation
const detectUserCurrency = async () => {
  try {
    const res = await fetch('https://ipapi.co/json/')
    const data = await res.json()
    const detectedCurrency = data.currency || 'XOF'

    if (!localStorage.getItem('preferredCurrency') && isSupportedCurrency(detectedCurrency)) {
      selectedCurrency.value = detectedCurrency
      console.log(`Devise détectée via IP: ${detectedCurrency}`)
    }
  } catch (err) {
    console.warn('Erreur de détection de devise via IP:', err)
  }
}

const isSupportedCurrency = (code) =>
  availableCurrencies.value.some((c) => c.code === code)


// Chargement de la préférence utilisateur
const loadUserPreference = () => {
  try {
    const savedCurrency = localStorage.getItem('preferredCurrency')
    if (savedCurrency && availableCurrencies.value.find(c => c.code === savedCurrency)) {
      selectedCurrency.value = savedCurrency
      console.log(`Préférence utilisateur chargée: ${savedCurrency}`)
    }
  } catch (err) {
    console.warn('Erreur lors du chargement de la préférence:', err)
  }
}

// Sauvegarde de la préférence utilisateur
const saveUserPreference = (currency) => {
  try {
    localStorage.setItem('preferredCurrency', currency)
    localStorage.setItem('currencySelectedAt', new Date().toISOString())
    console.log(`Préférence sauvegardée: ${currency}`)
  } catch (err) {
    console.warn('Erreur lors de la sauvegarde de la préférence:', err)
  }
}

// Fonction pour obtenir les taux de change en temps réel
const fetchExchangeRates = async () => {
  exchangeRatesLoading.value = true

  try {
    // Vérifier si les taux sont encore valides (moins de 1 heure)
    const lastUpdate = localStorage.getItem('exchangeRatesLastUpdate')
    const cachedRates = localStorage.getItem('exchangeRates')

    if (lastUpdate && cachedRates) {
      const hoursSinceUpdate = (Date.now() - new Date(lastUpdate)) / (1000 * 60 * 60)
      if (hoursSinceUpdate < 1) {
        // Utiliser les taux en cache
        const rates = JSON.parse(cachedRates)
        updateCurrencyRates(rates)
        lastRatesUpdate.value = new Date(lastUpdate)
        console.log('Taux de change chargés depuis le cache')
        exchangeRatesLoading.value = false
        return
      }
    }

    // Récupération des taux en temps réel depuis l'API
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/XOF')

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`)
    }

    const data = await response.json()

    // Mise à jour des taux
    const rates = {
      XOF: 1,
      EUR: data.rates.EUR ? (1 / data.rates.EUR) : 656,
      USD: data.rates.USD ? (1 / data.rates.USD) : 605
    }

    updateCurrencyRates(rates)

    // Sauvegarde en cache
    localStorage.setItem('exchangeRates', JSON.stringify(rates))
    localStorage.setItem('exchangeRatesLastUpdate', new Date().toISOString())
    lastRatesUpdate.value = new Date()

    console.log('Taux de change mis à jour depuis l\'API:', rates)

  } catch (err) {
    console.warn('Impossible de récupérer les taux de change en temps réel:', err)

    // Essayer de charger depuis le cache même si expiré
    const cachedRates = localStorage.getItem('exchangeRates')
    if (cachedRates) {
      const rates = JSON.parse(cachedRates)
      updateCurrencyRates(rates)
      console.log('Utilisation des taux de change en cache (expirés)')
    } else {
      console.log('Utilisation des taux de change par défaut')
    }
  } finally {
    exchangeRatesLoading.value = false
  }
}

// Mise à jour des taux dans la configuration des devises
const updateCurrencyRates = (rates) => {
  availableCurrencies.value.forEach(currency => {
    if (rates[currency.code]) {
      currency.rate = rates[currency.code]
    }
  })
}

// Récuperation des tarifs
const fetchPricing = async () => {
  error.value = null
  loading.value = true
  let attempts = 0
  const maxAttempts = 2

  while (attempts < maxAttempts) {
    try {
      const response = await SuitOpsServices.getAllPricing();
      pricingData.value = response.data?.data || response.data || [];
      loading.value = false
      return
    } catch (err) {
      attempts++
      console.error(`Erreur lors de la récupération des tarifs, tentative ${attempts}:`, err)
      if (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 500))
      } else {
        error.value = t('common.loadError', { object: t('pricingsPage.heroTitle') });
        loading.value = false
      }
    }
  }
}

// Sauvegarder la préférence
watch(selectedCurrency, (newCurrency) => {
  saveUserPreference(newCurrency)
}, { immediate: false })

// Initialisation
onMounted(async () => {
  loadUserPreference()
  if (!localStorage.getItem('preferredCurrency')) {
    detectUserCurrency()
  }
  await fetchExchangeRates()
  await fetchPricing()
})

// Regroupement des plans en évitant les répétitions de fonctionnalités
const groupedPlans = computed(() => {
  if (!pricingData.value) return []
  const groups = []
  pricingData.value.forEach(item => {
    if (!item.plan) return
    const existingPlan = groups.find(p => p.id === item.plan.id)
    const feature = { ...item, feature: item.feature }
    if (existingPlan) {
      // Ajouter uniquement si cette feature n'existe pas déjà dans ce plan
      if (!existingPlan.features.some(f => f.feature.id === feature.feature.id)) {
        existingPlan.features.push(feature)
      }
    } else {
      groups.push({
        ...item.plan,
        features: [feature]
      })
    }
  })
  return groups.sort((a, b) => a.priceMonthly - b.priceMonthly)
})

// Liste des fonctionnalités uniques pour le tableau comparatif
const uniqueFeatures = computed(() => {
  if (!pricingData.value) return []
  const featuresMap = new Map()
  pricingData.value.forEach(item => {
    if (item.feature && !featuresMap.has(item.feature.id)) {
      featuresMap.set(item.feature.id, { id: item.feature.id, name: item.feature.name })
    }
  })
  return Array.from(featuresMap.values())
})

// Fonction de conversion de devise
const convertPrice = (priceInXOF, targetCurrency) => {
  if (targetCurrency === 'XOF') return priceInXOF

  const currency = availableCurrencies.value.find(c => c.code === targetCurrency)
  if (!currency || !currency.rate) {
    console.warn(`Devise non trouvée ou taux invalide: ${targetCurrency}`)
    return priceInXOF
  }

  const convertedPrice = priceInXOF / currency.rate
  return Math.round(convertedPrice * 100) / 100
}

// Formatage des prix avec conversion et gestion d'erreurs
const formatPrice = (price, currency = 'XOF') => {
  const convertedPrice = convertPrice(price, currency);
  const currencyInfo = availableCurrencies.value.find(c => c.code === currency);

  const locale = (currency === 'USD') ? 'en-US' : 'fr-FR';
  const maximumFractionDigits = (currency === 'EUR' || currency === 'USD') ? 2 : 0;

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: maximumFractionDigits,
    }).format(convertedPrice);
  } catch (err) {
    console.warn(`Erreur de formatage pour ${currency}:`, err);
    return `${currencyInfo?.symbol || currency} ${convertedPrice.toLocaleString(locale)}`;
  }
};

// Rafraîchir manuellement les taux de change en supprimant le cache
const refreshExchangeRates = async () => {
  localStorage.removeItem('exchangeRatesLastUpdate')
  localStorage.removeItem('exchangeRates')
  await fetchExchangeRates()
}

// Formatage du temps de dernière mise à jour
const formatLastUpdate = (date) => {
  const now = new Date()
  const diffMinutes = Math.floor((now - date) / (1000 * 60))

  if (diffMinutes < 1) return t('pricingsPage.justNow')
  if (diffMinutes < 60) return t('pricingsPage.minutesAgo', { minutes: diffMinutes })

  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours < 24) return t('pricingsPage.hoursAgo', { hours: diffHours })

  return date.toLocaleDateString()
}

// Formatage des unités
const unitSuffix = (unit) => {
  const suffixes = {
    monthly: t('pricingsPage.unitMonthly'),
    daily: t('pricingsPage.unitDaily'),
    giga: t('pricingsPage.unitGiga')
  }
  return suffixes[unit] || ''
}

// SEO
useHead({
  title: t('pricingsPage.heroTitle'),
})
</script>

<style scoped>
.badge-popular {
  @apply bg-secondary text-WtB px-2 py-0.5 sm:px-2 sm:py-1 rounded-full shadow-md;
}

.container {
  max-width: 1500px;
}

tbody tr:nth-child(even) {
  background-color: #f3f4f6;
}

.dark tbody tr:nth-child(even) {
  background-color: #475569
}

.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
