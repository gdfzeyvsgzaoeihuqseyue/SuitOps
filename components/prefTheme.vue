<template>
  <div class="relative inline-block w-full">
    <select v-model="colorMode.preference"
      class="appearance-none bg-WtB border rounded-md pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <option value="system">{{ $t('prefSettings.system') }}</option>
      <option value="light">{{ $t('prefSettings.themeLight') }}</option>
      <option value="dark">{{ $t('prefSettings.themeDark') }}</option>
    </select>
    <span class="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
      <IconSun v-if="colorMode.preference === 'light'" class="w-5 h-5" />
      <IconMoon v-else-if="colorMode.preference === 'dark'" class="w-5 h-5" />
      <IconDeviceDesktop v-else class="w-5 h-5" />
    </span>
  </div>
</template>

<script setup>
import { IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-vue'
const colorMode = useColorMode()
</script>
