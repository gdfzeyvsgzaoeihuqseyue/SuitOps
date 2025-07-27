<template>
  <header class="bg-white border-b border-gray-200 shadow-sm">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <!-- Logos -->
      <div class="flex items-center space-x-4">
        <img src="/img/logoDeskCol.png" alt="SuitOps" class="h-10 w-auto hidden sm:block" />
        <img src="/img/logoMobCol.png" alt="SuitOps" class="h-10 w-auto sm:hidden" />
      </div>

      <!-- Navigation -->
      <nav>
        <ul class="flex items-center space-x-6 text-sm font-medium text-gray-600">
          <li>
            <NuxtLink href="/beta/soon/#features" class="hover:text-blue-600 transition-colors smooth-scroll">Fonctionnalités
            </NuxtLink>
          </li>
          <li>
            <NuxtLink href="/beta/soon/#register" class="hover:text-blue-600 transition-colors smooth-scroll">S'inscrire</NuxtLink>
          </li>
          <li>
            <NuxtLink href="/beta/soon/#about" class="hover:text-blue-600 transition-colors smooth-scroll">À propos</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="min-h-screen bg-gray-50 text-gray-800 p-6 sm:p-10 text-lg leading-relaxed">
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 sm:p-8">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-center mb-4 text-blue-600">
        Instructions pour participer <br>à la bêta SuitOps 1.0.0
      </h1>

      <!-- Inscription -->
      <section class="mb-10">
        <div class="border-t border-gray-200 pt-6"></div>
        <h2 class="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 flex items-center">
          <IconLogin2 class="mr-3" />
          Inscription
        </h2>
        <p>
          Pour vous inscrire, nous demandons les informations suivantes : 
          <strong class="text-blue-600">numéro de registre de commerce</strong> (RCCM ou équivalent selon votre pays), 
          <strong class="text-blue-600">IFU (Identifiant Fiscal Unique)</strong>, 
          et <strong class="text-blue-600">statut juridique</strong> (ex. EI, SARL, SA).
          <br><br>
          Comme il s’agit d’une version bêta, nous n’exigeons pas de documents officiels. 
          Si vous n’avez pas ces informations, vous pouvez saisir :
        </p>
        <ul class="list-disc list-inside my-4 space-y-1">
          <li><strong>00000</strong> pour l’IFU</li>
          <li><strong>NON DISPONIBLE</strong> pour le RCCM</li>
          <li><strong>EI</strong> pour le statut juridique</li>
        </ul>
        <p>
          Nous voulons faciliter la participation de tous, y compris les entrepreneurs en devenir, les associations, 
          ou toute personne souhaitant découvrir notre solution.
        </p>
      </section>

      <!-- Souscription -->
      <section class="mb-10">
        <div class="border-t border-gray-200 pt-6"></div>
        <h2 class="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 flex items-center">
          <IconWallet class="mr-3" />
          Souscription
        </h2>
        <p class="mb-4">
          Nous utilisons actuellement le <strong class="text-blue-600">mode sandbox de Kkiapay</strong> 
          pour simuler les paiements. Cela vous permet de tester toutes les fonctionnalités sans dépenser d’argent réel.
        </p>
        <ol class="list-decimal list-inside space-y-2">
          <li>Rendez-vous sur la page d'abonnement.</li>
          <li>Choisissez l'offre qui vous intéresse.</li>
          <li>
            Utilisez un numéro ou une carte de test. 
            <span class="text-blue-600">Au Bénin, par exemple, vous pouvez utiliser le numéro <strong>0161000000</strong>.</span>
          </li>
          <li>
            Pour d'autres pays ou des cartes de crédit de test, 
            consultez la documentation Kkiapay : 
            <a href="https://docs.kkiapay.me/v1/compte/kkiapay-sandbox-guide-de-test#informations-associees"
              target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">
              Guide Kkiapay Sandbox
            </a>.
          </li>
        </ol>
        <p class="mt-4 text-sm text-gray-500 italic">
          Ceci vous permet de tester les fonctionnalités payantes sans risque.
        </p>
      </section>

      <!-- Bug -->
      <section class="mb-10">
        <div class="border-t border-gray-200 pt-6"></div>
        <h2 class="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 flex items-center">
          <IconBug class="mr-3" />
          Bug
        </h2>
        <p class="mb-4">
          Nous nous efforçons de vous offrir la meilleure expérience possible. 
          Si vous rencontrez un <strong class="text-red-600">bug</strong> ou un comportement inattendu, 
          veuillez nous en informer.
        </p>
        <p class="mb-4">
          Soyez le plus précis possible. Incluez les étapes pour reproduire le problème, 
          ce que vous attendiez et ce qui s'est réellement passé.
        </p>
        <a href="mailto:progestionsoft@gmail.com" 
           class="text-blue-600 transition-all duration-200 hover:underline"
           target="_blank" rel="noopener noreferrer">
           Cliquez ici pour signaler un bug
        </a>
      </section>

      <!-- Votre avis -->
      <section>
        <div class="border-t border-gray-200 pt-6"></div>
        <h2 class="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 flex items-center">
          <IconEmpathize class="mr-3" />
          Votre avis
        </h2>
        <p class="mb-4">
          Votre opinion est précieuse ! Que ce soit une suggestion, une critique ou un simple commentaire, nous sommes à
          l'écoute.
        </p>

        <div class="flex flex-wrap items-center text-center sm:text-left">
          <p class="mr-2">Laissez un</p>
          <a href="https://wa.me/22952535380"
             class="text-blue-600 transition-all duration-200 hover:underline mr-2"
             target="_blank" rel="noopener noreferrer">
             avis privé
          </a>
          <p class="mr-2">ou un</p>
          <a href="https://chat.whatsapp.com/DQTw6LfDkH8CyM7XE9AVRd?mode=ac_t"
             class="text-blue-600 transition-all duration-200 hover:underline"
             target="_blank" rel="noopener noreferrer">
             avis public
          </a>
        </div>
      </section>

      <p class="text-center text-gray-600 mt-10">
        N'hésitez pas si vous avez d'autres questions !
      </p>
    </div>
  </main>

  <!-- Footer -->
  <footer class="bg-gray-800 py-8 text-white">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <span class="ml-2 text-lg font-bold">SuitOps</span>
        <p class="text-sm text-gray-400 mt-2">{{ new Date().getFullYear() }} SuitOps. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { IconLogin2, IconWallet, IconBug, IconEmpathize } from '@tabler/icons-vue';

definePageMeta({
  layout: false
});
</script>
