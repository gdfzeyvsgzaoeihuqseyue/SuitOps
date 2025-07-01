<template>
  <main>
    <header class="relative py-24 bg-cover bg-center"
      style="background-image: url('https://raw.githubusercontent.com/ProGestionSoft/Files/main/SuitOps_Landing/Hero/support.png')">
      <div class="absolute inset-0 bg-gradient-to-r from-ash to-ashAct opacity-80"></div>
      <div class="absolute inset-0 backdrop-blur-sm"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-BtW">
        <h1 class="text-5xl md:text-6xl font-bold mb-6" v-motion :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0 }">
          {{ t('supportPage.heroTitle') }}
        </h1>
        <p class="text-xl max-w-2xl md:text-2xl mx-auto">
          {{ t('supportPage.heroSubtitle') }}
        </p>
      </div>
    </header>

    <section class="py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <div class="bg-bgClr rounded-lg p-6 mb-12">
          <h2 class="text-2xl font-semibold text-primary mb-4">{{ t('supportPage.whyTitle') }}</h2>
          <ul class="list-disc list-inside space-y-2 text-secondary">
            <li>{{ t('supportPage.whyBullet1') }}</li>
            <li>{{ t('supportPage.whyBullet2') }}</li>
            <li>{{ t('supportPage.whyBullet3') }}</li>
          </ul>
        </div>

        <form @submit.prevent="handleSubmit" class="bg-WtBAct shadow-lg rounded-lg p-8">
          <label class="block text-sm font-bold mb-4">{{ t('supportPage.supportType') }}</label>
          <div class="relative mb-8">
            <select v-model="formData.supportType" placeholder=" " class="input-floating peer" required>
              <option value="" selected disabled>{{ t('supportPage.selectSupportType') }}</option>
              <option value="financial">{{ t('supportPage.financialSupport') }}</option>
              <option value="technical">{{ t('supportPage.technicalSupport') }}</option>
            </select>
            <label class="label-floating left-3">{{ t('supportPage.supportType') }}</label>
          </div>

          <div v-if="formData.supportType === 'financial'" class="space-y-6">
            <div>
              <label class="flex items-center space-x-2">
                <input type="checkbox" v-model="formData.anonymous" class="border rounded-lg bg-WtB">
                <span>{{ t('supportPage.contributeAnonymously') }}</span>
              </label>
            </div>

            <div v-if="!formData.anonymous" class="space-y-4">
              <div class="relative">
                <IconUser
                  class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 peer-focus:text-primary transition-colors" />
                <input v-model="formData.fullName" type="text" id="fullName" placeholder=" " required
                  class="input-floating peer" />
                <label for="fullName" class="label-floating left-8">
                  {{ t('common.fullnameLabel') }}
                </label>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="relative">
                  <IconMail
                    class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 peer-focus:text-primary transition-colors" />
                  <input v-model="formData.email" type="email" id="email" placeholder=" " required
                    class="input-floating peer" />
                  <label for="email" class="label-floating left-8">
                    {{ t('common.emailLabel') }}
                  </label>
                </div>

                <div class="relative">
                  <IconPhone
                    class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 peer-focus:text-primary transition-colors" />
                  <input v-model="formData.phone" type="tel" id="phone" placeholder=" " class="input-floating peer" />
                  <label for="phone" class="label-floating left-8">
                    {{ t('common.phoneLabel') }}
                  </label>
                </div>
              </div>
            </div>

            <div class="relative">
              <IconBubbleText
                class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 peer-focus:text-primary transition-colors" />
              <textarea id="motivation" v-model="formData.message" rows="4" placeholder=" " class="input-floating peer"
                required></textarea>
              <label for="motivation" class="label-floating left-8">
                {{ t('supportPage.describeMotivation') }}
              </label>
            </div>
          </div>

          <div v-if="formData.supportType === 'technical'" class="space-y-6">
            <label class="block text-sm font-bold mb-4">{{ t('supportPage.howToSupport') }}</label>
            <div class="relative">
              <select v-model="formData.technicalType" placeholder=" " class="input-floating peer" required>
                <option value="" selected disabled>{{ t('supportPage.selectOption') }}</option>
                <option value="volunteer">{{ t('supportPage.volunteer') }}</option>
                <option value="partnership">{{ t('supportPage.partnership') }}</option>
                <option value="solution">{{ t('supportPage.solutionProposal') }}</option>
                <option value="other">{{ t('supportPage.other') }}</option>
              </select>
              <label class="label-floating left-3">{{ t('supportPage.howToSupport') }}</label>
            </div>

            <div v-if="formData.technicalType" class="space-y-4">
              <div class="relative">
                <IconUser
                  class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 peer-focus:text-primary transition-colors" />
                <input v-model="formData.fullName" type="text" id="fullName" placeholder=" " required
                  class="input-floating peer" />
                <label for="fullName" class="label-floating left-8">
                  {{ t('common.fullnameLabel') }} *
                </label>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="relative">
                  <IconMail
                    class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 peer-focus:text-primary transition-colors" />
                  <input v-model="formData.email" type="email" id="email" placeholder=" " required
                    class="input-floating peer" />
                  <label for="email" class="label-floating left-8">
                    {{ t('common.emailLabel') }} *
                  </label>
                </div>
                <div class="relative">
                  <IconPhone
                    class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 peer-focus:text-primary transition-colors" />
                  <input v-model="formData.phone" type="tel" id="phone" placeholder=" " class="input-floating peer" />
                  <label for="phone" class="label-floating left-8">
                    {{ t('common.phoneLabel') }}
                  </label>
                </div>
              </div>
            </div>

            <div v-if="formData.technicalType === 'volunteer'" class="space-y-4">
              <div>
                <label class="block mb-2">{{ t('supportPage.availability') }}</label>
                <div class="space-y-2">
                  <div v-for="(date, index) in formData.availability" :key="index" class="flex gap-2">
                    <div class="relative flex-1">
                      <input id="startDate" type="date" v-model="date.date" required placeholder=" "
                        class="input-floating px-2 peer" />
                      <label for="startDate" class="label-floating left-3">
                        {{ t('common.date') }}
                      </label>
                    </div>
                    <div class="relative">
                      <input id="startTime" type="time" v-model="date.startTime" required placeholder=" "
                        class="input-floating px-2 peer" />
                      <label for="startTime" class="label-floating left-3">
                        {{ t('common.from') }}
                      </label>
                    </div>
                    <div class="relative">
                      <input id="endTime" type="time" v-model="date.endTime" required placeholder=" "
                        class="input-floating px-2 peer" />
                      <label for="endTime" class="label-floating left-3">
                        {{ t('common.to') }}
                      </label>
                    </div>
                    <button v-if="index > 0" @click.prevent="removeAvailability(index)" type="button"
                      class="text-danger hover:text-dangerAct">
                      <IconCircleX />
                    </button>
                  </div>
                  <button @click.prevent="addAvailability" type="button"
                    class="text-primary hover:text-secondary text-sm">
                    {{ t('supportPage.addAvailability') }}
                  </button>
                </div>
              </div>
            </div>

            <div v-if="formData.technicalType === 'partnership'" class="space-y-4">
              <div class="relative">
                <IconBuilding
                  class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 peer-focus:text-primary transition-colors" />
                <input v-model="formData.organization" type="text" id="phone" placeholder=" "
                  class="input-floating peer" />
                <label for="phone" class="label-floating left-8">
                  {{ t('supportPage.organization') }}
                </label>
              </div>
              <div class="relative">
                <IconBubbleText
                  class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 peer-focus:text-primary transition-colors" />
                <textarea id="partnership" v-model="formData.partnershipDetails" rows="4" placeholder=" "
                  class="input-floating peer" required></textarea>
                <label for="partnership" class="label-floating left-8">
                  {{ t('supportPage.describePartnership') }} *
                </label>
              </div>
            </div>

            <div v-if="formData.technicalType === 'solution'" class="space-y-4">
              <div class="relative">
                <select v-model="formData.solutionType" placeholder=" " class="input-floating peer" required>
                  <option value="" selected disabled>{{ t('supportPage.selectOption') }}</option>
                  <option value="link">{{ t('supportPage.externalLink') }}</option>
                  <option value="file">{{ t('supportPage.attachedFile') }}</option>
                </select>
                <label class="label-floating left-3">{{ t('supportPage.submissionMethod') }}</label>
              </div>

              <div v-if="formData.solutionType === 'link'">
                <div class="relative">
                  <IconLink
                    class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 peer-focus:text-primary transition-colors" />
                  <input v-model="formData.solutionLink" type="url" id="url" placeholder=" "
                    class="input-floating peer" />
                  <label for="phone" class="label-floating left-8">
                    {{ t('supportPage.solutionLinkPlaceholder') }}
                  </label>
                </div>
              </div>

              <div v-else>
                <div
                  class="flex flex-col items-center justify-center w-full min-h-[150px] p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200"
                  :class="{
                    'border-primary bg-primary/10 text-primary': isDragging,
                    'border-gray-300 bg-WtB hover:border-primary/50 hover:bg-WtBAct': !isDragging && formData.files.length === 0,
                    'border-green-500 bg-green-50/10 text-green-700': formData.files.length > 0,
                  }" @dragover.prevent="handleDragOver" @dragleave.prevent="handleDragLeave"
                  @drop.prevent="handleDrop" @click="triggerFileInput">
                  <input type="file" ref="fileInput" @change="handleFileUpload" class="hidden"
                    accept=".pdf,.doc,.docx,.xlsx,.pptx" multiple />

                  <div class="text-center w-full">
                    <template v-if="formData.files.length > 0">
                      <IconCircleCheck class="w-10 h-10 mx-auto text-green-500 mb-2" />
                      <p class="font-medium text-lg mb-1">{{ t('supportPage.filesSelected', { count: formData.files.length }) }}</p>
                      <ul class="text-sm text-gray-500 max-h-24 overflow-y-auto">
                        <li v-for="(file, index) in formData.files" :key="index" class="flex items-center justify-between py-1 px-2 bg-WtB rounded-md mb-1">
                          <span>{{ file.name }} ({{ formatBytes(file.size) }})</span>
                          <button @click.stop="removeFile(index)" type="button" class="text-danger hover:text-dangerAct ml-2">
                            <IconTrash class="w-4 h-4" />
                          </button>
                        </li>
                      </ul>
                      <p v-if="fileErrors.length > 0" class="text-danger text-sm mt-2">
                          {{ t('supportPage.fileErrors') }}: {{ fileErrors.join(', ') }}
                      </p>
                    </template>
                    <template v-else>
                      <IconCloudUpload class="w-10 h-10 mx-auto mb-2"
                        :class="isDragging ? 'text-primary' : 'text-gray-400'" />
                      <p class="mb-2 text-lg">
                        <span class="font-semibold">{{ t('supportPage.dragDropFile') }}</span>
                        {{ t('supportPage.or') }}
                        <span class="text-primary hover:underline">{{ t('supportPage.browseFile') }}</span>
                      </p>
                      <p class="text-xs text-gray-500">
                        {{ t('supportPage.acceptedFormatsExtended') }}
                      </p>
                      <p class="text-xs text-gray-500 mt-1">
                        {{ t('supportPage.maxTotalFileSize', { size: formatBytes(MAX_TOTAL_FILE_SIZE), count: MAX_FILES }) }}
                      </p>
                    </template>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="formData.technicalType === 'other'" class="space-y-4">
              <div class="relative">
                <IconBubbleText
                  class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 peer-focus:text-primary transition-colors" />
                <textarea id="details" v-model="formData.details" rows="4" placeholder=" " class="input-floating peer"
                  required></textarea>
                <label for="details" class="label-floating left-8">
                  {{ t('supportPage.detailsOfSupport') }}
                </label>
              </div>
            </div>
          </div>

          <div class="mt-8">
            <button type="submit" :disabled="!isFormValid"
              :class="['w-full py-3 px-6 rounded-lg textClr transition-colors', isFormValid ? 'bg-primary text-WtB hover:bg-secondary' : 'bg-ashAct cursor-not-allowed']">
              {{ t('supportPage.submitButton') }}
            </button>
          </div>
        </form>

        <div class="mt-12 text-center">
          <p>{{ t('supportPage.contactQuestion') }} <a href="mailto:support@example.com"
              class="text-primary hover:text-secondary">support@progestionsoft.com</a></p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  IconUser,
  IconCircleX,
  IconMail,
  IconPhone,
  IconBuilding,
  IconLink,
  IconBubbleText,
  IconCloudUpload,
  IconCircleCheck,
  IconTrash
} from '@tabler/icons-vue'
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const MAX_TOTAL_FILE_SIZE = 10 * 1024 * 1024; 
const MAX_FILES = 5; 

