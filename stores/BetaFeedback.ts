import { defineStore } from 'pinia';
import { useRuntimeConfig } from '#app';
import { ref } from 'vue';
import { PGSServices } from '~/stores/PGSServices'; 
import type { SuitopsBetaRegistrationData, GetBetaRegistrationResponse } from '@/types';

export const useBetaFeedbackStore = defineStore('betaFeedback', () => {
  const config = useRuntimeConfig();
  const BASE_API_URL = config.public.pgsBaseAPI;

  const loading = ref(false);
  const error = ref<string | null>(null);
  const successMessage = ref<string | null>(null);

  const resetMessages = () => {
    error.value = null;
    successMessage.value = null;
  };

  /**
   * Submits new feedback to the backend.
   * @param feedbackData The feedback data object.
   */
  const submitFeedback = async (feedbackData: any) => {
    resetMessages();
    loading.value = true;
    try {
      const { data: responseData, error: fetchError } = await useFetch<any>(`${BASE_API_URL}/suitops/beta/feedback`, {
        method: 'POST',
        body: feedbackData,
        server: false,
      });

      if (fetchError.value) {
        throw fetchError.value;
      }

      successMessage.value = responseData.value?.message || 'Feedback soumis avec succès !';
      return responseData.value;
    } catch (e: any) {
      console.error('Erreur lors de la soumission du feedback:', e);
      error.value = e.data?.message || e.message || 'Échec de la soumission du feedback.';
      if (e.data?.errors) {
        error.value += ' ' + JSON.stringify(e.data.errors);
      }
      return null;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Updates an existing feedback entry in the backend.
   * @param id The ID of the feedback to update.
   * @param feedbackData The updated feedback data object.
   */
  const updateFeedback = async (id: string, feedbackData: any) => {
    resetMessages();
    loading.value = true;
    try {
      const { data: responseData, error: fetchError } = await useFetch<any>(`${BASE_API_URL}/suitops/beta/feedback/${id}`, {
        method: 'PUT',
        body: feedbackData,
        server: false,
      });

      if (fetchError.value) {
        throw fetchError.value;
      }

      successMessage.value = responseData.value?.message || 'Feedback mis à jour avec succès !';
      return responseData.value;
    } catch (e: any) {
      console.error('Erreur lors de la mise à jour du feedback:', e);
      error.value = e.data?.message || e.message || 'Échec de la mise à jour du feedback.';
      if (e.data?.errors) {
        error.value += ' ' + JSON.stringify(e.data.errors);
      }
      return null;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Fetches user details by userId using PGSServices.
   * @param userId The ID of the user.
   */
  const fetchUserDetails = async (userId: string): Promise<SuitopsBetaRegistrationData | null> => {
    loading.value = true;
    error.value = null;
    try {
      const response: GetBetaRegistrationResponse = await PGSServices.getBetaRegistrationById(userId);

      if (response && response.data) {
        return response.data;
      } else {
        error.value = 'Utilisateur non trouvé ou données invalides.';
        return null;
      }
    } catch (e: any) {
      console.error('Erreur lors de la récupération des détails de l\'utilisateur:', e);
      error.value = e.data?.message || e.message || 'Impossible de récupérer les détails de l\'utilisateur.';
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    successMessage,
    submitFeedback,
    updateFeedback,
    fetchUserDetails,
    resetMessages,
  };
});
