import { ref } from 'vue'
import { SuitOpsServices } from '~/services/SuitOpsServices.js'

export const useFaqs = () => {
  const topics = ref<any[]>([])
  const error = ref<any>(null)
  const loading = ref(false)

  const fetchFaqs = async () => {
    const maxAttempts = 2
    let attempts = 0
    loading.value = true

    while (attempts < maxAttempts) {
      try {
        const response = await SuitOpsServices.getAllFaq() as { data: any[] }
        topics.value = response.data
        loading.value = false
        return
      } catch (err) {
        attempts++
        console.error(`Erreur lors de la récupération des FAQs, tentative ${attempts}:`, err)
        if (attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 500)) 
        } else {
          error.value = "Une erreur est survenue lors de la récupération des FAQs."
          loading.value = false
        }
      }
    }
  }

  const getRandomTopic = (faqCount: number = 4) => {
    if (!topics.value.length) return null

    const randomTopic = topics.value[Math.floor(Math.random() * topics.value.length)]
    const shuffledFaqs = [...randomTopic.faqs].sort(() => 0.5 - Math.random())

    return {
      topic: randomTopic,
      faqs: shuffledFaqs.slice(0, faqCount)
    }
  }

  return { topics, error, loading, fetchFaqs, getRandomTopic }
}
