import { useRuntimeConfig } from '#app';
import { withoutTrailingSlash } from 'ufo';
import { createError } from '#app';

export default defineNuxtRouteMiddleware((to, from) => {
  const config = useRuntimeConfig();
  const isBetaMode = config.public.betaMode;

  // Normalisation du chemin
  const normalizedPath = withoutTrailingSlash(to.path);
  
  // Définit les routes privées par dossier ou par chemin direct
  const isForumRoute = normalizedPath.startsWith('/forum');
  const isBetaRoute = normalizedPath.startsWith('/beta') && !normalizedPath.startsWith('/beta/r');
  const otherPrivateRoutes = ['/compare', '/support', '/aaD', '/aaG']
  const isOtherPrivateRoute = otherPrivateRoutes.includes(normalizedPath)

  // Si le mode bêta est activé ET que la route est privée
  if (isBetaMode && (isForumRoute || isBetaRoute || isOtherPrivateRoute)) {
    throw createError({
      statusCode: 403,
      statusMessage: "Accès Interdit",
      fatal: true,
    });
  }

  // Gère la logique des routes d'enregistrement beta
  if (normalizedPath.startsWith('/beta/r')) {
    const pass = process.client ? localStorage.getItem('beta_pass') : null;
    const expire = process.client ? parseInt(localStorage.getItem('beta_pass_expire') || '0') : 0;

    if (!pass || pass !== config.public.betaRegisterPass || Date.now() > expire) {
      if (process.client) {
        const betaAuth = useState('betaAuth', () => ({ required: true }));
        betaAuth.value.required = true;
      }
    }
  }
});
