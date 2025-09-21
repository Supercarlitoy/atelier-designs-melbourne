<template>
  <div class="homepage">
    <!-- Navigation Header -->
    <header class="site-header">
      <div class="container">
        <div class="header-content">
          <div class="brand">
            <h1 class="brand-name">Atelier</h1>
          </div>
          <nav class="main-nav">
            <NuxtLink to="/" class="nav-link">Explore</NuxtLink>
            <NuxtLink to="/about" class="nav-link">About</NuxtLink>
            <NuxtLink to="/submit" class="nav-link">Submit</NuxtLink>
            <button class="btn btn--primary">Join</button>
          </nav>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              Where Melbourne's
              <span class="highlight">Creative Minds</span>
              Come to Life
            </h1>
            <p class="hero-subtitle">
              Discover the studios, agencies, and independent creators who are defining Melbourne's design landscape. 
              From bold brand identities to cutting-edge digital experiences.
            </p>
            <div class="hero-actions">
              <button class="btn btn--primary btn--large">
                <Icon name="lucide:sparkles" />
                Explore Talent
              </button>
              <button class="btn btn--secondary btn--large">
                <Icon name="lucide:plus" />
                List Your Studio
              </button>
            </div>
          </div>
          
          <!-- Animated Geometric Shapes -->
          <div class="hero-visuals">
            <div class="floating-shapes">
              <div class="shape shape--circle shape--primary"></div>
              <div class="shape shape--square shape--secondary"></div>
              <div class="shape shape--triangle shape--accent-1"></div>
              <div class="shape shape--hexagon shape--accent-2"></div>
              <div class="shape shape--diamond shape--accent-4"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Studios Section -->
    <section class="featured-studios">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Featured Creative Powerhouses</h2>
          <p class="section-subtitle">
            Handpicked studios that are pushing boundaries and creating exceptional work
          </p>
        </div>

        <div class="studios-grid">
          <div class="studio-card featured">
            <div class="studio-image">
              <img src="/images/eAH07GQer6VQ.jpg" alt="Studio Brave workspace" />
              <div class="studio-overlay">
                <div class="studio-badge">Featured</div>
              </div>
            </div>
            <div class="studio-info">
              <h3 class="studio-name">Studio Brave</h3>
              <p class="studio-tagline">Building brands of influence</p>
              <div class="studio-meta">
                <div class="rating">
                  <Icon name="lucide:star" class="star filled" />
                  <span>4.9</span>
                </div>
                <div class="projects">150+ projects</div>
              </div>
              <div class="studio-specialties">
                <span class="specialty">Branding</span>
                <span class="specialty">Digital</span>
                <span class="specialty">Strategy</span>
              </div>
              <p class="studio-description">
                For two decades, Studio Brave has helped businesses transform and grow through strategic brand design.
              </p>
              <div class="studio-actions">
                <button class="btn btn--text">
                  <Icon name="lucide:external-link" />
                  View Portfolio
                </button>
                <button class="btn btn--text">
                  <Icon name="lucide:phone" />
                  Contact
                </button>
              </div>
            </div>
          </div>

          <div class="studio-card">
            <div class="studio-image">
              <img src="/images/LB3cgEiQ4OLa.jpg" alt="Principle Design workspace" />
            </div>
            <div class="studio-info">
              <h3 class="studio-name">Principle Design</h3>
              <p class="studio-tagline">We Make Brands Happen</p>
              <div class="studio-meta">
                <div class="rating">
                  <Icon name="lucide:star" class="star filled" />
                  <span>4.8</span>
                </div>
                <div class="projects">200+ projects</div>
              </div>
              <div class="studio-specialties">
                <span class="specialty">Branding</span>
                <span class="specialty">Graphic Design</span>
                <span class="specialty">Signage</span>
              </div>
              <p class="studio-description">
                Melbourne-based studio specializing in strategy, branding, digital design, and comprehensive marketing solutions.
              </p>
              <div class="studio-actions">
                <button class="btn btn--text">
                  <Icon name="lucide:external-link" />
                  View Portfolio
                </button>
                <button class="btn btn--text">
                  <Icon name="lucide:phone" />
                  Contact
                </button>
              </div>
            </div>
          </div>

          <div class="studio-card featured">
            <div class="studio-image">
              <img src="/images/hLUj4zNRMZs8.png" alt="Creative branding examples" />
              <div class="studio-overlay">
                <div class="studio-badge">Rising Star</div>
              </div>
            </div>
            <div class="studio-info">
              <h3 class="studio-name">Willow & Blake</h3>
              <p class="studio-tagline">Building brands as if they are our own</p>
              <div class="studio-meta">
                <div class="rating">
                  <Icon name="lucide:star" class="star filled" />
                  <span>4.7</span>
                </div>
                <div class="projects">120+ projects</div>
              </div>
              <div class="studio-specialties">
                <span class="specialty">Creative Branding</span>
                <span class="specialty">Digital</span>
                <span class="specialty">Copywriting</span>
              </div>
              <p class="studio-description">
                Melbourne-based creative branding agency, bringing brands to life all over the world with passion and precision.
              </p>
              <div class="studio-actions">
                <button class="btn btn--text">
                  <Icon name="lucide:external-link" />
                  View Portfolio
                </button>
                <button class="btn btn--text">
                  <Icon name="lucide:phone" />
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="view-all-section">
          <button class="btn btn--secondary btn--large">
            <Icon name="lucide:grid-3x3" />
            Explore All Studios
          </button>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">25+</div>
            <div class="stat-label">Creative Studios</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">500+</div>
            <div class="stat-label">Projects Showcased</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">50+</div>
            <div class="stat-label">Design Specialties</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">100%</div>
            <div class="stat-label">Melbourne Based</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Ready to Find Your Creative Partner?</h2>
          <p class="cta-subtitle">
            Join Melbourne's most curated design community. Whether you're looking for talent or showcasing your work.
          </p>
          <div class="cta-actions">
            <button class="btn btn--primary btn--large">
              <Icon name="lucide:search" />
              Find Studios
            </button>
            <button class="btn btn--secondary btn--large">
              <Icon name="lucide:upload" />
              Submit Your Work
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// SEO and meta
useHead({
  title: 'Atelier - Where Melbourne\'s Creative Minds Come to Life',
  meta: [
    {
      name: 'description',
      content: 'Discover Melbourne\'s finest design studios, agencies, and independent creators. From bold brand identities to cutting-edge digital experiences.'
    }
  ]
})

