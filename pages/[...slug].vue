<template>
  <div class="min-h-screen flex flex-col bg-WtB text-textClr">
    <!-- Préférence -->
    <div class="mx-auto mt-16 flex items-center gap-4 space-x-4">
      <prefSettings />
    </div>

    <!-- Contenu -->
    <main class="flex-grow flex flex-col md:flex-row px-4 sm:px-8 md:px-24">
      <div class="md:w-2/3 flex items-center justify-center p-8">
        <img src="https://raw.githubusercontent.com/ProGestionSoft/Files/main/General/AfraidNoah.gif" alt="NOAH"
          class="w-full h-auto max-h-[70vh] object-contain">
      </div>

      <div class="md:w-2/3 flex flex-col items-center justify-center p-8 md:p-12">
        <div class="w-full max-w-2xl space-y-8">
          <img src="https://raw.githubusercontent.com/ProGestionSoft/Files/main/General/Break.png" alt="Break"
            class="w-64 h-auto mx-auto">

          <div class="text-center space-y-4">
            <h2 class="text-5xl font-bold text-primary">{{ t('errorPage.title') }}</h2>
            <p class="text-xl">{{ t('errorPage.message') }}</p>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <NuxtLink :to="localePath('/')"
              class="flex items-center px-8 py-3 bg-primary text-WtB rounded-lg hover:bg-secondary transition w-full sm:w-auto text-center hover:scale-105 hover:opacity-80 transition-transform duration-300">
              <IconHome class="w-5 h-5 mr-2" />
              {{ t('errorPage.homeButton') }}
            </NuxtLink>
            <button @click="router.go(-1)"
              class="flex items-center px-8 py-3 border rounded-lg hover:bg-WtBAct transition w-full sm:w-auto text-center hover:scale-105 hover:opacity-80 transition-transform duration-300">
              <IconArrowLeft class="w-5 h-5 mr-2" />
              {{ t('errorPage.backButton') }}
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Message de contact support -->
    <div class="flex sm:flex-row items-center mb-8 gap-2 justify-center text-center text-sm max-w-2xl mx-auto">
      <p>{{ t('errorPage.supportText') }}</p>
      <NuxtLink :to="localePath('/contact')" class="underline hover:font-bold hover:text-primary">
        {{ t('errorPage.supportLink') }}
      </NuxtLink>
    </div>

    <!-- Footer -->
    <footer class="py-4 border-t bg-WtBAct">
      <div class="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto w-full gap-4 px-4">

        <!-- Logos Desktop -->
        <div
          class="flex-shrink-0 items-center justify-center mx-4 hidden lg:block">
          <img src="/img/logoDeskCol.png" alt="Logo" class="h-12 w-auto dark:hidden" />
          <img src="/img/logoDeskWhite.png" alt="Logo" class="h-12 w-auto hidden dark:block" />
        </div>

        <!-- Logos Mobiles -->
        <div
          class="sm:hidden flex-shrink-0 flex items-center mx-4">
          <img src="/img/logoMobCol.png" alt="Logo" class="h-12 w-auto dark:hidden" />
          <img src="/img/logoMobWhite.png" alt="Logo" class="h-12 w-auto hidden dark:block" />
        </div>

        <div>
          <p>{{ t('footer.copyright', { year: new Date().getFullYear() }) }}</p>
        </div>

        <div class="flex space-x-6">
          <ul role="list" class="space-x-4 flex">
            <SocialLink />
          </ul>
        </div>

      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { IconHome, IconArrowLeft } from '@tabler/icons-vue'

const router = useRouter()
const { t } = useI18n()
const localePath = useLocalePath()

// SEO
useHead({
  title: t('errorPage.title'),
  meta: [{ name: 'description', content: t('errorPage.message') }]
})

definePageMeta({
  layout: false
});
</script>