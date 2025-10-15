<template>
  <Listbox v-model="currentLocale" @update:modelValue="switchLanguage">
    <div class="relative inline-block w-auto max-w-[180px]">
      <ListboxButton
        class="bg-WtB border rounded-md pl-3 pr-10 py-3 w-full text-sm text-left focus:ring-2 focus:ring-primary flex items-center gap-2">

        <template v-if="typeof locales.find(l => l.id === currentLocale)?.icon === 'string'">
          <span class="w-5 h-5 flex items-center justify-center">{{locales.find(l => l.id === currentLocale)?.icon
          }}</span>
        </template>
        <component v-else :is="locales.find(l => l.id === currentLocale)?.icon" class="w-5 h-5" />

        <span>{{locales.find(l => l.id === currentLocale)?.name}}</span>
        <IconChevronDown class="absolute right-3 w-4 h-4" />
      </ListboxButton>

      <ListboxOptions class="absolute mt-1 w-full bg-WtB border rounded-md shadow-lg max-w-[180px] z-10">
        <ListboxOption v-for="lang in locales" :key="lang.id" :value="lang.id"
          class="cursor-pointer hover:bg-primary/10 px-3 py-2 flex items-center gap-2">

          <template v-if="typeof lang.icon === 'string'">
            <span class="w-5 h-5 flex items-center justify-center">{{ lang.icon }}</span>
          </template>
          <component v-else :is="lang.icon" class="w-5 h-5" />

          <span>{{ lang.name }}</span>
        </ListboxOption>
      </ListboxOptions>
    </div>
  </Listbox>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { IconWorld, IconChevronDown } from '@tabler/icons-vue'

const { locale, setLocale } = useI18n()
const router = useRouter()
const route = useRoute()

const currentLocale = ref(locale.value)

// Langue système
const systemLanguage = ref('fr')
if (process.client) {
  systemLanguage.value = navigator.language.startsWith('fr') ? 'fr' : 'en'
}

// Liste des langues disponibles
const locales = [
  { id: 'system', name: 'Système', icon: IconWorld },
  { id: 'fr', name: 'Français', icon: '🇫🇷' },
  { id: 'en', name: 'English', icon: '🇬🇧' },
]

// Fonction de changement de langue
const switchLanguage = async () => {
  const langToUse = currentLocale.value === 'system'
    ? systemLanguage.value
    : currentLocale.value

  try {
    await setLocale(langToUse)
    let newPath = '/'

    // Si pas page d'accueil, construire le chemin
    if (route.path && route.path !== '/') {
      const pathWithoutLocale = route.path.replace(/^\/(fr|en)/, '') || '/'
      newPath = langToUse === 'fr' ? pathWithoutLocale : `/en${pathWithoutLocale}`
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

// Mise à jour quand la locale change
watch(() => locale.value, (newVal) => {
  currentLocale.value = newVal
})
</script>
