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
            platformSlug: 'suitops',
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
        topic.platform.slug === 'suitops';

      console.log(`Topic ${topic.id}:`, {
        platform: topic.platform,
        hasValidPlatform,
        slug: topic.platform?.slug
      }); // Debug

      return hasValidPlatform;
    });

    console.log('Filtered suitops topics:', filtered.length);
    return filtered.sort((a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0));
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

  // Vote methods
  const voteUseful = async (faqId: string) => {
    try {
      const response = await $fetch<any>(`${PGS_URL}/solution/vote-useful/${faqId}`, {
        method: 'PATCH',
      });

      if (response && response.success && response.data) {
        // Update the local data with the new vote counts
        updateFaqVotes(faqId, response.data.isUseful, response.data.isUseless);
      }

      return response;
    } catch (err: any) {
      console.error('Error voting useful:', err);
      throw err;
    }
  };

  const voteUseless = async (faqId: string) => {
    try {
      const response = await $fetch<any>(`${PGS_URL}/solution/vote-useless/${faqId}`, {
        method: 'PATCH',
      });

      if (response && response.success && response.data) {
        // Update the local data with the new vote counts
        updateFaqVotes(faqId, response.data.isUseful, response.data.isUseless);
      }

      return response;
    } catch (err: any) {
      console.error('Error voting useless:', err);
      throw err;
    }
  };

  // Helper to update FAQ votes in the topics
  const updateFaqVotes = (faqId: string, isUseful: number, isUseless: number) => {
    topics.value.forEach(topic => {
      if (topic.faqs) {
        const faq = topic.faqs.find(f => f.id === faqId);
        if (faq) {
          faq.isUseful = isUseful;
          faq.isUseless = isUseless;
        }
      }
    });
  };

  return {
    topics,
    loading,
    error,
    fetchFaqTopics,
    suitopsTopics,
    getRandomTopic,
    voteUseful,
    voteUseless,
  };
});
