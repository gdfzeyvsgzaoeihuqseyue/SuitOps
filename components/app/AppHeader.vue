<template>
  <header v-if="!isIframeMode" class="shadow-sm top-0 left-0 fixed w-full bg-WtB backdrop-blur-sm z-50">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
      <div class="flex justify-between h-16">
        <div class="hidden sm:flex sm:items-center sm:space-x-8 w-full">
          <div class="flex gap-8 items-center">
            <template v-for="(item, index) in navItems.slice(0, 4)" :key="index">
              <div v-if="item.isDropdown" class="relative group" @mouseenter="openDropdown(item.label)"
                @mouseleave="delayedCloseDropdown(item.label)">
                <button class="nav-link flex items-center"
                  :class="{ 'active-link': item.pathsToWatch.some(p => isCurrentPath(p)) }">
                  {{ t(item.label) }}
                  <IconChevronDown class="w-4 h-4 ml-1 transition-transform duration-200"
                    :class="{ 'rotate-180': isDropdownOpen(item.label) }" />
                </button>
                <div v-if="isDropdownOpen(item.label)" class="dropdown-menu">
                  <template v-for="(subItem, subIndex) in item.items" :key="subIndex">
                    <a v-if="subItem.href" :href="subItem.href" target="_blank" class="dropdown-item">{{
                      t(subItem.label) }}</a>
                    <NuxtLink v-else :to="localePath(subItem.path)" class="dropdown-item"
                      :class="{ 'active-drop': isCurrentPath(subItem.path) }">
                      {{ t(subItem.label) }}
                    </NuxtLink>
                  </template>
                </div>
              </div>
              <NuxtLink v-else-if="item.path" :to="localePath(item.path)" class="nav-link"
                :class="{ 'active-link': isCurrentPath(item.path) }">
                {{ t(item.label) }}
              </NuxtLink>
              <a v-else-if="item.href" :href="item.href" target="_blank" class="nav-link">{{ t(item.label) }}</a>
            </template>
          </div>

          <NuxtLink :to="localePath('/')"
            class="flex-shrink-0 items-center justify-center mx-4 hidden lg:block hover:scale-105 hover:opacity-80 transition-transform duration-300">
            <img :src="sharedFiles.paths.logo.dc" alt="Logo" class="h-12 w-auto dark:hidden" />
            <img :src="sharedFiles.paths.logo.dw" alt="Logo" class="h-12 w-auto hidden dark:block" />
          </NuxtLink>

          <div class="flex gap-8 items-center">
            <template v-for="(item, index) in navItems.slice(4)" :key="index">
              <div v-if="item.isDropdown" class="relative group" @mouseenter="openDropdown(item.label)"
                @mouseleave="delayedCloseDropdown(item.label)">
                <button class="nav-link flex items-center"
                  :class="{ 'active-link': item.pathsToWatch.some(p => isCurrentPath(p)) }">
                  {{ t(item.label) }}
                  <IconChevronDown class="w-4 h-4 ml-1 transition-transform duration-200"
                    :class="{ 'rotate-180': isDropdownOpen(item.label) }" />
                </button>
                <div v-if="isDropdownOpen(item.label)" class="dropdown-menu">
                  <template v-for="(subItem, subIndex) in item.items" :key="subIndex">
                    <a v-if="subItem.href" :href="subItem.href" target="_blank" class="dropdown-item">{{
                      t(subItem.label) }}</a>
                    <NuxtLink v-else :to="localePath(subItem.path)" class="dropdown-item"
                      :class="{ 'active-drop': isCurrentPath(subItem.path) }">
                      {{ t(subItem.label) }}
                    </NuxtLink>
                  </template>
                </div>
              </div>
              <NuxtLink v-else-if="item.path" :to="localePath(item.path)" class="nav-link"
                :class="{ 'active-link': isCurrentPath(item.path) }">
                {{ t(item.label) }}
              </NuxtLink>
              <a v-else-if="item.href" :href="item.href" target="_blank" class="nav-link">{{ t(item.label) }}</a>
            </template>
          </div>

          <prefSettings />
        </div>

        <div class="flex items-center sm:hidden w-full justify-between">
          <NuxtLink :to="localePath('/')"
            class="flex-shrink-0 flex items-center mx-4 hover:scale-105 hover:opacity-80 transition-transform duration-300">
            <img :src="sharedFiles.paths.logo.mc" alt="Logo" class="h-12 w-auto dark:hidden" />
            <img :src="sharedFiles.paths.logo.mw" alt="Logo" class="h-12 w-auto hidden dark:block" />
          </NuxtLink>

          <div class="flex items-center space-x-2">
            <prefSettings />
            <button @click="toggleMobileMenu" type="button"
              class="inline-flex items-center justify-center p-2 rounded-md hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
              <Transition name="hamburger-icon" mode="out-in">
                <IconMenuDeep v-if="!mobileMenuOpen" class="h-6 w-6" />
                <IconX v-else class="h-6 w-6" />
              </Transition>
            </button>
          </div>
        </div>
      </div>

      <Transition name="mobile-menu">
        <div v-if="mobileMenuOpen" class="sm:hidden max-h-screen overflow-y-auto pb-6" ref="mobileMenuRef">
          <div class="pt-2 pb-3 space-y-1">
            <template v-for="(item, index) in navItems" :key="index">
              <div v-if="item.isDropdown">
                <button @click="toggleMobileDropdown(item.label)"
                  class="w-full text-left px-3 py-2 font-medium flex items-center justify-between"
                  :class="getMenuItemClass(...item.pathsToWatch)">
                  {{ t(item.label) }}
                  <IconChevronDown class="w-4 h-4 transform transition-transform duration-200"
                    :class="{ 'rotate-180': mobileDropdowns[item.label] }" />
                </button>
                <div v-if="mobileDropdowns[item.label]" class="pl-4">
                  <template v-for="(subItem, subIndex) in item.items" :key="subIndex">
                    <a v-if="subItem.href" :href="subItem.href" target="_blank"
                      class="block px-3 py-2 hover:text-primary">{{ t(subItem.label) }}</a>
                    <NuxtLink v-else :to="localePath(subItem.path)" class="block px-3 py-2 hover:text-primary"
                      :class="getLinkClass(subItem.path)" @click="closeMobileMenu">{{ t(subItem.label) }}
                    </NuxtLink>
                  </template>
                </div>
              </div>
              <NuxtLink v-else-if="item.path" :to="localePath(item.path)" class="block px-3 py-2 hover:text-primary"
                :class="getLinkClass(item.path)" @click="closeMobileMenu">
                {{ t(item.label) }}
              </NuxtLink>
              <a v-else-if="item.href" :href="item.href" target="_blank" class="block px-3 py-2 hover:text-primary">{{
                t(item.label) }}</a>
            </template>
          </div>
        </div>
      </Transition>
    </nav>
  </header>

  <div v-if="mobileMenuOpen" class="fixed inset-0 bg-black bg-opacity-20 z-40 sm:hidden" @click="closeMobileMenu"
    @touchstart="closeMobileMenu">
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { IconChevronDown, IconMenuDeep, IconX } from '@tabler/icons-vue'
import { useI18n } from 'vue-i18n'
import { useIframeMode } from '~/composables/useIframeMode.ts'
import { useSharedFiles } from '~/stores/sharedFiles';

