<template>
  <main class="container mx-auto p-8 animate-pulse">
    <!-- Bouton partager -->
    <div class="flex justify-end mb-4">
      <div class="h-10 bg-ashAct rounded w-24"></div>
    </div>

    <!-- En-tête -->
    <div class="relative container mx-auto mb-4 border-y">
      <div class="h-8 bg-ashAct rounded w-3/4 my-4"></div>

      <div class="my-2 text-sm flex flex-wrap gap-4 justify-between">
        <div class="flex items-center gap-2">
          <div class="h-4 bg-ashAct rounded w-24"></div>
          <div class="h-4 bg-ashAct rounded w-32"></div>
          <div class="h-4 bg-ashAct rounded w-20"></div>
        </div>
        <div class="h-4  bg-ashAct rounded w-36"></div>
      </div>
    </div>

    <!-- Contenu -->
    <div class="space-y-4">
      <div v-for="i in 8" :key="i" class="h-4 bg-ashAct rounded" :class="[
        i === 1 ? 'w-full' : '',
        i === 2 ? 'w-5/6' : '',
        i === 3 ? 'w-2/3' : '',
        i === 4 ? 'w-4/5' : '',
        i === 5 ? 'w-3/4' : '',
        i === 6 ? 'w-5/6' : '',
        i === 7 ? 'w-1/2' : '',
        i === 8 ? 'w-3/5' : ''
      ]"></div>
    </div>
  </main>
</template>
