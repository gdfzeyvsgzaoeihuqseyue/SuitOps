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
  // Inscription Bêta
  betaRegistration: (betaData) => fetchData('/suitOps/betaRegistration', 'POST', betaData),

 // Sgnalement
  reportCompany: (reportData) => fetchData('/suitOps/reportCompany', 'POST', reportData),
  reportOffer: (reportData) => fetchData('/suitOps/reportOffer', 'POST', reportData),

  // Nombre de téléchargements
  incrementOsDownload: (osName) => fetchData(`/suitOps/OsDownload/${osName}`, 'POST'),
  getAllOsDownloads: () => fetchData('/suitOps/OsDownload', 'GET'),
  getOsDownload: (osName) => fetchData(`/suitOps/OsDownload/${osName}`, 'GET'),
};