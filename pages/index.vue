<template>
  <div class="homepage">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title fade-in">
              Melbourne's
              <span class="hero-title-accent">Design</span>
              Directory
            </h1>
            <p class="hero-description fade-in">
              The definitive, curated index of Melbourne's finest design talent. 
              Discover award-winning studios, agencies, and independent designers 
              who are shaping the creative landscape.
            </p>
            <div class="hero-actions fade-in">
              <button class="btn btn--primary" @click="scrollToDirectory">
                Explore Studios
              </button>
              <NuxtLink to="/submit" class="btn btn--secondary">
                Submit Your Studio
              </NuxtLink>
            </div>
          </div>
          <div class="hero-visual fade-in">
            <div class="hero-grid">
              <div class="hero-grid-item" v-for="n in 6" :key="n">
                <div class="hero-grid-placeholder"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Search Section -->
    <section class="search-section" ref="directoryRef">
      <div class="container">
        <div class="search-content">
          <h2 class="search-title slide-up">Find Your Perfect Design Partner</h2>
          <div class="search-bar slide-up">
            <div class="search-input-wrapper">
              <Icon name="lucide:search" class="search-icon" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by studio name, service, or specialty..."
                class="search-input"
                @input="handleSearch"
              />
            </div>
            <div class="search-filters">
              <select v-model="selectedCategory" @change="handleCategoryChange" class="filter-select">
                <option value="">All Categories</option>
                <option value="branding">Branding</option>
                <option value="web-design">Web Design</option>
                <option value="graphic-design">Graphic Design</option>
                <option value="digital">Digital</option>
                <option value="strategy">Strategy</option>
              </select>
              <select v-model="selectedLocation" @change="handleLocationChange" class="filter-select">
                <option value="">All Locations</option>
                <option value="cbd">CBD</option>
                <option value="richmond">Richmond</option>
                <option value="fitzroy">Fitzroy</option>
                <option value="south-yarra">South Yarra</option>
                <option value="abbotsford">Abbotsford</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Studios Grid -->
    <section class="studios-section">
      <div class="container">
        <div class="studios-grid">
          <StudioCard
            v-for="studio in filteredStudios"
            :key="studio.id"
            :studio="studio"
            class="slide-up"
          />
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Loading studios...</p>
        </div>

        <!-- Empty State -->
        <div v-if="!isLoading && filteredStudios.length === 0" class="empty-state">
          <Icon name="lucide:search-x" class="empty-icon" />
          <h3>No studios found</h3>
          <p>Try adjusting your search criteria or browse all studios.</p>
          <button @click="clearFilters" class="btn btn--secondary">Clear Filters</button>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item slide-up">
            <div class="stat-number">{{ studios.length }}+</div>
            <div class="stat-label">Design Studios</div>
          </div>
          <div class="stat-item slide-up">
            <div class="stat-number">500+</div>
            <div class="stat-label">Projects Showcased</div>
          </div>
          <div class="stat-item slide-up">
            <div class="stat-number">50+</div>
            <div class="stat-label">Specialties</div>
          </div>
          <div class="stat-item slide-up">
            <div class="stat-number">100%</div>
            <div class="stat-label">Melbourne Based</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Meta tags
useHead({
  title: 'Atelier Designs - Melbourne\'s Design Directory',
  meta: [
    { name: 'description', content: 'The definitive, curated index of Melbourne\'s finest design talent. Discover award-winning studios, agencies, and independent designers.' }
  ]
})

// Reactive data
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedLocation = ref('')
const isLoading = ref(true)
const directoryRef = ref(null)

// Mock studio data (will be replaced with real data from Supabase)
const studios = ref([
  {
    id: 1,
    name: 'Studio Brave',
    tagline: 'Building brands of influence',
    description: 'Branding and design studio based in Melbourne. For two decades Studio Brave has helped businesses transform and grow.',
    specialties: ['Branding', 'Digital', 'Strategy'],
    location: 'CBD',
    website: 'https://studiobrave.com.au/',
    image: '/images/studios/studio-brave.jpg',
    featured: true,
    rating: 4.9,
    projects: 150
  },
  {
    id: 2,
    name: 'Principle Design',
    tagline: 'We Make Brands Happen',
    description: 'Melbourne based Graphic & Brand Design studio. Best known for Strategy, Branding, Digital Design, Signage & Marketing solutions.',
    specialties: ['Branding', 'Graphic Design', 'Signage'],
    location: 'Abbotsford',
    website: 'https://principledesign.com.au/',
    image: '/images/studios/principle-design.jpg',
    featured: false,
    rating: 4.8,
    projects: 200
  },
  {
    id: 3,
    name: 'Willow & Blake',
    tagline: 'Building brands as if they are our own',
    description: 'Melbourne-based creative branding agency, bringing brands to life all over the world.',
    specialties: ['Creative Branding', 'Digital', 'Copywriting'],
    location: 'Richmond',
    website: 'https://willowandblake.com/',
    image: '/images/studios/willow-blake.jpg',
    featured: true,
    rating: 4.7,
    projects: 120
  }
])

