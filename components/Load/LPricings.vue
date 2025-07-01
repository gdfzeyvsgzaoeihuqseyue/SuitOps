<template>
    <!-- Contenu -->
    <section class="animate-pulse">
      <!-- En-tête -->
      <div class="text-center mb-12 space-y-4">
        <div class="h-8 bg-ash rounded w-1/4 mx-auto"></div>
        <div class="flex justify-center gap-4">
          <div class="h-6 bg-ash rounded w-16"></div>
          <div class="h-6 bg-ash rounded w-12"></div>
          <div class="h-6 bg-ash rounded w-24"></div>
        </div>
      </div>

      <!-- Cartes de tarification -->
      <div class="grid md:grid-cols-4 gap-6 mb-16">
        <div v-for="i in 4" :key="i" class="bg-ash border-2 rounded-2xl p-8">    
          <!-- En-tête carte -->
          <div class="mb-6 text-center space-y-2">
            <div class="h-6 bg-ashAct rounded w-1/2 mx-auto"></div>
            <div class="h-4 bg-ashAct rounded w-3/4 mx-auto"></div>
          </div>

          <!-- Prix -->
          <div class="h-8 bg-ashAct rounded w-1/2 mx-auto mb-8"></div>

          <!-- Bouton -->
          <div class="h-12 bg-ashAct rounded-lg mb-8"></div>

          <!-- Fonctionnalités -->
          <ul class="space-y-3">
            <li v-for="j in 4" :key="j" class="flex items-center gap-2">
              <div class="h-5 w-5 bg-ashAct rounded-full"></div>
              <div class="h-4 bg-ashAct rounded" :class="[
                j === 1 ? 'w-full' : '',
                j === 2 ? 'w-5/6' : '',
                j === 3 ? 'w-3/4' : '',
                j === 4 ? 'w-2/3' : ''
              ]"></div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Tableau comparatif -->
      <div class="mb-16">
        <div class="h-8 bg-ash rounded w-1/4 mx-auto mb-8"></div>
        
        <div class="overflow-x-auto">
          <div class="min-w-[800px]">
            <!-- En-tête -->
            <div class="grid grid-cols-5 gap-4 mb-4">
              <div class="h-8 bg-ash rounded"></div>
              <div v-for="i in 4" :key="i" class="h-8 bg-ash rounded"></div>
            </div>
            
            <!-- Lignes -->
            <div v-for="i in 4" :key="i" class="grid grid-cols-5 gap-4 py-4">
              <div class="h-6 bg-ash rounded w-3/4"></div>
              <div v-for="j in 4" :key="j" class="h-6 bg-ash rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>
