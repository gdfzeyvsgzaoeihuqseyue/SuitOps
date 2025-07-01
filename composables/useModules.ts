import { ref } from 'vue'
import { useI18n } from 'vue-i18n' 

export const useModules = () => {
  const { t } = useI18n() 

  const badgeStyles = {
    manage: {
      label: t('modules.badgeManage'),
      bgColor: 'bg-blue-100 dark:bg-blue-200',
      textColor: 'text-blue-500 dark:text-blue-700'
    },
    cloud: {
      label: t('modules.badgeCloud'),
      bgColor: 'bg-orange-100 dark:bg-orange-200',
      textColor: 'text-orange-500 dark:text-orange-700'
    },
    tool: {
      label: t('modules.badgeTool'),
      bgColor: 'bg-green-100 dark:bg-green-200',
      textColor: 'text-green-500 dark:text-green-700'
    },
    finance: {
      label: t('modules.badgeFinance'),
      bgColor: 'bg-purple-100 dark:bg-purple-200',
      textColor: 'text-purple-500 dark:text-purple-700'
    }
  }

  const demoModules = ref([
    {
      id: 1,
      title: t('modules.emailModuleTitle'),
      description: t('modules.emailModuleDescription'),
      features: [
        t('modules.emailModuleFeature1'),
        t('modules.emailModuleFeature2'),
        t('modules.emailModuleFeature3')
      ],
      image: "https://raw.githubusercontent.com/ProGestionSoft/Files/main/SuitOps_Landing/Modules/mail.png",
      badge: badgeStyles.tool
    },
    {
      id: 2,
      title: t('modules.hrModuleTitle'),
      description: t('modules.hrModuleDescription'),
      features: [
        t('modules.hrModuleFeature1'),
        t('modules.hrModuleFeature2'),
        t('modules.hrModuleFeature3')
      ],
      image: "https://raw.githubusercontent.com/ProGestionSoft/Files/main/SuitOps_Landing/Modules/grh.png",
      badge: badgeStyles.manage
    },
    {
      id: 3,
      title: t('modules.documentModuleTitle'),
      description: t('modules.documentModuleDescription'),
      features: [
        t('modules.documentModuleFeature1'),
        t('modules.documentModuleFeature2'),
        t('modules.documentModuleFeature3')
      ],
      image: "https://raw.githubusercontent.com/ProGestionSoft/Files/main/SuitOps_Landing/Modules/docs.png",
      badge: badgeStyles.cloud
    },
    {
      id: 4,
      title: t('modules.recruitmentModuleTitle'),
      description: t('modules.recruitmentModuleDescription'),
      features: [
        t('modules.recruitmentModuleFeature1'),
        t('modules.recruitmentModuleFeature2'),
        t('modules.recruitmentModuleFeature3')
      ],
      image: "https://raw.githubusercontent.com/ProGestionSoft/Files/main/SuitOps_Landing/Modules/offers.png",
      badge: badgeStyles.manage
    },
    {
      id: 5,
      title: t('modules.planningModuleTitle'),
      description: t('modules.planningModuleDescription'),
      features: [
        t('modules.planningModuleFeature1'),
        t('modules.planningModuleFeature2'),
        t('modules.planningModuleFeature3')
      ],
      image: "https://raw.githubusercontent.com/ProGestionSoft/Files/main/SuitOps_Landing/Modules/tool.png",
      badge: badgeStyles.tool
    },
    {
      id: 6,
      title: t('modules.billingModuleTitle'),
      description: t('modules.billingModuleDescription'),
      features: [
        t('modules.billingModuleFeature1'),
        t('modules.billingModuleFeature2'),
        t('modules.billingModuleFeature3')
      ],
      image: "https://raw.githubusercontent.com/ProGestionSoft/Files/main/SuitOps_Landing/Modules/pgi.png",
      badge: badgeStyles.finance
    }
  ])

  return { demoModules }
}