<template>
  <div class="relative inline-block w-full">
    <select v-model="currentLocale"
      class="appearance-none bg-WtB border rounded-md pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      @change="switchLanguage">
      <option value="system"> {{ $t('prefSettings.system') }} </option>
      <option value="fr"> {{ $t('prefSettings.langFr') }} </option>
      <option value="en">{{ $t('prefSettings.langEn') }}</option>
    </select>
    <span class="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
      <IconWorld v-if="currentLocale === 'system'" class="w-5 h-5" />
      <IconLanguage v-else-if="currentLocale === 'fr'" class="w-5 h-5" />
      <IconLanguage v-else class="w-5 h-5" />
    </span>
  </div>
</template>

<script setup>
import { IconWorld, IconLanguage } from '@tabler/icons-vue'

const { locale, setLocale } = useI18n()
const router = useRouter()
const route = useRoute()

const currentLocale = ref(locale.value)

// Détection de la langue système
const systemLanguage = ref('fr')
if (process.client) {
  systemLanguage.value = navigator.language.startsWith('fr') ? 'fr' : 'en'
}

const switchLanguage = async () => {
  const langToUse = currentLocale.value === 'system'
    ? systemLanguage.value
    : currentLocale.value

  try {
    await setLocale(langToUse) // Changer la locale
    let newPath = '/' // Construire la nouvelle URL

    // Si nous pas page d'accueil, construire le chemin
    if (route.path && route.path !== '/') {
      const pathWithoutLocale = route.path.replace(/^\/(fr|en)/, '') || '/'

      // Si la nouvelle langue est le français, pas de préfixe
      if (langToUse === 'fr') {
        newPath = pathWithoutLocale
      } else {
        newPath = `/en${pathWithoutLocale}`
      }
    } else {
      newPath = langToUse === 'fr' ? '/' : '/en'
    }

    // Redirection
    await router.push(newPath)
  } catch (error) {
    console.warn('Erreur lors du changement de langue:', error)
    const fallbackPath = langToUse === 'fr' ? '/' : '/en'
    await router.push(fallbackPath)
  }
}

// Mise à jour lorsque la locale change
watch(() => locale.value, (newVal) => {
  currentLocale.value = newVal
})
</script>