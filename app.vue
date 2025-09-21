<template>
  <div id="app">
    <AppHeader />
    <main>
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
// Global meta tags and SEO
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  meta: [
    { name: 'theme-color', content: '#191919' },
    { name: 'msapplication-TileColor', content: '#191919' }
  ]
})

// Initialize smooth scrolling and animations on mount
onMounted(() => {
  // Initialize Lenis smooth scrolling
  if (process.client) {
    import('lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      })

      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
    })
  }
})
</script>

<style>
/* Global styles are imported from assets/scss/main.scss via nuxt.config.ts */
</style>

