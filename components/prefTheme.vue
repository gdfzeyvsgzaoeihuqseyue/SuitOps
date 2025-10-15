<template>
  <Listbox v-model="colorMode.preference">
    <div class="relative inline-block max-w-[180px] w-auto">
      <ListboxButton
        class="bg-WtB border rounded-md pl-3 pr-10 py-3 w-full text-sm text-left focus:ring-2 focus:ring-primary flex items-center gap-2">
        <component :is="themes.find(t => t.id === colorMode.preference)?.icon" class="w-5 h-5" />
        <span>{{themes.find(t => t.id === colorMode.preference)?.name}}</span>
        <IconChevronDown class="absolute right-3 w-4 h-4" />
      </ListboxButton>

      <ListboxOptions class="absolute mt-1 w-full bg-WtB border rounded-md shadow-lg max-w-[180px]">
        <ListboxOption v-for="theme in themes" :key="theme.id" :value="theme.id"
          class="cursor-pointer hover:bg-primary/10 px-3 py-2 flex items-center gap-2">
          <component :is="theme.icon" class="w-5 h-5" />
          <span>{{ theme.name }}</span>
        </ListboxOption>
      </ListboxOptions>
    </div>
  </Listbox>
</template>

<script setup>
import { ref } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { IconSun, IconMoon, IconPercentage50, IconChevronDown } from '@tabler/icons-vue'

const colorMode = useColorMode()
const themes = [
  { id: 'system', name: 'Système', icon: IconPercentage50 },
  { id: 'light', name: 'Clair', icon: IconSun },
  { id: 'dark', name: 'Sombre', icon: IconMoon }
]
</script>
