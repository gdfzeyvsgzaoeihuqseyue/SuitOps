<template>
  <div class="animate-pulse">
    <!-- Titre  -->
    <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mx-auto mb-6"></div>

    <!-- Statistiques -->
    <div class="bg-white p-6 rounded-lg shadow-sm mb-8">
      <div class="flex justify-between">
        <div class="text-center">
          <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 mx-auto mb-2"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mx-auto"></div>
        </div>
        <div class="text-center">
          <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 mx-auto mb-2"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mx-auto"></div>
        </div>
        <div class="text-center">
          <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto mb-2"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40 mx-auto"></div>
        </div>
      </div>
    </div>

    <!-- Filtres -->
    <div class="flex flex-col md:flex-row gap-4 mb-8">
      <div class="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex-grow"></div>
      <div class="flex items-center gap-2">
        <div class="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-32"></div>
        <div class="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-32"></div>
      </div>
    </div>

    <!-- Liste des posts -->
    <div class="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
      <div v-for="i in 4" :key="i" class="bg-white p-6 rounded-lg shadow-sm">
        <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div class="flex items-center justify-between text-sm">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        </div>
      </div>
    </div>
  </div>
</template>
