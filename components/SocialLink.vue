<template>
  <Loader v-if="loading" />

  <div v-if="error" class="text-center">
    <p class="text-danger">{{ $t('common.loadError', { object: $t('common.socialLinks') }) }}</p>

    <button @click="fetchSocialLinks"
      class="text-xs bg-primary text-WtB px-4 py-2 rounded-md hover:bg-secondary transition-colors">
      {{ $t('common.retryButton') }}
    </button>
  </div>

  <div v-for="(link, index) in socialLinks" :key="index">
    <a :href="link.link" target="_blank" :title="link.media" :aria-label="link.media"
      class="text-gray-400 hover:text-primary transition-colors">
      <component :is="getIcon(link.media)" />
    </a>
  </div>
</template>

<script>
import { IconBrandLinkedin, IconBrandFacebook, IconBrandX, IconBrandGithub, IconBrandYoutube, IconBrandTiktok } from '@tabler/icons-vue'
import { SuitOpsServices } from '~/services/SuitOpsServices.js'
import Loader from '~/components/Load/LSocialLink.vue'
import { useI18n } from 'vue-i18n'

export default {
  components: {
    Loader
  },

  name: 'SocialLinks',
  setup() {
    const { t } = useI18n();
    return { t };
  },
  data() {
    return {
      socialLinks: [],
      loading: false,
      error: null
    };
  },
  async mounted() {
    await this.fetchSocialLinks();
  },
  methods: {
    async fetchSocialLinks() {
      this.error = null;
      this.loading = true;
      let attempts = 0;
      const maxAttempts = 2;

      while (attempts < maxAttempts) {
        try {
          const response = await SuitOpsServices.getAllFooterLinks();
          this.socialLinks = response.data;
          this.loading = false;
          return;
        } catch (err) {
          attempts++;
          console.error(`Erreur lors du chargement des liens sociaux, tentative ${attempts}:`, err);
          if (attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 500));
          } else {
            this.error = true; 
            this.loading = false;
          }
        }
      }
    },
    getIcon(media) {
      switch (media) {
        case 'LinkedIn':
          return IconBrandLinkedin;
        case 'Facebook':
          return IconBrandFacebook;
        case 'Twitter':
          return IconBrandX;
        case 'Github':
         return IconBrandGithub;
        case 'Youtube':
          return IconBrandYoutube;
        case 'TikTok':
          return IconBrandTiktok;
        default:
          return null;
      }
    }
  }
};
</script>