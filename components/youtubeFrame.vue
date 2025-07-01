<template> 
  <div 
    class="relative rounded-2xl overflow-hidden shadow-2xl"
    v-motion
    :initial="{ opacity: 0, scale: 0.95 }"
    :enter="{ opacity: 1, scale: 1, transition: { delay: 400 } }"
  >
    <div class="FrameContainer">
      <iframe
        src="https://www.youtube.com/embed/KAKnJ42iaKg"
        title="Intro à SuitOps"
        class="w-full h-full"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        loading="lazy"
        aria-label="Vidéo de présentation SuitOps"
        :aria-label="t('common.presentationLabel')">
      </iframe>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style>
.FrameContainer {
  position: relative;
  padding-bottom: 56.25%; 
  height: 0;
  overflow: hidden;
}

.FrameContainer iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>