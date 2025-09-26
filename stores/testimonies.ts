import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useFetch, useRuntimeConfig } from 'nuxt/app';
import type { ApiResponse, TestimonyData } from '@/types';

export const useTestimoniesStore = defineStore('testimonies', () => {
  const config = useRuntimeConfig();
  const PGS_URL = config.public.pgsBaseAPI;

  const testimonies = ref<TestimonyData[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchTestimonies = async () => {
    loading.value = true;
    error.value = null;
    let attempts = 0;
    const maxAttempts = 2;

    while (attempts < maxAttempts) {
      try {
        const { data: response, error: fetchError } = await useFetch<ApiResponse<TestimonyData[]>>(`${PGS_URL}/solution/testimony`, {
          method: 'GET',
          query: {
            limit: 100,
            isPublished: true,
            isFeatured: false,
          },
          server: false,
        });

        if (fetchError.value) {
          throw fetchError.value;
        }
        if (!response.value || !response.value.success) {
          throw new Error(response.value?.message || 'Invalid API response for testimonies.');
        }

        testimonies.value = response.value.data || [];
        return;
      } catch (err: any) {
        attempts++;
        console.error(`Error fetching testimonies (attempt ${attempts}/${maxAttempts}):`, err);
        if (attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 500));
        } else {
          error.value = err.message || 'Failed to fetch testimonies after multiple attempts.';
        }
      } finally {
        loading.value = false;
      }
    }
  };

  const suitopsTestimonies = computed(() => {
    return testimonies.value.filter(testimony =>
      testimony.platform && testimony.platform.some(p => p.slug === 'suitops')
    );
  });

  return {
    testimonies,
    loading,
    error,
    fetchTestimonies,
    suitopsTestimonies,
  };
});