const sharedFiles = useSharedFiles();
const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const { isIframeMode } = useIframeMode()

const { data: customData } = await useAsyncData('customData', () => sharedFiles.getCustomData());
const docUrl = computed(() => customData.value?.doc?.url);
const hireUrl = computed(() => customData.value?.hire?.url);
const webUrl = computed(() => customData.value?.web?.url);

// Centralisation de la configuration du menu
const navItems = computed(() => [
  {
    label: 'navbar.solutions',
    isDropdown: true,
    pathsToWatch: ['/download', '/compare'],
    items: [
      { label: 'navbar.webVersion', href: `${webUrl.value}` },
      { label: 'navbar.desktopVersion', path: '/download' },
      { label: 'navbar.compare', path: '/compare' },
    ],
  },
  { label: 'navbar.features', path: '/features' },
  { label: 'navbar.careers', path: '/offer' },
  { label: 'navbar.pricing', path: '/pricings' },
  {
    label: 'navbar.resources',
    isDropdown: true,
    pathsToWatch: ['/blog', '/forum'],
    items: [
      { label: 'navbar.documentation', href: `${docUrl.value}` },
      { label: 'navbar.blog', path: '/blog' },
      { label: 'navbar.forum', path: '/forum' },
    ],
  },
  { label: 'navbar.about', path: '/about' },
  { label: 'navbar.jobOffers', href: `${hireUrl.value}` },
  { label: 'navbar.contactUs', path: '/contact' },
])

