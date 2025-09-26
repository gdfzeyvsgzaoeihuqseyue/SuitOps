import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useFetch, useRuntimeConfig } from 'nuxt/app';
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
        const { data: response, error: fetchError } = await useFetch<ApiResponse<PartnerData[]>>(`${PGS_URL}/solution/partner`, {
          method: 'GET',
          query: { limit: 100 },
          server: false,
        });

        if (fetchError.value) {
          throw fetchError.value;
        }
        if (!response.value || !response.value.success) {
          throw new Error(response.value?.message || 'Invalid API response for partners.');
        }

        partners.value = response.value.data || [];
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
    return partners.value.filter(partner =>
      partner.platforms && partner.platforms.some(platform => platform.slug === 'suitops')
    );
  });

  return {
    partners,
    loading,
    error,
    fetchPartners,
    suitopsPartners,
  };
});