// Computed properties
const filteredStudios = computed(() => {
  let filtered = studios.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(studio => 
      studio.name.toLowerCase().includes(query) ||
      studio.description.toLowerCase().includes(query) ||
      studio.specialties.some(specialty => specialty.toLowerCase().includes(query))
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(studio =>
      studio.specialties.some(specialty => 
        specialty.toLowerCase().includes(selectedCategory.value.toLowerCase())
      )
    )
  }

  if (selectedLocation.value) {
    filtered = filtered.filter(studio =>
      studio.location.toLowerCase() === selectedLocation.value.toLowerCase()
    )
  }

  return filtered
})

// Methods
const handleSearch = () => {
  // Debounce search if needed
}

const handleCategoryChange = () => {
  // Track analytics
}

const handleLocationChange = () => {
  // Track analytics
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedLocation.value = ''
}

const scrollToDirectory = () => {
  if (directoryRef.value) {
    directoryRef.value.scrollIntoView({ behavior: 'smooth' })
  }
}

// Lifecycle
onMounted(() => {
  // Simulate loading
  setTimeout(() => {
    isLoading.value = false
  }, 1000)

  // Initialize scroll animations
  if (process.client) {
    import('gsap').then(({ gsap, ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger)

      // Animate elements on scroll
      gsap.utils.toArray('.fade-in').forEach((element, index) => {
        gsap.fromTo(element, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power2.out'
          }
        )
      })

      gsap.utils.toArray('.slide-up').forEach((element) => {
        gsap.fromTo(element,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })
    })
  }
})
</script>

<style lang="scss" scoped>
.homepage {
  padding-top: 70px; // Account for fixed header
}

.hero {
  min-height: 90vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, var(--color-background) 0%, var(--color-surface) 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 70%, rgba(194, 168, 120, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3xl);
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--space-2xl);
    text-align: center;
  }
}

.hero-title {
  font-size: var(--step-7);
  line-height: 1.1;
  margin-bottom: var(--space-l);

  @media (max-width: 768px) {
    font-size: var(--step-6);
  }
}

.hero-title-accent {
  color: var(--color-primary);
}

.hero-description {
  font-size: var(--step-1);
  line-height: 1.6;
  margin-bottom: var(--space-2xl);
  max-width: 500px;

  @media (max-width: 768px) {
    margin: 0 auto var(--space-2xl);
  }
}

.hero-actions {
  display: flex;
  gap: var(--space-m);
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
}

.hero-visual {
  position: relative;
}

.hero-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-m);
  transform: rotate(12deg);
}

.hero-grid-item {
  aspect-ratio: 1;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
}

.hero-grid-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, var(--color-surface), var(--color-border));
  animation: pulse 2s ease-in-out infinite alternate;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  100% { opacity: 1; }
}

.search-section {
  padding: var(--space-3xl) 0;
  background-color: var(--color-surface);
}

.search-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.search-title {
  font-size: var(--step-4);
  margin-bottom: var(--space-2xl);
}

.search-bar {
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
}

.search-input-wrapper {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
}

.search-icon {
  position: absolute;
  left: var(--space-m);
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text);
  width: 20px;
  height: 20px;
}

.search-input {
  width: 100%;
  padding: var(--space-m) var(--space-m) var(--space-m) var(--space-2xl);
  font-size: var(--step-0);
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  color: var(--color-heading);
  transition: border-color var(--transition-base);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }

  &::placeholder {
    color: var(--color-text);
  }
}

.search-filters {
  display: flex;
  gap: var(--space-m);
  justify-content: center;
  flex-wrap: wrap;
}

.filter-select {
  padding: var(--space-s) var(--space-m);
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  color: var(--color-heading);
  font-size: var(--step--1);
  cursor: pointer;
  transition: border-color var(--transition-base);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
}

.studios-section {
  padding: var(--space-3xl) 0;
}

.studios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--space-2xl);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }
}

.loading-state,
.empty-state {
  text-align: center;
  padding: var(--space-3xl) 0;
  grid-column: 1 / -1;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-border);
  border-top: 3px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto var(--space-m);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-icon {
  width: 48px;
  height: 48px;
  color: var(--color-text);
  margin-bottom: var(--space-m);
}

.stats-section {
  padding: var(--space-3xl) 0;
  background-color: var(--color-surface);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-2xl);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-xl);
  }
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-family: var(--font-family-serif);
  font-size: var(--step-5);
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: var(--space-s);
}

.stat-label {
  font-size: var(--step-0);
  color: var(--color-text);
}
</style>

