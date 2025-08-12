// Format de date
export const formatDate = (timestamp, locale = 'fr-FR', options = {}) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleDateString(locale, options);
};


export const formatShotDate = (dateString, locale) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}



export const formatLongDate = (timestamp, locale = 'fr-FR') => {
  return formatDate(timestamp, locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};


export const formatDateTime = (timestamp, locale, t) => {
  if (!timestamp) return 'N/A'

  const date = new Date(timestamp)
  const options = {
    fr: {
      date: { day: '2-digit', month: 'short', year: 'numeric' },
      time: { hour: '2-digit', minute: '2-digit' }
    },
    en: {
      date: { year: 'numeric', month: 'short', day: '2-digit' },
      time: { hour: '2-digit', minute: '2-digit' }
    }
  }

  const currentOptions = options[locale] || options['en']

  const formattedDate = date.toLocaleDateString(locale, currentOptions.date)
  const formattedTime = date.toLocaleTimeString(locale, currentOptions.time)

  return `${formattedDate} ${t('common.at')} ${formattedTime}`
}


// Definition des propriétés
export const isClosingSoon = (timestamp, days = 7) => {
  if (!timestamp) return false;
  const closingDate = new Date(timestamp);
  const today = new Date();
  const diffDays = Math.ceil((closingDate - today) / (1000 * 60 * 60 * 24));
  return diffDays <= days && diffDays >= 0;
};


export const formatCloseDate = (timestamp, locale, t) => {
  if (!timestamp) return 'N/A'
  const date = new Date(timestamp)
  const formattedDate = date.toLocaleDateString(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
  const formattedTime = date.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit'
  })

  return `${formattedDate} ${t('common.at')} ${formattedTime}`
}


export const formattedUpdatedAt = computed(() => {
  if (Content.value && Content.value.updatedAt) {
    const date = new Date(Number(Content.value.updatedAt))
    return date.toLocaleDateString(locale.value, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }
  return ''
})