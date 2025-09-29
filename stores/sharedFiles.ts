import { defineStore } from 'pinia';

type FooterData = { 
  brand: string; 
  brandUrl: string 
}

export const useSharedFiles = defineStore('sharedFiles', () => {
  const runtimeConfig = useRuntimeConfig();
  const SHARED_URL = runtimeConfig.public.pgsSharedFiles;

  // Chemins des fichiers
  const paths = {
    // IMAGES
    logo: {
      dc: `${SHARED_URL}/_General/Logos/SuitOps-DC.png`,
      dw: `${SHARED_URL}/_General/Logos/SuitOps-DW.png`,
      mc: `${SHARED_URL}/_General/Logos/SuitOps-MC.png`,
      mw: `${SHARED_URL}/_General/Logos/SuitOps-MW.png`,
      pgs: `${SHARED_URL}/_General/Logos/PGS-MC.png`,
    },
    hero: {
      about: `${SHARED_URL}/SuitOps_Landing/Hero/about.png`,
      blog: `${SHARED_URL}/SuitOps_Landing/Hero/blog.png`,
      forum: `${SHARED_URL}/SuitOps_Landing/Hero/forum.png`,
      compare: `${SHARED_URL}/SuitOps_Landing/Hero/compare.png`,
      download: `${SHARED_URL}/SuitOps_Landing/Hero/download.png`,
      faq: `${SHARED_URL}/SuitOps_Landing/Hero/faq.png`,
      features: `${SHARED_URL}/SuitOps_Landing/Hero/features.png`,
      index: `${SHARED_URL}/SuitOps_Landing/Hero/index.gif`,
      legal: `${SHARED_URL}/SuitOps_Landing/Hero/legal.png`,
      offer: `${SHARED_URL}/SuitOps_Landing/Hero/offer.png`,
      pricings: `${SHARED_URL}/SuitOps_Landing/Hero/pricings.png`,
      privacy: `${SHARED_URL}/SuitOps_Landing/Hero/privacy.png`,
      support: `${SHARED_URL}/SuitOps_Landing/Hero/support.png`,
      terms: `${SHARED_URL}/SuitOps_Landing/Hero/terms.png`,
    },
    modules: {
      email: `${SHARED_URL}/SuitOps_Landing/Modules/email.png`,
      grh: `${SHARED_URL}/SuitOps_Landing/Modules/grh.png`,
      docs: `${SHARED_URL}/SuitOps_Landing/Modules/docs.png`,
      offers: `${SHARED_URL}/SuitOps_Landing/Modules/offers.png`,
      tool: `${SHARED_URL}/SuitOps_Landing/Modules/tool.png`,
      pgi: `${SHARED_URL}/SuitOps_Landing/Modules/pgi.png`,
    },
    downloadPage: {
      windows: `${SHARED_URL}/SuitOps_Landing/_General/Logos/Windows.png`,
      macOs: `${SHARED_URL}/SuitOps_Landing/_General/Logos/MacOs.png`,
      linux: `${SHARED_URL}/SuitOps_Landing/_General/Logos/Linux.png`,
    },
    general: {
      error403: `${SHARED_URL}/_General/Error/403.png`,
      error404: `${SHARED_URL}/_General/Error/404.png`,
      error500: `${SHARED_URL}/_General/Error/500.png`,
      heroImg: `${SHARED_URL}/SuitOps_Landing/Others/HeroImg.png`,
      faq: `${SHARED_URL}/SuitOps_Landing/Others/faq.png`,
    },

    //JSON
    data: {
      footer: `${SHARED_URL}/_Docs/JSON/pgs.json`,
      custom: `${SHARED_URL}/_Docs/JSON/custom.json`
    }
  };

  // Getter pour les données JSON
  async function getFooterData() {
    try {
      return await $fetch<{ brand: string; brandUrl: string }>(paths.data.footer);
    } catch (err) {
      return {
        brand: 'PGS SARL',
        brandUrl: '#'
      };
    }
  }

  async function getBaseUrl() {
    try {
      const data = await $fetch<{ pgs: { url: string } }>(paths.data.custom);
      return data?.pgs?.url || '/';
    } catch {
      return '/';
    }
  }

  return {
    paths,
    getFooterData,
    getBaseUrl
  };
});