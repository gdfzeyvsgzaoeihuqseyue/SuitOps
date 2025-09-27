<template>
  <div>
    <!-- Bouton flottant -->
    <button @click="showModal = true"
      class="fixed bottom-6 right-6 bg-primary text-WtB p-4 border border-WtB rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
      aria-label="Ouvrir le menu d'aide et de feedback">
      <IconMessageCircle class="h-4 w-4" />
    </button>

    <!-- Modale -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-ash rounded-lg max-w-md w-full p-6 relative">
        <button @click="showModal = false" class="absolute top-3 right-3 text-txtClr p-1 hover:bg-WtBAct rounded-full">
          <IconX class="h-6 w-6 transform transition duration-300 ease-in-out hover:rotate-90 hover:text-danger" />
        </button>
        <h2 class="text-2xl font-bold mb-6 text-center">{{ t('feedback.title') }}</h2>
        <div class="space-y-4">
          <a :href="testimonyUrl" target="_blank"
            @click="showModal = false"
            class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-ashAct transition-colors">
            <IconStar class="h-6 w-6 text-primary mr-3" />
            <span>{{ t('feedback.testimony') }}</span>
          </a>
          <NuxtLink :to="localePath('/legal')" @click="showModal = false"
            class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-ashAct transition-colors">
            <IconFileText class="h-6 w-6 text-primary mr-3" />
            <span>{{ t('feedback.legal') }}</span>
          </NuxtLink>
          <NuxtLink :to="localePath('/terms')" @click="showModal = false"
            class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-ashAct transition-colors">
            <IconFileDescription class="h-6 w-6 text-primary mr-3" />
            <span>{{ t('feedback.terms') }}</span>
          </NuxtLink>
          <NuxtLink :to="localePath('/forum')" @click="showModal = false"
            class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-ashAct transition-colors">
            <IconHelpCircle class="h-6 w-6 text-primary mr-3" />
            <span>{{ t('feedback.forum') }}</span>
          </NuxtLink>
          <a :href="externalLinks.doc" target="_blank" @click="showModal = false"
            class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-ashAct transition-colors">
            <IconBook class="h-6 w-6 text-primary mr-3" />
            <span>{{ t('feedback.docs') }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { IconMessageCircle, IconX, IconStar, IconFileText, IconFileDescription, IconHelpCircle, IconBook } from '@tabler/icons-vue';
import { internalLinks, externalLinks } from '@/utils/links.js';
import { useI18n } from 'vue-i18n';
import { useLocalePath } from '#imports';

const { t } = useI18n();
const localePath = useLocalePath();
const showModal = ref(false);

const testimonyUrl = computed(() => {
  const pgsUrl = `${externalLinks.pgs}/submit-testimony`;
  const params = new URLSearchParams({
    platform: 'suitops',
  });
  return `${pgsUrl}?${params.toString()}`;
});
</script>
