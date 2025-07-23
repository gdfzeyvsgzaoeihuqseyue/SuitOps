<template>
  <div class="min-h-screen bg-WtB text-textClr font-body">
  <NuxtLayout>
    <NuxtPage />
    <BetaPasswordModal />
  </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: '%s | SuitOps',
})
</script>