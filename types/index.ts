// ===============================================
// PGS SERVICES
// ===============================================
export interface SuitopsBetaRegistrationData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company?: string | null;
  source: 'social' | 'search' | 'friend' | 'other';
  newsletter: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface GetBetaRegistrationResponse {
  message: string;
    data: SuitopsBetaRegistrationData;
}

export interface GetAllBetaRegistrationsResponse {
  success: boolean;
    message: string;
    nb: number;
    nbOnPage: number;
    currentPage: number;
    totalPages: number;
    data: SuitopsBetaRegistrationData[];
}

export interface GenericApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface OsDownloadStats {
  os: string;
  count: number;
}

// ===============================================
// PREFERENCE
// ===============================================
export interface BetaRegistrationUpdateData {
  firstName?: string;
  lastName?: string;
  company?: string;
  source?: string;
  newsletter?: boolean;
}

export interface VerifyLinkResponse {
  canUpdate: boolean;
  email: string;
  maskedEmail: string;
  data?: BetaRegistrationUpdateData;
}

export interface RequestTotpResponse {
  maskedEmail: string;
}

// ===============================================
// SITE INFO
// ===============================================
export interface SiteInfo {
  id: string;
  title: string;
  message: string;
  targetSites: string[];
  displayType: 'banner' | 'modal' | 'popup' | 'toast';
  position: 'top' | 'bottom' | 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  animationSettings: {
    type: 'slideDown' | string; 
    duration: number;
    autoHide: boolean;
    autoHideDelay: number;
  };
  stylesSettings: {
    backgroundColor: string;
    textColor: string;
    linkColor: string;
    borderColor: string;
    fontSize: string;
    fontWeight: string;
  };
  showCloseButton: boolean;
  showDismissButton: boolean;
  linkSettings: {
    openInNewTab: boolean;
    underline: boolean;
  };
  links: Array<{ url: string; label: string }>;
  startDate?: string; 
  expirationDate?: string; 
  isActive: boolean;
  priority: number;
  createdBy: string;
  stats: {
    views: number;
    clicks: number;
    dismissals: number;
  };
  version: number;
  createdAt: string; 
  updatedAt: string; 
}

// ===============================================
// SOCIAL LINKS
// ===============================================
// Type pour un lien social retourné par le backend
export interface SocialLinkApi {
  id: string;
  media: string;
  link: string;
  createdAt: number;
  updatedAt: number;
}

// Type pour le lien social pour le frontend
export interface SocialLink {
  name: string;
  href: string;
  icon: any;
  title?: string;
}


// ===============================================
// SUITOPS SERVICES
// ===============================================
export interface ApiResponse<T = any> {
  status: boolean;
  message?: string;
  data: T;
  nb?: number; 
}

export interface CompanyData {
  id: string;
  name: string;
  logo?: string;
  emailAddress: string;
  phoneNumber: string;
  address: string;
  ifu: string;
  rccm: string;
  juridicStatus?: { code: string; description: string };
  mainActivity: string;
  secondaryActivity?: string;
  centerOfInterest?: string;
  createdAt: number;
  updatedAt: number;
}

export interface FaqItem {
  createdAt: number;
  updatedAt: number;
  id: number;
  slug: string;
  title: string;
  content: string;
  isUseful: number;
  isUseless: number;
  status: string;
  topic: number;
  createdBy: number;
  lastUpdatedBy: number;
}

export interface FaqTopic {
  faqs: FaqItem[];
  createdAt: number;
  updatedAt: number;
  id: number;
  name: string;
  slug: string;
  status: string;
  createdBy: number;
  lastUpdatedBy: number;
}

export interface TestimonyData {
  id: string;
  lastname: string;
  firstname: string;
  message: string;
  photo?: { url: string };
  createdAt: number;
  updatedAt: number;
}

export interface PartnerData {
  id: string;
  name: string;
  website: string;
  logo?: string;
  createdAt: number;
  updatedAt: number;
  platforms: Array<{ 
    id: string;
    name: string;
    slug: string;
  }>;
}

export interface LegalContent {
  id: string;
  type: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceAnnual: number;
}

export interface PricingFeature {
  id: string;
  name: string;
}

export interface PricingData {
  id: string;
  plan: PricingPlan;
  feature: PricingFeature;
  isBool: boolean;
  value?: boolean;
  description?: string;
  unit?: string;
  maxi?: number;
}

export interface BlogPostData {
  id: string;
  title: string;
  content: string;
  author: string;
  object: string;
  image?: { url: string };
  createdAt: number;
  updatedAt: number;
  slug: string;
}

export interface JobOfferData {
  id: string;
  post: string;
  contract: 'CDI' | 'CDD' | 'STAGE';
  location: string;
  placeNumber: number;
  profile: string;
  closingDate: number;
  createdAt: number;
  updatedAt: number;
  slug: string;
  company: CompanyData; 
  summary?: string;
  tasks?: string;
  skills?: string;
  aptitudes?: string;
  requiredDocument?: string;
  email: string; 
  contact: string;
  status: 'opened' | 'closed'; 
  quizzes?: any[]; 
}

export interface ForumPostStats {
  category: string;
  posts: number;
  responses: number;
  lastPost?: {
    id: string;
    content: string;
    createdAt: number;
  };
}

export interface ForumPost {
  id: string;
  content: string;
  topic: string;
  category: string;
  company: {
    id: string;
    name: string;
  };
  responses?: ForumResponse[];
  createdAt: number;
  updatedAt: number;
  owner?: boolean;
}

export interface ForumResponse {
  id: string;
  content: string;
  company: {
    id: string;
    name: string;
  };
  isSolution?: boolean;
  createdAt: number;
  updatedAt: number;
  files?: { id: string; name: string; url: string }[];
}
