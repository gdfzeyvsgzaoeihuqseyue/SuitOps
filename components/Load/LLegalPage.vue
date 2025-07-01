<template>
  <section class="py-12 px-4 sm:px-6 lg:px-8 relative animate-pulse">
    <!-- Date de mise à jour -->
    <div class="mb-12 text-center">
      <div class="h-4 bg-ash rounded w-48 mx-auto"></div>
    </div>

    <div class="max-w-7xl mx-auto flex gap-8 relative">
      <!-- TOC -->
      <div class="hidden lg:block w-96 flex-shrink-0 sticky top-24 self-start">
        <div class="bg-ash rounded-2xl shadow-xl p-6">
          <div class="h-8 bg-ashAct rounded w-3/4 mb-6"></div>
          <div class="space-y-4">
            <div v-for="i in 5" :key="i" :class="{ 'ml-4': i % 2 === 0, 'ml-8': i % 3 === 0 }">
              <div class="h-4 bg-ashAct rounded" :class="[
                i === 1 ? 'w-full' : '',
                i === 2 ? 'w-4/5' : '',
                i === 3 ? 'w-3/4' : '',
                i === 4 ? 'w-5/6' : '',
                i === 5 ? 'w-2/3' : '']">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contenu -->
      <div class="flex-1">
        <div class="bg-ash rounded-xl shadow-sm p-8 lg:p-12 border border-gray-100">
          <!-- Titre -->
          <div class="h-8 bg-ashAct rounded w-2/3 mb-8"></div>

          <!-- Contenu -->
          <div class="space-y-5">
            <template v-for="i in 8" :key="i">
              <div class="h-4 bg-ashAct rounded" :class="[
                i === 1 ? 'w-full' : '',
                i === 2 ? 'w-5/6' : '',
                i === 3 ? 'w-3/4' : '',
                i === 4 ? 'w-4/5' : '',
                i === 5 ? 'w-11/12' : '',
                i === 6 ? 'w-2/3' : '',
                i === 7 ? 'w-5/6 mb-8' : '',
                i === 8 ? 'w-3/4' : ''
              ]"></div>
            </template>
          </div>

          <!-- Sous-section -->
          <div class="mt-12">
            <div class="h-6 bg-ashAct rounded w-1/2 mb-6"></div>
            <div class="space-y-4">
              <div v-for="i in 3" :key="i" class="h-4 bg-ashAct rounded" :class="[
                i === 1 ? 'w-full' : '',
                i === 2 ? 'w-4/5' : '',
                i === 3 ? 'w-5/6' : ''
              ]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>