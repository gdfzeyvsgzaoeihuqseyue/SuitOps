import { useFetch, useRuntimeConfig } from 'nuxt/app';
import type { SuitopsBetaRegistrationData, GetBetaRegistrationResponse, GetAllBetaRegistrationsResponse, GenericApiResponse, OsDownloadStats, BlogPostData, ApiResponse, PartnerData, TestimonyData } from '@/types';

const fetchData = async <T>(endpoint: string, method: string = 'GET', data: any = null): Promise<T> => {
  const config = useRuntimeConfig();
  const PGS_URL = config.public.pgsBaseAPI;

  const options: any = {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data) : undefined,
    server: false
  };

  const { data: fetchedDataRef, error: fetchError } = await useFetch<T>(`${PGS_URL}${endpoint}`, options);

  if (fetchError.value) {
    console.error(`Erreur lors de l'appel à ${endpoint}:`, fetchError.value);
    throw fetchError.value;
  }

  if (fetchedDataRef.value === null || fetchedDataRef.value === undefined) {
    throw new Error(`Impossible d'obtenir les informations sur ${endpoint}.`);
  }

  return fetchedDataRef.value as T;
};

export const PGSServices = {
  // Blog
  getAllBlogPosts: () => fetchData<ApiResponse<BlogPostData[]>>('/blog/article'),
  getOneBlogPost: (slug: string) => fetchData<ApiResponse<BlogPostData>>(`/blog/article/${slug}`),

  // Bêta
  betaRegistration: (betaData: any) => fetchData<GenericApiResponse>('/suitops/beta/registration', 'POST', betaData),
  getAllBetaRegistrations: (page: number = 1, limit: number = 10) => fetchData<GetAllBetaRegistrationsResponse>(`/suitops/beta/registration?page=${page}&limit=${limit}`),
  getBetaRegistrationById: (id: string) => fetchData<GetBetaRegistrationResponse>(`/suitops/beta/registration/${id}`),

  // Signalement
  reportCompany: (reportData: any) => fetchData<GenericApiResponse>('/suitops/company/report', 'POST', reportData),
  reportOffer: (reportData: any) => fetchData<GenericApiResponse>('/suitops/offer/report', 'POST', reportData),

  // Nombre de téléchargements
  incrementOsDownload: (osName: string) => fetchData<GenericApiResponse>('/suitops/os/download', 'POST', { os: osName }),
  getAllOsDownloads: () => fetchData<GenericApiResponse & { data: OsDownloadStats[] }>('/suitops/os/download', 'GET'),
  getOsDownload: (osName: string) => fetchData<GenericApiResponse & { data: OsDownloadStats }>('/suitops/os/download', 'GET'),

  // Partenaires
  getAllSolutionPartners: () => fetchData<ApiResponse<PartnerData[]>>('/solution/partner?limit=100'),

  // Témoignages
  getAllSolutionTestimonies: () => fetchData<ApiResponse<TestimonyData[]>>('/solution/testimony?limit=100'),
};
