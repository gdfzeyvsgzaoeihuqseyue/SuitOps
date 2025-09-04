import { useFetch, useRuntimeConfig } from 'nuxt/app';
import type {
  ApiResponse, CompanyData, FaqItem, FaqTopic, TestimonyData,
  PartnerData, LegalContent, PricingPlan, PricingFeature, PricingData, BlogPostData, JobOfferData, ForumPostStats, ForumPost
} from '@/types';

const fetchData = async <T>(endpoint: string, method: string = 'GET', data: any = null): Promise<ApiResponse<T>> => {
  const config = useRuntimeConfig();
  const SUITOPS_URL = config.public.suitOpsBaseAPI;

  const options: any = {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data) : undefined,
    server: false,
    // initialCache: false, 
  };

  const { data: response, error } = await useFetch<ApiResponse<T>>(`${SUITOPS_URL}${endpoint}`, options);

  if (error.value) {
    console.error(`Erreur lors de l'appel à ${endpoint}:`, error.value);
    throw error.value;
  }

  if (response.value === null) {
    throw new Error(`API returned null for ${endpoint}`);
  }

  return response.value;
};

export const SuitOpsServices = {
  // Company
  getCompanyById: (id: string) => fetchData<CompanyData>(`/admin/company/${id}`),

  // FAQ, Comments, Testimonies & Partners
  getAllFaq: () => fetchData<FaqTopic[]>('/faq/all'),
  getAllComments: () => fetchData<any[]>('/comment/all'), // Adjust type if comment structure is known
  getAllTestimonies: () => fetchData<TestimonyData[]>('/public/testimony/all'),
  getAllPartners: () => fetchData<PartnerData[]>('/public/partner/all'),

  // Footer
  getAllFooterLinks: () => fetchData<any[]>('/public/website/footer/links'),
  getLegal: (type: string) => fetchData<LegalContent>(`/public/website/${type}`),

  // Pricing
  getAllPricing: () => fetchData<PricingData[]>('/public/pricings/all'),

  // Blog
  getAllBlogPosts: () => fetchData<BlogPostData[]>('/public/blog/post/all'),
  getOneBlogPost: (id: string) => fetchData<BlogPostData>(`/public/blog/post/${id}`),

  // Jobs
  getAllJobOffers: () => fetchData<JobOfferData[]>('/joboffer/all'),
  getOneJobOffer: (id: string) => fetchData<JobOfferData>(`/joboffer/${id}`),

  checkEligibility: (id: string, email: string) =>
    fetchData<any>(`/public/application/check?joboffer=${id}&emailAddress=${email}`, 'POST'),

  submitApplication: (data: any) =>
    fetchData<any>('/public/applications', 'POST', data),

  submitQuiz: (data: any) =>
    fetchData<any>('/public/applications/quizzes', 'POST', data),

  // Newsletter
  subscribeNewsletter: (lastname: string, firstname: string, email: string) =>
    fetchData<any>(`/public/newsletter/subscribe?lastname=${lastname}&firstname=${firstname}&emailAddress=${email}`, 'POST'),
  unsubscribeNewsletter: (lastname: string, firstname: string, email: string) =>
    fetchData<any>(`/public/newsletter/unsubscribe?lastname=${lastname}&firstname=${firstname}&emailAddress=${email}`, 'POST'),

  // Contact
  sendMessage: (fullname: string, email: string, object: string, message: string) =>
    fetchData<any>(`/contact/send-message?fullname=${fullname}&emailAddress=${email}&object=${object}&message=${message}`, 'POST'),

  // Forum
  getAllPostStats: () => fetchData<ForumPostStats[]>('/public/post/stats'),
  getAllPostAll: () => fetchData<ForumPost[]>('/public/post/all'),
  getPostById: (id: string) => fetchData<ForumPost>(`/public/post/${id}`),
  getPostsByCategory: (category: string) => fetchData<ForumPost[]>(`/public/post/all/${category}`),

  deleteResponse: (responseId: string) =>
    fetchData<any>(`/admin/post/response/delete/${responseId}`, 'DELETE'),

  addNewPost: (category: string, topic: string, content: string) =>
    fetchData<any>(`/admin/post/add?category=${category}&topic=${topic}&content=${content}`, 'POST'),

  replyToPost: (postId: string, content: string) =>
    fetchData<any>(`/admin/post/reply?id=${postId}&content=${content}`, 'POST'),

  markAsBest: (postId: string) =>
    fetchData<any>(`/admin/post/response/mark-as-best/${postId}`, 'PUT'),

  deletePost: (postId: string) =>
    fetchData<any>(`/admin/post/post/delete/${postId}`, 'DELETE'),
};
