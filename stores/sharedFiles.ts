import { defineStore } from 'pinia';

type FooterData = {
  brand: string;
  brandUrl: string
}

type CustomData = {
  suitops: { url: string }
}

export const useSharedFiles = defineStore('sharedFiles', () => {
  const runtimeConfig = useRuntimeConfig();
  const SHARED_URL = runtimeConfig.public.pgsSharedFiles;
  const GNR_IMG = `${SHARED_URL}/_General/Images`;
  const GNR_DOC = `${SHARED_URL}/_General/Docs`;
  const APP_IMG = `${SHARED_URL}/SuitOps_Landing`;

  // Chemins des fichiers
  const paths = {
    // IMAGES
    logo: {
      dc: `${GNR_IMG}/Logos/SuitOps-DC.png`,
      dw: `${GNR_IMG}/Logos/SuitOps-DW.png`,
      mc: `${GNR_IMG}/Logos/SuitOps-MC.png`,
      mw: `${GNR_IMG}/Logos/SuitOps-MW.png`,
      pgs: `${GNR_IMG}/Logos/PGS-MC.png`,
      noah: `${GNR_IMG}/Logos/NOAH-MC.png`,
    },
    hero: {
      about: `${APP_IMG}/Hero/about.png`,
      blog: `${APP_IMG}/Hero/blog.png`,
      forum: `${APP_IMG}/Hero/forum.png`,
      compare: `${APP_IMG}/Hero/compare.png`,
      download: `${APP_IMG}/Hero/download.png`,
      faq: `${APP_IMG}/Hero/faq.png`,
      features: `${APP_IMG}/Hero/features.png`,
      index: `${APP_IMG}/Hero/index.gif`,
      legal: `${APP_IMG}/Hero/legal.png`,
      offer: `${APP_IMG}/Hero/offer.png`,
      pricings: `${APP_IMG}/Hero/pricings.png`,
      privacy: `${APP_IMG}/Hero/privacy.png`,
      support: `${APP_IMG}/Hero/support.png`,
      terms: `${APP_IMG}/Hero/terms.png`,
    },
    modules: {
      email: `${APP_IMG}/Modules/email.png`,
      grh: `${APP_IMG}/Modules/grh.png`,
      docs: `${APP_IMG}/Modules/docs.png`,
      offers: `${APP_IMG}/Modules/offers.png`,
      tool: `${APP_IMG}/Modules/tool.png`,
      pgi: `${APP_IMG}/Modules/pgi.png`,
    },
    downloadPage: {
      windows: `${APP_IMG}/Logos/Windows.png`,
      macOs: `${APP_IMG}/Logos/MacOs.png`,
      linux: `${APP_IMG}/Logos/Linux.png`,
    },
    general: {
      error403: `${GNR_IMG}/Error/403.png`,
      error404: `${GNR_IMG}/Error/404.png`,
      error500: `${GNR_IMG}/Error/500.png`,
      heroImg: `${APP_IMG}/Others/HeroImg.png`,
      faq: `${APP_IMG}/Others/faq.png`,
    },

    //JSON
    data: {
      footer: `${GNR_DOC}/JSON/pgs.json`,
      custom: `${GNR_DOC}/JSON/custom.json`
    }
  };

  // Getter pour les données JSON
  async function getFooterData() {
    try {
      return await $fetch<FooterData>(paths.data.footer);
    } catch (err) {
      return {
        brand: 'PGS SARL',
        brandUrl: '#'
      };
    }
  }

  async function getBaseUrl() {
    try {
      const customData = await $fetch<CustomData>(paths.data.custom);
      return customData.suitops.url;
    } catch (err) {
      console.error('Erreur lors du chargement des données custom:', err);
      return '#';
    }
  }

  return {
    paths,
    getFooterData,
    getBaseUrl
  };
});
