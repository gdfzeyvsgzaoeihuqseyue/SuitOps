<template>
  <section v-if="!isIframeMode" class="mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 mt-4 md:mt-8">
    <!-- Breadcrumb -->
    <useBreadcrumb :items="breadcrumbItems" />
  </section>

  <div
    :class="{ 'bg-WtBAct rounded-lg sm:rounded-xl md:rounded-3xl shadow-lg overflow-hidden': !isIframeMode, 'embed-container': isIframeMode }">
    <!-- En-tête avec image -->
    <header class="h-60 sm:h-72 md:h-80 lg:h-96 bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${blogPost?.image?.url || 'https://placehold.co/600x400/0284c7/FFFFFF/png?text=' + $t('blogPage.loadingImage')})` }">
    </header>

    <main class="container mx-auto p-4 sm:p-8">
      <!-- Indicateur de chargement -->
      <Loader v-if="loading" />

      <!-- Message d'erreur -->
      <div v-if="error && !isIframeMode" class="text-center py-8">
        <div class="mb-4">
          <IconMoodCry class="w-10 h-10 sm:w-12 sm:h-12 mx-auto" />
          <p class="text-danger text-base sm:text-lg mt-2">{{ error }}</p>
        </div>
        <button @click="fetchBlogPost"
          class="bg-primary text-WtB px-4 py-2 rounded-md hover:bg-secondary transition-colors text-sm sm:text-base">
          {{ $t('common.retryButton') }}
        </button>
      </div>

      <div v-if="isLoaded">
        <!-- Bouton partager et Iframe -->
        <div v-if="!isIframeMode" class="flex justify-end gap-2 mb-4">
          <button @click="shareBlog"
            class="flex items-center gap-1 sm:gap-2 bg-primary text-WtB px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-secondary transition-colors text-sm sm:text-base">
            <IconShare class="w-4 h-4 sm:w-5 sm:h-5" />
            {{ $t('common.shareButton') }}
          </button>
          <button @click="copyIframe"
            class="flex items-center gap-1 sm:gap-2 bg-secondary text-WtB px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-primary transition-colors text-sm sm:text-base">
            <IconCode class="w-4 h-4 sm:w-5 sm:h-5" />
            {{ $t('common.iframeButton') }}
          </button>
        </div>
        <div class="relative container mx-auto mb-4 border-y border-gray-300 dark:border-gray-600 py-3">
          <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">
            {{ blogPost?.title }}
          </h1>

          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <div class="flex flex-wrap items-center gap-2 sm:gap-4">
              <span>
                {{ $t('blogID.by') }} <span class="font-bold text-secondary">{{ blogPost?.author }}</span>
              </span>
              <span class="hidden sm:inline">•</span>
              <span>
                {{ $t('blogID.publishedOn') }} <span class="font-bold text-secondary">{{ formatDate(blogPost?.createdAt)
                }}</span>
              </span>
              <span class="hidden sm:inline">•</span>
              <div class="flex items-center gap-1">
                <IconMessageStar class="w-4 h-4 sm:w-5 sm:h-5" />
                <span class="font-bold text-secondary">{{ blogPost?.object }}</span>
              </div>
            </div>

            <div>
              {{ $t('blogID.readingTime') }} : <span class="font-bold text-secondary">{{ readingTime }} {{
                $t('blogID.min') }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Contenu de l'article -->
      <article v-if="blogPost"
        class="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-800 dark:text-gray-200"
        v-html="linkStyle(blogPost.content)">
      </article>
      <div v-else-if="!loading && !error && !isIframeMode" class="text-center py-12">
        <p class="text-base sm:text-lg text-gray-600 dark:text-gray-400">
          {{ $t('blogID.noArticleFound') }}
        </p>
      </div>

      <!-- Notification -->
      <div v-if="showNotification"
        class="fixed bottom-4 right-4 z-50 bg-BtW text-WtB px-4 py-2 rounded shadow-lg transition-all">
        {{ notificationMessage }}
      </div>
    </main>

    <IframeFooter v-if="isIframeMode" :original-path="`blog/${route.params.id}/${route.params.title}`" class="p-10" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { SuitOpsServices } from '~/services/SuitOpsServices.js'
import { IconMoodCry, IconShare, IconMessageStar, IconCode } from '@tabler/icons-vue'
import Loader from '~/components/Load/LBlogId.vue'
import { useI18n } from 'vue-i18n'
import { useLocalePath } from '#imports'
import { useIframeMode } from '~/composables/useIframeMode.js'

// Variables
const { t, locale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const blogPost = ref(null)
const loading = ref(true)
const error = ref(null)
const notificationMessage = ref('')
const showNotification = ref(false)

// fil d’Ariane
const breadcrumbItems = computed(() => [
  { label: t('blogPage.heroTitle'), href: localePath('/blog') },
  { label: blogPost.value?.title || t('blogID.thisArticle') }
])

// Vrifier que la page est chargée
const isLoaded = computed(() => !loading.value && !error.value && blogPost.value)

const fetchBlogPost = async () => {
  error.value = null
  loading.value = true
  let attempts = 0
  const maxAttempts = 2
  while (attempts < maxAttempts) {
    try {
      const id = route.params.id
      const response = await SuitOpsServices.getOneBlogPost(id)
      blogPost.value = response.data?.data || response.data || null
      loading.value = false
      return
    } catch (err) {
      attempts++
      console.error(`Error fetching blog post, attempt ${attempts}:`, err)
      if (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 500))
      } else {
        error.value = t('common.loadError', { object: t('blogID.thisArticle') });
        loading.value = false
      }
    }
  }
}

