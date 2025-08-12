import { useFetch, useRuntimeConfig } from 'nuxt/app';

const fetchData = async (endpoint, method = 'GET', data = null) => {
  const config = useRuntimeConfig();
  const PGS_URL = config.public.PgsBaseAPI;

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
  betaRegistration: (betaData) => fetchData('/suitops/beta/registration', 'POST', betaData),
  getAllBetaRegistrations: (page = 1, limit = 10) => fetchData(`/suitops/beta/registration?page=${page}&limit=${limit}`),
  getBetaRegistrationById: (id) => fetchData(`/suitops/beta/registration/${id}`),

 // Sgnalement
  reportCompany: (reportData) => fetchData('/suitops/company/report', 'POST', reportData),
  reportOffer: (reportData) => fetchData('/suitops/offer/report', 'POST', reportData),

  // Nombre de téléchargements
  incrementOsDownload: (osName) => fetchData('/suitops/os/download', 'POST', { os: osName }),
  getAllOsDownloads: () => fetchData('/suitops/os/download', 'GET'),
  getOsDownload: (osName) => fetchData(`/suitops/os/download/${osName}`, 'GET'),
};
