<template>
  <div class="lg:col-span-2 space-y-8 animate-pulse">
    <!-- Topic -->
    <div class="mb-8 text-center lg:text-left">
      <div class="inline-block h-8 bg-ashAct rounded-full w-48"></div>
    </div>

    <div class="space-y-4">
      <div v-for="i in 4" :key="i" class="border rounded-lg bg-ash p-4 shadow">
        <!-- Question -->
        <div class="flex justify-between items-center mb-4">
          <div class="h-5 bg-ashAct rounded w-4/5"></div>
          <div class="h-5 w-5 bg-ashAct rounded-full"></div>
        </div>

        <!-- Réponse -->
        <div class="space-y-2">
          <div class="h-3 bg-ashAct rounded w-full"></div>
          <div class="h-3 bg-ashAct rounded w-5/6"></div>
          <div class="h-3 bg-ashAct rounded w-2/3"></div>
        </div>
      </div>
    </div>

    <!-- Bouton -->
    <div class="text-center lg:text-left mt-8">
      <div class="inline-flex items-center h-12 bg-ashAct rounded-lg w-48"></div>
    </div>
  </div>

</template>
