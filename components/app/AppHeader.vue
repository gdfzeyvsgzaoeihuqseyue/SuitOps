<template>
  <ClientOnly>
    <header class="shadow-sm top-0 left-0 fixed w-full bg-WtB backdrop-blur-sm z-50">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
        <div class="flex justify-between h-16">
          <!-- Desktop Navigation -->
          <div class="hidden sm:flex sm:items-center sm:space-x-8 w-full">
            <!-- Menu Gauche -->
            <div class="flex gap-8 items-center">
              <div class="relative group" @mouseenter="openDropdown('solutions')"
                @mouseleave="delayedCloseDropdown('solutions')">
                <button class="nav-link flex items-center"
                  :class="{ 'active-link': isCurrentPath('/download') || isCurrentPath('/compare') }">
                  {{ t('navbar.solutions') }}
                  <IconChevronDown class="w-4 h-4 ml-1 transition-transform duration-200"
                    :class="{ 'rotate-180': isDropdownOpen('solutions') }" />
                </button>
                <div v-if="isDropdownOpen('solutions')" class="dropdown-menu">
                  <a href="https://web.SuitOps.com" target="_blank" class="dropdown-item">{{
                    t('navbar.webVersion') }}</a>
                  <NuxtLink :to="localePath('/download')" class="dropdown-item"
                    :class="{ 'active-drop': isCurrentPath('/download') }">
                    {{ t('navbar.desktopVersion') }}</NuxtLink>
                  <NuxtLink :to="localePath('/compare')" class="dropdown-item"
                    :class="{ 'active-drop': isCurrentPath('/compare') }">
                    {{ t('navbar.compare') }}</NuxtLink>
                </div>
              </div>

              <NuxtLink :to="localePath('/features')" class="nav-link"
                :class="{ 'active-link': isCurrentPath('/features') }">
                {{ t('navbar.features') }}</NuxtLink>
              <NuxtLink :to="localePath('/offer')" class="nav-link" :class="{ 'active-link': isCurrentPath('/offer') }">
                {{ t('navbar.careers') }}
              </NuxtLink>
              <NuxtLink :to="localePath('/pricings')" class="nav-link"
                :class="{ 'active-link': isCurrentPath('/pricings') }">
                {{ t('navbar.pricing') }}</NuxtLink>
            </div>

            <!-- Logo au centre -->
            <NuxtLink :to="localePath('/')"
              class="flex-shrink-0 items-center justify-center mx-4 hidden lg:block hover:scale-105 hover:opacity-80 transition-transform duration-300">
              <img src="/img/logoDeskCol.png" alt="Logo" class="h-12 w-auto dark:hidden" />
              <img src="/img/logoDeskWhite.png" alt="Logo" class="h-12 w-auto hidden dark:block" />
            </NuxtLink>

            <!-- Menu Droit -->
            <div class="flex gap-8 items-center">
              <div class="relative group" @mouseenter="openDropdown('ressources')"
                @mouseleave="delayedCloseDropdown('ressources')">
                <button class="nav-link flex items-center"
                  :class="{ 'active-link': isCurrentPath('/blog') || isCurrentPath('/forum') }">
                  {{ t('navbar.resources') }}
                  <IconChevronDown class="w-4 h-4 ml-1 transition-transform duration-200"
                    :class="{ 'rotate-180': isDropdownOpen('ressources') }" />
                </button>
                <div v-if="isDropdownOpen('ressources')" class="dropdown-menu">
                  <a href="https://pgsdocs.netlify.app/" target="_blank" class="dropdown-item">{{
                    t('navbar.documentation') }}</a>
                  <NuxtLink :to="localePath('/blog')" class="dropdown-item"
                    :class="{ 'active-drop': isCurrentPath('/blog') }">{{ t('navbar.blog') }}
                  </NuxtLink>
                  <NuxtLink :to="localePath('/forum')" class="dropdown-item"
                    :class="{ 'active-drop': isCurrentPath('/forum') }">{{ t('navbar.forum') }}
                  </NuxtLink>
                </div>
              </div>

              <NuxtLink :to="localePath('/about')" class="nav-link" :class="{ 'active-link': isCurrentPath('/about') }">
                {{ t('navbar.about') }}
              </NuxtLink>
              <a href="https://hire.ctrlengine.com/" target="_blank" class="nav-link">{{ t('navbar.jobOffers') }}</a>
              <NuxtLink :to="localePath('/contact')" class="nav-link" :class="{ 'active-link': isCurrentPath('/contact') }">
                {{ t('navbar.contactUs') }}
              </NuxtLink>
            </div>

            <!-- Bouton de Préférence -->
            <prefSettings />
          </div>

          <!-- Mobile Navigation -->
          <div class="flex items-center sm:hidden w-full justify-between">
            <!-- Logo -->
            <NuxtLink :to="localePath('/')"
              class="flex-shrink-0 flex items-center mx-4 hover:scale-105 hover:opacity-80 transition-transform duration-300">
              <img src="/img/logoMobCol.png" alt="Logo" class="h-12 w-auto dark:hidden" />
              <img src="/img/logoMobWhite.png" alt="Logo" class="h-12 w-auto hidden dark:block" />
            </NuxtLink>

            <!-- Boutons à droite -->
            <div class="flex items-center space-x-2">
              <!-- Bouton de Préférence -->
              <prefSettings />

              <!-- Bouton Hamburger -->
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

        <!-- Panneau Mobile -->
        <Transition name="mobile-menu">
          <div v-if="mobileMenuOpen" class="sm:hidden max-h-screen overflow-y-auto pb-6" ref="mobileMenuRef">
            <div class="pt-2 pb-3 space-y-1">
              <!-- Nos Solutions -->
              <div>
                <button @click="toggleMobileDropdown('solutions')"
                  class="w-full text-left px-3 py-2 font-medium flex items-center justify-between"
                  :class="getMenuItemClass('/download', '/compare')">
                  {{ t('navbar.solutions') }}
                  <IconChevronDown class="w-4 h-4 transform transition-transform duration-200"
                    :class="{ 'rotate-180': mobileDropdowns.solutions }" />
                </button>
                <div v-if="mobileDropdowns.solutions" class="pl-4">
                  <a href="https://web.SuitOps.com" target="_blank" class="block px-3 py-2 hover:text-primary">{{
                    t('navbar.webVersion') }}</a>
                  <NuxtLink :to="localePath('/download')" class="block px-3 py-2 hover:text-primary"
                    :class="getLinkClass('/download')" @click="closeMobileMenu">
                    {{ t('navbar.desktopVersion') }}</NuxtLink>
                  <NuxtLink :to="localePath('/compare')" class="block px-3 py-2 hover:text-primary"
                    :class="getLinkClass('/compare')" @click="closeMobileMenu">
                    {{ t('navbar.compare') }}</NuxtLink>
                </div>
              </div>

              <NuxtLink :to="localePath('/features')" class="block px-3 py-2 hover:text-primary"
                :class="getLinkClass('/features')" @click="closeMobileMenu">
                {{ t('navbar.features') }}</NuxtLink>
              <NuxtLink :to="localePath('/offer')" class="block px-3 py-2 hover:text-primary"
                :class="getLinkClass('/offer')" @click="closeMobileMenu">
                {{ t('navbar.careers') }}</NuxtLink>
              <NuxtLink :to="localePath('/pricings')" class="block px-3 py-2 hover:text-primary"
                :class="getLinkClass('/pricings')" @click="closeMobileMenu">
                {{ t('navbar.pricing') }}</NuxtLink>

              <!-- Ressources -->
              <div>
                <button @click="toggleMobileDropdown('ressources')"
                  class="w-full text-left px-3 py-2 font-medium flex items-center justify-between"
                  :class="getMenuItemClass('/blog', '/forum')">
                  {{ t('navbar.resources') }}
                  <IconChevronDown class="w-4 h-4 transform transition-transform duration-200"
                    :class="{ 'rotate-180': mobileDropdowns.ressources }" />
                </button>

                <div v-if="mobileDropdowns.ressources" class="pl-4">
                  <a href="https://pgsdocs.netlify.app/" target="_blank" class="block px-3 py-2 hover:text-primary">{{
                    t('navbar.documentation') }}</a>
                  <NuxtLink :to="localePath('/blog')" class="block px-3 py-2 hover:text-primary"
                    :class="getLinkClass('/blog')" @click="closeMobileMenu">
                    {{ t('navbar.blog') }}</NuxtLink>
                  <NuxtLink :to="localePath('/forum')" class="block px-3 py-2 hover:text-primary"
                    :class="getLinkClass('/forum')" @click="closeMobileMenu">
                    {{ t('navbar.forum') }}</NuxtLink>
                </div>
              </div>

              <NuxtLink :to="localePath('/about')" class="block px-3 py-2 hover:text-primary"
                :class="getLinkClass('/about')" @click="closeMobileMenu">
                {{ t('navbar.about') }}
              </NuxtLink>
              <a href="https://hire.ctrlengine.com/" target="_blank" class="block px-3 py-2 hover:text-primary">{{
                t('navbar.jobOffers') }}</a>
              <NuxtLink :to="localePath('/contact')" class="block px-3 py-2 hover:text-primary"
                :class="getLinkClass('/contact')" @click="closeMobileMenu">
                {{ t('navbar.contactUs') }}
              </NuxtLink>
            </div>
          </div>
        </Transition>
      </nav>
    </header>

    <!-- Overlay pour fermer le menu mobile -->
    <div v-if="mobileMenuOpen" class="fixed inset-0 bg-black bg-opacity-20 z-40 sm:hidden" @click="closeMobileMenu"
      @touchstart="closeMobileMenu">
    </div>
  </ClientOnly>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { IconChevronDown, IconMenuDeep, IconX, IconPhone, IconMail, IconForms } from '@tabler/icons-vue'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()

// État réactif
const mobileMenuRef = ref(null)

const openDropdowns = reactive({
  solutions: false,
  ressources: false,
})

const closeTimeouts = reactive({})
const mobileMenuOpen = ref(false)
const mobileDropdowns = reactive({
  solutions: false,
  ressources: false,
})

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
  // Fermer aussi les dropdowns mobiles
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
    // Vérifier si le clic n'est pas sur le bouton hamburger
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

const getMenuItemClass = (path1, path2) => {
  return {
    'text-primary': isCurrentPath(path1) || isCurrentPath(path2),
    'text-textClr': !isCurrentPath(path1) && !isCurrentPath(path2)
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
  // Nettoyer les timeouts
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