import { useFetch, useRuntimeConfig } from 'nuxt/app'
import { ref, computed } from 'vue'

export const usePreferences = () => {
  const config = useRuntimeConfig()
  const NEW_PGS_URL = config.public.newPgsBaseAPI

  // Données utilisateur
  const email = ref('')
  const maskedEmail = ref('')
  const firstName = ref('')
  const lastName = ref('')
  const company = ref('')
  const source = ref('')
  const newsletter = ref(true)

  // État
  const currentStep = ref('initial')
  const isLoading = ref(false)

  // Messages
  const message = ref('')
  const messageType = ref('')

  // Code temporaire
  const totpCode = ref('')

  const resetState = () => {
    email.value = ''
    maskedEmail.value = ''
    firstName.value = ''
    lastName.value = ''
    company.value = ''
    source.value = ''
    newsletter.value = true
    currentStep.value = 'initial'
    isLoading.value = false
    message.value = ''
    messageType.value = ''
    totpCode.value = ''
  }

  const setMessage = (msg, type) => {
    message.value = msg
    messageType.value = type

    if (type === 'success' || type === 'info') {
      setTimeout(() => {
        message.value = ''
        messageType.value = ''
      }, 5000)
    }
  }

  const verifyLink = async (mailhash) => {
    isLoading.value = true
    message.value = ''

    try {
      const { data: response } = await useFetch(`${NEW_PGS_URL}/suitops/beta/verify-update-link?mailhash=${mailhash}`, {
        method: 'GET',
        server: false,
        initialCache: false,
      })

      if (response.value?.canUpdate) {
        email.value = response.value.email
        maskedEmail.value = response.value.maskedEmail

        if (response.value.data) {
          firstName.value = response.value.data.firstName || ''
          lastName.value = response.value.data.lastName || ''
          company.value = response.value.data.company || ''
          source.value = response.value.data.source || ''
          newsletter.value = true
        }

        currentStep.value = 'preferences_form'
        setMessage('Vérification réussie. Vous pouvez maintenant mettre à jour vos préférences.', 'success')
      }

    } catch (error) {
      console.error('Erreur lors de la vérification du lien:', error)

      if (error?.status === 400) {
        setMessage('Lien de mise à jour invalide ou expiré.', 'error')
      } else if (error?.status === 404) {
        setMessage('Adresse e-mail introuvable.', 'error')
      } else {
        setMessage('Une erreur est survenue lors de la vérification.', 'error')
      }

      currentStep.value = 'email_input'
    } finally {
      isLoading.value = false
    }
  }

  const requestTotp = async (mail) => {
    isLoading.value = true
    message.value = ''

    try {
      const { data: response } = await useFetch(`${NEW_PGS_URL}/suitops/beta/verify-update-link`, {
        method: 'POST',
        body: { email: mail },
        server: false,
        initialCache: false,
      })

      email.value = mail
      maskedEmail.value = response.value.maskedEmail
      currentStep.value = 'totp_input'
      setMessage('Un code de vérification a été envoyé à votre adresse e-mail.', 'info')

    } catch (error) {
      console.error('Erreur lors de la demande de TOTP:', error)

      if (error?.status === 404) {
        setMessage('Cette adresse e-mail n\'est pas inscrite à la bêta.', 'error')
      } else {
        setMessage('Une erreur est survenue lors de l\'envoi du code.', 'error')
      }
    } finally {
      isLoading.value = false
    }
  }

  const verifyTotpCode = async (mail, totp) => {
    isLoading.value = true
    message.value = ''

    try {
      const { data: response } = await useFetch(`${NEW_PGS_URL}/suitops/beta/verify-update-link`, {
        method: 'POST',
        body: { email: mail, totpCode: totp },
        server: false,
        initialCache: false,
      })

      if (response.value?.canUpdate) {
        email.value = response.value.email
        maskedEmail.value = response.value.maskedEmail

        if (response.value.data) {
          firstName.value = response.value.data.firstName || ''
          lastName.value = response.value.data.lastName || ''
          company.value = response.value.data.company || ''
          source.value = response.value.data.source || ''
          newsletter.value = true
        }

        currentStep.value = 'preferences_form'
        setMessage('Code vérifié avec succès. Vous pouvez maintenant mettre à jour vos préférences.', 'success')
      }

    } catch (error) {
      console.error('Erreur lors de la vérification du TOTP:', error)

      if (error?.status === 400) {
        setMessage('Code TOTP invalide ou expiré.', 'error')
      } else {
        setMessage('Une erreur est survenue lors de la vérification du code.', 'error')
      }

    } finally {
      isLoading.value = false
    }
  }

  const updatePreferences = async () => {
    isLoading.value = true
    message.value = ''

    try {
      await useFetch(`${NEW_PGS_URL}/suitops/beta/update-preferences`, {
        method: 'PUT',
        body: {
          email: email.value,
          firstName: firstName.value,
          lastName: lastName.value,
          company: company.value,
          source: source.value,
          newsletter: newsletter.value,
        },
        server: false,
        initialCache: false,
      })

      setMessage('Vos préférences ont été mises à jour avec succès.', 'success')

    } catch (error) {
      console.error('Erreur lors de la mise à jour des préférences:', error)

      if (error?.status === 400) {
        setMessage('Certaines données sont invalides. Veuillez vérifier vos informations.', 'error')
      } else if (error?.status === 404) {
        setMessage('Inscription non trouvée.', 'error')
      } else {
        setMessage('Une erreur est survenue lors de la mise à jour.', 'error')
      }

    } finally {
      isLoading.value = false
    }
  }

  // Getters
  const isFormValid = computed(() => {
    return firstName.value && lastName.value && email.value
  })

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
  }
}
