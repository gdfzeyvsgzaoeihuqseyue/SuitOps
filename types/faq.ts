// Types pour les FAQ et Topics

export interface Platform {
  id: string;
  name: string;
  slug: string;
}

export interface FaqData {
  id: string;
  question: string;
  answer: string;
  order?: number;
  isUseful: number;
  isUseless: number;
  status: 'active' | 'inactive';
  topic?: {
    id: string;
    name: string;
    slug: string;
  };
  platform?: Platform;
}

export interface FaqTopicData {
  id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
  status: 'active' | 'inactive';
  createdAt?: number;
  updatedAt?: number;
  platform?: Platform;
  faqs?: FaqData[];
  faqCount?: number;
}

export interface FaqTopicResponse {
  success: boolean;
  message: string;
  platform?: Platform;
  nb: number;
  data: FaqTopicData[];
}

export interface FaqVoteResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    isUseful: number;
    isUseless: number;
    totalVotes: number;
  };
}
