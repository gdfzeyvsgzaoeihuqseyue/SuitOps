<template>
  <!-- Contenu principal -->
  <section class="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative animate-pulse">
    <!-- Catégories -->
    <div>
      <!-- Titre -->
      <div class="mb-6 text-center">
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto"></div>
      </div>

      <!-- Filtres -->
      <div class="flex flex-col md:flex-row gap-4 mb-8 animate-pulse">
        <div class="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex-grow"></div>
        <div class="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-48"></div>
      </div>

      <!-- Statistiques -->
      <div class="text-center my-4">
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto"></div>
      </div>

      <!-- Liste des catégories -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div v-for="i in 6" :key="i" class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
          <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div class="flex justify-between mb-4">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          </div>
          <div class="border-t pt-4">
            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Derniers sujets -->
    <div>
      <!-- Titre -->
      <div class="mb-6 text-center">
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto"></div>
      </div>

      <!-- Filtres -->
      <div class="flex flex-col md:flex-row gap-4 mb-6 animate-pulse">
        <div class="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex-grow"></div>
        <div class="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-48"></div>
      </div>

      <!-- Contenu -->
      <div class="space-y-4">
        <div v-for="i in 3" :key="i" class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          </div>
          <div class="flex items-center gap-2 flex-wrap">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
