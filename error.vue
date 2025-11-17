<template>
 <main class="font-body text-textClr">
    <div class="min-h-screen flex flex-col items-center justify-center bg-WtBAct p-4">
      <ErrorPage :error="errorData" />
    </div>

    <!-- Footer -->
    <footer class="py-4 border-t bg-WtBAct text-center">
      <div class="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto w-full gap-4 px-4">
        <!-- Logos Desktop -->
        <div class="flex-shrink-0 items-center justify-center mx-4 hidden lg:block">
          <img :src="sharedFiles.paths.logo.dc" alt="Logo" class="h-12 w-auto dark:hidden" />
          <img :src="sharedFiles.paths.logo.dw" alt="Logo" class="h-12 w-auto hidden dark:block" />
        </div>

        <!-- Logos Mobiles -->
        <div class="sm:hidden flex-shrink-0 flex items-center mx-4">
          <img :src="sharedFiles.paths.logo.mc" alt="Logo" class="h-12 w-auto dark:hidden" />
          <img :src="sharedFiles.paths.logo.mw" alt="Logo" class="h-12 w-auto hidden dark:block" />
        </div>

        <div>
          <p>{{ t('footer.copyright', { year: new Date().getFullYear() }) }}</p>
        </div>

        <!-- Liens sociaux -->
        <ul role="list" class="flex justify-center sm:justify-start space-x-4">
          <SocialCustomLink />
        </ul>
      </div>
    </footer>
  </main>
</template>

<script setup>
import { SocialCustomLink, ErrorPage } from '@/components/utils';
import { useRouter } from 'vue-router'
import { useSharedFiles } from '~/stores/sharedFiles'

const sharedFiles = useSharedFiles();
const router = useRouter()
const { t } = useI18n()
const localePath = useLocalePath()

const props = defineProps({
  error: Object,
})

const errorData = computed(() => {
  const { statusCode } = props.error
  let title = "Oups ! Une erreur est survenue"
  let message = "Désolé, une erreur inattendue est survenue. Veuillez réessayer plus tard."
  let image = sharedFiles.paths.general.error500

  if (statusCode === 404) {
    title = t('errorPage.404subtitle')
    message = t('errorPage.404message')
    image = sharedFiles.paths.general.error404
  } else if (statusCode === 403) {
    title = t('errorPage.403subtitle')
    message = t('errorPage.403message')
    image = sharedFiles.paths.general.error403
  } else if (statusCode === 500) {
    title = t('errorPage.500subtitle')
    message = t('errorPage.500message')
    image = sharedFiles.paths.general.error500
  }

  return { statusCode, title, message, image }
})

useHead({
  title: computed(() => `Erreur ${errorData.value.statusCode}`)
})

definePageMeta({
  layout: false,
})
</script>
