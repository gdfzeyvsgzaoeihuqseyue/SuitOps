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
