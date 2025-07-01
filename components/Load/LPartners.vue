<template>
  <section class="overflow-hidden">
    <div class="container mx-auto px-4">
      <div class="relative">
        <!-- Masques dégradés -->
        <div class="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bgClr to-transparent z-10"> </div>
        <div class="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bgClr to-transparent z-10"> </div>

        <!-- Slider -->
        <div class="partner-scroll">
          <div class="scroll-track flex space-x-12">
            <div v-for="i in 8" :key="i">
              <div class="flex-none">
                <div class="bg-ash block w-48 h-24 p-4 m-4 rounded-lg">
                  <div class="bg-ashAct w-full h-full rounded-md animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.partner-scroll {
  overflow-x: hidden;
}

.scroll-track {
  animation: scroll 20s linear infinite;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>