// Animation setup
onMounted(() => {
  // Register GSAP plugins
  if (process.client) {
    gsap.registerPlugin(ScrollTrigger)
    
    // Simple animations without complex selectors
    const heroTitle = document.querySelector('.hero-title')
    const heroSubtitle = document.querySelector('.hero-subtitle')
    const heroActions = document.querySelector('.hero-actions')
    
    if (heroTitle) {
      gsap.from(heroTitle, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      })
    }
    
    if (heroSubtitle) {
      gsap.from(heroSubtitle, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out"
      })
    }
    
    if (heroActions) {
      gsap.from(heroActions, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power3.out"
      })
    }

    // Animate shapes
    const shapes = document.querySelectorAll('.shape')
    shapes.forEach((shape, index) => {
      gsap.to(shape, {
        y: -20,
        rotation: 360,
        duration: 3 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: index * 0.2
      })
    })
  }
})
</script>

<style lang="scss" scoped>
.homepage {
  min-height: 100vh;
}

// Header Styles
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-m) 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-name {
  font-family: var(--font-family-display);
  font-size: var(--step-2);
  font-weight: 800;
  color: var(--color-heading);
  margin: 0;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: var(--space-l);
}

.nav-link {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--transition-base);

  &:hover {
    color: var(--color-primary);
  }
}

// Hero Styles
.hero {
  padding: calc(80px + var(--space-3xl)) 0 var(--space-3xl);
  background: linear-gradient(135deg, var(--color-background) 0%, var(--color-surface) 100%);
  position: relative;
  overflow: hidden;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3xl);
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

.hero-title {
  font-family: var(--font-family-display);
  font-size: var(--step-6);
  font-weight: 900;
  line-height: 1.1;
  color: var(--color-heading);
  margin-bottom: var(--space-l);

  .highlight {
    color: var(--color-primary);
  }
}

.hero-subtitle {
  font-size: var(--step-1);
  color: var(--color-text);
  line-height: 1.6;
  margin-bottom: var(--space-2xl);
  max-width: 500px;
}

