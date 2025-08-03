import { useFetch, useRuntimeConfig } from 'nuxt/app';

const fetchData = async (endpoint, method = 'GET', data = null) => {
  const config = useRuntimeConfig();
  const PGS_URL = config.public.pgsBaseAPI;

  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data) : null,
    server: false,
    initialCache: false,
  };

  const { data: response, error } = await useFetch(`${PGS_URL}${endpoint}`, options);

  if (error.value) {
    console.error(`Erreur lors de l'appel à ${endpoint}:`, error.value);
    throw error.value;
  }

  return response.value;
};

export const PGSServices = {
  // Bêta
  betaRegistration: (betaData) => fetchData('/suitOps/betaRegistration', 'POST', betaData),
  getAllBetaRegistrations: (page = 1, limit = 10) => fetchData(`/suitOps/betaRegistration?page=${page}&limit=${limit}`),
  getBetaRegistrationById: (id) => fetchData(`/suitOps/betaRegistration/${id}`),

 // Sgnalement
  reportCompany: (reportData) => fetchData('/suitOps/reportCompany', 'POST', reportData),
  reportOffer: (reportData) => fetchData('/suitOps/reportOffer', 'POST', reportData),

  // Nombre de téléchargements
  incrementOsDownload: (osName) => fetchData(`/suitOps/OsDownload/${osName}`, 'POST'),
  getAllOsDownloads: () => fetchData('/suitOps/OsDownload', 'GET'),
  getOsDownload: (osName) => fetchData(`/suitOps/OsDownload/${osName}`, 'GET'),
};