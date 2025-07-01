import { IconChartPie, IconUsers, IconFolders, IconFile, IconReceipt, IconReceiptTax, IconCalendar, IconBolt, IconBriefcase, IconBrain, IconPresentation, IconCloud, IconClockBolt, IconHeadset } from '@tabler/icons-vue'
import { useI18n } from 'vue-i18n' 

export const useFeatures = () => {
  const { t } = useI18n() 

  const features = [
    {
      icon: IconChartPie,
      title: t('features.businessReportsTitle'),
      description: t('features.businessReportsDescription'),
      bgClass: 'bg-red-50 dark:bg-red-600',
    },
    {
      icon: IconUsers,
      title: t('features.crmTitle'),
      description: t('features.crmDescription'),
      bgClass: 'bg-orange-50 dark:bg-orange-600',
    },
    {
      icon: IconFolders,
      title: t('features.documentManagementTitle'),
      description: t('features.documentManagementDescription'),
      bgClass: 'bg-pink-50 dark:bg-pink-600',
    },
    {
      icon: IconFile,
      title: t('features.payslipEditingTitle'),
      description: t('features.payslipEditingDescription'),
      bgClass: 'bg-yellow-50 dark:bg-yellow-600',
    },
    {
      icon: IconReceipt,
      title: t('features.purchaseInvoicesTitle'),
      description: t('features.purchaseInvoicesDescription'),
      bgClass: 'bg-rose-50 dark:bg-rose-600',
    },
    {
      icon: IconReceiptTax,
      title: t('features.vatSupportTitle'),
      description: t('features.vatSupportDescription'),
      bgClass: 'bg-green-50 dark:bg-green-600',
    },
    {
      icon: IconCalendar,
      title: t('features.superAgendaTitle'),
      description: t('features.superAgendaDescription'),
      bgClass: 'bg-emerald-50 dark:bg-emerald-600',
    },
    {
      icon: IconBolt,
      title: t('features.realTimeCollaborationTitle'),
      description: t('features.realTimeCollaborationDescription'),
      bgClass: 'bg-teal-50 dark:bg-teal-600',
    },
    {
      icon: IconBriefcase,
      title: t('features.recruitersTitle'),
      description: t('features.recruitersDescription'),
      bgClass: 'bg-cyan-50 dark:bg-cyan-600',
    },
    {
      icon: IconBrain,
      title: t('features.brainstormingTestTitle'),
      description: t('features.brainstormingTestDescription'),
      bgClass: 'bg-sky-50 dark:bg-sky-600',
    },
    {
      icon: IconPresentation,
      title: t('features.trainerTitle'),
      description: t('features.trainerDescription'),
      bgClass: 'bg-blue-50 dark:bg-blue-600',
    },
    {
      icon: IconCloud,
      title: t('features.cloudStorageTitle'),
      description: t('features.cloudStorageDescription'),
      bgClass: 'bg-indigo-50 dark:bg-indigo-600',
    },
    {
      icon: IconClockBolt,
      title: t('features.timeManagementTitle'),
      description: t('features.timeManagementDescription'),
      bgClass: 'bg-violet-50 dark:bg-violet-600',
    },
    {
      icon: IconHeadset,
      title: t('features.technicalSupportTitle'),
      description: t('features.technicalSupportDescription'),
      bgClass: 'bg-fuchsia-50 dark:bg-fuchsia-600',
    }
  ]

  const getRandomFeatures = (count: number = 4) => {
    return [...features].sort(() => 0.5 - Math.random()).slice(0, count)
  }

  return { features, getRandomFeatures }
}