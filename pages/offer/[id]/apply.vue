<template>
  <main class="bg-gray-50 py-12 mt-8 px-4 sm:px-6 lg:px-8 relative">
    <!-- Breadcrumb -->
    <useBreadcrumb :items="breadcrumbItems" />

    <!-- Colonne gauche -->
    <div class="max-w-7xl mx-auto flex gap-8 relative">
      <aside
        class="bg-white p-6 hidden lg:block w-96 flex-shrink-0 sticky top-24 self-start max-h-[calc(80vh)] overflow-y-auto rounded-2xl shadow-md border mt-6">
        <!-- État de chargement -->
        <Loader v-if="isLoadingJob" />

        <!-- Gestion d'erreur -->
        <div v-else-if="jobError" class="text-center p-8">
          <div class="mb-4">
            <IconMoodCry class="w-12 h-12 mx-auto" />
            <p class="text-danger">{{ jobError }}</p>
          </div>
          <button @click="fetchJobInfo"
            class="px-4 py-2 bg-primary hover:bg-secondary text-white rounded transition-colors">
            Réessayer
          </button>
        </div>

        <!-- Contenu chargé -->
        <div v-else-if="job" class="space-y-4">
          <h3 class="text-xl font-bold text-primary">{{ job.data.post }}</h3>
          <div class="pb-4 pl-4 border-l-2">
            <div class="flex items-center">
              <IconBriefcase class="h-5 w-5 mr-2" /> {{ job.data.contract }}
            </div>
            <div class="flex items-center">
              <IconLocation class="h-5 w-5 mr-2" /> {{ job.data.location }}
            </div>
            <div class="flex items-center">
              <IconUsers class="h-5 w-5 mr-2" /> {{ job.data.placeNumber }} poste{{ job.data.placeNumber > 1 ? 's' : ''
              }}
              disponible{{ job.data.placeNumber > 1 ? 's' : '' }}
            </div>
            <div class="flex items-center">
              <IconCalendarX class="h-5 w-5 mr-2" /> {{ formatDate(job.data.closingDate) }}
            </div>
          </div>

          <h3 class="text-xl font-bold">{{ job.data.company.name }}</h3>
          <div class="pb-4 pl-4 border-l-2">
            <div class="flex items-center">
              <IconStar class="h-5 w-5 mr-2" /> {{ sanitizeText(job.data.company.mainActivity) }}
            </div>
            <div class="flex items-center">
              <IconBuilding class="h-5 w-5 mr-2" /> {{ job.data.company.address }}
            </div>
          </div>
        </div>
      </aside>

      <!-- Colonne droite -->
      <aside class="bg-white flex-1 max-w-4xl mx-auto m-6 p-6 rounded-2xl shadow-md border">
        <!-- En-tête du formulaire -->
        <section class="max-w-4xl mx-auto px-6 text-center mb-8">
          <h1 class="text-3xl font-bold mb-2">Candidature à <span class="text-primary">{{ job?.data?.post ||
            '...' }}</span></h1>
          <p> Veuillez remplir ce formulaire avec attention. Les champs marqués d'un astérisque (<span
              class="text-danger">*</span>) sont obligatoires.</p>
        </section>

        <form @submit.prevent="submitApplication" class="space-y-6">
          <!-- Informations Générales -->
          <section class="bg-gray-50 p-4 rounded-lg">
            <h2 class="text-xl font-semibold mb-4 border-b pb-2">Informations générales</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Nom -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nom <span class="text-danger">*</span>
                </label>
                <input v-model="formData.lastname" type="text" required class="formStyle">
                <span v-if="errors.lastname" class="text-danger text-sm">{{ errors.lastname }}</span>
              </div>
              <!-- Prénom(s) -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Prénom(s) <span
                    class="text-danger">*</span></label>
                <input v-model="formData.firstname" type="text" required class="formStyle">
              </div>
              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"> Email <span class="text-danger">*</span>
                </label>
                <input v-model="formData.emailAddress" type="email" required placeholder="@" readonly
                  class="formStyle bg-gray-200 cursor-not-allowed">
              </div>
              <!-- Sexe -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"> Sexe <span
                    class="text-danger">*</span></label>
                <select v-model="formData.gender" required class="formStyle">
                  <option value="">Sélectionner</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
              </div>
              <!-- Date de naissance -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Date de naissance <span
                    class="text-danger">*</span></label>
                <input v-model="formData.birthdate" type="date" required :max="maxDate" class="formStyle"
                  @change="validateBirthdate">
                <span v-if="errors.birthdate" class="text-danger text-sm">{{ errors.birthdate }}</span>
              </div>

              <!-- Lieu de naissance -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Lieu de naissance <span
                    class="text-danger">*</span></label>
                <input v-model="formData.birthplace" type="text" required class="formStyle">
              </div>
            </div>
          </section>

          <!-- Contacts et Résidences -->
          <section class="bg-gray-50 p-4 rounded-lg">
            <h2 class="text-xl font-semibold mb-4 border-b pb-2">Contacts et résidences</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Téléphone 1 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone 1 <span
                    class="text-danger">*</span></label>
                <input id="phone1" type="tel" required class="formStyle">
                <span v-if="errors.phoneNumber1" class="text-danger text-sm">{{ errors.phoneNumber1 }}</span>
              </div>
              <!-- Téléphone 2 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone 2</label><input id="phone2"
                  type="tel" class="formStyle">
              </div>
              <!-- Pays -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Pays <span
                    class="text-danger">*</span></label>
                <select v-model="formData.country" required class="formStyle">
                  <option value="">Sélectionner un pays</option>
                  <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
                </select>
              </div>
              <!-- Département -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"> Département</label>
                <input v-model="formData.department" type="text" class="formStyle">
              </div>
              <!-- Commune -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Commune</label>
                <input v-model="formData.township" type="text" class="formStyle">
              </div>
              <!-- Ville -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"> Ville <span
                    class="text-danger">*</span></label>
                <input v-model="formData.town" type="text" required class="formStyle">
              </div>
              <!-- Situation matrimoniale -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Situation matrimoniale <span
                    class="text-danger">*</span></label>
                <select v-model="formData.maritalStatus" required class="formStyle">
                  <option value="">Sélectionner</option>
                  <option value="single">Célibataire</option>
                  <option value="libre">Relation libre</option>
                  <option value="Married">Marié</option>
                  <option value="Widow">Veuf/Veuve</option>
                  <option value="Divorced">Divorcé(e)</option>
                </select>
              </div>
              <!-- Nombre d'enfants -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nombre d'enfants <span
                    class="text-danger">*</span></label>
                <input v-model.number="formData.childrenNumber" type="number" required min="0" placeholder="Ex: 5"
                  class="formStyle">
              </div>
            </div>
          </section>

          <!-- Formations et Diplômes -->
          <section class="bg-gray-50 p-4 rounded-lg">
            <h2 class="text-xl font-semibold mb-4 border-b pb-2">Formations et diplômes</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Dernier diplôme -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Dernier diplôme <span
                    class="text-danger">*</span></label>
                <input v-model="formData.lastDiploma" type="text" required placeholder="Ex: BEPC" class="formStyle">
              </div>
              <!-- Date d'obtention -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Date d'obtention <span
                    class="text-danger">*</span></label>
                <input v-model="formData.lastDiplomaDate" type="date" required :max="maxDate" class="formStyle"
                  @change="validateDiplomaDate">
                <span v-if="errors.lastDiplomaDate" class="text-danger text-sm">{{ errors.lastDiplomaDate }}</span>
              </div>

              <!-- Domaine d'étude -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Domaine d'étude <span
                    class="text-danger">*</span></label>
                <input v-model="formData.studyField" type="text" required placeholder="Ex: Maths" class="formStyle">
              </div>
            </div>
          </section>

          <!-- Expériences professionnelles -->
          <section class="bg-gray-50 p-4 rounded-lg">
            <h2 class="text-xl font-semibold mb-4 border-b pb-2">Expériences professionnelles</h2>

            <div v-for="(exp, index) in formData.experiences" :key="index" class="mb-4 p-4 border rounded">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Structure -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"> Structure <span
                      class="text-danger">*</span></label>
                  <input v-model="exp.structure" type="text" required placeholder="Nom de la structure"
                    class="formStyle">
                </div>
                <!-- Durée -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Durée (mois) <span
                      class="text-danger">*</span> </label>
                  <input v-model="exp.duration" type="number" required min="0" placeholder="Ex: 4" class="formStyle">
                </div>
              </div>
              <button v-if="formData.experiences.length > 1" @click="removeItem(formData.experiences, index)"
                type="button" class="mt-2 text-danger text-sm hover:text-red-800 flex items-center">
                <IconTrash class="mr-1" /> Supprimer
              </button>
            </div>
            <button @click="addExperience" type="button"
              class="flex items-center text-primary hover:text-secondary mb-4">
              <span class="mr-1">+ Ajouter une expérience</span>
            </button>
          </section>

          <!-- Informatique -->
          <section class="bg-gray-50 p-4 rounded-lg">
            <h2 class="text-xl font-semibold mb-4 border-b pb-2">Informatique</h2>
            <div v-for="(sw, index) in formData.softwares" :key="index" class="mb-4 p-4 border rounded">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Logiciel -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"> Logiciel <span
                      class="text-danger">*</span></label>
                  <input v-model="sw.software" type="text" required placeholder="Nom du logiciel" class="formStyle">
                </div>
                <!-- Maîtrise -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Maîtrise <span
                      class="text-danger">*</span></label>
                  <select v-model="sw.level" required class="formStyle">
                    <option value="">Sélectionner</option>
                    <option value="Min">Bas</option>
                    <option value="Middle">Moyen</option>
                    <option value="Max">Elevé</option>
                  </select>
                </div>
              </div>
              <button v-if="formData.softwares.length > 1" @click="removeItem(formData.softwares, index)" type="button"
                class="mt-2 text-danger text-sm hover:text-red-800 flex items-center">
                <IconTrash class="mr-1" /> Supprimer
              </button>
            </div>
            <button @click="addSoftware" type="button" class="flex items-center text-primary hover:text-secondary mb-4">
              <span class="mr-1">+ Ajouter un logiciel</span>
            </button>
          </section>

          <!-- Langues -->
          <section class="bg-gray-50 p-4 rounded-lg">
            <h2 class="text-xl font-semibold mb-4 border-b pb-2">Langues</h2>
            <div v-for="(lang, index) in formData.languages" :key="index" class="mb-4 p-4 border rounded">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Langue -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"> Langue <span
                      class="text-danger">*</span>
                  </label>
                  <input v-model="lang.language" type="text" required placeholder="Ex: Anglais" class="formStyle">
                </div>
                <!-- Lecture -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"> Lecture <span
                      class="text-danger">*</span>
                  </label>
                  <select v-model="lang.reading" required class="formStyle">
                    <option value="">Sélectionner</option>
                    <option value="Min">Bas</option>
                    <option value="Middle">Moyen</option>
                    <option value="Max">Elevé</option>
                  </select>
                </div>
                <!-- Écriture -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Écriture <span
                      class="text-danger">*</span></label>
                  <select v-model="lang.writing" required class="formStyle">
                    <option value="">Sélectionner</option>
                    <option value="Min">Bas</option>
                    <option value="Middle">Moyen</option>
                    <option value="Max">Elevé</option>
                  </select>
                </div>
              </div>
              <button v-if="formData.languages.length > 1" @click="removeItem(formData.languages, index)" type="button"
                class="mt-2 text-danger text-sm hover:text-red-800 flex items-center">
                <IconTrash class="mr-1" /> Supprimer
              </button>
            </div>
            <button @click="addLanguage" type="button" class="flex items-center text-primary hover:text-secondary mb-4">
              <span class="mr-1">+ Ajouter une langue</span>
            </button>
          </section>

          <!-- Documents -->
          <section class="bg-gray-50 p-4 rounded-lg">
            <h2 class="text-xl font-semibold mb-4 border-b pb-2">Documents</h2>
            <!-- CNI -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">CNI <span
                  class="text-danger">*</span></label>
              <input type="file" @change="handleFileChange($event, 'cni')" accept=".png,.jpg,.jpeg" required
                class="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/30">
              <p class="mt-1 text-xs text-gray-500">Formats: JPEG, PNG (Max 2MB)</p>
            </div>
            <!-- Photo -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Photo <span
                  class="text-danger">*</span></label>
              <input type="file" @change="handleFileChange($event, 'photo')" accept=".png,.jpg,.jpeg" required
                class="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/30">
              <p class="mt-1 text-xs text-gray-500">Formats: JPEG, PNG (Max 10MB)</p>
            </div>
            <!-- CV -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">CV <span
                  class="text-danger">*</span></label>
              <input type="file" @change="handleFileChange($event, 'cv')" accept=".pdf" required
                class="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/30">
              <p class="mt-1 text-xs text-gray-500">Format: PDF (Max 5MB)</p>
            </div>
            <!-- Autres documents -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Autres documents (Optionnel)</label>
              <input type="file" @change="handleFileChange($event, 'other')" accept=".pdf,.png,.jpg,.jpeg" multiple
                class="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/30">
              <p class="mt-1 text-xs text-gray-500">Formats: PDF, JPEG, PNG (Max 10MB au total, max 5 fichiers)</p>

              <div v-if="files.other && files.other.length > 0" class="mt-2 text-sm">
                Fichiers sélectionnés : {{files.other.map(f => f.name).join(', ')}}
              </div>
            </div>

            <span v-if="errors.documents" class="text-danger text-sm">{{ errors.documents }}</span>
          </section>

          <!-- Boutons -->
          <div class="flex justify-end gap-6">
            <!-- Aperçu -->
            <button v-if="isFormValid" type="button"
              class="disableBtn bg-textClr text-white hover:bg-black focus:ring-textClr disabled:opacity-50 transition-all"
              @click="showPreviewModal = true">
              <IconEye class="mr-1" /> Aperçu
            </button>

            <!-- Soumettre -->
            <button type="submit" :disabled="isLoading"
              class="disableBtn bg-primary text-white hover:bg-secondary focus:ring-blue-500 disabled:opacity-50 transition-all">
              <div v-if="isLoading" class="flex items-center">
                <IconLoader class="mr-1" /> Envoi en cours...
              </div>
              <div v-else class="flex items-center">
                <IconSend class="mr-1" /> Soumettre la candidature
              </div>
            </button>
          </div>
        </form>

        <!-- Modale d'aperçu -->
        <div v-if="showPreviewModal"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col">
            <!-- En-tête -->
            <div class="p-6 border-b flex justify-between items-center">
              <h3 class="text-xl font-bold">Vérification et transmission</h3>
              <button @click="showPreviewModal = false" class="text-gray-500 hover:text-gray-700">
                <IconX
                  class="w-6 h-6 transform transition duration-300 ease-in-out hover:rotate-90 hover:text-danger" />
              </button>
            </div>

            <!-- Contenu -->
            <div class="p-6 overflow-y-auto flex-1 space-y-6">
              <!-- Informations personnelles -->
              <div class="bg-gray-50 p-4 rounded-lg pl-4 border-l-2 border-primary">
                <h4 class="font-semibold mb-3 text-lg">Informations personnelles</h4>
                <!-- Informations générales -->
                <div class="grid grid-cols-2 gap-4 border-l-4 pl-4">
                  <div>
                    <p class="text-sm">Nom</p>
                    <p class="font-bold">{{ formData.lastname }}</p>
                  </div>
                  <div>
                    <p class="text-sm">Prénom(s)</p>
                    <p class="font-bold">{{ formData.firstname }}</p>
                  </div>
                  <div>
                    <p class="text-sm">Email</p>
                    <p class="font-bold">{{ formData.emailAddress }}</p>
                  </div>
                  <div>
                    <div class="text-sm">Sexe</div>
                    <div class="font-bold">{{ formData.gender === 'M' ? 'Masculin' : 'Féminin' }}</div>
                  </div>
                  <div>
                    <div class="text-sm">Date de naissance</div>
                    <div class="font-bold">{{ formData.birthdate }}</div>
                  </div>
                  <div>
                    <div class="text-sm">Lieu de naissance</div>
                    <div class="font-bold">{{ formData.birthplace }}</div>
                  </div>
                </div>

                <div class="py-4"></div>

                <!-- Contacts et résidences -->
                <div class="grid grid-cols-2 gap-4 border-l-4 pl-4">
                  <div>
                    <p class="text-sm">Téléphone 1</p>
                    <p class="font-bold">{{ formData.phoneNumber1 }}</p>
                  </div>
                  <div>
                    <p class="text-sm">Téléphone 2</p>
                    <p class="font-bold">{{ formData.phoneNumber2 || 'Non renseigné' }}</p>
                  </div>
                  <div>
                    <p class="text-sm">Pays</p>
                    <p class="font-bold">{{ formData.country }}</p>
                  </div>
                  <div>
                    <p class="text-sm">Département</p>
                    <p class="font-bold">{{ formData.department || 'Non renseigné' }}</p>
                  </div>
                  <div>
                    <p class="text-sm">Commune</p>
                    <p class="font-bold">{{ formData.township || 'Non renseigné' }}</p>
                  </div>
                  <div>
                    <p class="text-sm">Ville</p>
                    <p class="font-bold">{{ formData.town }}</p>
                  </div>
                  <div>
                    <p class="text-sm">Situation matrimoniale</p>
                    <p class="font-bold">{{ formData.maritalStatus }}</p>
                  </div>
                  <div>
                    <p class="text-sm">Nombre d'enfants</p>
                    <p class="font-bold">{{ formData.childrenNumber }}</p>
                  </div>
                </div>
              </div>

              <!-- Formations & expérience -->
              <div class="bg-gray-50 p-4 rounded-lg pl-4 border-l-2 border-primary">
                <h4 class="font-semibold mb-3 text-lg">Formations & expériences</h4>
                <!-- Formations et diplômes -->
                <div class="grid grid-cols-3 gap-4 border-l-4 pl-4">
                  <div>
                    <p class="text-sm">Diplôme</p>
                    <p class="font-bold">{{ formData.lastDiploma }}</p>
                  </div>
                  <div>
                    <p class="text-sm">Date d'obtention</p>
                    <p class="font-bold">{{ formData.lastDiplomaDate }}</p>
                  </div>
                  <div>
                    <p class="text-sm">Domaine</p>
                    <p class="font-bold">{{ formData.studyField }}</p>
                  </div>
                </div>

                <div class="py-4"></div>

                <!-- Expériences professionnelles -->
                <div v-for="(exp, index) in formData.experiences" :key="index" class="mb-3">
                  <div class="grid grid-cols-2 gap-4 border-l-4 pl-4">
                    <div>
                      <p class="text-sm">Structure #{{ index + 1 }}</p>
                      <p class="font-bold">{{ exp.structure }}</p>
                    </div>
                    <div>
                      <p class="text-sm">Durée (mois)</p>
                      <p class="font-bold">{{ exp.duration }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Informatique & langues -->
              <div class="bg-gray-50 p-4 rounded-lg pl-4 border-l-2 border-primary">
                <h4 class="font-semibold mb-3 text-lg">Informatique & langues</h4>
                <!-- Informatique -->
                <div v-for="(sw, index) in formData.softwares" :key="index" class="mb-3">
                  <div class="grid grid-cols-2 gap-4 border-l-4 pl-4">
                    <div>
                      <p class="text-sm">Logiciel #{{ index + 1 }}</p>
                      <p class="font-bold">{{ sw.software }}</p>
                    </div>
                    <div>
                      <p class="text-sm">Maîtrise</p>
                      <p class="font-bold">{{ sw.level }}</p>
                    </div>
                  </div>
                </div>

                <div class="py-4"></div>

                <!-- Langues -->
                <div v-for="(lang, index) in formData.languages" :key="index" class="mb-3">
                  <div class="grid grid-cols-3 gap-4 border-l-4 pl-4">
                    <div>
                      <p class="text-sm">Langue #{{ index + 1 }}</p>
                      <p class="font-bold">{{ lang.language }}</p>
                    </div>
                    <div>
                      <p class="text-sm">Lire</p>
                      <p class="font-bold">{{ lang.reading }}</p>
                    </div>
                    <div>
                      <p class="text-sm">Ecrire</p>
                      <p class="font-bold">{{ lang.writing }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Documents -->
              <div class="bg-gray-50 p-4 rounded-lg pl-4 border-l-2 border-primary">
                <h4 class="font-semibold mb-3 text-lg">Documents joints</h4>
                <ul class="list-disc pl-5">
                  <li v-if="files.cni">CNI : {{ files.cni.name }}</li>
                  <li v-if="files.photo">Photo : {{ files.photo.name }}</li>
                  <li v-if="files.cv">CV : {{ files.cv.name }}</li>
                  <li v-for="(file, index) in files.other" :key="index">
                    Document supplémentaire #{{ index + 1 }} : {{ file.name }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Boutons -->
            <div class="p-4 border-t flex justify-end gap-4">
              <button @click="showPreviewModal = false"
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                Fermer
              </button>
              <button @click="submitApplication" class="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary"
                :disabled="isLoading">
                Soumettre la candidature
              </button>
            </div>
          </div>
        </div>

        <!-- Messages -->
        <div class="mt-6">
          <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {{ successMessage }}
          </div>
          <div v-if="errors.general" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {{ errors.general }}
          </div>
        </div>
      </aside>
    </div>
  </main>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { IconTrash, IconLoader, IconSend, IconEye, IconX, IconBriefcase, IconLocation, IconUsers, IconCalendarX, IconStar, IconBuilding, IconMoodCry } from '@tabler/icons-vue'
import Loader from '~/components/Load/LJobForm.vue'


// fil d’Ariane
const breadcrumbItems = computed(() => [
  { label: 'Offres', href: '/offer' },
  { label: job.value?.data?.post || "Détails de l'offre", href: `/offer/${route.params.id}/${job.value?.data?.slug}` },
  { label: job.value?.data?.post ? "Postuler" : 'Formulaire de candidature' }
])

// Variables
const route = useRoute()
const jobOfferId = route.params.id
const showPreviewModal = ref(false)

const isLoadingJob = ref(true)
const jobError = ref(null)

const errors = ref({})
const isLoading = ref(false)
const successMessage = ref('')

const countries = ref([])
const addExperience = () => formData.experiences.push({ structure: '', duration: '' })
const addSoftware = () => formData.softwares.push({ software: '', level: '' })
const addLanguage = () => formData.languages.push({ language: '', reading: '', writing: '' })
const removeItem = (array, index) => array.splice(index, 1)


// Récupération des données
const { 
  data: job, 
  execute: refreshJob 
} = await useAsyncData(
  'job',
  async () => {
    try {
      return await $fetch(`https://api.pgs.ctrlengine.com/api/v1/joboffer/${route.params.id}`)
    } catch (error) {
      jobError.value = "Impossible de récupérer les détails de l'offre."
      throw error
    } finally {
      isLoadingJob.value = false
    }
  },
  {
    server: false, 
    immediate: false
  }
)

// Fonction de rechargement
const fetchJobInfo = async () => {
  isLoadingJob.value = true
  jobError.value = null
  try {
    await refreshJob()
  } catch (error) {
  }
}

// Chargement initial
onMounted(fetchJobInfo)

// Date format
const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

// Sanitisation
const sanitizeText = (text) => {
  return text
    ?.replace(/&#39;/g, "'")
    ?.replace(/&amp;/g, "&")
    ?.replace(/&quot;/g, '"')
    || ''
}

// Initialisation du formulaire
const formData = reactive({
  documents: [],
  joboffer: jobOfferId,
  lastname: '',
  firstname: '',
  emailAddress: '',
  gender: '',
  birthdate: '',
  birthplace: '',
  phoneNumber1: '',
  phoneNumber2: '',
  country: 'Bénin',
  department: '',
  township: '',
  town: '',
  maritalStatus: '',
  childrenNumber: 0,
  lastDiploma: '',
  lastDiplomaDate: '',
  studyField: '',
  experiences: [{ structure: '', duration: '' }],
  softwares: [{ software: '', level: '' }],
  languages: [{ language: '', reading: '', writing: '' }]
})


// Auto-remplissage de l'email
if (route.query.email) {
  formData.emailAddress = route.query.email
}

// Validation de date
const maxDate = ref(new Date().toISOString().split('T')[0]);

const validateBirthdate = () => {
  const selectedDate = new Date(formData.birthdate);
  const today = new Date();
  errors.value.birthdate = selectedDate >= today ? 'La naissance doit être antérieure à aujourd\'hui' : '';
};

const validateDiplomaDate = () => {
  const selectedDate = new Date(formData.lastDiplomaDate);
  const today = new Date();
  errors.value.lastDiplomaDate = selectedDate > today ? 'La date ne peut pas être dans le futur' : '';
};

// Validation des numéros de téléphone
const validatePhones = () => {
  if (!formData.phoneNumber1) {
    errors.value.phoneNumber1 = 'Le Téléphone est obligatoire';
    return false;
  }

  const phoneRegex = /^\+\d{8,15}$/;
  if (!phoneRegex.test(formData.phoneNumber1)) {
    errors.value.phoneNumber1 = 'Format invalide, Assurez-vous d\'ajouter l|\indicatif de votre pays';
    return false;
  }

  return true;
};

// Fichiers uploadés
const files = reactive({
  cni: null,
  photo: null,
  cv: null,
  other: []
})

// Gestion des fichiers
const handleFileChange = (event, field) => {
  const file = event.target.files[0];
  const fileSizeLimits = {
    cni: 2 * 1024 * 1024,
    photo: 10 * 1024 * 1024,
    cv: 5 * 1024 * 1024,
    other: 10 * 1024 * 1024
  };

  if (file && file.size > fileSizeLimits[field]) {
    errors.value.documents = `Taille maximale dépassée pour ${field.toUpperCase()} (${fileSizeLimits[field] / 1024 / 1024}MB max)`;
    event.target.value = '';
    return;
  } if (field === 'other') {
    const newFiles = Array.from(event.target.files)
    const updatedFiles = [...files.other, ...newFiles].slice(0, 5)
    const totalSize = updatedFiles.reduce((acc, file) => acc + file.size, 0)
    if (updatedFiles.length > 5) {
      errors.value.documents = 'Maximum 5 fichiers autorisés'
      return
    }
    if (totalSize > 10 * 1024 * 1024) {
      errors.value.documents = 'La taille totale ne doit pas dépasser 10 Mo'
      return
    }
    files.other = updatedFiles
    event.target.value = ''
    errors.value.documents = ''
  } else {
    files[field] = event.target.files[0]
  }
};

// Validité du formulaire
const isFormValid = computed(() => {
  const requiredFieldsValid = [
    formData.lastname?.trim(),
    formData.firstname?.trim(),
    formData.emailAddress?.trim(),
    formData.gender,
    formData.birthdate,
    formData.birthplace?.trim(),
    formData.phoneNumber1?.trim(),
    formData.country,
    formData.town?.trim(),
    formData.maritalStatus,
    formData.childrenNumber >= 0,
    formData.lastDiploma?.trim(),
    formData.lastDiplomaDate,
    formData.studyField?.trim(),
    files.cni,
    files.photo,
    files.cv
  ].every(Boolean)

  const arraysValid = [
    ...formData.experiences.map(exp => exp.structure?.trim() && exp.duration),
    ...formData.softwares.map(sw => sw.software?.trim() && sw.level),
    ...formData.languages.map(lang => lang.language?.trim() && lang.reading && lang.writing)
  ].every(Boolean)

  return requiredFieldsValid && arraysValid
})

// Soumission de la candidature
const submitApplication = async () => {
  if (!validatePhones()) return;

  // Validation des dates côté client
  const today = new Date();
  const birthDate = new Date(formData.birthdate);
  const diplomaDate = new Date(formData.lastDiplomaDate);

  if (birthDate >= today) {
    errors.value.birthdate = 'Date de naissance invalide';
    return;
  }

  if (diplomaDate > today) {
    errors.value.lastDiplomaDate = 'Date d\'obtention invalide';
    return;
  }

  isLoading.value = true
  errors.value = {}
  try {
    // Documents requis
    const documentUploads = []
    for (const [type, file] of Object.entries(files)) {
      if (file && ['cni', 'photo', 'cv'].includes(type)) {
        const docFormData = new FormData()
        docFormData.append('document', file)
        docFormData.append('joboffer', jobOfferId)
        const response = await $fetch('https://api.pgs.ctrlengine.com/api/v1/public/application/add-documents', {
          method: 'POST',
          body: docFormData
        })
        if (response.status) {
          documentUploads.push(response.data.id)
        }
      }
    }
    if (documentUploads.length < 3) {
      throw { message: 'Vous devez fournir votre CNI, votre photo et votre CV.' }
    }
    const payload = {
      ...formData,
      documents: documentUploads.join(','),
      experiences: JSON.stringify(formData.experiences),
      softwares: JSON.stringify(formData.softwares),
      languages: JSON.stringify(formData.languages)
    }
    const applicationResponse = await $fetch('https://api.pgs.ctrlengine.com/api/v1/public/application/add', {
      method: 'POST',
      params: payload
    })
    if (applicationResponse.status) {
      successMessage.value = 'Candidature enregistrée avec succès !'
    }
  } catch (error) {
    if (error.problems) {
      errors.value = error.problems
    } else {
      errors.value.general = error.message || 'Une erreur est survenue lors de la soumission'
    }
  } finally {
    isLoading.value = false
  }
};

// Chargement des pays et initialisation de la gestion téléphonique
onMounted(async () => {
  // Chargement des pays
  try {
    const response = await fetch('https://cdn.jsdelivr.net/gh/mledoze/countries@master/countries.json')
    const data = await response.json()
    countries.value = data
      .map(country => country.translations.fra?.common || country.name.common)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b))
    if (!countries.value.includes('Bénin')) {
      countries.value.unshift('Bénin')
    }
  } catch (error) {
    console.error('Erreur de chargement des pays:', error)
    countries.value = ['Bénin', 'Burkina Faso', 'Côte d\'ivoire', 'Gabon', 'Mali', 'Nigéria', 'Togo'].sort()
  }

  // Chargement dynamique des librairies de téléphone
  const loadPhoneLib = () => new Promise((resolve) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/css/intlTelInput.css'
    document.head.appendChild(link)
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js'
    script.onload = () => {
      const utilsScript = document.createElement('script')
      utilsScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js'
      utilsScript.onload = resolve
      document.head.appendChild(utilsScript)
    }
    document.head.appendChild(script)
  })

  try {
    await loadPhoneLib()
    // Initialisation des champs téléphone
    const initPhoneInputs = () => {
      const phone1 = document.getElementById('phone1')
      const phone2 = document.getElementById('phone2')
      if (phone1 && phone2) {
        const iti1 = window.intlTelInput(phone1, {
          initialCountry: 'BJ',
          utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js'
        })
        const iti2 = window.intlTelInput(phone2, {
          initialCountry: 'BJ',
          utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js'
        })
        phone1.addEventListener('input', () => {
          formData.phoneNumber1 = iti1.getNumber()
        })
        phone2.addEventListener('input', () => {
          formData.phoneNumber2 = iti2.getNumber()
        })
      }
    }
    if (document.readyState === 'complete') {
      initPhoneInputs()
    } else {
      window.addEventListener('load', initPhoneInputs)
    }
  } catch (error) {
    console.error('Erreur de chargement des librairies de téléphone:', error)
  }
})

// Titre de la page
useHead({
  title: `Candidature ${job.value?.data?.post || 'Offre'} | ${job.value?.data?.company?.name || 'Entreprise'}`,
  meta: [{
    name: 'description',
    content: `Postulez à l'offre ${job.value?.data?.post || ''} chez ${job.value?.data?.company?.name || 'cette entreprise'}`
  }]
})
</script>

<style>
.formStyle {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary
}

.disableBtn {
  @apply inline-flex items-center px-6 py-3 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2;
}
</style>