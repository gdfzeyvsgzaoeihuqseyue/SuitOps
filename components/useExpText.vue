<template>
  <div>
    <!-- Texte avec gestion de la troncature -->
    <div v-if="expanded" v-html="props.text"></div>
    <div v-else v-html="truncatedText"></div>
    
    <!-- Affichage du bouton "Afficher plus" ou "Afficher moins" -->
    <button
      v-if="props.text.length > (props.maxLength || 300)"
      @click="toggleExpanded"
      class="text-primary hover:text-secondary focus:outline-none"
    >
      {{ expanded ? t('common.showLess') : t('common.showMore') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Props {
  text: string
  maxLength?: number
}

const props = defineProps<Props>()
const expanded = ref(false)

const toggleExpanded = () => {
  expanded.value = !expanded.value
}

const truncatedText = computed(() => {
  // Tronquer le texte à maxLength, en ajoutant des '...' 
  if (props.text.length > (props.maxLength || 15)) {
    return props.text.slice(0, props.maxLength) + '...'
  }
  return props.text
})
</script>