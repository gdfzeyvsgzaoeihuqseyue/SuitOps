<template>
  <section class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
      <!-- Articles de blog -->
      <section class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <article v-for="i in 3" :key="i"
          class="bg-ash shadow rounded overflow-hidden flex flex-col">
          <div class="relative">
            <div class="bg-hsa w-full h-48 object-cover"></div>
            <div class="h-4 bg-hsaAct w-1/5 absolute top-0 right-0"></div>
          </div>

          <div class="p-4 flex flex-col flex-grow">
            <!-- Titre -->
            <div class="mb-4">
              <div class="h-4 bg-ashAct rounded mb-2"></div>
              <div class="h-4 bg-ashAct rounded w-3/4 mb-2"></div>
              <div class="border-b"></div>
            </div>

            <!-- MetaDonnées -->
            <div class="flex items-center space-x-4 justify-center mb-4">
              <div class="h-5 w-5 bg-ashAct rounded-full"></div>
              <div class="h-4 bg-ashAct rounded w-1/4"></div>
              <span class="hidden md:block opacity-50">•</span>
              <div class="h-5 w-5 bg-ashAct rounded-full"></div>
              <div class="h-4 bg-ashAct rounded w-1/4"></div>
            </div>

            <!-- Contenu -->
            <div class="space-y-3 mb-4">
              <div class="h-3 bg-ashAct rounded"></div>
              <div class="h-3 bg-ashAct rounded w-5/6"></div>
              <div class="h-3 bg-ashAct rounded w-4/6"></div>
            </div>

            <!-- Bouton -->
            <div class="inline-block flex items-center gap-2 justify-end">
              <div class="h-3 bg-ashAct rounded w-2/5"></div>
              <div class="h-5 w-5 bg-ashAct rounded-full"></div>
            </div>
          </div>
        </article>
      </section>
    </div>
  </section>
</template>
