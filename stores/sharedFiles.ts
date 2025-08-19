import { defineStore } from 'pinia';

type FooterData = { 
  brand: string; 
  brandUrl: string 
}

export const useSharedFiles = defineStore('sharedFiles', () => {
  const runtimeConfig = useRuntimeConfig();
  const BASE_URL = runtimeConfig.public.pgsSharedFiles;

  // Chemins des fichiers
  const paths = {
    // IMAGES
    logo: {
      dc: `${BASE_URL}/Logos/SuitOps-DC.png`,
      dw: `${BASE_URL}/Logos/SuitOps-DW.png`,
      mc: `${BASE_URL}/Logos/SuitOps-MC.png`,
      mw: `${BASE_URL}/Logos/SuitOps-MW.png`,
    },
    hero: {
      about: `${BASE_URL}/SuitOps_Landing/Hero/about.png`,
      blog: `${BASE_URL}/SuitOps_Landing/Hero/blog.png`,
      forum: `${BASE_URL}/SuitOps_Landing/Hero/forum.png`,
      compare: `${BASE_URL}/SuitOps_Landing/Hero/compare.png`,
      download: `${BASE_URL}/SuitOps_Landing/Hero/download.png`,
      faq: `${BASE_URL}/SuitOps_Landing/Hero/faq.png`,
      features: `${BASE_URL}/SuitOps_Landing/Hero/features.png`,
      index: `${BASE_URL}/SuitOps_Landing/Hero/index.png`,
      legal: `${BASE_URL}/SuitOps_Landing/Hero/legal.png`,
      offer: `${BASE_URL}/SuitOps_Landing/Hero/offer.png`,
      pricings: `${BASE_URL}/SuitOps_Landing/Hero/pricings.png`,
      privacy: `${BASE_URL}/SuitOps_Landing/Hero/privacy.png`,
      support: `${BASE_URL}/SuitOps_Landing/Hero/support.png`,
      terms: `${BASE_URL}/SuitOps_Landing/Hero/terms.png`,
    },
    modules: {
      email: `${BASE_URL}/SuitOps_Landing/Modules/email.png`,
      grh: `${BASE_URL}/SuitOps_Landing/Modules/grh.png`,
      docs: `${BASE_URL}/SuitOps_Landing/Modules/docs.png`,
      offers: `${BASE_URL}/SuitOps_Landing/Modules/offers.png`,
      tool: `${BASE_URL}/SuitOps_Landing/Modules/tool.png`,
      pgi: `${BASE_URL}/SuitOps_Landing/Modules/pgi.png`,
    },
    downloadPage: {
      windows: `${BASE_URL}/SuitOps_Landing/Logos/Windows.png`,
      macOs: `${BASE_URL}/SuitOps_Landing/Logos/MacOs.png`,
      linux: `${BASE_URL}/SuitOps_Landing/Logos/Linux.png`,
    },
    general: {
      error404: `${BASE_URL}/General/404Error.png`,
      heroImg: `${BASE_URL}/SuitOps_Landing/Others/HeroImg.png`,
      faq: `${BASE_URL}/SuitOps_Landing/Others/faq.png`,
    },

    //JSON
    data: {
      footer: `${BASE_URL}/JSON/custum.json`
    }
  };

  // Getter pour les données JSON
  async function getFooterData() {
    try {
      return await $fetch<{ brand: string; brandUrl: string }>(paths.data.footer);
    } catch (err) {
      return {
        brand: 'PGS SARL',
        brandUrl: 'https://progestionsoft.org'
      };
    }
  }

  return {
    paths,
    getFooterData
  };
});