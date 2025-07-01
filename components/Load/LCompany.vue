<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
    <!-- Contenu principal -->
    <div class="bg-ash rounded-lg shadow-lg p-6 md:p-8">
      <!-- En-tête skeleton -->
      <div class="flex flex-col md:flex-row gap-8 items-start mb-8 items-center">
        <div class="w-32 h-32 bg-ashAct rounded-lg"></div>
        <div class="space-y-4 flex-1 w-full">
          <div class="h-8 bg-ashAct rounded w-3/4"></div>
          <div class="h-6 bg-ashAct rounded w-1/3"></div>
        </div>
      </div>

      <!-- Informations principales -->
      <div class="grid md:grid-cols-2 gap-8 mb-8">
        <!-- Coordonnées -->
        <div class="space-y-4">
          <div class="h-6 bg-ashAct rounded w-1/4"></div>
          <div class="space-y-2 border-l-2 pl-4">
            <div class="h-4 bg-ashAct rounded w-3/4"></div>
            <div class="h-4 bg-ashAct rounded w-2/3"></div>
            <div class="h-4 bg-ashAct rounded w-1/2"></div>
          </div>
        </div>

        <!-- Informations légales -->
        <div class="space-y-4">
          <div class="h-6 bg-ashAct rounded w-1/4"></div>
          <div class="space-y-2 border-l-2 pl-4">
            <div class="h-4 bg-ashAct rounded w-3/4"></div>
            <div class="h-4 bg-ashAct rounded w-2/3"></div>
            <div class="h-4 bg-ashAct rounded w-1/2"></div>
          </div>
        </div>
      </div>

      <!-- Activités -->
      <div class="border-t pt-8">
        <div class="h-6 bg-ashAct rounded w-1/6 mb-4"></div>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="bg-ashAct p-4 rounded-lg space-y-2">
            <div class="h-4 bg-ash rounded w-1/3"></div>
            <div class="h-4 bg-ash rounded w-full"></div>
          </div>
          <div class="bg-ashAct p-4 rounded-lg space-y-2">
            <div class="h-4 bg-ash rounded w-1/3"></div>
            <div class="h-4 bg-ash rounded w-full"></div>
          </div>
          <div class="bg-ashAct p-4 rounded-lg space-y-2">
            <div class="h-4 bg-ash rounded w-1/3"></div>
            <div class="h-4 bg-ash rounded w-full"></div>
          </div>
        </div>
      </div>

      <!-- Métadonnées -->
      <div class="border-t pt-8 mt-8 space-y-2">
        <div class="h-4 bg-ashAct rounded w-1/3"></div>
        <div class="h-4 bg-ashAct rounded w-1/4"></div>
      </div>
    </div>
  </section>
</template>