.hero-actions {
  display: flex;
  gap: var(--space-m);
  flex-wrap: wrap;
}

// Floating Shapes
.hero-visuals {
  position: relative;
  height: 400px;
}

.floating-shapes {
  position: relative;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: var(--border-radius);

  &--circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    top: 20%;
    right: 20%;
  }

  &--square {
    width: 60px;
    height: 60px;
    top: 60%;
    right: 40%;
  }

  &--triangle {
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 52px solid;
    top: 10%;
    right: 60%;
  }

  &--hexagon {
    width: 70px;
    height: 70px;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    top: 40%;
    right: 10%;
  }

  &--diamond {
    width: 50px;
    height: 50px;
    transform: rotate(45deg);
    top: 70%;
    right: 70%;
  }

  &--primary { background-color: var(--color-primary); }
  &--secondary { background-color: var(--color-secondary); }
  &--accent-1 { 
    background-color: var(--color-accent-1);
    border-bottom-color: var(--color-accent-1);
  }
  &--accent-2 { background-color: var(--color-accent-2); }
  &--accent-4 { background-color: var(--color-accent-4); }
}

// Featured Studios
.featured-studios {
  padding: var(--space-3xl) 0;
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-3xl);
}

.section-title {
  font-family: var(--font-family-display);
  font-size: var(--step-4);
  font-weight: 800;
  color: var(--color-heading);
  margin-bottom: var(--space-m);
}

.section-subtitle {
  font-size: var(--step-0);
  color: var(--color-text-muted);
  max-width: 600px;
  margin: 0 auto;
}

.studios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--space-2xl);
  margin-bottom: var(--space-2xl);
}

.studio-card {
  background: var(--color-surface);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  transition: transform var(--transition-base);

  &:hover {
    transform: translateY(-5px);
  }

  &.featured {
    border: 2px solid var(--color-primary);
  }
}

.studio-image {
  position: relative;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.studio-overlay {
  position: absolute;
  top: var(--space-m);
  right: var(--space-m);
}

.studio-badge {
  background: var(--color-primary);
  color: white;
  padding: var(--space-xs) var(--space-s);
  border-radius: var(--border-radius);
  font-size: var(--step--1);
  font-weight: 600;
}

.studio-info {
  padding: var(--space-l);
}

.studio-name {
  font-family: var(--font-family-display);
  font-size: var(--step-2);
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: var(--space-xs);
}

.studio-tagline {
  color: var(--color-text-muted);
  margin-bottom: var(--space-m);
}

.studio-meta {
  display: flex;
  align-items: center;
  gap: var(--space-m);
  margin-bottom: var(--space-m);
}

.rating {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--color-accent-1);
}

.projects {
  color: var(--color-text-muted);
  font-size: var(--step--1);
}

.studio-specialties {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin-bottom: var(--space-m);
}

.specialty {
  background: var(--color-primary);
  color: white;
  padding: var(--space-xs) var(--space-s);
  border-radius: var(--border-radius);
  font-size: var(--step--1);
}

.studio-description {
  color: var(--color-text);
  line-height: 1.6;
  margin-bottom: var(--space-m);
}

.studio-actions {
  display: flex;
  gap: var(--space-m);
}

.view-all-section {
  text-align: center;
}

// Stats Section
.stats-section {
  padding: var(--space-3xl) 0;
  background: var(--color-surface);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-2xl);
  text-align: center;
}

.stat-number {
  font-family: var(--font-family-display);
  font-size: var(--step-5);
  font-weight: 900;
  color: var(--color-primary);
  margin-bottom: var(--space-s);
}

.stat-label {
  color: var(--color-text-muted);
  font-weight: 500;
}

// CTA Section
.cta-section {
  padding: var(--space-3xl) 0;
  text-align: center;
}

.cta-title {
  font-family: var(--font-family-display);
  font-size: var(--step-4);
  font-weight: 800;
  color: var(--color-heading);
  margin-bottom: var(--space-m);
}

.cta-subtitle {
  font-size: var(--step-0);
  color: var(--color-text-muted);
  max-width: 600px;
  margin: 0 auto var(--space-2xl);
}

.cta-actions {
  display: flex;
  justify-content: center;
  gap: var(--space-m);
  flex-wrap: wrap;
}
</style>

