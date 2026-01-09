import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';
import type { ApiResponse, PartnerData } from '@/types';

export const usePartnersStore = defineStore('partners', () => {
  const config = useRuntimeConfig();
  const PGS_URL = config.public.pgsBaseAPI;

  const partners = ref<PartnerData[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchPartners = async () => {
    loading.value = true;
    error.value = null;
    let attempts = 0;
    const maxAttempts = 2;

    while (attempts < maxAttempts) {
      try {
        const response: ApiResponse<PartnerData[]> = await $fetch<ApiResponse<PartnerData[]>>(`${PGS_URL}/public/solution/partner`, {
          method: 'GET',
          query: { limit: 100 },
        });

        if (!response || !response.success) {
          throw new Error(response?.message || 'Invalid API response for partners.');
        }

        console.log('Partners API Response:', response);
        partners.value = response.data || [];
        return;
      } catch (err: any) {
        attempts++;
        console.error(`Error fetching partners (attempt ${attempts}/${maxAttempts}):`, err);
        if (attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 500));
        } else {
          error.value = err.message || 'Failed to fetch partners after multiple attempts.';
        }
      } finally {
        loading.value = false;
      }
    }
  };

  const suitopsPartners = computed(() => {
    console.log('Computing suitopsPartners, total partners:', partners.value.length);

    const filtered = partners.value.filter(partner => {
      const hasValidPlatform = partner.platform &&
        typeof partner.platform === 'object' &&
        partner.platform.slug === 'suitops';

      console.log(`Partner ${partner.id}:`, {
        platform: partner.platform,
        hasValidPlatform,
        slug: partner.platform?.slug
      });

      return hasValidPlatform;
    });

    console.log('Filtered suitops partners:', filtered.length);
    return filtered;
  });

  return {
    partners,
    loading,
    error,
    fetchPartners,
    suitopsPartners,
  };
});