const formData = ref({
  supportType: '',
  anonymous: false,
  fullName: '',
  email: '',
  phone: '',
  message: '',
  technicalType: '',
  availability: [{ date: '', startTime: '', endTime: '' }],
  solutionType: 'link',
  solutionLink: '',
  files: [] as File[], 
  organization: '',
  partnershipDetails: '',
  details: ''
})

const isDragging = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const fileErrors = ref<string[]>([]); 

const addAvailability = () => {
  formData.value.availability.push({ date: '', startTime: '', endTime: '' })
}

const removeAvailability = (index: number) => {
  formData.value.availability.splice(index, 1)
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileUpload = (event: Event) => {
  fileErrors.value = []; 
  const potentialNewFiles = (event.target as HTMLInputElement).files
    ? Array.from((event.target as HTMLInputElement).files!)
    : (event as DragEvent).dataTransfer
      ? Array.from((event as DragEvent).dataTransfer!.files)
      : [];

  if (potentialNewFiles.length === 0) {
    isDragging.value = false;
    return;
  }

  const allowedTypes = [
    'application/pdf',
    'application/msword', // .doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/vnd.ms-excel', // .xls
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/vnd.ms-powerpoint', // .ppt
    'application/vnd.openxmlformats-officedocument.presentationml.presentation' // .pptx
  ];

  let currentTotalSize = formData.value.files.reduce((acc, file) => acc + file.size, 0);
  let filesToProcess: File[] = [];

  potentialNewFiles.forEach(file => {
    let isValid = true;

    if (!allowedTypes.includes(file.type)) {
      fileErrors.value.push(t('supportPage.errorInvalidType', { fileName: file.name }));
      isValid = false;
    }

    if (isValid && (currentTotalSize + file.size) > MAX_TOTAL_FILE_SIZE) {
      fileErrors.value.push(t('supportPage.errorTotalMaxSize', { fileName: file.name, size: formatBytes(MAX_TOTAL_FILE_SIZE) }));
      isValid = false;
    }

    if (isValid && (formData.value.files.length + filesToProcess.length + 1) > MAX_FILES) {
      fileErrors.value.push(t('supportPage.errorMaxFiles', { max: MAX_FILES }));
      isValid = false;
    }

    if (isValid) {
      // Vérifier si le fichier n'est pas déjà présent
      const isDuplicate = formData.value.files.some(
        existingFile => existingFile.name === file.name && existingFile.size === file.size
      ) || filesToProcess.some(
        tempFile => tempFile.name === file.name && tempFile.size === file.size
      );
      if (!isDuplicate) {
        filesToProcess.push(file);
        currentTotalSize += file.size; 
      } else {
        fileErrors.value.push(t('supportPage.errorDuplicateFile', { fileName: file.name }));
      }
    }
  });

  // Ajouter les fichiers validés au tableau formData.files
  formData.value.files.push(...filesToProcess);

  isDragging.value = false;
  // Réinitialiser l'input pour permettre la sélection des mêmes fichiers après suppression
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
  isDragging.value = true;
};

const handleDragLeave = (event: DragEvent) => {
  event.preventDefault();
  isDragging.value = false;
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  handleFileUpload(event);
};

const removeFile = (index: number) => {
  formData.value.files.splice(index, 1);
  // Optionnel : Vous pouvez ré-évaluer les erreurs ici si la suppression d'un fichier résout un problème de taille/nombre
  fileErrors.value = [];
};

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const isFormValid = computed(() => {
  const ft = formData.value
  if (!ft.supportType) return false
  if (ft.supportType === 'financial') {
    if (!ft.anonymous) {
      if (!ft.fullName || !ft.email) return false
    }
    // Message n'est pas requis pour financialSupport
    // if (!ft.message) return false; 
    return true
  }
  if (ft.supportType === 'technical') {
    if (!ft.technicalType) return false
    if (!ft.fullName || !ft.email) return false
    if (ft.technicalType === 'volunteer') {
      return ft.availability.every(a => a.date && a.startTime && a.endTime)
    }
    if (ft.technicalType === 'solution') {
      if (ft.solutionType === 'link' && !ft.solutionLink) return false
      // Vérifie si des fichiers sont attachés ET s'il n'y a pas d'erreurs
      if (ft.solutionType === 'file') {
        const totalSize = ft.files.reduce((acc, file) => acc + file.size, 0);
        return ft.files.length > 0 && fileErrors.value.length === 0 && totalSize <= MAX_TOTAL_FILE_SIZE;
      }
    }
    if (ft.technicalType === 'partnership') {
      if (!ft.organization || !ft.partnershipDetails) return false
    }
    if (ft.technicalType === 'other') {
      if (!ft.details) return false;
    }
    return true
  }
  return false
})

const handleSubmit = () => {
  if (!isFormValid.value) {
    alert(t('supportPage.fillAllRequiredFields'));
    return;
  }

  if (formData.value.supportType === 'financial') {
    const financialForm = {
      anonymous: formData.value.anonymous,
      ...(!formData.value.anonymous && {
        fullName: formData.value.fullName,
        email: formData.value.email,
        phone: formData.value.phone
      }),
      message: formData.value.message
    }
    console.log('Formulaire financier:', financialForm);
    // window.open('/payment-page', '_blank')
  } else {
    console.log('Formulaire de soutien technique:', formData.value)
    // Pour envoyer les fichiers, vous devrez utiliser FormData pour l'envoi multipart/form-data
    const payload = new FormData();
    for (const key in formData.value) {
      // Ignorer les clés non pertinentes pour l'envoi direct ou gérées séparément
      if (key === 'files') {
        formData.value.files.forEach((file, index) => {
          payload.append(`files[${index}]`, file); // Ajoute chaque fichier
        });
      } else if (key === 'availability') {
        payload.append(key, JSON.stringify((formData.value as any)[key]));
      } else if ((formData.value as any)[key] !== null && (formData.value as any)[key] !== '') {
        payload.append(key, String((formData.value as any)[key]));
      }
    }
  }
    // Exemple d'envoi (vous devrez implémenter votre service API)
    // await YourApiService.submitTechnicalSupport(payload);
    // console.log('Payload FormData:', payload); // Pour debug

  // Réinitialiser le formulaire après soumission réussie
  formData.value = {
    supportType: '',
    anonymous: false,
    fullName: '',
    email: '',
    phone: '',
    message: '',
    technicalType: '',
    availability: [{ date: '', startTime: '', endTime: '' }],
    solutionType: 'link',
    solutionLink: '',
    files: [],
    organization: '',
    partnershipDetails: '',
    details: ''
  }
  fileErrors.value = []; // Réinitialiser les erreurs de fichiers
  // L'input file est réinitialisé via la ref et le traitement handleFileUpload
  alert(t('supportPage.formSubmittedSuccessfully'));
}

useHead({
  title: t('supportPage.title'),
})
</script>

<style scoped>
.input {
  @apply w-full p-3 border rounded-lg bg-WtBAct;
}

.input-floating {
  @apply block px-10 pb-2 pt-3 w-full text-sm bg-WtBAct rounded-lg border appearance-none focus:outline-none focus:ring-0 focus:border-primary;
}

.label-floating {
  @apply absolute text-xs sm:text-sm duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] bg-WtBAct px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-4;
}

select {
  @apply px-2 !important;
}
</style>