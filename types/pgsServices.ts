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
