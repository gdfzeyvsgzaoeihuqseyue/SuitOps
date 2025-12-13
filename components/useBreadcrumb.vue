<template>
  <div class="m-4">
    <nav class="flex max-w-7xl mx-auto mb-8" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-4">
        <li v-for="(item, index) in breadcrumbItems" :key="index">
          <div :class="index === 0 ? 'flex' : 'flex items-center'">
            <IconChevronRight v-if="index > 0" class="h-5 w-5 text-gray-400" />

            <div v-if="item.href">
              <NuxtLink :to="localePath(item.href)" :class="index === 0
                ? 'hover:text-BtW'
                : 'ml-4 text-sm font-medium hover:text-BtW'">
                <div v-if="index === 0">
                  <span class="sr-only">{{ item.label }}</span>
                  <component :is="item.icon" class="h-5 w-5 flex-shrink-0" />
                </div>
                <span v-else>
                  {{ item.label }}
                </span>
              </NuxtLink>
            </div>

            <div v-else>
              <span class="ml-4 text-sm font-medium">
                {{ item.label }}
              </span>
            </div>
          </div>
        </li>
      </ol>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { IconHome, IconChevronRight } from '@tabler/icons-vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const { t } = useI18n()
const localePath = useLocalePath()

const defaultBreadcrumb = {
  label: t('meta.indexPage.title'),
  href: '/',
  icon: IconHome
}

const breadcrumbItems = computed(() => [defaultBreadcrumb, ...props.items])
</script>