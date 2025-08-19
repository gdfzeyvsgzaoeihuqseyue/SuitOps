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
