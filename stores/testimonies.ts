import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';
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
        const response: ApiResponse<TestimonyData[]> = await $fetch<ApiResponse<TestimonyData[]>>(`${PGS_URL}/solution/testimony`, {
          method: 'GET',
          query: {
            limit: 100,
            isPublished: true,
          },
        });

        if (!response || !response.success) {
          throw new Error(response?.message || 'Invalid API response for testimonies.');
        }

        console.log('Testimonies API Response:', response); // Debug log
        testimonies.value = response.data || [];
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
    console.log('Computing suitopsTestimonies, total testimonies:', testimonies.value.length); // Debug

    const filtered = testimonies.value.filter(testimony => {
      const hasValidPlatform = testimony.platform &&
        typeof testimony.platform === 'object' &&
        testimony.platform.slug === 'suitops';

      console.log(`Testimony ${testimony.id}:`, {
        platform: testimony.platform,
        hasValidPlatform,
        slug: testimony.platform?.slug
      }); // Debug

      return hasValidPlatform;
    });

    console.log('Filtered suitops testimonies:', filtered.length); // Debug

    // Sort: featured first, then by creation date (newest first)
    return filtered.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Fix: convert to Date objects
    });
  });

  return {
    testimonies,
    loading,
    error,
    fetchTestimonies,
    suitopsTestimonies,
  };
});
