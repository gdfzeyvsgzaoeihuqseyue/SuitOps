<template>
  <main class="animate-pulse">
    <section class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Détails de l'offre -->
      <div class="lg:col-span-2 space-y-8">
        <!-- En-tête -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex justify-between mb-4">
            <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-24"></div>
          </div>
          <div class="space-y-4">
            <div class="flex gap-4">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
            </div>
            <div class="flex gap-4">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-36"></div>
            </div>
          </div>
        </div>

        <!-- Contenu de l'offre -->
        <div class="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div v-for="i in 3" :key="i">
            <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <!-- Entreprise -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center mb-4">
            <div class="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div class="ml-4 space-y-2">
              <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            </div>
          </div>
          <div class="space-y-2">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>

        <!-- Carte postuler -->
        <div class="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div class="space-y-2">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
          <div class="flex gap-2">
            <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          </div>
        </div>

         <!-- Carte Action -->
         <div class="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div class="flex items-center space-x-2 justify-around">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          </div>   
        </div>
      </div>
    </section>
  </main>
</template>
