<template>
  <div 
    class="logo-loader-inline" 
    :class="[
      { 'fullscreen': fullscreen },
      `size-${size}`
    ]"
  >
    <div class="logo-wrapper">
      <svg 
        viewBox="0 0 1080 1080" 
        xmlns="http://www.w3.org/2000/svg"
        class="animated-logo"
      >
        <!-- Centre blanc pour l'espacement -->
        <circle cx="540" cy="540" r="520" fill="none"/>
        
        <!-- Quart supérieur gauche (grand) -->
        <path 
          class="segment segment-1"
          d="M 540 540 L 540 50 A 490 490 0 0 1 1000 540 Z"
          fill="#0078D4"
        />
        
        <!-- Quart supérieur droit (petit) -->
        <path 
          class="segment segment-2"
          d="M 540 540 L 1000 540 A 240 240 0 0 1 780 780 Z"
          fill="#0066B8"
        />
        
        <!-- Quart inférieur gauche (très grand) -->
        <path 
          class="segment segment-3"
          d="M 540 540 L 100 540 A 490 490 0 0 1 540 50 Z"
          fill="#005A9E"
        />
        
        <!-- Quart inférieur droit (moyen) -->
        <path 
          class="segment segment-4"
          d="M 540 540 L 780 780 A 340 340 0 0 1 540 1030 A 490 490 0 0 1 100 540 Z"
          fill="#004578"
        />
      </svg>
      
      <div class="pulse-ring"></div>
    </div>
    
    <p v-if="showText" class="loading-text">{{ text }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  fullscreen: {
    type: Boolean,
    default: false
  },
  showText: {
    type: Boolean,
    default: true
  },
  text: {
    type: String,
    default: 'Chargement...'
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})

defineEmits(['loaded'])
</script>

<style scoped>
/* Version inline (par défaut) */
.logo-loader-inline {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  min-height: 200px;
}

/* Version fullscreen (optionnelle) */
.logo-loader-inline.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  z-index: 9999;
  padding: 0;
  min-height: 100vh;
}

.logo-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.animated-logo {
  width: 80px;
  height: 80px;
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.15));
}

/* Tailles personnalisables */
.logo-loader-inline.size-sm .animated-logo {
  width: 50px;
  height: 50px;
}

.logo-loader-inline.size-sm .pulse-ring {
  width: 50px;
  height: 50px;
}

.logo-loader-inline.size-md .animated-logo {
  width: 80px;
  height: 80px;
}

.logo-loader-inline.size-md .pulse-ring {
  width: 80px;
  height: 80px;
}

.logo-loader-inline.size-lg .animated-logo {
  width: 120px;
  height: 120px;
}

.logo-loader-inline.size-lg .pulse-ring {
  width: 120px;
  height: 120px;
}

.logo-loader-inline.fullscreen .animated-logo {
  width: 200px;
  height: 200px;
}

.logo-loader-inline.fullscreen .pulse-ring {
  width: 200px;
  height: 200px;
  border-width: 3px;
}

/* Animation globale de rotation */
.animated-logo {
  animation: rotateIn 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

@keyframes rotateIn {
  0% {
    transform: rotate(-180deg) scale(0);
    opacity: 0;
  }
  100% {
    transform: rotate(0deg) scale(1);
    opacity: 1;
  }
}

/* Animation de chaque segment */
.segment {
  transform-origin: 540px 540px;
  opacity: 0;
}

.segment-1 {
  animation: 
    fadeInSegment 0.5s ease-out 0.3s forwards,
    pulseSegment 2s ease-in-out 1.3s infinite;
}

.segment-2 {
  animation: 
    fadeInSegment 0.5s ease-out 0.5s forwards,
    pulseSegment 2s ease-in-out 1.5s infinite;
}

.segment-3 {
  animation: 
    fadeInSegment 0.5s ease-out 0.7s forwards,
    pulseSegment 2s ease-in-out 1.7s infinite;
}

.segment-4 {
  animation: 
    fadeInSegment 0.5s ease-out 0.9s forwards,
    pulseSegment 2s ease-in-out 1.9s infinite;
}

@keyframes fadeInSegment {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pulseSegment {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.85;
  }
}

/* Anneau de pulsation */
.pulse-ring {
  position: absolute;
  width: 80px;
  height: 80px;
  border: 2px solid #0078D4;
  border-radius: 50%;
  opacity: 0;
  animation: pulseRing 2s cubic-bezier(0.215, 0.61, 0.355, 1) 1s infinite;
}

@keyframes pulseRing {
  0% {
    transform: scale(0.95);
    opacity: 0;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

/* Texte de chargement */
.loading-text {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
  animation: fadeInOut 1.5s ease-in-out infinite;
}

.logo-loader-inline.fullscreen .loading-text {
  font-size: 1.125rem;
  margin-top: 2rem;
}

@keyframes fadeInOut {
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
}

/* Animation de sortie */
.logo-loader-inline.fade-out {
  animation: fadeOut 0.4s ease-out forwards;
}

@keyframes fadeOut {
  to {
    opacity: 0;
  }
}
</style>