// État réactif
const mobileMenuRef = ref(null)
const openDropdowns = reactive({})
const closeTimeouts = reactive({})
const mobileMenuOpen = ref(false)
const mobileDropdowns = reactive({})

// Fonctions pour les dropdowns desktop
const openDropdown = (dropdown) => {
  if (closeTimeouts[dropdown]) {
    clearTimeout(closeTimeouts[dropdown])
    closeTimeouts[dropdown] = null
  }
  openDropdowns[dropdown] = true
}

const delayedCloseDropdown = (dropdown) => {
  closeTimeouts[dropdown] = setTimeout(() => {
    openDropdowns[dropdown] = false
  }, 500)
}

const isDropdownOpen = (dropdown) => {
  return openDropdowns[dropdown]
}

// Fonctions pour le menu mobile
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  Object.keys(mobileDropdowns).forEach(key => {
    mobileDropdowns[key] = false
  })
}

const toggleMobileDropdown = (dropdown) => {
  mobileDropdowns[dropdown] = !mobileDropdowns[dropdown]
}

// Fermer le menu au clic extérieur
const handleClickOutside = (event) => {
  if (mobileMenuOpen.value && mobileMenuRef.value && !mobileMenuRef.value.contains(event.target)) {
    const hamburgerButton = event.target.closest('button[type="button"]')
    if (!hamburgerButton) {
      closeMobileMenu()
    }
  }
}

// Fonctions utilitaires pour les classes CSS
const isCurrentPath = (path) => {
  return route.path === localePath(path)
}

const getLinkClass = (path) => {
  return {
    'text-primary font-medium': isCurrentPath(path),
    'text-textClr': !isCurrentPath(path)
  }
}

const getMenuItemClass = (...paths) => {
  return {
    'text-primary': paths.some(p => isCurrentPath(p)),
    'text-textClr': !paths.some(p => isCurrentPath(p))
  }
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('touchstart', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('touchstart', handleClickOutside)
  Object.values(closeTimeouts).forEach(timeout => {
    if (timeout) clearTimeout(timeout)
  })
})
</script>

<style scoped>
.nav-link {
  @apply inline-flex items-center whitespace-nowrap px-1 pt-1 text-sm font-medium hover:text-primary border-b-2 border-transparent hover:border-secondary transition-colors;
}

.active-link {
  @apply text-secondary border-primary;
}

.active-drop {
  @apply bg-bgClr;
}

.dropdown-menu {
  @apply absolute bg-WtBAct shadow-lg rounded-md mt-2 py-2 w-48 transition-opacity duration-200 z-50;
}

.dropdown-item {
  @apply block px-4 py-2 text-sm hover:bg-textClr hover:text-WtB;
}

.modal-link {
  @apply flex items-center p-3 border rounded-lg hover:bg-WtBAct hover:border-primary transition-colors;
}

/* Animation pour l'icône hamburger */
.hamburger-icon-enter-active,
.hamburger-icon-leave-active {
  transition: all 0.2s ease-in-out;
}

.hamburger-icon-enter-from {
  opacity: 0;
  transform: rotate(90deg) scale(0.8);
}

.hamburger-icon-leave-to {
  opacity: 0;
  transform: rotate(-90deg) scale(0.8);
}

/* Animations pour le menu mobile */
.mobile-menu-enter-active {
  transition: all 0.3s ease-out;
}

.mobile-menu-leave-active {
  transition: all 0.25s ease-in;
}

.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-20px);
  max-height: 0;
}

.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}
</style>
