<template>
  <div class="space-x-4 flex justify-center sm:justify-start">
    <Loader v-if="loading" />

    <p v-else-if="error" class="text-red-600 text-sm">
      {{ t('common.loadError', { object: t('common.socialLinks') }) }}
    </p>
    <ul v-else class="flex flex-wrap gap-4 justify-center md:justify-start">
      <li v-for="link in displayedLinks" :key="link.name">
        <a :href="link.href" target="_blank" rel="noopener noreferrer" :title="link.title"
          class="text-sm leading-6 text-gray-400 hover:text-primary transition-colors transition-colors duration-200"
          aria-label="Accéder à notre profil social">
          <component :is="link.icon" class="w-6 h-6" aria-hidden="true" />
          <span class="sr-only">{{ link.name }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useSocialLinksDisplay } from '@/composables/useSocialLinks';
import Loader from '~/components/Load/LSocialLink.vue';
import { ref, onMounted } from 'vue'; 

const { t } = useI18n();

const loading = ref(true);
const error = ref(null);
const displayedLinks = ref([]);

// Réseaux sociaux
onMounted(async () => {
  try {
    const { displayedLinks: links, error: fetchError } = await useSocialLinksDisplay({
      filterMedia: ['linkedin', 'facebook', 'x', 'tiktok'],
    });

    displayedLinks.value = links.value;
    error.value = fetchError.value;
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
});
</script>
