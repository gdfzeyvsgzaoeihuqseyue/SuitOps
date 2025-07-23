import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

export function useIframeMode(pageTitleKey: string = 'common.appName', pageTitleFallback: string = 'SuitOps') {
  const route = useRoute()
  const { t } = useI18n()

  const isIframeMode = computed<boolean>(() => route.query.embed === 'true')


  const generateIframeCode = (title?: string, currentPath?: string): string => {
    const iframeSrc = `${window.location.origin}${currentPath || route.fullPath}?embed=true`
    const finalTitle = title || t(pageTitleKey, { default: pageTitleFallback })

    return `
<iframe
  src="${iframeSrc}"
  width="850"
  height="600"
  frameborder="1"
  title="${finalTitle}"
  style="
    max-width: 80%;
    border: 2px solid #ccc;
    border-radius: 12px;
    display: block;
    margin: 2rem auto;
    overflow: hidden;
  "
></iframe>
`.trim()
  }

  return {
    isIframeMode,
    generateIframeCode,
  }
}
