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
            <NuxtLink href="/beta/soon/#features" class="hover:text-blue-600 transition-colors smooth-scroll">
              Fonctionnalités
            </NuxtLink>
          </li>
          <li>
            <NuxtLink href="/beta/soon/#register" class="hover:text-blue-600 transition-colors smooth-scroll">S'inscrire
            </NuxtLink>
          </li>
          <li>
            <NuxtLink href="/beta/soon/#about" class="hover:text-blue-600 transition-colors smooth-scroll">À propos
            </NuxtLink>
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
        <h2 class="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 flex items-center ">
          <IconLogin2 class="mr-3" />
          Inscription
        </h2>
        <p>
          Pour participer à la bêta de SuitOps, vous serez invité à renseigner quelques informations essentielles sur votre entité. Il s'agit du numéro de <strong>Registre du Commerce et du Crédit Mobilier</strong> (RCCM ou équivalent selon votre pays), de votre <strong>Identifiant Fiscal Unique</strong> (IFU) et de votre
          <strong>statut juridique</strong>.

          <br>

          Cependant, nous comprenons que tous les participants à la bêta n'ont pas forcément une entreprise légalement constituée. Si vous êtes un entrepreneur en devenir, une startup en création, une association, une micro-entreprise, un particulier et que <span class="text-orange-600">vous ne disposez pas de ces informations</span>, veuillez renseigner :
        </p>
        <ul class="list-disc list-inside ml-4 mt-2">
          <li><strong>RCCM:</strong> <span class="text-blue-600 font-extrabold">NON-DISPONIBLE</span></li>
          <li><strong>IFU:</strong> <span class="text-blue-600 font-extrabold">000001</span></li>
          <li><strong>STATUT JURIDIQUE:</strong> <span class="text-blue-600 font-extrabold">EI</span></li>
        </ul>
        <p class="mt-4 text-sm text-gray-500 italic">Cela vous permettra d'accéder à toutes les fonctionnalités de la bêta et d'explorer la solution librement.</p>
      </section>

      <!-- Souscription -->
      <section class="mb-10">
        <div class="border-t border-gray-200 pt-6"></div>
        <h2 class="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 flex items-center ">
          <IconWallet class="mr-3" />
          Souscription
        </h2>
        <p class="mb-4">
          Pas besoin d'argent réel pour le moment ! Nous utilisons l'environnement de <strong
            class="text-blue-600">sandbox de Kkiapay</strong> pour que vous puissiez tester toutes les
          fonctionnalités de paiement sans dépenser un centime.
        </p>
        <ol class="list-decimal list-inside space-y-2">
          <li>Rendez-vous sur la page d'abonnement.</li>
          <li>Choisissez l'offre qui vous intéresse.</li>
          <li>Au moment du paiement, sélectionnez l'option <strong>Mobile Money</strong> ou <strong>Carte bancaire</strong>.</li>
          <li>
            Pour simuler un paiement au Bénin, utilisez le numéro <strong class="text-blue-600">0161000000</strong>.
            Pour d'autres pays ou des cartes de crédit de test,
            consultez la documentation Kkiapay :
            <a href="https://docs.kkiapay.me/v1/compte/kkiapay-sandbox-guide-de-test#informations-associees"
              target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">
              Guide Kkiapay Sandbox
            </a>.
          </li>
          <li>Suivez les indications pour finaliser votre abonnement fictif.</li>
        </ol>
        <p class="mt-4 text-sm text-gray-500 italic">Ceci vous permet de tester toutes les fonctionnalités
          payantes sans risque.</p>
      </section>

      <!-- Bug -->
      <section class="mb-10">
        <div class="border-t border-gray-200 pt-6"></div>
        <h2 class="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 flex items-center ">
          <IconBug class="mr-3" />
          Bug
        </h2>
        <p class="mb-4">
          Nous nous efforçons de vous offrir la meilleure expérience possible. Si vous rencontrez un <strong
            class="text-red-600">bug</strong> ou un comportement inattendu, veuillez nous en informer.
        </p>
        <p class="mb-4">
          Soyez le plus précis possible. Incluez si possible les étapes pour reproduire le problème, ce que vous
          attendiez et ce qui s'est réellement passé.
        </p>
        <a href="mailto:progestionsoft@gmail.com" class="text-blue-600 transition-all duration-200 hover:underline"
          target="_blank" rel="noopener noreferrer">Cliquez ici pour signaler un bug
        </a>
      </section>

      <!-- Votre avis -->
      <section>
        <div class="border-t border-gray-200 pt-6"></div>
        <h2 class="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 flex items-center ">
          <IconEmpathize class="mr-3" />
          Votre avis
        </h2>
        <p class="mb-4">
          Votre opinion est précieuse ! Que ce soit une suggestion, une critique ou un simple commentaire, nous sommes à
          l'écoute.
        </p>

        <div class="flex flex-wrap items-center text-center sm:text-left">
          <p class="mr-2">Laissez un </p>
          <a href="https://wa.me/22952535380" class="text-blue-600 transition-all duration-200 hover:underline"
            target="_blank" rel="noopener noreferrer">avis privé
          </a>
          <p class="mx-2">ou un</p>
          <a href="https://chat.whatsapp.com/DQTw6LfDkH8CyM7XE9AVRd?mode=ac_t"
            class="text-blue-600 transition-all duration-200 hover:underline " target="_blank"
            rel="noopener noreferrer">avis public
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