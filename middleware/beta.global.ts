export default defineNuxtRouteMiddleware((to) => {
  const config = useRuntimeConfig();

  // --- Vérification du mode BETA ---
  // const betaMode = process.env.NODE_ENV === 'production' || process.env.NUXT_BETA_MODE === 'true';
  const betaMode = process.env.NUXT_BETA_MODE === 'true';

  // Pages publiques hors restriction beta
  const publicPaths = [
    /^\/company\/\d+\/[^/]+$/, 
    /^\/privacy$/,
    /^\/terms$/,
    /^\/legal$/,
    /^\/preferences$/,
  ];

  const isPublic = publicPaths.some((pattern) => pattern.test(to.path));

  // --- Redirection si beta activé ---
  if (betaMode && !to.path.startsWith('/beta') && !isPublic) {
    return navigateTo('/beta/soon');
  }

  // --- Vérification pour les routes de registration beta ---
  if (to.path.startsWith('/beta/r')) {
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
