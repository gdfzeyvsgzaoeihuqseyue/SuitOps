import { useFetch, useRuntimeConfig } from 'nuxt/app';
import { ref, computed } from 'vue';
import type { BetaRegistrationUpdateData, VerifyLinkResponse, RequestTotpResponse } from '@/types';

export const usePreferences = () => {
  const config = useRuntimeConfig();
  const NEW_PGS_URL = config.public.pgsBaseAPI;

  // Données utilisateur
  const email = ref<string>('');
  const maskedEmail = ref<string>('');
  const firstName = ref<string>('');
  const lastName = ref<string>('');
  const company = ref<string>('');
  const source = ref<string>('');
  const newsletter = ref<boolean>(true);

  // Etats
  const currentStep = ref<'initial' | 'email_input' | 'totp_input' | 'preferences_form'>('initial');
  const isLoading = ref<boolean>(false);

  // Messages
  const message = ref<string>('');
  const messageType = ref<'success' | 'error' | 'info' | ''>('');

  // Code temporaire
  const totpCode = ref<string>('');

  const resetState = () => {
    email.value = '';
    maskedEmail.value = '';
    firstName.value = '';
    lastName.value = '';
    company.value = '';
    source.value = '';
    newsletter.value = true;
    currentStep.value = 'initial';
    isLoading.value = false;
    message.value = '';
    messageType.value = '';
    totpCode.value = '';
  };

  const setMessage = (msg: string, type: 'success' | 'error' | 'info' | '') => {
    message.value = msg;
    messageType.value = type;

    if (type === 'success' || type === 'info') {
      setTimeout(() => {
        message.value = '';
        messageType.value = '';
      }, 5000);
    }
  };

  const verifyLink = async (mailhash: string) => {
    isLoading.value = true;
    message.value = '';

    try {
      const { data: response, error: fetchError } = await useFetch<VerifyLinkResponse>(`${NEW_PGS_URL}/suitops/beta/verify-update-link?mailhash=${mailhash}`, {
        method: 'GET',
        server: false,
      });

      if (fetchError.value) {
        throw fetchError.value;
      }

      if (response.value?.canUpdate) {
        email.value = response.value.email;
        maskedEmail.value = response.value.maskedEmail;

        if (response.value.data) {
          firstName.value = response.value.data.firstName || '';
          lastName.value = response.value.data.lastName || '';
          company.value = response.value.data.company || '';
          source.value = response.value.data.source || '';
          newsletter.value = response.value.data.newsletter ?? true; 
        }

        currentStep.value = 'preferences_form';
        setMessage('Vérification réussie. Vous pouvez maintenant mettre à jour vos préférences.', 'success');
      } else {
        setMessage('Lien de mise à jour invalide ou expiré.', 'error');
        currentStep.value = 'email_input';
      }

    } catch (e: any) {
      console.error('Erreur lors de la vérification du lien:', e);

      if (e.statusCode === 400) {
        setMessage('Lien de mise à jour invalide ou expiré.', 'error');
      } else if (e.statusCode === 404) {
        setMessage('Adresse e-mail introuvable.', 'error');
      } else {
        setMessage('Une erreur est survenue lors de la vérification.', 'error');
      }

      currentStep.value = 'email_input';
    } finally {
      isLoading.value = false;
    }
  };

  const requestTotp = async (mail: string) => {
    isLoading.value = true;
    message.value = '';

    try {
      const { data: response, error: fetchError } = await useFetch<RequestTotpResponse>(`${NEW_PGS_URL}/suitops/beta/verify-update-link`, {
        method: 'POST',
        body: { email: mail },
        server: false,
      });

      if (fetchError.value) {
        throw fetchError.value;
      }

      email.value = mail;
      maskedEmail.value = response.value?.maskedEmail || '';
      currentStep.value = 'totp_input';
      setMessage('Un code de vérification a été envoyé à votre adresse e-mail.', 'info');

    } catch (e: any) {
      console.error('Erreur lors de la demande de TOTP:', e);

      if (e.statusCode === 404) {
        setMessage('Cette adresse e-mail n\'est pas inscrite à la bêta.', 'error');
      } else {
        setMessage('Une erreur est survenue lors de l\'envoi du code.', 'error');
      }
    } finally {
      isLoading.value = false;
    }
  };

  const verifyTotpCode = async (mail: string, totp: string) => {
    isLoading.value = true;
    message.value = '';

    try {
      const { data: response, error: fetchError } = await useFetch<VerifyLinkResponse>(`${NEW_PGS_URL}/suitops/beta/verify-update-link`, {
        method: 'POST',
        body: { email: mail, totpCode: totp },
        server: false,
      });

      if (fetchError.value) {
        throw fetchError.value;
      }

      if (response.value?.canUpdate) {
        email.value = response.value.email;
        maskedEmail.value = response.value.maskedEmail;

        if (response.value.data) {
          firstName.value = response.value.data.firstName || '';
          lastName.value = response.value.data.lastName || '';
          company.value = response.value.data.company || '';
          source.value = response.value.data.source || '';
          newsletter.value = response.value.data.newsletter ?? true;
        }

        currentStep.value = 'preferences_form';
        setMessage('Code vérifié avec succès. Vous pouvez maintenant mettre à jour vos préférences.', 'success');
      } else {
        setMessage('Code TOTP invalide ou expiré.', 'error'); 
      }

    } catch (e: any) {
      console.error('Erreur lors de la vérification du TOTP:', e);

      if (e.statusCode === 400) {
        setMessage('Code TOTP invalide ou expiré.', 'error');
      } else {
        setMessage('Une erreur est survenue lors de la vérification du code.', 'error');
      }

    } finally {
      isLoading.value = false;
    }
  };

  const updatePreferences = async () => {
    isLoading.value = true;
    message.value = '';

    try {
      const payload: BetaRegistrationUpdateData = {
        firstName: firstName.value,
        lastName: lastName.value,
        company: company.value,
        source: source.value,
        newsletter: newsletter.value,
      };

      const { error: fetchError } = await useFetch<any>(`${NEW_PGS_URL}/suitops/beta/update-preferences`, {
        method: 'PUT',
        body: { email: email.value, ...payload },
        server: false,
      });

      if (fetchError.value) {
        throw fetchError.value;
      }

      setMessage('Vos préférences ont été mises à jour avec succès.', 'success');

    } catch (e: any) {
      console.error('Erreur lors de la mise à jour des préférences:', e);

      if (e.statusCode === 400) {
        setMessage('Certaines données sont invalides. Veuillez vérifier vos informations.', 'error');
      } else if (e.statusCode === 404) {
        setMessage('Inscription non trouvée.', 'error');
      } else {
        setMessage('Une erreur est survenue lors de la mise à jour.', 'error');
      }

    } finally {
      isLoading.value = false;
    }
  };

  // Getters
  const isFormValid = computed<boolean>(() => {
    return !!firstName.value && !!lastName.value && !!email.value;
  });

  return {
    email, maskedEmail, firstName, lastName, company, source, newsletter,
    currentStep, isLoading, message, messageType, totpCode,

    resetState,
    setMessage,
    verifyLink,
    requestTotp,
    verifyTotpCode,
    updatePreferences,

    isFormValid,
  };
};