onMounted(fetchBlogPost)

// SEO
watch(blogPost, (newPost) => {
  if (newPost && newPost.title) {
    useHead({
      title: newPost.title
    })
  } else if (!newPost && !loading.value && !error.value) {
    useHead({
      title: t('blogID.noArticleFound')
    })
  }
}, { immediate: true })


const linkStyle = (content) => {
  if (!content) return ''
  // Suppression des balises HTML
  return content
    .replace(/style="[^"]*"/g, '')
    .replace(/<a([^>]*)>/g, '<a$1 class="text-primary hover:underline no-underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800" rel="noopener noreferrer">')
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(locale.value, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date)
  } catch (e) {
    console.error("Error formatting date:", e);
    return dateString;
  }
}

const readingTime = computed(() => {
  if (!blogPost.value || !blogPost.value.content) return 0
  // Suppression des balises HTML
  const text = blogPost.value.content.replace(/<[^>]+>/g, ' ')
  const words = text.trim().split(/\s+/).length
  // Moyenne d'environ 200 mots par minute
  return Math.ceil(words / 200)
})


// Notification
const triggerNotification = (message) => {
  notificationMessage.value = message
  showNotification.value = true

  // Masquer la notification après 3 secondes
  setTimeout(() => {
    showNotification.value = false
    notificationMessage.value = ''
  }, 3000)
}

// Gestion de partage
const shareBlog = async () => {
  const url = window.location.href
  const title = blogPost.value?.title || t('blogID.defaultShareTitle')
  const text = blogPost.value?.description || t('blogID.defaultShareText')

  if (navigator.share) {
    try {
      await navigator.share({ title, text, url })
      console.log('Blog partagé avec succès')
    } catch (err) {
      console.error('Echec de partage:', err)
    }
  } else {
    try {
      await navigator.clipboard.writeText(url)
      triggerNotification(t('common.linkCopied'))
    } catch (err) {
      console.error('Error copying to clipboard:', err)
      triggerNotification(t('common.copyError'))
    }
  }
}

// Gestion de l'Iframe
const { isIframeMode, generateIframeCode } = useIframeMode('blogID.defaultShareTitle', 'Article de blog SuitOps');

// Fonction pour copier le code de l'iframe de l'offre
const copyIframe = async () => {
  const iframeCode = generateIframeCode(
    blogPost.value?.title,
    route.path
  );

  try {
    await navigator.clipboard.writeText(iframeCode);
    triggerNotification(t('common.iframeCopied'))
  } catch (err) {
    console.error('Erreur lors de la copie du code iframe :', err);
    triggerNotification(t('common.iframeCopyError'))
  }
};
</script>


<style scoped>
.dark .prose {
  color: inherit !important;
}

.dark .prose :deep(*) {
  color: inherit !important;
}

.dark .prose :deep(a) {
  color: var(--color-primary) !important;
}

.dark .prose :deep(em),
.dark .prose :deep(strong) {
  color: inherit !important;
  font-weight: bold;
}

.prose :deep(h1),
.prose :deep(h2),
.prose :deep(h3),
.prose :deep(h4),
.prose :deep(h5),
.prose :deep(h6) {
  color: var(--color-text-header);
}

.prose :deep(p),
.prose :deep(li),
.prose :deep(blockquote) {
  color: var(--color-text-body);
}

.prose :deep(a) {
  text-decoration: underline;
}

.embed-container main {
  flex-grow: 1; 
  overflow-y: auto; 
  padding-bottom: 70px !important; 
}
</style>
