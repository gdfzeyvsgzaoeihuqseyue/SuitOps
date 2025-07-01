<template>
  <div class="relative inline-block w-full">
    <select v-model="currentLocale"
      class="appearance-none bg-WtB border rounded-md pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      @change="switchLanguage">
      <option value="system"> {{ $t('prefSettings.system') }} </option>
      <option value="fr"> {{ $t('prefSettings.langFr') }} </option>
      <option value="en">{{ $t('prefSettings.langEn') }}</option>
    </select>
    <span
      class="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">        
      <IconWorld v-if="currentLocale === 'system'" class="w-5 h-5" />
      <IconLanguage v-else-if="currentLocale === 'fr'" class="w-5 h-5" />
      <IconLanguage v-else class="w-5 h-5" />
    </span>
  </div>
</template>

<script setup>
import { IconWorld, IconLanguage } from '@tabler/icons-vue'

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()

const currentLocale = ref(locale.value)

// Détection de la langue système
const systemLanguage = ref(null)
if (process.client) {
  systemLanguage.value = navigator.language.startsWith('fr') ? 'fr' : 'en'
}

const switchLanguage = () => {
  const langToUse = currentLocale.value === 'system'
    ? systemLanguage.value
    : currentLocale.value

  const path = switchLocalePath(langToUse)
  router.push(path)
}

// Mise à jour lorsque la locale change
watch(() => locale.value, (newVal) => {
  currentLocale.value = newVal
})
</script>