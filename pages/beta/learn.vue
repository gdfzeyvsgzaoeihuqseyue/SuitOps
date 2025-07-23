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
        <h2 class="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 flex items-center ">
          <IconLogin2 class="mr-3" />
          Inscription
        </h2>
        <p>
          Vous n'avez pas encore une entreprise légalement constituée, ou vous êtes une association, une
          micro-entreprise, ou un particulier ? Pas de souci ! Vous pouvez tout à fait vous inscrire. Nous avons
          simplifié le processus pour que chacun puisse nous rejoindre facilement.
          <br><br>
          Vous n’avez pas encore une entreprise légalement constituée ? Pas de souci ! La bêta de SuitOps est ouverte
          aux entrepreneurs en devenir, startups en création, ou simplement curieux souhaitant découvrir notre solution.
          Inscrivez-vous librement et commencez à explorer les fonctionnalités, sans contrainte administrative pour le
          moment.
        </p>
      </section>

      <!-- Souscription -->
      <section class="mb-10">
        <div class="border-t border-gray-200 pt-6"></div>
        <h2 class="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 flex items-center ">
          <IconWallet class="mr-3" />
          Souscription
        </h2>
        <p class="mb-4">
          Pas besoin d'argent réel pour le moment ! Nous utilisons un environnement de <strong
            class="text-blue-600">sandbox</strong> pour que vous puissiez tester toutes les
          fonctionnalités sans dépenser un centime.
        </p>
        <ol class="list-decimal list-inside space-y-2">
          <li>Rendez-vous sur la page d'abonnement.</li>
          <li>Choisissez l'offre qui vous intéresse.</li>
          <li>Au moment du paiement, sélectionnez l'option "Sandbox" ou "Mode Test".</li>
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

        <div class="flex items center">
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
