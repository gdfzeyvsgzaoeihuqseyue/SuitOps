<template>
  <div class="relative inline-block">
    <!-- Bouton principal -->
    <button @click.stop="toggleDropdown"
      class="flex items-center justify-center w-full rounded-md border borde shadow-sm px-4 py-2 bg-WtB text-sm font-medium hover:bg-WtBAct focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
      <span class="flex items-center">
        <IconSettings class="w-5 h-5 mr-2" />
        {{ $t('prefSettings.preferences') }}
      </span>
    </button>

    <!-- Menu déroulant -->
    <div v-show="isOpen" ref="dropdown"
      class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-ash ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
      <div class="py-2 space-y-2">
        <!-- Composant Langue -->
        <div class="px-4">
          <label class="block text-xs font-medium mb-1">
            {{ $t('prefSettings.lang') }}
          </label>
          <prefLang @click.stop />
        </div>

        <!-- Composant Thème -->
        <div class="px-4">
          <label class="block text-xs font-medium mb-1">
            {{ $t('prefSettings.theme') }}
          </label>
          <prefTheme @click.stop />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { IconSettings } from '@tabler/icons-vue'
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)
const dropdown = ref(null)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const handleClickOutside = (event) => {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>