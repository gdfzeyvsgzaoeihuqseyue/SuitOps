<template>
  <div class="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
    <!-- Info affichage -->
    <div class="flex items-center gap-4">
      <span class="text-sm">
        {{ $t('pagination.showing') }} {{ startItem }}-{{ endItem }} {{ $t('pagination.of') }} {{ totalItems }} {{
          $t(itemLabel) }}

      </span>
      <select v-model.number="localItemsPerPage" @change="onItemsPerPageChange"
        class="px-2 py-1 bg-WtB border rounded-lg text-sm">
        <option v-for="opt in perPageOptions" :key="opt" :value="opt">
          {{ opt }} {{ $t('pagination.perPage') }}
        </option>
      </select>
    </div>

    <!-- Boutons de naviguation -->
    <div class="flex gap-2 items-center">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
        class="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
        {{ $t('pagination.previous') }}
      </button>

      <div class="flex gap-1">
        <span v-if="showStartEllipsis" class="flex items-center px-1">...</span>

        <button v-for="page in visiblePages" :key="page" @click="goToPage(page)"
          class="w-8 h-8 flex items-center justify-center border rounded-lg" :class="{
            'bg-primary text-WtB border-primary': page === currentPage,
            'hover:bg-ash': page !== currentPage
          }">
          {{ page }}
        </button>

        <span v-if="showEndEllipsis" class="flex items-center px-1">...</span>
      </div>

      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
        class="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
        {{ $t('pagination.next') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, toRefs, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  totalItems: { type: Number, required: true },
  itemsPerPage: { type: Number, default: 6 },
  currentPage: { type: Number, default: 1 },
  perPageOptions: { type: Array, default: () => [6, 12, 24, 48] },
  maxVisiblePages: { type: Number, default: 5 },
  itemLabel: { type: String, default: 'pagination.items' }
});

const emit = defineEmits(['update:currentPage', 'update:itemsPerPage']);
const localItemsPerPage = ref(props.itemsPerPage);

// Watchers
watch(() => props.itemsPerPage, val => {
  localItemsPerPage.value = val;
});

// Computed
const totalPages = computed(() => Math.ceil(props.totalItems / localItemsPerPage.value));
const startItem = computed(() => {
  if (props.totalItems === 0) return 0;
  return (props.currentPage - 1) * localItemsPerPage.value + 1;
});

const endItem = computed(() => {
  if (props.totalItems === 0) return 0;
  return Math.min(props.currentPage * localItemsPerPage.value, props.totalItems);
});

const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = props.currentPage;
  const maxVisible = props.maxVisiblePages;
  if (total <= maxVisible) {
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }
  let start = Math.max(1, current - Math.floor(maxVisible / 2));
  let end = Math.min(total, start + maxVisible - 1);
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
});

// Afficher des ... 
const showStartEllipsis = computed(() => {
  const firstVisible = visiblePages.value[0];
  return firstVisible > 1;
});

const showEndEllipsis = computed(() => {
  const lastVisible = visiblePages.value[visiblePages.value.length - 1];
  return lastVisible < totalPages.value;
});

// Methodes
function goToPage(page) {
  const validPage = Math.min(Math.max(1, page), totalPages.value);
  emit('update:currentPage', validPage);
}

function onItemsPerPageChange() {
  emit('update:itemsPerPage', localItemsPerPage.value);
  emit('update:currentPage', 1);
}
</script>