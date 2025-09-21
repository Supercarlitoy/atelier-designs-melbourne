// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  modules: [
    '@nuxt/ui',
    '@nuxt/icon'
  ],

  css: ['@/assets/scss/main.scss'],

  devServer: {
    host: '0.0.0.0',
    port: 3000
  },

  runtimeConfig: {
    // Private keys (only available on server-side)
    openaiApiKey: process.env.OPENAI_API_KEY,
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY,
    
    // Public keys (exposed to client-side)
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    }
  },

  app: {
    head: {
      title: 'Atelier Designs - Melbourne\'s Design Directory',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'The definitive, curated index of Melbourne\'s finest design talent. Discover award-winning studios, agencies, and independent designers.' 
        },
        { property: 'og:title', content: 'Atelier Designs - Melbourne\'s Design Directory' },
        { property: 'og:description', content: 'The definitive, curated index of Melbourne\'s finest design talent.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://atelier-designs.online' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { 
          rel: 'stylesheet', 
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap' 
        }
      ]
    }
  }
})
