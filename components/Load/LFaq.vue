<template>
  <!-- Contenu FAQ -->
  <section class="bg-white dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
      <div class="p-16">
        <div class="space-y-12">
        <!-- Catégories -->
        <div v-for="i in 2" :key="i" class="space-y-6">
          <!-- En-tête -->
          <div class="flex justify-between items-center p-2 pb-1 mb-2">
            <div class="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
            <div class="h-8 w-8 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
          </div>

          <div class="pl-4 border-l-2 border-gray-200 dark:border-gray-800 space-y-4">
            <div v-for="j in 3" :key="j" class="space-y-2">
              <!-- Question -->
              <div class="flex justify-between items-center bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg">
                <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                <div class="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              </div>

              <!-- Réponse -->
              <div class="px-3 pt-2 pb-2 space-y-2">
                <div class="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </section>
</template>
