<template>
  <main>
    <div class="container mx-auto p-4 animate-pulse">
      <!-- Statistiques -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div v-for="i in 4" :key="i" class="p-4 bg-ash rounded-md">
          <div class="h-8 bg-ashAct rounded w-1/5 mx-auto mb-2"></div>
          <div class="h-4 bg-ashAct rounded w-1/2 mx-auto"></div>
        </div>
      </div>

      <!-- Offres -->
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 my-8">
        <div v-for="i in 3" :key="i" class="border rounded-lg p-6 bg-ash">
          <div class="h-6 bg-ashAct rounded w-3/4 mb-4"></div>
          <div class="flex gap-2 mb-4">
            <div class="h-4 bg-ashAct rounded w-16"></div>
            <div class="h-4 bg-ashAct rounded w-24"></div>
          </div>
          <div class="h-4 bg-ashAct rounded w-2/3 mb-4"></div>
          <div class="space-y-2 mb-4">
            <div class="h-3 bg-ashAct rounded w-full"></div>
            <div class="h-3 bg-ashAct rounded w-5/6"></div>
          </div>
          <div class="h-10 bg-ashAct rounded-md"></div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="mb-4 flex justify-between items-center">
        <div class="h-4 bg-ash rounded w-24"></div>
        <div class="flex gap-2">
          <div class="h-8 bg-ash rounded w-20"></div>
          <div class="h-8 bg-ash rounded w-20"></div>
        </div>
      </div>
    </div>
  </main>
</template>
