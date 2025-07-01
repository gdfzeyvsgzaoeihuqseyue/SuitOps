<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
    <!-- FAQ -->
    <div v-for="i in 4" :key="i" class="bg-ash rounded-lg shadow-sm">
      <!-- Question -->
      <div class="flex justify-between items-center p-4 border-b">
        <div class="h-5 bg-ashAct rounded w-4/5"></div>
        <div class="h-5 w-5 bg-ashAct rounded-full"></div>
      </div>

      <!-- Réponse -->
      <div class="p-4 space-y-3">
        <div class="h-3 bg-ashAct rounded w-full"></div>
        <div class="h-3 bg-ashAct rounded w-5/6"></div>
        <div class="h-3 bg-ashAct rounded w-2/3"></div>
      </div>
    </div>
  </div>
</template>