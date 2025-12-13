import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';
import type { FaqTopicData, FaqTopicResponse } from '@/types/faq';

export const useFaqStore = defineStore('faq', () => {
  const config = useRuntimeConfig();
  const PGS_URL = config.public.pgsBaseAPI;

  const topics = ref<FaqTopicData[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchFaqTopics = async () => {
    loading.value = true;
    error.value = null;
    let attempts = 0;
    const maxAttempts = 2;

    while (attempts < maxAttempts) {
      try {
        const response: FaqTopicResponse = await $fetch<FaqTopicResponse>(`${PGS_URL}/solution/get-topics-platform`, {
          method: 'GET',
          query: {
            platformSlug: 'hire',
            includeFaqs: true,
            status: 'active',
          },
        });

        if (!response || !response.success) {
          throw new Error(response?.message || 'Invalid API response for FAQ topics.');
        }

        console.log('FAQ Topics API Response:', response); // Debug log
        topics.value = response.data || [];
        return;
      } catch (err: any) {
        attempts++;
        console.error(`Error fetching FAQ topics (attempt ${attempts}/${maxAttempts}):`, err);
        if (attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 500));
        } else {
          error.value = err.message || 'Failed to fetch FAQ topics after multiple attempts.';
        }
      } finally {
        loading.value = false;
      }
    }
  };

  const suitopsTopics = computed(() => {
    console.log('Computing suitopsTopics, total topics:', topics.value.length); // Debug

    const filtered = topics.value.filter(topic => {
      const hasValidPlatform = topic.platform &&
        typeof topic.platform === 'object' &&
        topic.platform.slug === 'hire';

      console.log(`Topic ${topic.id}:`, {
        platform: topic.platform,
        hasValidPlatform,
        slug: topic.platform?.slug
      }); // Debug

      return hasValidPlatform;
    });

    console.log('Filtered suitops topics:', filtered.length); // Debug

    // Sort by order
    return filtered.sort((a, b) => a.order - b.order);
  });

  // Get a random topic with N random FAQs
  const getRandomTopic = (maxFaqs: number = 4) => {
    const validTopics = suitopsTopics.value.filter(topic =>
      topic.faqs && topic.faqs.length > 0
    );

    if (validTopics.length === 0) {
      return null;
    }

    // Get a random topic
    const randomTopic = validTopics[Math.floor(Math.random() * validTopics.length)];

    // Get random FAQs from that topic
    const shuffledFaqs = [...(randomTopic.faqs || [])].sort(() => 0.5 - Math.random());
    const selectedFaqs = shuffledFaqs.slice(0, maxFaqs);

    return {
      topic: {
        id: randomTopic.id,
        name: randomTopic.name,
        slug: randomTopic.slug,
        description: randomTopic.description,
      },
      faqs: selectedFaqs.map(faq => ({
        id: faq.id,
        title: faq.question,
        content: faq.answer,
        isUseful: faq.isUseful,
        isUseless: faq.isUseless,
      })),
    };
  };

  return {
    topics,
    loading,
    error,
    fetchFaqTopics,
    suitopsTopics,
    getRandomTopic,
  };
});
