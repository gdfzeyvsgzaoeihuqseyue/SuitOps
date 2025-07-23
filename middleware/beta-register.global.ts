export default defineNuxtRouteMiddleware((to) => {
  if (to.path.startsWith('/beta/r')) {
    const config = useRuntimeConfig();
    const pass = process.client ? localStorage.getItem('beta_pass') : null;
    const expire = process.client ? parseInt(localStorage.getItem('beta_pass_expire') || '0') : 0;

    if (!pass || pass !== config.public.betaRegisterPass || Date.now() > expire) {
      if (process.client) {
        // Déclenche un état global pour afficher le modal
        const betaAuth = useState('betaAuth', () => ({ required: true }));
        betaAuth.value.required = true;
      }
    }
  }
});
