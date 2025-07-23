export default defineNuxtRouteMiddleware((to) => {
  const betaMode = process.env.NODE_ENV === 'production' || process.env.NUXT_BETA_MODE === 'true';

  if (betaMode) {
    if (!to.path.startsWith('/beta')) {
      return navigateTo('/beta/soon');
    }
  }
});
