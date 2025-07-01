<template>
  <section>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative">
        <!-- Masques dégradés -->
        <div class="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bgClr to-transparent z-10"></div>
        <div class="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bgClr to-transparent z-10"></div>

        <!-- Skeleton Slider -->
        <div class="flex gap-8 overflow-x-auto pb-8 scroll-smooth testimonials-container">
          <div v-for="i in 3" :key="i" class="bg-ash flex-none w-[400px] rounded-xl shadow-lg p-6">
            <div class="animate-pulse">
              <!-- En-tête -->
              <div class="flex items-center mb-6">
                <div class="w-16 h-16 rounded-full bg-ashAct"></div>
                <div class="ml-4 flex-1">
                  <div class="h-4 bg-ashAct rounded w-3/4 mb-2"></div>
                  <div class="h-3 bg-ashAct rounded w-1/2"></div>
                </div>
              </div>

              <!-- Contenu -->
              <div class="space-y-3">
                <div class="h-3 bg-ashAct rounded"></div>
                <div class="h-3 bg-ashAct rounded w-5/6"></div>
                <div class="h-3 bg-ashAct rounded w-4/6"></div>
                <div class="h-3 bg-ashAct rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonials-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.testimonials-container::-webkit-scrollbar {
  display: none;
}
</style>