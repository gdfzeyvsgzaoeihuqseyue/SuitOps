<template>
  <div class="p-4">
    <!-- Formulaire d'inscription -->
    <form @submit.prevent="handleSubscribe"
      class="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center">
      <div class="relative w-full sm:flex-1 min-w-[180px]">
        <!-- Champ Prénom -->
        <IconUserCircle
          class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 peer-focus:text-primary transition-colors" />
        <input v-model="firstname" type="text" id="firstname" placeholder=" " required class="input-floating peer" />
        <label for="firstname" class="label-floating left-8">
          {{ t('common.firstnameLabel') }}
        </label>
      </div>

      <!-- Champ Nom -->
      <div class="relative w-full sm:flex-1 min-w-[180px]">
        <IconUserSquareRounded
          class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 peer-focus:text-primary transition-colors" />
        <input v-model="lastname" type="text" id="lastname" placeholder=" " required class="input-floating peer" />
        <label for="lastname" class="label-floating left-8">
          {{ t('common.lastnameLabel') }}
        </label>
      </div>

      <!-- Champ Email -->
      <div class="relative w-full sm:flex-1 min-w-[180px]">
        <IconMail class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 peer-focus:text-primary transition-colors" />
        <input v-model="email" type="email" id="email" placeholder=" " required class="input-floating peer" />
        <label for="email" class="label-floating left-8">
          {{ t('common.emailLabel') }}
        </label>
      </div>

      <!-- Bouton Soumettre -->
      <button type="submit"
        class="btn text-WtB bg-primary hover:bg-secondary w-full sm:flex-initial disabled:bg-textClr disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="isSubmitting">
        <div v-if="!isSubmitting" class="flex items-center gap-2 justify-center">
          {{ t('newsletter.subscribeButton') }}
          <IconSend />
        </div>

        <div v-else class="flex items-center gap-2 justify-center">
          {{ t('newsletter.subscribingButton') }}
          <IconLoader class="animate-spin" />
        </div>
      </button>
    </form>

    <!-- Bouton de désinscription -->
    <div class="flex sm:flex-row items-center mt-6 gap-2 justify-center text-center">
      <p>{{ t('newsletter.unsubscribePrompt') }}</p>
      <button @click="openModal" class="text-danger hover:underline">
        {{ t('newsletter.unsubscribeLink') }}
      </button>
    </div>

    <!-- Notification -->
    <p v-if="message"
      :class="['fixed bottom-4 right-4 z-50 p-3 text-sm rounded-lg shadow-lg transition-opacity', messageClass]">
      {{ message }}
    </p>

    <!-- Modal de désinscription -->
    <div v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4" v-motion
      :initial="{ opacity: 0, scale: 0.8, rotate: -15 }" :enter="{ opacity: 1, scale: 1, rotate: 0 }">
      <div class="bg-WtB rounded-lg p-6 w-full max-w-sm sm:max-w-md relative border border-BtW">
        <button @click="closeModal" class="absolute top-3 right-3 p-1 hover:bg-WtBAct rounded-full">
          <IconX class="h-6 w-6 transform transition duration-300 ease-in-out hover:rotate-90 hover:text-danger" />
        </button>

        <h3 class="text-lg font-semibold mb-4 text-center">{{ t('newsletter.unsubscribeModalTitle') }}</h3>
        <form @submit.prevent="handleUnsubscribe" class="flex flex-col gap-3">
          <div class="flex flex-col sm:flex-row gap-3">
            <div class="relative w-full sm:flex-1">
              <IconUserCircle
                class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 peer-focus:text-primary transition-colors" />
              <input v-model="unsubscribeFirstname" type="text" id="unsubscribeFirstname" placeholder=" " required
                class="input-floating peer" />
              <label for="unsubscribeFirstname" class="label-floating left-8">
                {{ t('common.firstnameLabel') }}
              </label>
            </div>

            <div class="relative w-full sm:flex-1">
              <IconUserSquareRounded
                class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 peer-focus:text-primary transition-colors" />
              <input v-model="unsubscribeLastname" type="text" id="unsubscribeLastname" placeholder=" " required
                class="input-floating peer" />
              <label for="unsubscribeLastname" class="label-floating left-8">
                {{ t('common.lastnameLabel') }}
              </label>
            </div>
          </div>

          <div class="relative">
            <IconMail
              class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 peer-focus:text-primary transition-colors" />
            <input v-model="unsubscribeEmail" type="email" id="unsubscribeEmail" placeholder=" " required
              class="input-floating peer" />
            <label for="unsubscribeEmail" class="label-floating left-8">
              {{ t('common.emailLabel') }}
            </label>
          </div>

          <button type="submit"
            class="btn text-white bg-danger hover:bg-dangerAct w-full sm:w-auto mx-auto whitespace-nowrap disabled:bg-textClr disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="isUnsubmitting">
            <div v-if="!isUnsubmitting" class="flex items-center gap-2 justify-center">
              {{ t('newsletter.unsubscribeButton') }}
              <IconBellMinusFilled />
            </div>

            <div v-else class="flex items-center gap-2 justify-center">
              {{ t('newsletter.unsubscribingButton') }}
              <IconLoader class="animate-spin" />
            </div>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SuitOpsServices } from '@/services/SuitOpsServices'
import { IconSend, IconBellMinusFilled, IconLoader, IconX, IconUserCircle, IconUserSquareRounded, IconMail } from '@tabler/icons-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const firstname = ref('')
const lastname = ref('')
const email = ref('')
const unsubscribeFirstname = ref('')
const unsubscribeLastname = ref('')
const unsubscribeEmail = ref('')
const message = ref('')
const messageClass = ref('')
const showModal = ref(false)
const isSubmitting = ref(false)
const isUnsubmitting = ref(false)

const handleSubscribe = async () => {
  isSubmitting.value = true
  message.value = ''
  try {
    const response = await SuitOpsServices.subscribeNewsletter(lastname.value, firstname.value, email.value)
    message.value = t('newsletter.subscribeSuccess')
    messageClass.value = 'bg-green-100 text-green-700'

    // Restaurer le formulaire si succes
    firstname.value = ''
    lastname.value = ''
    email.value = ''
  } catch (error) {
    message.value = t('newsletter.subscribeError')
    messageClass.value = 'bg-red-100 text-red-700'
  } finally {
    isSubmitting.value = false
    setTimeout(() => {
      message.value = ''
    }, 2000)
  }
}

const handleUnsubscribe = async () => {
  isUnsubmitting.value = true
  message.value = ''
  try {
    const response = await SuitOpsServices.unsubscribeNewsletter(unsubscribeLastname.value, unsubscribeFirstname.value, unsubscribeEmail.value)
    message.value = t('newsletter.unsubscribeSuccess')
    messageClass.value = 'bg-green-100 text-green-700'
    closeModal()

    // Restaurer le formulaire si succes
    unsubscribeFirstname.value = ''
    unsubscribeLastname.value = ''
    unsubscribeEmail.value = ''
  } catch (error) {
    message.value = t('newsletter.unsubscribeError')
    messageClass.value = 'bg-red-100 text-red-700'
  } finally {
    isUnsubmitting.value = false
    setTimeout(() => {
      message.value = ''
    }, 2000)
  }
}

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}
</script>

<style scoped>
.btn {
  @apply px-4 py-2 rounded-md transition-colors;
}

.input-floating {
  @apply block px-10 pb-2 pt-3 w-full text-sm bg-WtB rounded-lg border appearance-none focus:outline-none focus:ring-0 focus:border-primary;
}

.label-floating {
  @apply absolute text-xs sm:text-sm duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] bg-WtB px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-4;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>