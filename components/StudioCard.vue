<template>
  <article class="studio-card">
    <div class="studio-card-header">
      <!-- Studio Image/Logo -->
      <div class="studio-image">
        <img 
          v-if="studio.image" 
          :src="studio.image" 
          :alt="`${studio.name} logo`"
          @error="handleImageError"
        />
        <div v-else class="studio-image-placeholder">
          <Icon name="lucide:image" />
        </div>
        
        <!-- Featured Badge -->
        <div v-if="studio.featured" class="featured-badge">
          <Icon name="lucide:star" />
          Featured
        </div>
      </div>

      <!-- Studio Info -->
      <div class="studio-info">
        <h3 class="studio-name">{{ studio.name }}</h3>
        <p class="studio-tagline">{{ studio.tagline }}</p>
        
        <!-- Rating and Projects -->
        <div class="studio-meta">
          <div class="studio-rating">
            <Icon name="lucide:star" class="star-icon" />
            <span>{{ studio.rating }}</span>
          </div>
          <div class="studio-projects">
            {{ studio.projects }}+ projects
          </div>
        </div>
      </div>
    </div>

    <!-- Studio Description -->
    <div class="studio-description">
      <p>{{ truncatedDescription }}</p>
    </div>

    <!-- Specialties -->
    <div class="studio-specialties">
      <span 
        v-for="specialty in studio.specialties" 
        :key="specialty"
        class="specialty-tag"
      >
        {{ specialty }}
      </span>
    </div>

    <!-- Location -->
    <div class="studio-location">
      <Icon name="lucide:map-pin" class="location-icon" />
      <span>{{ studio.location }}, Melbourne</span>
    </div>

    <!-- Actions -->
    <div class="studio-actions">
      <NuxtLink 
        :to="`/studio/${studio.id}`" 
        class="btn btn--primary studio-btn"
        @click="trackStudioView"
      >
        View Profile
      </NuxtLink>
      <a 
        v-if="studio.website" 
        :href="studio.website" 
        target="_blank" 
        rel="noopener noreferrer"
        class="btn btn--secondary studio-btn"
        @click="trackWebsiteClick"
      >
        <Icon name="lucide:external-link" />
        Website
      </a>
    </div>

    <!-- Hover Effect Overlay -->
    <div class="studio-card-overlay"></div>
  </article>
</template>

<script setup>
const props = defineProps({
  studio: {
    type: Object,
    required: true
  }
})

// Computed properties
const truncatedDescription = computed(() => {
  const maxLength = 120
  if (props.studio.description.length <= maxLength) {
    return props.studio.description
  }
  return props.studio.description.substring(0, maxLength) + '...'
})

// Methods
const handleImageError = (event) => {
  // Hide the broken image and show placeholder
  event.target.style.display = 'none'
  event.target.nextElementSibling?.classList.remove('hidden')
}

const trackStudioView = () => {
  // Track analytics - studio profile view
  console.log('Studio profile viewed:', props.studio.name)
}

const trackWebsiteClick = () => {
  // Track analytics - website click
  console.log('Studio website clicked:', props.studio.name)
}
</script>

<style lang="scss" scoped>
.studio-card {
  background-color: var(--color-surface);
  border-radius: var(--border-radius-lg);
  padding: var(--space-l);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
  border: 1px solid var(--color-border);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: var(--color-primary);

    .studio-card-overlay {
      opacity: 1;
    }

    .studio-image img {
      transform: scale(1.05);
    }
  }
}

.studio-card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(194, 168, 120, 0.05) 0%, transparent 50%);
  opacity: 0;
  transition: opacity var(--transition-base);
  pointer-events: none;
}

.studio-card-header {
  margin-bottom: var(--space-m);
}

.studio-image {
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: var(--border-radius);
  overflow: hidden;
  margin-bottom: var(--space-m);
  background-color: var(--color-background);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-base);
  }
}

.studio-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-background);
  color: var(--color-text);

  svg {
    width: 48px;
    height: 48px;
  }
}

.featured-badge {
  position: absolute;
  top: var(--space-s);
  right: var(--space-s);
  background-color: var(--color-primary);
  color: var(--color-background);
  padding: var(--space-3xs) var(--space-xs);
  border-radius: var(--border-radius);
  font-size: var(--step--2);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: var(--space-3xs);

  svg {
    width: 12px;
    height: 12px;
  }
}

.studio-info {
  margin-bottom: var(--space-m);
}

.studio-name {
  font-size: var(--step-2);
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: var(--space-3xs);
  line-height: 1.3;
}

.studio-tagline {
  font-size: var(--step--1);
  color: var(--color-primary);
  font-style: italic;
  margin-bottom: var(--space-s);
}

.studio-meta {
  display: flex;
  align-items: center;
  gap: var(--space-m);
  font-size: var(--step--1);
}

.studio-rating {
  display: flex;
  align-items: center;
  gap: var(--space-3xs);
  color: var(--color-text);

  .star-icon {
    width: 14px;
    height: 14px;
    color: var(--color-primary);
  }
}

.studio-projects {
  color: var(--color-text);
}

.studio-description {
  margin-bottom: var(--space-m);

  p {
    font-size: var(--step--1);
    line-height: 1.6;
    color: var(--color-text);
  }
}

.studio-specialties {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin-bottom: var(--space-m);
}

.specialty-tag {
  background-color: var(--color-background);
  color: var(--color-text);
  padding: var(--space-3xs) var(--space-xs);
  border-radius: var(--border-radius);
  font-size: var(--step--2);
  font-weight: 500;
  border: 1px solid var(--color-border);
  transition: all var(--transition-fast);

  &:hover {
    background-color: var(--color-primary);
    color: var(--color-background);
    border-color: var(--color-primary);
  }
}

.studio-location {
  display: flex;
  align-items: center;
  gap: var(--space-3xs);
  margin-bottom: var(--space-l);
  font-size: var(--step--1);
  color: var(--color-text);

  .location-icon {
    width: 14px;
    height: 14px;
  }
}

.studio-actions {
  display: flex;
  gap: var(--space-s);
  flex-wrap: wrap;
}

.studio-btn {
  flex: 1;
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3xs);
  font-size: var(--step--1);
  padding: var(--space-s) var(--space-m);

  svg {
    width: 14px;
    height: 14px;
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .studio-card {
    padding: var(--space-m);
  }

  .studio-image {
    height: 160px;
  }

  .studio-actions {
    flex-direction: column;
  }

  .studio-btn {
    flex: none;
  }
}
</style>

