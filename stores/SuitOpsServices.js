import { useFetch, useRuntimeConfig } from 'nuxt/app';

const fetchData = async (endpoint, method = 'GET', data = null) => {
  const config = useRuntimeConfig();
  const SUITOPS_URL = config.public.suitOpsBaseAPI;

  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data) : null,
    server: false,
    initialCache: false,
  };

  const { data: response, error } = await useFetch(`${SUITOPS_URL}${endpoint}`, options);

  if (error.value) {
    console.error(`Erreur lors de l'appel à ${endpoint}:`, error.value);
    throw error.value;
  }

  return response.value;
};

export const SuitOpsServices = {
  // Company
  getCompanyById: (id) => fetchData(`/admin/company/${id}`),  

  // FAQ, Comments, Testimonies & Partners
  getAllFaq: () => fetchData('/faq/all'),
  getAllComments: () => fetchData('/comment/all'), // COMMENT = AJOUTER DANS FEEDBACK + REDICTION + AJOUT
  getAllTestimonies: () => fetchData('/public/testimony/all'),
  getAllPartners: () => fetchData('/public/partner/all'),

  // Footer
  getAllFooterLinks: () => fetchData('/public/website/footer/links'),
  getLegal: (type) => fetchData(`/public/website/${type}`),

  // Pricing
  getAllPricing: () => fetchData('/public/pricings/all'),

  // Blog
  getAllBlogPosts: () => fetchData('/public/blog/post/all'),
  getOneBlogPost: (id) => fetchData(`/public/blog/post/${id}`),

  // Jobs
  getAllJobOffers: () => fetchData('/joboffer/all'),
  getOneJobOffer: (id) => fetchData(`/joboffer/${id}`),

  checkEligibility: (id, email) => 
    fetchData(`/public/application/check?joboffer=${id}&emailAddress=${email}`, 'POST'),
  
  submitApplication: (data) => 
    fetchData('/public/applications', 'POST', data),
  
  submitQuiz: (data) => 
    fetchData('/public/applications/quizzes', 'POST', data),

  // Newsletter
  subscribeNewsletter: (lastname, firstname, email) =>
    fetchData(`/public/newsletter/subscribe?lastname=${lastname}&firstname=${firstname}&emailAddress=${email}`, 'POST'),
  unsubscribeNewsletter: (lastname, firstname, email) =>
    fetchData(`/public/newsletter/unsubscribe?lastname=${lastname}&firstname=${firstname}&emailAddress=${email}`, 'POST'),

  // Contact
  sendMessage: (fullname, email, object, message) =>
    fetchData(`/contact/send-message?fullname=${fullname}&emailAddress=${email}&object=${object}&message=${message}`, 'POST'),

  // Forum
  getAllPostStats: () => fetchData('/public/post/stats'),
  getAllPostAll: () => fetchData('/public/post/all'),
  getPostById: (id) => fetchData(`/public/post/${id}`),
  getPostsByCategory: (category) => fetchData(`/public/post/all/${category}`),

  deleteResponse: (responseId) =>
    fetchData(`/admin/post/response/delete/${responseId}`, 'DELETE'),
  
addNewPost: (category, topic, content) =>
  fetchData(`/admin/post/add?category=${category}&topic=${topic}&content=${content}`, 'POST'),

  replyToPost: (postId, content) =>
    fetchData(`/admin/post/reply?id=${postId}&content=${content}`, 'POST'),

  markAsBest: (postId) =>
    fetchData(`/admin/post/response/mark-as-best/${postId}`, 'PUT'),

  deletePost: (postId) =>
    fetchData(`/admin/post/post/delete/${postId}`, 'DELETE'),
};
