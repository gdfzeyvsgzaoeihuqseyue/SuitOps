<template>
  <footer
    class="fixed bottom-0 left-0 w-full z-50 bg-WtB backdrop-blur border-t text-xs sm:text-sm px-4 py-2 sm:px-6 sm:py-3 flex items-center justify-between flex-wrap gap-2 shadow-t">
    <div class="flex items-center gap-2">
      <img :src="sharedFiles.paths.logo.mc" alt="Logo SuitOps" class="h-6 w-auto">
      <span>
        <span class="font-semibold text-primary">SuitOps</span> —
        <span>par <span class="font-medium">PGS</span></span>
      </span>
    </div>
    <div class="flex-grow h-px bg-BtWAct" />

    <a :href="fullPageUrl" target="_blank" rel="noopener noreferrer"
      class="text-primary hover:underline text-xs sm:text-sm flex items-center gap-1">
      {{ $t('blogID.learnMore') }}
      <IconArrowRight class="w-3 h-3 sm:w-4 sm:h-4" />
    </a>
  </footer>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { IconArrowRight } from '@tabler/icons-vue';
import { useI18n } from 'vue-i18n'; 
import { useLocalePath } from '#imports';
import { useSharedFiles } from '~/stores/sharedFiles';

const sharedFiles = useSharedFiles();

const route = useRoute()
const props = defineProps({
  originalPath: {
    type: String,
    required: true
  }
});

const { t } = useI18n(); 
const localePath = useLocalePath(); 

const fullPageUrl = computed(() => {
  return `${window.location.origin}${localePath(props.originalPath)}`;
});
</script>

<style scoped>
.shadow-t {
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}
</style>
