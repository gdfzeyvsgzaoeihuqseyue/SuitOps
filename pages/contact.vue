<template>
 <main class="bg-gradient-to-br from-ash to-ashAct py-24 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto bg-WtB rounded-xl shadow-2xl overflow-hidden">
      <div class="lg:flex">
        <div class="lg:w-1/2 bg-gradient-to-b from-primary to-secondary p-8 text-WtB flex flex-col justify-between">
          <div>
            <h2 class="text-3xl font-extrabold mb-4"> {{ $t('contactPage.heroTitle') }} </h2>
            <p class="mb-6"> {{ $t('contactPage.heroSubtitle') }} </p>
            <div class="space-y-4">
              <div class="flex items-center">
                <IconMapPin class="h-6 w-6 mr-3" />
                <p> {{ $t('contactPage.fullAddress') }} </p>
              </div>
              <div class="flex items-center">
                <IconMail class="h-6 w-6 mr-3" />
                <a href="mailto:support@progestionsoft.com" class="hover:underline">
                  support@progestionsoft.com
                </a>
              </div>
              <div class="flex items-center">
                <IconPhone class="h-6 w-6 mr-3" />
                <a href="tel:+2290152535380" class="hover:underline">
                  +229 0152535380
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:w-1/2 p-8">
          <h2 class="text-3xl font-extrabold mb-6"> {{ $t('contactPage.sendMessageTitle') }} </h2>
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="relative">
              <IconUserScan
                class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 peer-focus:text-primary transition-colors" />
              <input v-model="form.fullname" type="text" id="name" placeholder=" " required
                class="input-floating peer" />
              <label for="name" class="label-floating left-8">
                {{ $t('common.fullnameLabel') }}
              </label>
            </div>

            <div class="relative">
              <IconMail
                class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 peer-focus:text-primary transition-colors" />
              <input v-model="form.emailAddress" type="email" id="email" placeholder=" " required
                class="input-floating peer" />
              <label for="email" class="label-floating left-8">
                {{ $t('common.emailLabel') }}
              </label>
            </div>

            <div class="relative">
              <IconWriting
                class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 peer-focus:text-primary transition-colors" />
              <input v-model="form.object" type="text" id="object" placeholder=" " required
                class="input-floating peer" />
              <label for="object" class="label-floating left-8">
                {{ $t('contactPage.subject') }}
              </label>
            </div>

            <div class="relative">
              <IconBubbleText
                class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 peer-focus:text-primary transition-colors" />
              <textarea id="message" v-model="form.message" rows="4" placeholder=" " class="input-floating peer"
                required></textarea>
              <label for="message" class="label-floating left-8">
                {{ $t('contactPage.yourMessage') }}
              </label>
            </div>

            <button type="submit"
              class="w-full bg-primary text-WtB py-3 px-4 rounded-md hover:bg-secondary transition-colors duration-300 disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed"
              :disabled="isSubmitting">
              <div class="flex items-center justify-center gap-2">
                <template v-if="!isSubmitting">
                  {{ $t('contactPage.sendButton') }}
                  <IconSend class="w-5 h-5" />
                </template>
                <template v-else>
                  {{ $t('contactPage.sendingButton') }}
                  <IconLoader class="w-5 h-5 animate-spin" />
                </template>
              </div>
            </button>
          </form>

          
          <p v-if="message"
            :class="['fixed bottom-4 right-4 z-50 p-3 text-sm rounded-lg shadow-lg transition-opacity', messageClass]">
            {{ message }}
          </p>
        </div>
      </div>
    </div>
 </main>
</template>

<script setup>
import { IconUserScan, IconWriting, IconBubbleText, IconMapPin, IconMail, IconPhone, IconSend, IconLoader } from '@tabler/icons-vue';
import { SuitOpsServices } from '@/stores/SuitOpsServices';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// Variables réactives
const form = ref({
  fullname: '',
  emailAddress: '',
  object: '',
  message: ''
})

const isSubmitting = ref(false)
const message = ref('')
const messageClass = ref('')

const submitForm = async () => {
  isSubmitting.value = true
  message.value = ''

  try {
    const response = await SuitOpsServices.sendMessage(
      form.value.fullname,
      form.value.emailAddress,
      form.value.object,
      form.value.message
    )

    message.value = t('contactPage.messageSentSuccess');
    messageClass.value = 'bg-green-100 text-green-700'

    // Réinitialisation du formulaire
    form.value = {
      fullname: '',
      emailAddress: '',
      object: '',
      message: ''
    }

  } catch (error) {
    console.error('Erreur d\'envoi:', error)
    message.value = t('contactPage.messageSentError');
    messageClass.value = 'bg-red-100 text-red-700'
  } finally {
    isSubmitting.value = false
    setTimeout(() => {
      message.value = ''
    }, 5000)
  }
}

useHead({
  title: t('contactPage.heroTitle')
})
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

.input-floating {
  @apply block px-10 pb-2 pt-3 w-full text-sm bg-WtB rounded-lg border appearance-none focus:outline-none focus:ring-0 focus:border-primary;
}

.label-floating {
  @apply absolute text-xs sm:text-sm duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] bg-WtB px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-4;
}
</style>
